(function () {
  const ALL = [...LINUX_COMMANDS, ...CLOUD_COMMANDS];
  const grid = document.getElementById('grid');
  const filtersEl = document.getElementById('filters');
  const searchEl = document.getElementById('search');
  const emptyEl = document.getElementById('empty');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  let activeCategory = 'All';
  let query = '';

  // ----- Build category filters -----
  function buildFilters() {
    const cats = ['All', ...new Set(ALL.map(c => c.category))];
    filtersEl.innerHTML = cats.map(cat =>
      `<button class="filter${cat === 'All' ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
    ).join('');
    filtersEl.querySelectorAll('.filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        filtersEl.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render();
      });
    });
  }

  // ----- Stats -----
  function updateStats() {
    document.getElementById('statTotal').textContent = ALL.length;
    document.getElementById('statCats').textContent = new Set(ALL.map(c => c.category)).size;
    document.getElementById('statCloud').textContent = CLOUD_COMMANDS.length;
  }

  // ----- Render cards -----
  function render() {
    const q = query.toLowerCase();
    const list = ALL.filter(item => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const hay = (item.name + ' ' + item.short + ' ' + item.description + ' ' + item.details.map(d => d.flag + ' ' + d.text).join(' ')).toLowerCase();
      return matchesCat && (q === '' || hay.includes(q));
    });

    emptyEl.hidden = list.length > 0;

    grid.innerHTML = list.map((item, idx) => `
      <article class="card ${item.cloud ? 'cloud' : ''}" data-idx="${ALL.indexOf(item)}">
        <div class="name"><span class="dollar">$</span>${escapeHtml(item.name)}</div>
        <div class="desc">${escapeHtml(item.short)}</div>
        <span class="tag">${escapeHtml(item.category)}</span>
      </article>
    `).join('');

    grid.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => openModal(ALL[+card.dataset.idx]));
    });
  }

  // ----- Modal -----
  function openModal(item) {
    modalBody.innerHTML = `
      <h2>${escapeHtml(item.name)}</h2>
      <div class="meta">Category: ${escapeHtml(item.category)}${item.cloud ? ' · Cloud Component' : ''}</div>
      <p>${escapeHtml(item.description)}</p>
      <h3>Syntax & Usage</h3>
      <ul class="syntax-list">
        ${item.syntax.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
      </ul>
      <h3>Key Details</h3>
      <ul class="detail-list">
        ${item.details.map(d => `<li><strong>${escapeHtml(d.flag)}</strong> — ${escapeHtml(d.text)}</li>`).join('')}
      </ul>
    `;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '/' && document.activeElement !== searchEl) {
      e.preventDefault();
      searchEl.focus();
    }
  });

  // ----- Search -----
  searchEl.addEventListener('input', e => {
    query = e.target.value.trim();
    render();
  });

  // ----- Util -----
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ----- Init -----
  buildFilters();
  updateStats();
  render();
  document.getElementById('year').textContent = new Date().getFullYear();
})();