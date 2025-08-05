import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from './mockData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Asmit <span className="text-indigo-400">Samal</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Computer Science student passionate about building efficient, scalable web applications and solving complex problems through code.
            </p>
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About', id: 'about' },
                { name: 'Projects', id: 'projects' },
                { name: 'Skills', id: 'skills' },
                { name: 'Certifications', id: 'certifications' },
                { name: 'Contact', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-slate-300 hover:text-indigo-400 transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="font-medium">Email</p>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p>{personalInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-300 mb-4 md:mb-0">
              <span>© {currentYear} Asmit Samal. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and React.js</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full transition-colors duration-200"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-slate-700 text-center text-slate-400 text-sm">
            <p>
              Currently seeking opportunities in <strong className="text-slate-300">Full-Stack Development</strong> and <strong className="text-slate-300">Backend Engineering</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;