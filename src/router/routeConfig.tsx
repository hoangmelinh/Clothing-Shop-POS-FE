import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// ── Lazy load features ────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));

// Products
const ProductListPage = lazy(() => import('@/pages/products/ProductListPage'));
const ProductDetailPage = lazy(() => import('@/pages/products/ProductDetailPage'));
const ProductFormPage = lazy(() => import('@/pages/products/ProductFormPage'));

// Customers
const CustomerListPage = lazy(() => import('@/pages/customers/CustomerListPage'));
const CustomerFormPage = lazy(() => import('@/pages/customers/CustomerFormPage'));
const CustomerGroupListPage = lazy(() => import('@/pages/customers/CustomerGroupListPage'));

// Invoices
const InvoiceListPage = lazy(() => import('@/pages/invoices/InvoiceListPage'));
const InvoiceCreatePage = lazy(() => import('@/pages/invoices/InvoiceCreatePage'));
const InvoiceDetailPage = lazy(() => import('@/pages/invoices/InvoiceDetailPage'));

// Warehouse
const WarehouseListPage = lazy(() => import('@/pages/warehouse/WarehouseListPage'));
const SupplierListPage = lazy(() => import('@/pages/warehouse/SupplierListPage'));
const StockReceiptListPage = lazy(() => import('@/pages/warehouse/StockReceiptListPage'));
const StockReceiptFormPage = lazy(() => import('@/pages/warehouse/StockReceiptFormPage'));
const ReturnTicketListPage = lazy(() => import('@/pages/warehouse/ReturnTicketListPage'));
const ReturnTicketFormPage = lazy(() => import('@/pages/warehouse/ReturnTicketFormPage'));

// Users
const UserListPage = lazy(() => import('@/pages/users/UserListPage'));
const UserFormPage = lazy(() => import('@/pages/users/UserFormPage'));

// ── Route Config ──────────────────────────────────────────────────────────────
export const routes: RouteObject[] = [
  // Public Routes
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
    ],
  },
  // Protected Routes
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'dashboard', element: <DashboardPage /> },

          // Products
          { path: 'products', element: <ProductListPage /> },
          { path: 'products/new', element: <ProductFormPage /> },
          { path: 'products/:id', element: <ProductDetailPage /> },
          { path: 'products/:id/edit', element: <ProductFormPage /> },

          // Customers
          { path: 'customers', element: <CustomerListPage /> },
          { path: 'customers/new', element: <CustomerFormPage /> },
          { path: 'customers/:id/edit', element: <CustomerFormPage /> },
          { path: 'customers/groups', element: <CustomerGroupListPage /> },

          // Invoices
          { path: 'invoices', element: <InvoiceListPage /> },
          { path: 'invoices/new', element: <InvoiceCreatePage /> },
          { path: 'invoices/:id', element: <InvoiceDetailPage /> },

          // Warehouse
          { path: 'warehouse/warehouses', element: <WarehouseListPage /> },
          { path: 'warehouse/suppliers', element: <SupplierListPage /> },
          { path: 'warehouse/receipts', element: <StockReceiptListPage /> },
          { path: 'warehouse/receipts/new', element: <StockReceiptFormPage /> },
          { path: 'warehouse/returns', element: <ReturnTicketListPage /> },
          { path: 'warehouse/returns/new', element: <ReturnTicketFormPage /> },

          // Users (ADMIN ONLY)
          {
            element: <AdminRoute />,
            children: [
              { path: 'users', element: <UserListPage /> },
              { path: 'users/new', element: <UserFormPage /> },
              { path: 'users/:id/edit', element: <UserFormPage /> },
            ]
          }
        ]
      }
    ]
  },
  // Fallback
  { path: '*', element: <DashboardPage /> } // Redirect tạm, TODO: Thêm NotFoundPage
];
