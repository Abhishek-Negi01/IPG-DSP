import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubmitGrievance from "./pages/SubmitGrievance";
import Dashboard from "./pages/Dashboard";
import GrievanceList from "./pages/GrievanceList";

export default function App() {
  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-700 border-b-2 border-blue-700 pb-1"
      : "text-gray-700 hover:text-blue-700 pb-1";

  return (
    <BrowserRouter>
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">IPG-DSP</span>
            <span className="text-xs text-gray-500">
              Intelligent Public Grievance Redressal Platform
            </span>
          </div>

          <nav className="flex gap-8 text-sm font-medium">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/submit" className={navClass}>
              Submit Grievance
            </NavLink>
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/grievances" className={navClass}>
              All Grievances
            </NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitGrievance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grievances" element={<GrievanceList />} />
      </Routes>
    </BrowserRouter>
  );
}
