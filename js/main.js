'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var main = document.querySelector('main');

  var renderCards = function (images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < images.length; i++) {
      fragment.appendChild(window.createPhotoElement(images[i], i));
    }
    pictures.appendChild(fragment);
  };

  window.renderCards = renderCards;

  var onSuccess = function (photos) {
    renderCards(photos);
    imgFilters.classList.remove('img-filters--inactive');
    window.sort(photos);
    pictures.addEventListener('click', function onOpenBigPhoto(evt) {
      var photo = evt.target.closest('.picture');
      if (photo) {
        var id = photo.dataset.id;
        window.preview.open(photos[id]);
        document.addEventListener('keydown', onEscapePress);
      }
    });
  };

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-block');
    errorBlock.textContent = errorMessage;
    main.insertAdjacentElement('beforebegin', errorBlock);
  };

  var onEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      window.preview.close();
      document.removeEventListener('keydown', onEscapePress);
    }
  };

  window.load.download(onSuccess, onError);
})();
