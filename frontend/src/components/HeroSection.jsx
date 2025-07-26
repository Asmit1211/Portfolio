import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from './mockData';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "Web Dev Enthusiast",
    "CS Student", 
    "Backend Logic Builder",
    "Problem Solver"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentIndex];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        
        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, texts]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.02]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-4 tracking-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Asmit
              </span>
            </h1>
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl md:text-3xl text-slate-600 font-medium">
                <span className="text-indigo-600">{displayText}</span>
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {personalInfo.education}
          </p>

          {/* Location */}
          <div className="flex items-center justify-center mb-12 text-slate-500">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{personalInfo.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Connect
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 text-slate-600 hover:text-indigo-600"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 text-slate-600 hover:text-indigo-600"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 text-slate-600 hover:text-indigo-600"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToNext}
            className="animate-bounce p-2 text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;