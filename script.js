const root = document.documentElement;
root.lang = 'en';
document.querySelectorAll('a[href="assets/Muhamad_Fadhlurrahman_ATS_CV_Professional_Final.pdf"]').forEach((link) => {
  link.href = 'assets/Muhamad_Fadhlurrahman_CV.pdf';
});
if (!document.querySelector('link[data-devicon]')) {
  const devicon = document.createElement('link');
  devicon.rel = 'stylesheet';
  devicon.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
  devicon.dataset.devicon = 'true';
  document.head.appendChild(devicon);
}
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
  about: ['About Me', 'I’m a D4 Software Engineering student at Politeknik Negeri Indramayu. I’m interested in web and mobile development, frontend work, and practical IT support.'],
  certificates: ['What I’ve<br><em>been learning.</em>', 'These certificates cover topics I\'ve studied, including web development, programming, data science, and system administration.'],
  projects: ['Projects I\'ve<br><em>Worked On</em>', 'These are web and mobile projects I\'ve worked on through coursework and personal practice.'],
  contact: ['Get in Touch', 'Feel free to contact me about internship opportunities, collaborations, or my projects.']
};
const pageKey = document.body.dataset.page;
const pageNumbers = { about: 'About me', certificates: 'Certificates', projects: 'Projects', contact: 'Contact' };
const pageEyebrow = document.querySelector('.page-hero .eyebrow');
if (pageEyebrow && pageNumbers[pageKey]) pageEyebrow.textContent = pageNumbers[pageKey];
if (pageCopy[pageKey]) {
  const heading = document.querySelector('.page-hero h1');
  const description = document.querySelector('.page-hero > p:last-child');
  if (heading) heading.innerHTML = `${pageCopy[pageKey][0]}`;
  if (description) description.textContent = pageCopy[pageKey][1];
}
const homeLead = document.querySelector('.intro-strip .lead');
if (homeLead) homeLead.textContent = 'Most of my learning comes from building web and mobile projects.';
const heroCopy = document.querySelector('.hero-copy');
const heroEyebrow = document.querySelector('.hero .eyebrow');
if (heroEyebrow) heroEyebrow.textContent = 'Software engineering student';
const heroHeading = document.querySelector('.hero h1');
if (heroHeading) heroHeading.innerHTML = 'I build software<br><strong>that solves real problems.</strong>';
if (heroCopy) heroCopy.textContent = "I'm Muhamad Fadhlurrahman, a D4 Software Engineering student based in Bekasi. I enjoy building web and mobile applications, learning new technologies, and improving how people interact with digital products.";
const heroRoleCopy = document.querySelector('.hero-role');
if (heroRoleCopy && heroRoleCopy.firstChild) heroRoleCopy.firstChild.textContent = '';
const githubEyebrow = document.querySelector('#github-activity .eyebrow');
if (githubEyebrow) githubEyebrow.textContent = 'What I’ve been working on';
const githubHeading = document.querySelector('#github-activity h2');
if (githubHeading) githubHeading.innerHTML = 'Projects and code<br><em>on GitHub.</em>';
if (pageKey === 'contact') {
  const contactEyebrow = document.querySelector('.contact-copy .eyebrow');
  const contactHeading = document.querySelector('.contact-copy h1');
  const contactDescription = document.querySelector('.contact-copy > p:last-child');
  if (contactEyebrow) contactEyebrow.textContent = 'Get in touch';
  if (contactHeading) contactHeading.textContent = 'Get in Touch';
  if (contactDescription) contactDescription.textContent = 'Feel free to contact me about internship opportunities, collaborations, or my projects.';
  const contactLabels = document.querySelectorAll('.contact-links span');
  const contactValues = document.querySelectorAll('.contact-links strong');
  if (contactLabels[0]) contactLabels[0].textContent = 'Email me';
  if (contactLabels[1]) contactLabels[1].textContent = 'GitHub profile';
  if (contactLabels[2]) contactLabels[2].textContent = 'Curriculum Vitae';
  if (contactValues[2]) contactValues[2].textContent = 'View Curriculum Vitae';
}
const availability = document.querySelector('.availability');
if (availability) availability.lastChild.textContent = 'Open to software development internships';
const introEyebrow = document.querySelector('.intro-strip .eyebrow');
if (introEyebrow) introEyebrow.textContent = 'How I learn and build';
const githubSectionEyebrow = document.querySelector('#github-activity .eyebrow');
if (githubSectionEyebrow) githubSectionEyebrow.textContent = 'My projects';
const githubEventsLabel = document.querySelector('#github-events + span');
if (githubEventsLabel) githubEventsLabel.textContent = 'Recent contributions';
const githubLink = document.querySelector('#github-activity .text-link');
if (githubLink) githubLink.textContent = 'View GitHub ↗';
const githubStatus = document.querySelector('#github-status');
if (githubStatus) githubStatus.textContent = 'My GitHub contributions over the past 12 months.';
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
  const toolsHeading = document.querySelector('.about-block h2');
  if (toolsHeading) toolsHeading.textContent = 'Technologies I’ve used';
  const technologyRows = [
    ['Languages', [['PHP', 'devicon-php-plain'], ['JavaScript', 'devicon-javascript-plain'], ['Python', 'devicon-python-plain'], ['Java', 'devicon-java-plain'], ['C++', 'devicon-cplusplus-plain'], ['Dart', 'devicon-dart-plain'], ['HTML', 'devicon-html5-plain'], ['CSS', 'devicon-css3-plain']]],
    ['Frameworks', [['Laravel', 'devicon-laravel-plain'], ['React', 'devicon-react-original'], ['Flutter', 'devicon-flutter-plain']]],
    ['Database', [['SQLite', 'devicon-sqlite-plain'], ['MySQL', 'devicon-mysql-plain']]],
    ['Tools', [['Git', 'devicon-git-plain'], ['GitHub', 'devicon-github-original'], ['Postman', 'devicon-postman-plain'], ['VS Code', 'devicon-vscode-plain'], ['Figma', 'devicon-figma-plain'], ['phpMyAdmin', 'simple-icon:phpmyadmin'], ['OWASP ZAP', 'zap-icon']]],
    ['Systems & Networking', [['Linux', 'devicon-linux-plain'], ['Debian', 'devicon-debian-plain'], ['Ubuntu', 'devicon-ubuntu-plain'], ['Cisco', 'simple-icon:cisco'], ['MikroTik Router', 'simple-icon:mikrotik']]]
  ];
  document.querySelectorAll('.about-grid .skill-list > div').forEach((row, index) => {
    const [label, items] = technologyRows[index] || [];
    if (!label) return;
    row.querySelector('strong').textContent = label;
    row.querySelector('span').className = 'skill-items';
    row.querySelector('span').innerHTML = items.map(([name, icon]) => {
      if (icon === 'simple-icon:phpmyadmin') return `<span class="skill-item"><img class="skill-icon-img" src="https://cdn.simpleicons.org/phpmyadmin" alt="" aria-hidden="true">${name}</span>`;
      if (icon === 'simple-icon:cisco') return `<span class="skill-item"><img class="skill-icon-img" src="https://cdn.simpleicons.org/cisco" alt="" aria-hidden="true">${name}</span>`;
      if (icon === 'simple-icon:mikrotik') return `<span class="skill-item"><img class="skill-icon-img" src="https://cdn.simpleicons.org/mikrotik" alt="" aria-hidden="true">${name}</span>`;
      if (icon === 'zap-icon') return `<span class="skill-item"><img class="skill-icon-img" src="https://www.zaproxy.org/img/zap-by-checkmarx.svg" alt="" aria-hidden="true">${name}</span>`;
      if (icon.startsWith('skill-glyph:')) return `<span class="skill-item"><i class="skill-glyph" aria-hidden="true">${icon.split(':')[1]}</i>${name}</span>`;
      return `<span class="skill-item"><i class="${icon}" aria-hidden="true"></i>${name}</span>`;
    }).join('');
  });
  const experienceItems = document.querySelectorAll('.experience-item');
  const experienceHeading = document.querySelector('.experience-section h2');
  if (experienceHeading) experienceHeading.textContent = 'Experience so far';
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

const roles = ['Software Engineer', 'Frontend Developer', 'Web Developer', 'Backend Developer', 'Mobile App Developer', 'Full-Stack Developer', 'SQL Developer', 'IT Support Specialist'];
const roleTarget = document.querySelector('#role-rotator');
document.querySelector('.typing-caret')?.remove();
if (roleTarget && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let roleIndex = 0;
  roleTarget.textContent = roles[roleIndex];
  window.setInterval(() => {
    roleTarget.classList.add('role-changing');
    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleTarget.textContent = roles[roleIndex];
      roleTarget.classList.remove('role-changing');
    }, 240);
  }, 2500);
}

document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('hidden', card.dataset.category !== tab.dataset.filter));
}));

const defaultProjectFilter = document.querySelector('.tab.active')?.dataset.filter;
if (defaultProjectFilter) document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('hidden', card.dataset.category !== defaultProjectFilter));
const livoraCard = [...document.querySelectorAll('.project-card')].find((card) => card.querySelector('h3')?.textContent.trim() === 'Livora');
const livoraDescription = livoraCard?.querySelector('.project-content > div > p:not(.project-type)');
if (livoraDescription && !livoraDescription.textContent.includes('Demo login')) {
  livoraDescription.textContent += ' Demo login: username lepi, password 123.';
}

const recipeDownload = document.querySelector('[aria-label="Download MyResep"]');
if (recipeDownload) recipeDownload.href = 'https://drive.google.com/file/d/1ZYe_dC5_ygw-JUF-hFlhdtZCowG7Csk-/view?usp=sharing';

const modal = document.createElement('div');
modal.className = 'certificate-modal';
modal.innerHTML = '<div class="certificate-modal-content"><button class="certificate-close" type="button" aria-label="Close certificate">×</button><img alt="Certificate preview"><h3></h3><p></p></div>';
document.body.appendChild(modal);
document.querySelectorAll('.certificate-card').forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  const openCertificate = () => {
  const image = card.querySelector('img');
  modal.querySelector('img').src = image.src;
  modal.querySelector('img').alt = image.alt;
  modal.querySelector('h3').textContent = card.querySelector('h3').textContent;
  modal.querySelector('p').textContent = card.querySelector('p').textContent;
  modal.classList.add('open');
  };
  card.addEventListener('click', openCertificate);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCertificate(); }
  });
});
const closeModal = () => modal.classList.remove('open');
modal.querySelector('.certificate-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

const projectModal = document.createElement('div');
projectModal.className = 'project-image-modal';
projectModal.innerHTML = '<div class="project-image-modal-content"><button class="project-image-close" type="button" aria-label="Close project preview">×</button><img alt="Project preview"><h3></h3><p></p></div>';
document.body.appendChild(projectModal);
document.querySelectorAll('.project-thumb').forEach((thumb) => {
  thumb.tabIndex = 0;
  thumb.setAttribute('role', 'button');
  const openProject = () => {
  const card = thumb.closest('.project-card');
  const image = thumb.querySelector('img');
  projectModal.querySelector('img').src = image.src;
  projectModal.querySelector('img').alt = image.alt;
  projectModal.querySelector('h3').textContent = card.querySelector('h3').textContent;
  projectModal.querySelector('p').textContent = card.querySelector('.project-type').textContent;
  projectModal.classList.add('open');
  };
  thumb.addEventListener('click', openProject);
  thumb.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(); }
  });
});
const closeProjectModal = () => projectModal.classList.remove('open');
projectModal.querySelector('.project-image-close').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (event) => { if (event.target === projectModal) closeProjectModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProjectModal(); });

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
