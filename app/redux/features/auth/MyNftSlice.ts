import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSimplifiedError } from "@/app/utils";
import APIService from "@/app/utils/APIServices";
import { url } from "@/app/utils/endpoints";
import { MoralisCollectionResponse, MoralisNftResponse } from "@/types";

interface MyNftSliceProps {
    nft_data: MoralisNftResponse | null;
    nft_loading: boolean;
    nft_data_history: {
        cursor?: MoralisNftResponse['cursor'],
        page: MoralisNftResponse['page']
    }[];
    nft_data_history_count: number;
    collection_data: MoralisCollectionResponse | null
}

const initialState: MyNftSliceProps = {
    nft_data: null,
    nft_loading: false,
    nft_data_history: [],
    nft_data_history_count: 0,
    collection_data: null

}
export const userNft = createSlice({
    name: "userNft",
    initialState,
    reducers: {
        setUserNft: (state, action: PayloadAction<any>) => {
           state.nft_data = action.payload
           state.nft_loading = false
        },
        setLoading: (state) =>{
            state.nft_loading = true
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getUserNft.pending, (state) => {
           state.nft_loading = true
        })
        .addCase(getUserNft.fulfilled, (state, action: PayloadAction<{data: MoralisNftResponse}>) => {
            const historyExist = state.nft_data_history.find(item => item.page === action.payload.data.page)
            if(!historyExist) {
              state.nft_data_history_count = action.payload.data.page
                state.nft_data_history = [...state.nft_data_history,{
                    cursor: action.payload.data.cursor,
                    page: action.payload.data.page
                }]
            }
            
            state.nft_data = action.payload.data
            state.nft_loading = false
        })
        .addCase(getUserNft.rejected, (state) => {
            state.nft_loading = false
        })
        // GET USER NFT COLLECTIONS 
        .addCase(getUserCollection.pending, (state) => {
            state.nft_loading = true
         })
         .addCase(getUserCollection.fulfilled, (state, action: PayloadAction<{data: MoralisCollectionResponse}>) => {
            //  const historyExist = state.nft_data_history.find(item => item.page === action.payload.data.page)
            //  if(!historyExist) {
            //    state.nft_data_history_count = action.payload.data.page
            //      state.nft_data_history = [...state.nft_data_history,{
            //          cursor: action.payload.data.cursor,
            //          page: action.payload.data.page
            //      }]
            //  }
             state.collection_data = action.payload.data
             state.nft_loading = false
         })
         .addCase(getUserCollection.rejected, (state) => {
             state.nft_loading = false
         })
    }
})

export const { setLoading, setUserNft } = userNft.actions

export default userNft.reducer

export const getUserNft = createAsyncThunk(
    "getUserNft",
    async (payload: { chain?: string; address: string, cursor?: string |  null, limit?: string | number }, action) => {
       try {
        const { data } = await APIService.post(`${url.profile}/${payload.address}/nft`, payload)
        return data
       } catch (error) {
        let newError = getSimplifiedError(error);
         return action.rejectWithValue(newError)
       }
    }
)

export const getUserCollection = createAsyncThunk(
    "getUserCollection",
    async (payload: { chain?: string; address: string, cursor?: string |  null, limit?: string | number }, action) => {
        try {
            const { data } = await APIService.post(`${url.profile}/${payload.address}/collections`, payload)
            return data
           } catch (error) {
            let newError = getSimplifiedError(error);
             return action.rejectWithValue(newError)
           }
    }
)
