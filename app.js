// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

// Theme Toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('data-theme', newTheme);

        // Premium GSAP animation: Spin, scale down, and spring back
        gsap.timeline()
            .to(themeToggle, {
                scale: 0.8,
                duration: 0.2,
                ease: "power2.in"
            })
            .to(themeToggle, {
                scale: 1.05,
                duration: 0.15,
                ease: "power2.out"
            })
            .to(themeToggle, {
                scale: 1,
                duration: 0.15,
                ease: "power1.inOut"
            });
    });
}
// Mobile menu toggle functionality
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-links a');

if (mobileToggle && mobileMenu) {
    if (!mobileMenu.querySelector('a')) {
        navLinks.forEach(link => {
            mobileMenu.appendChild(link.cloneNode(true));
        });
    }

    const mobileLinks = mobileMenu.querySelectorAll('a');
    let isMenuOpen = false;

    // Create a timeline to handle entry and exit animations smoothly
    const menuTimeline = gsap.timeline(
        {
            paused: true
        });

    // Step 1: Slide down mobile menu background
    menuTimeline.to(mobileMenu, {
        x: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power4.inOut"
    });

    // Step 2: Stagger slide up and fade in the navigation links
    menuTimeline.fromTo(mobileLinks,
        {
            x: -30,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out"
        },
        "-=0.25" // Overlap slightly with background slide
    );

    // Toggle menu state on hamburger click
    mobileToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileToggle.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        mobileToggle.setAttribute('aria-expanded', isMenuOpen);

        if (isMenuOpen) {
            menuTimeline.play();
        } else {
            menuTimeline.reverse();
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            menuTimeline.reverse();
        });
    });
}
function initLoader(){
    const loader = document.querySelector(".loader");
    const loaderText = document.querySelector(".loader-text");
    const loaderProgress = document.querySelector(".loader-progress");

    //Gasp animation loader text
    gsap.to(loaderText,{
        opacity:1,
        duration:0.7,
        ease: "power2.out",
    });
    //Gasp animation loader progress
    gsap.to(loaderProgress,{
        width:"100%",
        duration:2,
        ease:"power2.inOut",
        onComplete:()=>{
            gsap.to(loaderProgress,{
                opacity:0,
                duration:0.7,
                onComplete:()=>{
                    loader.style.display="none";
                initAnimations()
                }
            })
        }
    });
    
}
//Initialize loader on page
window.addEventListener("load",initLoader);

//Custom cursor (only on desktop)
if(window.innerWidth   < 768){
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener("mousemove",(e)=>{
        gsap.to(cursor,{
            x:e.clientX-10,
            y:e.clientY-10,
            duration:0.,
        })

        gsap.to(cursorFollower,{
            x:e.clientX-20,
            y:e.clientY-20,
            duration:0.1,
        })
    })
    
}

// Initialize lall animations
function initAnimations(){
    //navbar animation
    gsap.to("nav",{
        y:0,
        duration:1,
        ease:"power3.out"
    })
}
    
