import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientRoute } from '../../constants/routes';

const AuthCallbackComponent = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('accessToken');
    if (token) {
      localStorage.setItem('accessToken', token);
      navigate(ClientRoute.EVENTS);
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallbackComponent;
