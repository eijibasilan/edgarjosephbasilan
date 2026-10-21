import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2, Globe2, Menu, Moon, Sun, X } from 'lucide-react'
import { projects, skillGroups, experience, education, certifications, contact, profile } from './portfolio.js'
import './portfolio-refresh.css'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

function ProjectArtwork({ project }) {
  return (
    <div className={`project-art art-${project.artwork}`} role="img" aria-label={`Illustrative ${project.category} interface concept, not a screenshot`}>
      <div className="art-sheet">
        <div className="art-sheet-caption"><span>{project.artLabel}</span><span>INTERFACE STUDY</span></div>
        {project.artwork === 'store' && <div className="art-store-view"><div className="art-store-header"><strong>HM</strong><span>HANDY MANNY</span><small>STORE OPERATIONS</small></div><div className="art-store-stats"><div><span>TODAY'S SALES</span><strong>—</strong></div><div><span>OPEN ORDERS</span><strong>—</strong></div><div><span>LOW STOCK</span><strong>—</strong></div></div><div className="art-store-inventory"><span>INVENTORY ACTIVITY</span><i /><i /><i /><i /></div></div>}
        {project.artwork === 'rrc' && <div className="art-service-view"><div className="art-view-heading"><span>FIELD SERVICE</span><strong>INSPECTIONS</strong></div><div className="art-calendar"><div><span>MON</span><i /><i /></div><div><span>TUE</span><i /><i /><i /></div><div><span>WED</span><i /></div><div><span>THU</span><i /><i /></div><div><span>FRI</span><i /><i /><i /></div></div><p>CLIENT BOOKINGS / WEEK VIEW</p></div>}
        {project.artwork === 'library' && <div className="art-library-view"><div className="art-view-heading"><span>LIBRARY</span><strong>BOOK CIRCULATION</strong></div><div className="art-book-row"><i /><span>BOOK RECORD</span><b>CHECKED OUT</b></div><div className="art-book-row"><i /><span>BOOK RECORD</span><b>RETURNED</b></div><div className="art-book-row"><i /><span>BOOK RECORD</span><b>AVAILABLE</b></div></div>}
        {project.artwork === 'learning' && <div className="art-learning-view"><div className="art-view-heading"><span>TRACKNLEARN</span><strong>COURSE OVERVIEW</strong></div><div className="art-course-block"><span>COURSE MODULE</span><i /><i /></div><div className="art-progress-row"><span>ASSESSMENTS</span><i /></div><div className="art-progress-row"><span>STUDENT PROGRESS</span><i /></div><p>LEARNING ANALYTICS</p></div>}
        {project.artwork === 'autorent' && <div className="art-rental-view"><div className="art-view-heading"><span>AUTORENT</span><strong>BOOKING DETAILS</strong></div><div className="art-trip-line"><span>PICKUP</span><i /><span>RETURN</span></div><div className="art-trip-block"><div><span>DATE</span><b>— / — / —</b></div><div><span>DRIVER</span><b>ASSIGNED</b></div></div><p>RENTAL SUMMARY</p></div>}
      </div>
      <span className="mockup-label">ILLUSTRATIVE UI · NOT A SCREENSHOT</span>
    </div>
  )
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <article className="project-card">
      <button className="project-visual-button" type="button" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
        <ProjectArtwork project={project} />
      </button>
      <div className="project-card-copy">
        <div className="project-card-topline"><span className="project-number">0{index + 1}</span><span className="project-status"><i /> {project.status}</span></div>
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tag-list" aria-label="Project technologies">{project.technologies.length ? project.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>) : <span className="tech-tag">Stack not listed</span>}</div>
        <div className="project-card-footer">
          <span className="placeholder-note">{project.cardNote || 'Selected project'}</span>
          <button className="text-action" type="button" onClick={() => onOpen(project)}>View details <ArrowUpRight size={15} aria-hidden="true" /></button>
        </div>
      </div>
    </article>
  )
}

function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (project && dialog && !dialog.open) dialog.showModal()
    if (!project && dialog?.open) dialog.close()
  }, [project])

  return (
    <dialog className="project-dialog" ref={dialogRef} onClose={onClose} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }} aria-labelledby="dialog-title">
      {project && <>
        <div className="dialog-topbar"><span className="eyebrow">{project.category}</span><button className="icon-button dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close project details"><X size={18} /></button></div>
        <div className="dialog-art"><ProjectArtwork project={project} /></div>
        <div className="dialog-content">
          <div className="dialog-title-row"><div><span className="project-status"><i /> {project.status}</span><h2 id="dialog-title">{project.title}</h2></div><span className="dialog-index">{project.id}</span></div>
          <p className="dialog-overview">{project.overview}</p>
          <div className="dialog-detail-grid">
            <section><h3>Problem</h3><p>{project.problem}</p></section>
            <section><h3>Objectives</h3><p>{project.objectives}</p></section>
            <section><h3>Role & contributions</h3><p>{project.role}</p></section>
            <section><h3>Implementation notes</h3><p>{project.challenges}</p></section>
            <section><h3>What I learned</h3><p>{project.learnings}</p></section>
            <section><h3>Technologies</h3>{project.technologies.length ? <div className="tag-list">{project.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>)}</div> : <p>Not specified in the résumé.</p>}</section>
          </div>
          <section className="dialog-features"><h3>Features & contributions</h3><ul>{project.features.map((feature) => <li key={feature}><Check size={14} aria-hidden="true" />{feature}</li>)}</ul></section>
          {project.technicalHighlights?.length > 0 && <section className="dialog-callouts"><h3>Technical highlights</h3><div>{project.technicalHighlights.map((highlight) => <article key={highlight.title}><h4>{highlight.title}</h4><p>{highlight.detail}</p></article>)}</div></section>}
          {project.designDecisions?.length > 0 && <section className="dialog-callouts"><h3>Design decisions</h3><ul>{project.designDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></section>}
          <div className="dialog-links"><span className="placeholder-note">No public demo or repository URL was included with the résumé.</span></div>
        </div>
      </>}
    </dialog>
  )
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const contactLinks = [
    { label: 'Email', value: contact.email, href: contact.email ? `mailto:${contact.email}` : null, external: false },
    { label: 'Phone', value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : null, external: false },
    { label: 'GitHub', value: contact.github, href: contact.github, external: true },
    { label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin, external: true },
    { label: 'Portfolio', value: contact.website, href: contact.website, external: true },
  ].filter((link) => link.value && link.href)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const sections = navigation.map(({ href }) => document.querySelector(href)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-24% 0px -58% 0px', threshold: [0, 0.2, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function toggleTheme() {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Edgar Joseph Basilan, home"><span className="wordmark-icon"><Code2 size={17} /></span><span>EDGAR BASILAN<small>FULL-STACK DEVELOPER</small></span></a>
        <nav className={`site-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
          {navigation.map(({ label, href }) => <a key={href} className={activeSection === href.slice(1) ? 'nav-active' : ''} href={href} onClick={closeMenu}>{label}</a>)}
        </nav>
        <div className="header-actions"><span className="availability"><i /> QUEZON CITY, PH</span><button className="icon-button theme-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a><button className="icon-button menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
        <div className="hero-meta"><span>EDGAR JOSEPH BASILAN <b>/</b> PORTFOLIO</span><span className="hero-meta-right"><Globe2 size={13} /> QUEZON CITY, PHILIPPINES</span></div>
          <div className="hero-grid">
          <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> FULL-STACK DEVELOPER</p><h1>Edgar Joseph<br /><em>Basilan.</em></h1><div className="hero-identity"><span className="identity-mark">EB</span><div><strong>{profile.role}</strong><span>{profile.location}</span></div></div><p className="hero-description">{profile.summary}</p><div className="hero-actions"><a className="button-primary" href="#projects">Selected work <ArrowDownRight size={16} /></a><a className="button-secondary" href="#contact">Get in touch <ArrowUpRight size={15} /></a></div></div>
            <div className="current-work-panel"><div className="current-work-heading"><span>NOW / FREELANCE</span><span>01 — 04</span></div><h2>Turning business needs<br />into working software.</h2><p>Freelance · Custom full-stack web solutions</p><div className="work-flow"><div><span>01</span><strong>Understand the need</strong><small>REQUIREMENTS</small></div><div><span>02</span><strong>Design the system</strong><small>ARCHITECTURE · DATA</small></div><div><span>03</span><strong>Build it</strong><small>ASP.NET · REACT · SQL</small></div><div><span>04</span><strong>Ship & support</strong><small>DEPLOY · MAINTAIN</small></div></div><div className="work-panel-footer"><span>FULL-STACK DEVELOPMENT</span><span>OPEN TO PROJECTS</span></div></div>
          </div>
          <div className="hero-footer"><div><strong>{String(projects.length).padStart(2, '0')}</strong><span>PROJECTS<br />SHOWCASED</span></div><div><strong>{String(skillGroups.length).padStart(2, '0')}</strong><span>SKILL<br />GROUPS</span></div><div><strong>{String(certifications.length).padStart(2, '0')}</strong><span>CREDENTIALS<br />& COURSES</span></div><a href="#about">GET TO KNOW ME <ArrowDown size={14} /></a></div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 01 / ABOUT</p><span className="section-aside">A LITTLE CONTEXT</span></div>
          <div className="about-grid"><h2>Good software starts with <em>understanding.</em></h2><div className="about-copy"><p>I’m a freelance full-stack developer. I work with clients to gather requirements, turn business needs into technical designs, and build, deploy, and support custom web applications. My experience also includes SAP ABAP development and enterprise software training.</p><div className="about-notes"><div><span>EDUCATION</span><p>BS Information Technology, STI College of Novaliches</p></div><div><span>INTERESTS</span><p>Full-stack systems, business software, and secure web applications.</p></div><div><span>APPROACH</span><p>Write clean, efficient code and deliver thoughtful technology solutions.</p></div><div><span>FOCUS</span><p>Practical web applications and integrated business systems.</p></div></div></div></div>
        </section>

        <section className="projects-section section-wrap" id="projects">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 02 / SELECTED SYSTEMS</p><span className="section-aside">FULL-STACK PROJECT SHOWCASE</span></div>
          <div className="projects-heading"><div><h2>Systems, <em>in practice.</em></h2><p>Retail operations, field services, education, and rentals, shaped into useful web applications. Project previews are illustrative mockups, not screenshots.</p></div><a className="all-projects-link" href="#contact">Have a project in mind? <ArrowUpRight size={15} /></a></div>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}</div>
          <div className="projects-footnote"><span className="footnote-marker">i</span><p>Interface previews are illustrative mockups, not project screenshots. Public repository and live demo links were not included in the supplied résumé.</p></div>
        </section>

        <section className="skills-section section-wrap" id="skills">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 03 / TOOLKIT</p><span className="section-aside">TECHNOLOGIES & PRACTICES</span></div>
          <div className="skills-grid"><div className="skills-intro"><h2>Tools I work <em>with.</em></h2><p>Technologies, methods, and platforms from my work across SAP development and full-stack applications.</p><span className="skills-index">SKILLS.JSON <ArrowDownRight size={14} /></span></div><div className="skill-groups">{skillGroups.map((group, index) => <div className="skill-group" key={group.name}><div className="skill-group-label"><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.name}</h3></div><div className="tag-list">{group.skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div></div>)}</div></div>
        </section>

        <section className="experience-section section-wrap" id="experience">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 04 / THE JOURNEY</p><span className="section-aside">OPTIONAL · UPDATE AS YOU GO</span></div>
          <div className="journey-grid"><div><h2>Experience &<br /><em>education.</em></h2><p>Professional work, freelance projects, and the foundation behind them.</p></div><div className="journey-columns"><JourneyList title="EXPERIENCE" entries={experience} empty="No experience listed." /><JourneyList title="EDUCATION" entries={education} empty="No education listed." /></div><div className="credential-list"><div className="credential-heading"><h3>CERTIFICATIONS & CREDENTIALS</h3><span>{certifications.length} ITEMS</span></div><div className="credential-grid">{certifications.map((credential) => <article className="credential-card" key={credential.name}><h4>{credential.name}</h4><p>{credential.issuer}</p><span>{[credential.date, credential.note].filter(Boolean).join(' · ')}</span></article>)}</div></div></div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> 05 / CONTACT</p><span className="section-aside">A CONVERSATION STARTS HERE</span></div>
          <div className="contact-grid"><div><h2>Let’s build something <em>useful.</em></h2><p>For opportunities, collaborations, or project inquiries, reach me through any of these channels.</p><p className="contact-location"><Globe2 size={14} /> {contact.location}</p></div><div className="contact-details">{contactLinks.map((link) => <a className="contact-link" href={link.href} key={link.label} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}><span className="contact-icon"><ArrowUpRight size={16} /></span><span>{link.label}<small>{link.value}</small></span></a>)}</div></div>
          <footer className="site-footer"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-icon"><Code2 size={16} /></span><span>EDGAR BASILAN<small>FULL-STACK DEVELOPER</small></span></a><span>BUILT WITH INTENTION · 2026</span><a href="#home">BACK TO TOP <ArrowRight size={14} /></a></footer>
        </section>
      </main>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

function JourneyList({ title, entries, empty }) {
  return <div className="journey-column"><h3>{title}</h3>{entries.length ? entries.map((entry) => <article className="journey-entry" key={`${entry.organization}-${entry.period}`}><span>{entry.period}</span><h4>{entry.position}</h4><p>{entry.organization}</p>{entry.highlights.length > 0 && <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</article>) : <p className="journey-empty">{empty}</p>}</div>
}

export default App