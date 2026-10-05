const root = document.documentElement;
root.lang = 'en';
if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = 'favicon.svg';
  document.head.appendChild(favicon);
}
document.querySelectorAll('.wordmark').forEach((brand) => { brand.innerHTML = '<strong>MF</strong><span>mufra.dev</span>'; });
document.querySelectorAll('.desktop-nav,.mobile-menu').forEach((nav) => {
  if (!nav.querySelector('a[href="about.html"]')) {
    const link = document.createElement('a'); link.href = 'about.html'; link.textContent = 'About';
    nav.insertBefore(link, nav.querySelector('a[href="contact.html"]'));
  }
  ['index.html', 'about.html', 'certificates.html', 'projects.html', 'contact.html'].forEach((href) => {
    const link = nav.querySelector(`a[href="${href}"]`);
    if (link) nav.appendChild(link);
  });
});
const homeLinks = document.querySelector('.home-links');
if (homeLinks && !homeLinks.querySelector('a[href="about.html"]')) {
  const aboutLink = document.createElement('a');
  aboutLink.className = 'feature-link reveal';
  aboutLink.href = 'about.html';
  aboutLink.innerHTML = '<span>About</span><strong>More about me <b>↗</b></strong>';
  homeLinks.insertBefore(aboutLink, homeLinks.firstElementChild);
}
if (homeLinks) {
  const orderedLinks = [
    ['about.html', 'About'],
    ['certificates.html', 'Learning'],
    ['projects.html', 'Building'],
    ['contact.html', 'Connect']
  ];
  orderedLinks.forEach(([href, label]) => { const link = homeLinks.querySelector(`a[href="${href}"]`); if (link) link.querySelector('span').textContent = label; });
}
const themeButton = document.querySelector('.theme-switch');
document.querySelectorAll('.theme-switch').forEach((button) => { button.setAttribute('aria-label', 'Toggle theme'); button.title = 'Toggle theme'; });
document.querySelectorAll('.menu-toggle').forEach((button) => button.setAttribute('aria-label', 'Open navigation menu'));
document.querySelector('#activity-chart')?.setAttribute('aria-label', 'GitHub activity by month');
root.dataset.theme = localStorage.getItem('portfolio-theme') || 'light';

function updateThemeIcon() {
  const dark = root.dataset.theme === 'dark';
  document.querySelector('.icon-sun')?.style.setProperty('display', dark ? 'none' : 'block');
  document.querySelector('.icon-moon')?.style.setProperty('display', dark ? 'block' : 'none');
}
updateThemeIcon();
themeButton?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  updateThemeIcon();
});

const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', (event) => {
  event.preventDefault();
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const pageCopy = {
  about: ['Learning, building,<br><em>and figuring things out.</em>', 'I’m a D4 Software Engineering student at Politeknik Negeri Indramayu. My main interests are web development, mobile applications, frontend interfaces, and practical IT support.'],
  certificates: ['What I’ve<br><em>been learning.</em>', 'These certificates represent the areas I’ve explored while building my foundation in software development, networking, systems, and data.'],
  projects: ['Things I’ve<br><em>built so far.</em>', 'A collection of web and mobile projects from coursework, personal experiments, and real-world problem solving.'],
  contact: ['Let’s<br><em>talk.</em>', 'I’m open to internships, collaboration, freelance work, and opportunities to grow as a software engineer. If you have an idea, a project, or simply want to connect, feel free to reach out.']
};
const pageKey = document.body.dataset.page;
const pageNumbers = { about: 'A little about me', certificates: 'Learning along the way', projects: 'Selected work', contact: 'Get in touch' };
const pageEyebrow = document.querySelector('.page-hero .eyebrow');
if (pageEyebrow && pageNumbers[pageKey]) pageEyebrow.textContent = pageNumbers[pageKey];
if (pageCopy[pageKey]) {
  const heading = document.querySelector('.page-hero h1');
  const description = document.querySelector('.page-hero > p:last-child');
  if (heading) heading.innerHTML = `${pageCopy[pageKey][0]}`;
  if (description) description.textContent = pageCopy[pageKey][1];
}
const homeLead = document.querySelector('.intro-strip .lead');
if (homeLead) homeLead.textContent = 'I build software that is useful, understandable, and reliable — while continuously learning how to make it better.';
const heroCopy = document.querySelector('.hero-copy');
if (heroCopy) heroCopy.textContent = 'I’m Muhamad Fadhlurrahman, a D4 Software Engineering student based in Bekasi. I enjoy building practical web and mobile applications, learning new technologies, and improving how people interact with digital products.';
const heroEyebrow = document.querySelector('.hero .eyebrow');
if (heroEyebrow) heroEyebrow.textContent = 'Software engineering student';
const heroHeading = document.querySelector('.hero h1');
if (heroHeading) heroHeading.innerHTML = 'I build software<br><strong>that solves real problems.</strong>';
const heroRoleCopy = document.querySelector('.hero-role');
if (heroRoleCopy && heroRoleCopy.firstChild) heroRoleCopy.firstChild.textContent = '';
const githubEyebrow = document.querySelector('#github-activity .eyebrow');
if (githubEyebrow) githubEyebrow.textContent = 'What I’ve been working on';
const githubHeading = document.querySelector('#github-activity h2');
if (githubHeading) githubHeading.innerHTML = 'Learning by building,<br><em>one project at a time.</em>';
if (pageKey === 'contact') {
  const contactEyebrow = document.querySelector('.contact-copy .eyebrow');
  const contactHeading = document.querySelector('.contact-copy h1');
  const contactDescription = document.querySelector('.contact-copy > p:last-child');
  if (contactEyebrow) contactEyebrow.textContent = 'Get in touch';
  if (contactHeading) contactHeading.innerHTML = 'Let’s<br><em>talk.</em>';
  if (contactDescription) contactDescription.textContent = 'I’m open to internships, collaboration, freelance work, and opportunities to grow as a software engineer. If you have an idea, a project, or simply want to connect, feel free to reach out.';
  const contactLabels = document.querySelectorAll('.contact-links span');
  const contactValues = document.querySelectorAll('.contact-links strong');
  if (contactLabels[0]) contactLabels[0].textContent = 'Email me';
  if (contactLabels[1]) contactLabels[1].textContent = 'GitHub profile';
  if (contactLabels[2]) contactLabels[2].textContent = 'Curriculum Vitae';
  if (contactValues[2]) contactValues[2].textContent = 'View Curriculum Vitae';
}
const availability = document.querySelector('.availability');
if (availability) availability.lastChild.textContent = 'Open to internships and opportunities';
const introEyebrow = document.querySelector('.intro-strip .eyebrow');
if (introEyebrow) introEyebrow.textContent = 'A little about my work';
const heroMetaCopy = document.querySelector('.hero-meta');
if (heroMetaCopy) {
  const metaItems = heroMetaCopy.querySelectorAll('span');
  if (metaItems[1]) metaItems[1].textContent = 'Learning by building';
}

const certificateTranslations = {
  'Belajar Membuat Aplikasi Web dengan React': 'Learning to Build Web Applications with React',
  'Belajar Membuat Front-End Web untuk Pemula': 'Learning to Build Front-End Web for Beginners',
  'Pemrograman Dart Dasar': 'Dart Fundamentals',
  'Praktik Kerja Lapangan': 'Vocational Internship',
  'Sertifikat kompetensi BONET': 'BONET Competency Certificate'
};
document.querySelectorAll('.certificate-card h3').forEach((title) => { if (certificateTranslations[title.textContent.trim()]) title.textContent = certificateTranslations[title.textContent.trim()]; });
const githubMark = document.querySelector('.github-mark');
if (githubMark) githubMark.innerHTML = '<span>GH</span>';
if (pageKey === 'about') {
  const databaseRow = document.querySelector('.about-grid .skill-list div:nth-child(3)');
  if (databaseRow) databaseRow.querySelector('span').textContent = 'SQLite · MySQL · Relational database design';
  const toolsRow = document.querySelector('.about-grid .skill-list div:nth-child(4)');
  if (toolsRow) toolsRow.querySelector('span').textContent = 'Git · GitHub · Postman · VS Code · Figma · phpMyAdmin · OWASP ZAP';
  const systemsRow = document.querySelector('.about-grid .skill-list div:last-child');
  if (systemsRow) {
    systemsRow.querySelector('strong').textContent = 'Systems & Networking';
    systemsRow.querySelector('span').textContent = 'Linux · Debian · Ubuntu · Cisco · MikroTik Router · LAN · Fiber Optic';
  }
  const experienceItems = document.querySelectorAll('.experience-item');
  if (experienceItems[0]) experienceItems[0].innerHTML = '<div><span>2022 · 2 months</span><h3>IT Support Intern</h3><strong>PT Indofarma Tbk · Vocational School Internship</strong></div><ul><li>Assisted with LAN cable crimping and network installation.</li><li>Assisted with fiber optic cable installation.</li><li>Performed basic printer troubleshooting and resolved common printing issues.</li><li>Assisted with laptop hardware troubleshooting and basic technical issue handling.</li></ul>';
  if (experienceItems[1]) experienceItems[1].innerHTML = '<div><span>2023 · 2 months</span><h3>Technical Support Intern</h3><strong>PT Madina Flash, Bintaro · Vocational School Internship</strong></div><ul><li>Recorded customer service data and reported smartphone and laptop issues using Microsoft Excel.</li><li>Entered and managed service information through the company\'s internal application.</li><li>Documented device damage and reported issues to support the technical inspection process.</li><li>Checked spare-part availability based on reported device issues.</li></ul>';
}

if (pageKey === 'about') {
  const conciseExperience = document.querySelectorAll('.experience-item');
  if (conciseExperience[0]) conciseExperience[0].innerHTML = '<div><span>2022 · 2 months</span><h3>IT Support Intern</h3><strong>PT Indofarma Tbk · Vocational School Internship</strong></div><ul><li>Supported LAN, network, and fiber optic installation.</li><li>Handled basic printer and laptop hardware troubleshooting.</li></ul>';
  if (conciseExperience[1]) conciseExperience[1].innerHTML = '<div><span>2023 · 2 months</span><h3>Technical Support Intern</h3><strong>PT Madina Flash, Bintaro · Vocational School Internship</strong></div><ul><li>Recorded device issues and service data using Microsoft Excel and the internal application.</li><li>Documented damage reports and checked spare-part availability.</li></ul>';
}

const heroMeta = document.querySelector('.hero-meta');
if (heroMeta) {
  const visitor = document.createElement('span');
  visitor.innerHTML = 'Website visits <strong id="visitor-count">—</strong>';
  heroMeta.appendChild(visitor);
  const localKey = 'mufra-dev-visitor-count';
  const localCount = Number(localStorage.getItem(localKey) || 0) + 1;
  localStorage.setItem(localKey, String(localCount));
  const countTarget = visitor.querySelector('#visitor-count');
  countTarget.textContent = localCount.toLocaleString('en-US');
  fetch('https://api.counterapi.dev/v1/mufra-dev/visits/up').then((response) => response.ok ? response.json() : Promise.reject()).then((data) => { if (data.count) countTarget.textContent = Number(data.count).toLocaleString('en-US'); }).catch(() => {});
}

const roles = ['Web and mobile developer', 'Frontend developer', 'Software engineering student', 'IT support enthusiast'];
const roleTarget = document.querySelector('#role-rotator');
if (roleTarget) {
  let roleIndex = 0;
  setInterval(() => {
    roleTarget.classList.add('role-changing');
    setTimeout(() => { roleIndex = (roleIndex + 1) % roles.length; roleTarget.textContent = roles[roleIndex]; roleTarget.classList.remove('role-changing'); }, 260);
  }, 3000);
}

document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('hidden', card.dataset.category !== tab.dataset.filter));
}));

const defaultProjectFilter = document.querySelector('.tab.active')?.dataset.filter;
if (defaultProjectFilter) document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('hidden', card.dataset.category !== defaultProjectFilter));

const recipeDownload = document.querySelector('[aria-label="Download MyResep"]');
if (recipeDownload) recipeDownload.href = 'https://drive.google.com/file/d/1ZYe_dC5_ygw-JUF-hFlhdtZCowG7Csk-/view?usp=sharing';

const modal = document.createElement('div');
modal.className = 'certificate-modal';
modal.innerHTML = '<div class="certificate-modal-content"><button class="certificate-close" type="button" aria-label="Close certificate">×</button><img alt="Certificate preview"><h3></h3><p></p></div>';
document.body.appendChild(modal);
document.querySelectorAll('.certificate-card').forEach((card) => card.addEventListener('click', () => {
  const image = card.querySelector('img');
  modal.querySelector('img').src = image.src;
  modal.querySelector('img').alt = image.alt;
  modal.querySelector('h3').textContent = card.querySelector('h3').textContent;
  modal.querySelector('p').textContent = card.querySelector('p').textContent;
  modal.classList.add('open');
}));
const closeModal = () => modal.classList.remove('open');
modal.querySelector('.certificate-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

const projectModal = document.createElement('div');
projectModal.className = 'project-image-modal';
projectModal.innerHTML = '<div class="project-image-modal-content"><button class="project-image-close" type="button" aria-label="Close project preview">×</button><img alt="Project preview"><h3></h3><p></p></div>';
document.body.appendChild(projectModal);
document.querySelectorAll('.project-thumb').forEach((thumb) => thumb.addEventListener('click', () => {
  const card = thumb.closest('.project-card');
  const image = thumb.querySelector('img');
  projectModal.querySelector('img').src = image.src;
  projectModal.querySelector('img').alt = image.alt;
  projectModal.querySelector('h3').textContent = card.querySelector('h3').textContent;
  projectModal.querySelector('p').textContent = card.querySelector('.project-type').textContent;
  projectModal.classList.add('open');
}));
const closeProjectModal = () => projectModal.classList.remove('open');
projectModal.querySelector('.project-image-close').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (event) => { if (event.target === projectModal) closeProjectModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProjectModal(); });

const cvProjectNames = {
  Livora: { title: 'Sistem Edukasi Daur Ulang Sampah (Livora)', type: 'Native Web · Academic Project', tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'], description: 'Developed a web-based system focused on recycling education and waste management. Provided educational information about waste and recyclable materials. Implemented a concept where recyclable waste can be exchanged for coins and redeemed for rewards. Demo login — Username: lepi · Password: 123.' },
  'RT Management System': { title: 'RT Management System', type: 'Personal Project', tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'], description: 'Developed a web-based system to simplify neighborhood administrative record keeping. Implemented community financial record management to improve transparency and reduce paper-based administration. Added resident data management and announcement features for sharing community information and activities.' },
  'TMII CMS': { title: 'TMII Information & Ticketing System', type: 'Laravel · Academic Project', tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'], description: 'Developed a web-based information and ticketing system for TMII as an academic project. Developed an administrative CMS to manage website content and system information. Implemented ticketing information and purchasing access to simplify the visitor ticketing process. Managed tourism information including attractions, news/articles, and other visitor information.' },
  MyResep: { title: 'Recipe Sharing App', type: 'Flutter · Academic Project', tech: ['Flutter'], description: 'Developed a mobile application for sharing and browsing food recipes using Flutter. Implemented features for users to submit and exchange recipes with other users. Added gamification elements to make recipe sharing more engaging and encourage user participation.' }
};
Object.assign(cvProjectNames, {
  Livora: { ...cvProjectNames.Livora, description: 'Web-based recycling education and waste management system with coin and reward features. Demo login — Username: lepi · Password: 123.' },
  'RT Management System': { ...cvProjectNames['RT Management System'], description: 'Neighbourhood administration system with financial records, resident data, and announcements.' },
  'TMII CMS': { ...cvProjectNames['TMII CMS'], description: 'TMII information and ticketing system with an administrative CMS for tourism content and ticket access.' },
  MyResep: { ...cvProjectNames.MyResep, description: 'Flutter recipe-sharing application with user submissions, recipe exchange, and gamification.' }
});
document.querySelectorAll('.project-card').forEach((card) => {
  const currentTitle = card.querySelector('h3')?.textContent.trim();
  const project = cvProjectNames[currentTitle];
  if (!project) return;
  card.querySelector('h3').textContent = project.title;
  card.querySelector('.project-type').textContent = project.type;
  const description = card.querySelector('.project-content > div > p:not(.project-type)');
  if (description) description.textContent = project.description;
  if (project.tech) card.querySelector('.tech-list').innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
  revealItems.forEach((element, index) => { element.style.transitionDelay = `${(index % 4) * 70}ms`; observer.observe(element); });
} else revealItems.forEach((element) => element.classList.add('visible'));

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const dot = document.querySelector('.cursor-dot'); const ring = document.querySelector('.cursor-ring'); let x = -100; let y = -100; let rx = -100; let ry = -100;
  document.addEventListener('pointermove', (event) => { x = event.clientX; y = event.clientY; dot.style.opacity = '1'; ring.style.opacity = '1'; dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; });
  const follow = () => { rx += (x - rx) * .16; ry += (y - ry) * .16; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(follow); }; follow();
  document.querySelectorAll('a,button,.project-card,.certificate-card').forEach((item) => { item.addEventListener('mouseenter', () => ring.classList.add('is-hover')); item.addEventListener('mouseleave', () => ring.classList.remove('is-hover')); });
  document.querySelectorAll('.project-card,.certificate-card').forEach((card) => { card.addEventListener('pointermove', (event) => { const rect = card.getBoundingClientRect(); card.style.transform = `perspective(900px) rotateX(${((event.clientY - rect.top) / rect.height - .5) * -3}deg) rotateY(${((event.clientX - rect.left) / rect.width - .5) * 3}deg) translateY(-4px)`; }); card.addEventListener('pointerleave', () => { card.style.transform = ''; }); });
}
