/* ==========================================================================
   ATS RESUME STUDIO - CORE APP JAVASCRIPT
   ========================================================================== */

// 1. DEFAULT VERIFIED RESUME DATA (Strict facts only, zero invented claims)
const DEFAULT_RESUME_DATA = {
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
      institution: "Purnea College of Engineering, Purnia | Bihar Engineering University",
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
      name: "PCE Mechatronics – Class Management & Student Dashboard",
      subtitle: "",
      tech: "React.js, Node.js, React Native",
      bullets: [
        "Built a college class-management platform for the Class Representative to manage attendance, student information, class routines, notices, holidays, and academic statistics.",
        "Developed personalized student profiles and dashboards with graphical and detailed views of individual academic data.",
        "Built web and mobile interfaces using React.js, Node.js, and React Native, with the application actively used by the class."
      ]
    },
    {
      id: "proj-2",
      name: "Mr Candy – Online Grocery Delivery Application",
      subtitle: "Under Development",
      tech: "React.js, Tailwind CSS, Node.js, Supabase, PostgreSQL, GPS tracking",
      bullets: [
        "Building a full-stack online grocery delivery application focused on simplifying digital ordering for a local grocery business.",
        "Developing customer and operational workflows using React.js, Node.js, Supabase, and PostgreSQL.",
        "Integrating GPS tracking to support delivery-oriented functionality and improve order visibility."
      ]
    },
    {
      id: "proj-3",
      name: "Floating Webcam – Screen & Camera Recording Utility",
      subtitle: "macOS Desktop Utility",
      tech: "Electron.js, JavaScript, OpenCV",
      bullets: [
        "Built a macOS desktop recording utility using Electron.js and OpenCV for simultaneous screen and webcam recording.",
        "Added audio recording support to create a complete screen-recording workflow.",
        "Built the tool as a practical alternative to subscription-based recording software and currently use it for personal screen-recording work."
      ]
    },
    {
      id: "proj-4",
      name: "MROOPS – Peer Learning Platform",
      subtitle: "",
      tech: "React.js, Node.js",
      bullets: [
        "Built a peer-learning platform for semester-mates to access C programming lectures, notes, and solutions in one place.",
        "Developed the platform using React.js and Node.js with a focus on simple access to course material.",
        "Deployed the platform for student use and maintained it as a practical academic resource."
      ]
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "Participant, FedEx Smart Hackathon",
      organization: "Shaastra 2026, IIT Madras / FedEx SMART Initiative",
      bullet: "Worked on a debt-management problem focused on presenting data through an accessible dashboard and explored a data-pipeline-based approach for organizing and presenting the information."
    }
  ],

  leadership: [
    {
      id: "lead-1",
      title: "Class Representative (CR)",
      organization: "Purnea College of Engineering (3rd Semester)",
      bullets: [
        "Serve as the primary communication bridge between students and faculty, coordinating academic announcements and class schedule updates.",
        "Manage class attendance workflows, student academic records, and routine class coordination."
      ]
    }
  ]
};

// 2. STATE MANAGEMENT & STORAGE
let state = loadState();
let currentZoom = 1.0;

function loadState() {
  try {
    const saved = localStorage.getItem("ats_resume_data_v1");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load saved state", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA));
}

function saveState() {
  try {
    localStorage.setItem("ats_resume_data_v1", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
}

// 3. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  populateEditorFields();
  renderPreview();
  checkPageFit();
});

// Tab Switcher
function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

  event.target.classList.add("active");
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add("active");
}

// 4. EDITOR POPULATION & EVENT HANDLERS
function populateEditorFields() {
  // Personal info
  setInputValue("input-fullName", state.fullName);
  setInputValue("input-headline", state.headline);
  setInputValue("input-location", state.location);
  setInputValue("input-phone", state.phone);
  setInputValue("input-email", state.email);
  setInputValue("input-linkedin", state.linkedin);
  setInputValue("input-github", state.github);

  // Summary
  setInputValue("input-summary", state.summary);

  // Skills
  setInputValue("input-skills-languages", state.skills.languages);
  setInputValue("input-skills-frontend", state.skills.frontend);
  setInputValue("input-skills-backend", state.skills.backend);
  setInputValue("input-skills-databases", state.skills.databases);
  setInputValue("input-skills-mobile", state.skills.mobile);
  setInputValue("input-skills-desktop", state.skills.desktop);
  setInputValue("input-skills-design", state.skills.design);
  setInputValue("input-skills-tools", state.skills.tools);

  // Dynamic Array Editors
  renderEducationEditor();
  renderProjectsEditor();
  renderCertEditor();
  renderLeadershipEditor();
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
}

function handleInputChange() {
  // Sync basic inputs to state
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

// 5. DYNAMIC ARRAYS EDITORS (Education, Projects, Certs, Leadership)

// --- EDUCATION ---
function renderEducationEditor() {
  const container = document.getElementById("education-items-container");
  if (!container) return;
  container.innerHTML = "";

  state.education.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "editor-card";
    card.innerHTML = `
      <div class="card-header-actions">
        <span class="card-title">Education Entry #${index + 1}</span>
        <button class="btn btn-danger btn-small" onclick="removeEducationItem(${index})">Remove</button>
      </div>
      <div class="form-group">
        <label>Degree / Qualification</label>
        <input type="text" value="${escapeHtml(item.degree)}" oninput="updateEdu(${index}, 'degree', this.value)">
      </div>
      <div class="form-group">
        <label>Institution & Board / University</label>
        <input type="text" value="${escapeHtml(item.institution)}" oninput="updateEdu(${index}, 'institution', this.value)">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Years / Duration</label>
          <input type="text" value="${escapeHtml(item.period)}" oninput="updateEdu(${index}, 'period', this.value)">
        </div>
        <div class="form-group">
          <label>CGPA / Semester Details</label>
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
    degree: "Degree / Course Name",
    institution: "University / Institution Name",
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

// --- PROJECTS ---
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
        <button class="btn btn-danger btn-small" onclick="removeProjectItem(${pIdx})">Remove Project</button>
      </div>
      <div class="form-group">
        <label>Project Name</label>
        <input type="text" value="${escapeHtml(proj.name)}" oninput="updateProject(${pIdx}, 'name', this.value)">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Status / Subtitle (Optional)</label>
          <input type="text" value="${escapeHtml(proj.subtitle || '')}" oninput="updateProject(${pIdx}, 'subtitle', this.value)">
        </div>
        <div class="form-group">
          <label>Tech Stack</label>
          <input type="text" value="${escapeHtml(proj.tech)}" oninput="updateProject(${pIdx}, 'tech', this.value)">
        </div>
      </div>
      <div class="bullets-editor">
        <label>Bullet Points (Honest, ATS impact statements)</label>
        ${bulletsHtml}
        <button class="btn btn-small btn-secondary" onclick="addProjectBullet(${pIdx})">+ Add Bullet Point</button>
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

// --- CERTIFICATIONS ---
function renderCertEditor() {
  const container = document.getElementById("cert-items-container");
  if (!container) return;
  container.innerHTML = "";

  state.certifications.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "editor-card";
    card.innerHTML = `
      <div class="card-header-actions">
        <span class="card-title">Certification / Hackathon #${index + 1}</span>
        <button class="btn btn-danger btn-small" onclick="removeCertItem(${index})">Remove</button>
      </div>
      <div class="form-group">
        <label>Title / Role</label>
        <input type="text" value="${escapeHtml(item.title)}" oninput="updateCert(${index}, 'title', this.value)">
      </div>
      <div class="form-group">
        <label>Organization / Event Details</label>
        <input type="text" value="${escapeHtml(item.organization)}" oninput="updateCert(${index}, 'organization', this.value)">
      </div>
      <div class="form-group">
        <label>Honest Bullet / Activity Description</label>
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
    title: "Participant / Certificate Name",
    organization: "Event / Organization",
    bullet: "Participated and built solution during technical event."
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

// --- LEADERSHIP ---
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
        <label>Position / Role Title</label>
        <input type="text" value="${escapeHtml(lead.title)}" oninput="updateLeadership(${lIdx}, 'title', this.value)">
      </div>
      <div class="form-group">
        <label>Organization / Scope</label>
        <input type="text" value="${escapeHtml(lead.organization)}" oninput="updateLeadership(${lIdx}, 'organization', this.value)">
      </div>
      <div class="bullets-editor">
        <label>Key Responsibilities</label>
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
  state.leadership[lIdx].bullets.push("Coordinated student and organizational initiatives.");
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
    title: "Leadership Role Title",
    organization: "Organization / Institution",
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

// 6. PREVIEW RENDERER (Clean ATS single-column layout)
function renderPreview() {
  // Header
  setTextContent("preview-fullName", state.fullName);
  setTextContent("preview-headline", state.headline);

  // Contact Bar with Clickable Links
  const contactBar = document.getElementById("preview-contactBar");
  if (contactBar) {
    const parts = [];
    if (state.location) parts.push(`<span>${escapeHtml(state.location)}</span>`);
    if (state.phone) parts.push(`<span>${escapeHtml(state.phone)}</span>`);
    if (state.email) parts.push(`<a href="mailto:${escapeHtml(state.email)}">${escapeHtml(state.email)}</a>`);
    if (state.linkedin) parts.push(`<a href="${escapeHtml(state.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
    if (state.github) parts.push(`<a href="${escapeHtml(state.github)}" target="_blank" rel="noopener">GitHub</a>`);

    contactBar.innerHTML = parts.join(' <span class="contact-sep">•</span> ');
  }

  // Summary
  setTextContent("preview-summary", state.summary);
  toggleSectionVisibility("sec-summary", !!state.summary.trim());

  // Education
  const eduContainer = document.getElementById("preview-education-list");
  if (eduContainer) {
    eduContainer.innerHTML = state.education.map(item => `
      <div class="entry-item">
        <div class="entry-head">
          <span class="entry-title">${escapeHtml(item.degree)}</span>
          <span class="entry-date">${escapeHtml(item.period)}</span>
        </div>
        <div class="entry-head">
          <span class="entry-subtitle">${escapeHtml(item.institution)}</span>
          <span class="entry-location">${escapeHtml(item.details)}</span>
        </div>
      </div>
    `).join("");
  }
  toggleSectionVisibility("sec-education", state.education.length > 0);

  // Skills
  const skillsContainer = document.getElementById("preview-skills-grid");
  if (skillsContainer) {
    const s = state.skills;
    const lines = [];
    if (s.languages) lines.push(`<div class="skill-line"><span class="skill-category">Programming Languages:</span> ${escapeHtml(s.languages)}</div>`);
    if (s.frontend) lines.push(`<div class="skill-line"><span class="skill-category">Frontend:</span> ${escapeHtml(s.frontend)}</div>`);
    if (s.backend) lines.push(`<div class="skill-line"><span class="skill-category">Backend:</span> ${escapeHtml(s.backend)}</div>`);
    if (s.databases) lines.push(`<div class="skill-line"><span class="skill-category">Databases & Services:</span> ${escapeHtml(s.databases)}</div>`);
    if (s.mobile) lines.push(`<div class="skill-line"><span class="skill-category">Mobile:</span> ${escapeHtml(s.mobile)}</div>`);
    if (s.desktop) lines.push(`<div class="skill-line"><span class="skill-category">Desktop & Computer Vision:</span> ${escapeHtml(s.desktop)}</div>`);
    if (s.design) lines.push(`<div class="skill-line"><span class="skill-category">Design:</span> ${escapeHtml(s.design)}</div>`);
    if (s.tools) lines.push(`<div class="skill-line"><span class="skill-category">Developer Tools:</span> ${escapeHtml(s.tools)}</div>`);

    skillsContainer.innerHTML = lines.join("");
  }

  // Projects
  const projContainer = document.getElementById("preview-projects-list");
  if (projContainer) {
    projContainer.innerHTML = state.projects.map(proj => {
      const sub = proj.subtitle ? ` <span style="font-weight: normal; color: #475569;">(${escapeHtml(proj.subtitle)})</span>` : '';
      const bullets = proj.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("");
      return `
        <div class="entry-item">
          <div class="entry-head">
            <span class="entry-title">${escapeHtml(proj.name)}${sub}</span>
          </div>
          ${proj.tech ? `<div class="entry-tech">Technologies: ${escapeHtml(proj.tech)}</div>` : ''}
          <ul class="entry-bullets">
            ${bullets}
          </ul>
        </div>
      `;
    }).join("");
  }
  toggleSectionVisibility("sec-projects", state.projects.length > 0);

  // Certifications / Hackathons
  const certContainer = document.getElementById("preview-cert-list");
  if (certContainer) {
    certContainer.innerHTML = state.certifications.map(item => `
      <div class="entry-item">
        <div class="entry-head">
          <span class="entry-title">${escapeHtml(item.title)}</span>
        </div>
        <div class="entry-subtitle">${escapeHtml(item.organization)}</div>
        ${item.bullet ? `<ul class="entry-bullets"><li>${escapeHtml(item.bullet)}</li></ul>` : ''}
      </div>
    `).join("");
  }
  toggleSectionVisibility("sec-certification", state.certifications.length > 0);

  // Leadership
  const leadContainer = document.getElementById("preview-leadership-list");
  if (leadContainer) {
    leadContainer.innerHTML = state.leadership.map(lead => {
      const bullets = lead.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("");
      return `
        <div class="entry-item">
          <div class="entry-head">
            <span class="entry-title">${escapeHtml(lead.title)}</span>
          </div>
          <div class="entry-subtitle">${escapeHtml(lead.organization)}</div>
          <ul class="entry-bullets">
            ${bullets}
          </ul>
        </div>
      `;
    }).join("");
  }
  toggleSectionVisibility("sec-leadership", state.leadership.length > 0);
}

function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || "";
}

function toggleSectionVisibility(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? "block" : "none";
}

// 7. UTILITY & FIT CHECKING
function checkPageFit() {
  setTimeout(() => {
    const paper = document.getElementById("resume-paper");
    const fitBadge = document.getElementById("page-fit-badge");
    if (!paper || !fitBadge) return;

    // Standard A4 pixel height benchmark (approx 1122px at standard DPI)
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

function updateSpacing(density) {
  const paper = document.getElementById("resume-paper");
  if (!paper) return;
  paper.classList.remove("density-normal", "density-compact", "density-tight");
  paper.classList.add(`density-${density}`);
  checkPageFit();
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
