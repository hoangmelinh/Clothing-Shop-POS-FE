import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { RoleEnum } from '@/types/auth.types';
import { useEffect, useState } from 'react';
import { useLazyGetAccountQuery } from '@/redux/api/authApi';

interface RoleRouteProps {
  allowedRoles: RoleEnum[];
}

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(!user && isAuthenticated);
  const [triggerGetAccount] = useLazyGetAccountQuery();

  useEffect(() => {
    if (!user && isAuthenticated) {
      triggerGetAccount()
        .unwrap()
        .finally(() => {
          setIsInitializing(false);
        });
    } else {
      setIsInitializing(false);
    }
  }, [user, isAuthenticated, triggerGetAccount]);

  if (isInitializing || isLoading) {
    return <div className="flex items-center justify-center h-screen bg-background text-on-background">Đang tải thông tin người dùng...</div>;
  }

  if (!user && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Chuyển về dashboard nếu không có quyền
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
