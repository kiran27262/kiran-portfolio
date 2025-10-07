// Mobile menu toggle + smooth scrolling + dynamic projects
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile hamburger
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  ham.addEventListener('click', () => {
    const expanded = ham.getAttribute('aria-expanded') === 'true';
    ham.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        nav.classList.remove('open'); // close mobile menu if open
        ham.setAttribute('aria-expanded', 'false');
        target.scrollIntoView({behavior:'smooth', block: 'start'});
      }
    });
  });

  // PROJECTS: define your projects here. No links included -> non-clickable
  const projects = [
    {
      title: "Expense Tracker",
      desc: "A simple PWA to track daily expenses with charts and offline support.",
      tech: ["HTML","CSS","Vanilla JS","IndexedDB"],
      image: ""
    },
    {
      title: "Portfolio CMS",
      desc: "A tiny content manager for portfolios built with Node + Markdown files.",
      tech: ["Node.js","Express","Markdown"],
      image: ""
    },
    {
      title: "Weather Dashboard",
      desc: "Search cities and view 7-day forecast with responsive charts.",
      tech: ["React","Chart.js","OpenWeather API"],
      image: ""
    }
  ];

  // Render project cards into #projectsGrid
  const container = document.getElementById('projectsGrid');
  container.innerHTML = ''; // clear fallback
  projects.forEach(p => {
    const article = document.createElement('article');
    article.className = 'project-card';
    const imgDiv = document.createElement('div');
    imgDiv.className = 'project-image';
    // if you have an image path, set background-image or <img>, else use initials placeholder
    if(p.image && p.image.trim() !== ''){
      imgDiv.style.backgroundImage = `url(${p.image})`;
      imgDiv.style.backgroundSize = 'cover';
      imgDiv.style.backgroundPosition = 'center';
      imgDiv.textContent = '';
    } else {
      // initials placeholder
      const initials = p.title.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
      imgDiv.textContent = initials;
      imgDiv.classList.add('placeholder');
    }

    const body = document.createElement('div');
    body.className = 'project-body';

    const h3 = document.createElement('h3');
    h3.textContent = p.title;
    const desc = document.createElement('p');
    desc.textContent = p.desc;

    const badges = document.createElement('div');
    badges.className = 'badges';
    p.tech.forEach(t => {
      const s = document.createElement('span');
      s.className = 'badge';
      s.textContent = t;
      badges.appendChild(s);
    });

    // append elements (no clickable links)
    body.appendChild(h3);
    body.appendChild(desc);
    body.appendChild(badges);

    article.appendChild(imgDiv);
    article.appendChild(body);

    container.appendChild(article);
  });
});
