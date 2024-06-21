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

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var con = document.getElementById('console');
  var letterCount = 1;
  var wordIndex = 0;
  var isDeleting = false;
  var target = document.getElementById(id);
  target.setAttribute('style', 'color:' + colors[0]);

  function type() {
    if (!isDeleting) {
      // Typing phase
      if (letterCount <= words[wordIndex].length) {
        target.innerHTML = words.slice(0, wordIndex).map((word, index) =>
          `<span style="color:${colors[index % colors.length]}">${word}</span>`
        ).join('<br>') +
        `<br><span style="color:${colors[wordIndex % colors.length]}">${words[wordIndex].substring(0, letterCount)}</span>`;
        letterCount++;
      } else {
        if (wordIndex < words.length - 1) {
          wordIndex++;
          letterCount = 0;
        } else {
          isDeleting = true;
          setTimeout(() => {
            isDeleting = false; // Set isDeleting to false to restart typing
            wordIndex = 0; // Reset wordIndex to start from the beginning
          }, 10000); // Wait for 10 seconds before resetting
          
        }
      }
    } else {
      // Deleting phase
      if (letterCount > 0) {
        target.innerHTML = words.slice(0, wordIndex).map((word, index) =>
          `<span style="color:${colors[index % colors.length]}">${word}</span>`
        ).join('<br>') +
        `<br><span style="color:${colors[wordIndex % colors.length]}">${words[wordIndex].substring(0, letterCount)}</span>`;
        letterCount--;
      } else {
        if (wordIndex > 0) {
          wordIndex--;
          letterCount = words[wordIndex].length;
        } else {
          isDeleting = false;
          letterCount = 1;
        }
      }
    }
  }

  setInterval(type, 70);

  setInterval(() => {
    con.classList.toggle('hidden');
  }, 400); // Toggling visibility every 400ms

  setTimeout(() => {
    isDeleting = true; // Set isDeleting to true to start deleting
  }, 15000); // Start deleting after 15 seconds
}

// Usage example:
consoleText(['Hey there!', 'I’m Samuel Schreiber', 'Nearly Fullstack dev'], 'text', ['black', 'black', 'black']);
