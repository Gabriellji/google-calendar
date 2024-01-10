import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AuthCallbackComponent from './pages/auth/AuthCallbackPage';
import EventsPage from './pages/events/EventsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/login/oauth-callback" Component={AuthCallbackComponent} />
        <Route path="/events" Component={EventsPage} />
      </Routes>
    </Router>
  );
};

export default App;


