import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/submit", label: "Submit Grievance", icon: "📝" },
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/grievances", label: "All Grievances", icon: "📋" },
  ];

  return (
    <nav className=" w-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-button ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {/* <span>{item.icon}</span> */}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
