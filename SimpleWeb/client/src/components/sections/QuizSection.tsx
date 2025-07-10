import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { quizQuestions } from "@/lib/quizData";
import { useProgress } from "@/hooks/useProgress";

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150); // 2:30 in seconds
  const [answers, setAnswers] = useState<string[]>([]);
  const { updateQuizScore } = useProgress();

  const submitQuizMutation = useMutation({
    mutationFn: async (quizData: any) => {
      const response = await apiRequest('POST', '/api/quiz/submit', quizData);
      return response.json();
    },
    onSuccess: () => {
      updateQuizScore('main-quiz', score);
    },
  });

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleFinishQuiz();
    }
  }, [timeLeft, showResults]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      
      if (selectedOption === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        handleFinishQuiz();
      }
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    submitQuizMutation.mutate({
      score: score,
      totalQuestions: quizQuestions.length,
      answers: answers,
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setTimeLeft(150);
    setAnswers([]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <section id="quiz" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Test Your Knowledge</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">Interactive quiz to assess your cloud computing understanding</p>
        
        {!showResults ? (
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-8">
              {/* Quiz Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>{score} points</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question Card */}
              <Card className="bg-white dark:bg-gray-900 shadow-lg mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(quizQuestions[currentQuestion].options).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handleOptionSelect(key)}
                        className={`quiz-option w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                          selectedOption === key
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 quiz-option-selected'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        <span className="font-semibold text-blue-600 dark:text-blue-400 mr-3">{key}.</span>
                        {value}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Controls */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-semibold">Time: {formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Quiz Results */
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-green-600 dark:text-green-400 h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  You scored <span className="font-bold text-green-600 dark:text-green-400">{score}</span> out of {quizQuestions.length}
                </p>
                
                {/* Performance Message */}
                <div className="mb-6">
                  {score === quizQuestions.length && (
                    <p className="text-green-600 dark:text-green-400 font-semibold">Perfect score! You've mastered cloud computing fundamentals!</p>
                  )}
                  {score >= quizQuestions.length * 0.8 && score < quizQuestions.length && (
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Excellent work! You have a strong understanding of cloud computing.</p>
                  )}
                  {score >= quizQuestions.length * 0.6 && score < quizQuestions.length * 0.8 && (
                    <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Good job! Review the concepts and try again to improve.</p>
                  )}
                  {score < quizQuestions.length * 0.6 && (
                    <p className="text-red-600 dark:text-red-400 font-semibold">Keep studying! Review the learning materials and retake the quiz.</p>
                  )}
                </div>

                <Button
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
