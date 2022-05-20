import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  imageSelected: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login:(state, action) => {
      state.user = action.payload;
    },
    logout:(state) => {
      state.user = null;
    },
    imageSelect:(state, action) => {
      state.imageSelected = action.payload;
    },
    resetImage:(state) => {
      state.imageSelected = null;
    }
  },
});

export const { login, logout, imageSelect, resetImage } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectImage = (state) => state.app.imageSelected;


export default appSlice.reducer;
