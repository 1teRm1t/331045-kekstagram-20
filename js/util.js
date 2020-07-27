'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max - min));
    return randomNumber;
  };

  var getArrayRandomNumber = function (min, max) {
    var array = [];
    for (var i = 0; array.length < max; i++) {
      var randomNumb = getRandomNumber(min, max);
      var flag = false;
      for (var j = 0; j < array.length; j++) {
        if (array[j] === randomNumb) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        array[array.length] = randomNumb;
      }
    }
    return array.slice(0, 10);
  };

  var removesPhotos = function (className, container) {
    var cleanPhotos = container.querySelectorAll(className);
    cleanPhotos.forEach(function (it) {
      container.removeChild(it);
    });
  };

  window.util = {
    random: getArrayRandomNumber,
    clean: removesPhotos
  };
})();
