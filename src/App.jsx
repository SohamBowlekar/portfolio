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
  name: "Ganesh Sawant",
  title: "Aspiring Software Developer",
  email: "ganesh.sawant@example.com",
  phone: "+91 98765 43210",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  resume: "/ganesh-sawant-resume.txt"
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
  { title: "Frontend", icon: Code2, skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend", icon: Server, skills: ["Node.js", "Express", "REST APIs", "Authentication"] },
  { title: "Database", icon: Database, skills: ["MongoDB", "MySQL", "Firebase", "Data Modeling"] },
  { title: "Tools", icon: TerminalSquare, skills: ["Git", "GitHub", "Vite", "VS Code", "Postman"] }
];

const projects = [
  {
    title: "Home Interior Designer Service App",
    image: "/project-interior.svg",
    description: "A service booking interface for interior design consultations, package discovery, and client project requests.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    github: "https://github.com/",
    demo: "https://vercel.com/"
  },
  {
    title: "Weather App",
    image: "/project-weather.svg",
    description: "A responsive weather dashboard with city search, current conditions, forecasts, and clean data presentation.",
    tech: ["React", "API", "CSS"],
    github: "https://github.com/",
    demo: "https://vercel.com/"
  },
  {
    title: "Task Management App",
    image: "/project-task.svg",
    description: "A productivity app for creating, organizing, and tracking tasks with status filters and priority views.",
    tech: ["React", "Local Storage", "Tailwind CSS"],
    github: "https://github.com/",
    demo: "https://vercel.com/"
  }
];

const experiencePoints = [
  "Built responsive web pages from UI requirements using React, JavaScript, HTML, and CSS.",
  "Collaborated on bug fixes, component cleanup, and frontend performance improvements.",
  "Worked with Git-based workflows, code reviews, and deployment-ready project builds."
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
          <span>Ganesh.dev</span>
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
  const typed = useTyping(["React Developer", "Frontend Enthusiast", "Problem Solver", "Clean UI Builder"]);

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-16">
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-7">
          <motion.p variants={fadeUp} className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200">
            <Sparkles size={16} />
            Available for internships and junior developer roles
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
            Motivated BSc IT student focused on building responsive, accessible, and performance-conscious web applications with React and modern JavaScript.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
            <a className="primary-button" href={profile.resume} download>
              <Download size={18} />
              Download Resume
            </a>
            <a className="secondary-button" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="glass-card p-5">
          <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 shadow-2xl dark:border-white/10">
            <div className="mb-4 flex gap-2">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <pre className="overflow-hidden text-sm leading-7 text-slate-200">
{`const developer = {
  name: "Ganesh Sawant",
  focus: "React + UI Engineering",
  values: ["clean code", "accessibility", "learning"],
  goal: "ship useful software"
};`}
            </pre>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {["React", "Vite", "Tailwind"].map((item) => (
              <span key={item} className="rounded-lg bg-blue-500/10 px-3 py-3 text-sm font-bold text-blue-700 dark:text-blue-200">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="A practical developer profile built for real hiring signals.">
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["Professional Summary", "Aspiring software developer with hands-on experience building responsive React interfaces, reusable components, and clean frontend flows."],
          ["Career Goals", "Grow into a full-stack developer role by strengthening system design, API integration, testing, and production deployment skills."],
          ["Skills Overview", "Comfortable across frontend development, backend fundamentals, databases, version control, and modern web tooling."]
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
            <img className="h-48 w-full object-cover" src={project.image} alt={`${project.title} preview`} loading="lazy" />
            <div className="grid gap-4 p-6">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
              <p className="leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => <span className="skill-pill" key={tech}>{tech}</span>)}
              </div>
              <div className="flex gap-3 pt-2">
                <a className="project-link" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Code</a>
                <a className="project-link" href={project.demo} target="_blank" rel="noreferrer"><ArrowUpRight size={17} /> Demo</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Early professional experience with web development delivery.">
      <motion.div variants={fadeUp} className="glass-card relative p-6 sm:p-8">
        <div className="absolute bottom-8 left-8 top-8 hidden w-px bg-blue-500/30 sm:block" />
        <div className="grid gap-6 sm:grid-cols-[72px_1fr]">
          <div className="z-10 grid size-14 place-items-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BriefcaseBusiness size={25} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-blue-700 dark:text-blue-300">Web Development Internship</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Frontend development, UI implementation, and project support</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Internship Timeline: 2025</p>
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
  return (
    <Section id="education" eyebrow="Education" title="Academic foundation in information technology.">
      <motion.article variants={fadeUp} className="glass-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="grid size-14 flex-none place-items-center rounded-lg bg-blue-600 text-white">
            <GraduationCap size={26} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">BSc IT</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Mumbai University</p>
          </div>
        </div>
        <span className="w-fit rounded-lg bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-700 dark:text-blue-200">Software Development Focus</span>
      </motion.article>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s connect about internships, junior roles, or project work.">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div variants={fadeUp} className="glass-card grid content-start gap-4 p-6">
          <a className="contact-line" href={`mailto:${profile.email}`}><Mail size={20} /> {profile.email}</a>
          <a className="contact-line" href={`tel:${profile.phone.replaceAll(" ", "")}`}><Phone size={20} /> {profile.phone}</a>
          <a className="contact-line" href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /> GitHub Profile</a>
          <a className="contact-line" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /> LinkedIn Profile</a>
        </motion.div>
        <motion.form variants={fadeUp} className="glass-card grid gap-4 p-6" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span>Name</span>
            <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Tell me about the opportunity" rows="5" required />
          </label>
          <button className="primary-button w-full sm:w-fit" type="submit">
            <Mail size={18} />
            Send Message
          </button>
        </motion.form>
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
          <a className="icon-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
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
