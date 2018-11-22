'use strict';

var NUM_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['де Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var getRandom = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var makeWizards = function (numWizards) {
  var wizards = [];
  var indexName;
  var indexLastName;
  var indexCoat;
  var indexEye;
  var tempNames = WIZARD_NAMES.slice();
  var tempLastNames = WIZARD_LAST_NAMES.slice();
  var tempCoatColors = COAT_COLORS.slice();
  var tempEyesColors = EYES_COLORS.slice();

  for (i = 0; i < numWizards; i++) {
    indexName = getRandom(tempNames);
    indexLastName = getRandom(tempLastNames);
    indexCoat = getRandom(tempCoatColors);
    indexEye = getRandom(tempEyesColors);

    wizards[i] = {
      name: tempNames[indexName] + ' ' + tempLastNames[indexLastName],
      coatColor: tempCoatColors[indexCoat],
      eyesColor: tempEyesColors[indexEye]
    };

    tempNames.splice(indexName, 1);
    tempLastNames.splice(indexLastName, 1);
    tempCoatColors.splice(indexCoat, 1);
    tempEyesColors.splice(indexEye, 1);
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = makeWizards(NUM_WIZARDS);

var fragment = document.createDocumentFragment();

for (var i = 0; i < NUM_WIZARDS; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
