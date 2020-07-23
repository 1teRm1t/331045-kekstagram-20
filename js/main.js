'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  var renderCards = function (frag) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < frag.length; i++) {
      fragment.appendChild(window.createPhotoElement(frag[i], i));
    }
    pictures.appendChild(fragment);
  };

  var onSuccess = function (photos) {
    renderCards(photos);
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
    var main = document.querySelector('main');
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
