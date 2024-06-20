function updateNavWidth() {
    const nav = document.getElementById('navbar');
    const root = document.documentElement;
    if (nav) {
        const navWidth = nav.offsetWidth + 'px';
        root.style.setProperty('--nav-width', navWidth);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        updateNavWidth();
        changeActiveLink();
    }, 100); 
});

window.addEventListener('resize', updateNavWidth);

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        this.classList.add('active');

        document.querySelectorAll('.navbar li').forEach(li => {
            li.classList.remove('active');
        });

        this.parentElement.classList.add('active');
    });
});

function changeActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));
    if (navLinks[index]) {
        navLinks[index].classList.add('active');
    }

    document.querySelectorAll('.navbar li').forEach(li => {
        li.classList.remove('active');
    });
    if (navLinks[index] && navLinks[index].parentElement) {
        navLinks[index].parentElement.classList.add('active');
    }
}

window.addEventListener('scroll', changeActiveLink);
