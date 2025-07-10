export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  color: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "iaas",
    term: "IaaS",
    category: "Infrastructure as a Service",
    definition: "Provides virtualized computing resources over the internet including servers, storage, and networking.",
    color: "blue"
  },
  {
    id: "paas",
    term: "PaaS",
    category: "Platform as a Service",
    definition: "Provides a platform for developers to build, test, and deploy applications without managing infrastructure.",
    color: "green"
  },
  {
    id: "saas",
    term: "SaaS",
    category: "Software as a Service",
    definition: "Delivers software applications over the internet on a subscription basis.",
    color: "purple"
  },
  {
    id: "scalability",
    term: "Scalability",
    category: "Resource Flexibility",
    definition: "The ability to increase or decrease computing resources based on demand.",
    color: "orange"
  },
  {
    id: "api",
    term: "API",
    category: "Application Programming Interface",
    definition: "Set of protocols and tools that allow different software applications to communicate.",
    color: "red"
  },
  {
    id: "virtualization",
    term: "Virtualization",
    category: "Resource Abstraction",
    definition: "Technology that creates virtual versions of physical computing resources.",
    color: "indigo"
  },
  {
    id: "hybrid-cloud",
    term: "Hybrid Cloud",
    category: "Cloud Architecture",
    definition: "A computing environment that combines public and private clouds, allowing data and applications to be shared between them.",
    color: "teal"
  },
  {
    id: "load-balancing",
    term: "Load Balancing",
    category: "Traffic Distribution",
    definition: "The process of distributing network traffic across multiple servers to ensure no single server is overwhelmed.",
    color: "cyan"
  },
  {
    id: "containerization",
    term: "Containerization",
    category: "Application Packaging",
    definition: "A method of packaging applications and their dependencies together so they can run consistently across different environments.",
    color: "pink"
  }
];
