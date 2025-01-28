class LogoParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.container = document.getElementById('logo-particles');
        if (!this.container) return;
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.image = new Image();
        this.image.src = 'assets/images/logo/logohome.svg';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        this.image.onload = () => {
            this.initParticles();
            this.animate();
        };
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        if (this.particles.length > 0) {
            this.initParticles();
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    initParticles() {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        const scale = Math.min(
            this.canvas.width / this.image.width,
            this.canvas.height / this.image.height
        ) * 0.8;
        
        tempCanvas.width = this.image.width * scale;
        tempCanvas.height = this.image.height * scale;
        
        tempCtx.drawImage(this.image, 0, 0, tempCanvas.width, tempCanvas.height);
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        
        const offsetX = (this.canvas.width - tempCanvas.width) / 2;
        const offsetY = (this.canvas.height - tempCanvas.height) / 2;
        
        this.particles = [];
        
        for(let y = 0; y < imageData.height; y += 6) {
            for(let x = 0; x < imageData.width; x += 6) {
                const alpha = imageData.data[((y * imageData.width + x) * 4) + 3];
                if(alpha > 128) {
                    const particle = {
                        targetX: x + offsetX,
                        targetY: y + offsetY,
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        size: 2,
                        color: '#00f2ff',
                        angle: Math.random() * Math.PI * 2,
                        oscillationRadius: 2 + Math.random() * 3,
                        oscillationSpeed: 0.02 + Math.random() * 0.02,
                        time: Math.random() * 100
                    };
                    this.particles.push(particle);
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';
        
        this.particles.forEach(particle => {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            
            const mouseDistance = Math.hypot(
                this.mouse.x - particle.x,
                this.mouse.y - particle.y
            );
            
            const mouseRadius = 40;
            
            if (mouseDistance < mouseRadius) {
                const force = (1 - mouseDistance / mouseRadius) * 8;
                const angle = Math.atan2(
                    particle.y - this.mouse.y,
                    particle.x - this.mouse.x
                );
                
                particle.x += Math.cos(angle) * force;
                particle.y += Math.sin(angle) * force;
            } else {
                particle.x += dx * 0.05;
                particle.y += dy * 0.05;
            }
            
            particle.time += particle.oscillationSpeed;
            const oscillationX = Math.cos(particle.time) * particle.oscillationRadius;
            const oscillationY = Math.sin(particle.time) * particle.oscillationRadius;
            
            this.ctx.beginPath();
            this.ctx.arc(
                particle.x + oscillationX,
                particle.y + oscillationY,
                particle.size,
                0,
                Math.PI * 2
            );
            
            this.ctx.fillStyle = 'rgba(0, 242, 255, 0.8)';
            this.ctx.fill();
        });
        
        this.ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(() => this.animate());
    }
} 