import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/submit", label: "Submit Grievance", icon: "📝" },
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/grievances", label: "All Grievances", icon: "📋" },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                 transition-all duration-300
                 ${
                   isActive
                     ? "bg-blue-600 text-white shadow"
                     : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                 }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
