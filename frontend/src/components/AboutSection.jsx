import React from 'react';
import { Quote, GraduationCap, MapPin, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { personalInfo, softSkills } from './mockData';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            About <span className="text-indigo-600">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white rounded-2xl transform -rotate-3 shadow-xl"></div>
                <img
                  src={personalInfo.profileImage}
                  alt="Asmit Nagesh Samal"
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quote */}
            <Card className="border-l-4 border-l-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-indigo-600 mb-4" />
                <p className="text-lg font-medium text-slate-700 italic">
                  "{personalInfo.motto}"
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bio & Info */}
          <div className="space-y-8">
            {/* Bio Text */}
            <div className="space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                {personalInfo.bio}
              </p>
              
              {/* Education Info */}
              <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                <GraduationCap className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Education</h3>
                  <p className="text-slate-600">{personalInfo.education}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                <MapPin className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Location</h3>
                  <p className="text-slate-600">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Heart className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">Soft Skills</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {softSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 hover:border-indigo-300 transition-all duration-200 hover:scale-105"
                    >
                      <Badge 
                        variant="secondary" 
                        className="w-full justify-center py-2 bg-white text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors"
                      >
                        {skill}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Learning Journey */}
                <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                    Currently Learning
                  </h4>
                  <p className="text-slate-600">
                    Backend Technologies - Diving deep into Node.js, Express.js, MongoDB, and building scalable server-side applications with RESTful APIs.
                  </p>
                </div>

                {/* Fun Fact */}
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-slate-800 mb-2">💡 Fun Fact</h4>
                  <p className="text-slate-600">
                    I love debugging complex backend logic - there's something satisfying about tracing through code to find that one elusive bug!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info Quick Access */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl border border-slate-200">
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">Email</p>
              <p className="font-medium text-slate-700">{personalInfo.email}</p>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">Phone</p>
              <p className="font-medium text-slate-700">{personalInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;