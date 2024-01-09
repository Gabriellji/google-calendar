import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CallbackComponent = () => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);
      history.push('/events');
    } else {
      history.push('/login');
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default CallbackComponent;
