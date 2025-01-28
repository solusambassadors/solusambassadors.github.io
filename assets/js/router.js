class Router {
    constructor() {
        this.routes = {
            '#/': 'home',
            '#/content-creation': 'content-creation',
            '#/business-development': 'business-development'
        };
        
        this.contentEl = document.getElementById('content');

        window.addEventListener('hashchange', () => {
            console.log('Hash changed to:', window.location.hash);
            window.scrollTo(0, 0);
            this.handleRoute();
        });
        
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                const href = link.getAttribute('href');
                console.log('Clicked link with href:', href);
                if (this.routes[href]) {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    window.location.hash = href;
                }
            }
        });
        
        if (!window.location.hash) {
            window.location.hash = '#/';
        } else {
            this.handleRoute();
        }

        document.addEventListener('click', (e) => {
            const contentCard = e.target.closest('.content-creators');
            if (contentCard) {
                console.log('Content Creators card clicked');
                e.preventDefault();
                e.stopPropagation();
                window.location.hash = '#/content-creation';
                window.scrollTo(0, 0);
            }
        });
    }

    async handleRoute() {
        const hash = window.location.hash;
        console.log('Handling route for hash:', hash);
        
        const mainHash = hash.split('#').slice(0, 2).join('#');
        console.log('Main hash:', mainHash);
        
        const page = this.routes[mainHash] || 'error';
        console.log('Loading page:', page);
        
        await this.loadPage(page);
        
        window.scrollTo(0, 0);
        
        if(page === 'home') {
            setTimeout(() => {
                new LogoParticles();
            }, 600);
        }
    }

    async loadPage(page) {
        try {
            const mainHeader = document.querySelector('.main-header:not(.content-header)');
            if (mainHeader) {
                if (page === 'content-creation' || page === 'business-development') {
                    mainHeader.style.display = 'none';
                } else {
                    mainHeader.style.display = 'block';
                }
            }

            const response = await fetch(`assets/pages/${page}.html`);
            const content = await response.text();
            document.getElementById('content').innerHTML = content;
            
            new SmoothScroll();
            
            if (page === 'content-creation' || page === 'business-development') {
                new TaskBoard();
                this.initContentNavigation();
            }
            
            this.updateActiveLink(page);
            
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    updateActiveLink(page) {
        document.querySelectorAll('nav a, .content-nav a').forEach(link => {
            link.classList.remove('active');
            const dataPage = link.getAttribute('data-page');
            if (dataPage === page) {
                link.classList.add('active');
            }
        });
    }

    initContentNavigation() {
        const sections = document.querySelectorAll('.rewards-section, .roles-section, .tasks-section, .taskboard-section');
        const navLinks = document.querySelectorAll('.content-nav .nav-link');

        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href').startsWith('#/')) return;
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#/') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.hash = '#/';
                });
            } else {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = href.substring(1);
                    const section = document.getElementById(id);
                    section.scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    }
} 