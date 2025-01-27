class SmoothScroll {
    constructor() {
        this.lenis = new Lenis({
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        this.init();
    }

    init() {
        // Интеграция с requestAnimationFrame
        const raf = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(raf);
        };
        
        requestAnimationFrame(raf);

        // Обработка клика по ссылкам с якорями
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Пропускаем ссылки на другие страницы (начинающиеся с '#/')
                if (href.startsWith('#/')) {
                    return;
                }
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    this.lenis.scrollTo(target, {
                        offset: 0,
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            });
        });
    }
} 