// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});


// Select all navigation links
const navLinks = document.querySelectorAll('.nav a');

// Add click event listener to each link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove 'active' class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add 'active' class to the clicked link
    link.classList.add('active');
  });
});




// Select all project cards
const projectCards = document.querySelectorAll('.project-card');

// Function to handle mouse move over a card
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = (mouseX - cardCenterX) / (cardRect.width / 2);
    const deltaY = (mouseY - cardCenterY) / (cardRect.height / 2);

    // Apply the perspective and scale effect based on mouse position
    const scale = 1.1; // Maximum scale on hover
    const transformX = deltaX * scale; // Horizontal tilt based on mouse position
    const transformY = deltaY * scale; // Vertical tilt based on mouse position

    // Apply the transformation
    card.style.transform = `scale(1.15) translate(${transformX}px, ${transformY}px)`;
  });

  // Reset transform when mouse leaves
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)'; // Reset to normal scale
  });
});





// contact form basic handler
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thanks — message submitted (demo). Replace with your backend endpoint.');
  this.reset();
});






//only for scroll background color transistion

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = scrollY / scrollHeight;

  // Interpolate between 3 color states:
  // 0 = purple, 0.5 = blue, 1 = red
  let color1, color2, aura;

  if (scrollProgress < 0.5) {
    // Transition from purple → blue
    const t = scrollProgress / 0.5;
    color1 = lerpColor("#0f0222", "#001a33", t);
    color2 = lerpColor("#2b003d", "#003366", t);
    aura = lerpColor("#a153ff", "#00c8ff", t);
  } else {
    // Transition from blue → light red
const t = (scrollProgress - 0.5) / 0.5;
color1 = lerpColor("#001a33", "#0f0222", t); // lighter red background tone
color2 = lerpColor("#003366", "#2b003d", t); // lighter gradient depth
aura = lerpColor("#00c8ff", "#a153ff", t);   // softer glowing red aura
    }

  document.body.style.background = `linear-gradient(180deg, ${color1}, ${color2})`;
  document.body.style.boxShadow = `inset 0 0 100px ${aura}`;
});

// Helper function to blend two hex colors
function lerpColor(a, b, t) {
  const ah = parseInt(a.replace(/#/g, ''), 16);
  const bh = parseInt(b.replace(/#/g, ''), 16);
  const ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = ar + t * (br - ar);
  const rg = ag + t * (bg - ag);
  const rb = ab + t * (bb - ab);
  return `rgb(${rr|0}, ${rg|0}, ${rb|0})`;
}








//for span
const roles = [
  ["Web", "Developer"],
  ["Creative", "Designer"],
  ["UI", "/", "UX", "Designer"]
];

const colors = [
  ["#00ff7f", "#00ff7f"],  // for "Web Developer"
  ["#ff6fd8", "#ff6fd8"],  // for "Creative Designer"
  ["#a153ff", "#a153ff", "#a153ff", "#a153ff"] // for "UI / UX Designer"
];

let roleIndex = 0;
const titleSpan = document.querySelector(".title span");

function changeRole() {
  // Reset animation to replay
  titleSpan.style.animation = "none";
  titleSpan.offsetHeight; // reflow
  titleSpan.style.animation = null;

  // Clear previous words
  titleSpan.innerHTML = "";

  // Add colored words
  const words = roles[roleIndex];
  const wordColors = colors[roleIndex];

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("colored-word");
    span.style.color = wordColors[i % wordColors.length];
    titleSpan.appendChild(span);
  });

  // Move to next role
  roleIndex = (roleIndex + 1) % roles.length;
}

// Initial display
changeRole();

// Change every 2.5 seconds
setInterval(changeRole, 2500);






