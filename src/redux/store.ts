import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slice/authSlice';
import productReducer from '@/redux/slice/productSlice';
import customerReducer from '@/redux/slice/customerSlice';
import orderReducer from '@/redux/slice/orderSlice';
import { baseApi } from '@/redux/api/baseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    customer: customerReducer,
    order: orderReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
