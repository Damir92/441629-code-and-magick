'use strict';

(function () {

  var COAT_COLORS = window.data.COAT_COLORS;
  var EYES_COLORS = window.data.EYES_COLORS;
  var FIREBALL_COLORS = window.data.FIREBALL_COLORS;

  var userDialog = window.setup.userDialog;
  var setupPlayer = userDialog.querySelector('.setup-player');

  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {},
    onFireballChange: function () {}
  };

  // Функция, возвращающая случайный элемент массива
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  wizardCoat.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    wizardCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    wizardEyes.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', function () {
    var newColor = getRandomElement(FIREBALL_COLORS);
    wizardFireball.style.backgroundColor = newColor;
    wizard.onFireballChange(newColor);
  });

  window.wizard = wizard;

})();
