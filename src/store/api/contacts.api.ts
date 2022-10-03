import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IContacts, NContact } from '../../types/contacts'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getContacts: builder.query<IContacts[], number | undefined>({
      query: (id) => `contacts?userId=${id}`,
      providesTags: (result) =>
        result
      ? [
          ...result.map(({ id }) => ({ type: 'Contacts' as const, id })),
          { type: 'Contacts', id: 'LIST' },
        ]
      : [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContact: builder.mutation<IContacts,NContact>({
      query: (body) => ({
        url: 'contacts',
        method: 'POST',  
        body
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }]
    }),
    editContact: builder.mutation<any,any>({
      query: ({id,...body}) => ({
        url: `contacts/${id}`,
        method: 'PATCH', 
        body
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }]
    }),
    deleteContact: builder.mutation<IContacts,number | undefined>({
      query: (id:number) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }]
    }),
    searchContact: builder.query<IContacts[],string>({ 
      query: (search: string) => `contacts?q=${search}`
    })
  })
})


export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation, useSearchContactQuery, useEditContactMutation } = contactsApi