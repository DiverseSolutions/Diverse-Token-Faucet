import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const networksSlice = createSlice({
  name: 'networksSlice',
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
      .addCase(fetchNetworks.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(fetchNetworks.fulfilled, (state, action) => {
        state.state = 'succeeded'
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchNetworks.rejected, (state, action) => {
        state.state = 'failed'
        state.error = action.error.message
      })
  }
})

export const fetchNetworks = createAsyncThunk('networks/fetchNetworks',async () => {
  const data = await fetch("https://chainlist.dsolutions.mn/api/chainlist")
  return data.json()
})

export const networksReducers = networksSlice.reducer;
