const MENU_BURGER = document.getElementById('menu__right-burger');
const MENU_CONTENT = document.getElementById('burger__menu');
const NEXT_BLOCK = document.querySelector('.offer');
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


let selectedCategory = 'coffee-tab'; 

const MENU = document.getElementById('offer__drink');
MENU.addEventListener('click', (event) => {
  const clickedLink = event.target.closest('a');

  if (clickedLink && MENU.contains(clickedLink)) {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('offer__drink-item-active'));
    clickedLink.classList.add('offer__drink-item-active');

    selectedCategory = clickedLink.id;
  }

  const cardsContainer = document.querySelector('.menu__inner');
  cardsContainer.addEventListener('click', (event) => {
      const clickedCard = event.target.closest('.menu__item');
      if (clickedCard) {
          const name = clickedCard.querySelector('.menu__item-name').textContent;
          const description = clickedCard.querySelector('.menu__item-description').textContent;
          const price = clickedCard.querySelector('.menu__item-price').textContent;
          const image = clickedCard.querySelector('.menu__item-img').getAttribute('src');
  
          const sizesCoffee = ['200 ml', '300 ml', '400 ml'];
          const sizesTea = ['200 ml', '300 ml', '400 ml'];
          const sizesDessert = ['50 g', '100 g', '200 g']; 
  
          const additivesCoffee = ['Sugar', 'Cinnamon', 'Syrup']; 
          const additivesTea = ['Sugar', 'Lemon', 'Syrup']; 
          const additivesDessert = ['Berries', 'Nuts', 'Jam'];
  
          let sizes, additives; 
  
          const activeCategory = document.querySelector('.offer__drink-item.offer__drink-item-active');
  
          if (activeCategory.id === 'coffee-tab') {
              sizes = sizesCoffee;
              additives = additivesCoffee;
          } else if (activeCategory.id === 'tea-tab') {
              sizes = sizesTea;
              additives = additivesTea;
          } else if (activeCategory.id === 'dessert-tab') {
              sizes = sizesDessert;
              additives = additivesDessert;
          }
  
          openModal(name, description, price, image, sizes, additives);
      }
  });
});

function openModal(name, description, price, image, sizes, additives) {
  const modalTitle = document.querySelector('.modal__name');
  const modalDescription = document.querySelector('.modal__description');
  const modalPrice = document.querySelector('.modal__prices-price');
  const modalImage = document.querySelector('.modal__img');

  modalTitle.textContent = name;
  modalDescription.textContent = description;
  modalPrice.textContent = price; 

  modalImage.src = image;

const sizeButtons = document.querySelectorAll('.modal__size-item');
sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    sizeButtons.forEach(btn => btn.classList.remove('modal__size-item-active'));
    button.classList.add('modal__size-item-active');

    updateTotalPrice();
  });
});

const additivesButtons = document.querySelectorAll('.modal__additives-item');
additivesButtons.forEach(button => {
  button.addEventListener('click', () => {
    // additivesButtons.forEach(btn => btn.classList.remove('modal__additives-item-active'));
    button.classList.add('modal__additives-item-active');

    updateTotalPrice();
  });
});

  const sizeItems = document.querySelectorAll('.modal__size-item .item__text-sizes');
  const additiveItems = document.querySelectorAll('.modal__additives-item .item__text-additive');

  sizeItems.forEach((item, index) => {
      item.textContent = sizes[index];
  });

  additiveItems.forEach((item, index) => {
      item.textContent = additives[index];
  });

  function updateTotalPrice() {
    let total = parseFloat(price.substring(1));

    const activeSize = document.querySelector('.modal__size-item-active .item__text-sizes');
    if (activeSize) {
      const activeSizeText = activeSize.textContent.trim();
      if (activeSizeText === '300 ml' || activeSizeText === '100 g') {
        total += 0.5; 
      } else if (activeSizeText === '400 ml' || activeSizeText === '200 g') {
        total += 1; 
      }
    }

    const activeAdditives = document.querySelectorAll('.modal__additives-item-active');
    activeAdditives.forEach(additive => {
      total += 0.5; 
    });

    modalPrice.textContent = `$${total.toFixed(2)}`;
  }

  document.getElementById('modal').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

  
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = 'auto';

    const sizeButtons = document.querySelectorAll('.modal__size-item');
    sizeButtons.forEach(button => {
    button.classList.remove('modal__size-item-active');
  });

    const defaultSizeButton = document.querySelector('.modal__size-item:first-child');
    defaultSizeButton.classList.add('modal__size-item-active');

    const additivesButtons = document.querySelectorAll('.modal__additives-item');
    additivesButtons.forEach(button => {
    button.classList.remove('modal__additives-item-active');
  });
}


fetch('src/products.json')
  .then(response => response.json())
  .then(data => {
    let currentCategory = '';
    const drinkItems = document.querySelectorAll('.offer__drink-item');

    function showMenu(category) {
      currentCategory = category;
      const menu = document.querySelector('.menu');
      menu.innerHTML = '';
      const menuInner = document.createElement('div');
      menuInner.classList.add('menu__inner', 'container');

      const filteredItems = data.filter(item => item.category === category);
      const itemsToDisplay = window.matchMedia('(max-width: 768px)').matches ? filteredItems.slice(0, 4) : filteredItems.slice(0, 8);

      itemsToDisplay.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu__item');

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('menu__item-img-wrapper');

        const img = document.createElement('img');
        img.classList.add('menu__item-img');

        const imagePath = `images/${category}-${index + 1}.png`;
        img.src = imagePath;
        img.alt = item.name;

        imageWrapper.appendChild(img);

        const textWrapper = document.createElement('div');
        textWrapper.classList.add('menu__item-text');

        const name = document.createElement('h2');
        name.classList.add('menu__item-name');
        name.textContent = item.name;

        const description = document.createElement('p');
        description.classList.add('menu__item-description');
        description.textContent = item.description;

        const price = document.createElement('p');
        price.classList.add('menu__item-price');
        price.textContent = `$${item.price}`;

        textWrapper.appendChild(name);
        textWrapper.appendChild(description);
        textWrapper.appendChild(price);

        menuItem.appendChild(imageWrapper);
        menuItem.appendChild(textWrapper);

        menuInner.appendChild(menuItem);
      });

      menu.appendChild(menuInner);
      updateCardEventListeners();
    }

    drinkItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const categories = ['coffee', 'tea', 'dessert'];
        showMenu(categories[index]);
      });
    });

    const LOAD_BUTTON = document.getElementById('load__button');
    LOAD_BUTTON.addEventListener('click', () => {
      const filteredItems = data.filter(item => item.category === currentCategory);
      const elementsToDisplay = filteredItems.slice(4, 8);

      elementsToDisplay.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu__item');

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('menu__item-img-wrapper');

        const img = document.createElement('img');
        img.classList.add('menu__item-img');

        const imagePath = `images/${currentCategory}-${index + 5}.png`;
        img.src = imagePath;
        img.alt = item.name;

        imageWrapper.appendChild(img);

        const textWrapper = document.createElement('div');
        textWrapper.classList.add('menu__item-text');

        const name = document.createElement('h2');
        name.classList.add('menu__item-name');
        name.textContent = item.name;

        const description = document.createElement('p');
        description.classList.add('menu__item-description');
        description.textContent = item.description;

        const price = document.createElement('p');
        price.classList.add('menu__item-price');
        price.textContent = `$${item.price}`;

        textWrapper.appendChild(name);
        textWrapper.appendChild(description);
        textWrapper.appendChild(price);

        menuItem.appendChild(imageWrapper);
        menuItem.appendChild(textWrapper);

        document.querySelector('.menu__inner').appendChild(menuItem);
      });

      LOAD_BUTTON.style.display = 'none';
    });

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const menuItems = document.querySelectorAll('.menu__item');

    function handleViewportChange(mediaQuery) {
      if (mediaQuery.matches) {
        const visibleItemsCount = document.querySelectorAll('.menu__item:not([style*="display: none"])').length;

        if (visibleItemsCount > 4) {
          for (let i = 0; i < menuItems.length; i++) {
            if (i > menuItems.length - 5) {
              menuItems[i].style.display = 'none';
            } else {
              menuItems[i].style.display = '';
            }
          }
        }
      } else {
        menuItems.forEach(item => {
          item.style.display = '';
        });
      }
    }

    handleViewportChange(mediaQuery);
    mediaQuery.addListener(handleViewportChange);
  });


function updateCardEventListeners() {
    const cards = document.querySelectorAll('.menu__item');
  
    cards.forEach(card => {
      card.addEventListener('click', (event) => {
        const clickedCard = event.currentTarget;
        const name = clickedCard.querySelector('.menu__item-name').textContent;
        const description = clickedCard.querySelector('.menu__item-description').textContent;
        const price = clickedCard.querySelector('.menu__item-price').textContent;
        const image = clickedCard.querySelector('.menu__item-img').getAttribute('src');
        openModal(name, description, price, image);
      });
    });
  }
