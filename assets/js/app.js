document.addEventListener('DOMContentLoaded', () => {
    // Добавляем небольшую задержку перед инициализацией
    setTimeout(() => {
        new Router();
        new ParticleSystem();
        new SmoothScroll(); // Добавляем инициализацию плавного скролла
    }, 800); // 800ms задержка для более плавного появления
}); 