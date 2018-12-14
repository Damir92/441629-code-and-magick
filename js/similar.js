'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var fireballColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 5;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 3;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  };

  window.wizard.onCoatChange = window.debounce(function (color) {
    document.querySelector('[name="coat-color"]').value = color;
    coatColor = color;
    updateWizards();
  });

  window.wizard.onEyesChange = window.debounce(function (color) {
    document.querySelector('[name="eyes-color"]').value = color;
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onFireballChange = window.debounce(function (color) {
    document.querySelector('[name="fireball-color"]').value = color;
    fireballColor = color;
    updateWizards();
  });

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var onErrorLoad = function (errorText) {
    var header = document.querySelector('header');
    var headerDescription = document.querySelector('.header-description');
    var errorMessage = document.createElement('p');

    errorMessage.classList.add('header-desciption');
    errorMessage.style.backgroundColor = 'red';
    errorMessage.textContent = errorText;

    header.insertBefore(errorMessage, headerDescription);
  };

  window.load(onLoad, onErrorLoad);

})();
