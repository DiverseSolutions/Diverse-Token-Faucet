import { configureStore } from '@reduxjs/toolkit'

import haveMetamaskSlice from "./slices/haveMetamaskSlice";

const store = configureStore({
  reducer: haveMetamaskSlice.reducer
})

export default store;
