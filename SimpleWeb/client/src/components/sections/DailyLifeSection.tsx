import { Card, CardContent } from "@/components/ui/card";
import { Folder, Play, MessageCircle, Video, ArrowRight } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";

const dailyLifeApps = [
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Stores your files safely in the cloud, accessible from anywhere",
    icon: Folder,
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    id: "netflix",
    name: "Netflix",
    description: "Streams millions of videos using cloud infrastructure",
    icon: Play,
    color: "from-red-500 to-red-600",
    textColor: "text-red-600 dark:text-red-400"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Stores your messages and media in cloud backup",
    icon: MessageCircle,
    color: "from-green-500 to-green-600",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Hosts and streams billions of videos worldwide",
    icon: Video,
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-600 dark:text-purple-400"
  }
];

export function DailyLifeSection() {
  const { completeSection } = useProgress();
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
            completeSection('daily-life');
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('daily-life');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [completeSection, hasViewed]);

  return (
    <section id="daily-life" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Cloud in Daily Life</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 text-lg">Discover how cloud computing powers your favorite apps and services</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dailyLifeApps.map((app) => (
            <Card 
              key={app.id}
              className="group bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce-slow`}>
                  <app.icon className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{app.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{app.description}</p>
                <div className={`${app.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center`}>
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Explore</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
