'use strict';

(function () {

  // var NUM_WIZARDS = 4;
  // var WIZARD_NAMES = window.data.WIZARD_NAMES;
  // var WIZARD_LAST_NAMES = window.data.WIZARD_LAST_NAMES;
  // var COAT_COLORS = window.data.COAT_COLORS;
  // var EYES_COLORS = window.data.EYES_COLORS;

  var userDialog = window.setup.userDialog;
  var getRandomElement = window.setup.getRandomElement;

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');

  // Функция, создающая массив объектов со свойствами волшебников
  // var makeWizards = function (numWizards) {
  //   var wizards = [];

  //   for (var i = 0; i < numWizards; i++) {

  //     wizards[i] = {
  //       name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES),
  //       coatColor: getRandomElement(COAT_COLORS),
  //       eyesColor: getRandomElement(EYES_COLORS)
  //     };
  //   }

  //   return wizards;
  // };

  // Функция, наполняющая DOM-элемент по шаблону
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // функция, создающая DOM-элемент во фрагменте
  // var makeWizardsBlock = function (wizardsArr) {
  //   var fragment = document.createDocumentFragment();

  //   wizardsArr.forEach(function (elem) {
  //     fragment.appendChild(renderWizard(elem));
  //   });
  //   similarListElement.appendChild(fragment);
  // };

  window.wizards = {
    getRandomElement: getRandomElement,
    renderWizard: renderWizard,
    similarListElement: similarListElement,
  };


  // Блок выполнения
  // var wizards = makeWizards(NUM_WIZARDS);

  // makeWizardsBlock(wizards);
})();
