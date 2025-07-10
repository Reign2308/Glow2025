import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Wrench, Building, Globe, Zap, TrendingUp, DollarSign } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";

const cloudLayers = [
  {
    id: "application",
    title: "1. Application Layer",
    description: "Software used directly by end users",
    icon: Monitor,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    textColor: "text-blue-100",
    features: [
      { icon: "👥", label: "Collaboration" },
      { icon: "✉️", label: "Communication" },
      { icon: "📊", label: "Finance" },
      { icon: "📺", label: "Monitoring" }
    ]
  },
  {
    id: "platform",
    title: "2. Platform Layer",
    description: "Tools for developers to build applications",
    icon: Wrench,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500",
    textColor: "text-green-100",
    features: [
      { icon: "🗃️", label: "Object Storage" },
      { icon: "🖥️", label: "Database" },
      { icon: "⚙️", label: "Runtime" },
      { icon: "🛡️", label: "Identity" }
    ]
  },
  {
    id: "infrastructure",
    title: "3. Infrastructure Layer",
    description: "Foundation of cloud computing",
    icon: Building,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
    textColor: "text-purple-100",
    features: [
      { icon: "🖥️", label: "Compute" },
      { icon: "💾", label: "Block Storage" },
      { icon: "🌐", label: "Network" }
    ]
  }
];

const benefits = [
  {
    icon: Globe,
    title: "Accessible",
    description: "From anywhere, anytime",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900"
  },
  {
    icon: Zap,
    title: "No Installation",
    description: "No need to install software",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900"
  },
  {
    icon: TrendingUp,
    title: "Scalable",
    description: "Flexible and adaptable",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900"
  },
  {
    icon: DollarSign,
    title: "Cost-effective",
    description: "Pay for what you use",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900"
  }
];

export function CloudLayersSection() {
  const { completeSection } = useProgress();
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
            completeSection('cloud-layers');
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('concepts');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [completeSection, hasViewed]);

  return (
    <section id="concepts" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Three Layers of Cloud Computing</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 text-lg">Interactive demonstration of cloud architecture layers</p>
        
        {/* Interactive Layer Diagram */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="space-y-8">
            {cloudLayers.map((layer) => (
              <Card 
                key={layer.id}
                className="group cursor-pointer layer-container transition-all duration-300 hover:shadow-2xl"
              >
                <CardContent className={`p-8 text-white bg-gradient-to-r ${layer.color} rounded-xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{layer.title}</h3>
                    <layer.icon className="h-8 w-8 group-hover:animate-pulse" />
                  </div>
                  <p className={`${layer.textColor} mb-4`}>{layer.description}</p>
                  <div className={`grid grid-cols-2 ${layer.id === 'infrastructure' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
                    {layer.features.map((feature, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <p className="text-sm">{feature.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce`}>
                <benefit.icon className={`${benefit.color} h-8 w-8`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
