import { batch } from 'react-redux'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const metamaskSlice = createSlice({
  name : 'haveMetamask',
  initialState : {
    haveMetamask: false,
    account: null,
    accounts: [],
    chainId : -100,
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    accountState: 'idle',
    accountError: '',
  },
  reducers : {
    checkMetamask: (state) => {
      if (typeof window.ethereum !== 'undefined') {
        state.haveMetamask = true;

        if(window.ethereum.selectedAddress !== null){
          state.account = window.ethereum.selectedAddress
          state.chainId = parseInt(window.ethereum.networkVersion)
        }
      }
    },
    setAccount: (state,action) => {
      state.account = action.payload
    },
    setChainId: (state,action) => {
      state.chainId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetamaskAccounts.pending,(state,action) => {
        state.accountState = 'loading'
      })
      .addCase(fetchMetamaskAccounts.fulfilled,(state,action) => {
        state.accountState = 'succeeded'
        state.account = window.ethereum.selectedAddress
        state.chainId = parseInt(window.ethereum.networkVersion)
        state.haveMetamask = true
        state.accounts = [...action.payload]
      })
      .addCase(fetchMetamaskAccounts.rejected,(state,action) => {
        state.accountState = 'failed'
        if (action.error.code === 4001) {
          state.accountError = 'Connect to Metamask'
        }else{
          state.accountError = action.error.message
        }
      })
  }
})

export const fetchMetamaskAccounts = createAsyncThunk('metamask/fetchMetamaskAccounts', async (payload,thunkAPI) => {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  return accounts
})

export const { checkMetamask,setAccount } = metamaskSlice.actions;
export const metamaskReducer = metamaskSlice.reducer;
