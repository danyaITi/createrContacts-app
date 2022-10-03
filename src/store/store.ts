import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { contactsApi } from './api/contacts.api'
import auth from './slice/auth'

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(contactsApi.middleware),
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch =  useDispatch; 
