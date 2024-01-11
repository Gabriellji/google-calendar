import { useEffect,  } from 'react';
import { useNavigate} from 'react-router-dom';
import { ClientRoute } from '../constants/routes';

export function getCookie(name: string) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
  }

export const ProtectedRoute = (Component: any) => {
  const Wrapper = (props: any) => {
	const navigate = useNavigate();
	const token = getCookie('session_token');
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
