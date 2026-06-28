/* ============================================================
   Nexora Tech Portfolio — Kflay Tesfay
   Vanilla JS · No frameworks
   ============================================================ */

(function () {
    'use strict';

    /* ============================================================
       1. Loading screen
       ============================================================ */
    const loader     = document.getElementById('loader');
    const loaderBar  = document.getElementById('loaderBar');
    const loaderText = document.getElementById('loaderText');
    const loaderMsgs = [
        'Loading experience…',
        'Brewing pixels…',
        'Connecting components…',
        'Tuning the vibe…',
        'Almost there…'
    ];

    function runLoader() {
        if (!loader) return;
        let progress = 0;
        let msgIdx  = 0;

        const tick = () => {
            progress += Math.random() * 14 + 4;
            if (progress > 100) progress = 100;
            loaderBar.style.width = progress + '%';

            const newIdx = Math.min(loaderMsgs.length - 1, Math.floor(progress / 25));
            if (newIdx !== msgIdx) {
                msgIdx = newIdx;
                loaderText.textContent = loaderMsgs[msgIdx];
            }

            if (progress < 100) {
                setTimeout(tick, 120);
            } else {
                setTimeout(() => loader.classList.add('hidden'), 250);
            }
        };
        tick();
    }

    /* ============================================================
       2. Year in footer
       ============================================================ */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ============================================================
       3. Theme toggle (dark / light)
       ============================================================ */
    const themeBtn = document.getElementById('themeToggle');
    const root     = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (themeBtn) {
            themeBtn.innerHTML = theme === 'light'
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        }
        try { localStorage.setItem('nexora-theme', theme); } catch (e) {}
    }

    // Restore preference.
    let savedTheme = 'dark';
    try { savedTheme = localStorage.getItem('nexora-theme') || 'dark'; } catch (e) {}
    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(next);
        });
    }

    /* ============================================================
       4. Custom cursor (desktop only)
       ============================================================ */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let   mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    function initCursor() {
        if (window.innerWidth < 900 || !cursorDot || !cursorRing) return;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover effect.
        document.querySelectorAll('a, button, .nav-link, .project-card, .service-card, .pricing-card, .faq-question, .filter-btn, .skill-tab').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity  = 0;
            cursorRing.style.opacity = 0;
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity  = 1;
            cursorRing.style.opacity = 1;
        });
    }

    /* ============================================================
       5. Sticky navbar + scroll spy
       ============================================================ */
    const navbar   = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        // Sticky background.
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);

        // Back to top.
        const btn = document.getElementById('backToTop');
        if (btn) btn.classList.toggle('show', window.scrollY > 500);

        // Active link based on viewport.
        const offset = window.innerHeight * 0.35;
        let current = '';
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top - offset < 0) current = section.id;
        });
        if (current) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        }

        // Trigger scroll reveal.
        triggerReveal();
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ============================================================
       6. Mobile nav toggle
       ============================================================ */
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ============================================================
       7. Smooth scroll
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================================
       8. Scroll reveal animation
       ============================================================ */
    function triggerReveal() {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    /* ============================================================
       9. Typing animation (hero)
       ============================================================ */
    const typedEl = document.getElementById('typed');
    const roles   = [
        'Full Stack Web Developer',
        'UI/UX Designer',
        'Software Engineer',
        'Founder of Nexora Tech'
    ];

    function typeRole(text, cb) {
        let i = 0;
        typedEl.textContent = '';
        const typing = setInterval(() => {
            typedEl.textContent = text.substring(0, i + 1);
            i++;
            if (i >= text.length) {
                clearInterval(typing);
                setTimeout(cb, 1800);
            }
        }, 70);
    }
    function eraseRole(cb) {
        const text = typedEl.textContent;
        let i = text.length;
        const erasing = setInterval(() => {
            typedEl.textContent = text.substring(0, i - 1);
            i--;
            if (i <= 0) {
                clearInterval(erasing);
                cb();
            }
        }, 35);
    }

    function runTyping() {
        if (!typedEl) return;
        let idx = 0;
        const loop = () => {
            typeRole(roles[idx], () => {
                eraseRole(() => {
                    idx = (idx + 1) % roles.length;
                    loop();
                });
            });
        };
        loop();
    }

    /* ============================================================
       10. Animated skill bars
       ============================================================ */
    function animateSkills() {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && !bar.dataset.done) {
                bar.dataset.done = '1';
                const target = bar.getAttribute('data-skill');
                bar.style.width = target + '%';
            }
        });
    }

    /* ============================================================
       11. Animated counters
       ============================================================ */
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(el => {
            if (el.dataset.done) return;
            const rect = el.getBoundingClientRect();
            if (rect.top > window.innerHeight - 60) return;

            el.dataset.done = '1';
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1800;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target).toLocaleString();
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target.toLocaleString();
            };
            requestAnimationFrame(step);
        });
    }

    /* ============================================================
       12. Skills tabs
       ============================================================ */
    const skillTabs = document.querySelectorAll('.skill-tab');
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            skillTabs.forEach(t => t.classList.toggle('active', t === tab));
            document.querySelectorAll('.skill-panel').forEach(p => {
                p.classList.toggle('active', p.dataset.panel === target);
            });
            // Re-animate bars in the new panel.
            setTimeout(animateSkills, 100);
        });
    });

    /* ============================================================
       13. Portfolio filter
       ============================================================ */
    const filterBtns   = document.querySelectorAll('.portfolio-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.toggle('active', b === btn));
            projectCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !match);
            });
        });
    });

    /* ============================================================
       14. FAQ accordion
       ============================================================ */
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const open = item.classList.contains('open');
            // Close others.
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-answer').style.maxHeight = '0';
            });
            if (!open) {
                item.classList.add('open');
                const ans = item.querySelector('.faq-answer');
                ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });

    /* ============================================================
       15. Testimonials slider
       ============================================================ */
    const track = document.getElementById('testimonialsTrack');
    const dotsWrap = document.getElementById('testimonialsDots');

    function setupTestimonials() {
        if (!track || !dotsWrap) return;
        const cards = track.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;

        let perView = 3;
        if (window.innerWidth < 600) perView = 1;
        else if (window.innerWidth < 900) perView = 2;

        const pages = Math.ceil(cards.length / perView);

        dotsWrap.innerHTML = '';
        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        }

        let current = 0;
        function goTo(idx) {
            current = (idx + pages) % pages;
            const offset = current * (100 / perView);
            track.style.transform = `translateX(-${offset}%)`;
            dotsWrap.querySelectorAll('button').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        // Auto-advance.
        let timer = setInterval(() => goTo(current + 1), 6000);
        track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
        track.parentElement.addEventListener('mouseleave', () => {
            timer = setInterval(() => goTo(current + 1), 6000);
        });
    }

    /* ============================================================
       16. Back to top
       ============================================================ */
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       17. Contact form submission
       ============================================================ */
    const contactForm  = document.getElementById('contactForm');
    const formStatus   = document.getElementById('formStatus');
    const submitBtn    = document.getElementById('submitBtn');

    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = 'form-status show ' + type;
        if (type === 'success') {
            setTimeout(() => formStatus.classList.remove('show'), 6000);
        }
    }

    function validateForm(data) {
        if (data.name.length < 2)    return 'Please enter your name (min 2 chars).';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Please enter a valid email.';
        if (data.subject.length < 2) return 'Please enter a subject.';
        if (data.message.length < 5) return 'Please enter a longer message (min 5 chars).';
        return null;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                name:    contactForm.name.value.trim(),
                email:   contactForm.email.value.trim(),
                phone:   contactForm.phone.value.trim(),
                subject: contactForm.subject.value.trim(),
                message: contactForm.message.value.trim(),
            };

            const err = validateForm(data);
            if (err) { showStatus(err, 'error'); return; }

            submitBtn.disabled  = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

            try {
                const fd = new FormData(contactForm);
                const res = await fetch('https://formsubmit.co/ajax/tesfaykflay75@gmail.com', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: fd
                });
                const json = await res.json().catch(() => null);

                if (res.ok) {
                    showStatus('Thank you! Your message has been sent.', 'success');
                    contactForm.reset();
                } else {
                    showStatus((json && json.message) || 'Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                showStatus('Network error. Please try again later.', 'error');
            } finally {
                submitBtn.disabled  = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fa-solid fa-paper-plane"></i>';
            }
        });
    }

    /* ============================================================
       18. Init
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        runLoader();
        initCursor();
        setupTestimonials();

        // Initial reveals after a tick so layout is ready.
        setTimeout(() => {
            triggerReveal();
            animateSkills();
            animateCounters();
            runTyping();
        }, 100);

        // Re-run on resize for responsiveness.
        window.addEventListener('resize', () => {
            setupTestimonials();
        });

        // Scroll handlers.
        window.addEventListener('scroll', () => {
            animateSkills();
            animateCounters();
        }, { passive: true });
    });

})();
