import { useEffect,  } from 'react';
import { useNavigate} from 'react-router-dom';
import { ClientRoute } from '../constants/routes';

export const ProtectedRoute = (Component: any) => {
  const Wrapper = (props: any) => {
	const navigate = useNavigate();
	const token = localStorage.getItem('accessToken');
	useEffect(() => {
	  if (!token) {
		navigate(ClientRoute.LOGIN);
	  }
	}, [navigate]);

	if(!token) return null;

	return <Component {...props} />;
  };

  return Wrapper;
};
