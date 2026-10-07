// Datos iniciales de ejemplo para el Blog CHARLA HUECA
const posts = [
  {
    id: 1,
    title: "El arte de enganchar una buena conversación",
    category: "reflexiones",
    author: "Redacción",
    date: "05 Oct, 2026",
    readTime: "4 min",
    excerpt: "¿Por qué algunas charlas fluyen sin esfuerzo mientras otras se quedan en la superficie? Analizamos la chispa de la verdadera comunicación.",
    likes: 24,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Episodio #01: Conectores, pinzas y señales",
    category: "podcasts",
    author: "Equipo Charla Hueca",
    date: "01 Oct, 2026",
    readTime: "35 min audio",
    excerpt: "En nuestro primer episodio exploramos cómo creamos el concepto del blog y por qué las mejores ideas nacen del diálogo abierto.",
    likes: 42,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Tecnología y ruido: ¿Aún sabemos escuchar?",
    category: "tecnologia",
    author: "Invitado",
    date: "28 Sep, 2026",
    readTime: "6 min",
    excerpt: "Entre tantas notificaciones, la capacidad de atención se ha convertido en el recurso más valioso de nuestra era.",
    likes: 18,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
  }
];

// Inicializar la página al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar iconos de Lucide
  lucide.createIcons();

  const postsGrid = document.getElementById('posts-grid');
  const categoryFilters = document.getElementById('category-filters');
  const searchInput = document.getElementById('search-input');

  // Renderizar tarjetas
  function renderPosts(items) {
    if (items.length === 0) {
      postsGrid.innerHTML = `
        <div class="col-span-full text-center py-12 text-brand-text/60">
          No se encontraron publicaciones que coincidan con la búsqueda.
        </div>
      `;
      return;
    }

    postsGrid.innerHTML = items.map(post => `
      <article class="post-card flex flex-col justify-between">
        <div>
          <div class="relative h-48 overflow-hidden">
            <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              ${post.category}
            </span>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 text-xs text-brand-text/60 mb-2">
              <span>${post.date}</span> • <span>${post.readTime}</span>
            </div>
            <h2 class="font-heading font-bold text-xl text-brand-blue mb-3 hover:text-brand-gold transition-colors">
              <a href="#">${post.title}</a>
            </h2>
            <p class="text-sm text-brand-text/80 leading-relaxed mb-4">
              ${post.excerpt}
            </p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-0 border-t border-brand-gold/10 flex items-center justify-between text-sm">
          <span class="font-medium text-xs text-brand-goldDark">Por ${post.author}</span>
          <button onclick="toggleLike(${post.id})" class="flex items-center gap-1.5 text-brand-blue/70 hover:text-brand-gold transition-colors">
            <i data-lucide="heart" class="w-4 h-4"></i>
            <span id="like-count-${post.id}">${post.likes}</span>
          </button>
        </div>
      </article>
    `).join('');

    // Re-inicializar iconos para los elementos renderizados
    lucide.createIcons();
  }

  // Render inicial
  renderPosts(posts);

  // Filtrado por Categorías
  categoryFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const cat = e.target.dataset.cat;
      const filtered = cat === 'todas' ? posts : posts.filter(p => p.category === cat);
      renderPosts(filtered);
    }
  });

  // Búsqueda en tiempo real
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = posts.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.excerpt.toLowerCase().includes(query)
    );
    renderPosts(filtered);
  });
});

// Función global de Like
function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes += 1;
    const countSpan = document.getElementById(`like-count-${id}`);
    if (countSpan) countSpan.textContent = post.likes;
  }
}
