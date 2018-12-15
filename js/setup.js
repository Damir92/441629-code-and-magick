'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var setupUserName = userDialog.querySelector('.setup-user-name');

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
    showValidityMessage: showValidityMessage,
    changeValidityMessage: changeValidityMessage
  };

})();
