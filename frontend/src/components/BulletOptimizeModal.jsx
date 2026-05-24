import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, X, Wand2, Zap, Check, Loader2, 
  Brain, Rocket, TrendingUp, Copy
} from 'lucide-react';

// ─── Loading Animation with rotating messages ─────────────────────────────────
const LoadingMessages = [
  { icon: Brain, text: "AI is analyzing your bullet point...", gradient: "from-violet-500 to-purple-600" },
  { icon: Sparkles, text: "Crafting professional alternatives...", gradient: "from-blue-500 to-cyan-600" },
  { icon: TrendingUp, text: "Enhancing impact and clarity...", gradient: "from-teal-500 to-emerald-600" },
  { icon: Rocket, text: "Almost there, polishing suggestions...", gradient: "from-pink-500 to-rose-600" },
];

const LoadingAnimation = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LoadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = LoadingMessages[messageIndex];
  const Icon = currentMessage.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Animated Icon */}
      <motion.div
        key={messageIndex}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 180, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentMessage.gradient} flex items-center justify-center shadow-2xl mb-6`}
      >
        <Icon className="w-10 h-10 text-white" />
      </motion.div>

      {/* Rotating Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-semibold text-slate-700 text-center"
        >
          {currentMessage.text}
        </motion.p>
      </AnimatePresence>

      {/* Animated Progress Bar */}
      <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden mt-6">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Pulsing Dots */}
      <div className="flex items-center gap-2 mt-4">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-violet-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Suggestion Card ──────────────────────────────────────────────────────────
const SuggestionCard = ({ text, index, isChosen, onChoose, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative group"
    >
      <button
        onClick={() => onChoose(text)}
        className={`w-full text-left px-5 py-4 rounded-xl border-2 text-sm leading-relaxed transition-all ${
          isChosen
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg'
            : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Number Badge */}
          <div className={`mt-0.5 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition ${
            isChosen 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-600'
          }`}>
            {isChosen ? <Check className="w-3.5 h-3.5" /> : index + 1}
          </div>
          
          {/* Suggestion Text */}
          <span className={`flex-1 ${isChosen ? 'text-green-900 font-medium' : 'text-slate-700'}`}>
            {text}
          </span>

          {/* Copy Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            className={`opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg ${
              copied ? 'bg-green-100 text-green-600' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </button>

      {/* Selected Badge */}
      {isChosen && (
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg flex items-center gap-1"
        >
          <Check className="w-3 h-3" />
          Selected
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Main Modal Component ─────────────────────────────────────────────────────
const BulletOptimizeModal = ({ bullet, context, token, onClose, onChoose, backendUrl }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [chosenSuggestion, setChosenSuggestion] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setSuggestions([]);

    try {
      const payload = {
        bullets: [bullet.text]
      };

      // Add context (role/company or project name)
      if (context.role && context.company) {
        payload.role = context.role;
        payload.company = context.company;
      } else if (context.projectName) {
        payload.role = 'Project';
        payload.company = context.projectName;
      }

      const response = await fetch(`${backendUrl}/api/profile/optimize-experience`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestions');
      }

      const data = await response.json();
      const result = data?.results?.[0] || data?.optimized_bullets?.[0];
      
      if (result?.suggestions && Array.isArray(result.suggestions)) {
        setSuggestions(result.suggestions);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('[BulletOptimizeModal] Error:', err);
      setError(err.message || 'Failed to generate suggestions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChooseSuggestion = (suggestion) => {
    setChosenSuggestion(suggestion);
  };

  const handleConfirm = () => {
    if (chosenSuggestion) {
      onChoose(bullet.id, chosenSuggestion);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Magic Bullet Optimizer</h2>
                <p className="text-xs text-slate-500">Transform your bullet point with AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Original Bullet */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Original Bullet Point
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 leading-relaxed">
                {bullet.text}
              </div>
              {context && (
                <p className="text-xs text-slate-400 mt-2">
                  Context: {context.role && context.company ? `${context.role} at ${context.company}` : context.projectName}
                </p>
              )}
            </div>

            {/* Generate Button (shown when no suggestions) */}
            {!isGenerating && suggestions.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-violet-500 via-purple-600 to-pink-500 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <Zap className="w-5 h-5" />
                  ✨ Transform with AI Magic
                  <Sparkles className="w-5 h-5" />
                </motion.button>
                <p className="text-sm text-slate-500 mt-4">
                  Click to generate 4 professionally optimized versions
                </p>
              </motion.div>
            )}

            {/* Loading Animation */}
            {isGenerating && <LoadingAnimation />}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700"
              >
                {error}
              </motion.div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    AI-Generated Suggestions
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="text-xs text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>

                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionCard
                      key={index}
                      text={suggestion}
                      index={index}
                      isChosen={chosenSuggestion === suggestion}
                      onChoose={handleChooseSuggestion}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {suggestions.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                {chosenSuggestion ? '✓ Suggestion selected!' : 'Select a suggestion to continue'}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-white transition"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  disabled={!chosenSuggestion}
                  className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Use This Suggestion
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BulletOptimizeModal;
