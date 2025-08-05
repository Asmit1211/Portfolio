import React, { useState } from "react";
import {
  Github,
  ExternalLink,
  Clock,
  CheckCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { projects } from "./mockData";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <Calendar className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "In Progress":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Featured <span className="text-indigo-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            A showcase of my technical projects, from web applications to
            software engineering concepts
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                    <Badge
                      className={`${getStatusColor(
                        project.status
                      )} border font-medium`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <span className="text-2xl font-bold text-slate-300 group-hover:text-indigo-300 transition-colors">
                    0{index + 1}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Tech Stack:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-slate-100 text-slate-600"
                      >
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, "_blank");
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                      {selectedProject.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedProject.status)}
                      <Badge
                        className={`${getStatusColor(
                          selectedProject.status
                        )} border font-medium`}
                      >
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 transition-all duration-200 px-3 py-1 rounded-md font-medium"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        className="bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t">
                  <Button
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white"
                    onClick={() =>
                      window.open(selectedProject.github, "_blank")
                    }
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                  {selectedProject.status === "Completed" && (
                    <Button
                      variant="outline"
                      className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl text-white">
            <Github className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-semibold">More Projects on GitHub</h3>
              <p className="text-slate-300 text-sm">
                Explore my complete code repository
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() =>
                window.open("https://github.com/Asmit1211", "_blank")
              }
              className="bg-white text-slate-800 hover:bg-slate-100"
            >
              Visit GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
