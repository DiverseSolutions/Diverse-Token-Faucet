import { configureStore } from '@reduxjs/toolkit'

import { haveMetamaskReducer } from "./slices/haveMetamaskSlice";
import { networksReducers } from './slices/networksSlice';

const store = configureStore({
  reducer: {
    haveMetamask: haveMetamaskReducer,
    networks: networksReducers,
  }
})

export default store;
