import React, { useState, useEffect } from "react";
import { MaintenanceStep } from "../types";
import Card from "../components/ui/Card";
import {
  CheckCircle2,
  Clock,
  PenTool as Tool,
  AlertTriangle,
  Trophy
} from "lucide-react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";


const MOCK_STEPS: MaintenanceStep[] = [
  {
    id: "1",
    title: "Prepare Work Area",
    description:
      "Clear the workspace and gather all necessary tools. Ensure proper lighting and ventilation.",
    imageUrl:
      "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
    isCompleted: false,
    estimatedTime: "10 minutes",
    tools: ["Work bench", "Lighting equipment"],
    safetyNotes: "Ensure proper ventilation and wear appropriate PPE",
  },
  {
    id: "2",
    title: "Wing Component Inspection",
    description:
      "Carefully inspect all wing components for any damage or wear before assembly.",
    imageUrl:
      "https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg",
    isCompleted: false,
    estimatedTime: "15 minutes",
    tools: ["Magnifying glass", "Inspection light"],
    safetyNotes: "Document any findings thoroughly",
  },
  {
    id: "3",
    title: "Align Central Spar",
    description:
      "Position and align the central wing spar according to specifications.",
    imageUrl:
      "https://images.pexels.com/photos/3846976/pexels-photo-3846976.jpeg",
    isCompleted: false,
    estimatedTime: "20 minutes",
    tools: ["Level", "Alignment jig", "Measuring tape"],
  },
  {
    id: "4",
    title: "Attach Wing Panels",
    description:
      "Carefully attach wing panels to the central spar, ensuring proper alignment.",
    imageUrl:
      "https://images.pexels.com/photos/4489734/pexels-photo-4489734.jpeg",
    isCompleted: false,
    estimatedTime: "45 minutes",
    tools: ["Screwdriver set", "Torque wrench", "Panel clamps"],
  },
  {
    id: "5",
    title: "Final Inspection",
    description:
      "Perform final inspection of all connections and moving parts.",
    imageUrl:
      "https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg",
    isCompleted: false,
    estimatedTime: "30 minutes",
    tools: ["Inspection checklist", "Testing equipment"],
    safetyNotes: "Verify all safety-critical components",
  },
];

const MaintenanceProcedure: React.FC = () => {
  const [steps, setSteps] = useState(MOCK_STEPS);
  const [selectedStep, setSelectedStep] = useState<MaintenanceStep>(steps[0]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleStepCompletion = (stepId: string) => {
    setSteps((prevSteps) => {
      const newSteps = prevSteps.map((step) =>
        step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
      );

      const allCompleted = newSteps.every((step) => step.isCompleted);
      if (allCompleted) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
      }

      return newSteps;
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {showCelebration && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
          />
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <motion.div
                className="bg-white rounded-lg p-8 text-center"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
              >
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Congratulations!
                </h2>
                <p className="text-gray-600">
                  You've successfully completed all maintenance steps!
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Central Wing Assembly
          </h2>
          <p className="text-sm text-gray-500">Complete all steps in order</p>
        </div>

        <div className="divide-y divide-gray-200">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className={`w-full p-4 text-left transition-colors ${
                selectedStep.id === step.id ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={step.isCompleted}
                    onChange={() => toggleStepCompletion(step.id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3">
                  <p
                    className={`font-medium ${
                      step.isCompleted
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {index + 1}. {step.title}
                  </p>
                  <p className="text-sm text-gray-500">{step.estimatedTime}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Card className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {selectedStep.title}
              </h3>
              <p className="mt-2 text-gray-600">{selectedStep.description}</p>
            </div>

            <div className="rounded-lg overflow-hidden">
              <img
                src={selectedStep.imageUrl}
                alt={selectedStep.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock className="h-5 w-5" />
                  <span>Estimated time: {selectedStep.estimatedTime}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Tool className="h-5 w-5" />
                    <span className="font-medium">Required Tools:</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 ml-6">
                    {selectedStep.tools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedStep.safetyNotes && (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-amber-700 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Safety Notes:</span>
                  </div>
                  <p className="text-amber-600">{selectedStep.safetyNotes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(
                    (step) => step.id === selectedStep.id
                  );
                  if (currentIndex > 0) {
                    setSelectedStep(steps[currentIndex - 1]);
                  }
                }}
                disabled={steps.indexOf(selectedStep) === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Step
              </button>

              <button
                onClick={() => toggleStepCompletion(selectedStep.id)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                {selectedStep.isCompleted
                  ? "Mark as Incomplete"
                  : "Mark as Complete"}
              </button>

              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(
                    (step) => step.id === selectedStep.id
                  );
                  if (currentIndex < steps.length - 1) {
                    setSelectedStep(steps[currentIndex + 1]);
                  }
                }}
                disabled={steps.indexOf(selectedStep) === steps.length - 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceProcedure;
