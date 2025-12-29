import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Analysis",
      description:
        "Rule-based processing for intelligent grievance categorization",
      color: "bg-blue-100 text-blue-800",
    },
    {
      icon: "⚡",
      title: "Instant Processing",
      description:
        "Immediate categorization, urgency scoring, and department routing",
      color: "bg-green-100 text-green-800",
    },
    {
      icon: "🎯",
      title: "Smart Routing",
      description: "Automatic department assignment based on content analysis",
      color: "bg-purple-100 text-purple-800",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Visual insights and trends for government officials",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Intelligent Public Grievance Platform
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          AI-assisted decision support system for efficient governance and
          citizen service delivery
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            AI-Assisted
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Rule-Based Processing
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Multi-Agent System
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {/* <div className="text-4xl mb-4">📝</div> */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Submit New Grievance
          </h2>
          <p className="text-gray-600 mb-6">
            File a new public grievance and get instant AI-powered analysis and
            routing
          </p>
          <button
            onClick={() => navigate("/submit")}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Grievance
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {/* <div className="text-4xl mb-4">📊</div> */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            View comprehensive analytics, trends, and insights from grievance
            data
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            View Dashboard
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Submit</h3>
            <p className="text-gray-600 text-sm">
              Citizens submit grievances through the web interface
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Process
            </h3>
            <p className="text-gray-600 text-sm">
              AI agents analyze, categorize, and route grievances automatically
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              Monitor
            </h3>
            <p className="text-gray-600 text-sm">
              Officials track progress and identify trends through analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
