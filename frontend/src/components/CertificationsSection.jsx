import React, { useState } from 'react';
import { Award, ExternalLink, FileText, Calendar, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { certifications } from './mockData';

const CertificationsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % certifications.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  const getProviderColor = (provider) => {
    const colors = {
      'Accenture / FutureLearn': 'bg-purple-100 text-purple-700 border-purple-200',
      'freeCodeCamp': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Cisco': 'bg-blue-100 text-blue-700 border-blue-200',
      'Goldman Sachs': 'bg-amber-100 text-amber-700 border-amber-200',
      'AWS': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[provider] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const handleCertClick = (cert) => {
    if (cert.type === 'link') {
      window.open(cert.url, '_blank');
    } else {
      setSelectedCert(cert);
    }
  };

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            <span className="text-indigo-600">Certifications</span> & Achievements
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Professional certifications and courses that enhance my technical expertise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {certifications.map((cert, index) => (
            <Card 
              key={cert.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 cursor-pointer relative overflow-hidden"
              onClick={() => handleCertClick(cert)}
            >
              {/* Card Number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    {cert.type === 'pdf' ? (
                      <FileText className="w-6 h-6 text-white" />
                    ) : (
                      <ExternalLink className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                
                <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-slate-500" />
                  <Badge className={`${getProviderColor(cert.provider)} border font-medium text-sm`}>
                    {cert.provider}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{cert.issueDate}</span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {cert.description}
                </p>

                <div className="pt-4 flex items-center text-indigo-600 font-medium text-sm group-hover:text-indigo-700 transition-colors">
                  {cert.type === 'pdf' ? 'View Certificate' : 'Visit Credential'}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="md:hidden mb-12">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {certifications.map((cert, index) => (
                <div key={cert.id} className="w-full flex-shrink-0 px-4">
                  <Card 
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer"
                    onClick={() => handleCertClick(cert)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                            {cert.type === 'pdf' ? (
                              <FileText className="w-5 h-5 text-white" />
                            ) : (
                              <ExternalLink className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <Award className="w-6 h-6 text-indigo-600" />
                        </div>
                        <span className="text-lg font-bold text-slate-300">
                          {index + 1}/{certifications.length}
                        </span>
                      </div>
                      
                      <CardTitle className="text-lg font-bold text-slate-800 leading-tight">
                        {cert.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <Badge className={`${getProviderColor(cert.provider)} border font-medium`}>
                        {cert.provider}
                      </Badge>

                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{cert.issueDate}</span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {cert.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex space-x-2">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* PDF Modal */}
        {selectedCert && selectedCert.type === 'pdf' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-slate-800">
                  {selectedCert.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCert(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </Button>
              </div>
              <div className="flex-1 p-4">
                <iframe
                  src={selectedCert.url}
                  className="w-full h-full min-h-[600px] border border-slate-200 rounded"
                  title={selectedCert.title}
                />
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">{certifications.length}</div>
              <div className="text-slate-600 font-medium">Certifications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-slate-600 font-medium">Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">2024</div>
              <div className="text-slate-600 font-medium">Latest Year</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;