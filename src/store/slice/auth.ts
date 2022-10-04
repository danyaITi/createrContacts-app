import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchLogin, fetchRegister } from '../api/auth.api'
import {  State } from './types'

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null


const initialState:State = {
  userInfo: JSON.parse(localStorage.getItem('user') ?? 'null'),
  isAuth: false,
  isRegister:false,
  isLoading: false,
  errorLogin: undefined,
  errorSign: undefined,
  userToken
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   setAuth: (state,action: PayloadAction<boolean>) => {
    state.isAuth = action.payload
   }
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLogin.rejected, (state, {payload}) => {
      state.isLoading = false
      state.errorLogin = payload
    });
    builder.addCase(fetchLogin.fulfilled, (state,action) => {
      state.isLoading = false
      
      state.userInfo = action.payload.user
      localStorage.setItem('user', JSON.stringify(state.userInfo))

      state.userToken = action.payload.accessToken
      state.isAuth = true 
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true
      state.errorLogin = undefined
    });

    // register
    builder.addCase(fetchRegister.rejected, (state, {payload}) => {
      state.isLoading = false
      state.errorSign = payload
    });
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.isLoading = false
      state.isRegister = true
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true
      state.errorSign = undefined
    })
  },
})

export const { setAuth} = authSlice.actions

export default authSlice.reducer