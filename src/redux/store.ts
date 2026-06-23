import { configureStore } from '@reduxjs/toolkit';
// Các reducers sẽ được import từ features/
import authReducer from '@/redux/slice/authSlice';
import productReducer from '@/redux/slice/productSlice';
import customerReducer from '@/redux/slice/customerSlice';
import invoiceReducer from '@/redux/slice/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    customer: customerReducer,
    invoice: invoiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
