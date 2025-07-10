export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does cloud computing primarily use for data storage?",
    options: {
      A: "Local hard drives",
      B: "Remote data centers",
      C: "USB devices",
      D: "Physical documents"
    },
    correct: "B",
    explanation: "Cloud computing uses remote data centers to store and process data, allowing access from anywhere with an internet connection."
  },
  {
    id: 2,
    question: "Which layer of cloud computing is used directly by end users?",
    options: {
      A: "Infrastructure Layer",
      B: "Platform Layer",
      C: "Application Layer",
      D: "Network Layer"
    },
    correct: "C",
    explanation: "The Application Layer (SaaS) is what end users interact with directly, such as Gmail, Google Docs, or Netflix."
  },
  {
    id: 3,
    question: "What is the main benefit of cloud scalability?",
    options: {
      A: "Fixed resource allocation",
      B: "Flexible resource adjustment based on demand",
      C: "Permanent hardware installation",
      D: "Limited storage capacity"
    },
    correct: "B",
    explanation: "Cloud scalability allows resources to be increased or decreased based on demand, providing flexibility and cost efficiency."
  },
  {
    id: 4,
    question: "Which service is an example of Platform as a Service (PaaS)?",
    options: {
      A: "Gmail",
      B: "Netflix",
      C: "Google App Engine",
      D: "WhatsApp"
    },
    correct: "C",
    explanation: "Google App Engine is a PaaS offering that provides a platform for developers to build and deploy applications without managing infrastructure."
  },
  {
    id: 5,
    question: "What makes cloud computing cost-effective?",
    options: {
      A: "High upfront costs",
      B: "Pay-per-use pricing model",
      C: "Permanent equipment purchases",
      D: "Fixed monthly fees regardless of usage"
    },
    correct: "B",
    explanation: "Cloud computing follows a pay-per-use model, allowing users to pay only for the resources they actually consume."
  }
];
