import { baseApi } from './baseApi';
import type { Customer, CustomerGroup, CustomerRequest } from '@/types/customer.types';
import type { RestResponse, PageResponse, PaginationParams } from '@/types/common.types';

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<RestResponse<PageResponse<Customer>>, PaginationParams & { search?: string }>({
      query: (params) => ({
        url: '/customers',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.data?.content
          ? [
            ...result.data.content.map(({ id }) => ({ type: 'Customer' as const, id })),
            { type: 'Customer', id: 'LIST' },
          ]
          : [{ type: 'Customer', id: 'LIST' }],
    }),

    createCustomer: builder.mutation<RestResponse<Customer>, CustomerRequest>({
      query: (data) => ({
        url: '/crm/customers',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    }),
    updateCustomer: builder.mutation<RestResponse<Customer>, { id: number; data: CustomerRequest }>({
      query: ({ id, data }) => ({
        url: `/customers/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Customer', id },
        { type: 'Customer', id: 'LIST' },
      ],
    }),
    deactivateCustomer: builder.mutation<RestResponse<void>, number>({
      query: (id) => ({
        url: `/crm/customers/${id}/deactivate`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    }),
    activateCustomer: builder.mutation<RestResponse<void>, number>({
      query: (id) => ({
        url: `/crm/customers/${id}/activate`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    }),
    getCustomerGroups: builder.query<RestResponse<CustomerGroup[]>, void>({
      query: () => ({
        url: '/customer-groups',
        method: 'GET',
      }),
    }),

    // ==============================================================
    // list all customers with search and pagination
    // ==============================================================
    searchCustomers: builder.query<RestResponse<PageResponse<Customer>>, any>({
      query: (params) => ({
        url: '/crm/customers/search',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result?.data?.content
          ? [
            ...result.data.content.map(({ id }) => ({ type: 'Customer' as const, id })),
            { type: 'Customer', id: 'LIST' },
          ]
          : [{ type: 'Customer', id: 'LIST' }],
    }),
    // ==============================================================

    // get customer by id
    getCustomerById: builder.query<RestResponse<Customer>, number | string>({
      query: (id) => ({
        url: `/crm/customers/${id}`,
        method: 'GET',
      }),
      // Khi có lệnh xóa/cập nhật thì data này sẽ tự làm mới
      providesTags: (result, error, id) => [{ type: 'Customer', id }],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useGetCustomerGroupsQuery,
  useSearchCustomersQuery,
  useDeactivateCustomerMutation,
  useActivateCustomerMutation,
} = customerApi;
