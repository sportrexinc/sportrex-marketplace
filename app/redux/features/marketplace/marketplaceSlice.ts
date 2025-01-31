import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIService from "@/app/utils/APIServices";
import { url } from "@/app/utils/endpoints";
import { getSimplifiedError } from "@/app/utils";
export interface MarketState {
  loading: boolean;
  token: string;
  error?: boolean;
  success: boolean;
  userData: any;
  address: string;
  message: string;
  verifyStatus: string;
  profileStatus: string;
  avatarUpdateSuccess: boolean;
  bannerUpdateSuccess: boolean;
  languageName: string;
  language: string;
}

const initialState: MarketState = {
  loading: false,
  token: "",
  error: false,
  success: false,
  userData: {},
  address: "",
  message: "",
  verifyStatus: "",
  profileStatus: "",
  avatarUpdateSuccess: false,
  bannerUpdateSuccess: false,
  languageName: "Eng",
  language: "en",
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    restoreDefault: (state) => {
      state.loading = false;
      state.token = "";
      state.userData = {};
      state.address = "";
      state.message = "";
    },
    
  },
  extraReducers: (builder) => {
    builder

      
      .addCase(getAllListedNft.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllListedNft.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getAllListedNft.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      .addCase(getAllNftCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNftCollection.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getAllNftCollection.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      .addCase(getNftDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNftDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getNftDetail.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      .addCase(getCollectionByRanking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCollectionByRanking.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getCollectionByRanking.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      .addCase(getMarketplaceCollections.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarketplaceCollections.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getMarketplaceCollections.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      .addCase(getSingleMarketplaceCollectionDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleMarketplaceCollectionDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getSingleMarketplaceCollectionDetail.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      .addCase(getNftByAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNftByAttribute.fulfilled, (state, { payload }) => {
        state.loading = false;
       
      })
      .addCase(getNftByAttribute.rejected, (state, { payload }) => {
        state.loading = false;
    
      })



     
    // end of session
  },
});

export const getAllListedNft = createAsyncThunk(
  "getAllListedNft",
  async (payload:  string , { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.marketplace}/list/${payload}`
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
export const getAllNftCollection = createAsyncThunk(
  "getAllNftCollection",
  async (payload:  string , { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.marketplace}/collection/${payload}`
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);

export const getNftDetail = createAsyncThunk(
  "getNftDetail",
  async (payload:  string , { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.marketplace}/collection/nft${payload}`
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
export const getCollectionByRanking = createAsyncThunk(
  "getCollectionByRanking",
  async (payload:  {limit:string,sort_field:string,sort_direction:string} , { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(
        `${url.marketplace}/collection`,payload
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);


export const getMarketplaceCollections = createAsyncThunk(
  "getMarketplaceCollections",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.marketplace}/marketplace-collection`
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
// getSingleCollectionDetail
export const getSingleMarketplaceCollectionDetail = createAsyncThunk(
  "getSingleMarketplaceCollectionDetail",
  async (payload:  string , { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.marketplace}/marketplace-collection/${payload}`
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);

export const getNftByAttribute = createAsyncThunk(
  "getNftByAttribute",
  async (
    payload: { "limit": string; "show_attribute":string, "sort_direction": string, "contract_address":string, "attributes":any  },
    { rejectWithValue, getState }
  ) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(
        `${url.marketplace}/collection/nft/attributes`,
        payload
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);






export const marketSelector = (state: any) => state.market;

export const {
  restoreDefault,

} = marketSlice.actions;
export default marketSlice.reducer;
