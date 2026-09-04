const pages = [...document.querySelectorAll('.page')];

function showPage(n) {
  pages.forEach(p => {
    p.hidden = Number(p.dataset.page) !== n;
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${n}`);
}

// Navegação entre as páginas
document.querySelectorAll('[data-go]').forEach(el => {
  el.addEventListener('click', () => {
    showPage(Number(el.dataset.go));
  });
});

// CRIE SUA OBRA → abre crieobra.html
document.querySelectorAll('[data-create]').forEach(el => {
  el.addEventListener('click', () => {
    window.location.href = 'crieobra.html';
  });
});


// ==============================
// ÁREA DE CRIAÇÃO DA OBRA
// ==============================

// Só executa essa parte se estivermos no crieobra.html
const canvas = document.getElementById('canvas');

if (canvas) {

  const ctx = canvas.getContext('2d');

  let color = '#000000';
  let drawing = false;
  let startX = 0;
  let startY = 0;

  function clearCanvas() {
    ctx.fillStyle = '#F1EFE9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  clearCanvas();

  // Escolher cores
  document.querySelectorAll('[data-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      color = btn.dataset.color;
    });
  });

  // Limpar
  const clearButton = document.getElementById('clear');

  if (clearButton) {
    clearButton.addEventListener('click', clearCanvas);
  }

  // Começar desenho
  canvas.addEventListener('pointerdown', e => {

    drawing = true;

    const r = canvas.getBoundingClientRect();

    startX = (e.clientX - r.left) * canvas.width / r.width;
    startY = (e.clientY - r.top) * canvas.height / r.height;

  });

  // Soltar o mouse
  canvas.addEventListener('pointerup', e => {

    if (!drawing) return;

    drawing = false;

    const r = canvas.getBoundingClientRect();

    const x = (e.clientX - r.left) * canvas.width / r.width;
    const y = (e.clientY - r.top) * canvas.height / r.height;

    ctx.fillStyle = color;

    const w = Math.max(12, Math.abs(x - startX));
    const h = Math.max(12, Math.abs(y - startY));

    ctx.fillRect(
      Math.min(x, startX),
      Math.min(y, startY),
      w,
      h
    );

  });

  canvas.addEventListener('pointerleave', () => {
    drawing = false;
  });

}


// ==============================
// PÁGINA INICIAL
// ==============================

// Só executa se estivermos no index.html
if (pages.length > 0) {

  const hash = Number(location.hash.slice(1));

  showPage(
    hash >= 1 && hash <= 3 ? hash : 1
  );

}