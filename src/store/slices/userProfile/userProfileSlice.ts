
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../pages/users/types";

type UsersState = {
  profile: User | null,
}

const initialState : UsersState = {
  profile: null,
};


const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<User>) =>{
      state.profile = action.payload;
    },
    resetUserProfile: (state) =>{
      state.profile = null;
    },
  },
});

export const { setUserProfile, resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
