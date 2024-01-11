import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientRoute } from '../../constants/routes';
import Loader from '../../components/Loader';

export const AuthCallbackComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ClientRoute.EVENTS);
  }, [navigate]);

  return <Loader />;
};

export default AuthCallbackComponent;
