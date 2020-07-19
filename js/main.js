'use strict';

(function () {
  var TOTAL_PHOTO = 25;
  var photos = window.data.createPhotoElements();
  var pictures = document.querySelector('.pictures');

  var renderCards = function (frag) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < TOTAL_PHOTO; i++) {
      fragment.appendChild(window.createPhotoElement(frag[i]));
    }
    pictures.appendChild(fragment);
  };

  renderCards(photos);

  var onEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      var photo = evt.target.closest('.picture');
      if (photo) {
        var id = photo.dataset.id;
        window.preview.open(photos[id]);
        window.getCleanComments();
      }
    }
  };

  var onOpenBigPhoto = function (evt) {
    var photo = evt.target.closest('.picture');
    if (photo) {
      var id = photo.dataset.id;
      window.preview.open(photos[id]);
    }
  };

  pictures.addEventListener('click', onOpenBigPhoto);
  pictures.addEventListener('keydown', onEnterPress);
})();


