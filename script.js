const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    });
  });
}

const revealNodes = document.querySelectorAll('[data-reveal]');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealNodes.forEach((node) => observer.observe(node));
}

const tourData = {
  today: {
    image: 'assets/screens/today-screen.webp',
    alt: 'Nycto Today screen with the timer and current objective.',
    kicker: 'Today',
    heading: 'Start from the objective, then start the clock.',
    copy: 'The Today screen keeps the current objective, timer presets, day totals, and recent session prompt in one focused surface.',
    points: [
      'Quick timer presets and manual fallback',
      'Current objective is always visible',
      'Day and week totals stay close to the timer'
    ]
  },
  objective: {
    image: 'assets/screens/objective-screen.webp',
    alt: 'Nycto objective detail screen for Math 101 with streaks and recent sessions.',
    kicker: 'Objectives',
    heading: 'Each goal gets its own history and controls.',
    copy: 'Objective pages give a clear view of today, this week, recent sessions, streaks, and direct actions to start or log time.',
    points: [
      'Streaks encourage continuity without clutter',
      'Recent sessions are easy to inspect',
      'Start timer and manual log actions stay prominent'
    ]
  },
  insights: {
    image: 'assets/screens/insights-screen.webp',
    alt: 'Nycto insights dashboard with overview stats, highlights, and time per objective chart.',
    kicker: 'Insights',
    heading: 'A dashboard that stays readable under pressure.',
    copy: 'Nycto uses compact, high-contrast cards for weekly totals, highlights, and objective breakdowns so the next action is obvious.',
    points: [
      'Week and month scopes are easy to switch',
      'Highlights call out what led the week',
      'Objective share is visible without digging'
    ]
  },
  calendar: {
    image: 'assets/screens/calendar-screen.webp',
    alt: 'Nycto calendar screen showing May 2026 planned and tracked totals.',
    kicker: 'Calendar',
    heading: 'Planned time and tracked time on the same day.',
    copy: 'The calendar view makes follow-through visible, with planned hours, tracked minutes, linked events, and a daily event list.',
    points: [
      'Month view includes event markers',
      'Daily summary shows planned versus tracked',
      'Linked events connect schedule context to focus history'
    ]
  }
};

const tourTabs = document.querySelectorAll('.tour-tab');
const tourImage = document.getElementById('tour-image');
const tourKicker = document.getElementById('tour-kicker');
const tourHeading = document.getElementById('tour-heading');
const tourCopy = document.getElementById('tour-copy');
const tourList = document.getElementById('tour-list');

function renderTour(screenKey) {
  const data = tourData[screenKey];
  if (!data || !tourImage || !tourKicker || !tourHeading || !tourCopy || !tourList) return;

  tourTabs.forEach((tab) => {
    const isActive = tab.dataset.screen === screenKey;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  const updateContent = () => {
    tourImage.src = data.image;
    tourImage.alt = data.alt;
    tourKicker.textContent = data.kicker;
    tourHeading.textContent = data.heading;
    tourCopy.textContent = data.copy;
    tourList.innerHTML = data.points.map((point) => `
      <li><svg class="icon-svg"><use href="#icon-check"></use></svg> ${point}</li>
    `).join('');
    tourImage.classList.remove('is-swapping');
  };

  if (prefersReducedMotion) {
    updateContent();
    return;
  }

  tourImage.classList.add('is-swapping');
  window.setTimeout(updateContent, 160);
}

tourTabs.forEach((tab) => {
  tab.addEventListener('click', () => renderTour(tab.dataset.screen));
});
