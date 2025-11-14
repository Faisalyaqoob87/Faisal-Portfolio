import React from "react";
import "./App.css";
import Slider from "./components/Slider/Slider";
import image from "./assets/download.svg";
import projectImage from "./assets/image.png";
// import baseImage from "./assets/base-image.png";
function App() {
  let about: any = {
    1: {
      aboutText: "About Me",
      name: "Faisal Yaqoob",
      profession: "FRONTEND DEVELOPER",
    },
    2: {
      aboutText: "Creative Ideas",
      name: "UNLOCK YOUR",
      profession: "CREATIVE POTENTIAL",
    },
  };
  let stack = [
    {
      stackName: "Frontend Development",
      avatar: "FE",
      stackItems: [
        "JavaScript (ES6+)",
        "React.js",
        "Angular",
        "TypeScript",
        "Redux",
      ],
    },
    // {
    //   stackName: "Backend Development",
    //   avatar: "BE",
    //   stackItems: ["Node.js", "PHP", "MySQL", ".NET", "Firebase", "Rest API"],
    // },
    {
      stackName: "Version Control",
      avatar: "DB",
      stackItems: ["Git", "GitHub", "Bitbucket", "JIRA"],
      
    },
    {
      stackName: "Other Tools",
      avatar: "VC",
      stackItems: ["CI/CD", "Actions", "Figma", "Postman", "VS Code"],
    },
  ];
  let projects = [
    {
      name: "Patient Medical Records & Progress Tracking",
      desc: "Designed intuitive dashboards for doctors to monitor patient progress. Implemented secure patient record management with data encryption.Added reporting module to generate treatment summaries and progress charts. Integrated access control for physicians, patients, and administrators.",
      tech: ["React", "PHP Core", "MySQL", "Custom UI Components(Pixel-Base)"],
      linkLive: "https://pixelone.io/",
      img: projectImage,
    },
     {
      name: "Medical Appointment & Scheduling System",
      desc: "Built interactive calendar & slot-based scheduling interface. Integrated automated reminders via email/SMS. Designed doctor availability and patient appointment workflows. Ensured high-performance backend to support concurrent bookings.",
      tech: ["React", "PHP Core", "MySQL", "Custom UI Components(Pixel-Base)"],
      linkLive: "https://pixelone.io/",
      img: projectImage,
    },
     {
      name: "Task & Performance Management System",
      desc: "Implemented task assignment, deadlines, and progress indicators. Developed analytics to track employee performance and task completion rate. Built role-based dashboards for team leads, managers, and employees. Designed Kanban board-style task tracking interface.",
      tech: ["React", "PHP Core", "MySQL", "Custom UI Components(Pixel-Base)"],
      linkLive: "https://pixelone.io/",
      img: projectImage,
    },
     {
      name: "Financial Management & Reimbursement System",
      desc: " Built modules for tracking travel, research, and operational costs. Implemented reimbursement claim submission & approval workflow. Added reporting features for expense breakdown and financial summaries. Integrated secure audit logs for compliance and accountability.",
      tech: ["React", "PHP Core", "MySQL", "Custom UI Components(Pixel-Base)"],
      linkLive: "https://pixelone.io/",
      img: projectImage,
    },
   
  ];
  const [currentAbout, setCurrentAbout] = React.useState(1);
  const [fadeClass, setFadeClass] = React.useState("fade-in");
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentAbout((prev) => (prev === 1 ? 2 : 1));
        setFadeClass("fade-in");
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  // Pause animations until scrolled into view
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.aos')) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const [isScrollReached, setIsScrollReached] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [spotPos, setSpotPos] = React.useState<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const [isInteractiveHover, setIsInteractiveHover] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const sections = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'stacks', label: 'Stacks' },
    { key: 'projects', label: 'Projects' },
    { key: 'experience', label: 'Experience' },
    { key: 'education', label: 'Education' },
    { key: 'contact', label: 'Contact' }
  ];
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerEl = document.querySelector('.header-fixed') as HTMLElement | null;
    const headerOffset = headerEl?.offsetHeight ?? 100; // dynamic header height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };
  const handleSliderClick = (page: any) => {
    const key = String(page).toLowerCase();
    const sectionMap: Record<string, string> = {
      home: 'summary',
      summary: 'summary',
      about: 'about',
      stacks: 'stacks',
      stack: 'stacks',
      skills: 'stacks',
      projects: 'projects',
      experience: 'experience',
      education: 'education',
      contact: 'contact',
      top: 'top'
    };
    const targetId = sectionMap[key] || 'summary';
    scrollToSection(targetId);
    setIsMobileMenuOpen(false);
  };
   React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // kitna scroll kiya
      const triggerPoint = window.innerHeight * 0.9; // 80vh

      if (scrollPosition >= triggerPoint) {
        setIsScrollReached(true);
        console.log("✅ Scrolled 80vh of the viewport height");
      } else {
        setIsScrollReached(false);
      }
      setShowBackToTop(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll);
    const handleMouseMove = (e: MouseEvent) => {
      setSpotPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('a, button, [role="button"], .stack-item, .project-card');
      setIsInteractiveHover(isInteractive);
    };
    const handleMouseLeave = () => setSpotPos({ x: -9999, y: -9999 });
    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('mouseleave', handleMouseLeave as any);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseleave', handleMouseLeave as any);
    };
  }, []);

  return (
    <div className="main-container" id="top">
      <div className="content">
        <div className={`header ${isScrollReached ? "header-fixed" : ""}`}>
          <div className="name-container">
            <span className="title-text">Faisal</span>
            <div className="mname-box">
              <div className="bg-box"></div>
              <span className="mname title-text"></span>
            </div>
            <span className="title-text">Yaqoob</span>
          </div>
          {isScrollReached && (
            <div className="header-slider">
              <Slider
                origin="header"
                handlePageClicked={handleSliderClick}
              />
            </div>
          )}
        </div>
        {!isScrollReached && (
          <div className="normal-slider">
            <Slider
              origin="normal"
              handlePageClicked={handleSliderClick}
            />
          </div>
        )}
        <div className="home">
          <div className={`home-content ${fadeClass}`}>
            <span>{about[currentAbout].aboutText}</span>
            <div className="home-text-name">{about[currentAbout].name}</div>
            <div className="home-text-profession">
              {about[currentAbout].profession}
            </div>
          </div>
        </div>
      </div>
      <div className="summary" id="summary">
        <div className="head-title aos aos-fade">
          Transforming <span>Complexity</span> into <span>Simplicity</span> for
          Clients Through Software Development
        </div>
        <div className="line-dot">
          <div className="line"></div>
          <div className="dot"></div>
        </div>
        <div className="head-subtitle aos aos-fade">
          Software Developer with over 3 years of experience delivering
          innovative and scalable solutions. Skilled at transforming complex
          requirements into simple, efficient, and user-friendly systems. Proven
          track record of contributing to diverse projects and driving success
          through creativity, dedication, and collaboration.
        </div>
        <div className="head-buttons aos aos-fade">
          <button className="common-btn"  onClick={() => handleSliderClick("contact")}>CONTACT</button>
        </div>
      </div>
      <div className="about" id="about">
        <div className="about-left">
          <div className="head-title aos aos-fade">
            About <span>Faisal</span>
          </div>
          <div
            className="line-dot"
            style={{ justifyContent: "flex-start", marginLeft: "20px" }}
          >
            <div className="line"></div>
            <div className="dot dot-in-start"></div>
          </div>
          <div className="about-subtitle aos aos-fade">
            Passionate and dedicated Senior Frontend Developer with over 3 years
            of experience in designing, developing, and implementing software
            solutions. Adept at transforming complex requirements into simple,
            efficient, and user-friendly systems. Proven track record of
            contributing to diverse projects and driving success through
            creativity, dedication, and collaboration.
          </div>
          <div className="about-bullets aos aos-fade">
            <div className="bullet-point">
              <div className="bullet-points-dot"></div>
              <div className="bullet-points-text">
                React.js, Angular, TypeScript, Redux, Bootstrap, Material-UI, PrimeNG.
              </div>
            </div>
            {/* <div className="bullet-point">
              <div className="bullet-points-dot"></div>
              <div className="bullet-points-text">
                Experienced with backend technologies like Node.js, PHP, and
                .NET.
              </div>
            </div> */}
            <div className="bullet-point">
              <div className="bullet-points-dot"></div>
              <div className="bullet-points-text">
                Strong understanding of version control systems such as Git and
                GitHub.
              </div>
            </div>
          </div>
        </div>
        <div className="about-right">
          <div className="about-image-container aos aos-fade">
            <img src={image} alt="Faisal Yaqoob" className="about-image" />
          </div>
        </div>
      </div>
      <div className="skills" id="stacks">
        <div className="skills-title aos">
          Tech <span>Stacks</span>
        </div>
        <div className="stacks">
          {stack.map((s, index) => {
            return (
              <div key={index} className="stack-box aos">
                <div className="stack-head">
                  <div className="avatar">{s.avatar}</div>
                  <div className="stack-name">{s.stackName}</div>
                </div>
                <div className="stack-list">
                  {s.stackItems.map((item, itemIndex) => (
                    <div className="stack-item" key={itemIndex}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="projects" id="projects">
        <div className="project-title aos">
          Projects <span>And</span> Skills
        </div>

        {/* === Two Public Projects === */}
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card aos">
              <div className="project-image">
                <img src={(p.img)} alt={p.name} />
              </div>
              <div className="project-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t, index) => (
                    <span key={index}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === Message About More Projects === */}
        <div className="more-projects aos">
          Worked on many more projects including{" "}
          <strong>Jira-related drag and drop boards</strong>,
          <strong> Hospital Management Systems</strong>, and several internal
          enterprise tools that are not publicly shared due to company policy.
        </div>

        {/* === Skills Section === */}
        <div className="skills-summary aos">
          <h3 className="skills-heading">Key Skills</h3>
          <ul className="skills-list">
            <li className="aos">
              ⚙️ <strong>Frontend:</strong> React.js, Angular, TypeScript,
              Redux, Bootstrap, Material-UI, PrimeNG
            </li>
            <li className="aos">
              💻 <strong>Backend:</strong>  REST APIs, Firebase
            </li>
            <li className="aos">
              🧠 <strong>Dev Tools:</strong> Webpack, Git, Bitbucket, JIRA,
              Postman, Docker
            </li>
            <li className="aos">
              🎨 <strong>Design & UI:</strong> Pixel-Perfect UI, Figma,
              Responsive Design, CSS3, TailwindCSS
            </li>
            <li className="aos">
              🗣️ <strong>Soft Skills:</strong> Leadership, Communication, Team
              Management, Presentation
            </li>
          </ul>
        </div>
      </div>
      {/* ===================== EXPERIENCE SECTION ===================== */}
      <div className="experience" id="experience">
        <div className="experience-title aos">
          Work <span>Experience</span>
        </div>

        <div className="experience-timeline">
          {/* Hawklogix */}
          <div className="exp-card aos">
            <div className="exp-header">
              <div className="exp-logo">H</div>
              <div>
                <h3>Frontend Developer</h3>
                <p className="exp-company">HawkLogix Pakistan · Full-time</p>
                <p className="exp-date">May 2022 - Present · 3 yr 6 mos</p>
                <p className="exp-location">
                  Lahore, Punjab, Pakistan · On-site
                </p>
              </div>
            </div>
            <p className="exp-desc">
              Building scalable and modern frontend applications using Angular,
              TypeScript, and modern UI frameworks. Leading frontend
              architecture and collaborating with backend teams.
            </p>
            <ul className="exp-skills">
              <li>Internet Design</li>
              <li>Front-End Development</li>
              {/* <li>Mean Stack</li> */}
              <li>Redux.js</li>
              <li>Software Design</li>
              <li>E-Commerce</li>
            </ul>
          </div>

          {/* PixelOne */}
          {/* <div className="exp-card aos">
            <div className="exp-header">
              <div className="exp-logo">P</div>
              <div>
                <h3>Full-stack Developer</h3>
                <p className="exp-company">PixelOne · Full-time</p>
                <p className="exp-date">Apr 2022 - Jun 2024 · 2 yrs 3 mos</p>
                <p className="exp-location">Lahore, Punjab, Pakistan</p>
              </div>
            </div>
            <p className="exp-desc">
              Developed enterprise-grade e-commerce and automation platforms
              using Angular, Node.js, Redux, and REST APIs. Designed
              pixel-perfect UIs and integrated business automation features.
            </p>
            <ul className="exp-skills">
              <li>Internet Design</li>
              <li>Front-End Development</li>
              <li>Mean Stack</li>
              <li>Redux.js</li>
              <li>Software Design</li>
              <li>E-Commerce</li>
            </ul>
          </div> */}

          {/* <div className="exp-card aos">
            <div className="exp-header">
              <div className="exp-logo">P</div>
              <div>
                <h3>Frontend Developer</h3>
                <p className="exp-company">PixelOne · Full-time</p>
                <p className="exp-date">Mar 2021 - Mar 2022 · 1 yr 1 mo</p>
                <p className="exp-location">Lahore, Punjab, Pakistan</p>
              </div>
            </div>
            <p className="exp-desc">
              Designed and implemented responsive web interfaces using React,
              Redux, and Material-UI. Improved UI performance and consistency
              across multiple product lines.
            </p>
          </div> */}
        </div>
      </div>

      {/* ===================== EDUCATION ===================== */}
      <div className="education" id="education">
        <div className="education-title aos">
          Education <span>Background</span>
        </div>

        <div className="edu-item aos">
          <div className="edu-icon">USA</div>
          <div>
            <h3>University Of USA</h3>
            <p>Software Engineering</p>
            <p className="edu-date">2017 - 2021</p>
          </div>
        </div>

        <div className="edu-item aos">
          <div className="edu-icon">PGC</div>
          <div>
            <h3>Punjab College</h3>
            <p>FSc Pre-Engineering</p>
            <p className="edu-date">2015 - 2017 · Grade A+</p>
          </div>
        </div>
      </div>

      {/* ===================== CONTACT ===================== */}

      {/* ===================== CONTACT ===================== */}
      {/* ===================== CONTACT ===================== */}
      <div className="contact" id="contact">
        <div className="contact-title aos">
          Contact <span>Me</span>
        </div>

        <div className="contact-card aos">
          <h2>Faisal Yaqoob</h2>
          <p className="contact-role">Frontend Developer @ HawkLogix</p>

          <div className="contact-info">
            <p>
              📧{" "}
              <a href="mailto:faisalyaqoob8787@gmail.com">
                faisalyaqoob8787@gmail.com
              </a>
            </p>
            <p>
              📞 <a href="tel:03064487363">03064487363</a>
            </p>
            <p>📍 Lahore, Pakistan</p>
          </div>

          {/* === Social Links === */}
          <div className="contact-socials">
            <a
              href="https://www.linkedin.com/in/faisal-yaqoob-889836183/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/Faisalyaqoob87"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon github"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://wa.me/923064487363?text=Hi%20Faisal!%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>

          <button
            className="common-btn"
            style={{ marginTop: "25px" }}
            onClick={() =>
              window.open(
                "https://wa.me/923064487363?text=Hi%20Faisal!%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect.",
                "_blank"
              )
            }
          >
            Let’s Connect
          </button>
        </div>
      </div>
      {/* Mobile navigation button */}
      <button
        className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Open menu"
        onClick={() => setIsMobileMenuOpen((v) => !v)}
      >
        ☰
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {sections.map((s) => (
            <button key={s.key} onClick={() => handleSliderClick(s.key)}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Cursor spotlight (desktop only, CSS hides on mobile) */}
      <div
        className="cursor-spotlight"
        style={{ transform: `translate(${spotPos.x - 120}px, ${spotPos.y - 120}px)` }}
      ></div>

      {/* Elastic cursor ring only on interactive elements */}
      {isInteractiveHover && (
        <div
          className={`cursor-ring active`}
          style={{ transform: `translate(${spotPos.x - 12}px, ${spotPos.y - 12}px)` }}
        ></div>
      )}

      {showBackToTop && (
        <button
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand"></div>
          <div className="footer-links">
            <a href="#summary" onClick={(e) => { e.preventDefault(); handleSliderClick('home'); }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleSliderClick('about'); }}>About</a>
            <a href="#stacks" onClick={(e) => { e.preventDefault(); handleSliderClick('stacks'); }}>Stacks</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleSliderClick('projects'); }}>Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleSliderClick('contact'); }}>Contact</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
