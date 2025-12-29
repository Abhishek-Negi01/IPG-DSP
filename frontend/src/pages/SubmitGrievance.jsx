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
      <div className="container">
        <div className="alert alert-success shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Grievance Submitted Successfully!
          </h2>
          <p className="mb-4">
            Your grievance has been processed by our AI system. Here are the
            results:
          </p>

          <div className="card shadow-md border border-green-200">
            <div className="grid grid-2 gap-4">
              <div>
                <p className="font-semibold">Grievance ID:</p>
                <p className="text-lg font-bold" style={{ color: "#2563eb" }}>
                  #{submittedGrievance.id}
                </p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <span className="badge badge-blue">
                  {submittedGrievance.status}
                </span>
              </div>
              <div>
                <p className="font-semibold">Category (AI Detected):</p>
                <span className="badge badge-purple">
                  {submittedGrievance.category}
                </span>
              </div>
              <div>
                <p className="font-semibold">Urgency Score:</p>
                <div className="flex items-center">
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${
                        submittedGrievance.urgency_score >= 0.7
                          ? "progress-high"
                          : submittedGrievance.urgency_score >= 0.5
                          ? "progress-medium"
                          : "progress-low"
                      }`}
                      style={{
                        width: `${submittedGrievance.urgency_score * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span>{submittedGrievance.urgency_score.toFixed(1)}</span>
                </div>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <p className="font-semibold">Routed to Department:</p>
                <span className="badge badge-indigo">
                  {submittedGrievance.department}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setSuccess(false)}
              className="btn btn-primary hover:bg-blue-700 transition-colors"
            >
              Submit Another Grievance
            </button>
            <button
              onClick={() => navigate("/grievances")}
              className="btn btn-secondary hover:bg-gray-600 transition-colors"
            >
              View All Grievances
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Submit New Grievance
      </h1>
      <p className="mb-6 text-gray-600 text-lg">
        Our AI system will automatically categorize and route your grievance to
        the appropriate department.
      </p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card shadow-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="form-group">
            <label className="form-label">Grievance Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input focus:ring-2 focus:ring-blue-500 transition-all text-base"
              placeholder="e.g., Broken streetlight on Main Road, Water supply issue in Block A"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea focus:ring-2 focus:ring-blue-500 transition-all min-h-40 text-base leading-relaxed"
              placeholder="Describe your issue in detail. For example:\n• What happened?\n• When did it occur?\n• How has it affected you?\n• What resolution do you expect?"
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                name="citizen_name"
                value={formData.citizen_name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Information *</label>
              <input
                type="text"
                name="citizen_contact"
                value={formData.citizen_contact}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Phone number or email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-input focus:ring-2 focus:ring-blue-500 transition-all text-base"
              placeholder="e.g., Main Street near City Hospital, Ward 12, Block A-101"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-outline hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit Grievance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitGrievance;
