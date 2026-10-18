/**
 * Omkar Taru - Personal Portfolio
 * Interactive Functionality & Navigation Control
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            
            // Toggle hamburger icon animation
            const bars = mobileMenuBtn.querySelectorAll('.hamburger-bar');
            if (isOpen) {
                bars[0].style.transform = 'translateY(9px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close mobile menu on clicking any link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const bars = mobileMenuBtn.querySelectorAll('.hamburger-bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 2. Header Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    const updateActiveNavLink = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);

    // 4. Copy Email to Clipboard Feature
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailAddress = document.getElementById('emailAddress');

    if (copyEmailBtn && emailAddress) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailAddress.textContent.trim();
            try {
                await navigator.clipboard.writeText(email);
                
                // Visual feedback
                const originalHtml = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" width="16" height="16">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                copyEmailBtn.style.color = '#10b981';

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHtml;
                    copyEmailBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        });
    }

    // 5. Back to Top Button Smooth Scroll
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Dynamic Year Fallback
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan && !yearSpan.textContent.trim()) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
