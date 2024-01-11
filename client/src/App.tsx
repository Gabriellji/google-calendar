import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AuthCallbackComponent from './pages/auth/AuthCallbackPage';
import EventsPage from './pages/events/EventsPage';
import { ClientRoute } from './constants/routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ClientRoute.LOGIN} Component={LoginPage} />
        <Route path={ClientRoute.AUTH_CALLBACK} Component={AuthCallbackComponent} />
        <Route path={ClientRoute.EVENTS} Component={EventsPage} />
		<Route path="*" element={<Navigate to={ClientRoute.EVENTS} replace />} />
      </Routes>
    </Router>
  );
};

export default App;


