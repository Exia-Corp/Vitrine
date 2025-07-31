window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 600);
  }
});

const exiaBtn = document.getElementById('exiaBtn');
const surMesureBtn = document.getElementById('surMesureBtn');
const autresBtn = document.getElementById('autresBtn');

const tarifsSection = document.getElementById('tarifsSection');
const botSummary = document.getElementById('botSummary');
const welcomeMessage = document.getElementById('welcomeMessage');

const tarifTable = document.getElementById('tarifTable');
const searchInput = document.getElementById('searchInput');

const bots = {
  exia: [
    { nom: 'Exia Gestion', prix: '2.50€/mois', description: 'Exia Gestion est un bot qui vous permettra de gérer tout votre serveur tout en le protégeant avec des systèmes de sécurité de base.' },
    { nom: 'Exia Économie', prix: '3€/mois', description: 'Exia Économie est un bot avec un tout nouveau système et qui comprend également des commandes de jeux.' },
    { nom: 'Exia Sécurity', prix: '4€/mois', description: 'Exia Security est un bot de protection avancée compatible avec les commandes d’Exia Gestion.' },
  ],
  surMesure: [
    { nom: 'Bot Sur-Mesure', prix: 'Sur demande', description: 'Personnalisé selon vos besoins.' },
  ],
  autres: [
    { nom: 'Bot Gratuit', prix: '0€', description: 'Exia Public est un bot qui vous permettra de gérer avec les systèmes de gestion de base. Il est également plus lent que les bots perso et possède moins de commandes.' },
  ],
};

function afficherTarifs(type) {
  if (!bots[type]) return;

  tarifsSection.style.display = 'block';
  botSummary.style.display = 'none';
  welcomeMessage.style.display = 'none';

  tarifTable.innerHTML = `
    <thead>
      <tr>
        <th>Nom du Bot</th>
        <th>Prix</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      ${bots[type].map(bot => `
        <tr>
          <td>${bot.nom}</td>
          <td>${bot.prix}</td>
          <td>${bot.description}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  if (typeof gsap !== 'undefined') {
    gsap.from("table tbody tr", {
      duration: 1,
      y: 20,
      opacity: 0,
      stagger: 0.15,
      ease: "power2.out"
    });
  }
}

exiaBtn.addEventListener('click', () => afficherTarifs('exia'));
surMesureBtn.addEventListener('click', () => afficherTarifs('surMesure'));
autresBtn.addEventListener('click', () => afficherTarifs('autres'));

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const rows = tarifTable.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

const openFormBtn = document.getElementById('openTestimonialFormBtn');
const testimonialForm = document.getElementById('testimonialForm');
const closeFormBtn = document.getElementById('closeTestimonialFormBtn');
const testimonialsList = document.getElementById('testimonialsList');

openFormBtn.addEventListener('click', () => {
  testimonialForm.classList.remove('hidden');
  openFormBtn.classList.add('hidden');
});

closeFormBtn.addEventListener('click', () => {
  testimonialForm.classList.add('hidden');
  openFormBtn.classList.remove('hidden');
  testimonialForm.reset();
});

testimonialForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = testimonialForm.username.value.trim();
  const message = testimonialForm.message.value.trim();

  if (username && message) {
    const div = document.createElement('div');
    div.classList.add('testimonial');
    div.style.background = 'rgba(108, 0, 255, 0.3)';
    div.style.margin = '10px 0';
    div.style.padding = '12px 15px';
    div.style.borderRadius = '10px';
    div.innerHTML = `
      <strong>${username}</strong><br />
      <p>${message}</p>
    `;

    testimonialsList.prepend(div);

    testimonialForm.reset();
    testimonialForm.classList.add('hidden');
    openFormBtn.classList.remove('hidden');
  }
});

const backToTopBtn = document.querySelector('.back-to-top');
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('linkBtn').addEventListener('click', () => {
  window.open('https://discord.gg/SEYxep56nW', '_blank');
});

const blocks = document.querySelectorAll('.timeline-block');

function checkVisibility() {
  const triggerBottom = window.innerHeight * 0.85;

  blocks.forEach(block => {
    const blockTop = block.getBoundingClientRect().top;

    if (blockTop < triggerBottom) {
      block.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


document.getElementById('documentationBtn').addEventListener('click', () => {
  window.open('https://docs.google.com/document/d/17nnlKadbkathgF0O7cmqAyuhuKLiCrpEVwgoo4rAu-M/edit?usp=sharing', '_blank');
});

const text = "L'équipe - développeurs ";
let index = 0;
const speed = 100; 

function typeWriter() {
  if (index < text.length) {
    document.getElementById('typewriter').innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener('load', typeWriter);
