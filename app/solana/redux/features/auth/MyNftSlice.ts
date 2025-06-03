import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSimplifiedError } from "@/app/utils";
import APIService from "@/app/utils/APIServices";
import { url } from "@/app/utils/endpoints";
import { CreateCollectionProps, MoralisCollectionResponse, MoralisNftResponse } from "@/types";

interface MyNftSliceProps {
    nft_data: MoralisNftResponse | null;
    nft_loading: boolean;
    nft_data_history: {
        cursor?: MoralisNftResponse['cursor'],
        page: MoralisNftResponse['page']
    }[];
    nft_data_history_count: number;
    collection_data: MoralisCollectionResponse | null;
    loading: boolean;
    created_collections: CreateCollectionProps[]
}

const initialState: MyNftSliceProps = {
    nft_data: null,
    nft_loading: false,
    nft_data_history: [],
    nft_data_history_count: 0,
    collection_data: null,
    loading:false,
    created_collections: []
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
        },
        setCreatedCollections: (state, action: PayloadAction<CreateCollectionProps[]>) => {
           state.created_collections = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
          .addCase(getUserNft.pending, (state) => {
            state.nft_loading = true;
          })
          .addCase(
            getUserNft.fulfilled,
            (state, action: PayloadAction<{ data: MoralisNftResponse }>) => {
              const historyExist = state.nft_data_history.find(
                (item) => item.page === action.payload.data.page
              );
              if (!historyExist) {
                state.nft_data_history_count = action.payload.data.page;
                state.nft_data_history = [
                  ...state.nft_data_history,
                  {
                    cursor: action.payload.data.cursor,
                    page: action.payload.data.page,
                  },
                ];
              }

              state.nft_data = action.payload.data;
              state.nft_loading = false;
            }
          )
          .addCase(getUserNft.rejected, (state) => {
            state.nft_loading = false;
          })
          // start
          .addCase(getSingleNftDetail.pending, (state) => {
            state.loading = true;
         
          })
          .addCase(getSingleNftDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
          
          })
          .addCase(getSingleNftDetail.rejected, (state, { payload }) => {
            state.loading = false;
          
          })
            // end
          // start
          .addCase(getSingleCollectionDetail.pending, (state) => {
            state.loading = true;
         
          })
          .addCase(getSingleCollectionDetail.fulfilled, (state, { payload }) => {
            state.loading = false;
          
          })
          .addCase(getSingleCollectionDetail.rejected, (state, { payload }) => {
            state.loading = false;
          
          })

            // end
            
          // GET USER NFT COLLECTIONS
          .addCase(getUserCollection.pending, (state) => {
            state.nft_loading = true;
          })
          .addCase(
            getUserCollection.fulfilled,
            (
              state,
              action: PayloadAction<{ data: MoralisCollectionResponse }>
            ) => {
              //  const historyExist = state.nft_data_history.find(item => item.page === action.payload.data.page)
              //  if(!historyExist) {
              //    state.nft_data_history_count = action.payload.data.page
              //      state.nft_data_history = [...state.nft_data_history,{
              //          cursor: action.payload.data.cursor,
              //          page: action.payload.data.page
              //      }]
              //  }
              state.collection_data = action.payload.data;
              state.nft_loading = false;
            }
          )
          .addCase(getUserCollection.rejected, (state) => {
            state.nft_loading = false;
          });
    }
})

export const { setLoading, setUserNft, setCreatedCollections } = userNft.actions

export default userNft.reducer

export const getUserNft = createAsyncThunk(
    "getUserNft",
    async (payload: { chain?: string; address: string | any, cursor?: string |  null, limit?: string | number }, action) => {
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
export const getSingleNftDetail = createAsyncThunk(
    "getSingleNftDetail",
    async (payload: {  address: string | any, tokenId: string |  any, chain?: string | null }, action) => {
        try {
            const { data } = await APIService.get(`${url.collections}/nft?address=${payload.address}&&tokenId=${payload.tokenId}`)
            return data
           } catch (error) {
            let newError = getSimplifiedError(error);
             return action.rejectWithValue(newError)
           }
    }
)
export const getSingleCollectionDetail = createAsyncThunk(
    "getSingleCollectionDetail",
    async (payload: {  address: string | any, limit: string |  null, chain?: string | null }, action) => {
        try {
            const { data } = await APIService.get(`${url.collections}/nfts?address=${payload.address}&limit=${payload.limit}`)
            return data
           } catch (error) {
            let newError = getSimplifiedError(error);
             return action.rejectWithValue(newError)
           }
    }
)


