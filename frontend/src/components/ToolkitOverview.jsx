import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles, TrendingUp, Shield, Target, Zap, CheckCircle, XCircle,
  FileText, Brain, Users, Timer, Eye, ChevronRight, Star,
  Briefcase, Award, Search, BarChart3, Lightbulb, ArrowRight,
  BookOpen, Rocket, AlertTriangle, ThumbsUp, ThumbsDown,
  Layout, Type, AlignLeft, Hash, Layers, MessageSquare,
  FileCheck, Linkedin, FileEdit,
} from 'lucide-react';

// ─── Quick Stat ───────────────────────────────────────────────────────────────
const QuickStat = ({ icon: Icon, value, label, color, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className={`w-12 h-12 mx-auto rounded-2xl ${color} flex items-center justify-center mb-2 shadow-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-slate-400 mt-0.5">{label}</p>
  </motion.div>
);

// ─── Tool Card ────────────────────────────────────────────────────────────────
const ToolCard = ({ icon: Icon, title, description, colorClass, gradientClass, tag, onClick, delay, inView, disabled }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    whileHover={!disabled ? { y: -4, transition: { duration: 0.2 } } : {}}
    onClick={!disabled ? onClick : undefined}
    className={`group relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${gradientClass} opacity-10 -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />
    <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center mb-4 shadow-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="font-bold text-slate-900 text-base mb-1.5">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed mb-4">{description}</p>
    <div className="flex items-center justify-between">
      {tag && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          tag === 'Coming Soon'
            ? 'bg-amber-100 text-amber-700'
            : 'bg-slate-100 text-slate-600'
        }`}>{tag}</span>
      )}
      {!disabled && (
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all ml-auto" />
      )}
    </div>
  </motion.div>
);

// ─── Do / Don't items ─────────────────────────────────────────────────────────
const DoItem = ({ text }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-green-100 last:border-0">
    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
    </div>
    <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
  </div>
);

const DontItem = ({ text }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-rose-100 last:border-0">
    <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <XCircle className="w-3.5 h-3.5 text-rose-500" />
    </div>
    <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
  </div>
);

// ─── Resume Anatomy Section Row ───────────────────────────────────────────────
const AnatomySection = ({ icon: Icon, title, importance, tip, colorClass, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.4, delay }}
    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
  >
    <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 shadow`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          importance === 'Critical' ? 'bg-rose-100 text-rose-700' :
          importance === 'High'     ? 'bg-amber-100 text-amber-700' :
                                      'bg-blue-100 text-blue-700'
        }`}>{importance}</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{tip}</p>
    </div>
  </motion.div>
);

// ─── ATS Insight Card ─────────────────────────────────────────────────────────
const ATSInsight = ({ icon: Icon, title, stat, description, colorClass, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-9 h-9 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 shadow`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <p className="text-lg font-bold text-slate-900">{stat}</p>
      </div>
    </div>
    <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
const ToolkitOverview = ({ onNavigateTab, submission }) => {
  const heroRef     = useRef(null);
  const toolsRef    = useRef(null);
  const anatomyRef  = useRef(null);
  const dosRef      = useRef(null);
  const atsRef      = useRef(null);
  const tipsRef     = useRef(null);

  const heroInView    = useInView(heroRef,    { once: true, margin: '-50px' });
  const toolsInView   = useInView(toolsRef,   { once: true, margin: '-50px' });
  const anatomyInView = useInView(anatomyRef, { once: true, margin: '-50px' });
  const dosInView     = useInView(dosRef,     { once: true, margin: '-50px' });
  const atsInView     = useInView(atsRef,     { once: true, margin: '-50px' });
  const tipsInView    = useInView(tipsRef,    { once: true, margin: '-50px' });

  const hasSubmission = !!submission;
  const profileScore  = submission?.linkedInReview?.overall_score || null;

  return (
    <div className="space-y-10">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10"
      >
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-xs font-semibold text-teal-300">AI-Powered Career Tools</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Land your dream job faster
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-xl mb-8">
              Your resume, LinkedIn profile, and application materials are the first impression
              recruiters see. Our AI-powered toolkit helps you optimise every step of your job search.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <QuickStat icon={Shield}     value="93%"  label="ATS rejection rate"   color="bg-rose-500"   delay={0.1} inView={heroInView} />
              <QuickStat icon={Timer}      value="7s"   label="Recruiter scan time"  color="bg-amber-500"  delay={0.2} inView={heroInView} />
              <QuickStat icon={Users}      value="250+" label="Applicants per role"  color="bg-indigo-500" delay={0.3} inView={heroInView} />
              <QuickStat icon={TrendingUp} value="5×"   label="More callbacks"       color="bg-teal-500"   delay={0.4} inView={heroInView} />
            </div>
          </div>

          {/* Progress tracker - only when a submission exists */}
          {hasSubmission && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center flex-shrink-0"
            >
              <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">Your Progress</p>
              <div className="flex items-center gap-4">
                {/* Resume */}
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1.5 shadow-glow" />
                  <p className="text-xs text-slate-300">Resume</p>
                  <p className="text-xs text-green-400 font-semibold">Uploaded</p>
                </div>
                <div className="w-8 h-px bg-slate-600" />
                {/* LinkedIn */}
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-1.5 ${profileScore ? 'bg-green-500' : 'bg-slate-600'}`} />
                  <p className="text-xs text-slate-300">LinkedIn</p>
                  <p className={`text-xs font-semibold ${profileScore ? 'text-green-400' : 'text-slate-500'}`}>
                    {profileScore ? `${profileScore}/100` : 'Pending'}
                  </p>
                </div>
                <div className="w-8 h-px bg-slate-600" />
                {/* Targeted */}
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-slate-600 mx-auto mb-1.5" />
                  <p className="text-xs text-slate-300">Targeted</p>
                  <p className="text-xs text-slate-500 font-semibold">Not started</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Toolkit Cards ─────────────────────────────────────────────── */}
      <div ref={toolsRef}>
        <div className="flex items-center gap-2 mb-6">
          <Rocket className="w-5 h-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Your Toolkit</h2>
          <span className="text-xs text-slate-400 ml-1">- click any tool to get started</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ToolCard
            icon={FileCheck}
            title="Resume Optimizer"
            description="Upload your resume for expert human review with AI-powered bullet point improvement and ATS scoring."
            colorClass="bg-gradient-to-br from-teal-500 to-cyan-600"
            gradientClass="bg-teal-500"
            tag="Expert Review"
            onClick={() => onNavigateTab('resume-optimizer')}
            delay={0}
            inView={toolsInView}
          />
          <ToolCard
            icon={Linkedin}
            title="LinkedIn Optimizer"
            description="Get your LinkedIn profile scored by AI with section-wise feedback and recruiter psychology insights."
            colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
            gradientClass="bg-blue-500"
            tag="AI Scoring"
            onClick={() => onNavigateTab('linkedin-optimizer')}
            delay={0.08}
            inView={toolsInView}
          />
          <ToolCard
            icon={Target}
            title="Targeted Resume"
            description="Match your resume against a specific job description. Get keyword gaps, ATS score, and rewrites."
            colorClass="bg-gradient-to-br from-violet-500 to-purple-600"
            gradientClass="bg-violet-500"
            tag="JD Matching"
            onClick={() => onNavigateTab('targeted-resume')}
            delay={0.16}
            inView={toolsInView}
          />
          <ToolCard
            icon={MessageSquare}
            title="Cover Letter AI"
            description="Generate personalized cover letters tailored to specific roles and companies in seconds."
            colorClass="bg-gradient-to-br from-amber-500 to-orange-600"
            gradientClass="bg-amber-500"
            tag="Coming Soon"
            onClick={() => {}}
            delay={0.24}
            inView={toolsInView}
            disabled
          />
        </div>
      </div>

      {/* ── Anatomy of a Perfect Resume ──────────────────────────────── */}
      <div ref={anatomyRef} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Anatomy of a Perfect Resume</h2>
            <p className="text-xs text-slate-500 mt-0.5">Every section matters - here's what recruiters look for</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-1">
          <AnatomySection icon={Type}      title="Professional Header"     importance="Critical" colorClass="bg-rose-500"   tip="Name, title, contact info, LinkedIn URL. No photo, no full address - city/state only. Match your title to the role you're targeting." delay={0}    inView={anatomyInView} />
          <AnatomySection icon={AlignLeft} title="Professional Summary"    importance="High"     colorClass="bg-amber-500"  tip="3–4 lines max. Lead with years of experience + domain, then 2–3 quantified achievements. End with what you're seeking." delay={0.05} inView={anatomyInView} />
          <AnatomySection icon={Briefcase} title="Work Experience"         importance="Critical" colorClass="bg-teal-500"   tip="Reverse chronological. 3–5 bullet points per role using CAR format (Context → Action → Result). Every bullet needs a number." delay={0.1}  inView={anatomyInView} />
          <AnatomySection icon={Layers}    title="Projects"                importance="High"     colorClass="bg-blue-500"   tip="2–3 relevant projects with tech stack, your role, and quantified impact. Link to GitHub or live demos. Mirror JD keywords." delay={0.15} inView={anatomyInView} />
          <AnatomySection icon={Hash}      title="Skills Section"          importance="High"     colorClass="bg-indigo-500" tip="Group by category (Languages, Frameworks, Tools, Cloud). Match exact JD keywords. Don't self-rate - no 'proficient / expert'." delay={0.2}  inView={anatomyInView} />
          <AnatomySection icon={Award}     title="Education & Certs"       importance="Medium"   colorClass="bg-violet-500" tip="Degree, university, graduation year. Add relevant coursework only if < 2 yrs experience. Certs add credibility for specific domains." delay={0.25} inView={anatomyInView} />
        </div>
      </div>

      {/* ── Do's & Don'ts ────────────────────────────────────────────── */}
      <div ref={dosRef}>
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Resume Do's & Don'ts</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={dosInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-900">Do This</h3>
            </div>
            <DoItem text="Use quantified achievements - 'Increased revenue by 40%' beats 'Helped increase revenue'" />
            <DoItem text="Tailor your resume to each job description - match their exact keywords" />
            <DoItem text="Start every bullet with a strong action verb (Built, Led, Reduced, Designed)" />
            <DoItem text="Keep it to 1 page (early career) or 2 pages max (senior). Recruiters won't read more." />
            <DoItem text="Use a clean single-column layout with standard fonts - ATS can't parse fancy designs" />
            <DoItem text="Include links: GitHub, Portfolio, LinkedIn. Proof of work beats claims about skills." />
            <DoItem text="Match your header title to the exact job title you're applying for" />
            <DoItem text="Put your most impactful experience first - order by relevance, not just chronology" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={dosInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ThumbsDown className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-rose-900">Don't Do This</h3>
            </div>
            <DontItem text="Don't use generic phrases like 'Hard-working team player' - they say nothing" />
            <DontItem text="Don't include a photo, date of birth, marital status, or full home address" />
            <DontItem text="Don't use tables, columns, headers/footers, or text boxes - ATS can't parse them" />
            <DontItem text="Don't list every technology you've ever touched - focus on what's relevant to the role" />
            <DontItem text="Don't write 'References available upon request' - it's implied and wastes precious space" />
            <DontItem text="Don't write in first person ('I developed…') - use implied first person ('Developed…')" />
            <DontItem text="Don't submit the same resume to every job - one-size-fits-all means ATS rejection" />
            <DontItem text="Don't use creative file names. Format: FirstName_LastName_Resume.pdf" />
          </motion.div>
        </div>
      </div>

      {/* ── ATS & Recruiter Facts ────────────────────────────────────── */}
      <div ref={atsRef}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>How ATS & Recruiters Actually Work</h2>
            <p className="text-xs text-slate-500 mt-0.5">Understanding the system helps you beat it</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ATSInsight icon={Shield}    title="ATS Rejection Rate"   stat="93%"          description="Most ATS systems silently reject 9 out of 10 resumes before a human ever sees them. Keyword matching is the #1 culprit."  colorClass="bg-rose-500"   delay={0}    inView={atsInView} />
          <ATSInsight icon={Eye}       title="Recruiter Scan Time"  stat="7.4 seconds"  description="The average recruiter spends just 7.4 seconds on an initial scan. Your top third of the page must hook them immediately."     colorClass="bg-amber-500"  delay={0.08} inView={atsInView} />
          <ATSInsight icon={BarChart3} title="Keyword Match Needed" stat="80%+"          description="To pass most ATS systems your resume needs 80%+ keyword match with the job description. Below that, you're invisible."         colorClass="bg-indigo-500" delay={0.16} inView={atsInView} />
          <ATSInsight icon={FileText}  title="Best File Format"     stat="PDF only"     description="Submit as PDF unless asked for .docx. PDF preserves formatting. Never submit .png, .jpg, or creative formats."                colorClass="bg-teal-500"   delay={0.24} inView={atsInView} />
          <ATSInsight icon={Star}      title="Quantified Impact"    stat="+40% callbacks" description="Resumes with quantified achievements (numbers, %, dollar amounts) get 40% more recruiter callbacks than those without."      colorClass="bg-violet-500" delay={0.32} inView={atsInView} />
          <ATSInsight icon={Target}    title="Tailored vs Generic"  stat="3× response"  description="A resume tailored to the specific JD gets 3× more responses than a generic one. ATS ranks tailored resumes significantly higher." colorClass="bg-blue-500"   delay={0.4}  inView={atsInView} />
        </div>
      </div>

      {/* ── Pro Tips ─────────────────────────────────────────────────── */}
      <div ref={tipsRef} className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 border border-indigo-100 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Pro Tips from Hiring Managers</h2>
            <p className="text-xs text-slate-500 mt-0.5">Insider knowledge from people who actually hire</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "The 'So What?' Test",
              tip: "For every bullet point ask 'So what?' If you can't answer with a number or business impact, rewrite it. 'Built a dashboard' → 'Built a real-time analytics dashboard used by 500+ daily users, cutting decision time by 30%'.",
              icon: Lightbulb,
              badge: 'bg-amber-100 text-amber-700',
            },
            {
              title: 'Mirror the Job Description',
              tip: "If the JD says 'React.js' don't write 'ReactJS'. If they say 'CI/CD pipelines' don't write 'continuous integration'. ATS does exact string matching - copy their exact wording.",
              icon: Target,
              badge: 'bg-teal-100 text-teal-700',
            },
            {
              title: 'The First Line Wins',
              tip: "Recruiters read in an F-pattern. Your name, title, and the first bullet of your most recent role get 80% of attention. Make those three things perfect before optimising anything else.",
              icon: Eye,
              badge: 'bg-blue-100 text-blue-700',
            },
            {
              title: 'Show, Don\'t Tell',
              tip: "Nobody believes 'self-motivated problem solver'. Show it instead: 'Identified and fixed a memory leak costing $12K/month in AWS spend - without being asked.' Proof beats claims every time.",
              icon: Award,
              badge: 'bg-violet-100 text-violet-700',
            },
            {
              title: 'The 6-Second Resume Test',
              tip: "Hand your resume to a friend for 6 seconds, take it back, then ask: What's my job title? What am I good at? What's my biggest achievement? If they can't answer all three, redesign.",
              icon: Timer,
              badge: 'bg-rose-100 text-rose-700',
            },
            {
              title: 'Recency Bias is Real',
              tip: "Recruiters weight your last 2 years 3× more than everything else combined. Put maximum effort into your most recent role's bullet points. Older roles can be condensed to 1–2 lines.",
              icon: TrendingUp,
              badge: 'bg-indigo-100 text-indigo-700',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={tipsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`w-7 h-7 rounded-lg ${item.badge} flex items-center justify-center`}>
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA Footer ───────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-xl font-bold mb-2">Ready to optimise your application?</h3>
        <p className="text-teal-100 text-sm mb-6 max-w-lg mx-auto">
          Start with your resume, then optimise LinkedIn, then target specific jobs. Each step compounds your chances of landing an interview.
        </p>
        <button
          onClick={() => onNavigateTab('resume-optimizer')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-colors shadow-lg"
        >
          Start with Resume Optimizer
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default ToolkitOverview;
