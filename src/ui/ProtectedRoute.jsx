import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import { useEffect } from 'react';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
