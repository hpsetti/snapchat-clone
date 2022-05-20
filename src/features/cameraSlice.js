import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cameraImage: null,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
        state.cameraImage = null;
    }
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
