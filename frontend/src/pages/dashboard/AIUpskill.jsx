import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Play, FileText, Download, CheckCircle, 
  ChevronDown, ChevronRight, Clock, BookOpen, Award 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AIUpskill = () => {
  const { token } = useAuth();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const fetchModules = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/courses/modules`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModules(response.data.modules);
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handlePlayVideo = (lesson, moduleTitle) => {
    setActiveVideo({ ...lesson, moduleTitle });
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96" data-testid="loading-spinner">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="ai-upskill-page"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              AI Upskill & Career Transition Hub
            </h1>
          </div>
          <p className="text-slate-600 text-lg ml-14">
            Master AI-powered job search strategies with our comprehensive 6-module program
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600" style={{ fontFamily: 'Sora, sans-serif' }}>6</div>
                  <div className="text-sm text-slate-600">Modules</div>
                </div>
                <div className="h-12 w-px bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600" style={{ fontFamily: 'Sora, sans-serif' }}>26</div>
                  <div className="text-sm text-slate-600">Video Lessons</div>
                </div>
                <div className="h-12 w-px bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600" style={{ fontFamily: 'Sora, sans-serif' }}>15</div>
                  <div className="text-sm text-slate-600">Downloadable PDFs</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
                <Award className="h-5 w-5 text-amber-500" />
                <span className="font-semibold text-slate-700">Certificate on Completion</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module List */}
        <div className="space-y-4" data-testid="modules-list">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                {/* Module Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toggleModule(module.id)}
                  data-testid={`module-header-${module.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                          {module.title}
                        </h3>
                        <p className="text-slate-600">{module.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Play className="h-4 w-4" />
                            {module.lessons.length} lessons
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {module.pdfs.length} PDFs
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Progress</div>
                        <div className="font-bold text-indigo-600">{module.progress}%</div>
                      </div>
                      {expandedModule === module.id ? (
                        <ChevronDown className="h-6 w-6 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedModule === module.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-200"
                    >
                      <div className="p-6 bg-slate-50">
                        {/* Video Lessons */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-indigo-600" />
                            Video Lessons
                          </h4>
                          <div className="grid gap-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                                data-testid={`lesson-${module.id}-${lesson.id}`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    lesson.completed 
                                      ? 'bg-green-100 text-green-600' 
                                      : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {lesson.completed ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : (
                                      lessonIndex + 1
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-slate-900">{lesson.title}</div>
                                    <div className="text-sm text-slate-500 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {lesson.duration}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handlePlayVideo(lesson, module.title)}
                                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                  data-testid={`play-btn-${module.id}-${lesson.id}`}
                                >
                                  <Play className="h-4 w-4 mr-1" />
                                  Watch
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Downloadable PDFs */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-teal-600" />
                            Downloadable Resources
                          </h4>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {module.pdfs.map((pdf) => (
                              <div
                                key={pdf.id}
                                className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                                data-testid={`pdf-${module.id}-${pdf.id}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="bg-red-100 p-2 rounded-lg">
                                    <FileText className="h-5 w-5 text-red-600" />
                                  </div>
                                  <span className="font-medium text-slate-900 text-sm">{pdf.title}</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-shrink-0"
                                  data-testid={`download-btn-${module.id}-${pdf.id}`}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeVideo}
              data-testid="video-modal"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">{activeVideo.moduleTitle}</div>
                      <div className="font-bold text-slate-900">{activeVideo.title}</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={closeVideo}>
                      ✕
                    </Button>
                  </div>
                </div>
                <div className="aspect-video bg-black">
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
};

export default AIUpskill;
