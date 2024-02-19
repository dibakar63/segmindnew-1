import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    loginDetails: {},
  },
  reducers: {
    setLoginDetails: (state, action) => {
      console.log("Reducer: Setting login details", action.payload);
       state.loginDetails = action.payload;
      // state.loginDetails = { ...action.payload };
      console.log(state.loginDetails)
    },
  },
});

export const {setLoginDetails} = sessionSlice.actions;

export default sessionSlice.reducer;
