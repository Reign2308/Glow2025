import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export function HeroSection() {
  const { progress } = useProgress();

  return (
    <section id="overview" className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cloud Computing</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
            Learn cloud computing fundamentals through interactive demonstrations, visual explanations, and hands-on examples.
          </p>
          
          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Learning Progress</span>
              <span>{Math.round(progress.currentProgress)}%</span>
            </div>
            <Progress value={progress.currentProgress} className="h-2" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold transition-all duration-200 transform hover:scale-105"
              onClick={() => document.getElementById('concepts')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Learning
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 font-semibold transition-all duration-200"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Cloud Animation */}
        <div className="mt-16 relative">
          <div className="flex justify-center space-x-8">
            <div className="animate-float">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
                <Laptop className="text-blue-500 h-8 w-8" />
              </div>
            </div>
            <div className="animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
                <Smartphone className="text-green-500 h-8 w-8" />
              </div>
            </div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
                <Tablet className="text-purple-500 h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
