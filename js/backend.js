'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var URLDATA = 'https://js.dump.academy/code-and-magick/data';

  var userDialog = window.setup.userDialog;
  var similarListElement = window.wizards.similarListElement;
  var renderWizard = window.wizards.renderWizard;
  var getRandomElement = window.setup.getRandomElement;
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

    xhr.timeout = 10;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
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

    xhr.timeout = 100;

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

      errorMessage.style.backgroundColor = 'red';
      errorMessage.textContent = errorText;

      setupFooter.appendChild(errorMessage);
    });
    evt.preventDefault();
  });

  load(function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(getRandomElement(wizards)));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }, function (errorText) {
    var header = document.querySelector('header');
    var headerDescription = document.querySelector('.header-description');
    var errorMessage = document.createElement('p');

    errorMessage.classList.add('header-desciption');
    errorMessage.style.backgroundColor = 'red';
    errorMessage.textContent = errorText;

    header.insertBefore(errorMessage, headerDescription);
  });

})();
