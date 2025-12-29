import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubmitGrievance from "./pages/SubmitGrievance";
import Dashboard from "./pages/Dashboard";
import GrievanceList from "./pages/GrievanceList";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <header className="flex justify-center items-center m-3 p-3 ">
        <h1 className="text-3xl text-blue-500">
          IPG-DSP - Intelligent Public Grievance Platform
        </h1>
      </header>

      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitGrievance />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grievances" element={<GrievanceList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
