import galleryList from './gallery-items.js';

const imageItems = galleryList
  .map((item, index) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${item.original}
  >
    <img
      class="gallery__image"
      src=${item.preview}
      data-source=${item.original}
      data-index = ${index}
      alt=${item.description}
    />
  </a>
</li>`;
  })
  .join('');

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

refs.gallery.insertAdjacentHTML('afterbegin', imageItems);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeBtn.addEventListener('click', closeLightbox);
refs.lightboxOverlay.addEventListener('click', closeLightbox);

let currentIndex = null;
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;
  const largeImgIndex = event.target.dataset.index;
  currentIndex = +largeImgIndex;
  openLightbox(largeImgUrl, largeImgAlt, largeImgIndex);
}

function openLightbox(url, alt, index) {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);
  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = url;
  refs.lightboxImage.alt = alt;
  refs.lightboxImage.dataset.index = index;
}

function closeLightbox() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}

function onArrowKeyPress(event) {
  if (event.code === 'ArrowRight') {
    goToRightElement();
  }
  if (event.code === 'ArrowLeft') {
    goToLeftElement();
  }
}

function goToRightElement() {
  currentIndex = currentIndex === galleryList.length - 1 ? 0 : currentIndex + 1;
  refs.lightboxImage.src = galleryList[currentIndex].original;
}
function goToLeftElement() {
  currentIndex = currentIndex === 0 ? galleryList.length - 1 : currentIndex - 1;
  refs.lightboxImage.src = galleryList[currentIndex].original;
}
