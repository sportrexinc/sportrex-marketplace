import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIService from "@/app/utils/APIServices";
import { url } from "@/app/utils/endpoints";
import { getSimplifiedError } from "@/app/utils";
export interface AuthState {
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
  language:string

  
}

const initialState: AuthState = {
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
  language: "en"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreDefault: (state) => {
      state.loading = false;
      state.token = "";
      state.userData = {};
      state.address = "";
      state.message = "";
    },
    resetAll: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
    },
    resetImageUpload: (state) => {
      state.avatarUpdateSuccess = false;
      state.bannerUpdateSuccess = false;
    },
    updateUserLanguage: (state, { payload }) => {
      state.language = payload.language;
      state.languageName = payload.name;
    },

    setAddress: (state, action: PayloadAction<any>) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.data;
        state.profileStatus = payload?.status;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.profileStatus = "error";
      })
      .addCase(verifyUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUsername.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.message = payload.message;
        state.verifyStatus = payload.status;
      })
      .addCase(verifyUsername.rejected, (state, { payload }) => {
        state.loading = false;
        state.message = "";

        state.verifyStatus = "";
      })
      .addCase(updateUserProfileAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfileAvatar.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.avatarUpdateSuccess = true;
      })
      .addCase(updateUserProfileAvatar.rejected, (state, { payload }) => {
        state.loading = false;
        state.avatarUpdateSuccess = false;
      })
      .addCase(updateUserProfileBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfileBanner.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.bannerUpdateSuccess = true;
      })
      .addCase(updateUserProfileBanner.rejected, (state, { payload }) => {
        state.loading = false;
        state.bannerUpdateSuccess = false;
      })
      .addCase(createUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;

     
      })
      .addCase(createUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
    
      })
      
      
      ;
    // end of session
  },
});

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (payload: { address: string }, { rejectWithValue, getState }) => {
       const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.profile}/${payload.address}`);
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
export const verifyUsername = createAsyncThunk(
  "verifyUsername",
  async (payload: any, { rejectWithValue, getState }) => {
    try {
      const { data } = await APIService.get(
        `${url.profile}/username?username=${payload}`
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (payload: { data: any; address: string }, { rejectWithValue, getState }) => {
    try {
      const { data } = await APIService.put(
        `${url.profile}/${payload.address}`,
        {...payload.data}
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
export const updateUserProfileBanner = createAsyncThunk(
  "updateUserProfileBanner",
  async (payload: { image: any; address: string }, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
 const formData = new FormData();
 formData.append("file", payload.image);
    try {
      const { data } = await APIService.put(
        `${url.profile}/${payload.address}/banner`,
        formData
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
export const updateUserProfileAvatar = createAsyncThunk(
  "updateUserProfileAvatar",
  async (payload: { image: any, address: string }, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
 const formData = new FormData();
    formData.append("file", payload.image);
   
    try {
      const { data } = await APIService.put(
        `${url.profile}/${payload.address}/avatar`,
        formData
      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);
export const createUserProfile = createAsyncThunk(
  "createUserProfile",
  async (payload: {  address: string | undefined }, { rejectWithValue, getState }) => {
    const { auth }: any = getState();

    try {
      const { data } = await APIService.post(
        `${url.profile}/${payload.address}`,

      );
      return data;
    } catch (error: any) {
      let newError = getSimplifiedError(error);
      return rejectWithValue(newError);
    }
  }
);

export const authSelector = (state: any) => state.auth;

export const { restoreDefault, resetAll, setAddress,resetImageUpload , updateUserLanguage} = authSlice.actions;
export default authSlice.reducer;
