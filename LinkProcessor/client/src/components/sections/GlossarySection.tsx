import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { glossaryTerms } from "@/lib/glossaryData";
import { useProgress } from "@/hooks/useProgress";

const colorMap = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
  orange: "text-orange-600 dark:text-orange-400",
  red: "text-red-600 dark:text-red-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  teal: "text-teal-600 dark:text-teal-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  pink: "text-pink-600 dark:text-pink-400"
};

export function GlossarySection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTerms, setFilteredTerms] = useState(glossaryTerms);
  const { completeSection } = useProgress();
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
            completeSection('glossary');
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('glossary');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [completeSection, hasViewed]);

  useEffect(() => {
    const filtered = glossaryTerms.filter(term =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTerms(filtered);
  }, [searchTerm]);

  return (
    <section id="glossary" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Cloud Computing Glossary</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">Essential terms and definitions for cloud computing</p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
            <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => (
            <Card 
              key={term.id}
              className="glossary-item bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{term.term}</h3>
                <p className={`text-sm mb-3 ${colorMap[term.color as keyof typeof colorMap]}`}>
                  {term.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {term.definition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No terms found matching "{searchTerm}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
