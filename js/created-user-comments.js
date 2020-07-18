'use strict';

(function () {
  var createNewComment = function (photo) {
    var socialCommentTemplateContent = document.querySelector('#social__comment_template').content;
    var socialCommentTemplate = socialCommentTemplateContent.querySelector('.social__comment');
    var element = socialCommentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = photo.avatar;
    element.querySelector('.social__picture').alt = photo.names;
    element.querySelector('.social__text').textContent = photo.message;

    return element;
  }

  var socialComments = document.querySelector('.social__comments');

  var createNewComments = function (photoElement) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoElement.comments.length; i++) {
      fragment.appendChild(createNewComment(photoElement.comments[i]));
    }
    socialComments.appendChild(fragment);
  }

  var getCleanComments = function () {
    var comments = socialComments.children;
    while (comments.length !== 0) {
      comments[comments.length - 1].remove();
    }
  }

  window.createNewComments = createNewComments;
  window.getCleanComments = getCleanComments;
})();
