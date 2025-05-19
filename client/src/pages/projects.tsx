import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "1",
    title: "PDF Summarizer Web App",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32",
    description: "A Django-based web app for document summarization using RoBERTa & BART models",
    tech: ["Django", "RoBERTa", "BART", "Milvus", "SQLite"],
    year: "2024"
  },
  {
    id: "2",
    title: "Automate This",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a",
    description: "Open-source personal assistant app with natural language command processing",
    tech: ["Python", "NLP", "AI"],
    year: "2025"
  },
  {
    id: "3",
    title: "Neural Network from Scratch",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    description: "Custom neural network framework using Python and NumPy with modular architecture",
    tech: ["Python", "NumPy", "Neural Networks"],
    year: "2024"
  },
  {
    id: "4",
    title: "Mother AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    description: "Advanced AI project integrating custom OS, microprocessor, and specialized hardware",
    tech: ["ARM", "CUDA", "NPUs", "LLM"],
    year: "2025"
  }
];

export default function Projects() {
  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h6 className="title-backdrop text-sm text-primary font-mono tracking-wider mb-3" data-backdrop-text="WORKS">
              MY PROJECTS
            </h6>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Featured <span className="stroke-text">Work</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A showcase of my best projects in AI, machine learning, and software development.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button className="rounded-full px-6 py-6 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              View on GitHub
            </Button>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-none bg-white">
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono">
                    {project.year}
                  </div>
                </div>
                
                <CardHeader className="pt-6">
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-5 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}