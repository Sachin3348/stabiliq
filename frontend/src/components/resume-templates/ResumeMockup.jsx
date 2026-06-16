import React from 'react';

// ─── Shared Section Header ────────────────────────────────────────────────────
const SectionHeader = ({ label, color = '#1e293b', borderColor }) => (
  <div style={{ marginBottom: 6 }}>
    <div style={{
      fontSize: 7.5,
      fontWeight: 700,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      color: color,
      paddingBottom: 2,
      borderBottom: `1.5px solid ${borderColor || color}`,
    }}>
      {label}
    </div>
  </div>
);

// ─── Bullet item ──────────────────────────────────────────────────────────────
const Bullet = ({ text }) => (
  <div style={{ display: 'flex', gap: 5, marginBottom: 2 }}>
    <span style={{ color: '#94a3b8', fontSize: 6, marginTop: 1.5 }}>●</span>
    <span style={{ fontSize: 6.5, lineHeight: 1.5, color: '#374151' }}>{text}</span>
  </div>
);

// ─── Job Entry ────────────────────────────────────────────────────────────────
const JobEntry = ({ title, company, location, date, bullets, accent }) => (
  <div style={{ marginBottom: 9 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: '#0f172a' }}>{title}</div>
        <div style={{ fontSize: 6.5, color: accent, fontWeight: 600 }}>{company}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 6, color: '#64748b' }}>{date}</div>
        <div style={{ fontSize: 6, color: '#94a3b8' }}>{location}</div>
      </div>
    </div>
    <div style={{ marginTop: 4 }}>
      {bullets.map((b, i) => <Bullet key={i} text={b} />)}
    </div>
  </div>
);

// ─── STYLE: Two-Column ────────────────────────────────────────────────────────
const TwoColumnMockup = ({ accent = '#2563eb' }) => (
  <div style={{ display: 'flex', height: '100%', fontFamily: "'Arial', sans-serif" }}>
    {/* Left Sidebar */}
    <div style={{
      width: '32%',
      background: accent,
      padding: '16px 10px',
      flexShrink: 0,
    }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Arjun</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.7)', lineHeight: 1.2, marginBottom: 4 }}>Sharma</div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
          arjun@email.com<br />
          +91 98765 43210<br />
          Bangalore, India<br />
          linkedin.com/in/arjunsharma
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 5, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}>Skills</div>
        {['React.js', 'Node.js', 'TypeScript', 'Python', 'AWS / GCP', 'PostgreSQL', 'Docker', 'System Design', 'CI/CD', 'REST APIs'].map(s => (
          <div key={s} style={{ fontSize: 6, color: 'rgba(255,255,255,0.85)', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
            {s}
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 5, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}>Education</div>
        <div style={{ fontSize: 6.5, fontWeight: 700, color: '#fff' }}>B.Tech, Computer Science</div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.75)' }}>IIT Bombay</div>
        <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)' }}>2016 – 2020 · 8.7 CGPA</div>
      </div>
    </div>

    {/* Right Content */}
    <div style={{ flex: 1, padding: '14px 12px', overflowY: 'hidden' }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: '#334155', letterSpacing: 0.5 }}>SENIOR SOFTWARE ENGINEER</div>
        <div style={{ fontSize: 6, color: '#64748b', marginTop: 4, lineHeight: 1.6 }}>
          Full-stack engineer with 6+ years building scalable systems at high-growth startups. 
          Specialised in distributed systems, React ecosystems, and cloud-native architecture.
        </div>
      </div>

      <SectionHeader label="Experience" color={accent} />
      <JobEntry
        title="Senior Software Engineer"
        company="Razorpay"
        location="Bangalore"
        date="Jan 2022 – Present"
        accent={accent}
        bullets={[
          'Architected payment gateway microservices handling ₹500Cr+ daily transactions with 99.99% uptime',
          'Led migration from monolith to microservices reducing deployment time by 70%',
          'Mentored a team of 5 engineers, conducting weekly code reviews and architecture sessions',
        ]}
      />
      <JobEntry
        title="Software Engineer II"
        company="Swiggy"
        location="Bangalore"
        date="Jun 2020 – Dec 2021"
        accent={accent}
        bullets={[
          'Built real-time order tracking dashboard used by 2M+ daily active users',
          'Reduced API response time by 45% through Redis caching and query optimisation',
        ]}
      />

      <SectionHeader label="Projects" color={accent} />
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: '#0f172a' }}>OpenMetrics - Open Source Monitoring Tool</div>
        <div style={{ fontSize: 6, color: '#64748b', marginTop: 2, lineHeight: 1.5 }}>
          Built a Prometheus-alternative with 2,400+ GitHub stars. React frontend + Go backend. 
          Featured in Hacker News and adopted by 12 companies.
        </div>
      </div>
    </div>
  </div>
);

// ─── STYLE: Single-Column ─────────────────────────────────────────────────────
const SingleColumnMockup = ({ accent = '#0f172a' }) => (
  <div style={{ padding: '16px 18px', fontFamily: "'Arial', sans-serif", height: '100%' }}>
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${accent}` }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: accent, letterSpacing: 0.5 }}>Priya Mehta</div>
      <div style={{ fontSize: 7.5, color: '#64748b', marginTop: 2, fontWeight: 500 }}>Senior Product Manager</div>
      <div style={{ fontSize: 6, color: '#94a3b8', marginTop: 4, display: 'flex', justifyContent: 'center', gap: 10 }}>
        <span>priya@email.com</span>
        <span>+91 99887 76655</span>
        <span>Mumbai, India</span>
        <span>linkedin.com/in/priyamehta</span>
      </div>
    </div>

    {/* Summary */}
    <div style={{ marginBottom: 9 }}>
      <SectionHeader label="Professional Summary" color={accent} borderColor={accent} />
      <div style={{ fontSize: 6.5, color: '#374151', lineHeight: 1.7 }}>
        Product leader with 7+ years driving 0→1 product development and scaling platforms to 10M+ users. 
        Track record of delivering $40M+ revenue impact through data-driven product strategy. 
        Expert in roadmap prioritisation, stakeholder alignment, and cross-functional execution.
      </div>
    </div>

    {/* Experience */}
    <SectionHeader label="Experience" color={accent} borderColor={accent} />
    <JobEntry
      title="Senior Product Manager"
      company="PhonePe"
      location="Bangalore"
      date="Mar 2021 – Present"
      accent={accent}
      bullets={[
        'Led UPI payments product for 450M users, driving 35% YoY transaction volume growth',
        'Defined and shipped 3 major product lines generating ₹180Cr incremental annual revenue',
        'Built and managed cross-functional squad of 18 engineers, designers, and data analysts',
      ]}
    />
    <JobEntry
      title="Product Manager"
      company="Zomato"
      location="Gurugram"
      date="Jul 2018 – Feb 2021"
      accent={accent}
      bullets={[
        'Owned restaurant discovery feature used by 12M+ monthly active users',
        'Reduced checkout abandonment by 28% through A/B tested UX redesign',
      ]}
    />

    {/* Skills */}
    <div style={{ marginBottom: 6 }}>
      <SectionHeader label="Core Skills" color={accent} borderColor={accent} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
        {['Product Strategy', 'Roadmap Planning', 'SQL / Analytics', 'A/B Testing', 'OKR Frameworks', 'Figma', 'Jira', 'GTM Strategy'].map(s => (
          <span key={s} style={{ fontSize: 5.5, background: '#f1f5f9', color: '#475569', padding: '2px 5px', borderRadius: 3, border: '1px solid #e2e8f0' }}>{s}</span>
        ))}
      </div>
    </div>

    {/* Education */}
    <SectionHeader label="Education" color={accent} borderColor={accent} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
      <div>
        <div style={{ fontSize: 7, fontWeight: 700, color: '#0f172a' }}>MBA, Strategy & Marketing</div>
        <div style={{ fontSize: 6, color: '#64748b' }}>IIM Ahmedabad</div>
      </div>
      <div style={{ fontSize: 6, color: '#94a3b8' }}>2016 – 2018</div>
    </div>
  </div>
);

// ─── STYLE: Executive ─────────────────────────────────────────────────────────
const ExecutiveMockup = ({ accent = '#1e293b' }) => (
  <div style={{ padding: '18px 20px', fontFamily: "'Georgia', serif", height: '100%' }}>
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: accent, letterSpacing: 1 }}>RAJESH KUMAR</div>
      <div style={{ fontSize: 7, color: '#64748b', letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>Chief Technology Officer</div>
      <div style={{ width: '80%', height: 1.5, background: accent, margin: '6px auto' }} />
      <div style={{ fontSize: 6, color: '#94a3b8', display: 'flex', justifyContent: 'center', gap: 12 }}>
        <span>rajesh@email.com</span>
        <span>+91 98001 12233</span>
        <span>Delhi, India</span>
      </div>
    </div>

    {/* Executive Summary */}
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: accent, marginBottom: 4, textAlign: 'center' }}>Executive Profile</div>
      <div style={{ fontSize: 6.5, color: '#374151', lineHeight: 1.8, textAlign: 'justify' }}>
        Visionary technology executive with 18 years leading engineering organisations of 200+ engineers across India, 
        Singapore, and USA. Track record of building and scaling SaaS platforms to $100M+ ARR. 
        Board advisor to 4 funded startups. Expert in digital transformation and M&A technical due diligence.
      </div>
    </div>

    <div style={{ width: '100%', height: 0.5, background: '#e2e8f0', marginBottom: 8 }} />

    <SectionHeader label="Career Highlights" color={accent} borderColor={accent} />
    <div style={{ marginBottom: 8 }}>
      {[
        '₹800Cr revenue engineering organisation built from 12 to 220+ engineers in 4 years',
        'Led IPO technical due diligence for NSE-listed fintech company (2022)',
        '3 successful M&A technical integrations with combined $200M deal value',
        'Filed 4 patents in distributed systems and real-time payment processing',
      ].map((h, i) => <Bullet key={i} text={h} />)}
    </div>

    <SectionHeader label="Professional Experience" color={accent} borderColor={accent} />
    <JobEntry
      title="Chief Technology Officer"
      company="Nykaa (FSN E-Commerce)"
      location="Mumbai"
      date="Apr 2019 – Present"
      accent={accent}
      bullets={[
        'Led technology transformation supporting ₹5,000Cr GMV e-commerce platform at IPO scale',
        'Built engineering organisation from 45 to 200+ engineers across 3 global locations',
        'Drove cloud migration reducing infrastructure costs by ₹22Cr annually',
      ]}
    />
  </div>
);

// ─── STYLE: Minimal ───────────────────────────────────────────────────────────
const MinimalMockup = ({ accent = '#7c3aed' }) => (
  <div style={{ padding: '20px 22px', fontFamily: "'Helvetica Neue', Arial, sans-serif", height: '100%' }}>
    {/* Name Block */}
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 17, fontWeight: 300, color: '#0f172a', letterSpacing: -0.5, lineHeight: 1 }}>Sneha</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: accent, letterSpacing: -0.5 }}>Kapoor</div>
      <div style={{ fontSize: 7, color: '#94a3b8', marginTop: 4, fontWeight: 400 }}>Senior UX Designer</div>
      <div style={{ fontSize: 6, color: '#cbd5e1', marginTop: 5 }}>sneha@email.com · Hyderabad · portfolio.sneha.design</div>
    </div>

    <div style={{ width: 30, height: 2, background: accent, marginBottom: 14 }} />

    {/* Summary */}
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 6.5, color: '#475569', lineHeight: 1.9, fontWeight: 400 }}>
        Interaction designer with 5 years crafting enterprise-grade product experiences. 
        Led design systems for platforms serving 8M+ users. 
        Strong background in user research, prototyping, and cross-functional collaboration.
      </div>
    </div>

    <SectionHeader label="Experience" color={accent} borderColor="#e2e8f0" />
    <JobEntry
      title="Senior UX Designer"
      company="CRED"
      location="Bangalore"
      date="Jun 2021 – Present"
      accent={accent}
      bullets={[
        'Redesigned onboarding flow increasing completion rate from 58% to 84%',
        'Led design system with 140+ components used across 8 product teams',
        'Conducted 60+ user research sessions informing Q3 product roadmap decisions',
      ]}
    />
    <JobEntry
      title="UX Designer"
      company="Meesho"
      location="Bangalore"
      date="Aug 2019 – May 2021"
      accent={accent}
      bullets={[
        'Designed seller dashboard serving 650K+ active merchants across Tier-2 cities',
        'A/B tested 12 checkout variations, improving conversion by 19%',
      ]}
    />

    <SectionHeader label="Tools & Expertise" color={accent} borderColor="#e2e8f0" />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
      {['Figma', 'Protopie', 'Framer', 'Maze', 'Hotjar', 'UserTesting', 'Jira', 'Design Systems'].map(t => (
        <span key={t} style={{ fontSize: 5.5, color: accent, border: `1px solid ${accent}`, padding: '1.5px 5px', borderRadius: 20 }}>{t}</span>
      ))}
    </div>
  </div>
);

// ─── STYLE: ATS Pro ───────────────────────────────────────────────────────────
const AtsProMockup = ({ accent = '#059669' }) => (
  <div style={{ padding: '16px 18px', fontFamily: "'Times New Roman', serif", height: '100%' }}>
    <div style={{ textAlign: 'center', marginBottom: 10 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>VIKRAM SINGH</div>
      <div style={{ fontSize: 6.5, color: '#374151', marginTop: 3 }}>
        vikram.singh@email.com | +91 97654 32100 | Pune, Maharashtra
      </div>
      <div style={{ fontSize: 6.5, color: '#374151' }}>
        linkedin.com/in/vikramsingh | github.com/vikramsingh
      </div>
    </div>

    <div style={{ fontSize: 7.5, fontWeight: 700, borderBottom: '1.5px solid #000', paddingBottom: 1, marginBottom: 5 }}>PROFESSIONAL SUMMARY</div>
    <div style={{ fontSize: 6.5, lineHeight: 1.7, color: '#374151', marginBottom: 8 }}>
      Results-oriented Data Engineer with 5 years of experience designing and implementing scalable data pipelines 
      processing 10TB+ daily. Proficient in Apache Spark, Kafka, dbt, Airflow, and AWS data services. 
      Delivered $2M+ annual cost savings through pipeline optimisation at Fortune 500 clients.
    </div>

    <div style={{ fontSize: 7.5, fontWeight: 700, borderBottom: '1.5px solid #000', paddingBottom: 1, marginBottom: 5 }}>TECHNICAL SKILLS</div>
    <div style={{ fontSize: 6.5, lineHeight: 1.8, color: '#374151', marginBottom: 8 }}>
      <div><strong>Languages:</strong> Python, Scala, SQL, Bash</div>
      <div><strong>Big Data:</strong> Apache Spark, Hadoop, Kafka, Flink</div>
      <div><strong>Cloud:</strong> AWS (EMR, Glue, S3, Redshift), GCP (BigQuery, Dataflow)</div>
      <div><strong>Tools:</strong> Airflow, dbt, Databricks, Terraform, Docker</div>
    </div>

    <div style={{ fontSize: 7.5, fontWeight: 700, borderBottom: '1.5px solid #000', paddingBottom: 1, marginBottom: 5 }}>WORK EXPERIENCE</div>
    <JobEntry
      title="Senior Data Engineer"
      company="Infosys - Client: HSBC"
      location="Pune"
      date="Feb 2021 – Present"
      accent="#000"
      bullets={[
        'Built real-time fraud detection pipeline using Kafka + Spark processing 500K transactions/sec',
        'Reduced data latency from 4 hours to 8 minutes through streaming architecture redesign',
        'Automated 120 manual ETL processes saving 800 engineering hours annually',
      ]}
    />

    <div style={{ fontSize: 7.5, fontWeight: 700, borderBottom: '1.5px solid #000', paddingBottom: 1, marginBottom: 5 }}>EDUCATION</div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: 7, fontWeight: 700, color: '#000' }}>B.E., Information Technology</div>
        <div style={{ fontSize: 6, color: '#374151' }}>University of Pune</div>
      </div>
      <div style={{ fontSize: 6, color: '#374151' }}>2014 – 2018</div>
    </div>
  </div>
);

// ─── STYLE: Fresher ───────────────────────────────────────────────────────────
const FresherMockup = ({ accent = '#0891b2' }) => (
  <div style={{ padding: '16px 18px', fontFamily: "'Arial', sans-serif", height: '100%' }}>
    <div style={{ marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${accent}` }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: accent }}>Ananya Gupta</div>
      <div style={{ fontSize: 7, color: '#64748b', fontWeight: 500, marginTop: 1 }}>Aspiring Software Developer | B.Tech CSE 2024</div>
      <div style={{ fontSize: 6, color: '#94a3b8', marginTop: 4, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span>ananya@email.com</span>
        <span>+91 96543 21000</span>
        <span>Delhi, India</span>
        <span>github.com/ananyagupta</span>
      </div>
    </div>

    <div style={{ marginBottom: 8 }}>
      <SectionHeader label="Objective" color={accent} />
      <div style={{ fontSize: 6.5, color: '#475569', lineHeight: 1.7, marginTop: 3 }}>
        Motivated CSE graduate seeking software engineering roles where I can contribute full-stack development skills 
        and apply machine learning knowledge to build impactful products.
      </div>
    </div>

    <SectionHeader label="Education" color={accent} />
    <div style={{ marginTop: 4, marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: '#0f172a' }}>B.Tech, Computer Science & Engineering</div>
          <div style={{ fontSize: 6.5, color: accent, fontWeight: 600 }}>Delhi Technological University</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 6, color: '#64748b' }}>2020 – 2024</div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: '#059669' }}>CGPA: 8.9 / 10</div>
        </div>
      </div>
    </div>

    <SectionHeader label="Projects" color={accent} />
    <div style={{ marginTop: 4, marginBottom: 8 }}>
      <div style={{ marginBottom: 7 }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: '#0f172a' }}>StudyBuddy - AI Study Planner</div>
        <div style={{ fontSize: 5.5, color: accent, marginBottom: 2 }}>React · Node.js · MongoDB · OpenAI API</div>
        <Bullet text="Built AI-powered study scheduler adopted by 800+ students at DTU with 4.6/5 rating" />
        <Bullet text="Implemented spaced repetition algorithm improving retention scores by 34% in user trials" />
      </div>
      <div>
        <div style={{ fontSize: 7, fontWeight: 700, color: '#0f172a' }}>CampusCart - College Marketplace</div>
        <div style={{ fontSize: 5.5, color: accent, marginBottom: 2 }}>React Native · Firebase · Stripe</div>
        <Bullet text="Peer-to-peer marketplace with 2,000+ active users and ₹12L in transaction volume in 3 months" />
      </div>
    </div>

    <SectionHeader label="Technical Skills" color={accent} />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
      {['C++', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB', 'Git', 'TensorFlow', 'AWS'].map(s => (
        <span key={s} style={{ fontSize: 5.5, background: `${accent}15`, color: accent, padding: '2px 6px', borderRadius: 3, fontWeight: 600 }}>{s}</span>
      ))}
    </div>
  </div>
);

// ─── Main ResumeMockup Component ──────────────────────────────────────────────
const ResumeMockup = ({ template, scale = 0.4 }) => {
  const W = 680;
  const H = 960;

  const renderContent = () => {
    switch (template.style) {
      case 'two-column':   return <TwoColumnMockup accent={template.accentColor} />;
      case 'executive':    return <ExecutiveMockup accent={template.accentColor} />;
      case 'minimal':      return <MinimalMockup accent={template.accentColor} />;
      case 'ats-pro':      return <AtsProMockup accent={template.accentColor} />;
      case 'fresher':      return <FresherMockup accent={template.accentColor} />;
      case 'single-column':
      default:             return <SingleColumnMockup accent={template.accentColor} />;
    }
  };

  return (
    <div style={{ width: W * scale, height: H * scale, overflow: 'hidden', flexShrink: 0 }}>
      <div style={{
        width: W,
        height: H,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        background: '#fff',
        boxShadow: '0 0 0 1px #e2e8f0',
        overflow: 'hidden',
      }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ResumeMockup;
