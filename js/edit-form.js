'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadPreviewImg = document.querySelector('.img-upload__preview img');
  var body = document.querySelector('body');

  var openPopup = function () {
    body.classList.add('modal-open');
    editForm.classList.remove('hidden');
    uploadCancel.addEventListener('keydown', onPopupEscPress);
    uploadCancel.addEventListener('click', closePopupButton);
    hashtagInput.addEventListener('input', window.getCorrectHashtags);
    textDescription.addEventListener('input', window.getCorrectComment);
    effectsList.addEventListener('change', effectChange);
    effectLevelPin.addEventListener('mouseup', effectsChange);
    scaleControlSmaller.addEventListener('click', rescaleMin);
    scaleControlBigger.addEventListener('click', rescaleMax);
    sliderToggle.classList.add('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' && hashtagInput !== document.activeElement && textDescription !== document.activeElement) {
        evt.preventDefault();
        editForm.classList.add('hidden');
      }
    });
  };

  var closePopup = function () {
    body.classList.remove('modal-open');
    editForm.classList.add('hidden');
    uploadCancel.removeEventListener('keydown', onPopupEscPress);
    uploadCancel.removeEventListener('click', closePopupButton);
    hashtagInput.removeEventListener('input', window.getCorrectHashtags);
    textDescription.removeEventListener('input', window.getCorrectComment);
    effectsList.removeEventListener('change', effectChange);
    effectLevelPin.removeEventListener('mouseup', effectsChange);
    scaleControlSmaller.removeEventListener('click', rescaleMin);
    scaleControlBigger.removeEventListener('click', rescaleMax);
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.value = '';
    uploadPreviewImg.className = '';
    uploadPreviewImg.style.transform = '';
    scaleControlValue.value = 100;
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopupButton = function () {
    closePopup();
  };

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
    effectLevelValue.value = pin;
    effectLevelPin.style.left = pin + '%';
    effectLevelDepth.style.width = pin + '%';
    return pin;
  };

  var effectsSettingIntensity = function (effect, pin) {
    if (effect === 'none') {
      uploadPreviewImg.style.filter = '';
    }
    if (effect === 'chrome') {
      uploadPreviewImg.style.filter = 'grayscale(' + pin / 100 + ')';
    }
    if (effect === 'sepia') {
      uploadPreviewImg.style.filter = 'sepia(' + pin / 100 + ')';
    }
    if (effect === 'marvin') {
      uploadPreviewImg.style.filter = 'invert(' + pin + '%)';
    }
    if (effect === 'phobos') {
      uploadPreviewImg.style.filter = 'blur(' + (pin * 3 / 100) + 'px)';
    }
    if (effect === 'heat') {
      uploadPreviewImg.style.filter = 'brightness(' + pin * 3 / 100 + ')';
    }
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
    effectsSettingIntensity(currentValue.value, getPinPosition());
  };
})();
