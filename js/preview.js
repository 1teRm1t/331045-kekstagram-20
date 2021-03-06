'use strict';

(function () {
  var MAX_LENGTH_COMMENT = 140;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialFooterText = document.querySelector('.social__footer-text');

  var openBigPhoto = function (photoElement) {
    bigPicture.classList.remove('hidden');
    var bigPictureImg = document.querySelector('.big-picture__img img');
    var likesCount = document.querySelector('.likes-count');
    var socialCommentCount = document.querySelector('.social__comment-count');
    var socialCaption = document.querySelector('.social__caption');
    var commentsLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImg.src = photoElement.url;
    likesCount.textContent = photoElement.likes;
    socialCaption.textContent = photoElement.description;
    socialFooterText.addEventListener('input', getCorrectBigPhotoComment);
    document.addEventListener('keydown', onEscapePress);
    bigPictureCancel.addEventListener('click', closeBigPhoto);
    window.userComments.createNewComments(photoElement);
    window.getComments();
  };

  var closeBigPhoto = function () {
    if (socialFooterText !== document.activeElement) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onEscapePress);
      socialFooterText.removeEventListener('input', getCorrectBigPhotoComment);
      bigPictureCancel.removeEventListener('keydown', closeBigPhoto);
      window.userComments.getCleanComments();
    }
  };

  var onEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      closeBigPhoto();
    }
  };

  var getCorrectBigPhotoComment = function () {
    socialFooterText.addEventListener('input', function () {
      var valueText = socialFooterText.value.length;

      if (valueText > MAX_LENGTH_COMMENT) {
        socialFooterText.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      } else {
        socialFooterText.setCustomValidity('');
      }
    });
  };

  window.preview = {
    open: openBigPhoto,
    close: closeBigPhoto
  };
})();
