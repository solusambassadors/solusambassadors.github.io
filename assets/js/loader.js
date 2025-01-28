class ParticleLoader {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.container = document.getElementById('loader');
        if (!this.container) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.container.appendChild(this.canvas);
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }
    
    resize() {
        if (!this.container) return;
        this.canvas.width = 300;
        this.canvas.height = 300;
    }
    
    init() {
        this.particles = [];
        const particleCount = 30;
        const radius = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            this.particles.push({
                angle,
                radius,
                size: 4,
                speed: 0.03,
                brightness: 0
            });
        }
    }
    
    animate() {
        if (!this.container || !this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.particles.forEach((particle, i) => {
            const currentAngle = particle.angle + time * particle.speed;
            
            particle.brightness = Math.sin(time * 3 - i * 0.2) * 0.5 + 0.5;
            
            const x = centerX + Math.cos(currentAngle) * particle.radius;
            const y = centerY + Math.sin(currentAngle) * particle.radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00f2ff';
            
            const alpha = 0.3 + particle.brightness * 0.7;
            this.ctx.fillStyle = `rgba(0, 242, 255, ${alpha})`;
            
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    hide() {
        if (!this.container) return;
        this.container.style.opacity = '0';
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 500);
    }
} 