import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Copy, Share2, Users, Wallet, Check, ArrowRight, Link2,
  UserPlus, IndianRupee, RefreshCcw, AlertCircle, Sparkles
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { getReferralStats } from '../../apis/service';

/** @typedef {import('../../types/referral').ReferralStats} ReferralStats */

// ─── Animated number counter ────────────────────────────────────────────────
const AnimatedCounter = ({ target, prefix = '' }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!target) { setVal(0); return; }
    let frame;
    const duration = 900;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <>{prefix}{val.toLocaleString('en-IN')}</>;
};

// ─── Looping referral flow animation (the "interactive gif") ────────────────
const ReferralFlowViz = () => {
  // 6 phases: 0=step0 lit, 1=dot0→1 travels, 2=step1 lit, 3=dot1→2 travels, 4=step2 lit, 5=pause
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const durations = [1200, 650, 1200, 650, 1200, 400];
    let current = 0;
    let t;
    const advance = () => {
      current = (current + 1) % 6;
      setPhase(current);
      t = setTimeout(advance, durations[current]);
    };
    t = setTimeout(advance, durations[0]);
    return () => clearTimeout(t);
  }, []);

  const activeStep = [0, 0, 1, 1, 2, 2][phase];
  const activeDot  = [null, 0, null, 1, null, null][phase];

  const steps = [
    {
      Icon: Share2,
      label: 'You share',
      sublabel: 'your unique code',
      gradient: 'from-blue-500 to-blue-600',
      glow: 'rgba(59,130,246,0.4)',
    },
    {
      Icon: UserPlus,
      label: 'Friend joins',
      sublabel: 'with your code',
      gradient: 'from-teal-500 to-cyan-600',
      glow: 'rgba(20,184,166,0.4)',
    },
    {
      Icon: IndianRupee,
      label: 'You earn',
      sublabel: 'wallet credits',
      gradient: 'from-emerald-500 to-green-600',
      glow: 'rgba(16,185,129,0.4)',
    },
  ];

  return (
    <div className="flex items-center py-6 px-2 sm:px-6">
      {steps.map((step, i) => {
        const { Icon } = step;
        const isActive = i === activeStep;
        return (
          <React.Fragment key={i}>
            <motion.div
              className="flex-1 flex flex-col items-center gap-3"
              animate={{ scale: isActive ? 1.1 : 0.9, opacity: isActive ? 1 : 0.42 }}
              transition={{ duration: 0.45, type: 'spring', stiffness: 260, damping: 22 }}
            >
              <motion.div
                className={`rounded-2xl bg-gradient-to-br ${step.gradient} p-4 shadow-xl`}
                animate={isActive
                  ? { boxShadow: `0 0 0 7px ${step.glow}, 0 8px 28px ${step.glow}` }
                  : { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
                }
                transition={{ duration: 0.4 }}
              >
                <Icon className="h-6 w-6 text-white" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">{step.label}</p>
                <p className="text-xs text-blue-200 hidden sm:block mt-0.5">{step.sublabel}</p>
              </div>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="flex-shrink-0 relative flex items-center justify-center w-10 sm:w-16 h-8">
                <div className="absolute inset-y-1/2 left-0 right-0 h-0.5 bg-white/20 rounded-full" />
                <AnimatePresence>
                  {activeDot === i && (
                    <motion.div
                      key={`dot-${i}-${phase}`}
                      className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg z-10"
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: 'easeInOut' }}
                    />
                  )}
                </AnimatePresence>
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── Stat card skeleton ──────────────────────────────────────────────────────
const StatSkeleton = () => (
  <div className="rounded-2xl bg-white p-5 shadow-sm animate-pulse">
    <div className="h-9 w-9 rounded-xl bg-slate-200 mb-4" />
    <div className="h-8 w-14 rounded bg-slate-200 mb-2" />
    <div className="h-3 w-20 rounded bg-slate-100" />
  </div>
);

// ─── Main page ───────────────────────────────────────────────────────────────
const Referral = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  /** @type {[ReferralStats|null, Function]} */
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getReferralStats(token);
      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to load referral details.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const copyText = useCallback(async (text, onSuccess) => {
    try {
      await navigator.clipboard.writeText(text);
      onSuccess();
    } catch {
      toast({ title: 'Copy failed', description: 'Clipboard not available.', variant: 'destructive' });
    }
  }, [toast]);

  const handleCopyCode = () => {
    if (!stats?.referralCode) return;
    copyText(stats.referralCode, () => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2200);
    });
  };

  const referralLink = stats?.referralCode
    ? `${window.location.origin}/?referralCode=${encodeURIComponent(stats.referralCode)}`
    : '';

  const handleCopyLink = () => {
    if (!referralLink) return;
    copyText(referralLink, () => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    });
  };

  const shareMessage = stats?.referralCode
    ? `💚 I’ve been using Stabiliq, and I think you’ll find it valuable too.\n\nUse my referral link to save ₹500 on your membership:\n${referralLink}`
    : '';

  const handleShare = async () => {
    if (!shareMessage) return;
    if (navigator.share) {
      try { await navigator.share({ text: shareMessage }); return; } catch (e) {
        if (e?.name === 'AbortError') return;
      }
    }
    copyText(shareMessage, () => {
      setMsgCopied(true);
      setTimeout(() => setMsgCopied(false), 2200);
      toast({ title: 'Copied!', description: 'Share message copied to clipboard.' });
    });
  };

  const handleCopyMsg = () => {
    if (!shareMessage) return;
    copyText(shareMessage, () => {
      setMsgCopied(true);
      setTimeout(() => setMsgCopied(false), 2200);
    });
  };

  const summaryCards = [
    {
      title: 'Wallet Balance',
      value: stats?.walletBalance ?? 0,
      prefix: '₹',
      Icon: Wallet,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Total Referrals',
      value: stats?.total ?? 0,
      Icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Successful',
      value: stats?.successful ?? 0,
      Icon: Check,
      gradient: 'from-cyan-500 to-sky-600',
    },
    {
      title: 'Pending',
      value: stats?.pending ?? 0,
      Icon: RefreshCcw,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
  };

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <motion.div variants={item} className="relative rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 p-7 md:p-10">
            {/* decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <motion.div
                className="flex-shrink-0 bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-4 w-fit"
                animate={{ rotate: [0, -9, 9, -4, 4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5 }}
              >
                <Gift className="h-9 w-9 text-white" />
              </motion.div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1
                    className="text-2xl md:text-3xl font-black text-white"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    Refer &amp; Earn
                  </h1>
                  {/* <motion.span
                    className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 tracking-wide"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    ✦ Active
                  </motion.span> */}
                </div>
                <p className="text-blue-100 text-sm md:text-base max-w-xxl leading-relaxed">
                  <p className='pb-2'><strong>Invite your friends to Stabiliq!</strong> 🎉 </p>
                  They get <strong>₹500 OFF</strong> instantly 💸, and you earn <strong>₹500</strong>  for every successful referral, credited directly to your bank account 🏦.
                </p>
<br/>
                <p className="text-blue-100 text-sm md:text-base max-w-xxl leading-relaxed font-sora font-medium">💰 Turn your network into rewards! Keep referring friends and earn up to <strong>₹1 Lakh 💸</strong> every month. 🚀</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Loading ───────────────────────────────────────────────────── */}
        {loading && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white shadow-lg p-8 animate-pulse">
              <div className="h-4 w-36 bg-slate-200 rounded mb-5" />
              <div className="h-16 w-72 bg-slate-100 rounded-2xl mb-7" />
              <div className="flex gap-3">
                <div className="h-10 w-32 bg-slate-200 rounded-xl" />
                <div className="h-10 w-36 bg-slate-200 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => <StatSkeleton key={i} />)}
            </div>
          </div>
        )}

        {/* ── Error ─────────────────────────────────────────────────────── */}
        {!loading && error && (
          <motion.div variants={item}>
            <Card className="border-red-200 bg-red-50 shadow-sm rounded-2xl">
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="bg-red-100 rounded-2xl p-4">
                  <AlertCircle className="h-7 w-7 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-red-700 mb-1">Couldn't load referral details</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={fetchStats}
                  className="border-red-300 text-red-700 hover:bg-red-100 rounded-xl gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Try again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ── Content ───────────────────────────────────────────────────── */}
        {!loading && !error && (
          <>
            {/* Referral code card */}
            <motion.div variants={item}>
              <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-7 md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Your Referral Code
                  </p>

                  {stats?.referralCode ? (
                    <div className="space-y-5">
                      {/* Code display */}
                      <motion.div
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100 rounded-2xl px-6 py-4"
                        whileHover={{ scale: 1.02, borderColor: '#93c5fd' }}
                        transition={{ type: 'spring', stiffness: 350 }}
                      >
                        <span className="text-3xl md:text-4xl font-black tracking-[0.35em] text-slate-900 font-mono select-all">
                          {stats.referralCode}
                        </span>
                      </motion.div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3">
                        <motion.div whileTap={{ scale: 0.96 }}>
                          <Button
                            onClick={handleCopyCode}
                            variant="outline"
                            className="gap-2 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl font-semibold transition-all min-w-[130px]"
                          >
                            <AnimatePresence mode="wait">
                              {codeCopied ? (
                                <motion.span
                                  key="done"
                                  className="flex items-center gap-2 text-emerald-600"
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                >
                                  <Check className="h-4 w-4" /> Copied!
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="copy"
                                  className="flex items-center gap-2"
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                >
                                  <Copy className="h-4 w-4" /> Copy code
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>

                        <motion.div whileTap={{ scale: 0.96 }}>
                          <Button
                            onClick={handleCopyLink}
                            variant="outline"
                            className="gap-2 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl font-semibold transition-all min-w-[130px]"
                          >
                            <AnimatePresence mode="wait">
                              {linkCopied ? (
                                <motion.span
                                  key="link-done"
                                  className="flex items-center gap-2 text-emerald-600"
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                >
                                  <Check className="h-4 w-4" /> Copied!
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="link-copy"
                                  className="flex items-center gap-2"
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                >
                                  <Link2 className="h-4 w-4" /> Copy link
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>

                        <motion.div whileTap={{ scale: 0.96 }}>
                          <Button
                            onClick={handleShare}
                            className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200/60 transition-all"
                          >
                            <Share2 className="h-4 w-4" />
                            Share with friends
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Gift className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      </motion.div>
                      <p className="font-semibold text-slate-600">No referral code yet</p>
                      <p className="text-sm text-slate-400 mt-1">Your code will appear here once it's assigned to your account.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={container}
              className="grid grid-cols-2 xl:grid-cols-4 gap-4"
            >
              {summaryCards.map((card) => {
                const { Icon } = card;
                return (
                  <motion.div key={card.title} variants={item}>
                    <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow">
                        <CardContent className="p-5">
                          <div className={`bg-gradient-to-br ${card.gradient} rounded-xl p-2.5 w-fit mb-4 shadow-md`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <p
                            className="text-2xl md:text-3xl font-black text-slate-900 tabular-nums"
                            style={{ fontFamily: 'Sora, sans-serif' }}
                          >
                            <AnimatedCounter target={card.value} prefix={card.prefix || ''} />
                          </p>
                          <p className="text-sm text-slate-500 mt-1 font-medium">{card.title}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* How it works — animated flow */}
            <motion.div variants={item}>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl overflow-hidden">
                <CardContent className="p-7 md:p-9">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="bg-white/10 rounded-xl p-2.5"
                      animate={{ rotate: [0, 20, -20, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                    >
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                    </motion.div>
                    <h2
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      How it works
                    </h2>
                  </div>
                  <p className="text-blue-300 text-sm mb-2 ml-1">Watch the referral flow in real time ↓</p>
                  <ReferralFlowViz />
                  <p className="text-center text-blue-400/70 text-xs mt-3 font-medium">
                    Every successful referral adds wallet credits to your account automatically.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Share message */}
            {shareMessage && (
              <motion.div variants={item}>
                <Card className="border-0 shadow-md bg-white rounded-2xl">
                  <CardContent className="p-6 md:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
                      Ready-to-share message
                    </p>
                    {referralLink && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 mb-3 select-all">
                        <p className="text-xs font-semibold text-blue-700 mb-1">Referral URL</p>
                        <p className="text-blue-700 text-sm break-all">{referralLink}</p>
                      </div>
                    )}
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 mb-4 select-all">
                      <p className="text-slate-700 text-sm leading-relaxed">{shareMessage}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleCopyMsg}
                      className="gap-2 border-2 rounded-xl font-semibold min-w-[155px]"
                    >
                      <AnimatePresence mode="wait">
                        {msgCopied ? (
                          <motion.span
                            key="mc"
                            className="flex items-center gap-2 text-emerald-600"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                          >
                            <Check className="h-4 w-4" /> Copied!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="mc2"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                          >
                            <Copy className="h-4 w-4" /> Copy message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}

      </motion.div>
    </DashboardLayout>
  );
};

export default Referral;
