import PageTransition from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const typingRef = useRef<HTMLSpanElement>(null);
  const avatarTextRef = useRef<HTMLDivElement>(null);
  const [avatarTextVisible, setAvatarTextVisible] = useState(false);

  useEffect(() => {
    // Avatar text animation
    if (!avatarTextRef.current) return;
    
    const greetings = ["Hi there!", "I'm Rishabh Kumar"];
    let greetingIndex = 0;
    let greetingCharIndex = 0;
    let isGreetingDeleting = false;
    let greetingDelay = 100;
    
    function typeGreeting() {
      const currentGreeting = greetings[greetingIndex];
      
      if (isGreetingDeleting) {
        if (avatarTextRef.current) {
          avatarTextRef.current.textContent = currentGreeting.substring(0, greetingCharIndex - 1);
          greetingCharIndex--;
        }
        greetingDelay = 50;
      } else {
        if (avatarTextRef.current) {
          avatarTextRef.current.textContent = currentGreeting.substring(0, greetingCharIndex + 1);
          greetingCharIndex++;
          if (!avatarTextVisible && greetingCharIndex > 0) {
            setAvatarTextVisible(true);
          }
        }
        greetingDelay = 150;
      }
      
      if (!isGreetingDeleting && greetingCharIndex === currentGreeting.length) {
        greetingDelay = 2000; // Pause at end
        isGreetingDeleting = true;
      } else if (isGreetingDeleting && greetingCharIndex === 0) {
        isGreetingDeleting = false;
        greetingIndex = (greetingIndex + 1) % greetings.length;
        greetingDelay = 500; // Pause before starting new word
      }
      
      setTimeout(typeGreeting, greetingDelay);
    }
    
    setTimeout(typeGreeting, 1000);
    
    // Main content typing animation
    if (!typingRef.current) return;
    
    const texts = ["System Design", "Artifical Intelligence", "MLOps"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        if (typingRef.current) {
          typingRef.current.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        }
        typingDelay = 50;
      } else {
        if (typingRef.current) {
          typingRef.current.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }
        typingDelay = 150;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        typingDelay = 1500; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500; // Pause before starting new word
      }
      
      setTimeout(type, typingDelay);
    }
    
    setTimeout(type, 1000);
  }, []);

  return (
    <PageTransition>
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h6 className="title-backdrop text-sm text-primary font-mono tracking-wider mb-4" data-backdrop-text="WELCOME">
              WELCOME TO MY PORTFOLIO
            </h6>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Hi, I'm a <span className="stroke-text font-extrabold">AI Enthusiast</span>
              <br />
              Passionate about <span className="gradient-text">
                <span ref={typingRef}>Software Development</span><span className="animate-pulse">|</span>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I specialize in Python, Java, and C with expertise in AI/ML technologies 
              like TensorFlow and RoBERTa. Currently exploring microprocessor design 
              and neural networks.
            </p>
            
            <div className="flex gap-4 mb-8">
              <Button asChild size="lg" className="rounded-full px-8 py-6 font-medium text-base">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 font-medium text-base">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <h2 className="font-mono text-5xl font-bold stroke-text me-2">10</h2>
                <div>
                  <p className="text-sm font-medium">Years of</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border mx-6"></div>
              <div className="flex items-center">
                <h2 className="font-mono text-5xl font-bold stroke-text me-2">50</h2>
                <div>
                  <p className="text-sm font-medium">Projects</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-center mb-8">
              <div className="hero-avatar max-w-[200px] mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6" 
                  alt="Profile" 
                  className="w-full h-auto object-cover aspect-square" 
                />
                <div 
                  className={`hero-avatar-text ${avatarTextVisible ? 'opacity-100' : 'opacity-0'}`}
                  ref={avatarTextRef}
                >
                  Hi there!
                </div>
              </div>
            </div>
            
            <div className="section-box">
              <h2 className="text-xl font-semibold mb-6 border-b pb-3">Technical Skills</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-primary mb-3">Languages</h3>
                  <ul className="space-y-2">
                    {["Python", "Java", "C", "SQL"].map((skill) => (
                      <li key={skill} className="skill-pill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-primary mb-3">Frameworks</h3>
                  <ul className="space-y-2">
                    {["Django", "TensorFlow", "JAX", "NumPy"].map((skill) => (
                      <li key={skill} className="skill-pill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="section-box">
              <h2 className="text-xl font-semibold mb-4 border-b pb-3">Interests</h2>
              <div className="flex flex-wrap gap-3 mt-4">
                {["Chess", "Football", "Anime", "Simulations", "Drumming"].map((interest) => (
                  <span key={interest} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}