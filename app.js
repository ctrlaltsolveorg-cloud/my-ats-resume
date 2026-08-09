/* ==========================================================================
   ATS RESUME STUDIO - CORE APP JAVASCRIPT
   ========================================================================== */

// 1. DEFAULT VERIFIED RESUME DATA (Strict facts only, zero invented claims)
const DEFAULT_RESUME_DATA = {
  template: "timeline", // "timeline" or "classic"
  spacing: "compact",
  sidebarBg: "none", // "none", "soft", "dark"

  fullName: "PIYUSH KUMAR",
  headline: "Full Stack Developer | Product Builder | Mechatronics & Data Science Student",
  location: "Purnia, Bihar, India",
  phone: "+91 9162162128",
  email: "ctrl.alt.solve.org@gmail.com",
  linkedin: "https://www.linkedin.com/in/piyush-kumar-patel-a6a294376/",
  github: "https://github.com/ctrlaltsolveorg-cloud",

  summary: "Interdisciplinary engineering student passionate about building practical technology products by combining software development, data science, product thinking, and engineering principles. Experienced in full-stack development and building user-focused applications, with hands-on experience developing software for real-world college and business use cases.",

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology (B.Tech) – Mechatronics Engineering",
      institution: "Purnea College of Engineering, Purnia | BEU",
      period: "2025 – 2029",
      details: "CGPA: 7.2 | Currently in 3rd Semester"
    },
    {
      id: "edu-2",
      degree: "BS in Data Science and Applications",
      institution: "Indian Institute of Technology Madras",
      period: "May 2025 – 2029",
      details: "Foundation Level II | CGPA: 6.5"
    }
  ],

  skills: {
    languages: "C, Python, JavaScript, SQL",
    frontend: "HTML, CSS, React.js, Next.js, Tailwind CSS",
    backend: "Node.js, REST APIs",
    databases: "PostgreSQL, MySQL, Supabase, Firebase",
    mobile: "React Native",
    desktop: "Electron.js, OpenCV",
    design: "Figma, Adobe Photoshop, Canva",
    tools: "Git, GitHub, VS Code, Vercel"
  },

  projects: [
    {
      id: "proj-1",
      name: "PCE Mechatronics – Class Management & Dashboard",
      subtitle: "Active Class App",
      tech: "React.js, Node.js, React Native",
      bullets: [
        "Built a college class-management platform for the Class Representative to manage attendance, student information, class routines, notices, holidays, and academic statistics.",
        "Developed personalized student profiles and dashboards with graphical and detailed views of individual academic data.",
        "Built web and mobile interfaces using React.js, Node.js, and React Native, with application actively used by class."
      ]
    },
    {
      id: "proj-2",
      name: "Mr Candy – Online Grocery Delivery Application",
      subtitle: "Under Development",
      tech: "React.js, Tailwind CSS, Node.js, Supabase, PostgreSQL, GPS",
      bullets: [
        "Building full-stack online grocery delivery application focused on simplifying digital ordering for local grocery business.",
        "Developing customer and operational workflows using React.js, Node.js, Supabase, and PostgreSQL.",
        "Integrating GPS tracking to support delivery-oriented functionality and order visibility."
      ]
    },
    {
      id: "proj-3",
      name: "Floating Webcam – Screen & Camera Recording Utility",
      subtitle: "macOS Desktop Utility",
      tech: "Electron.js, JavaScript, OpenCV",
      bullets: [
        "Built macOS desktop recording utility using Electron.js and OpenCV for simultaneous screen and webcam recording.",
        "Added audio recording support to create complete screen-recording workflow.",
        "Built tool as practical alternative to subscription software for personal screen-recording work."
      ]
    },
    {
      id: "proj-4",
      name: "MROOPS – Peer Learning Platform",
      subtitle: "Academic Platform",
      tech: "React.js, Node.js",
      bullets: [
        "Built peer-learning platform for semester-mates to access C programming lectures, notes, and solutions in one place.",
        "Developed platform using React.js and Node.js with focus on simple access to course material.",
        "Deployed platform for student use and maintained it as a practical academic resource."
      ]
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "Participant, FedEx Smart Hackathon",
      organization: "Shaastra 2026, IIT Madras / FedEx SMART Initiative",
      bullet: "Worked on debt-management problem focused on presenting data through accessible dashboard and explored data-pipeline-based approach for organizing information."
    }
  ],

  leadership: [
    {
      id: "lead-1",
      title: "Class Representative (CR)",
      organization: "Purnea College of Engineering (3rd Semester)",
      bullets: [
        "Serve as primary communication bridge between students and faculty, coordinating academic announcements and schedule updates.",
        "Manage class attendance workflows, student academic records, and routine class coordination."
      ]
    }
  ]
};

// 2. STATE & STORAGE
let state = loadState();
let currentZoom = 1.0;

function loadState() {
  try {
    const saved = localStorage.getItem("ats_resume_data_v3");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load state", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA));
}

function saveState() {
  try {
    localStorage.setItem("ats_resume_data_v3", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
}

// 3. INITIALIZATION & VIEW NAVIGATION
document.addEventListener("DOMContentLoaded", () => {
  populateEditorFields();
  renderPreview();
  showLanding(); // Default view is the Landing Showcase
});

function showLanding() {
  const landing = document.getElementById("landing-page");
  const editor = document.getElementById("editor-workspace");
  if (landing) landing.style.display = "flex";
  if (editor) editor.style.display = "none";

  document.querySelectorAll(".editor-only-control").forEach(el => el.style.display = "none");
}

function showEditor() {
  const landing = document.getElementById("landing-page");
  const editor = document.getElementById("editor-workspace");
  if (landing) landing.style.display = "none";
  if (editor) editor.style.display = "flex";

  document.querySelectorAll(".editor-only-control").forEach(el => el.style.display = "flex");

  renderPreview();
  checkPageFit();
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

  event.target.classList.add("active");
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add("active");
}

// 4. EDITOR POPULATION
function populateEditorFields() {
  setSelectValue("template-select", state.template || "timeline");
  setSelectValue("spacing-select", state.spacing || "compact");
  setSelectValue("sidebar-select", state.sidebarBg || "none");

  setInputValue("input-fullName", state.fullName);
  setInputValue("input-headline", state.headline);
  setInputValue("input-location", state.location);
  setInputValue("input-phone", state.phone);
  setInputValue("input-email", state.email);
  setInputValue("input-linkedin", state.linkedin);
  setInputValue("input-github", state.github);

  setInputValue("input-summary", state.summary);

  setInputValue("input-skills-languages", state.skills.languages);
  setInputValue("input-skills-frontend", state.skills.frontend);
  setInputValue("input-skills-backend", state.skills.backend);
  setInputValue("input-skills-databases", state.skills.databases);
  setInputValue("input-skills-mobile", state.skills.mobile);
  setInputValue("input-skills-desktop", state.skills.desktop);
  setInputValue("input-skills-design", state.skills.design);
  setInputValue("input-skills-tools", state.skills.tools);

  renderEducationEditor();
  renderProjectsEditor();
  renderCertEditor();
  renderLeadershipEditor();
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
}

function setSelectValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function handleInputChange() {
  state.fullName = getInputValue("input-fullName");
  state.headline = getInputValue("input-headline");
  state.location = getInputValue("input-location");
  state.phone = getInputValue("input-phone");
  state.email = getInputValue("input-email");
  state.linkedin = getInputValue("input-linkedin");
  state.github = getInputValue("input-github");

  state.summary = getInputValue("input-summary");

  state.skills.languages = getInputValue("input-skills-languages");
  state.skills.frontend = getInputValue("input-skills-frontend");
  state.skills.backend = getInputValue("input-skills-backend");
  state.skills.databases = getInputValue("input-skills-databases");
  state.skills.mobile = getInputValue("input-skills-mobile");
  state.skills.desktop = getInputValue("input-skills-desktop");
  state.skills.design = getInputValue("input-skills-design");
  state.skills.tools = getInputValue("input-skills-tools");

  saveState();
  renderPreview();
  checkPageFit();
}

function getInputValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}

// 5. ARRAY EDITORS
function renderEducationEditor() {
  const container = document.getElementById("education-items-container");
  if (!container) return;
  container.innerHTML = "";

  state.education.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "editor-card";
    card.innerHTML = `
      <div class="card-header-actions">
        <span class="card-title">Education #${index + 1}</span>
        <button class="btn btn-danger btn-small" onclick="removeEducationItem(${index})">Remove</button>
      </div>
      <div class="form-group">
        <label>Degree / Qualification</label>
        <input type="text" value="${escapeHtml(item.degree)}" oninput="updateEdu(${index}, 'degree', this.value)">
      </div>
      <div class="form-group">
        <label>Institution</label>
        <input type="text" value="${escapeHtml(item.institution)}" oninput="updateEdu(${index}, 'institution', this.value)">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Years</label>
          <input type="text" value="${escapeHtml(item.period)}" oninput="updateEdu(${index}, 'period', this.value)">
        </div>
        <div class="form-group">
          <label>CGPA / Details</label>
          <input type="text" value="${escapeHtml(item.details)}" oninput="updateEdu(${index}, 'details', this.value)">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateEdu(index, field, value) {
  state.education[index][field] = value;
  saveState();
  renderPreview();
  checkPageFit();
}

function addEducationItem() {
  state.education.push({
    id: "edu-" + Date.now(),
    degree: "Degree Name",
    institution: "Institution",
    period: "2025 – 2029",
    details: "CGPA: 7.0"
  });
  saveState();
  renderEducationEditor();
  renderPreview();
  checkPageFit();
}

function removeEducationItem(index) {
  state.education.splice(index, 1);
  saveState();
  renderEducationEditor();
  renderPreview();
  checkPageFit();
}

function renderProjectsEditor() {
  const container = document.getElementById("projects-items-container");
  if (!container) return;
  container.innerHTML = "";

  state.projects.forEach((proj, pIdx) => {
    const card = document.createElement("div");
    card.className = "editor-card";

    let bulletsHtml = proj.bullets.map((b, bIdx) => `
      <div class="bullet-item">
        <textarea rows="2" oninput="updateProjectBullet(${pIdx}, ${bIdx}, this.value)">${escapeHtml(b)}</textarea>
        <button class="btn btn-danger btn-small" onclick="removeProjectBullet(${pIdx}, ${bIdx})">×</button>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="card-header-actions">
        <span class="card-title">Project #${pIdx + 1}: ${escapeHtml(proj.name)}</span>
        <button class="btn btn-danger btn-small" onclick="removeProjectItem(${pIdx})">Remove</button>
      </div>
      <div class="form-group">
        <label>Project Name</label>
        <input type="text" value="${escapeHtml(proj.name)}" oninput="updateProject(${pIdx}, 'name', this.value)">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Subtitle / Status</label>
          <input type="text" value="${escapeHtml(proj.subtitle || '')}" oninput="updateProject(${pIdx}, 'subtitle', this.value)">
        </div>
        <div class="form-group">
          <label>Tech Stack</label>
          <input type="text" value="${escapeHtml(proj.tech)}" oninput="updateProject(${pIdx}, 'tech', this.value)">
        </div>
      </div>
      <div class="bullets-editor">
        <label>Bullets</label>
        ${bulletsHtml}
        <button class="btn btn-small btn-secondary" onclick="addProjectBullet(${pIdx})">+ Add Bullet</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateProject(pIdx, field, val) {
  state.projects[pIdx][field] = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function updateProjectBullet(pIdx, bIdx, val) {
  state.projects[pIdx].bullets[bIdx] = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function addProjectBullet(pIdx) {
  state.projects[pIdx].bullets.push("Developed feature using key technologies to achieve project goals.");
  saveState();
  renderProjectsEditor();
  renderPreview();
  checkPageFit();
}

function removeProjectBullet(pIdx, bIdx) {
  state.projects[pIdx].bullets.splice(bIdx, 1);
  saveState();
  renderProjectsEditor();
  renderPreview();
  checkPageFit();
}

function addProjectItem() {
  state.projects.push({
    id: "proj-" + Date.now(),
    name: "New Technical Project",
    subtitle: "",
    tech: "React.js, Node.js",
    bullets: ["Built application to solve specific domain problem."]
  });
  saveState();
  renderProjectsEditor();
  renderPreview();
  checkPageFit();
}

function removeProjectItem(pIdx) {
  state.projects.splice(pIdx, 1);
  saveState();
  renderProjectsEditor();
  renderPreview();
  checkPageFit();
}

function renderCertEditor() {
  const container = document.getElementById("cert-items-container");
  if (!container) return;
  container.innerHTML = "";

  state.certifications.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "editor-card";
    card.innerHTML = `
      <div class="card-header-actions">
        <span class="card-title">Cert / Hackathon #${index + 1}</span>
        <button class="btn btn-danger btn-small" onclick="removeCertItem(${index})">Remove</button>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" value="${escapeHtml(item.title)}" oninput="updateCert(${index}, 'title', this.value)">
      </div>
      <div class="form-group">
        <label>Organization</label>
        <input type="text" value="${escapeHtml(item.organization)}" oninput="updateCert(${index}, 'organization', this.value)">
      </div>
      <div class="form-group">
        <label>Description Bullet</label>
        <textarea rows="2" oninput="updateCert(${index}, 'bullet', this.value)">${escapeHtml(item.bullet)}</textarea>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateCert(index, field, val) {
  state.certifications[index][field] = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function addCertItem() {
  state.certifications.push({
    id: "cert-" + Date.now(),
    title: "Participant / Certificate",
    organization: "Event / Organization",
    bullet: "Participated and built technical solution."
  });
  saveState();
  renderCertEditor();
  renderPreview();
  checkPageFit();
}

function removeCertItem(index) {
  state.certifications.splice(index, 1);
  saveState();
  renderCertEditor();
  renderPreview();
  checkPageFit();
}

function renderLeadershipEditor() {
  const container = document.getElementById("leadership-items-container");
  if (!container) return;
  container.innerHTML = "";

  state.leadership.forEach((lead, lIdx) => {
    const card = document.createElement("div");
    card.className = "editor-card";

    let bulletsHtml = lead.bullets.map((b, bIdx) => `
      <div class="bullet-item">
        <textarea rows="2" oninput="updateLeadershipBullet(${lIdx}, ${bIdx}, this.value)">${escapeHtml(b)}</textarea>
        <button class="btn btn-danger btn-small" onclick="removeLeadershipBullet(${lIdx}, ${bIdx})">×</button>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="card-header-actions">
        <span class="card-title">Leadership Role #${lIdx + 1}</span>
        <button class="btn btn-danger btn-small" onclick="removeLeadershipItem(${lIdx})">Remove</button>
      </div>
      <div class="form-group">
        <label>Role Title</label>
        <input type="text" value="${escapeHtml(lead.title)}" oninput="updateLeadership(${lIdx}, 'title', this.value)">
      </div>
      <div class="form-group">
        <label>Organization</label>
        <input type="text" value="${escapeHtml(lead.organization)}" oninput="updateLeadership(${lIdx}, 'organization', this.value)">
      </div>
      <div class="bullets-editor">
        <label>Bullets</label>
        ${bulletsHtml}
        <button class="btn btn-small btn-secondary" onclick="addLeadershipBullet(${lIdx})">+ Add Bullet</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateLeadership(lIdx, field, val) {
  state.leadership[lIdx][field] = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function updateLeadershipBullet(lIdx, bIdx, val) {
  state.leadership[lIdx].bullets[bIdx] = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function addLeadershipBullet(lIdx) {
  state.leadership[lIdx].bullets.push("Coordinated student and academic activities.");
  saveState();
  renderLeadershipEditor();
  renderPreview();
  checkPageFit();
}

function removeLeadershipBullet(lIdx, bIdx) {
  state.leadership[lIdx].bullets.splice(bIdx, 1);
  saveState();
  renderLeadershipEditor();
  renderPreview();
  checkPageFit();
}

function addLeadershipItem() {
  state.leadership.push({
    id: "lead-" + Date.now(),
    title: "Leadership Role",
    organization: "Organization",
    bullets: ["Coordinated student and organizational activities."]
  });
  saveState();
  renderLeadershipEditor();
  renderPreview();
  checkPageFit();
}

function removeLeadershipItem(lIdx) {
  state.leadership.splice(lIdx, 1);
  saveState();
  renderLeadershipEditor();
  renderPreview();
  checkPageFit();
}

// 6. DYNAMIC PREVIEW RENDERER
function renderPreview() {
  const paper = document.getElementById("resume-paper");
  if (!paper) return;

  const t = state.template || "timeline";
  const s = state.spacing || "compact";
  const bg = state.sidebarBg || "none";

  paper.className = `resume-paper density-${s} template-${t} sidebar-${bg}`;

  if (t === "timeline") {
    renderTimelineTemplate(paper);
  } else {
    renderClassicTemplate(paper);
  }
}

// TEMPLATE 2: MODERN EXECUTIVE TIMELINE
function renderTimelineTemplate(paper) {
  const s = state.skills;

  const projectsHtml = state.projects.map(p => `
    <div class="timeline-entry">
      <div class="entry-header-row">
        <span class="timeline-title">${escapeHtml(p.name)}</span>
        ${p.subtitle ? `<span class="timeline-date">${escapeHtml(p.subtitle)}</span>` : ''}
      </div>
      ${p.tech ? `<div class="timeline-tech">Tech: ${escapeHtml(p.tech)}</div>` : ''}
      <ul class="timeline-bullets">
        ${p.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  const eduHtml = state.education.map(e => `
    <div class="timeline-entry">
      <div class="entry-header-row">
        <span class="timeline-title">${escapeHtml(e.degree)}</span>
        <span class="timeline-date">${escapeHtml(e.period)}</span>
      </div>
      <div class="timeline-sub">${escapeHtml(e.institution)} (${escapeHtml(e.details)})</div>
    </div>
  `).join("");

  const certHtml = state.certifications.map(c => `
    <div class="timeline-entry">
      <div class="entry-header-row">
        <span class="timeline-title">${escapeHtml(c.title)}</span>
      </div>
      <div class="timeline-sub">${escapeHtml(c.organization)}</div>
      ${c.bullet ? `<ul class="timeline-bullets"><li>${escapeHtml(c.bullet)}</li></ul>` : ''}
    </div>
  `).join("");

  const leadHtml = state.leadership.map(l => `
    <div class="sidebar-skill-group">
      <h4>${escapeHtml(l.title)}</h4>
      <p style="font-weight:600;">${escapeHtml(l.organization)}</p>
      <ul style="padding-left:12px; font-size:7.5pt; margin-top:2px;">
        ${l.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  paper.innerHTML = `
    <header class="timeline-header">
      <h1>${escapeHtml(state.fullName)}</h1>
      <div class="timeline-headline">${escapeHtml(state.headline)}</div>
    </header>

    <div class="timeline-layout">
      <aside class="timeline-sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-section-title">CONTACT</h3>
          <div class="contact-list">
            ${state.phone ? `<div class="contact-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <span>${escapeHtml(state.phone)}</span></div>` : ''}
            ${state.email ? `<div class="contact-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <a href="mailto:${escapeHtml(state.email)}">${escapeHtml(state.email)}</a></div>` : ''}
            ${state.location ? `<div class="contact-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <span>${escapeHtml(state.location)}</span></div>` : ''}
            ${state.linkedin ? `<div class="contact-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> <a href="${escapeHtml(state.linkedin)}" target="_blank">LinkedIn</a></div>` : ''}
            ${state.github ? `<div class="contact-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> <a href="${escapeHtml(state.github)}" target="_blank">GitHub</a></div>` : ''}
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-section-title">SKILLS</h3>
          ${s.languages ? `<div class="sidebar-skill-group"><h4>Languages</h4><p>${escapeHtml(s.languages)}</p></div>` : ''}
          ${s.frontend ? `<div class="sidebar-skill-group"><h4>Frontend</h4><p>${escapeHtml(s.frontend)}</p></div>` : ''}
          ${s.backend ? `<div class="sidebar-skill-group"><h4>Backend</h4><p>${escapeHtml(s.backend)}</p></div>` : ''}
          ${s.databases ? `<div class="sidebar-skill-group"><h4>Databases</h4><p>${escapeHtml(s.databases)}</p></div>` : ''}
          ${s.mobile ? `<div class="sidebar-skill-group"><h4>Mobile</h4><p>${escapeHtml(s.mobile)}</p></div>` : ''}
          ${s.desktop ? `<div class="sidebar-skill-group"><h4>Desktop/CV</h4><p>${escapeHtml(s.desktop)}</p></div>` : ''}
          ${s.tools ? `<div class="sidebar-skill-group"><h4>Tools</h4><p>${escapeHtml(s.tools)}</p></div>` : ''}
        </div>

        ${state.leadership.length > 0 ? `
          <div class="sidebar-section">
            <h3 class="sidebar-section-title">LEADERSHIP</h3>
            ${leadHtml}
          </div>
        ` : ''}
      </aside>

      <main class="timeline-main">
        ${state.summary ? `
          <div class="timeline-section">
            <div class="timeline-icon-badge" title="Profile Summary">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h3 class="main-section-title">PROFILE</h3>
            <p class="timeline-summary">${escapeHtml(state.summary)}</p>
          </div>
        ` : ''}

        ${state.projects.length > 0 ? `
          <div class="timeline-section">
            <div class="timeline-icon-badge" title="Projects & Experience">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <h3 class="main-section-title">PROJECTS & EXPERIENCE</h3>
            ${projectsHtml}
          </div>
        ` : ''}

        ${state.education.length > 0 ? `
          <div class="timeline-section">
            <div class="timeline-icon-badge" title="Education">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <h3 class="main-section-title">EDUCATION</h3>
            ${eduHtml}
          </div>
        ` : ''}

        ${state.certifications.length > 0 ? `
          <div class="timeline-section">
            <div class="timeline-icon-badge" title="Certifications & Hackathons">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            </div>
            <h3 class="main-section-title">CERTIFICATIONS & HACKATHONS</h3>
            ${certHtml}
          </div>
        ` : ''}
      </main>
    </div>
  `;
}

// TEMPLATE 1: CLASSIC SINGLE-COLUMN ATS
function renderClassicTemplate(paper) {
  const contactParts = [];
  if (state.location) contactParts.push(`<span>${escapeHtml(state.location)}</span>`);
  if (state.phone) contactParts.push(`<span>${escapeHtml(state.phone)}</span>`);
  if (state.email) contactParts.push(`<a href="mailto:${escapeHtml(state.email)}">${escapeHtml(state.email)}</a>`);
  if (state.linkedin) contactParts.push(`<a href="${escapeHtml(state.linkedin)}" target="_blank">LinkedIn</a>`);
  if (state.github) contactParts.push(`<a href="${escapeHtml(state.github)}" target="_blank">GitHub</a>`);

  const s = state.skills;
  const skillLines = [];
  if (s.languages) skillLines.push(`<div class="skill-line"><span class="skill-category">Programming Languages:</span> ${escapeHtml(s.languages)}</div>`);
  if (s.frontend) skillLines.push(`<div class="skill-line"><span class="skill-category">Frontend:</span> ${escapeHtml(s.frontend)}</div>`);
  if (s.backend) skillLines.push(`<div class="skill-line"><span class="skill-category">Backend:</span> ${escapeHtml(s.backend)}</div>`);
  if (s.databases) skillLines.push(`<div class="skill-line"><span class="skill-category">Databases & Services:</span> ${escapeHtml(s.databases)}</div>`);
  if (s.mobile) skillLines.push(`<div class="skill-line"><span class="skill-category">Mobile:</span> ${escapeHtml(s.mobile)}</div>`);
  if (s.desktop) skillLines.push(`<div class="skill-line"><span class="skill-category">Desktop & Computer Vision:</span> ${escapeHtml(s.desktop)}</div>`);
  if (s.design) skillLines.push(`<div class="skill-line"><span class="skill-category">Design:</span> ${escapeHtml(s.design)}</div>`);
  if (s.tools) skillLines.push(`<div class="skill-line"><span class="skill-category">Developer Tools:</span> ${escapeHtml(s.tools)}</div>`);

  paper.innerHTML = `
    <header class="resume-header">
      <h1>${escapeHtml(state.fullName)}</h1>
      <p class="resume-headline">${escapeHtml(state.headline)}</p>
      <div class="resume-contact-bar">
        ${contactParts.join(' <span class="contact-sep">•</span> ')}
      </div>
    </header>

    ${state.summary ? `
      <section class="resume-section">
        <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
        <div class="section-divider"></div>
        <p class="summary-text">${escapeHtml(state.summary)}</p>
      </section>
    ` : ''}

    ${state.education.length > 0 ? `
      <section class="resume-section">
        <h2 class="section-title">EDUCATION</h2>
        <div class="section-divider"></div>
        <div class="entries-list">
          ${state.education.map(e => `
            <div class="entry-item">
              <div class="entry-head">
                <span class="entry-title">${escapeHtml(e.degree)}</span>
                <span class="entry-date">${escapeHtml(e.period)}</span>
              </div>
              <div class="entry-head">
                <span class="entry-subtitle">${escapeHtml(e.institution)}</span>
                <span class="entry-location">${escapeHtml(e.details)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    ` : ''}

    ${skillLines.length > 0 ? `
      <section class="resume-section">
        <h2 class="section-title">TECHNICAL SKILLS</h2>
        <div class="section-divider"></div>
        <div class="skills-grid">${skillLines.join("")}</div>
      </section>
    ` : ''}

    ${state.projects.length > 0 ? `
      <section class="resume-section">
        <h2 class="section-title">PROJECTS</h2>
        <div class="section-divider"></div>
        <div class="entries-list">
          ${state.projects.map(p => `
            <div class="entry-item">
              <div class="entry-head">
                <span class="entry-title">${escapeHtml(p.name)}${p.subtitle ? ` <span style="font-weight:normal;color:#475569;">(${escapeHtml(p.subtitle)})</span>` : ''}</span>
              </div>
              ${p.tech ? `<div class="entry-tech">Technologies: ${escapeHtml(p.tech)}</div>` : ''}
              <ul class="entry-bullets">
                ${p.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </section>
    ` : ''}

    ${state.certifications.length > 0 ? `
      <section class="resume-section">
        <h2 class="section-title">CERTIFICATION & HACKATHONS</h2>
        <div class="section-divider"></div>
        <div class="entries-list">
          ${state.certifications.map(c => `
            <div class="entry-item">
              <div class="entry-head"><span class="entry-title">${escapeHtml(c.title)}</span></div>
              <div class="entry-subtitle">${escapeHtml(c.organization)}</div>
              ${c.bullet ? `<ul class="entry-bullets"><li>${escapeHtml(c.bullet)}</li></ul>` : ''}
            </div>
          `).join("")}
        </div>
      </section>
    ` : ''}

    ${state.leadership.length > 0 ? `
      <section class="resume-section">
        <h2 class="section-title">LEADERSHIP</h2>
        <div class="section-divider"></div>
        <div class="entries-list">
          ${state.leadership.map(l => `
            <div class="entry-item">
              <div class="entry-head"><span class="entry-title">${escapeHtml(l.title)}</span></div>
              <div class="entry-subtitle">${escapeHtml(l.organization)}</div>
              <ul class="entry-bullets">
                ${l.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </section>
    ` : ''}
  `;
}

// 7. UTILITIES
function updateTemplate(val) {
  state.template = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function updateSidebarBg(val) {
  state.sidebarBg = val;
  saveState();
  renderPreview();
  checkPageFit();
}

function updateSpacing(density) {
  state.spacing = density;
  saveState();
  renderPreview();
  checkPageFit();
}

function checkPageFit() {
  setTimeout(() => {
    const paper = document.getElementById("resume-paper");
    const fitBadge = document.getElementById("page-fit-badge");
    if (!paper || !fitBadge) return;

    const paperHeight = paper.offsetHeight;
    const maxHeight = 1125; 

    if (paperHeight <= maxHeight) {
      fitBadge.className = "badge-fit badge-fit-success";
      fitBadge.textContent = "✓ Strict 1-Page A4 Fit";
    } else {
      fitBadge.className = "badge-fit badge-fit-warning";
      fitBadge.textContent = `⚠ Overflow (${Math.round(paperHeight - maxHeight)}px) - Change Density to Compact`;
    }
  }, 100);
}

function toggleZoom(delta) {
  currentZoom = Math.min(Math.max(0.6, currentZoom + delta), 1.5);
  const paper = document.getElementById("resume-paper");
  if (paper) {
    paper.style.transform = `scale(${currentZoom})`;
  }
  document.getElementById("zoom-level").textContent = `${Math.round(currentZoom * 100)}%`;
}

function triggerPrint() {
  window.print();
}

function resetToDefault() {
  if (confirm("Are you sure you want to reset all resume content to default verified data?")) {
    state = JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA));
    saveState();
    populateEditorFields();
    renderPreview();
    checkPageFit();
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
