import { baseApi } from './baseApi';
import type { LoginRequest, LoginResponse, UserLogin } from '@/types/auth.types';
import type { RestResponse } from '@/types/common.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<RestResponse<LoginResponse>, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
    }),
    getAccount: builder.query<RestResponse<{ user: UserLogin }>, void>({
      query: () => ({
        url: '/auth/account',
        method: 'GET',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetAccountQuery,
  useLazyGetAccountQuery,
  useLogoutMutation,
} = authApi;
