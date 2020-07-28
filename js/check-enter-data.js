'use strict';

(function () {
  var MAX_HASHTAG = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_LENGTH_COMMENT = 140;
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var getCorrectHashtags = function () {
    var valueHashtag = hashtagInput.value;
    var re = /^#[a-zA-Zа-яА-Я0-9]*$/;
    var hashtags = valueHashtag.toLowerCase().split(' ');

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#' && valueHashtag.length !== 0) {
        hashtagInput.setCustomValidity('Хэштег должен начинаться с "#"(решётка)');
      } else if (hashtags.length > MAX_HASHTAG) {
        hashtagInput.setCustomValidity('Максимальное количество хэштегов не более 5');
      } else if (i !== hashtags.indexOf(hashtags[i]) || i !== hashtags.lastIndexOf(hashtags[i])) {
        hashtagInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
      } else if (valueHashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Максимальная длина хэштега — 20 символов');
      } else if (!re.test(hashtags[i]) && hashtagInput.value.length !== 0) {
        hashtagInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
      } else if (hashtags[i] === '#') {
        hashtagInput.setCustomValidity('Хэштег не может состоять только из одной решётки');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  };

  hashtagInput.addEventListener('invalid', function () {
    getCorrectHashtags();
  });

  hashtagInput.addEventListener('input', function () {
    getCorrectHashtags();
  });

  var getCorrectComment = function () {
    textDescription.addEventListener('input', function () {
      var valueText = textDescription.value.length;

      if (valueText > MAX_LENGTH_COMMENT) {
        textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      } else {
        textDescription.setCustomValidity('');
      }
    });
  };

  uploadForm.addEventListener('submit', function (evt) {
    window.load.upload(new FormData(uploadForm), function () {
      window.editForm.closePopup();
      window.messages.successLoad();
    }, function () {
      window.editForm.closePopup();
      window.messages.errorLoad();
    });
    evt.preventDefault();
  });

  window.checkEnterData = {
    getCorrectHashtags: getCorrectHashtags,
    getCorrectComment: getCorrectComment
  };
})();
