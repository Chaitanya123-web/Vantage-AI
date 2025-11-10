import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Optional: Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!notifications.length) return <p className="text-gray-500">No notifications</p>;

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-bold mb-2">Notifications</h2>
      <ul>
        {notifications.map((notif, idx) => (
          <li
            key={idx}
            className="border-b border-gray-200 py-2 last:border-b-0"
          >
            <p className="font-medium">{notif.title}</p>
            <p className="text-sm text-gray-600">{notif.message}</p>
            <p className="text-xs text-gray-400">{new Date(notif.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
