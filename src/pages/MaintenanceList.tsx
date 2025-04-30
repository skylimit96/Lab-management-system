import React from "react";
import { useNavigate } from "react-router-dom";
import { MaintenanceProcedure } from "../types";
import Card from "../components/ui/Card";
import { BarChart, Wrench } from "lucide-react";

const MOCK_PROCEDURES: MaintenanceProcedure[] = [
  {
    id: "central-wing",
    title: "Central Wing Assembly",
    description:
      "Complete assembly process for the central wing component of the UAV.",
    category: "Assembly",
    duration: "2 hours",
    difficulty: "Intermediate",
    steps: [], // Steps defined in MaintenanceProcedure.tsx
  },
  {
    id: "motor-replacement",
    title: "Motor Replacement",
    description: "Step-by-step guide for replacing a faulty motor.",
    category: "Repair",
    duration: "1 hour",
    difficulty: "Beginner",
    steps: [
      {
        id: "1",
        title: "Safety Check",
        description:
          "Ensure power is disconnected and the system is safe to work on.",
        imageUrl:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        isCompleted: false,
        estimatedTime: "5 minutes",
        tools: ["Multimeter", "Safety gloves"],
        safetyNotes: "Always verify power is completely disconnected",
      },
      // Add more steps...
    ],
  },
  {
    id: "camera-calibration",
    title: "Camera System Calibration",
    description: "Precision calibration of the UAV camera system.",
    category: "Maintenance",
    duration: "45 minutes",
    difficulty: "Advanced",
    steps: [
      {
        id: "1",
        title: "Setup Calibration Environment",
        description:
          "Prepare the calibration area with proper lighting and targets.",
        imageUrl:
          "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        isCompleted: false,
        estimatedTime: "10 minutes",
        tools: ["Calibration target", "Light meter"],
        safetyNotes: "Ensure stable mounting of all equipment",
      },
      // Add more steps...
    ],
  },
];

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-purple-100 text-purple-800",
};

const MaintenanceList: React.FC = () => {
  const navigate = useNavigate();
const handleClick = (id: string) => {
  navigate(`/maintenance/${id}`);
};

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800">
          Maintenance Procedures
        </h1>
        <p className="italic text-s font-small text-gray-400 leading-tight mb-6">
          Choose the maintenance procedure you want to start !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROCEDURES.map((procedure) => (
            <Card
              key={procedure.id}
              className="hover:shadow-lg transition-shadow cursor-pointer p-6 flex flex-col justify-between"
            >
              <div className="flex-1">
                <div className="mb-2">
                  <h3
                    className="text-lg font-semibold text-gray-900 hover:underline leading-tight"
                    onClick={() => handleClick(procedure.id)}
                  >
                    {procedure.title}
                  </h3>
                  <span
                    className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      difficultyColors[procedure.difficulty]
                    }`}
                  >
                    {procedure.difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {procedure.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4 mt-4">
                <div className="flex items-center">
                  <Wrench className="h-4 w-4 mr-1.5" />
                  {procedure.category}
                </div>
                <div className="flex items-center">
                  <BarChart className="h-4 w-4 mr-1.5" />
                  {procedure.steps.length} steps
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceList;
