'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var URLDATA = 'https://js.dump.academy/code-and-magick/data';

  var userDialog = window.setup.userDialog;
  var closeSetup = window.popup.closeSetup;

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.responce);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка! Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка! Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URLDATA);
    xhr.send();
  };

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    save(new FormData(form), function () {
      closeSetup();
    }, function (errorText) {
      var setupFooter = document.querySelector('.setup-footer');
      var errorMessage = document.createElement('p');

      errorMessage.classList.add('setup-footer-error');
      errorMessage.style.backgroundColor = 'red';
      errorMessage.textContent = errorText;
      errorMessage.style.textAlign = 'center';

      if (document.querySelector('.setup-footer-error')) {
        setupFooter.replaceChild(errorMessage, document.querySelector('.setup-footer-error'));
      } else {
        setupFooter.appendChild(errorMessage);
      }
    });
    evt.preventDefault();
  });

})();
