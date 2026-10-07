import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Menu,
  Send,
  Server,
  X,
  Database,
  Terminal,
} from "lucide-react";
import "./style.css";
import "./professional.css";

const skills = [
  {
    title: "Frontend development",
    icon: Code2,
    items: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    title: "Backend development",
    icon: Server,
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  { title: "Database", icon: Database, items: ["MongoDB"] },
  {
    title: "Tools & workflow",
    icon: Terminal,
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    title: "IoT & embedded",
    icon: Cpu,
    items: ["Arduino", "Raspberry Pi", "ESP32", "Sensors", "I2C · SPI · UART"],
  },
];
const projects = [
  {
    n: "01",
    title: "Presto Travel Agency Website",
    type: "Professional project",
    text: "Currently contributing to the development and maintenance of a travel agency website. Work includes responsive React interfaces, application functionality, API integration, testing, debugging, and iterative feature updates.",
    stack: ["MERN stack", "React.js", "REST APIs", "JavaScript", "MongoDB"],
    icon: Braces,
  },
  {
    n: "02",
    title: "NLF Factory Website",
    type: "Web application",
    text: "Developed and maintained responsive web interfaces, contributing to frontend functionality, reusable UI implementation, testing, debugging, and application maintenance.",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3"],
    icon: Braces,
  },
  {
    n: "03",
    title: "WorkFit Website",
    type: "Web development",
    text: "Built and maintained responsive web pages, implementing frontend features and contributing to testing, debugging, maintenance, and iterative improvements.",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3"],
    icon: Code2,
  },
  {
    n: "04",
    title: "AI-Based Rover with Robotic Arm",
    type: "Robotics & embedded systems",
    text: "Developed an AI-enabled rover concept using Raspberry Pi and a robotic arm, combining robotics hardware and software logic for autonomous operation. Worked on hardware-software integration, device control, testing, and debugging.",
    stack: ["Raspberry Pi", "Robotics", "Embedded systems", "Device control"],
    icon: Cpu,
  },
  {
    n: "05",
    title: "PIR Sensor-Based Alarm System",
    type: "IoT & embedded systems",
    text: "Designed a motion-detection security system using a PIR sensor to detect movement and trigger an audible alarm, then tested the sensor interface and control logic.",
    stack: [
      "PIR sensor",
      "Motion detection",
      "Alarm system",
      "Embedded systems",
    ],
    icon: Cpu,
  },
];
const experience = [
  {
    date: "FEB 2026 — PRESENT",
    company: "Cyberathon Technology",
    role: "Full Stack Developer / MERN Stack Developer",
    detail:
      "Working on web development using the MERN stack, contributing to React.js frontend development, reusable components, JavaScript functionality, debugging, testing, website maintenance and backend-related development.",
    tags: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Git",
    ],
  },
  {
    date: "MAR 2022 — APR 2022",
    company: "Dalvik Apps",
    role: "IoT Intern",
    detail:
      "Supported IoT and embedded-system projects using Raspberry Pi and sensors. Helped connect hardware components, test sensor inputs, and troubleshoot device behavior during development.",
    tags: ["IoT", "Raspberry Pi", "Sensors"],
  },
];

const introPrefix = "I'm a software developer focused on building ";
const introHighlight = "useful, working software";
const fullIntro = `${introPrefix}${introHighlight} for the web.`;
const heroIntro =
  "I'm Dhiraj Meshram. I build responsive and practical web applications using modern JavaScript technologies.";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedIntro, setTypedIntro] = useState("");
  const [typedHeroIntro, setTypedHeroIntro] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedHeroIntro(heroIntro);
      return;
    }
    let character = 0;
    const typing = window.setInterval(() => {
      character += 1;
      setTypedHeroIntro(heroIntro.slice(0, character));
      if (character >= heroIntro.length) window.clearInterval(typing);
    }, 38);
    return () => window.clearInterval(typing);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedIntro(fullIntro);
      return;
    }
    const about = document.getElementById("about");
    if (!about) return;
    let typing;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let character = 0;
      typing = window.setInterval(() => {
        character += 1;
        setTypedIntro(fullIntro.slice(0, character));
        if (character >= fullIntro.length) window.clearInterval(typing);
      }, 24);
    }, { threshold: 0.25 });
    observer.observe(about);
    return () => {
      observer.disconnect();
      if (typing) window.clearInterval(typing);
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = document.querySelectorAll(
      ".section-heading, .about-grid, .skill-card, .timeline-item, .project-card, .contact-panel",
    );
    items.forEach((item) => item.classList.add("reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const updateCountryCode = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    setForm({ ...form, countryCode: digits ? `+${digits}` : "+" });
  };
  const updatePhone = (e) => {
    setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 14) });
  };
  async function submit(e) {
    e.preventDefault();
    const phoneDigits = `${form.countryCode}${form.phone}`.replace(/\D/g, "");
    if (phoneDigits.length > 15) {
      setFormState("error");
      setFormMessage(
        "Phone number must be no more than 15 digits, including the country code.",
      );
      return;
    }
    setFormState("sending");
    setFormMessage("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: `${form.countryCode} ${form.phone}`,
            subject: form.subject,
            message: form.message,
          }),
        },
      );
      const responseText = await response.text();
      let result = null;
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = null;
        }
      }
      if (!response.ok) {
        throw new Error(
          result?.error ||
            `Contact service returned HTTP ${response.status}. Check the API server and try again.`,
        );
      }
      if (typeof result?.message !== "string") {
        throw new Error(
          "The contact server returned an empty or invalid response. Check that the latest API server is running.",
        );
      }
      setFormState("success");
      setFormMessage("Message sent. Thanks for reaching out.");
      setForm({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error.message || "Could not reach the server. Please try again later.",
      );
    }
  }
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <header className="header">
        <a className="brand" href="#home" aria-label="Dhiraj Meshram home">
          <span className="brand-mark">
            DM<span>.</span>
          </span>
          <span className="brand-copy">
            DHIRAJ MESHRAM<small>SOFTWARE DEVELOPER</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a onClick={closeMenu} href="#about">
            About
          </a>
          <a onClick={closeMenu} href="#skills">
            Stack
          </a>
          <a onClick={closeMenu} href="#experience">
            Experience
          </a>
          <a onClick={closeMenu} href="#projects">
            Projects
          </a>
          <a className="nav-contact" onClick={closeMenu} href="#contact">
            Let's talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES{" "}
              <span className="eyebrow-line" />
            </div>
            <h1>
              Building things
              <br />
              for the{" "}
              <span className="gradient-text">
                web<span className="period">.</span>
              </span>
            </h1>
            <div className="hero-role">
              <span>MERN Stack Developer</span>
              <i /> <span>React.js Developer</span>
            </div>
            <p className="hero-desc" aria-label={heroIntro}>
              <span aria-hidden="true">
                {typedHeroIntro.slice(0, "I'm ".length)}
                {typedHeroIntro.length > "I'm ".length && (
                  <strong>
                    {typedHeroIntro.slice("I'm ".length, "I'm Dhiraj Meshram.".length)}
                  </strong>
                )}
                {typedHeroIntro.slice("I'm Dhiraj Meshram.".length)}
                <i className="typing-cursor" />
              </span>
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View projects <ArrowDownRight size={17} />
              </a>
              <a className="button button-quiet" href="#contact">
                Contact me <ArrowUpRight size={16} />
              </a>
              <a
                className="resume-link"
                href="/Dhiraj_Meshram_MERN_Developer_Resume.pdf"
                download="Dhiraj_Meshram_MERN_Developer_Resume.pdf"
              >
                Download resume <ArrowDown size={14} />
              </a>
            </div>
            <div className="social-links">
              <span>FIND ME ON</span>
              <a
                className="social-placeholder"
                href="https://github.com/dhiraj2692"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                className="social-placeholder"
                href="https://www.linkedin.com/in/dhiraj-meshram-0135a7202"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="JavaScript developer code illustration"
          >
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="code-window">
              <div className="window-top">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>dhiraj.js</span>
                <span className="window-lock">● ● ●</span>
              </div>
              <div className="code-content">
                <div className="code-line">
                  <span className="ln">01</span>
                  <span>
                    <b className="purple">const</b>{" "}
                    <b className="blue">developer</b>{" "}
                    <span className="muted">=</span>{" "}
                    <span className="yellow">{"{"}</span>
                  </span>
                </div>
                <div className="code-line indent">
                  <span className="ln">02</span>
                  <span>
                    <span className="teal">name</span>
                    <span className="muted">:</span>{" "}
                    <span className="green">'Dhiraj Meshram'</span>
                    <span className="muted">,</span>
                  </span>
                </div>
                <div className="code-line indent">
                  <span className="ln">03</span>
                  <span>
                    <span className="teal">role</span>
                    <span className="muted">:</span>{" "}
                    <span className="green">'MERN Developer'</span>
                    <span className="muted">,</span>
                  </span>
                </div>
                <div className="code-line indent">
                  <span className="ln">04</span>
                  <span>
                    <span className="teal">stack</span>
                    <span className="muted">:</span>{" "}
                    <span className="yellow">[</span>
                    <span className="green">'React'</span>
                    <span className="muted">,</span>
                  </span>
                </div>
                <div className="code-line indent deeper">
                  <span className="ln">05</span>
                  <span>
                    <span className="green">'Node.js'</span>
                    <span className="muted">, </span>
                    <span className="green">'MongoDB'</span>
                    <span className="yellow">]</span>
                    <span className="muted">,</span>
                  </span>
                </div>
                <div className="code-line indent">
                  <span className="ln">06</span>
                  <span>
                    <span className="teal">building</span>
                    <span className="muted">:</span>{" "}
                    <span className="green">'useful things'</span>
                  </span>
                </div>
                <div className="code-line">
                  <span className="ln">07</span>
                  <span>
                    <span className="yellow">{"}"}</span>
                    <span className="muted">;</span>
                    <span className="cursor" />
                  </span>
                </div>
                <div className="code-divider" />
                <div className="code-foot">
                  <span>
                    <i /> SYSTEM READY
                  </span>
                  <span>UTF-8</span>
                </div>
              </div>
            </div>
            <div className="float-chip chip-react">
              <span>⚛</span> React.js
            </div>
            <div className="float-chip chip-node">
              <span>⬡</span> Node.js
            </div>
            <div className="hero-index">
              01 <span /> 04
            </div>
          </div>
        </section>
        <section className="about section-wrap section" id="about">
          <div className="section-heading">
            <div>
              <span className="section-kicker">01 / ABOUT</span>
              <h2>
                Developer by <span className="gradient-text">craft.</span>
              </h2>
            </div>
            <span className="section-index">A LITTLE ABOUT ME</span>
          </div>
          <div className="about-grid">
            <div className="about-lead">
              <span className="bracket">&lt;hello_world /&gt;</span>
              <p className="about-typing" aria-label={fullIntro}>
                <span aria-hidden="true">
                  {typedIntro.slice(0, introPrefix.length)}
                  {typedIntro.length > introPrefix.length && (
                    <span>
                      {typedIntro.slice(
                        introPrefix.length,
                        introPrefix.length + introHighlight.length,
                      )}
                    </span>
                  )}
                  {typedIntro.slice(introPrefix.length + introHighlight.length)}
                  <i className="typing-cursor" />
                </span>
              </p>
              <div className="about-stamp">
                <span>DM</span>
                <i /> SOFTWARE / WEB DEVELOPMENT
              </div>
            </div>
            <div className="about-body">
              <p>
                I am a B.Tech graduate in Electronics &amp; Telecommunication
                Engineering focused on software and web development. I work with
                modern JavaScript technologies and the MERN stack, including
                React.js, Node.js, Express.js and MongoDB.
              </p>
              <p>
                I enjoy building practical web applications, reusable React
                components, REST APIs and full-stack solutions. I also have a
                background in IoT and embedded systems, including Raspberry Pi,
                Arduino, ESP32 and sensor-based projects.
              </p>
              <p>
                I am continuously improving my full-stack development skills and
                looking for opportunities where I can contribute to real-world
                software products.
              </p>
              <a className="text-link" href="#experience">
                See my experience <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>
        <section className="stack-section section" id="skills">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <span className="section-kicker">02 / TECHNOLOGIES</span>
                <h2>
                  Tools of the <span className="gradient-text">trade.</span>
                </h2>
              </div>
              <span className="section-index">MY DEVELOPMENT STACK</span>
            </div>
            <div className="skills-grid">
              {skills.map((group, i) => (
                <article className="skill-card" key={group.title}>
                  <div className="skill-card-top">
                    <span className="skill-icon">
                      <group.icon size={18} />
                    </span>
                    <span className="skill-num">0{i + 1}</span>
                  </div>
                  <h3>{group.title}</h3>
                  <div className="skill-tags">
                    {group.items.map((tag) => (
                      <span className="tech-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="experience section section-wrap" id="experience">
          <div className="section-heading">
            <div>
              <span className="section-kicker">03 / EXPERIENCE</span>
              <h2>
                Where I’ve <span className="gradient-text">built.</span>
              </h2>
            </div>
            <span className="section-index">WORK HISTORY</span>
          </div>
          <div className="timeline">
            {experience.map((job, i) => (
              <article className="timeline-item" key={job.company}>
                <div className="timeline-date">{job.date}</div>
                <div className="timeline-marker">
                  <span />
                </div>
                <div className="timeline-content">
                  <div className="job-heading">
                    <div>
                      <h3>{job.company}</h3>
                      <p>{job.role}</p>
                    </div>
                    <span className="job-index">0{i + 1}</span>
                  </div>
                  <p className="job-detail">{job.detail}</p>
                  <div className="skill-tags">
                    {job.tags.map((t) => (
                      <span className="tech-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="projects-section section" id="projects">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <span className="section-kicker">04 / SELECTED WORK</span>
                <h2>
                  Things I’ve <span className="gradient-text">worked on.</span>
                </h2>
              </div>
              <span className="section-index">CODE IN ACTION</span>
            </div>
            <div className="project-list">
              {projects.map((p) => (
                <article className="project-card" key={p.n}>
                  <div className="project-number">
                    {p.n}
                    <span />
                  </div>
                  <div className="project-main">
                    <div className="project-type">{p.type}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="skill-tags">
                      {p.stack.map((t) => (
                        <span className="tech-tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-icon">
                    <p.icon size={24} />
                    <span>
                      PROJECT
                      <br />
                      OVERVIEW
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="contact section-wrap section" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <span className="section-kicker">05 / CONTACT</span>
              <h2>
                Have a project
                <br />
                in <span className="gradient-text">mind?</span>
              </h2>
              <p>
                Have a question or want to work together? Send me a message and
                I’ll get back to you.
              </p>
              <div className="contact-email">
                <Mail size={16} /> Send me a message
                <ArrowDownRight size={14} />
              </div>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    autoComplete="name"
                    required
                    minLength="2"
                    maxLength="100"
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                    required
                    maxLength="254"
                  />
                </label>
              </div>
              <label>
                Phone number
                <span className="phone-input-row">
                  <input
                    name="countryCode"
                    type="tel"
                    value={form.countryCode}
                    onChange={updateCountryCode}
                    autoComplete="tel-country-code"
                    aria-label="Country calling code"
                    required
                    maxLength="4"
                    pattern="[+][1-9][0-9]{0,2}"
                    title="Use a country code such as +91."
                  />
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updatePhone}
                    autoComplete="tel-national"
                    aria-label="Phone number"
                    inputMode="numeric"
                    required
                    minLength="6"
                    maxLength="14"
                    pattern="[0-9]{6,14}"
                    title="Enter 6 to 14 digits, without the country code."
                  />
                </span>
              </label>
              <label>
                Subject
                <input
                  name="subject"
                  value={form.subject}
                  onChange={update}
                  required
                  minLength="3"
                  maxLength="150"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  required
                  minLength="10"
                  maxLength="5000"
                  rows="4"
                />
              </label>
              <div className="form-bottom">
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={formState === "sending"}
                >
                  {formState === "sending" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send message <Send size={15} />
                    </>
                  )}
                </button>
                <span className={"form-status " + formState} aria-live="polite">
                  {formState === "success" && <Check size={15} />} {formMessage}
                </span>
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className="footer section-wrap">
        <a className="brand" href="#home">
          <span className="brand-mark">
            DM<span>.</span>
          </span>
        </a>
        <span>
          © {new Date().getFullYear()} Dhiraj Meshram. Built with React.
        </span>
        <a className="back-top" href="#home">
          BACK TO TOP <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
