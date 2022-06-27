import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const tokensSlice = createSlice({
  name: 'tokensSlice',
  initialState: {
    data: [],
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    state: 'idle',
    error: '',
  },
  reducers: {

  },
  extraReducers(builder){
    builder
      .addCase(fetchMumbaiTokens.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(fetchMumbaiTokens.fulfilled, (state, action) => {
        state.state = 'succeeded'
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchMumbaiTokens.rejected, (state, action) => {
        state.state = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchBscTestNetTokens.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(fetchBscTestNetTokens.fulfilled, (state, action) => {
        state.state = 'succeeded'
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchBscTestNetTokens.rejected, (state, action) => {
        state.state = 'failed'
        state.error = action.error.message
      })
  }
})

export const fetchMumbaiTokens = createAsyncThunk('tokens/fetchMumbaiTokens',async () => {
  let data = await fetch("https://tokenlist.dsolutions.mn/api/mumbai/tokenlist")
  return data.json()
})

export const fetchBscTestNetTokens = createAsyncThunk('tokens/fetchBscTestNetTokens',async () => {
  let data = await fetch("https://tokenlist.dsolutions.mn/api/bscTestNet/tokenlist")
  return data.json()
})

export const tokensReducer = tokensSlice.reducer;
