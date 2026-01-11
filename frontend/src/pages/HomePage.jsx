import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Intelligent Public Grievance Redressal Platform
            </h1>
            <p className="text-gray-600 mb-6">
              AI-assisted platform for efficient citizen grievance management
              and improved governance.
            </p>

            <div className="flex gap-4 mb-6">
              <Link
                to="/submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800"
              >
                Submit Grievance
              </Link>
              <Link
                to="/dashboard"
                className="border border-blue-700 text-blue-700 px-6 py-3 rounded-md hover:bg-blue-50"
              >
                View Dashboard →
              </Link>
            </div>

            <div className="flex gap-3 text-sm text-gray-600">
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                AI-Assisted
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                Rule-Based Processing
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                Multi-Agent System
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="h-48 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="bg-[#f5f8fc] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">
            Platform Features
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Rule-based processing for intelligent grievance categorization
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">
                Instant Processing
              </h3>
              <p className="text-sm text-gray-600">
                Immediate categorization, urgency scoring, and department
                routing
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">
                Smart Routing
              </h3>
              <p className="text-sm text-gray-600">
                Automatic department assignment based on content analysis
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Visual insights and reports for government officials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                [
                  "1",
                  "Submit",
                  "Citizens submit grievances through the web portal",
                  "bg-blue-100 text-blue-700",
                ],
                [
                  "2",
                  "Process",
                  "AI agents analyze, categorize, and route grievances",
                  "bg-green-100 text-green-700",
                ],
                [
                  "3",
                  "Monitor",
                  "Officials track and resolve grievances",
                  "bg-purple-100 text-purple-700",
                ],
              ].map(([num, title, text, color], i) => (
                <div
                  key={num}
                  className={
                    i !== 0 ? "border-t pt-8 flex gap-4" : "flex gap-4"
                  }
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${color}`}
                  >
                    {num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <img
                  src="/illustration/dashboard.jpg"
                  alt="Analytics Dashboard"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-DRIVEN ANALYTICS DASHBOARD */}
      <section className="bg-gradient-to-r from-blue-50 to-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            AI-Driven Analytics Dashboard
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              [
                "Efficiency",
                "Citizens submit grievances through the web portal",
                "/icons/efficiency.png",
              ],
              [
                "Process",
                "AI agents analyze, categorize, and route grievances",
                "/icons/process.png",
              ],
              [
                "Monitor",
                "Officials track and manage grievances",
                "/icons/monitor.png",
              ],
            ].map(([title, desc, icon]) => (
              <div
                key={title}
                className="bg-white rounded-xl shadow-sm p-6 flex gap-4 items-center"
              >
                <img src={icon} alt={title} className="w-14 h-14" />
                <div>
                  <h3 className="font-semibold text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIZEN TESTIMONIALS */}
      <section className="bg-gradient-to-r from-blue-50 to-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-14">
            Citizen Testimonials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Efficiency", "Faster grievance resolution with reduced delays"],
              ["Accessibility", "Easy online access for all citizens"],
              ["Transparency", "Clear tracking and real-time updates"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="bg-blue-100 rounded-2xl p-8 text-gray-800"
              >
                <h3 className="text-lg font-semibold mb-3">{title}</h3>
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
