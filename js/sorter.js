'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');

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
    var buttons = imgFilters.querySelectorAll('button');
    var sortPhotos = [];

    var defaultButton = window.debounce(function (evt) {
      onButtonClick(getDefaultPhotos, evt);
    });

    var randomButton = window.debounce(function (evt) {
      onButtonClick(getRandomPhotos, evt);
    });

    var discussionButton = window.debounce(function (evt) {
      onButtonClick(getDiscussionPhotos, evt);
    });

    var onButtonClick = function (cb, evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.type === 'button') {
        var activeButton = imgFilters.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        window.util.clean('.picture');
        sortPhotos = cb(photos);
        window.renderCards(sortPhotos);
      }
    };

    var addFilterEvent = function (element, elementId, button) {
      if (element.id === elementId) {
        element.addEventListener('click', button);
      }
    };

    buttons.forEach(function (it) {
      addFilterEvent(it, 'filter-default', defaultButton);
      addFilterEvent(it, 'filter-random', randomButton);
      addFilterEvent(it, 'filter-discussed', discussionButton);
    });
  };

  window.sort = onChangeFilters;
})();
