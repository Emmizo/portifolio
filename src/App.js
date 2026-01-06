import "./App.css";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const sectionTitleClasses =
  "text-sm font-semibold tracking-[0.16em] uppercase text-primary/80 mb-3";

// Note: scroll-based variants previously used across sections have been removed
// to keep content always visible; motion is now focused on hero/avatar only.

function App() {
  const [theme, setTheme] = useState("light");
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <SiteChrome theme={theme} navSolid={navSolid} onToggleTheme={toggleTheme} />
      <main>
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
    </div>
  );
}

function SiteChrome({ theme, navSolid, onToggleTheme }) {
  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 ${
        navSolid
          ? "bg-white/95 backdrop-blur-md shadow-md dark:bg-slate-900/95"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-xl border border-primary/10 bg-[conic-gradient(at_top_left,_#164655,_#0f172a,_#164655)] shadow-soft-card"
            aria-hidden="true"
          />
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
            className="inline-flex items-center rounded-full border border-primary/10 bg-primary px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white shadow-soft-card transition hover:-translate-y-0.5 hover:bg-[#123744] hover:shadow-lg"
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

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="section-padding bg-white dark:bg-slate-900"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-7">
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
            className="text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-[3.1rem]"
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

        <div className="flex-1">
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
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Sr Software Engineer · Smatt Account
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-200">
                Leading ERP development across web, mobile, and desktop platforms, API design, cross-functional
                delivery, and deployment.
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
    <div className="flex flex-col gap-0.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <span className="text-xs text-slate-700">{value}</span>
    </div>
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Highlights
            </p>
            <ul className="mt-3 space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
              <li>
                • Led ERP system development and delivery for cross-functional
                teams.
              </li>
              <li>
                • Designed and implemented scalable backend APIs across Laravel,
                Spring Boot, and Django.
              </li>
              <li>
                • Built production React/Next.js and Flutter interfaces for
                responsive web and mobile apps.
              </li>
              <li>
                • Conducted training and mentorship, including a 15-day Flutter
                program at Rwanda TVET Trainer Institute.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              Currently exploring
            </p>
            <p className="mt-1">
              Machine learning, blockchain, cybersecurity, and modern DevOps
              practices—and always looking for ways to make complex systems
              simpler and more intuitive for end users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const groups = [
    {
      title: "Backend & APIs",
      items: [
        "Laravel",
        "Spring Boot",
        "Django",
        "Node.js",
        "USSD",
        "REST APIs",
        "AI Integration (OpenAI)",
      ],
    },
    {
      title: "Frontend & Mobile",
      items: [
        "React",
        "Next.js",
        "Flutter",
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
      ],
    },
    {
      title: "Languages & Patterns",
      items: ["Java", "PHP", "Python", "System analysis", "Agile methodology"],
    },
    {
      title: "Data & Infrastructure",
      items: [
        "MySQL",
        "PostgreSQL",
        "SQL Server",
        "Oracle DB",
        "Docker",
        "Digital Ocean",
        "Firebase",
        "Kafka",
        "Windows Server / Linux",
        "Virtualization",
        "IIS",
        "Server management",
      ],
    },
    {
      title: "Tools & Version Control",
      items: ["Git version control", "GitHub", "GitLab", "Bitbucket"],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Skills</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Technologies and tools I work with
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
            I work with various technologies across backend, frontend, and mobile development.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="glass-panel group rounded-xl p-4 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-[0.7rem] font-medium text-slate-700 transition group-hover:bg-primary/10 group-hover:text-primary dark:bg-slate-800 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const items = [
    {
      role: "Sr Software Engineer",
      company: "Smatt Account",
      period: "Jan 2025 – Present",
      location: "Kigali, Rwanda",
      bullets: [
        "Leading development of a mobile ERP system with modern web and API architecture.",
        "Designed and implemented backend services with Laravel, Spring Boot, and Django.",
        "Built modern React/Next.js and Flutter interfaces for ERP modules.",
        "Coordinating cross-functional teams to deliver features from design to deployment.",
      ],
    },
    {
      role: "Sr Software Engineer",
      company: "TechAffinity",
      period: "Jun 2021 – Dec 2024",
      location: "Kigali, Rwanda",
      bullets: [
        "Developed robust backend APIs using Laravel, Spring Boot, and Django.",
        "Delivered responsive React, Next.js, and Flutter applications.",
        "Led debugging and performance improvements to ensure reliability.",
        "Collaborated closely with product and design to ship features on time.",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Nozaax",
      period: "Nov 2019 – Jun 2021",
      location: "Kigali, Rwanda",
      bullets: [
        "Implemented scalable backend APIs using Laravel, Node.js, and Spring Boot.",
        "Designed application architecture and database schemas for MySQL, PostgreSQL, and Oracle.",
        "Built user-friendly React and Flutter interfaces.",
      ],
    },
    {
      role: "Backend Developer",
      company: "HviewTech",
      period: "May 2019 – Nov 2019",
      location: "Kigali, Rwanda",
      bullets: [
        "Created RESTful APIs using Laravel for internal and client-facing applications.",
        "Performed software analysis and relational database design.",
        "Collaborated with frontend developers to integrate backend services cleanly and reliably.",
      ],
    },
  ];

  return (
    <section id="experience" className="section-padding bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Experience</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Work experience
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
            My professional journey in software development.
          </p>
        </div>

        <div className="relative border-l border-slate-200 pl-6 sm:pl-8">
          <div className="absolute left-[-1px] top-0 h-full w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent" />
          <div className="space-y-8">
            {items.map((item, index) => (
              <motion.article
                key={item.company}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -24 : 24,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.1 + index * 0.06,
                }}
                className="relative pl-4"
              >
                <div className="absolute left-[-9px] top-2 h-3 w-3 rounded-full border-2 border-white bg-primary shadow-soft-card" />
                <div className="glass-panel rounded-2xl p-5">
                  <header className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {item.role}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-200">
                        {item.company}
                      </p>
                    </div>
                    <div className="text-right text-[0.7rem] text-slate-500">
                      <p>{item.period}</p>
                      <p>{item.location}</p>
                    </div>
                  </header>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      name: "Goodbye Old Home",
      description:
        "A platform for buying and selling investment properties that helps real estate investors connect, list, and close off‑market deals.",
      details: [
        "Designed and implemented the backend using Spring Boot and MySQL.",
        "Built secure APIs for listing management and investor interactions.",
        "Used Git and GitLab for version control and collaborative workflows.",
      ],
      tech: ["Spring Boot", "MySQL", "Git", "GitLab", "Postman"],
      role: "Backend development · System design",
      website: "https://goodbyeoldhome.com/",
      repo: null,
      images: ["/image/project/screencapture-goodbyeoldhome-2026-01-06-14_23_32.png"],
    },
    {
      name: "SmattERP",
      description:
        "A comprehensive trading and stock management system. Manage inventory, track sales and purchases, and grow your business with powerful analytics.",
      details: [
        "Designed and developed end‑to‑end ERP modules for sales, purchases, inventory, and accounting.",
        "Built secure backend services and rich web dashboards for real‑time business insights.",
        "Implemented CI/CD and containerized deployments using Docker for reliable releases.",
      ],
      tech: ["Laravel", "Spring Boot", "React", "MySQL", "Docker"],
      role: "Full‑stack ERP & inventory management",
      website: "https://smatterp.com/",
      repo: null,
      images: [
        "/image/project/Dashboard-smatterp.png",
        "/image/project/Front page-smatterp.png",
        "/image/project/Dash-smatterp.jpg",
      ],
    },
    {
      name: "Plant Health Assistant",
      description:
        "Mobile application that helps detect plant health issues and integrates with Firebase for storage and notifications.",
      details: [
        "Developed core Flutter application for capturing and assessing plant health.",
        "Integrated backend APIs and Firebase for data storage and real-time updates.",
        "Documented and tested APIs using Postman and Swagger.",
        "Repository available on request.",
      ],
      tech: ["Flutter", "Firebase", "Postman", "Swagger"],
      role: "Flutter mobile · API integration",
      website: null,
      repo: "https://github.com/Emmizo/agri_app",
      images: ["/image/project/Plant-Health-Assistant.png"],
    },
    {
      name: "Driver App",
      description:
        "Backend and mobile app used to manage drivers, integrate partner APIs, and provide an intuitive driver experience.",
      details: [
        "Implemented backend logic and REST APIs with Spring Boot.",
        "Built Flutter mobile UI using widgets tailored for driver workflows.",
        "Used Postman, Git, Bitbucket, and MagicCode for testing and collaboration.",
      ],
      tech: ["Spring Boot", "Flutter", "Dart", "Postman", "Git", "Bitbucket", "MagicCode"],
      role: "Backend APIs · Mobile UI implementation",
      website: null,
      repo: null,
      images: [],
    },
    {
      name: "Leave Management",
      description:
        "Leave management solution with backend and frontend modules to handle HR leave workflows and approvals.",
      details: [
        "Developed backend services for leave requests, approvals, and reporting using Spring Boot.",
        "Implemented React.js frontend screens for employees and HR teams.",
        "Used Git, GitHub, and Docker to manage versions and containerised deployments.",
        "Repos available (React frontend and Java backend).",
      ],
      tech: ["Spring Boot", "React", "Docker", "Git", "GitHub"],
      role: "Full‑stack development",
      website: null,
      repo: "https://github.com/Emmizo/leave-management",
      images: [
        "/image/project/dashboard-leavemanagement.jpeg",
        "/image/project/Leave-apply-leavemanagement.jpeg",
        "/image/project/login-leavemanagement.jpeg",
      ],
    },
  ];

  const [imageViewer, setImageViewer] = useState({
    isOpen: false,
    projectIndex: 0,
    imageIndex: 0,
  });

  const openImages = (projectIndex, imageIndex = 0) => {
    setImageViewer({ isOpen: true, projectIndex, imageIndex });
  };

  const closeImages = () => {
    setImageViewer((prev) => ({ ...prev, isOpen: false }));
  };

  const showNextImage = () => {
    setImageViewer((prev) => {
      const project = projects[prev.projectIndex];
      const total = project.images?.length || 0;
      if (total === 0) return prev;
      return {
        ...prev,
        imageIndex: (prev.imageIndex + 1) % total,
      };
    });
  };

  const showPrevImage = () => {
    setImageViewer((prev) => {
      const project = projects[prev.projectIndex];
      const total = project.images?.length || 0;
      if (total === 0) return prev;
      return {
        ...prev,
        imageIndex: (prev.imageIndex - 1 + total) % total,
      };
    });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && imageViewer.isOpen) {
        closeImages();
      }
    };
    
    // Lock body scroll when modal is open
    if (imageViewer.isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [imageViewer.isOpen]);

  return (
    <section id="projects" className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Projects</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Projects
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">
            Some of the projects I&apos;ve worked on.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group glass-panel flex flex-col rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-200">
                      {project.description}
                    </p>
                  </div>
                </header>

                {project.details && (
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                    {project.details.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-2.5 py-1 text-[0.7rem] text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {(project.website || project.repo || (project.images && project.images.length > 0)) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      >
                        Visit site
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      >
                        GitHub repo
                      </a>
                    )}
                    {project.images && project.images.length > 0 && (
                      <button
                        type="button"
                        onClick={() => openImages(index)}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      >
                        View images
                      </button>
                    )}
                  </div>
                )}

                <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                  Role: {project.role}
                </p>
            </article>
          ))}
        </div>
      </div>

      {imageViewer.isOpen && projects[imageViewer.projectIndex] && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4"
          onClick={closeImages}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative mx-auto flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900"
            style={{ height: '500px', border: '4px solid #164655' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  {projects[imageViewer.projectIndex].name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                  Image {imageViewer.imageIndex + 1} of{" "}
                  {projects[imageViewer.projectIndex].images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={closeImages}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50"
                aria-label="Close image viewer"
              >
                ×
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
              <div className="relative flex h-full min-h-0 items-start justify-center overflow-auto rounded-xl bg-slate-50 p-4 dark:bg-slate-950" >
                <img
                  src={projects[imageViewer.projectIndex].images[imageViewer.imageIndex]}
                  alt={`${projects[imageViewer.projectIndex].name} ${imageViewer.imageIndex + 1}`}
                  className="h-auto w-full object-contain"
                />
                {projects[imageViewer.projectIndex].images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showPrevImage();
                      }}
                      className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-primary text-2xl font-bold text-primary shadow-xl backdrop-blur transition-all hover:bg-primary hover:text-white hover:scale-110 dark:bg-slate-800 dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showNextImage();
                      }}
                      className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-primary text-2xl font-bold text-primary shadow-xl backdrop-blur transition-all hover:bg-primary hover:text-white hover:scale-110 dark:bg-slate-800 dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {projects[imageViewer.projectIndex].images.length > 1 && (
                <div className="flex shrink-0 gap-2 overflow-x-auto pb-2">
                  {projects[imageViewer.projectIndex].images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageViewer((prev) => ({ ...prev, imageIndex: idx }));
                      }}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition hover:opacity-80 ${
                        idx === imageViewer.imageIndex
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                      style={idx === imageViewer.imageIndex ? { borderColor: '#164655' } : {}}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                      {idx === imageViewer.imageIndex && (
                        <div className="absolute inset-0 bg-primary/10" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
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
  const items = [
    {
      school: "RP Tumba",
      program: "Information Communication and Technology",
      period: "2015 – 2018",
      details: [
        "Foundations in ICT, systems, and applied technical practice.",
      ],
    },
    {
      school: "University of Kigali",
      program: "Bachelor of Science in Information Technology",
      period: "2019 – 2023",
      details: [
        "Core foundations in software engineering, systems, and database design.",
        "Collaborated on academic projects spanning web and mobile stacks.",
      ],
    },
    {
      school: "INES-Ruhengeri",
      program: "Master of Science in Software Engineering",
      period: "2024 – Ongoing",
      details: [
        "Advanced software architecture, scalability, and engineering management.",
        "Research focus on An AI-Powered Restaurant Recommendation System Incorporating Real-Time Location Detection",
      ],
    },
  ];

  return (
    <section id="education" className="section-padding bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className={`${sectionTitleClasses} dark:text-slate-200`}>Education</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Education
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.school}
              className="glass-panel rounded-2xl p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {item.school}
              </h3>
              <p className="mt-1 text-xs text-slate-700 dark:text-slate-200">
                {item.program}
              </p>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-300">
                {item.period}
              </p>
              {item.details && (
                <ul className="mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-200">
                  {item.details.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
  const [certificateViewer, setCertificateViewer] = useState({
    isOpen: false,
    certificate: null,
  });

  const openCertificate = (cert) => {
    setCertificateViewer({ isOpen: true, certificate: cert });
    document.body.style.overflow = "hidden";
  };

  const closeCertificate = () => {
    setCertificateViewer({ isOpen: false, certificate: null });
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && certificateViewer.isOpen) {
        closeCertificate();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [certificateViewer.isOpen]);

  const certificates = [
    {
      name: "Windows Server Management and Security",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/B3EJ6EZQKTEA",
    },
    {
      name: "Introduction to Front-end Development with ReactJS",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/ZP2PYHTM9BZ6",
    },
    {
      name: "RESTful API with HTTP and JavaScript",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/6DLSFQRZDZTJ",
    },
    {
      name: "Advanced Relational Database and SQL",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/88ZWSUM7ZAKS",
    },
    {
      name: "Front-End Web UI Frameworks and Tools: Bootstrap 4",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/F2W3ZU8RRETE",
    },
    {
      name: "Intel® Network Academy - Network Transformation 102",
      issuer: "Intel",
      url: "https://www.coursera.org/account/accomplishments/verify/AVN5PSX4NHUP",
    },
    {
      name: "Build CRUD REST API in Django",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/QL2CZP4QJR9G",
    },
    {
      name: "Linux Server Management and Security",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/HWPQG7XV3PJD",
    },
    {
      name: "Technical Support Fundamentals",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/8FB5DLSKE3ED",
    },
    {
      name: "Programming for Everybody (Getting Started with Python)",
      issuer: "Coursera",
      url: "https://www.coursera.org/account/accomplishments/verify/AZMGNQVH6UK7",
    },
    {
      name: "Rwanda Blockchain Bootcamp",
      issuer: "Digital Transformation Centre, Kigali",
      description: "For taking part in the Rwanda blockchain bootcamp held on the 27th & 28th of November 2023",
      url: "/image/certificates/Blockchain .pdf",
      isPdf: true,
    },
    {
      name: "Curriculum Development Contribution",
      issuer: "Rwanda TVET Trainer Institute (RTTI)",
      description: "In recognition of valuable contribution to the curriculum development",
      url: "/image/certificates/Certificate-RTTI.pdf",
      isPdf: true,
    },
    {
      name: "ICP Blockchain Mega Hackathon",
      issuer: "Internet Computer",
      description: "For participation at the MEGA HACKATHON BY INTERNET COMPUTER",
      url: "/image/certificates/ICP-blockchain.pdf",
      isPdf: true,
    },
  ];

  return (
    <section id="certificates" className="section-padding bg-slate-50 dark:bg-slate-900">
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <article
              key={cert.name}
              className="glass-panel group rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {cert.name}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                {cert.issuer}
              </p>
              {cert.description && (
                <p className="mt-2 text-xs text-slate-700 dark:text-slate-200">
                  {cert.description}
                </p>
              )}
              {cert.isPdf ? (
                <button
                  type="button"
                  onClick={() => openCertificate(cert)}
                  className="mt-3 inline-flex items-center text-xs font-medium text-primary hover:underline dark:text-primary"
                >
                  View PDF →
                </button>
              ) : (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center text-xs font-medium text-primary hover:underline dark:text-primary"
                >
                  View certificate →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>

      {certificateViewer.isOpen && certificateViewer.certificate && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4"
          onClick={closeCertificate}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative mx-auto flex h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900"
            style={{ border: '4px solid #164655' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  {certificateViewer.certificate.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                  {certificateViewer.certificate.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCertificate}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50"
                aria-label="Close certificate viewer"
              >
                ×
              </button>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border-4 bg-slate-50 dark:bg-slate-950" style={{ borderColor: '#164655' }}>
              <iframe
                src={certificateViewer.certificate.url}
                className="h-full w-full"
                title={certificateViewer.certificate.name}
                style={{ minHeight: '600px' }}
              />
            </div>
          </motion.div>
        </div>,
        document.body
      )}
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
