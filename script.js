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
  .reduce((acc, item) => acc + item, '');

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

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  openLightbox();
  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;
  const largeImgIndex = event.target.dataset.index;
  openLargeImg(largeImgUrl, largeImgAlt, largeImgIndex);
}

function openLightbox() {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);
  refs.lightbox.classList.add('is-open');
}

function closeLightbox() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

function openLargeImg(url, alt, index) {
  refs.lightboxImage.src = url;
  refs.lightboxImage.alt = alt;
  refs.lightboxImage.dataset.index = index;
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}

function onArrowKeyPress(event) {
  let index = Number(refs.lightboxImage.dataset.index);
  const maxCount = galleryList.length - 1;
  const minCount = 0;
  if (event.code === 'ArrowRight' && !(index >= maxCount)) {
    refs.lightboxImage.src = galleryList[index + 1].original;
    refs.lightboxImage.dataset.index = index + 1;
  }
  if (event.code === 'ArrowLeft' && !(index <= minCount)) {
    refs.lightboxImage.src = galleryList[index - 1].original;
    refs.lightboxImage.dataset.index = index - 1;
  }
}
