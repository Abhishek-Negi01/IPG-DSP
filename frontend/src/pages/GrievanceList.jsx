import React, { useState, useEffect } from "react";
import { grievanceAPI } from "../services/api";

function GrievanceList() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGrievance, setSelectedGrievance] = useState(null);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      setLoading(true);
      const response = await grievanceAPI.getGrievances();
      setGrievances(response.data);
    } catch (err) {
      setError("Failed to load grievances");
      console.error("Grievances error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (score) => {
    if (score >= 0.7) return "text-red-600";
    if (score >= 0.5) return "text-yellow-600";
    return "text-green-600";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All Grievances</h1>
      <p className="text-gray-600 mb-6">
        Complete list of submitted grievances with AI processing results
      </p>

      {grievances.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No grievances found
          </h2>
          <p className="text-gray-600">
            Submit your first grievance to get started
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Citizen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grievances.map((grievance) => (
                  <tr key={grievance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{grievance.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {grievance.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grievance.citizen_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {grievance.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${getUrgencyColor(
                          grievance.urgency_score
                        )}`}
                      >
                        {grievance.urgency_score.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs truncate">
                        {grievance.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          grievance.status
                        )}`}
                      >
                        {grievance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedGrievance(grievance)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Grievance Details - #{selectedGrievance.id}
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Title:</h4>
                  <p className="text-gray-900">{selectedGrievance.title}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Description:</h4>
                  <p className="text-gray-900">
                    {selectedGrievance.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Citizen:</h4>
                    <p className="text-gray-900">
                      {selectedGrievance.citizen_name}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Contact:</h4>
                    <p className="text-gray-900">
                      {selectedGrievance.citizen_contact}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Location:</h4>
                  <p className="text-gray-900">{selectedGrievance.location}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    AI Processing Results:
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {selectedGrievance.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Urgency Score:
                      </span>
                      <span
                        className={`ml-2 font-medium ${getUrgencyColor(
                          selectedGrievance.urgency_score
                        )}`}
                      >
                        {selectedGrievance.urgency_score.toFixed(1)}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">Department:</span>
                      <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {selectedGrievance.department}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedGrievance(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GrievanceList;
