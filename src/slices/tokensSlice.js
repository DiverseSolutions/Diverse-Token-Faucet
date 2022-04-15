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
      .addCase(fetchTokens.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.state = 'succeeded'
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.state = 'failed'
        state.error = action.error.message
      })
  }
})

export const fetchTokens = createAsyncThunk('tokens/fetchTokens',async () => {
  let data = await fetch("https://tokenlist.dsolutions.mn/api/mumbai/tokenlist")
  return data.json()
})

export const tokensReducer = tokensSlice.reducer;
