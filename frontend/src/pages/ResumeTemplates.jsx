import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TEMPLATES, CATEGORIES } from '../data/resumeTemplates';

// Components
import ResumeTemplatesNavbar from '../components/resume-templates/ResumeTemplatesNavbar';
import HeroSection from '../components/resume-templates/HeroSection';
import FilterTabs from '../components/resume-templates/FilterTabs';
import TemplateGrid from '../components/resume-templates/TemplateGrid';
import TemplatePreviewModal from '../components/resume-templates/TemplatePreviewModal';
import FeatureSection from '../components/resume-templates/FeatureSection';
import HowItWorks from '../components/resume-templates/HowItWorks';
import TestimonialsSection from '../components/resume-templates/TestimonialsSection';
import FAQSection from '../components/resume-templates/FAQSection';
import CTASection from '../components/resume-templates/CTASection';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const sortTemplates = (templates, sortBy) => {
  switch (sortBy) {
    case 'ats-score':   return [...templates].sort((a, b) => b.atsScore - a.atsScore);
    case 'newest':      return [...templates].sort((a, b) => b.id - a.id);
    case 'name':        return [...templates].sort((a, b) => a.title.localeCompare(b.title));
    case 'popular':
    default:            return [...templates].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }
};

const buildCounts = (templates) => {
  const counts = { all: templates.length };
  CATEGORIES.forEach(cat => {
    if (cat.id !== 'all') {
      counts[cat.id] = templates.filter(t => t.category === cat.id).length;
    }
  });
  return counts;
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const ResumeTemplates = () => {
  const gridRef = useRef(null);

  // Filter/search state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Modal state
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // ── Derived: filtered + sorted templates ──────────────────────────────────
  const filteredTemplates = useMemo(() => {
    let result = TEMPLATES;

    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.description.toLowerCase().includes(q)
      );
    }

    return sortTemplates(result, sortBy);
  }, [activeCategory, searchQuery, sortBy]);

  const categoryCounts = useMemo(() => buildCounts(TEMPLATES), []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBrowse = useCallback(() => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleUpload = useCallback(() => {
    window.open('https://stabiliq.in/dashboard/profile-analysis', '_blank');
  }, []);

  const handleUseTemplate = useCallback((template) => {
    setPreviewTemplate(null);
    window.open(template.copyUrl, '_blank');
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <ResumeTemplatesNavbar />

      {/* Hero */}
      <HeroSection onBrowse={handleBrowse} onUpload={handleUpload} />

      {/* Filter Tabs - sticky below navbar */}
      <div ref={gridRef}>
        <FilterTabs
          active={activeCategory}
          onChange={handleCategoryChange}
          counts={categoryCounts}
        />

        {/* Template Grid */}
        <TemplateGrid
          templates={filteredTemplates}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onPreview={setPreviewTemplate}
          onUseTemplate={handleUseTemplate}
        />
      </div>

      {/* Feature Section (dark) */}
      <FeatureSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA (dark) */}
      <CTASection onBrowse={handleBrowse} onUpload={handleUpload} />

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <TemplatePreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onUseTemplate={handleUseTemplate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeTemplates;
