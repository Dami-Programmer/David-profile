const texts = ["Front-end Dev.", "Video editor", "VFX Designer"];
const typingSpeed = 50; // speed for typing (ms per character)
const eraseSpeed = 50; // speed for erasing
const delayBetween = 3000; // wait time before erasing (3s)

let textIndex = 0;
let charIndex = 0;
const textElement = document.getElementById("text");

function type() {
  if (charIndex < texts[textIndex].length) {
    textElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    // wait before erasing
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    // move to next text
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

// start typing effect
type();

// /////////////////////////////////
// popup script

// DOM Elements
const triggerBtn = document.getElementById("triggerPopup");
const popupOverlay = document.getElementById("popupOverlay");
const popupContent = document.getElementById("popupContent");
const closeBtn = document.getElementById("closePopup");

// Open Popup
triggerBtn.addEventListener("click", () => {
  popupOverlay.classList.add("active");
  popupContent.classList.add("active");

  // Anime.js animation for popup entrance
  anime({
    targets: popupContent,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600,
    easing: "easeOutElastic(1, .8)",
  });

  // Background fade in
  anime({
    targets: popupOverlay,
    opacity: [0, 1],
    duration: 400,
    easing: "easeOutQuad",
  });

  // Stagger animation for contact items
  anime({
    targets: ".contact-item",
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(150),
    duration: 600,
    easing: "easeOutQuad",
  });
});

// Close Popup
closeBtn.addEventListener("click", () => {
  // Anime.js animation for popup exit
  anime({
    targets: popupContent,
    scale: [1, 0.8],
    opacity: [1, 0],
    duration: 400,
    easing: "easeInQuad",
  });

  // Background fade out
  anime({
    targets: popupOverlay,
    opacity: [1, 0],
    duration: 300,
    easing: "easeInQuad",
    complete: function () {
      popupOverlay.classList.remove("active");
      popupContent.classList.remove("active");
    },
  });
});

// Close when clicking outside the content
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closeBtn.click();
  }
});

// Add hover animation to contact items
document.querySelectorAll(".contact-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    anime({
      targets: this,
      scale: 1.05,
      duration: 300,
      easing: "easeOutQuad",
    });
  });

  item.addEventListener("mouseleave", function () {
    anime({
      targets: this,
      scale: 1,
      duration: 300,
      easing: "easeOutQuad",
    });
  });
});

/////////////////

// video play
const videos = document.querySelectorAll(".video-preview");

videos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play();
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
  });
});

// coding project

const steps = {
  1: {
    title: "Solar vendor",
    desc: "Rv Power is the online storefront for a company dedicated to providing a comprehensive range of solar power solutions. The website is designed to allow customers to browse and purchase a wide variety of equipment needed for setting up solar power systems, from the core components like panels and inverters to related products like solar-powered lighting and security cameras. ",
    img: "Rv.png",
    link: "https://rvhomesandpower.com/",
  },
  2: {
    title: "Gina Beauty & Makeup",
    desc: "A modern online storefront for a beauty brand.  It allows customers to browse a wide selection of beauty and makeup products through a clean. The design emphasizes elegance, usability, and strong visuals, creating an engaging shopping experience. Key focuses include smooth animations, intuitive navigation, and scalability, making it a professional and user-friendly platform that highlights the brand’s products effectively.",
    img: "gina.png",
    link: "https://gina-beauty-makeup.netlify.app/",
  },
  3: {
    title: "03 Design Phase",
    desc: "We create wireframes, UI/UX mockups and design prototypes that reflect your brand and vision.",
    img: "20240524_234249.jpg",
    link: "https://example.com/design",
  },
  4: {
    title: "04 Development",
    desc: "Our team builds your product, writing clean and efficient code to bring the designs to life.",
    img: "card.jpg",
    link: "https://example.com/development",
  },
  5: {
    title: "05 Launch & Support",
    desc: "Finally, we launch your project and provide ongoing support to ensure everything runs smoothly.",
    img: "cha.jpg",
    link: "https://example.com/launch",
  },
};

const stepBtns = document.querySelectorAll(".step-btn");
const stepTitle = document.getElementById("stepTitle");
const stepDesc = document.getElementById("stepDesc");
const stepImage = document.getElementById("stepImage");
const stepLink = document.getElementById("stepLink");

const transitionTime = 500; // match CSS transition

stepBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    stepBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const step = steps[btn.dataset.step];

    stepTitle.classList.add("fade");
    stepDesc.classList.add("fade");
    stepImage.classList.add("fade");

    setTimeout(() => {
      stepTitle.textContent = step.title;
      stepDesc.textContent = step.desc;
      stepImage.src = step.img;
      stepLink.href = step.link; // 🔗 update link

      stepTitle.classList.remove("fade");
      stepDesc.classList.remove("fade");
      stepImage.classList.remove("fade");
    }, transitionTime);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const step = steps[1]; // step 1 by default
  stepTitle.textContent = step.title;
  stepDesc.textContent = step.desc;
  stepImage.src = step.img;
  stepLink.href = step.link; // 🔗 update link
});
