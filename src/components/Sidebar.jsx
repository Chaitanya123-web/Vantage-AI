import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartBar,
  FaLightbulb,
  FaCogs,
  FaUser,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Predictions", icon: <FaChartBar />, path: "/predictions" },
    { name: "Explainable AI", icon: <FaLightbulb />, path: "/explainable-ai" },
    { name: "Stress Testing", icon: <FaChartBar />, path: "/stress-testing" },
    { name: "Notifications", icon: <FaBell />, path: "/notifications" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Settings", icon: <FaCogs />, path: "/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div
      className={`bg-gray-900 text-white h-screen transition-width duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className={`text-xl font-bold ${!isOpen && "hidden"}`}>Vantage AI</span>
        <button
          className="p-2 rounded hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      <ul className="mt-4">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              className={`flex items-center p-3 hover:bg-gray-700 transition-colors duration-200 ${
                location.pathname === item.path ? "bg-gray-800" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;