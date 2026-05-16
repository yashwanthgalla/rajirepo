import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import {
  HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker,
  HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCode,
  HiOutlineChartBar, HiOutlineDatabase, HiOutlineDocumentReport,
  HiOutlineUsers, HiOutlineCog, HiOutlineDownload,
  HiOutlineSun, HiOutlineMoon, HiOutlineCheckCircle, HiOutlineExternalLink
} from 'react-icons/hi';
import {
  SiPython, SiGit, SiDocker,
  SiSnowflake, SiLeetcode,
} from 'react-icons/si';
import { FaAws, FaGithub, FaLinkedin, FaMicrosoft, FaChartBar } from 'react-icons/fa';
import Navbar from './components/Navbar';
import ScrollReveal from './components/ScrollReveal';
import ProfileCard from './components/ProfileCard';
import './index.css';

/* ── Data ── */
const skills = [
  {
    icon: <HiOutlineChartBar />,
    title: 'Financial & Data Analysis',
    color: '#6c63ff',
    tags: ['Budget Development', 'Financial Reporting', 'Variance Analysis', 'Cost-Benefit Analysis', 'Forecasting', 'Trend Analysis', 'Grants Monitoring'],
  },
  {
    icon: <HiOutlineCode />,
    title: 'Programming & Analytics',
    color: '#00d4aa',
    tags: ['Python', 'SQL', 'R', 'Advanced Excel', 'Pivot Tables', 'VLOOKUP', 'Power Query', 'ETL', 'Statistical Analysis'],
  },
  {
    icon: <HiOutlineDocumentReport />,
    title: 'BI & Visualization',
    color: '#ff6b9d',
    tags: ['Power BI', 'Tableau', 'KPI Dashboards', 'Narrative Reporting', 'Data Storytelling'],
  },
  {
    icon: <HiOutlineDatabase />,
    title: 'Data Management',
    color: '#f59e0b',
    tags: ['Data Modeling', 'Data Validation', 'Data Integration', 'Large Dataset Handling', 'Data Cleaning'],
  },
  {
    icon: <HiOutlineUsers />,
    title: 'Collaboration & Tools',
    color: '#8b5cf6',
    tags: ['Git', 'GitHub', 'Jira', 'Confluence', 'Agile/Scrum', 'Stakeholder Communication'],
  },
  {
    icon: <HiOutlineCog />,
    title: 'Cloud & DevOps',
    color: '#06b6d4',
    tags: ['Azure Databricks', 'ADF', 'Snowflake', 'Docker', 'AWS', 'Shell Scripting', 'CI/CD'],
  },
];

const experiences = [
  {
    company: 'Conflux System',
    location: 'Dallas, TX',
    role: 'Data Analyst',
    date: 'Jan 2025 – Present',
    bullets: [
      'Performed financial and operational data analysis to support forecasting and variance tracking.',
      'Prepared narrative and quantitative reports for leadership to support budgeting decisions.',
      'Automated Azure Databricks pipelines using Git and CI/CD, improving deployment speed by 25%.',
      'Built end-to-end data monitoring solutions using Azure Monitor and automated alerts.',
      'Deployed analytics workloads using Docker containers and Git-based workflows.',
    ],
  },
  {
    company: 'Florida International University',
    location: 'Miami, FL',
    role: 'Research Analyst',
    date: 'Aug 2024 – Dec 2024',
    bullets: [
      'Migrated legacy data to Azure SQL Server and Synapse Analytics, improving reporting efficiency by 25%.',
      'Built executive-level Power BI dashboards tracking retention, acquisition, revenue, and financial KPIs.',
      'Analyzed large financial and transactional datasets to support forecasting and strategic decision-making.',
      'Partnered with stakeholders to translate business requirements into actionable insights.',
    ],
  },
  {
    company: 'Shriram Chits Private Limited',
    location: 'Vijayawada, AP',
    role: 'System Analyst',
    date: 'Jan 2019 – Dec 2020',
    bullets: [
      'Migrated legacy datasets to Azure SQL Server & Synapse, improving data availability by 25%.',
      'Performed SQL-based data validation and developed retention dashboards in Power BI.',
      'Analyzed large financial datasets and validated transactions for accuracy.',
      'Developed dashboards for customer financial trends and revenue forecasting.',
    ],
  },
  {
    company: 'Gamma Private Limited',
    location: 'Hyderabad, AP',
    role: 'Customer Analyst',
    date: 'Oct 2017 – Dec 2018',
    bullets: [
      'Conducted analysis on revenue, retention, and financial trends to support budget planning.',
      'Built dashboards and trend analyses in Tableau and Excel to improve retention programs.',
      'Supported marketing optimization through cohort analysis and reporting automation.',
      'Developed automated SQL scripts for reporting and enterprise data governance.',
    ],
  },
];

const projects = [
  {
    title: 'Sales Operations Dashboard',
    org: 'FIU • The Sales League',
    date: 'Jan 2025 – May 2025',
    desc: 'Built a comprehensive performance dashboard tracking Cash Collected, YTD Closing %, Show Rate, and Dial Volume. Implemented automation strategies for live, self-updating dashboards.',
    tech: ['Google Sheets', 'QUERY', 'SUMIF', 'Data Storytelling'],
    color: '#6c63ff',
    github: '',
  },
  {
    title: 'Airbnb Pricing Prediction (ML)',
    org: 'FIU',
    date: 'Jan 2024 – May 2024',
    desc: 'Built predictive models in Python to forecast rental pricing across neighbourhoods, achieving 25% improvement in accuracy. Designed interactive Power BI dashboards for pricing patterns.',
    tech: ['Python', 'Pandas', 'NumPy', 'Power BI', 'ML'],
    color: '#00d4aa',
    github: 'https://github.com/NagaBhogadi/Air-BNB',
  },
  {
    title: 'Crime Data Visualization (ML)',
    org: 'FIU',
    date: 'Aug 2024 – Dec 2024',
    desc: 'Processed large city-level crime datasets using Azure Databricks. Designed real-time Power BI dashboards to visualize hotspots and applied forecasting models for proactive planning.',
    tech: ['Azure Databricks', 'Power BI', 'Forecasting', 'ETL'],
    color: '#ff6b9d',
    github: 'https://github.com/NagaBhogadi/Crime-Data-Analysis-Visualization-using-ML-Capstone-Data-Science',
  },
];

/* ── App ── */
export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
  });

  const [formState, handleFormSubmit, resetForm] = useForm('xvzypgzl');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="dot" />
            Available for opportunities
          </div>
          <h1>
            Naga Rajitha<br />
            <span className="gradient-text">Bhogadi</span>
          </h1>
          <p>
            Data Analyst with 5+ years of experience turning raw financial data into
            actionable insights through dashboards, statistical modeling, and machine learning.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              <HiOutlineMail /> Get in Touch
            </a>
            <a href="/Naga Data Analyst.pdf" download="Naga_Rajitha_Bhogadi_Resume.pdf" className="btn btn-outline">
              <HiOutlineDownload /> Download Resume
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="hero-stat">
              <h3>3.92</h3>
              <p>GPA (Masters)</p>
            </div>
            <div className="hero-stat">
              <h3>25%</h3>
              <p>Avg. Efficiency Gain</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="section" id="about">
        <ScrollReveal>
          <span className="section-label">Introduction</span>
          <h2 className="section-title">About Me</h2>
        </ScrollReveal>
        <div className="about-grid">
          <ScrollReveal direction="left">
            <div className="about-text">
              <p>
                I'm a Data Analyst with a Master's in Data Science & AI from Florida International University,
                bringing 5+ years of hands-on experience analyzing financial data, building interactive dashboards,
                and delivering data-driven insights across public and private sectors.
              </p>
              <p>
                Skilled in SQL, Python, Excel, Power BI, and cloud technologies like Azure Databricks and Snowflake,
                I specialize in budget analysis, forecasting, cost-benefit analysis, and translating complex datasets
                into strategic recommendations for leadership.
              </p>
              <div className="about-info-grid">
                <div className="about-info-item">
                  <HiOutlineMail className="icon" />
                  <span>nrajithabhogadi@gmail.com</span>
                </div>
                <div className="about-info-item">
                  <HiOutlinePhone className="icon" />
                  <span>+603-808-1377</span>
                </div>
                <div className="about-info-item">
                  <HiOutlineBriefcase className="icon" />
                  <span>Data Analyst</span>
                </div>
                <div className="about-info-item">
                  <HiOutlineAcademicCap className="icon" />
                  <span>M.S. Data Science & AI</span>
                </div>
                <div className="about-info-item">
                  <SiLeetcode className="icon" />
                  <a href="https://leetcode.com/u/NagaBhogadi/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    LeetCode Profile
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="about-card-wrap">
              <ProfileCard
                name="Naga Rajitha"
                title="Data Analyst"
                handle="nrajithabhogadi"
                status="Open to Work"
                contactText="Hire Me"
                avatarUrl="/image.jpeg"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                behindGlowEnabled
                behindGlowColor="rgba(108, 99, 255, 0.5)"
                innerGradient="linear-gradient(145deg, #1a1a2e8c 0%, #6c63ff44 100%)"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className="section" id="skills">
        <ScrollReveal>
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </ScrollReveal>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="skill-card">
                <div className="skill-card-header">
                  <div className="skill-icon-wrap" style={{ background: `${s.color}18`, color: s.color }}>
                    {s.icon}
                  </div>
                  <h3>{s.title}</h3>
                </div>
                <div className="skill-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tech icon bar (Carousel) */}
        <ScrollReveal delay={0.3}>
          <div className="tech-carousel">
            <div className="tech-carousel-track">
              {[0, 1].map((groupIndex) =>
                [
                  { icon: <SiPython />, label: 'Python' },
                  { icon: <FaMicrosoft />, label: 'Azure' },
                  { icon: <FaChartBar />, label: 'Tableau' },
                  { icon: <SiGit />, label: 'Git' },
                  { icon: <SiDocker />, label: 'Docker' },
                  { icon: <SiSnowflake />, label: 'Snowflake' },
                  { icon: <FaAws />, label: 'AWS' },
                ].map((t) => (
                  <div key={`${groupIndex}-${t.label}`} className="tech-icon-wrap">
                    {t.icon}
                    <span>{t.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section className="section" id="experience">
        <ScrollReveal>
          <span className="section-label">Career</span>
          <h2 className="section-title">Work Experience</h2>
        </ScrollReveal>
        <div className="timeline">
          {experiences.map((e, i) => (
            <ScrollReveal key={e.company} delay={i * 0.15}>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-header">
                  <div>
                    <div className="timeline-company">{e.company}</div>
                    <div className="timeline-role">{e.role} • {e.location}</div>
                  </div>
                  <span className="timeline-date">{e.date}</span>
                </div>
                <ul className="timeline-bullets">
                  {e.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section className="section" id="projects">
        <ScrollReveal>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </ScrollReveal>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.15}>
              <div className="project-card">
                <div className="project-card-icon" style={{ background: `${p.color}18`, color: p.color }}>
                  <HiOutlineChartBar />
                </div>
                <h3>{p.title}</h3>
                <div className="project-org">{p.org} • {p.date}</div>
                <p>{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-github-btn">
                    <FaGithub /> View on GitHub <HiOutlineExternalLink />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section className="section" id="education">
        <ScrollReveal>
          <span className="section-label">Academics</span>
          <h2 className="section-title">Education</h2>
        </ScrollReveal>
        <div className="edu-cards">
          <ScrollReveal delay={0}>
            <div className="edu-card">
              <div className="edu-icon"><HiOutlineAcademicCap /></div>
              <h3>M.S. in Data Science & Artificial Intelligence</h3>
              <div className="edu-school">Florida International University, Miami, FL</div>
              <div className="edu-date">Aug 2023 – Apr 2025</div>
              <span className="edu-gpa">GPA: 3.92 / 4.00</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="edu-card">
              <div className="edu-icon"><HiOutlineCode /></div>
              <h3>B.Tech in Electronics & Communication Engineering</h3>
              <div className="edu-school">JNTU, Kakinada, AP</div>
              <div className="edu-date">Aug 2013 – Jun 2017</div>
              <span className="edu-gpa">GPA: 3.55 / 4.00</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="section" id="contact">
        <ScrollReveal>
          <span className="section-label">Connect</span>
          <h2 className="section-title">Get In Touch</h2>
        </ScrollReveal>
        <div className="contact-grid">
          <ScrollReveal direction="left">
            <div className="contact-info">
              <h3>Let's work together</h3>
              <p>
                I'm always open to discussing data analytics, machine learning projects,
                or new opportunities. Feel free to reach out!
              </p>
              <div className="contact-links">
                <a href="mailto:nrajithabhogadi@gmail.com" className="contact-link">
                  <HiOutlineMail className="c-icon" />
                  nrajithabhogadi@gmail.com
                </a>
                <a href="tel:+16038081377" className="contact-link">
                  <HiOutlinePhone className="c-icon" />
                  +603-808-1377
                </a>
                <a href="#" className="contact-link">
                  <HiOutlineLocationMarker className="c-icon" />
                  Dallas, TX
                </a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            {formState.succeeded ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <HiOutlineCheckCircle className="success-icon" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: '16px' }}
                  onClick={() => resetForm()}
                >
                  <HiOutlineMail /> Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input type="text" id="name" name="name" placeholder="Your Name" required />
                  <ValidationError prefix="Name" field="name" errors={formState.errors} className="form-error" />
                </div>
                <div className="form-group">
                  <input type="email" id="email" name="email" placeholder="Your Email" required />
                  <ValidationError prefix="Email" field="email" errors={formState.errors} className="form-error" />
                </div>
                <div className="form-group">
                  <input type="text" id="subject" name="subject" placeholder="Subject" required />
                  <ValidationError prefix="Subject" field="subject" errors={formState.errors} className="form-error" />
                </div>
                <div className="form-group">
                  <textarea id="message" name="message" placeholder="Your Message" required />
                  <ValidationError prefix="Message" field="message" errors={formState.errors} className="form-error" />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formState.submitting}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <HiOutlineMail />
                  {formState.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-links">
          <a href="mailto:nrajithabhogadi@gmail.com" aria-label="Email"><HiOutlineMail /></a>
          <a href="https://github.com/NagaBhogadi" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/bn-r-392062383" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://leetcode.com/u/NagaBhogadi/" target="_blank" rel="noreferrer" aria-label="LeetCode"><SiLeetcode /></a>
        </div>
        <p>© {new Date().getFullYear()} Naga Rajitha Bhogadi. Built with React & Three.js</p>
      </footer>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
      </button>
    </>
  );
}
