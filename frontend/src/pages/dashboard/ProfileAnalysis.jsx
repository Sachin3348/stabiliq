import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Upload, LinkIcon, Loader2, CheckCircle, AlertCircle,
  TrendingUp, Target, Lightbulb, ArrowRight, BarChart3, RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProfileAnalysis = () => {
  const { token } = useAuth();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC/DOCX file');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile && !linkedinUrl) {
      toast.error('Please upload a resume or enter a LinkedIn URL');
      return;
    }

    setAnalyzing(true);

    try {
      let resumeUrl = null;

      // Upload resume if provided
      if (resumeFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', resumeFile);

        const uploadResponse = await axios.post(`${API}/profile/upload-resume`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        resumeUrl = uploadResponse.data.fileUrl;
        setUploading(false);
      }

      // Analyze profile
      const analysisResponse = await axios.post(`${API}/profile/analyze`, {
        resumeUrl,
        linkedinUrl: linkedinUrl || null
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAnalysis(analysisResponse.data.analysis);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
      setUploading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setResumeFile(null);
    setLinkedinUrl('');
  };

  const ScoreCircle = ({ score, label, color }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-200"
          />
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(score / 100) * 301.59} 301.59`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-slate-600">{label}</span>
    </div>
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="profile-analysis-page"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Resume & LinkedIn Profile Analysis
            </h1>
          </div>
          <p className="text-slate-600 text-lg ml-14">
            Get AI-powered insights to optimize your profile for better opportunities
          </p>
        </div>

        {!analysis ? (
          /* Upload Section */
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <Card className="border-0 shadow-lg" data-testid="resume-upload-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-teal-600" />
                  Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    resumeFile ? 'border-teal-500 bg-teal-50' : 'border-slate-300 hover:border-teal-400'
                  }`}
                >
                  {resumeFile ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{resumeFile.name}</p>
                        <p className="text-sm text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setResumeFile(null)}
                        data-testid="remove-file-btn"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Drop your resume here</p>
                        <p className="text-sm text-slate-500">or click to browse (PDF, DOC, DOCX)</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                        data-testid="resume-file-input"
                      />
                      <label htmlFor="resume-upload">
                        <Button variant="outline" as="span" className="cursor-pointer">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn URL */}
            <Card className="border-0 shadow-lg" data-testid="linkedin-url-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                  LinkedIn Profile URL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="pl-10 h-12"
                      data-testid="linkedin-url-input"
                    />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Make sure your LinkedIn profile is public or set to "All LinkedIn Members" visibility for best analysis results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <div className="lg:col-span-2">
              <Button
                onClick={handleAnalyze}
                disabled={analyzing || (!resumeFile && !linkedinUrl)}
                className="w-full h-14 text-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg"
                data-testid="analyze-btn"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {uploading ? 'Uploading Resume...' : 'Analyzing Your Profile...'}
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Analyze My Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            data-testid="analysis-results"
          >
            {/* Scores */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-wrap justify-center gap-12">
                  <ScoreCircle score={analysis.resumeScore} label="Resume Score" color="#0d9488" />
                  <ScoreCircle score={analysis.aiReadiness} label="AI Readiness" color="#8b5cf6" />
                  <ScoreCircle score={analysis.linkedinOptimization?.profileCompleteness || 75} label="LinkedIn Score" color="#3b82f6" />
                </div>
              </CardContent>
            </Card>

            {/* Skill Gaps & Strengths */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg border-l-4 border-l-amber-500" data-testid="skill-gaps-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-700">
                    <Target className="h-5 w-5" />
                    Skill Gaps to Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.skillGaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg border-l-4 border-l-green-500" data-testid="strengths-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <TrendingUp className="h-5 w-5" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Career Suggestions */}
            <Card className="border-0 shadow-lg" data-testid="suggestions-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-indigo-600" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.careerSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"
                    >
                      <ArrowRight className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keyword Analysis */}
            <Card className="border-0 shadow-lg" data-testid="keywords-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-600" />
                  Keyword Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordOptimization.missingKeywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Present Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordOptimization.presentKeywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-teal-50 rounded-xl">
                  <p className="text-teal-800">
                    <strong>Recommendation:</strong> {analysis.keywordOptimization.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Re-analyze Button */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={resetAnalysis}
                className="px-8"
                data-testid="reanalyze-btn"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Analyze Another Profile
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default ProfileAnalysis;
