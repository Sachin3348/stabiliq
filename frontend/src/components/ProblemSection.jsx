import React from 'react';
import { AlertTriangle, TrendingDown, Clock, CreditCard } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: 'EMI-Heavy Households',
      description: 'Home loans, car payments, education fees create immediate financial pressure'
    },
    {
      icon: Clock,
      title: 'Rarely Planned',
      description: 'Job loss strikes without warning, leaving no time to prepare financially'
    },
    {
      icon: CreditCard,
      title: 'Immediate Stress',
      description: '1-2 months without salary can create serious crisis for most families'
    }
  ];

  const failedOptions = [
    { name: 'Personal Savings', issue: 'Often insufficient or already allocated' },
    { name: 'Insurance Products', issue: 'Poor coverage for job loss scenarios' },
    { name: 'Emergency Loans', issue: 'Increase stress with high interest rates' },
    { name: 'Employer Support', issue: 'Inconsistent and unpredictable' },
    { name: 'Family & Friends', issue: 'Not scalable or reliable long-term' }
  ];

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6">
            <AlertTriangle className="h-4 w-4" />
            THE REAL PROBLEM
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Sudden job loss is a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">low-frequency, high-impact</span> event
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            For most salaried professionals in India, the real problem isn't unemployment—it's the <strong>sudden break in income</strong> after losing a job.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="bg-white border-2 border-red-100 rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl h-16 w-16 flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{problem.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{problem.description}</p>
              </div>
            );
          })}
        </div>

        {/* Why Current Options Fail */}
        <div className="bg-gradient-to-br from-slate-900 to-red-950 rounded-3xl p-10 md:p-14 shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>Why Current Options Fail</h3>
          <p className="text-slate-300 text-center text-lg mb-10 max-w-2xl mx-auto">Traditional solutions don't address the immediate income crisis that follows job loss</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {failedOptions.map((option, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{option.name}</h4>
                <p className="text-slate-400 leading-relaxed">{option.issue}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-amber-500/10 border-2 border-amber-400/30 rounded-2xl p-8">
            <p className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'Sora, sans-serif' }}>
              The gap is clear: There's no simple, transparent, individual-level support system designed specifically for this moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;