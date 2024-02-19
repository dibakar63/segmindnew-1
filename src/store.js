
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from "./slice/SessionSlice"


export default configureStore({
  reducer: {
    session: sessionReducer,
  },
});


// console.log("Redux Store Configuration:", store.getState());




