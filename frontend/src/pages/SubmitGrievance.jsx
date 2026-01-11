import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { grievanceAPI } from "../services/api";

function SubmitGrievance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedGrievance, setSubmittedGrievance] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    citizen_name: "",
    citizen_contact: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await grievanceAPI.createGrievance(formData);
      setSubmittedGrievance(response.data);
      setSuccess(true);

      // Reset form
      setFormData({
        title: "",
        description: "",
        citizen_name: "",
        citizen_contact: "",
        location: "",
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit grievance");
    } finally {
      setLoading(false);
    }
  };

  if (success && submittedGrievance) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Header */}
        <div className="bg-white border-b-4 border-green-600 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Grievance Submitted
                </h1>
                <p className="text-sm text-gray-600">Processing Complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Grievance Submitted Successfully!
              </h2>
              <p className="text-lg text-gray-600">
                Your grievance has been processed by our intelligent system and
                routed to the appropriate department.
              </p>
            </div>

            {/* Processing Results Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="bg-green-600 text-white px-6 py-4">
                <h3 className="text-xl font-semibold">Processing Results</h3>
                <p className="text-green-100 text-sm mt-1">
                  AI-powered analysis and routing completed
                </p>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Grievance ID
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      #{submittedGrievance.id}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Current Status
                    </p>
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {submittedGrievance.status}
                    </span>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Category (AI Detected)
                    </p>
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full capitalize">
                      {submittedGrievance.category}
                    </span>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Urgency Level
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            submittedGrievance.urgency_score >= 0.7
                              ? "bg-red-500"
                              : submittedGrievance.urgency_score >= 0.5
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${submittedGrievance.urgency_score * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {(submittedGrievance.urgency_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Routed to Department
                    </p>
                    <span className="inline-block px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg">
                      {submittedGrievance.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What Happens Next?
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <p>
                    Your grievance has been forwarded to{" "}
                    <strong>{submittedGrievance.department}</strong>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <p>
                    The concerned department will review and take appropriate
                    action
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <p>
                    You will be contacted at your provided contact information
                    for updates
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">4.</span>
                  <p>
                    Use Grievance ID <strong>#{submittedGrievance.id}</strong>{" "}
                    for future reference
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSuccess(false)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Another Grievance
              </button>
              <button
                onClick={() => navigate("/grievances")}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View All Grievances
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Submit Your Grievance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your complaint will be automatically processed and routed to the
              appropriate department for swift resolution.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex">
                <span className="text-red-500 mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h3 className="text-xl font-semibold">Grievance Details</h3>
              <p className="text-blue-100 text-sm mt-1">
                Please fill all required fields marked with *
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grievance Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Brief description of your issue (e.g., Broken streetlight on Main Road)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Please provide complete details:
• What exactly happened?
• When did this occur?
• How has it affected you or the community?
• What resolution do you expect?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="citizen_name"
                    value={formData.citizen_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your complete name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Information *
                  </label>
                  <input
                    type="text"
                    name="citizen_contact"
                    value={formData.citizen_contact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Mobile number or email address"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location Details *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Complete address (e.g., Main Street near City Hospital, Ward 12, Block A-101)"
                  />
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">ℹ️</span>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">What happens next?</p>
                    <p>
                      Your grievance will be automatically categorized, assigned
                      an urgency level, and routed to the appropriate government
                      department for resolution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Your Grievance...
                    </>
                  ) : (
                    "Submit Grievance"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitGrievance;
