import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useEffect } from "react";

const websiteComponents = [
  {
    icon: "🟠",
    name: "HTML",
    description: "Structure and content",
    color: "text-orange-600 dark:text-orange-400"
  },
  {
    icon: "🔵",
    name: "CSS",
    description: "Styling and layout",
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: "🟡",
    name: "JavaScript",
    description: "Interactivity and logic",
    color: "text-yellow-600 dark:text-yellow-400"
  }
];

const flowSteps = [
  {
    step: 1,
    title: "Create Website Files",
    description: "HTML, CSS, JavaScript files"
  },
  {
    step: 2,
    title: "Upload to Cloud",
    description: "Deploy to cloud servers"
  },
  {
    step: 3,
    title: "Global Access",
    description: "Accessible worldwide instantly"
  }
];

export function WebsiteSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const { completeSection } = useProgress();
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
            completeSection('website');
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('website');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [completeSection, hasViewed]);

  const nextStep = () => {
    if (currentStep < flowSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Reset animation
      setCurrentStep(1);
    }
  };

  return (
    <section id="website" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What is a Website?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of pages viewed in a browser, powered by cloud infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Website Components */}
          <div className="space-y-6">
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Website Components</h3>
                <div className="space-y-4">
                  {websiteComponents.map((component, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{component.icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{component.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{component.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Cloud Integration</h4>
                <p className="text-blue-800 dark:text-blue-300">
                  When hosted on cloud platforms like Google Cloud or Replit, websites become cloud-powered with enhanced hosting, speed, and reliability.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Demo */}
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Website to Cloud Journey</h3>
              
              {/* Interactive Flow */}
              <div className="space-y-6">
                {flowSteps.map((step) => (
                  <div
                    key={step.step}
                    className={`flex items-center space-x-4 flow-step ${currentStep >= step.step ? 'active' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep > step.step 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.step 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={nextStep}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {currentStep > flowSteps.length ? 'Restart Demo' : 'Next Step'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
