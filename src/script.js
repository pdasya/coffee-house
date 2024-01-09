const MENU_BURGER = document.getElementById('menu__right-burger');
const MENU_CONTENT = document.getElementById('burger__menu');
const NEXT_BLOCK = document.querySelector('.enjoy');
const MENU_LINKS = document.querySelectorAll('.burger__list-link'); // Выбираем все ссылки в меню

let isOpen = false;

function toggleMenu() {
  isOpen = !isOpen;

  if (isOpen) {
    MENU_BURGER.classList.add('menu__right-burger-active');
    MENU_CONTENT.classList.add('menu_burger');
    const menuHeight = MENU_CONTENT.clientHeight;
    NEXT_BLOCK.style.marginTop = `${menuHeight}px`;
    MENU_CONTENT.classList.remove('slideOut');
    MENU_CONTENT.classList.add('slideIn');
  } else {
    MENU_BURGER.classList.remove('menu__right-burger-active');
    MENU_CONTENT.classList.remove('menu_burger');
    NEXT_BLOCK.style.marginTop = '0';
    MENU_CONTENT.classList.remove('slideIn');
    MENU_CONTENT.classList.add('slideOut');
  }
}

MENU_BURGER.addEventListener('click', toggleMenu);

document.addEventListener('click', (event) => {
  const isClickInsideMenu = MENU_CONTENT.contains(event.target);
  const isClickOnBurger = MENU_BURGER.contains(event.target);

  if (!isClickInsideMenu && !isClickOnBurger && isOpen) {
    toggleMenu();
  }
});

MENU_LINKS.forEach((link) => {
  link.addEventListener('click', () => {
    if (isOpen) {
      toggleMenu();
    }
  });
});


// video in enjoy section

const video = document.getElementById('background-video');


video.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
});

const sliderWrapper = document.querySelector('.favourites__slider');
const sliderControls = document.querySelectorAll('.favourites__slider-controls-el');
const slides = document.querySelectorAll('.favourites__slider-center');
const leftButton = document.querySelector('#favourites__slider-left');
const rightButton = document.querySelector('#favourites__slider-right');

let currentIndex = 0;
let progressInterval;
const intervalDuration = 5000; 
let progressBarInterval; 
let progress = 0; 

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.style.opacity = 1;
      slide.classList.add('active-slide');
      slide.style.transition = 'transform 1s ease'; 
      slide.style.transform = 'translateX(0)'; 
      sliderControls[index].classList.add('favourites__slider-controls-active');
    } else {
      slide.style.opacity = 0;
      slide.classList.remove('active-slide');
      slide.style.transition = 'transform 1s ease'; 
      slide.style.transform = (index < currentIndex) ? 'translateX(-100%)' : 'translateX(100%)'; 
      sliderControls[index].classList.remove('favourites__slider-controls-active');
    }
  });
}

function startSliderInterval() {
  progressInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    // startProgressBar();
  }, intervalDuration);
}

// function startProgressBar() {
//   clearInterval(progressBarInterval);
//   progress = 0;

//   progressBarInterval = setInterval(() => {
//     const progressBar = document.querySelector('.progress-bar'); // Замените на селектор вашего прогресс-бара
//     if (progress >= 100) {
//       clearInterval(progressBarInterval);
//       return;
//     }

//     progress += (100 / intervalDuration) * 1000; // Обновляем прогресс
//     progressBar.style.width = `${progress}%`;
//   }, 1000);
// }

startSliderInterval();

sliderWrapper.addEventListener('mouseover', () => {
  clearInterval(progressInterval);
  clearInterval(progressBarInterval);
});

sliderWrapper.addEventListener('mouseout', () => {
  startSliderInterval();
});

leftButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  updateSlider();
  startProgressBar();
  clearInterval(progressInterval);
});

rightButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
  startProgressBar();
  clearInterval(progressInterval);
});

let touchstartX = 0;
let touchendX = 0;

sliderWrapper.addEventListener('touchstart', (event) => {
  touchstartX = event.changedTouches[0].screenX;
});

sliderWrapper.addEventListener('touchend', (event) => {
  touchendX = event.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  if (touchendX < touchstartX) {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    clearInterval(progressInterval);
  }

  if (touchendX > touchstartX) {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    updateSlider();
    clearInterval(progressInterval);
  }

  startSliderInterval();
}







