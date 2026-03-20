document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const mobileBtn = document.getElementById("mobile_btn");
    const mobileMenu = document.getElementById("mobile_menu");
    const mobileIcon = mobileBtn ? mobileBtn.querySelector("i") : null;
    const desktopNavLinks = document.querySelectorAll("#nav_list a");
    const mobileNavLinks = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections = document.querySelectorAll("main section[id]");
    const revealElements = document.querySelectorAll(".reveal");

    const toggleMobileMenu = () => {
        if (!mobileMenu || !mobileBtn) return;

        const isOpen = mobileMenu.classList.toggle("active");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
        mobileBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

        if (mobileIcon) {
            mobileIcon.classList.toggle("fa-bars", !isOpen);
            mobileIcon.classList.toggle("fa-xmark", isOpen);
        }

        document.body.classList.toggle("menu-open", isOpen);
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileBtn) return;

        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");

        if (mobileIcon) {
            mobileIcon.classList.remove("fa-xmark");
            mobileIcon.classList.add("fa-bars");
        }

        document.body.classList.remove("menu-open");
    };

    if (mobileBtn) {
        mobileBtn.addEventListener("click", toggleMobileMenu);
    }

    allNavLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    const updateHeaderState = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    const updateActiveSection = () => {
        let currentSection = "";
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].getAttribute("id");
        }

        desktopNavLinks.forEach(link => {
            const isActive = link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
        });

        mobileNavLinks.forEach(link => {
            const isActive = link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
        });
    };

    const handleScroll = () => {
        updateHeaderState();
        updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    window.addEventListener("resize", () => {
        updateActiveSection();

        if (window.innerWidth > 1170) {
            closeMobileMenu();
        }
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("show"));
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    updateHeaderState();
    updateActiveSection();
});
