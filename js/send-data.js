'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';
  var URL_DOWNLOAD = 'https://javascript.pages.academy/kekstagram/data';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };

  var loadingData = function (url, method, onSuccess, onError, data) {
    data = data;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.load = {
    download: function (onSuccess, onError) {
      loadingData(URL_DOWNLOAD, 'GET', onSuccess, onError);
    },
    upload: function (data, onSuccess, onError) {
      loadingData(URL, 'POST', onSuccess, onError, data);
    }
  };
})();
