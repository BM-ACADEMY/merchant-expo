import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import "../css/Animation.css"



const socket = io(import.meta.env.VITE_SOCKET_IO_URL); // Adjust this URL based on your server address

const RequestNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('newNotification', (notification) => {
      console.log('New notification:', notification);
      // Add the new notification to the state
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.off('newNotification'); // Clean up when the component is unmounted
    };
  }, []);

  return (
    <div>
      {notifications.length > 0 && (
        <div className="notification-dropdown">
          <h3>New Notifications</h3>
          <ul>
            {notifications.map((notif, index) => (
              <li key={index}>{notif.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RequestNotification;
