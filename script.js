// Função para rolar suavemente até uma âncora
function scrollToAnchor(anchor, duration) {
    const target = document.querySelector(anchor);
    if (!target) return;

    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = ease(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (elapsedTime < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
}

// Função para interpolação de aceleração (pode ser ajustada conforme necessário)
function ease(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Adiciona o evento de clique a todos os links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        scrollToAnchor(href, 800); // Ajuste a duração (800ms) conforme necessário
    });
});
