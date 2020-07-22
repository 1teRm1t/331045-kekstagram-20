'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var success = successMessageTemplate.cloneNode(true);
  var error = errorMessageTemplate.cloneNode(true);

  var removeMessage = function (err) {
    if (main.contains(err)) {
      main.removeChild(err);
    }
    document.removeEventListener('keydown', onEscapePress);
  };

  function deleteMessage(err) {
    window.onEscapePress = function (evt) {
      window.editform.closePopup(evt, function () {
        removeMessage(err);
      });
    };
    err.addEventListener('click', function (evt) {
      if (evt.target === err || evt.target === err.querySelector('button')) {
        removeMessage(err);
      }
    });
  }

  var createErrorMark = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style.position = 'absolute';
    errorBlock.style.left = 0;
    errorBlock.style.right = 0;
    errorBlock.style.fontSize = '18px';
    errorBlock.style = 'z-index: 5; margin: 0 auto; background-color: red;';
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var onEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      error.remove();
      success.remove();
    }
  };

  var successLoad = function () {
    main.appendChild(success);
    deleteMessage(success);
    document.addEventListener('keydown', onEscapePress);
  };

  var errorLoad = function () {
    main.appendChild(error);
    deleteMessage(error);
    document.addEventListener('keydown', onEscapePress);
  };

  window.messages = {
    createErrorMark: createErrorMark,
    successLoad: successLoad,
    errorLoad: errorLoad
  };
})();
