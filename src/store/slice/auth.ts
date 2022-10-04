import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchLogin, fetchRegister } from '../api/auth.api'
import {  State } from './types'

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null


const initialState:State = {
  userInfo: JSON.parse(localStorage.getItem('user') ?? 'null'),
  auth: false,
  loading: false,
  error: undefined,
  userToken
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   setAuth: (state,action: PayloadAction<boolean>) => {
    state.auth = action.payload
   },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLogin.rejected, (state, {payload}) => {
      state.loading = false
      state.error = payload
    });
    builder.addCase(fetchLogin.fulfilled, (state,action) => {
      state.loading = false
      
      state.userInfo = action.payload.user
      localStorage.setItem('user', JSON.stringify(state.userInfo))

      state.userToken = action.payload.accessToken
      state.auth = true 
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true
      state.error = undefined
    });

    // register
    builder.addCase(fetchRegister.rejected, (state, {payload}) => {
      state.loading = false
      state.error = payload
    });
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.loading = false
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.loading = true
      state.error = undefined
    })
  },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer