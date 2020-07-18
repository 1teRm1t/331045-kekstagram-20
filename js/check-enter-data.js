'use strict';

(function () {
  var getCorrectHashtags = function () {
    var hashtagInput = document.querySelector('.text__hashtags');
    var valueHashtag = hashtagInput.value;
    var MAX_HASHTAG_LENGTH = 20;
    var re = /^#[a-zA-Zа-яА-Я0-9]*$/;
    var hashtags = valueHashtag.toLowerCase().split(' ');
    var MAX_HASHTAG = 5;

    for (var i = 0; i < hashtags.length; i++) {
      if (!re.test(hashtags[i])) {
        hashtagInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
      } else if (hashtags.length > MAX_HASHTAG) {
        hashtagInput.setCustomValidity('Максимальное количество хэштегов не более 5');
      } else if (i !== hashtags.indexOf(hashtags[i]) || i !== hashtags.lastIndexOf(hashtags[i])) {
        hashtagInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
      } else if (valueHashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Максимальная длина хэштега — 20 символов');
      } else if (hashtags[i][0] !== '#') {
        hashtagInput.setCustomValidity('Хэштег должен начинаться с "#"(решётка)');
      } else if (hashtags[i] === '#') {
        hashtagInput.setCustomValidity('Хэштег не может состоять только из одной решётки');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  };

  var getCorrectComment = function () {
    var textDescription = document.querySelector('.text__description');
    textDescription.addEventListener('input', function () {
      var MAX_LENGTH_COMMENT = 140;
      var valueText = textDescription.value.length;

      if (valueText > MAX_LENGTH_COMMENT) {
        textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      } else {
        textDescription.setCustomValidity('');
      }
    });
  };

  window.getCorrectHashtags = getCorrectHashtags;
  window.getCorrectComment = getCorrectComment;
})();
