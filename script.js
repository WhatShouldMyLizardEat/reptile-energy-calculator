/**
 * DotGrid - Animated Dot Grid Background
 * Vanilla JavaScript version (no React/GSAP dependencies)
 */

class DotGrid {
    constructor(options = {}) {
        this.dotSize = options.dotSize || 8;
        this.gap = options.gap || 40;
        this.baseColor = options.baseColor || '#2a2a4a';
        this.activeColor = options.activeColor || '#5227FF';
        this.proximity = options.proximity || 120;
        this.shockRadius = options.shockRadius || 200;
        this.shockStrength = options.shockStrength || 3;
        this.returnDuration = options.returnDuration || 1.5;

        this.wrapper = null;
        this.canvas = null;
        this.ctx = null;
        this.dots = [];
        this.pointer = { x: -1000, y: -1000 };
        this.animationId = null;

        this.baseRgb = this.hexToRgb(this.baseColor);
        this.activeRgb = this.hexToRgb(this.activeColor);
    }

    hexToRgb(hex) {
        const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        if (!m) return { r: 0, g: 0, b: 0 };
        return {
            r: parseInt(m[1], 16),
            g: parseInt(m[2], 16),
            b: parseInt(m[3], 16)
        };
    }

    init(containerId) {
        // Create DOM elements
        const container = document.getElementById(containerId);
        if (!container) return;

        this.wrapper = document.createElement('div');
        this.wrapper.className = 'dot-grid__wrap';

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'dot-grid__canvas';

        this.wrapper.appendChild(this.canvas);
        container.appendChild(this.wrapper);

        this.ctx = this.canvas.getContext('2d');

        // Build initial grid
        this.buildGrid();

        // Event listeners
        window.addEventListener('resize', () => this.buildGrid());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('click', (e) => this.onClick(e));

        // Start animation
        this.animate();
    }

    buildGrid() {
        if (!this.wrapper || !this.canvas) return;

        const { width, height } = this.wrapper.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(dpr, dpr);

        const cell = this.dotSize + this.gap;
        const cols = Math.ceil(width / cell) + 1;
        const rows = Math.ceil(height / cell) + 1;

        const gridW = cell * cols;
        const gridH = cell * rows;

        const startX = (width - gridW) / 2 + cell / 2;
        const startY = (height - gridH) / 2 + cell / 2;

        this.dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = startX + x * cell;
                const cy = startY + y * cell;
                this.dots.push({
                    cx, cy,
                    xOffset: 0,
                    yOffset: 0,
                    targetX: 0,
                    targetY: 0,
                    velocity: { x: 0, y: 0 }
                });
            }
        }
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = e.clientX - rect.left;
        this.pointer.y = e.clientY - rect.top;
    }

    onClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;

        for (const dot of this.dots) {
            const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
            if (dist < this.shockRadius) {
                const falloff = Math.max(0, 1 - dist / this.shockRadius);
                const pushX = (dot.cx - cx) * this.shockStrength * falloff;
                const pushY = (dot.cy - cy) * this.shockStrength * falloff;
                dot.velocity.x += pushX;
                dot.velocity.y += pushY;
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const proxSq = this.proximity * this.proximity;
        const { x: px, y: py } = this.pointer;

        for (const dot of this.dots) {
            // Apply spring physics for return
            const springStrength = 0.08;
            const damping = 0.85;

            dot.velocity.x += -dot.xOffset * springStrength;
            dot.velocity.y += -dot.yOffset * springStrength;
            dot.velocity.x *= damping;
            dot.velocity.y *= damping;

            dot.xOffset += dot.velocity.x;
            dot.yOffset += dot.velocity.y;

            // Calculate display position
            const ox = dot.cx + dot.xOffset;
            const oy = dot.cy + dot.yOffset;

            // Calculate distance to pointer
            const dx = dot.cx - px;
            const dy = dot.cy - py;
            const dsq = dx * dx + dy * dy;

            // Determine color based on proximity
            let fillStyle = this.baseColor;
            if (dsq <= proxSq) {
                const dist = Math.sqrt(dsq);
                const t = 1 - dist / this.proximity;
                const r = Math.round(this.baseRgb.r + (this.activeRgb.r - this.baseRgb.r) * t);
                const g = Math.round(this.baseRgb.g + (this.activeRgb.g - this.baseRgb.g) * t);
                const b = Math.round(this.baseRgb.b + (this.activeRgb.b - this.baseRgb.b) * t);
                fillStyle = `rgb(${r},${g},${b})`;
            }

            // Draw dot
            this.ctx.beginPath();
            this.ctx.arc(ox, oy, this.dotSize / 2, 0, Math.PI * 2);
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const dotGridContainer = document.getElementById('dot-grid-bg');
    if (dotGridContainer) {
        const grid = new DotGrid({
            dotSize: 6,
            gap: 35,
            baseColor: '#1a1a3a',
            activeColor: '#6a5acd',
            proximity: 100,
            shockRadius: 180,
            shockStrength: 2.5
        });
        grid.init('dot-grid-bg');
    }
});
