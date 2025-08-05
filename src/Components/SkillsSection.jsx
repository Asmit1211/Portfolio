import React, { useState, useEffect, useRef } from 'react';
import { Code, Server, Database, Wrench, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { skills } from './mockData';

const SkillsSection = () => {
  const [visibleBars, setVisibleBars] = useState({});
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      skills: skills.frontend,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Backend',
      icon: Server,
      skills: skills.backend,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Database',
      icon: Database,
      skills: skills.database,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Tools',
      icon: Wrench,
      skills: skills.tools,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 border-orange-200'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill bars with delay
            skillCategories.forEach((category, categoryIndex) => {
              category.skills.forEach((skill, skillIndex) => {
                setTimeout(() => {
                  setVisibleBars(prev => ({
                    ...prev,
                    [`${category.title}-${skillIndex}`]: true
                  }));
                }, (categoryIndex * 200) + (skillIndex * 100));
              });
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSkillIcon = (iconName) => {
    const iconMap = {
      Code: Code,
      Server: Server,
      Database: Database,
      Wrench: Wrench,
      BookOpen: BookOpen
    };
    const IconComponent = iconMap[iconName] || Code;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Technical <span className="text-indigo-600">Skills</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            My technical expertise across different domains of software development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.title}
                className={`${category.bgColor} border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getSkillIcon(skill.icon)}
                          <span className="font-medium text-slate-700">
                            {skill.name}
                          </span>
                          {skill.learning && (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                              Learning
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-slate-600">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={visibleBars[`${category.title}-${skillIndex}`] ? skill.level : 0}
                          className="h-2 bg-slate-200"
                        />
                        <div 
                          className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: visibleBars[`${category.title}-${skillIndex}`] ? `${skill.level}%` : '0%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
            <div className="text-center mb-8">
              <BookOpen className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Currently Learning</h3>
              <p className="text-slate-600">Expanding my skillset with new technologies</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Backend Technologies Learning */}
              <div className="bg-white p-4 rounded-lg border border-indigo-200 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">Backend Technologies</h4>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">In Progress</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-200 h-1 rounded-full">
                    <div className="bg-emerald-500 h-1 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
              </div>
              
              {/* React Learning */}
              {skills.frontend.filter(skill => skill.learning).map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-indigo-200 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">{skill.name}</h4>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-600">In Progress</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full">
                      <div className="bg-indigo-500 h-1 rounded-full" style={{width: `${skill.level}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* Skills Overview */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">4+</div>
                  <div className="text-sm text-slate-600">Frontend Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">3+</div>
                  <div className="text-sm text-slate-600">Backend Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">2+</div>
                  <div className="text-sm text-slate-600">Databases</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">5+</div>
                  <div className="text-sm text-slate-600">Dev Tools</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;