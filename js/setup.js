'use strict';

(function () {
  var COAT_COLORS = window.data.COAT_COLORS;
  var EYES_COLORS = window.data.EYES_COLORS;
  var FIREBALL_COLORS = window.data.FIREBALL_COLORS;

  var userDialog = document.querySelector('.setup');
  var setupUserName = userDialog.querySelector('.setup-user-name');

  // Функция, возвращающая случайный элемент массива
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var changeWizardStyle = function (wizard) {
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');
    var wizardFireball = wizard.querySelector('.setup-fireball-wrap');

    var wizardCoatInput = wizard.querySelector('[name="coat-color"]');
    var wizardEyesInput = wizard.querySelector('[name="eyes-color"]');
    var wizardFireballInput = wizard.querySelector('[name="fireball-color"]');

    wizardCoat.addEventListener('click', function () {
      var newColor = getRandomElement(COAT_COLORS);

      wizardCoat.style.fill = newColor;
      wizardCoatInput.value = newColor;
    });

    wizardEyes.addEventListener('click', function () {
      var newColor = getRandomElement(EYES_COLORS);

      wizardEyes.style.fill = newColor;
      wizardEyesInput.value = newColor;
    });

    wizardFireball.addEventListener('click', function () {
      var newColor = getRandomElement(FIREBALL_COLORS);

      wizardFireball.style.backgroundColor = newColor;
      wizardFireballInput.value = newColor;
    });
  };

  var showValidityMessage = function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  };

  var changeValidityMessage = function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  };

  window.setup = {
    userDialog: userDialog,
    setupUserName: setupUserName,
    getRandomElement: getRandomElement,
    changeWizardStyle: changeWizardStyle,
    showValidityMessage: showValidityMessage,
    changeValidityMessage: changeValidityMessage
  };

})();

// Функция, отображающая скрытые блоки
// var showHiddenBlocks = function (block) {
//  block.classList.remove('hidden');
//  block.querySelector('.setup-similar').classList.remove('hidden');
// };

// showHiddenBlocks(userDialog);
