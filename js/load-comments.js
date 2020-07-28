'use strict';

(function () {
  var COMMENTS_COUNT = 5;
  var bigPicture = document.querySelector('.big-picture');

  var getComments = function () {
    var comments = COMMENTS_COUNT;
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var socialComments = bigPicture.querySelector('.social__comments');
    var socialComment = socialComments.querySelectorAll('.social__comment');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    commentsLoader.classList.remove('hidden');
    socialCommentCount.classList.remove('hidden');

    var getCommentsList = function () {
      for (var i = 0; i < socialComment.length; i++) {
        if (i < comments) {
          socialComment[i].classList.remove('hidden');
        } else if (i >= comments) {
          socialComment[i].classList.add('hidden');
        }
      }
      socialCommentCount.textContent = comments + ' из ' + socialComment.length;
    };

    if (socialComment.length <= COMMENTS_COUNT) {
      commentsLoader.classList.add('hidden');
      socialCommentCount.textContent = socialComment.length + ' из ' + socialComment.length;
    } else if (socialComment.length > COMMENTS_COUNT) {
      getCommentsList();
    }

    commentsLoader.addEventListener('click', function () {
      comments += COMMENTS_COUNT;
      if (comments < socialComment.length) {
        commentsLoader.classList.remove('hidden');
      } else if (comments >= socialComment.length) {
        comments = socialComment.length;
        commentsLoader.classList.add('hidden');
      }
      getCommentsList();
    });
  };

  window.getComments = getComments;
})();
