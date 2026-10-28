import "./App.css";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const sectionTitleClasses =
  "text-sm font-semibold tracking-[0.16em] uppercase text-primary/80 mb-3";

// Note: scroll-based variants previously used across sections have been removed
// to keep content always visible; motion is now focused on hero/avatar only.

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });
  const [navSolid, setNavSolid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.dataset.theme = "dark";
    } else {
      root.classList.remove("dark");
      root.dataset.theme = "light";
    }
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme still works for the current session when storage is unavailable.
    }
    // Force reset overflow on mount (fixes scroll locking if HMR interrupts a modal)
    document.body.style.overflow = "";
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      // Make header + mobile bottom nav solid as soon as the user starts scrolling
      setNavSolid(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handleResize = () => setIsMobile(mq.matches);
    handleResize();
    mq.addEventListener("change", handleResize);
    return () => mq.removeEventListener("change", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[var(--portfolio-paper)] text-[var(--portfolio-ink)] transition-colors duration-300">
      <SiteChrome theme={theme} navSolid={navSolid || !isMobile} onToggleTheme={toggleTheme} />
      <main className={isMobile ? "pb-24" : ""}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ConsultancySection />
        <EducationSection />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomNav isMobile={isMobile} />
    </div>
  );
}

function SiteChrome({ theme, navSolid, onToggleTheme }) {
  return (
    <div
      className="sticky top-0 z-40 bg-white dark:bg-slate-900 transition-all duration-300"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-sm font-mono font-semibold text-primary shadow-soft-card"
            aria-hidden="true"
          >
            {"</>"}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Kwizera Emmanuel
            </span>
            <span className="text-[0.72rem] text-slate-500">
              Software Engineer
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-8 text-xs font-medium tracking-[0.16em] uppercase text-slate-600 dark:text-slate-300 sm:flex">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#certificates">Certificates</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-primary"
          >
            <span aria-hidden="true">
              {theme === "dark" ? "☀️" : "🌙"}
            </span>
          </button>
          <a
            href="#contact"
            className="inline-flex items-center whitespace-nowrap rounded-full border border-primary/10 bg-primary px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-white shadow-soft-card transition hover:-translate-y-0.5 hover:bg-[#123744] hover:shadow-lg sm:px-4 sm:text-xs sm:tracking-[0.16em]"
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="relative pb-1 transition-colors hover:text-primary"
    >
      <span>{children}</span>
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

function MobileBottomNav({ isMobile }) {
  if (!isMobile) return null;

  return (
    <nav className="pointer-events-none fixed left-3 right-3 bottom-3 z-50 sm:hidden">
      <div
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-1 rounded-full border border-slate-200 bg-white/95 px-2 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-300"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)" }}
      >
        <a href="#home" className="flex-1 px-1 py-1 text-center rounded-full whitespace-nowrap hover:text-primary">
          Home
        </a>
        <a href="#about" className="flex-1 px-1 py-1 text-center rounded-full whitespace-nowrap hover:text-primary">
          About
        </a>
        <a href="#skills" className="flex-1 px-1 py-1 text-center rounded-full whitespace-nowrap hover:text-primary">
          Skills
        </a>
        <a href="#experience" className="flex-1 px-1 py-1 text-center rounded-full whitespace-nowrap hover:text-primary">
          Work
        </a>
        <a href="#projects" className="flex-1 px-1 py-1 text-center rounded-full whitespace-nowrap hover:text-primary">
          Projects
        </a>
        <a href="#contact" className="flex-1 px-1 py-1 text-center rounded-full whitespace-nowrap hover:text-primary">
          Contact
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1 order-2 space-y-7 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Software Engineer · Kigali, Rwanda
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-[3.1rem]"
          >
            Building reliable web & mobile experiences for modern businesses.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-200"
          >
            Experienced Software Engineer with 6+ years in web and mobile
            development using Laravel, Spring Boot, Django, React, and Flutter.
            I design scalable systems, lead teams, and deliver high-quality
            products aligned with business goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.27 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-primary px-6 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-soft-card transition duration-200 hover:-translate-y-0.5 hover:bg-[#123744] hover:shadow-lg"
            >
              View projects
            </a>
            <a
              href="#experience"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md dark:bg-white dark:text-slate-900"
            >
              View experience
            </a>
            <a
              href="https://www.linkedin.com/in/e-kwizera/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md dark:bg-white dark:text-slate-900"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/emmizo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md dark:bg-white dark:text-slate-900"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.32 }}
            className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-500"
          >
            <HeroHighlight
              label="Backend"
              value="Laravel · Spring Boot · Django · Node.js"
            />
            <HeroHighlight label="Frontend" value="React · Next.js · Flutter" />
            <HeroHighlight label="Focus" value="ERP systems · Fintech · APIs" />
          </motion.div>
        </div>

        <div className="flex-1 order-1 lg:order-2">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 32 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
            className="relative mx-auto max-w-md"
          >
            <div className="absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_top,_rgba(22,70,85,0.22),_transparent_55%)]" />
            <div className="glass-panel rounded-3xl px-7 py-8">
              <div className="-mt-12 mb-4 flex items-end gap-3">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-md">
                  <motion.img
                    src="/image/passport-photo.JPG"
                    alt="Portrait of Kwizera Emmanuel"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
                  />
                </div>
                <div className="pb-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Profile
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Kwizera Emmanuel
                  </p>
                  <p className="text-xs text-slate-600">
                    Software Engineer · Web & Mobile
                  </p>
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Currently
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                Software Engineer · Ministry of Education Rwanda
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-200">
                Contributing to full SDLC, optimizing systems, integrating customized open-source solutions, and ensuring data integrity.
              </p>

              <dl className="mt-6 space-y-3 text-xs text-slate-600">
                <InfoRow label="Experience" value="6+ years" />
                <InfoRow
                  label="Core stack"
                  value="Laravel, Spring Boot, Django, React, Flutter"
                />
                <InfoRow
                  label="Location"
                  value="Kigali, Rwanda · Open to remote"
                />
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroHighlight({ label, value }) {
  return (
    <a href="#skills" className="hero-highlight flex flex-col gap-0.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <span className="text-xs text-slate-700">{value}</span>
    </a>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </dt>
      <dd className="text-xs text-slate-700 text-right">{value}</dd>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-4">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>About</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            About me
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200">
            Experienced Software Engineer with 6+ years in web and mobile
            development using Laravel, Spring Boot, Django, React, and Flutter.
            Skilled in blockchain (Ethereum, ICP), delivering high-quality
            solutions, leading teams, and aligning projects with business goals.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-200">
            I design and develop backend APIs, build modern frontend interfaces,
            and run full project lifecycles—from planning and architecture to
            deployment and maintenance. I work across PHP, Java, Python, and
            JavaScript/TypeScript, pairing clear communication with pragmatic
            delivery.
          </p>
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Highlights</p>
            <ul className="mt-3 space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
              <li>• Led ERP system development and delivery for cross-functional teams.</li>
              <li>• Designed and implemented scalable backend APIs across Laravel, Spring Boot, and Django.</li>
              <li>• Built production React/Next.js and Flutter interfaces for responsive web and mobile apps.</li>
              <li>• Conducted training and mentorship, including a 15-day Flutter program at Rwanda TVET Trainer Institute.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Currently exploring</p>
            <p className="mt-1">Machine learning, blockchain, cybersecurity, and modern DevOps practices—and always looking for ways to make complex systems simpler and more intuitive for end users.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [coreOnly, setCoreOnly] = useState(false);
  const skillGroups = [
    {
      category: "Backend & APIs",
      icon: "⚙",
      skills: [
        { name: "Laravel", icon: "laravel", level: "core", note: "Used across ERP and logistics projects." },
        { name: "Spring Boot", icon: "springboot", level: "core", note: "Used for production APIs and services." },
        { name: "Django", icon: "django", level: "core" },
        { name: "Node.js", icon: "nodedotjs", level: "core" },
        { name: "REST APIs", icon: "fastapi", level: "core" },
        { name: "USSD", level: "familiar" },
        { name: "AI Integration (OpenAI)", level: "familiar" },
      ],
    },
    {
      category: "Frontend & Mobile",
      icon: "◈",
      skills: [
        { name: "React", icon: "react", level: "core" },
        { name: "Next.js", icon: "nextdotjs", level: "core" },
        { name: "Flutter", icon: "flutter", level: "core" },
        { name: "JavaScript", icon: "javascript", level: "core" },
        { name: "HTML", icon: "html5", level: "familiar" },
        { name: "CSS", level: "familiar" },
        { name: "Bootstrap", icon: "bootstrap", level: "familiar" },
      ],
    },
    {
      category: "Languages",
      icon: "</>",
      skills: [
        { name: "Java", icon: "openjdk", level: "core" },
        { name: "PHP", icon: "php", level: "core" },
        { name: "Python", icon: "python", level: "core" },
        { name: "System analysis", level: "familiar" },
        { name: "Agile methodology", level: "familiar" },
      ],
    },
    {
      category: "Data & Infrastructure",
      icon: "▦",
      skills: [
        { name: "MySQL", icon: "mysql", level: "core" },
        { name: "PostgreSQL", icon: "postgresql", level: "core" },
        { name: "Docker", icon: "docker", level: "core" },
        { name: "Firebase", icon: "firebase", level: "core" },
        { name: "SQL Server", level: "familiar" },
        { name: "Oracle DB", level: "familiar" },
        { name: "Digital Ocean", icon: "digitalocean", level: "familiar" },
        { name: "Kafka", icon: "apachekafka", level: "familiar" },
      ],
    },
    {
      category: "Tools & DevOps",
      icon: "⌘",
      skills: [
        { name: "Git version control", icon: "git", level: "core" },
        { name: "GitHub", icon: "github", level: "core" },
        { name: "GitLab", icon: "gitlab", level: "core" },
        { name: "Bitbucket", icon: "bitbucket", level: "familiar" },
        { name: "Windows Server / Linux", icon: "linux", level: "familiar" },
        { name: "Virtualization", level: "familiar" },
        { name: "IIS", level: "familiar" },
        { name: "Server management", level: "familiar" },
      ],
    },
  ];

  const iconUrl = (icon) => `https://cdn.simpleicons.org/${icon}`;

  return (
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="skills-header mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Skills</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Technologies and tools I work with
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-200">
            Full-stack engineer with 8+ years building ERP systems and APIs with Laravel, Spring Boot, React and Flutter.
          </p>
          <div className="skills-toggle" role="group" aria-label="Skill visibility">
            <button type="button" className={!coreOnly ? "skills-toggle__active" : ""} onClick={() => setCoreOnly(false)} aria-pressed={!coreOnly}>All</button>
            <button type="button" className={coreOnly ? "skills-toggle__active" : ""} onClick={() => setCoreOnly(true)} aria-pressed={coreOnly}>Core only</button>
          </div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const visibleSkills = group.skills.filter((skill) => !coreOnly || skill.level === "core");
            return (
              <article key={group.category} className={`skills-card ${index === 0 ? "skills-card--featured" : ""}`}>
                <header className="skills-card__header">
                  <span className="skills-card__icon" aria-hidden="true">{group.icon}</span>
                  <div>
                    <h3>{group.category}</h3>
                    <span>{group.skills.length} skills</span>
                  </div>
                </header>
                <ul className="skills-list">
                  {visibleSkills.map((skill) => (
                    <li key={skill.name} className={skill.level === "core" ? "skill-pill skill-pill--core" : "skill-pill"}>
                      {skill.icon ? <img src={iconUrl(skill.icon)} alt="" aria-hidden="true" loading="lazy" /> : <span className="skill-pill__fallback" aria-hidden="true">•</span>}
                      <span>{skill.name}</span>
                      {skill.note && <span className="skill-tooltip" role="tooltip">{skill.name}: {skill.note}</span>}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="skills-exploring">
          <div>
            <span className="skills-exploring__label">Currently exploring</span>
            <p>Expanding my toolkit for resilient, intelligent products.</p>
          </div>
          <ul>
            {["Machine learning", "Blockchain", "Cybersecurity", "DevOps"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const [expandedRoles, setExpandedRoles] = useState({});
  const [expandedOlderRoles, setExpandedOlderRoles] = useState({});

  const items = [
    {
      role: "Software Engineer",
      company: "Ministry of Education Rwanda",
      period: "Sep 2026 – Present",
      location: "Kigali, Rwanda",
      employmentType: "Full-time",
      current: true,
      summary: "Own full-cycle delivery of secure, maintainable education systems from discovery through release and adoption.",
      bullets: [
        "Led requirements discovery, prototyping, and deployment of customized open-source solutions across the full software development lifecycle. // TODO: Add delivery or adoption metric.",
        "Implemented integrations, optimized system performance, and resolved complex defects with clean, testable code. // TODO: Add latency or defect-reduction metric.",
        "Strengthened release quality through version control, code reviews, and rigorous quality assurance testing. // TODO: Add release cadence or quality metric.",
        "Protected data integrity and repository security while coordinating upgrades, proof-of-concepts, and user training. // TODO: Add uptime, adoption, or training metric.",
      ],
      tech: ["Laravel", "Spring Boot", "React", "Docker"],
    },
    {
      role: "Sr Software Engineer",
      company: "Codible Group",
      period: "Jan 2025 – Sep 2026",
      location: "Kigali, Rwanda",
      employmentType: "Full-time",
      summary: "Led the architecture and delivery of a mobile ERP platform spanning backend services, product interfaces, and team coordination.",
      bullets: [
        "Led development of a mobile ERP system using modern web and API architecture. // TODO: Add module count or user metric.",
        "Designed and shipped backend services with Laravel, Spring Boot, and Django. // TODO: Add API or performance metric.",
        "Built React, Next.js, and Flutter interfaces for core ERP modules. // TODO: Add feature count or adoption metric.",
        "Coordinated cross-functional delivery from design through deployment. // TODO: Add team size or delivery metric.",
      ],
      tech: ["Laravel", "Spring Boot", "Django", "Flutter"],
    },
    {
      role: "Sr Software Engineer",
      company: "TechAffinity",
      period: "Jun 2021 – Dec 2024",
      location: "Kigali, Rwanda",
      employmentType: "Full-time",
      summary: "Delivered reliable web and mobile products while improving backend architecture, application performance, and product collaboration.",
      bullets: [
        "Developed robust backend APIs with Laravel, Spring Boot, and Django. // TODO: Add endpoint or throughput metric.",
        "Delivered responsive React, Next.js, and Flutter applications across web and mobile. // TODO: Add app or user metric.",
        "Led debugging and performance improvements to strengthen product reliability. // TODO: Add response-time or incident metric.",
        "Partnered with product and design to ship features on schedule. // TODO: Add delivery or release metric.",
      ],
      tech: ["Laravel", "Spring Boot", "React", "Flutter"],
    },
    {
      role: "Full Stack Engineer",
      company: "Nozaax",
      period: "Nov 2019 – Jun 2021",
      location: "Kigali, Rwanda",
      employmentType: "Full-time",
      older: true,
      summary: "Built end-to-end product foundations across APIs, databases, application architecture, and responsive interfaces.",
      bullets: [
        "Implemented scalable backend APIs using Laravel, Node.js, and Spring Boot. // TODO: Add endpoint or traffic metric.",
        "Designed application architecture and database schemas for MySQL, PostgreSQL, and Oracle. // TODO: Add data volume or query metric.",
        "Built user-friendly React and Flutter interfaces for product workflows. // TODO: Add feature or user metric.",
      ],
      tech: ["Laravel", "Node.js", "React", "Flutter"],
    },
    {
      role: "Backend Developer",
      company: "HviewTech",
      period: "May 2019 – Nov 2019",
      location: "Kigali, Rwanda",
      employmentType: "Full-time",
      older: true,
      summary: "Developed dependable API and data foundations for internal and client-facing applications.",
      bullets: [
        "Created RESTful APIs with Laravel for internal and client-facing applications. // TODO: Add endpoint or consumer metric.",
        "Performed software analysis and relational database design to support maintainable systems. // TODO: Add schema or performance metric.",
        "Collaborated with frontend developers to integrate backend services cleanly and reliably. // TODO: Add delivery or defect metric.",
      ],
      tech: ["Laravel", "MySQL", "REST APIs", "Git"],
    },
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Experience</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Work experience
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-200">
            My professional journey in software development.
          </p>
        </div>

        <ol className="experience-timeline">
          {items.map((item, index) => {
            const isExpanded = expandedRoles[index] || !item.older;
            const isOlderExpanded = expandedOlderRoles[index];
            const visibleBullets = isOlderExpanded || isExpanded ? item.bullets : [];
            return (
              <motion.li
                key={item.company}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                className={`experience-entry ${item.current ? "experience-entry--current" : ""}`}
              >
                <span className="experience-dot" aria-hidden="true" />
                <div className="experience-date">
                  <time dateTime={item.period}>{item.period}</time>
                  {item.current && <span className="experience-current-badge">Current</span>}
                </div>
                <article className="experience-card">
                  <header>
                    <h3>{item.role}</h3>
                    <p className="experience-company">
                      {item.company} <span aria-hidden="true">·</span> {item.location} <span aria-hidden="true">·</span> {item.employmentType}
                    </p>
                    <span className="experience-period-pill">{item.period}</span>
                  </header>
                  <p className="experience-summary">{item.summary}</p>
                  {(isExpanded || isOlderExpanded) && (
                    <ul className="experience-bullets">
                      {visibleBullets.slice(0, isExpanded || isOlderExpanded ? (expandedRoles[index] || isOlderExpanded ? item.bullets.length : 3) : 3).map((bullet) => (
                        <li key={bullet}>{bullet.replace(/ \/\/ TODO:.*$/, "")}</li>
                      ))}
                    </ul>
                  )}
                  {item.bullets.length > 3 && (
                    <button
                      type="button"
                      className="experience-toggle"
                      aria-expanded={expandedRoles[index] || isOlderExpanded || false}
                      onClick={() => {
                        if (item.older && !isOlderExpanded) {
                          setExpandedOlderRoles((previous) => ({ ...previous, [index]: true }));
                        } else {
                          setExpandedRoles((previous) => ({ ...previous, [index]: !previous[index] }));
                        }
                      }}
                    >
                      {item.older && !isOlderExpanded && !expandedRoles[index] ? "Show role details" : expandedRoles[index] ? "Show less" : "Show more"} <span aria-hidden="true">↓</span>
                    </button>
                  )}
                  <div className="experience-tech" aria-label="Technologies used">
                    {item.tech.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>

        <a
          className="experience-download"
          href="/image/CV/KWIZERA_CV.pdf"
          download="KWIZERA_CV.pdf"
        >
          Download CV <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onOpenImage }) {
  const isMobileProject = project.category === "Mobile";
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenImage();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      tabIndex={0}
      onClick={onOpenImage}
      onKeyDown={handleCardKeyDown}
      aria-label={`View ${project.title} case study`}
      className={`project-card group relative flex h-full cursor-pointer flex-col overflow-hidden ${
        index === 0 ? "project-card--featured" : ""
      }`}
    >
      <div className={`project-card__media ${isMobileProject ? "project-card__media--mobile" : ""}`}>
        {project.thumbnail ? (
          isMobileProject ? (
            <div className="project-card__phones">
              <img
                src={project.thumbnail}
                alt={`${project.title} mobile application screens`}
                width="640"
                height="400"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="project-card__browser">
              <div className="project-card__browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <img
                src={project.thumbnail}
                alt={`${project.title} desktop application screenshot`}
                width="1280"
                height="800"
                loading="lazy"
              />
            </div>
          )
        ) : (
          <div className="project-card__fallback" aria-label={`${project.title} project preview`}>
            <span>{initials}</span>
          </div>
        )}
        <div className="project-card__overlay absolute inset-0 flex items-center justify-center">
          <span>View case study <span aria-hidden="true">↗</span></span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="project-card__tag">
            {project.category}
          </p>
          <span className="project-card__year">2026</span>
        </div>
        <h3 className="mb-2 text-lg font-medium tracking-[-0.03em]">
          {project.title}
        </h3>
        <p className="project-card__description mb-4">
          {project.description}
        </p>
        
        <div className="mb-5 flex flex-wrap gap-x-2 gap-y-1">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="project-card__tech text-[0.62rem]">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="project-card__tech text-[0.62rem]">+{project.tech.length - 4}</span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenImage();
            }}
            className="project-card__link inline-flex items-center gap-2 text-sm font-semibold"
          >
            View case study <span aria-hidden="true">→</span>
          </button>

          {project.private ? (
            <div className="project-card__private text-sm" aria-label="Private project">
              <span aria-hidden="true">🔒</span> Private project
            </div>
          ) : (
            project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="project-card__link text-sm font-semibold"
              >
                Live demo ↗
              </a>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectsSection() {
  // Project data array matching the requested schema
  const projects = [
    {
      title: "Goodbye Old Home",
      category: "Web",
      tag: "Real Estate · Web",
      thumbnail: "/image/project/thumb_goodbyeoldhome.jpg",
      fullImage: ["/image/project/screencapture-goodbyeoldhome-2026-01-06-14_23_32.png"],
      description: "A platform for buying and selling investment properties that helps real estate investors connect, list, and close off‑market deals.",
      tech: ["Spring Boot", "MySQL", "Git", "GitLab"],
      private: true,
      liveUrl: "https://goodbyeoldhome.com/"
    },
    {
      title: "SmattERP",
      category: "ERP",
      tag: "ERP · Full-stack",
      thumbnail: "/image/project/thumb_smatterp.jpg",
      fullImage: [
        "/image/project/Dashboard-smatterp.png",
        "/image/project/Front page-smatterp.png",
        "/image/project/Dash-smatterp.jpg",
      ],
      description: "A comprehensive trading and stock management system. Manage inventory, track sales and purchases, and grow your business with powerful analytics.",
      tech: ["Laravel", "Spring Boot", "React", "Docker"],
      private: true,
      liveUrl: "https://smatterp.com/"
    },
    {
      title: "Plant Health Assistant",
      category: "Mobile",
      tag: "AI Tool · Mobile App",
      thumbnail: "/image/project/thumb_plant_health.jpg",
      fullImage: ["/image/project/Plant-Health-Assistant.png"],
      description: "Mobile application that helps detect plant health issues and integrates with Firebase for storage and notifications.",
      tech: ["Flutter", "Firebase", "Postman", "Swagger"],
      private: false,
      liveUrl: "https://github.com/Emmizo/agri_app"
    },
    {
      title: "Driver App",
      category: "Mobile",
      tag: "Logistics · Mobile App",
      thumbnail: null,
      fullImage: [],
      description: "Backend and mobile app used to manage drivers, integrate partner APIs, and provide an intuitive driver experience.",
      tech: ["Spring Boot", "Flutter", "Dart", "Bitbucket"],
      private: true,
      liveUrl: null
    },
    {
      title: "Leave Management",
      category: "Web",
      tag: "HR · Web App",
      thumbnail: "/image/project/thumb_leavemanagement.jpg",
      fullImage: [
        "/image/project/dashboard-leavemanagement.jpeg",
        "/image/project/Leave-apply-leavemanagement.jpeg",
        "/image/project/login-leavemanagement.jpeg",
      ],
      description: "Leave management solution with backend and frontend modules to handle HR leave workflows and approvals.",
      tech: ["Spring Boot", "React", "Docker", "GitHub"],
      private: false,
      liveUrl: "https://github.com/Emmizo/leave-management"
    }
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const [imageViewer, setImageViewer] = useState({ isOpen: false, projectIndex: 0, imageIndex: 0 });
  
  const filters = ["All", "Web", "Mobile", "ERP"];
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleOpenImage = (project) => {
    const actualIndex = projects.findIndex((p) => p.title === project.title);
    setImageViewer({ isOpen: true, projectIndex: actualIndex, imageIndex: 0 });
  };

  const closeImages = () => {
    setImageViewer((prev) => ({ ...prev, isOpen: false }));
  };

  const showNextImage = (e) => {
    if (e) e.stopPropagation();
    setImageViewer((prev) => {
      const proj = projects[prev.projectIndex];
      if (!proj || !proj.fullImage || proj.fullImage.length <= 1) return prev;
      return { ...prev, imageIndex: (prev.imageIndex + 1) % proj.fullImage.length };
    });
  };

  const showPrevImage = (e) => {
    if (e) e.stopPropagation();
    setImageViewer((prev) => {
      const proj = projects[prev.projectIndex];
      if (!proj || !proj.fullImage || proj.fullImage.length <= 1) return prev;
      return { ...prev, imageIndex: (prev.imageIndex - 1 + proj.fullImage.length) % proj.fullImage.length };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!imageViewer.isOpen) return;
      if (e.key === "Escape") closeImages();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    };

    if (imageViewer.isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageViewer.isOpen]);

  const activeProject = projects[imageViewer.projectIndex];

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto">
        <div className="projects-header mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="section-kicker mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em]">
              Selected work
            </p>
            <h2 className="text-4xl sm:text-5xl">Selected projects</h2>
            <p className="project-intro mt-4 max-w-md text-sm leading-relaxed">
              A selection of digital products, platforms, and tools built to solve real problems.
            </p>
          </div>
          
          <div className="projects-filters flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter 
                    ? "projects-filter--active"
                    : "projects-filter"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpenImage={() => handleOpenImage(project)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {imageViewer.isOpen && activeProject && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1224]/95 backdrop-blur-md p-4 sm:p-8"
          onClick={closeImages}
        >
          {/* Close button */}
          <button
            onClick={closeImages}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-[#111A2F] text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500 transition-colors shadow-xl"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev/Next Navigation Overlay */}
          {activeProject.fullImage?.length > 1 && (
            <>
              <button
                onClick={showPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-[#111A2F] text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500 transition-colors shadow-xl"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={showNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-[#111A2F] text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500 transition-colors shadow-xl"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div 
            className="relative flex h-full w-full max-w-[1100px] flex-col rounded-2xl bg-[#111A2F] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable Image Area */}
            <div className="flex-1 overflow-y-auto bg-[#0B1224]">
              {activeProject.fullImage?.length > 0 ? (
                <img 
                  src={activeProject.fullImage[imageViewer.imageIndex]}
                  alt="Full screenshot"
                  className="w-full h-auto block mx-auto"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-500">
                  No image available
                </div>
              )}
            </div>
            
            {/* Optional multiple image indicator */}
            {activeProject.fullImage?.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#111A2F]/90 backdrop-blur-md px-4 py-2 text-sm font-medium text-slate-300 border border-white/10 shadow-lg z-50">
                {imageViewer.imageIndex + 1} of {activeProject.fullImage.length}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

function ConsultancySection() {
  const items = [
    {
      title: "Curriculum Development · Rwanda TVET Trainer Institute (RTTI)",
      description:
        "Contributed to curriculum development, shaping educational standards for tech professionals in Rwanda.",
    },
    {
      title: "Flutter Training Program · 2023",
      description:
        "Conducted a 15-day Flutter mobile application development training covering fundamentals, UI, and hands-on projects; mentored students through practical exercises to ship functional apps.",
    },
  ];

  return (
    <section id="consultancy" className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Consultancy</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Consultancy
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
            Curriculum development and training programs.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="glass-panel rounded-2xl p-5 shadow-soft-card"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-700 dark:text-slate-200">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const prefersReducedMotion = useReducedMotion();
  const education = [
    {
      institution: "INES-Ruhengeri",
      badge: "INES",
      degree: "Master of Science in Software Engineering",
      location: "Ruhengeri, Rwanda",
      startYear: 2024,
      endYear: null,
      status: "In progress",
      level: "Master's",
      summary: "Advanced study focused on building scalable software systems and applying research to real-world product decisions.",
      highlights: [
        "Applied software architecture and scalability principles to advanced engineering work. // TODO: Add a specific system or project.",
        "Researching an AI-powered restaurant recommendation system with real-time location detection.",
      ],
      courses: ["Software Architecture", "Scalable Systems", "Machine Learning"],
      research: "An AI-Powered Restaurant Recommendation System Incorporating Real-Time Location Detection",
    },
    {
      institution: "University of Kigali",
      badge: "UoK",
      degree: "Bachelor of Science in Information Technology",
      location: "Kigali, Rwanda",
      startYear: 2019,
      endYear: 2023,
      status: "Completed",
      level: "Bachelor's",
      summary: "Built a broad foundation across software engineering, information systems, and database-backed application development.",
      highlights: [
        "Built a foundation in software engineering, systems analysis, and database design.",
        "Collaborated on academic projects spanning web and mobile application stacks. // TODO: Add the strongest capstone or project name.",
      ],
      courses: ["Database Design", "Web Development", "Systems Analysis"],
    },
    {
      institution: "RP Tumba",
      badge: "RP",
      degree: "Information Communication and Technology",
      location: "Tumba, Rwanda",
      startYear: 2015,
      endYear: 2018,
      status: "Completed",
      level: "Diploma",
      summary: "Developed practical ICT foundations through applied systems, software, and technical problem-solving work.",
      highlights: [
        "Developed foundational ICT skills through applied technical practice.",
        "Built early experience with systems and software development workflows. // TODO: Add a specific project or qualification detail.",
      ],
      courses: ["Programming Fundamentals", "Computer Systems", "Networking"],
    },
  ];

  return (
    <section id="education" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Education</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Education &amp; progression
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-200">
            A practical path from applied ICT foundations to advanced software engineering research.
          </p>
        </div>

        <div className="education-path">
          {education.map((item, index) => {
            const isFeatured = index === 0;
            const period = `${item.startYear} – ${item.endYear || "Present"}`;
            return (
              <motion.article
                key={item.institution}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`education-card ${isFeatured ? "education-card--featured" : ""}`}
              >
                <span className="education-connector" aria-hidden="true" />
                <div className="education-card__top">
                  <div className="education-institution">
                    <span className="education-badge" aria-hidden="true">{item.badge}</span>
                    <div>
                      <h3>{item.degree}</h3>
                      <p>{item.institution}</p>
                    </div>
                  </div>
                  <span className="education-level">{item.level}</span>
                </div>
                <div className="education-meta">
                  <span>{item.location}</span>
                  <time dateTime={`${item.startYear}-${item.endYear || "present"}`}>{period}</time>
                  <span className={item.status === "In progress" ? "education-status education-status--active" : "education-status"}>
                    {item.status}
                  </span>
                </div>
                <p className="education-summary">{item.summary}</p>
                {isFeatured && (
                  <div className="education-research">
                    <span>Research</span>
                    <p>{item.research}</p>
                  </div>
                )}
                <ul className="education-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight.replace(/ \/\/ TODO:.*$/, "")}</li>
                  ))}
                </ul>
                {item.courses.length > 0 && (
                  <div className="education-courses">
                    <span>Key courses</span>
                    <div>
                      {item.courses.map((course) => <span key={course}>{course}</span>)}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
  const certificates = [
    {
      title: "Windows Server Management and Security",
      issuer: "Coursera",
      year: 2024,
      category: "Security",
      url: "https://www.coursera.org/account/accomplishments/verify/B3EJ6EZQKTEA",
    },
    {
      title: "Introduction to Front-end Development with ReactJS",
      issuer: "Coursera",
      year: 2024,
      category: "Web",
      url: "https://www.coursera.org/account/accomplishments/verify/ZP2PYHTM9BZ6",
    },
    {
      title: "RESTful API with HTTP and JavaScript",
      issuer: "Coursera",
      year: 2024,
      category: "Web",
      url: "https://www.coursera.org/account/accomplishments/verify/6DLSFQRZDZTJ",
    },
    {
      title: "Advanced Relational Database and SQL",
      issuer: "Coursera",
      year: 2024,
      category: "Databases",
      url: "https://www.coursera.org/account/accomplishments/verify/88ZWSUM7ZAKS",
    },
    {
      title: "Front-End Web UI Frameworks and Tools: Bootstrap 4",
      issuer: "Coursera",
      year: 2024,
      category: "Web",
      url: "https://www.coursera.org/account/accomplishments/verify/F2W3ZU8RRETE",
    },
    {
      title: "Intel® Network Academy - Network Transformation 102",
      issuer: "Intel",
      year: 2023,
      category: "Networking",
      url: "https://www.coursera.org/account/accomplishments/verify/AVN5PSX4NHUP",
    },
    {
      title: "Build CRUD REST API in Django",
      issuer: "Coursera",
      year: 2023,
      category: "Web",
      url: "https://www.coursera.org/account/accomplishments/verify/QL2CZP4QJR9G",
    },
    {
      title: "Linux Server Management and Security",
      issuer: "Coursera",
      year: 2023,
      category: "Security",
      url: "https://www.coursera.org/account/accomplishments/verify/HWPQG7XV3PJD",
    },
    {
      title: "Technical Support Fundamentals",
      issuer: "Coursera",
      year: 2023,
      category: "Networking",
      url: "https://www.coursera.org/account/accomplishments/verify/8FB5DLSKE3ED",
    },
    {
      title: "Programming for Everybody (Getting Started with Python)",
      issuer: "Coursera",
      year: 2023,
      category: "Web",
      url: "https://www.coursera.org/account/accomplishments/verify/AZMGNQVH6UK7",
    },
    {
      title: "Rwanda Blockchain Bootcamp",
      issuer: "Digital Transformation Centre, Kigali",
      year: 2023,
      category: "Blockchain",
      description: "For taking part in the Rwanda blockchain bootcamp held on the 27th & 28th of November 2023",
      url: "/image/certificates/Blockchain .pdf",
      featured: true,
    },
    {
      title: "Curriculum Development Contribution",
      issuer: "Rwanda TVET Trainer Institute (RTTI)",
      year: 2023,
      category: "Web",
      description: "In recognition of valuable contribution to the curriculum development",
      url: "/image/certificates/Certificate-RTTI.pdf",
      featured: true,
    },
    {
      title: "ICP Blockchain Mega Hackathon",
      issuer: "Internet Computer",
      year: 2023,
      category: "Blockchain",
      description: "For participation at the MEGA HACKATHON BY INTERNET COMPUTER",
      url: "/image/certificates/ICP-blockchain.pdf",
      featured: true,
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const categories = ["All", "Web", "Security", "Databases", "Blockchain", "Networking"];
  const featured = certificates.filter((certificate) => certificate.featured);
  const compact = certificates
    .filter((certificate) => !certificate.featured)
    .filter((certificate) => activeCategory === "All" || certificate.category === activeCategory)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  const visibleCompact = showAll ? compact : compact.slice(0, 6);

  const issuerInitials = (issuer) =>
    issuer.split(/[\s-]+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();

  const CertificateLink = ({ certificate, featuredCard = false }) => (
    <a
      href={certificate.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`certificate-card ${featuredCard ? "certificate-card--featured" : ""}`}
      aria-label={`View credential: ${certificate.title}`}
    >
      <div className="certificate-badge" aria-hidden="true">
        {featuredCard ? "✦" : issuerInitials(certificate.issuer)}
      </div>
      <div className="certificate-card__body">
        <div className="certificate-card__meta">
          <span>{certificate.category}</span>
          <time dateTime={String(certificate.year)}>{certificate.year}</time>
        </div>
        <h3>{certificate.title}</h3>
        <p>{certificate.issuer}</p>
        {featuredCard && <p className="certificate-card__description">{certificate.description}</p>}
        <span className="certificate-card__link">
          {featuredCard ? "View PDF" : "View credential"} <span aria-hidden="true">↗</span>
        </span>
      </div>
      <span className="certificate-card__external" aria-hidden="true">↗</span>
    </a>
  );

  return (
    <section id="certificates" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Certificates</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Certificates
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
            Professional certifications and online courses completed.
          </p>
        </div>

        <div className="certificates-featured">
          <div className="certificates-subhead">
            <h3>Featured</h3>
            <span>Selected achievements</span>
          </div>
          <div className="certificates-featured__grid">
            {featured.map((certificate) => (
              <CertificateLink key={certificate.title} certificate={certificate} featuredCard />
            ))}
          </div>
        </div>

        <div className="certificates-courses">
          <div className="certificates-subhead certificates-subhead--courses">
            <h3>Courses &amp; certifications</h3>
            <div className="certificate-filters" role="group" aria-label="Filter certificates by category">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={activeCategory === category ? "certificate-filter certificate-filter--active" : "certificate-filter"}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAll(false);
                  }}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="certificates-compact__grid">
            {visibleCompact.map((certificate) => (
              <CertificateLink key={certificate.title} certificate={certificate} />
            ))}
          </div>
          {compact.length > 6 && (
            <button type="button" className="certificates-show-all" onClick={() => setShowAll((value) => !value)}>
              {showAll ? "Show fewer" : `Show all (${compact.length})`} <span aria-hidden="true">↓</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSendStatus("ok");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (err) {
      console.error(err);
      setSendStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-4">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Contact</p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              Get in touch
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-200">
              Feel free to reach out if you&apos;d like to work together or have any questions.
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <ContactRow
                label="Email"
                value="emmizokwizera@gmail.com"
                href="mailto:emmizokwizera@gmail.com"
              />
              <ContactRow
                label="Phone"
                value="+250 7811 67 275"
                href="tel:+250781167275"
              />
              <ContactRow
                label="LinkedIn"
                value="/in/e-kwizera/"
                href="https://www.linkedin.com/in/e-kwizera/"
              />
              <ContactRow
                label="GitHub"
                value="@emmizo"
                href="https://github.com/emmizo"
              />
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Quick message
            </p>
            <form className="mt-4 space-y-3" onSubmit={handleContactSubmit}>
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  Project or message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="A short description of what you’d like to work on."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-soft-card transition hover:-translate-y-0.5 hover:bg-[#123744] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? "Sending..." : "Send message"}
              </button>
              {sendStatus === "ok" && (
                <p className="text-[0.7rem] text-emerald-500">
                  Message sent successfully. I&apos;ll get back to you soon.
                </p>
              )}
              {sendStatus === "error" && (
                <p className="text-[0.7rem] text-rose-500">
                  Something went wrong while sending. You can also email me at
                  emmizokwizera@gmail.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="w-20 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-slate-800 underline-offset-4 transition hover:text-primary hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="text-slate-800">{value}</span>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-[0.7rem] text-slate-500 dark:text-slate-400 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} Kwizera Emmanuel. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://www.linkedin.com/in/e-kwizera/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 underline-offset-4 transition hover:text-primary hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/emmizo"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 underline-offset-4 transition hover:text-primary hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
