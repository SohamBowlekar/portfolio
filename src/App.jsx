import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Server,
  Sparkles,
  Sun,
  TerminalSquare,
  X
} from "lucide-react";

const profile = {
  name: "Soham Bowlekar",
  title: "IT Student | Beginner Android Developer",
  email: "sohambow@gmail.com",
  phone: "+91 94209 73095",
  location: "Math, Bowlekarwadi, Vengurla",
  github: "https://github.com/SohamBowlekar",
  linkedin: "https://www.linkedin.com/in/soham-bowlekar-b084a43a5/",
  resume: "/soham_b_resume_c.pdf"
};

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact"
];

const skillGroups = [
  { title: "Programming", icon: Code2, skills: ["Java", "Python", "JavaScript", "C", "C++", "Kotlin"] },
  { title: "Web & App", icon: Server, skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Node.js", "Android"] },
  { title: "Databases", icon: Database, skills: ["MySQL", "MongoDB", "Firebase Realtime Database", "Firestore"] },
  { title: "Tools & Concepts", icon: TerminalSquare, skills: ["GitHub", "VS Code", "Android Studio", "Power BI", "Excel", "DSA"] }
];

const projects = [
  {
    title: "Mohan Logistics Express Cargo",
    image: "/project-logistics.svg",
    description: "A transport load management and live tracking system with role-based access, shipment workflows, Firebase data storage, and map-based tracking.",
    tech: ["React", "Vite", "Tailwind CSS", "Firebase", "Firestore", "Google Maps API"],
    github: "",
    demo: "https://transport-management-omega.vercel.app/"
  },
  {
    title: "Soft Drink Management System",
    image: "/project-sdms.svg",
    description: "An Android application for managing distributors, product inventories, order records, secure login, and Firebase CRUD operations.",
    tech: ["Kotlin", "Firebase Realtime Database", "Firebase Auth", "RecyclerView"],
    github: "",
    demo: ""
  },
  {
    title: "Smart Turf Booking and Management System",
    image: "/project-turf.svg",
    description: "A web platform for online turf booking with slot availability checks, booking cost calculation, admin management, and MongoDB-backed records.",
    tech: ["HTML", "CSS", "PHP", "MongoDB", "VS Code"],
    github: "",
    demo: ""
  }
];

const experiencePoints = [
  "Completed a 6-month data engineering internship focused on data cleaning and file format conversion.",
  "Worked on data updates, transformation, reporting, and automation using Excel and JavaScript.",
  "Used MySQL and NoSQL concepts for data storage, querying, partitioning, validation, and consistency checks.",
  "Contributed to query optimization and performance tuning to improve database efficiency."
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const doneTyping = !deleting && text === current;
    const doneDeleting = deleting && text === "";
    const delay = doneTyping ? 1300 : deleting ? 45 : 85;

    const timeout = window.setTimeout(() => {
      if (doneTyping) {
        setDeleting(true);
        return;
      }
      if (doneDeleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, text, wordIndex, words]);

  return text;
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-6 lg:px-8"
      >
        {title && (
          <motion.div variants={fadeUp} className="max-w-3xl">
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
}

function Navbar({ activeSection, theme, onThemeToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="#home" className="flex items-center gap-2 font-bold text-slate-950 dark:text-white" aria-label="Go to home">
          <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/25">
            <Code2 size={19} />
          </span>
          <span>Soham.dev</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            return (
              <a key={item} href={`#${id}`} className={`nav-link ${activeSection === id ? "active" : ""}`}>
                {item}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-button" type="button" onClick={onThemeToggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-slate-200 bg-white px-5 py-3 dark:border-white/10 dark:bg-slate-950 lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const typed = useTyping(["React Developer", "Beginner Android Developer", "Data Engineering Intern", "Firebase Builder"]);

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-16">
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center px-5 py-20 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-7">
          <motion.p variants={fadeUp} className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200">
            <Sparkles size={16} />
            Open to software development, Android, and data-focused roles
          </motion.p>
          <motion.div variants={fadeUp} className="grid gap-4">
            <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-6xl dark:text-white">
              {profile.name}
            </h1>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{profile.title}</p>
            <p className="min-h-8 text-xl font-semibold text-slate-700 dark:text-slate-200">
              I build as a <span className="text-blue-600 dark:text-blue-300">{typed}</span><span className="typing-cursor">|</span>
            </p>
          </motion.div>
          <motion.p variants={fadeUp} className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            B.Sc. Information Technology student with hands-on experience in web and Android application development, Firebase-backed systems, database management, and data engineering workflows.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
            <a className="primary-button" href={profile.resume} download>
              <Download size={18} />
              Download Resume
            </a>
            {profile.github && (
              <a className="secondary-button" href={profile.github} target="_blank" rel="noreferrer">
                <Github size={18} />
                GitHub
              </a>
            )}
            <a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="An IT student building web, Android, and data-driven applications.">
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["Professional Summary", "B.Sc. IT student skilled in React.js, Firebase, Java, Python, MySQL, MongoDB, JavaScript, and beginner Android development with Kotlin."],
          ["Career Goals", "Focused on growing as a software developer by building scalable applications, improving backend and database skills, and solving practical business problems."],
          ["Skills Overview", "Hands-on project experience includes role-based authentication, live tracking, Firebase CRUD operations, dashboards, booking workflows, and data transformation."]
        ].map(([title, copy]) => (
          <motion.article variants={fadeUp} key={title} className="glass-card p-6">
            <CheckCircle2 className="mb-5 text-blue-600 dark:text-blue-300" size={26} />
            <h3 className="mb-3 text-xl font-bold text-slate-950 dark:text-white">{title}</h3>
            <p className="leading-7 text-slate-600 dark:text-slate-300">{copy}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Core technologies and tools.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <motion.article variants={fadeUp} whileHover={{ y: -6 }} key={group.title} className="glass-card p-6">
              <div className="mb-5 grid size-12 place-items-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Icon size={23} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected projects with deployable portfolio value.">
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article variants={fadeUp} whileHover={{ y: -6 }} key={project.title} className="glass-card overflow-hidden">
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open live ${project.title} project`}>
                <img className="h-48 w-full object-cover" src={project.image} alt={`${project.title} preview`} loading="lazy" />
              </a>
            ) : (
              <img className="h-48 w-full object-cover" src={project.image} alt={`${project.title} preview`} loading="lazy" />
            )}
            <div className="grid gap-4 p-6">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                {project.demo ? (
                  <a className="hover:text-blue-700 dark:hover:text-blue-300" href={project.demo} target="_blank" rel="noreferrer">{project.title}</a>
                ) : project.title}
              </h3>
              <p className="leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => <span className="skill-pill" key={tech}>{tech}</span>)}
              </div>
              {(project.github || project.demo) && (
                <div className="flex gap-3 pt-2">
                  {project.github && <a className="project-link" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Code</a>}
                  {project.demo && <a className="project-link" href={project.demo} target="_blank" rel="noreferrer"><ArrowUpRight size={17} /> View Live</a>}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Professional internship experience in data engineering.">
      <motion.div variants={fadeUp} className="glass-card relative p-6 sm:p-8">
        <div className="absolute bottom-8 left-8 top-8 hidden w-px bg-blue-500/30 sm:block" />
        <div className="grid gap-6 sm:grid-cols-[72px_1fr]">
          <div className="z-10 grid size-14 place-items-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BriefcaseBusiness size={25} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-blue-700 dark:text-blue-300">Data Engineer Intern</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Vyosim Pvt. Ltd.</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">December 2024 - May 2025</p>
            <ul className="mt-6 grid gap-3">
              {experiencePoints.map((point) => (
                <li key={point} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="mt-1 flex-none text-blue-600 dark:text-blue-300" size={18} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Education() {
  const education = [
    {
      degree: "Bachelor of Science (B.Sc.) in Information Technology",
      school: "Mumbai University",
      period: "June 2023 - April 2026",
      score: "CGPI: 8.30"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      school: "Maharashtra Board",
      period: "February 2023",
      score: "73.83%"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      school: "Maharashtra Board",
      period: "May 2021",
      score: "82.40%"
    }
  ];

  return (
    <Section id="education" eyebrow="Education" title="Academic foundation in information technology.">
      <div className="grid gap-5">
        {education.map((item) => (
          <motion.article key={item.degree} variants={fadeUp} className="glass-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <div className="grid size-14 flex-none place-items-center rounded-lg bg-blue-600 text-white">
                <GraduationCap size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{item.degree}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{item.school}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.period}</p>
              </div>
            </div>
            <span className="w-fit rounded-lg bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-700 dark:text-blue-200">{item.score}</span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let us connect about internships, junior roles, or project work.">
      <div className="max-w-3xl">
        <motion.div variants={fadeUp} className="glass-card grid content-start gap-4 p-6">
          <a className="contact-line" href={`mailto:${profile.email}`}><Mail size={20} /> {profile.email}</a>
          <a className="contact-line" href={`tel:${profile.phone.replaceAll(" ", "")}`}><Phone size={20} /> {profile.phone}</a>
          <span className="contact-line"><MapPin size={20} /> {profile.location}</span>
          {profile.github && <a className="contact-line" href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /> GitHub Profile</a>}
          <a className="contact-line" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /> LinkedIn Profile</a>
        </motion.div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 px-5 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:text-slate-300">
        <p>Copyright {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex gap-3">
          {profile.github && <a className="icon-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>}
          <a className="icon-button" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a className="icon-button" href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  const sectionIds = useMemo(() => navItems.map((item) => item.toLowerCase()), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-blue-600" style={{ scaleX }} />
      <Navbar activeSection={activeSection} theme={theme} onThemeToggle={() => setTheme((value) => (value === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
