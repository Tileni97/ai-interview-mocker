import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import { FaRegClipboard, FaChartBar, FaLightbulb } from "react-icons/fa";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
      <header className="mb-12">
        <h1 className="font-bold text-4xl text-gray-800 mb-2">
          Your AI Interview Hub
        </h1>
        <p className="text-gray-600 text-lg">
          Prepare, Practice, and Perfect Your Interview Skills
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <DashboardCard
          icon={<FaRegClipboard className="text-2xl text-blue-600" />}
          title="New Interview"
          description="Start a new AI-powered mock interview"
          color="blue"
        >
          <AddNewInterview />
        </DashboardCard>

        <DashboardCard
          icon={<FaChartBar className="text-2xl text-green-600" />}
          title="Your Progress"
          description="Track your improvement over time"
          color="green"
        />

        <DashboardCard
          icon={<FaLightbulb className="text-2xl text-yellow-600" />}
          title="Interview Tips"
          description="Get expert advice to ace your interviews"
          color="yellow"
        />
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Previous Interviews
        </h2>
        <InterviewList />
      </section>
    </div>
  );
}

function DashboardCard({ icon, title, description, children, color }) {
  const colorClasses = {
    blue: "from-blue-50 to-white",
    green: "from-green-50 to-white",
    yellow: "from-yellow-50 to-white",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full bg-${color}-100 mr-4`}>{icon}</div>
        <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
}

export default Dashboard;
