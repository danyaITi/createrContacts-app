import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserData, UserResponse } from '../../types/auth'

export interface KnownError {
    errorMessage: string
}

export const fetchRegister = createAsyncThunk<UserResponse,UserData,{ rejectValue: KnownError }>(
  'auth/register',
    async (body:UserData,{ rejectWithValue }) => {
        try {
            const {data} = await axios.post<UserResponse>('http://localhost:3001/register',{...body})
            return data
        } catch (error:any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)



export const fetchLogin = createAsyncThunk<UserResponse,UserData,{ rejectValue: KnownError }>(
    'auth/login',
    async ({email,password},{ rejectWithValue }) => {
        try {
          const {data} = await axios.post<UserResponse>('http://localhost:3001/login',{email,password})
          localStorage.setItem('userToken',data.accessToken)
          return data
        } catch (error:any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data)
            } else {
              return rejectWithValue(error.message)
            }
        }
    }  
)
