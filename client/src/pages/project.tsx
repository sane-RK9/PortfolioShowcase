import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = {
  "1": {
    title: "PDF Summarizer Web App",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32",
    description: "Built with Django 5.2, this web application provides advanced document summarization capabilities.",
    challenges: "Implementing efficient document processing and integrating multiple AI models for accurate summarization.",
    solutions: "Used RoBERTa & BART models for summarization, integrated Milvus for similarity search, and implemented efficient document processing pipeline.",
    outcomes: "Created a robust document summarization system with citation generation capabilities.",
    tech: ["Django 5.2", "RoBERTa", "BART", "Milvus", "SQLite"],
    liveUrl: "#",
    githubUrl: "#"
  },
  "2": {
    title: "Automate This",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a",
    description: "An open-source personal assistant app that automates device tasks using natural language commands.",
    challenges: "Developing accurate natural language understanding and implementing reliable task automation.",
    solutions: "Implemented advanced NLP processing and created a flexible event-trigger system.",
    outcomes: "Successfully created an AI-driven automation system with pattern-based suggestions.",
    tech: ["Python", "NLP", "AI", "Task Automation"],
    liveUrl: "#",
    githubUrl: "#"
  },
  "3": {
    title: "Neural Network from Scratch",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    description: "Custom neural network framework focusing on computational efficiency and modularity.",
    challenges: "Optimizing performance while maintaining code clarity and implementing advanced neural network features.",
    solutions: "Developed modular architecture using NumPy for efficient computation and implemented transfer learning capabilities.",
    outcomes: "Created a flexible neural network framework with support for transfer learning and domain adaptation.",
    tech: ["Python", "NumPy", "Neural Networks", "Transfer Learning"],
    liveUrl: "#",
    githubUrl: "#"
  },
  "4": {
    title: "Mother AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    description: "Ambitious AI project combining custom hardware and software for advanced AI capabilities.",
    challenges: "Integrating different hardware components and optimizing performance across various processing units.",
    solutions: "Developed custom OS integration and optimized code for different processing units (ARM, CUDA, NPUs).",
    outcomes: "Created a foundation for a scalable AI system capable of running multiple specialized models.",
    tech: ["ARM", "CUDA", "NPUs", "LLM", "Custom OS"],
    liveUrl: "#",
    githubUrl: "#"
  }
};

export default function Project() {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <PageTransition>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{project.title}</h1>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="prose max-w-none mb-8">
            <h2>Overview</h2>
            <p>{project.description}</p>
            <h2>Challenges</h2>
            <p>{project.challenges}</p>

            <h2>Solutions</h2>
            <p>{project.solutions}</p>

            <h2>Outcomes</h2>
            <p>{project.outcomes}</p>

            <h2>Technologies Used</h2>
            <div className="not-prose flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
            <div className="flex gap-4">
             <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}