'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = window.setup.userDialog;
  var setupUserName = window.setup.setupUserName;
  var showValidityMessage = window.setup.showValidityMessage;
  var changeValidityMessage = window.setup.changeValidityMessage;

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');

  // Функция открытия окна настроек персонажа
  var openSetup = function () {
    userDialog.classList.remove('hidden');

    setupOpen.removeEventListener('click', openSetup);
    setupOpen.removeEventListener('keydown', onIconEnterPress);

    setupClose.addEventListener('click', closeSetup);

    document.addEventListener('keydown', onSetupEscPress);
    setupClose.addEventListener('keydown', onXButtonEnterPress);

    setupUserName.addEventListener('focusin', onInputFocus);
    setupUserName.addEventListener('blur', onInputFocusOut);
  };

  // Функция закрытия окна настроек персонажа
  var closeSetup = function () {
    userDialog.classList.add('hidden');

    userDialog.style = null;

    setupOpen.addEventListener('click', openSetup);
    setupOpen.addEventListener('keydown', onIconEnterPress);

    setupClose.removeEventListener('click', closeSetup);

    document.removeEventListener('keydown', onSetupEscPress);
    setupClose.removeEventListener('keydown', onXButtonEnterPress);

    setupUserName.removeEventListener('focusin', onInputFocus);
    setupUserName.removeEventListener('blur', onInputFocusOut);
  };

  // Функция закрытия окна при нажатии ESC
  var onSetupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSetup();
    }
  };

  // Функция открытия окна при нажатии ENTER на иконке
  var onIconEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openSetup();
    }
  };

  // Функция закрытия окна при нажатии ENTER на Х
  var onXButtonEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeSetup();
    }
  };

  // Снятие возможности закрытия окна нажатием ESC при фокусе в форме ввода имени
  var onInputFocus = function () {
    document.removeEventListener('keydown', onSetupEscPress);

    setupUserName.addEventListener('invalid', showValidityMessage);
    setupUserName.addEventListener('input', changeValidityMessage);
  };

  // Возврат возможности закрытия окна нажатием ESC после потери фокуса полем ввода имени
  var onInputFocusOut = function () {
    document.addEventListener('keydown', onSetupEscPress);

    setupUserName.removeEventListener('invalid', showValidityMessage);
    setupUserName.removeEventListener('input', changeValidityMessage);
  };

  // Открывает окно настроек при клике по иконке
  setupOpen.addEventListener('click', openSetup);

  // Открывает окно настроек при нажатии ENTER на иконке
  setupOpen.addEventListener('keydown', onIconEnterPress);

  window.popup = {
    userDialog: userDialog,
    setupUserName: setupUserName,
    closeSetup: closeSetup
  };

})();
