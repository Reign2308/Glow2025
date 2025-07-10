import { Card, CardContent } from "@/components/ui/card";
import { Code, Shield, BookOpen } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";

const teamMembers = [
  {
    name: "Hilmy Baihaqi",
    role: "Cloud Infrastructure Expert",
    education: "Telkom University - Telecommunication Engineering",
    description: "Specialized in cloud infrastructure design and implementation with 5+ years experience in enterprise cloud solutions.",
    skill: "Infrastructure Design",
    icon: Code,
    color: "text-blue-500",
    image: "/assets/hilmy.jpg"
  },
  {
    name: "Citra Kusumadewi Sribawono",
    role: "DevOps & Security Specialist",
    education: "Telkom University - Telecommunication Engineering",
    description: "Expert in deployment automation and cloud security best practices with focus on scalable solutions.",
    skill: "Security & Automation",
    icon: Shield,
    color: "text-green-500",
    image: "/assets/Citra.jpg"
  },
  {
    name: "Es Shahdiya Bin Es Zulkarnaen",
    role: "Technical Documentation Lead",
    education: "i-CATS University College - Software Engineering",
    description: "Creates comprehensive documentation and educational content for cloud computing concepts and best practices.",
    skill: "Documentation & Education",
    icon: BookOpen,
    color: "text-purple-500",
    image: "/assets/Profile2.jpg"
  }
];

export function TeamSection() {
  const { completeSection } = useProgress();
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
            completeSection('team');
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('team');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [completeSection, hasViewed]);

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Meet Our Expert Team</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 text-lg">Experienced professionals dedicated to cloud computing education</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={index}
              className="group bg-white dark:bg-gray-900 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-64 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className={`font-semibold mb-3 ${member.color === 'text-blue-500' ? 'text-blue-600 dark:text-blue-400' : member.color === 'text-green-500' ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'}`}>
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{member.education}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {member.description}
                </p>
                <div className="flex items-center space-x-3">
                  <member.icon className={`h-5 w-5 ${member.color}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{member.skill}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
