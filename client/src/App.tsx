import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import CallbackComponent from './CallbackComponent';
import EventsPage from './EventsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/oauth-callback" Component={CallbackComponent} />
        <Route path="/events" Component={EventsPage} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;


