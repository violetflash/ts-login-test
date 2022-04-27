import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../models/IUser';

export const apiService = createApi({
    reducerPath: 'api',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (build) => ({
        fetchUsers: build.query<IUser[], null>({
            query: () => ({
                url: '/users'
            }),
            providesTags: (result) => ['Users']
        }),
        fetchUserById: build.query<IUser, number>({
            query: (id) => ({
                url: `/users/${id}`
            })
        }),
        updateUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'POST',
                data: user
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const { useFetchUsersQuery, useFetchUserByIdQuery } = apiService;
