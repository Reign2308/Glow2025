import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { DailyLifeSection } from "@/components/sections/DailyLifeSection";
import { CloudLayersSection } from "@/components/sections/CloudLayersSection";
import { WebsiteSection } from "@/components/sections/WebsiteSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { GlossarySection } from "@/components/sections/GlossarySection";
import { Cloud, Twitter, Linkedin, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <DailyLifeSection />
      <CloudLayersSection />
      <WebsiteSection />
      <TeamSection />
      <QuizSection />
      <GlossarySection />
      
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Cloud className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold">CloudLearn</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Master cloud computing through interactive learning experiences designed by industry experts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#overview" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Overview</a></li>
                <li><a href="#concepts" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Concepts</a></li>
                <li><a href="#team" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Team</a></li>
                <li><a href="#quiz" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Quiz</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CloudLearn. All rights reserved. Built with ❤️ for cloud computing education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
