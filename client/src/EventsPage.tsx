import { useEffect, useState } from 'react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://yourbackend.com/calendar/events', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  // Render events in a table or list
  // ...

  return (
    <div>
      {/* Render your events here */}
    </div>
  );
};

export default EventsPage;
