import axiosInstance from '@/config/axiosInstance';
import type { LoginRequest, LoginResponse, UserLogin } from '@/types/auth.types';
import type { Customer, CustomerGroup, CustomerRequest } from '@/types/customer.types';
import type { Invoice, InvoiceRequest } from '@/types/invoice.types';
import type { Product, ProductRequest, ProductUpdateRequest, ProductFilterParams } from '@/types/product.types';
import type { User, UserRequest } from '@/types/user.types';
import type { Warehouse, Supplier } from '@/types/warehouse.types';
import type { RestResponse, PageResponse, PaginationParams } from '@/types/common.types';

// ─── Auth API ───────────────────────────────────────────────────────────────
export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<RestResponse<LoginResponse>>('/auth/login', data),

  getAccount: () =>
    axiosInstance.get<RestResponse<{ user: UserLogin }>>('/auth/account'),

  refresh: () =>
    axiosInstance.get<RestResponse<LoginResponse>>('/auth/refresh'),

  logout: () =>
    axiosInstance.post<void>('/auth/logout'),
};

// ─── Customer API ───────────────────────────────────────────────────────────
export const customerApi = {
  getAll: (params?: PaginationParams & { search?: string }) =>
    axiosInstance.get<RestResponse<PageResponse<Customer>>>('/customers', { params }),

  getById: (id: number) =>
    axiosInstance.get<RestResponse<Customer>>(`/customers/${id}`),

  create: (data: CustomerRequest) =>
    axiosInstance.post<RestResponse<Customer>>('/customers', data),

  update: (id: number, data: CustomerRequest) =>
    axiosInstance.put<RestResponse<Customer>>(`/customers/${id}`, data),

  getAllGroups: () =>
    axiosInstance.get<RestResponse<CustomerGroup[]>>('/customer-groups'),
};

// ─── Invoice API ────────────────────────────────────────────────────────────
export const invoiceApi = {
  getAll: (params?: PaginationParams & { status?: string; warehouseId?: number }) =>
    axiosInstance.get<RestResponse<PageResponse<Invoice>>>('/invoices', { params }),

  getById: (id: number) =>
    axiosInstance.get<RestResponse<Invoice>>(`/invoices/${id}`),

  create: (data: InvoiceRequest) =>
    axiosInstance.post<RestResponse<Invoice>>('/invoices', data),

  cancel: (id: number) =>
    axiosInstance.put<RestResponse<Invoice>>(`/invoices/${id}/cancel`),
};

// ─── Product API ────────────────────────────────────────────────────────────
export const productApi = {
  getAll: (params?: ProductFilterParams) =>
    axiosInstance.get<RestResponse<PageResponse<Product>>>('/products', { params }),

  getById: (id: number) =>
    axiosInstance.get<RestResponse<Product>>(`/products/${id}`),

  create: (data: ProductRequest) =>
    axiosInstance.post<RestResponse<Product>>('/products', data),

  update: (id: number, data: ProductUpdateRequest) =>
    axiosInstance.put<RestResponse<Product>>(`/products/${id}`, data),

  delete: (id: number) =>
    axiosInstance.delete<RestResponse<Product>>(`/products/${id}`),

  hardDelete: (id: number) =>
    axiosInstance.delete<RestResponse<string>>(`/products/${id}/permanent`),
};

// ─── User API ───────────────────────────────────────────────────────────────
export const userApi = {
  getAll: (params?: PaginationParams & { role?: string; isActive?: boolean }) =>
    axiosInstance.get<RestResponse<PageResponse<User>>>('/users', { params }),

  getById: (id: number) =>
    axiosInstance.get<RestResponse<User>>(`/users/${id}`),

  create: (data: UserRequest) =>
    axiosInstance.post<RestResponse<User>>('/users', data),

  update: (id: number, data: UserRequest) =>
    axiosInstance.put<RestResponse<User>>(`/users/${id}`, data),

  toggleActive: (id: number) =>
    axiosInstance.put<RestResponse<void>>(`/users/${id}/toggle-active`),
};

// ─── Warehouse API ──────────────────────────────────────────────────────────
export const warehouseApi = {
  getWarehouses: () =>
    axiosInstance.get<RestResponse<Warehouse[]>>('/warehouses'),

  getSuppliers: (params?: PaginationParams) =>
    axiosInstance.get<RestResponse<PageResponse<Supplier>>>('/suppliers', { params }),
};
