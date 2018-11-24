'use strict';

var NUM_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['де Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

// Функция, отображающая скрытые блоки
var showHiddenBlocks = function (block) {
  block.classList.remove('hidden');
  block.querySelector('.setup-similar').classList.remove('hidden');
};

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

// функция, наполняющая DOM-элемент по шаблону
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция, создающая DOM-элемент во фрагменте
var makeWizardsBlock = function (wizardsArr) {
  wizardsArr.forEach(function (elem) {
    fragment.appendChild(renderWizard(elem));
  });
};

// Блок выполнения
var wizards = makeWizards(NUM_WIZARDS);
var fragment = document.createDocumentFragment();

makeWizardsBlock(wizards);

similarListElement.appendChild(fragment);

showHiddenBlocks(userDialog);
