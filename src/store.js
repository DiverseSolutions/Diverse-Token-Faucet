import { configureStore } from '@reduxjs/toolkit'

import { metamaskReducer } from "./slices/metamaskSlice";
import { networksReducer } from './slices/networksSlice';
import { tokensReducer } from './slices/tokensSlice';

const store = configureStore({
  reducer: {
    metamask: metamaskReducer,
    networks: networksReducer,
    tokens: tokensReducer,
  }
})

export default store;
