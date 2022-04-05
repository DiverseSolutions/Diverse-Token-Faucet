import { createSlice } from '@reduxjs/toolkit'

const haveMetamaskSlice = createSlice({
  name : 'haveMetamask',
  initialState : {
    value: false
  },
  reducers : {
  },
})

export const haveMetamaskReducer = haveMetamaskSlice.reducer;
