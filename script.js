// Project detail data registry
const projectData = {
  banglaNews24: {
    title: "Bangla News 24 Digital Portal",
    category: "Flagship Production Newspaper Platform",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Better Auth", "MongoDB", "ISR Caching"],
    description: "Bangla News 24 is an enterprise-grade digital news publishing platform built to handle spiky reader concurrency. Designed with Next.js 16 Server Components and ISR incremental regeneration, ensuring pages load in under 250ms even during breaking news events.",
    challenges: "Optimizing dynamic editorial multi-category feeds with sub-second delivery was a key hurdle. Resolved by decoupling editorial staff write operations with session-hardened Better Auth while caching public news feeds at Vercel's edge network using tiered revalidation tags.",
    future: "Implementing server-sent events (SSE) for live breaking news push notifications, automated multilingual translation microservice, and dark-mode article audio narration.",
    live: "https://bangla-news24-orcin.vercel.app/",
    github: "https://github.com/iamsahedrana/BanglaNews24"
  },
  bazarDor: {
    title: "BazarDor - Daily Commodity Price Monitor",
    category: "Marketplace & Pricing Intelligence",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "DaisyUI", "MongoDB"],
    description: "A comprehensive daily grocery and essentials tracking web app allowing users to inspect market trends, price shifts across districts, and calculate estimated weekly baskets.",
    challenges: "Handling rapid item search and filtering across hundreds of seasonal commodities without causing UI layout shifts. Solved by implementing client-side fuzzy debounce lookups paired with optimistic UI updates.",
    future: "Adding crowd-sourced grocery receipt scanner with OCR parsing, historical inflation charts across 5-year data points, and localized SMS price alerts for staple items.",
    live: "https://bazar-dor-blush.vercel.app/",
    github: "https://github.com/iamsahedrana/BazarDor"
  },
  bookVibe: {
    title: "Book Vibe - Interactive Library & Reading Log",
    category: "Interactive Web Application",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "LocalStorage Sync"],
    description: "Personalized book management system offering readers categorized wishlists, reading progress trackers, and visually rich graphical charts powered by Recharts.",
    challenges: "Constructing responsive, non-blocking visualization graphs that adapt smoothly across varying mobile viewports while preserving offline reading logs without schema mismatch.",
    future: "Integrating OpenLibrary and Google Books API for instant barcode ISBN scanning and community book clubs with discussion threads.",
    live: "https://book-vibe-site.vercel.app/",
    github: "https://github.com/iamsahedrana/BookVibeSite"
  },
  countriesExplorer: {
    title: "Countries Explorer - Global Geopolitical Directory",
    category: "Geospatial Web Application",
    tech: ["React", "TypeScript", "Vite", "REST Countries API", "Tailwind CSS"],
    description: "Comprehensive global country atlas providing instantaneous boundary and demographic metrics, neighboring frontier lookups, and region-based sorting.",
    challenges: "Navigating nested border relations and regional code mappings without repetitive round-trip REST calls. Engineered an in-memory alpha-3 code lookup cache that resolves border clicks instantaneously.",
    future: "Adding interactive 3D WebGL globe representation, time-zone clock synchronizer, and currency exchange calculator.",
    live: "https://countries-explorer-iamsahedrana.netlify.app/",
    github: "https://github.com/iamsahedrana/CountriesExplorer"
  }
};

function openProjectModal(key) {
  const p = projectData[key];
  if (!p) return;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-category').textContent = p.category;
  document.getElementById('modal-description').textContent = p.description;
  document.getElementById('modal-challenges').textContent = p.challenges;
  document.getElementById('modal-future').textContent = p.future;
  document.getElementById('modal-live-link').href = p.live;
  document.getElementById('modal-github-link').href = p.github;

  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = '';
  p.tech.forEach(t => {
    const span = document.createElement('span');
    span.className = 'px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-graph-lime';
    span.textContent = t;
    techContainer.appendChild(span);
  });

  const modal = document.getElementById('project-modal');
  modal.showModal();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal.open) modal.close();
}

// Close on backdrop click
document.getElementById('project-modal').addEventListener('click', (e) => {
  const dialog = document.getElementById('project-modal');
  const rect = dialog.getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
    && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) {
    dialog.close();
  }
});

// Copy email address.
async function copyEmail() {
  const email = 'iamsahedrana@gmail.com';
  const label = document.getElementById('copy-label');
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const temp = document.createElement('textarea');
    temp.value = email;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
  }
  if (label) {
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = 'Copy'; }, 2000);
  }
}

// Contact form: opens the visitor's email app with the form details filled in.
function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const fields = form.querySelectorAll('input, textarea');
  const [name, email, subject, message] = Array.from(fields).map(field => field.value.trim());
  const mailSubject = encodeURIComponent(`${subject} — message from ${name}`);
  const mailBody = encodeURIComponent(`Name: ${name}
Email: ${email}

${message}`);
  window.location.href = `mailto:iamsahedrana@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  const feedback = document.getElementById('form-feedback');
  feedback.textContent = 'Your email app should open with your message ready to send.';
  feedback.classList.remove('hidden');
}


// Mobile navigation menu.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.mobile-menu-button');
  const nav = document.getElementById('site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      const icon = menuButton.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isOpen ? 'close' : 'menu';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      const icon = menuButton.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    }));
  }
});

// Clipboard helper with a fallback for browsers that block clipboard access.
