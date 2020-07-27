'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadPreviewImg = document.querySelector('.img-upload__preview img');
  var defaultEffect = document.querySelector('.effects__radio[value="none"]');
  var body = document.querySelector('body');

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var effectsList = document.querySelector('.effects__list');
  var sliderToggle = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var minValue = 25;
  var maxValue = 100;


  var openPopup = function () {
    body.classList.add('modal-open');
    editForm.classList.remove('hidden');
    uploadCancel.addEventListener('click', closePopupButton);
    hashtagInput.addEventListener('input', window.getCorrectHashtags);
    textDescription.addEventListener('input', window.getCorrectComment);
    effectsList.addEventListener('change', effectChange);
    scaleControlSmaller.addEventListener('click', rescaleMin);
    scaleControlBigger.addEventListener('click', rescaleMax);
    sliderToggle.classList.add('hidden');
    document.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscClose);
  };

  var closePopup = function () {
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    uploadCancel.removeEventListener('click', closePopupButton);
    hashtagInput.removeEventListener('input', window.getCorrectHashtags);
    textDescription.removeEventListener('input', window.getCorrectComment);
    effectsList.removeEventListener('change', effectChange);
    scaleControlSmaller.removeEventListener('click', rescaleMin);
    scaleControlBigger.removeEventListener('click', rescaleMax);
    document.removeEventListener('keydown', onPopupEnterPress);
    document.removeEventListener('keydown', onPopupEscClose);
    uploadFile.value = '';
    hashtagInput.value = '';
    textDescription.value = '';
    uploadPreviewImg.classList = '';
    uploadPreviewImg.style = '';
    defaultEffect.checked = true;
    scaleControlValue.value = '100%';
    window.matches = false;
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  var onPopupEscClose = function (evt) {
    if (evt.key === 'Escape' && hashtagInput !== document.activeElement && textDescription !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopupButton = function () {
    closePopup();
  };

  var rescaleMin = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    if (scaleValue >= minValue + 25) {
      scaleValue -= 25;
      uploadPreviewImg.style.transform = 'scale(' + (scaleValue / 100) + ')';
      scaleControlValue.value = scaleValue + '%';
    }
  };

  var rescaleMax = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    if (scaleValue <= maxValue - 25) {
      scaleValue += 25;
      uploadPreviewImg.style.transform = 'scale(' + (scaleValue / 100) + ')';
      scaleControlValue.value = scaleValue + '%';
    }
  };

  var getPinPosition = function () {
    var depth = effectLevelPin.offsetLeft;
    var width = effectLevelLine.offsetWidth;
    var pin = Math.round(100 * depth / width);
    return pin;
  };

  var effects = {
    none: function () {
      return '';
    },
    chrome: function (pin) {
      return 'grayscale(' + pin / 100 + ')';
    },
    sepia: function (pin) {
      return 'sepia(' + pin / 100 + ')';
    },
    marvin: function (pin) {
      return 'invert(' + pin + '%)';
    },
    phobos: function (pin) {
      return 'blur(' + (pin * 3 / 100) + 'px)';
    },
    heat: function (pin) {
      return 'brightness(' + pin * 3 / 100 + ')';
    }
  };

  var effectsSettingIntensity = function (effect, pin) {
    uploadPreviewImg.style.filter = effects[effect](pin);
  };

  var effectChange = function (evt) {
    effectLevelValue.value = 100;
    effectLevelPin.style.left = 100 + '%';
    effectLevelDepth.style.width = 100 + '%';
    uploadPreviewImg.classList = '';
    uploadPreviewImg.style.filter = '';
    uploadPreviewImg.classList.add('effects__preview--' + evt.target.value);
    if (evt.target.value !== 'none') {
      sliderToggle.classList.remove('hidden');
    } else {
      sliderToggle.classList.add('hidden');
    }
  };

  var effectsChange = function () {
    var currentValue = document.querySelector('.effects__radio:checked');
    var pin = getPinPosition();
    effectLevelValue.value = pin;
    effectsSettingIntensity(currentValue.value, pin);
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var percent = effectLevelLine.getBoundingClientRect().width / 100;
    var startCoords = {
      x: evt.clientX,
      xLineValue: effectLevelValue.value
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        xLineValue: (startCoords.x - moveEvt.clientX) / percent
      };
      if (((startCoords.xLineValue >= 0) && (startCoords.xLineValue <= 100)) || ((startCoords.xLineValue > 100) && (shift.x > 0)) || ((startCoords.xLineValue < 0) && (shift.x < 0))) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelValue.value = effectLevelValue.value - shift.xLineValue;
        effectLevelDepth.style.width = effectLevelValue.value + '%';
        effectsChange(effectLevelValue.value);
        startCoords = {
          x: moveEvt.clientX,
          xLineValue: effectLevelValue.value
        };
      }
      if (startCoords.xLineValue < 0) {
        effectLevelPin.style.left = '0%';
        effectLevelValue.value = 0;
        effectLevelDepth.style.width = '0%';
      }
      if (startCoords.xLineValue > 100) {
        effectLevelPin.style.left = '100%';
        effectLevelValue.value = 100;
        effectLevelDepth.style.width = '100%';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.editform = {
    openPopup: openPopup,
    closePopup: closePopup
  };
})();
