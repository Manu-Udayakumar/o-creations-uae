/* =========================================================================
   SEARCH CARD — WHATSAPP FORWARD
   ========================================================================= */
function sendSearchWhatsApp(event) {
    event.preventDefault();
    const WA_NUMBER = '919633508640';

    const where  = (document.getElementById('search-where')?.value  || '').trim();
    const whenStart = document.getElementById('search-when-start')?.value || '';
    const whenEnd   = document.getElementById('search-when-end')?.value   || '';
    const guests = (document.getElementById('search-guests')?.value || '').trim();

    // Format dates nicely
    function formatStr(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    const s = formatStr(whenStart);
    const e = formatStr(whenEnd);
    let whenFormatted = (s || e) ? `${s || 'TBD'} to ${e || 'TBD'}` : '—';

    const msg =
        `✈️ *Quick Travel Enquiry — O'Creation*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🗺️ *Destination:* ${where  || '—'}\n` +
        `📅 *Dates:*        ${whenFormatted}\n` +
        `👥 *Guests:*       ${guests || '—'}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `_Sent via ocreation.in website_`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
                '_blank', 'noopener,noreferrer');
}

/* =========================================================================
   WHATSAPP ENQUIRY — called from the contact form onsubmit
   ========================================================================= */
function sendWhatsAppEnquiry(event) {
    event.preventDefault();

    // Primary business WhatsApp number (international format, no + or spaces)
    const WA_NUMBER = '919633508640';

    // Read form values
    const name        = (document.getElementById('name')?.value        || '').trim();
    const phone       = (document.getElementById('phone')?.value       || '').trim();
    const email       = (document.getElementById('email')?.value       || '').trim();
    const travelType  = (document.getElementById('travelType')?.selectedOptions[0]?.text || '').trim();
    const travelers   = (document.getElementById('travelers')?.value   || '').trim();
    const datesStart  = (document.getElementById('dates-start')?.value || '').trim();
    const datesEnd    = (document.getElementById('dates-end')?.value   || '').trim();
    const destination = (document.getElementById('destination')?.value || '').trim();
    const notes       = (document.getElementById('message')?.value     || '').trim();

    // Format dates nicely
    function formatStr(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    const ds = formatStr(datesStart);
    const de = formatStr(datesEnd);
    let datesParsed = (ds || de) ? `${ds || 'TBD'} to ${de || 'TBD'}` : '—';

    // Build a structured, emoji-rich message
    let msg = '';
    msg += `🌍 *New Travel Enquiry — O'Creation*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Name:* ${name || '—'}\n`;
    msg += `📞 *Phone:* ${phone || '—'}\n`;
    msg += `📧 *Email:* ${email || '—'}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `✈️ *Travel Type:* ${travelType || '—'}\n`;
    msg += `🗺️ *Destination:* ${destination || '—'}\n`;
    msg += `👥 *No. of Travelers:* ${travelers || '—'}\n`;
    msg += `📅 *Preferred Dates:* ${datesParsed}\n`;
    if (notes) {
        msg += `━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `💬 *Additional Notes:*\n${notes}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `_Sent via ocreation.in website_`;

    // Open WhatsApp with pre-filled message
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Main JavaScript initialization

    /* =========================================================================
       UAE LAUNCH POPUP — countdown + dismiss
       ========================================================================= */
    (function initLaunchPopup() {
        const overlay   = document.getElementById('launch-overlay');
        const closeBtn  = document.getElementById('launch-close');
        const ctaBtn    = document.getElementById('launch-cta');
        const LAUNCH_DATE = new Date('2026-05-23T00:00:00+04:00'); // UAE time (UTC+4)

        if (!overlay) return;

        /* --- Dismiss helper --- */
        function dismissPopup() {
            overlay.classList.add('hide');
            setTimeout(() => overlay.remove(), 450);
        }

        /* --- Close on X button --- */
        closeBtn?.addEventListener('click', dismissPopup);

        /* --- Close when clicking the dark overlay itself (not the card) --- */
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) dismissPopup();
        });

        /* --- CTA closes popup then scrolls to contact --- */
        ctaBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            dismissPopup();
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });

        /* --- Live countdown --- */
        function pad(n) { return String(n).padStart(2, '0'); }

        function updateCountdown() {
            const now  = new Date();
            const diff = LAUNCH_DATE - now;

            if (diff <= 0) {
                // Launch day has arrived!
                document.querySelector('#cd-days  .cd-num').textContent = '00';
                document.querySelector('#cd-hours .cd-num').textContent = '00';
                document.querySelector('#cd-mins  .cd-num').textContent = '00';
                document.querySelector('#cd-secs  .cd-num').textContent = '00';
                return;
            }

            const days  = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const mins  = Math.floor((diff % 3600000)  / 60000);
            const secs  = Math.floor((diff % 60000)    / 1000);

            document.querySelector('#cd-days .cd-num').textContent = pad(days);
            document.querySelector('#cd-hours .cd-num').textContent = pad(hours);
            document.querySelector('#cd-mins .cd-num').textContent = pad(mins);
            document.querySelector('#cd-secs .cd-num').textContent = pad(secs);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    })();

    /* =========================================================================
       HERO VIDEO MONTAGE (DISABLED)
       ========================================================================= */
    // Video montage logic abandoned in favor of a gorgeous static Kashmiri boat background.

    /* =========================================================================
       CUSTOM CURSOR (Desktop only)
       ========================================================================= */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Run cursor logic on desktop widths
    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop && cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });
        
        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .gallery-item, input, select, textarea');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('js-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('js-hover');
            });
        });
    }

    /* =========================================================================
       STICKY NAVBAR & MOBILE MENU
       ========================================================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(45, 26, 17, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(10px)';
        }
    });

    /* =========================================================================
       SMOOTH SCROLLING (LENIS) & GSAP SETUP
       ========================================================================= */
    let lenis;
    
    // Optimize: Only instantiate heavy smooth scrolling engine and GSAP ticker on desktop
    if (isDesktop) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });
    }

    // Setup GSAP integration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        if (isDesktop) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0, 0);
        }

        /* =========================================================================
           GSAP 3D SCROLL & PARALLAX ANIMATIONS
           ========================================================================= */
        
        // --- 1. Hero Video Parallax ---
        gsap.to(".hero-video", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".hero-text-box", {
            y: 150,
            opacity: 0,
            scale: 0.9,
            rotationX: -10,
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // --- 2. Simple Fade & Slide for Services (Fixed 'off position' issue) ---
        const serviceCards = document.querySelectorAll(".service-card");
        serviceCards.forEach(card => card.classList.remove("reveal-up"));
        gsap.set(serviceCards, { opacity: 1 }); // Ensure base opacity is valid
        
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 85%",
            },
            duration: 1.2,
            y: 50, // Reduced from 100 for subtler effect
            opacity: 0,
            // Removed rotationX and rotationY to prevent cards staying in 'off' or tilted positions
            stagger: 0.1,
            ease: "power3.out"
        });

        // --- 3. Gallery Parallax Mapping ---
        const galleryItems = document.querySelectorAll(".gallery-item");
        galleryItems.forEach((item, i) => {
            item.classList.remove("reveal-up");
            
            gsap.fromTo(item, 
                { opacity: 0, y: 50, rotationZ: i % 2 === 0 ? 2 : -2, scale: 0.95 },
                {
                    opacity: 1, y: 0, rotationZ: 0, scale: 1, duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    }
                }
            );
            
            // Image parallax inside the item
            const img = item.querySelector("img");
            if(img) {
                gsap.to(img, {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });

        // --- 4. General Reveal Fallback for sections (About / Contact) ---
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        revealElements.forEach(el => {
            gsap.set(el, { opacity: 1 }); // Ensure we don't start totally invisible unless animated
            
            if (!el.classList.contains("service-card") && !el.closest(".masonry-gallery")) {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 85%",
                    onEnter: () => el.classList.add("active"),
                    once: true
                });
            }
        });
    } else {
        // Fallback
        requestAnimationFrame(function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        });
        
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* =========================================================================
       3D TILT EFFECT FOR CARDS (Excluded Service Cards for stability)
       ========================================================================= */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((x - centerX) / centerX) * 10;
            const tiltY = ((centerY - y) / centerY) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    /* =========================================================================
       PARTICLES ANIMATION (HERO CANVAS)
       ========================================================================= */
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particlesArray = [];
        const numberOfParticles = window.innerWidth < 768 ? 40 : 80;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5 - 0.2; // Float slightly upwards
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around screen
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = 'rgba(212, 175, 55, 0.4)'; // Warm gold particles
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        function initParticles() {
            particlesArray.length = 0;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

    /* =========================================================================
       THREE.JS GLOBE (ABOUT US SECTION)
       ========================================================================= */
    const globeContainer = document.getElementById('globe-container');
    if (globeContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(600, 600);
        globeContainer.appendChild(renderer.domElement);
        
        // Wireframe Sphere
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        // Warm gold glowing wireframe
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xD4AF37, 
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        camera.position.z = 4;
        
        // Add some random dots (cities)
        const dotGeometry = new THREE.SphereGeometry(0.04, 8, 8);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        
        for (let i = 0; i < 15; i++) {
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            
            const phi = Math.acos(-1 + (2 * i) / 15);
            const theta = Math.sqrt(15 * Math.PI) * phi;
            
            dot.position.x = 2 * Math.cos(theta) * Math.sin(phi);
            dot.position.y = 2 * Math.sin(theta) * Math.sin(phi);
            dot.position.z = 2 * Math.cos(phi);
            
            sphere.add(dot);
        }
        
        function animateGlobe() {
            requestAnimationFrame(animateGlobe);
            // Base ambient rotation
            sphere.rotation.y += 0.002;
            sphere.rotation.x += 0.001;
            renderer.render(scene, camera);
        }
        
        animateGlobe();

        // 3D Scroll Integration for Globe
        if (typeof gsap !== 'undefined') {
            gsap.to(sphere.rotation, {
                y: "+=" + Math.PI * 1.5, // Accumulate relative rotation based on scroll
                x: "+=" + Math.PI / 4, 
                scrollTrigger: {
                    trigger: ".about",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5 // smooth scrubbing
                }
            });
            
            // Bring the globe from far back (3D perspective) into view as you scroll
            gsap.from(sphere.position, {
                z: -4,
                x: 1,
                scrollTrigger: {
                    trigger: ".about",
                    start: "top bottom",
                    end: "center center",
                    scrub: 1
                }
            });
        }
    }
