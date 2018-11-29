'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NUM_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['де Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var setupPlayer = userDialog.querySelector('.setup-player');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

// Функция открытия окна настроек персонажа
var openSetup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

// Функция закрытия окна настроек персонажа
var closeSetup = function () {
  userDialog.classList.add('hidden');
};

// Функция закрытия окна при нажатии ESC
var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

var onWizardClick = function (wizard) {
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

// Функция, отображающая скрытые блоки
// var showHiddenBlocks = function (block) {
//  block.classList.remove('hidden');
//  block.querySelector('.setup-similar').classList.remove('hidden');
// };

// Функция, возвращающая случайный элемент массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция, создающая массив объектов со свойствами волшебников
var makeWizards = function (numWizards) {
  var wizards = [];

  for (var i = 0; i < numWizards; i++) {

    wizards[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };

  }

  return wizards;
};

// Функция, наполняющая DOM-элемент по шаблону
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция, создающая DOM-элемент во фрагменте
var makeWizardsBlock = function (wizardsArr) {
  var fragment = document.createDocumentFragment();

  wizardsArr.forEach(function (elem) {
    fragment.appendChild(renderWizard(elem));
  });
  similarListElement.appendChild(fragment);
};

// Блок выполнения
var wizards = makeWizards(NUM_WIZARDS);

makeWizardsBlock(wizards);

// showHiddenBlocks(userDialog);

// Открывает окно настроек при клике по иконке
setupOpen.addEventListener('click', function () {
  openSetup();
});

// Открывает окно настроек при нажатии ENTER на иконке
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

// Закрывает окно настроек при клике по кнопке Х
setupClose.addEventListener('click', function () {
  closeSetup();
});

// Закрывает окно настроек при нажатии ENTER на кнопке Х
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

// Снятие возможности закрытия окна нажатием ESC
// при фокусе в форме ввода имени
setupUserName.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onSetupEscPress);
});

// Возврат возможности закрытия окна нажатием ESC
// после потери фокуса полем ввода имени
setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onSetupEscPress);
});

setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

setupUserName.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

onWizardClick(setupPlayer);
