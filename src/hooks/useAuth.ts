import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearError } from '@/redux/slice/authSlice';
import { useLoginMutation, useLogoutMutation } from '@/redux/api/authApi';
import type { LoginRequest } from '../types/auth.types';

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, accessToken, isAuthenticated, error } = useAppSelector((state) => state.auth);
  
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const login = async (credentials: LoginRequest) => {
    try {
      await loginMutation(credentials).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading: isLoginLoading || isLogoutLoading,
    error,
    login,
    logout,
    clearError: () => dispatch(clearError()),
  };
}
