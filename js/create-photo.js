'use strict';

(function () {
  var createPhotoElement = function (photoElement, id) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.picture__img').src = photoElement.url;
    templateElement.querySelector('.picture__comments').textContent = photoElement.comments.length;
    templateElement.querySelector('.picture__likes').textContent = photoElement.likes;
    templateElement.dataset.id = id;
    return templateElement;
  };
  window.createPhotoElement = createPhotoElement;
})();
