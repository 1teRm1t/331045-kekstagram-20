'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var buttons = imgFilters.querySelectorAll('button');

  var getDefaultPhotos = function (photos) {
    return photos.slice();
  };

  var getRandomPhotos = function (photos) {
    var arrayRandom = window.util.random(0, photos.length);
    var randomPhotos = [];
    arrayRandom.forEach(function (it) {
      return randomPhotos.push(photos[it]);
    });
    return randomPhotos;
  };

  var getDiscussionPhotos = function (photos) {
    var comments = photos.slice();
    comments.sort(function (i, j) {
      return j.comments.length - i.comments.length;
    });
    return comments;
  };

  var onChangeFilters = function (photos) {
    var sortPhotos = [];

    var onButtonClickFilter = window.debounce(function (evt) {
      if (evt.target.closest('#filter-default')) {
        onButtonClick(getDefaultPhotos, evt);
      }
      if (evt.target.closest('#filter-random')) {
        onButtonClick(getRandomPhotos, evt);
      }
      if (evt.target.closest('#filter-discussed')) {
        onButtonClick(getDiscussionPhotos, evt);
      }
    });

    var onButtonClick = function (cb, evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.type === 'button') {
        var activeButton = imgFilters.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        window.util.clean('.picture', pictures);
        sortPhotos = cb(photos);
        window.renderCards(sortPhotos);
      }
    };

    var addFilterEvent = function (element, elementId, elementFunction) {
      if (element.id === elementId) {
        element.addEventListener('click', elementFunction);
      }
    };

    buttons.forEach(function (it) {
      addFilterEvent(it, 'filter-default', onButtonClickFilter);
      addFilterEvent(it, 'filter-random', onButtonClickFilter);
      addFilterEvent(it, 'filter-discussed', onButtonClickFilter);
    });
  };

  window.sort = onChangeFilters;
})();
