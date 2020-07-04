'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Маша', 'Петя', 'Таня', 'Миша', 'Саша', 'Аня', 'Дима'];
var TOTAL_PHOTO = 25;

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

var getArrayRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var createComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomNumber(1, 5); i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getArrayRandomElement(COMMENTS),
      name: getArrayRandomElement(NAMES)
    };
    comments.push(comment);
  }
  return comments;
};

var createPhotoElements = function () {
  var photoElement = [];
  for (var i = 0; i < TOTAL_PHOTO; i++) {
    var element = {
      url: 'photos/' + getRandomNumber(1, 25) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: createComments()
    };
    photoElement.push(element);
  }
  return photoElement;
};

var createPhotoElement = function (photoElement) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < TOTAL_PHOTO; i++) {
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.picture__img').src = photoElement[i].url;
    templateElement.querySelector('.picture__comments').textContent = photoElement[i].comments.length;
    templateElement.querySelector('.picture__likes').textContent = photoElement[i].likes;
    fragment.appendChild(templateElement);
  }
  return fragment;
};

var renderCards = function (fragment) {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
};

renderCards(createPhotoElement(createPhotoElements()));

var createNewComment = function (photo) {
  var socialCommentTemplate = document.querySelector('.social__comment');
  var element = socialCommentTemplate.cloneNode(true);
  element.querySelector('.social__picture').src = photo.avatar;
  element.querySelector('.social__picture').alt = photo.names;
  element.querySelector('.social__text').textContent = photo.message;

  return element;
};

var createNewComments = function (photoElement) {
  var fragment = document.createDocumentFragment();
  var socialComments = document.querySelector('.social__comments');
  for (var i = 0; i < photoElement.comments.length; i++) {
    fragment.appendChild(createNewComment(photoElement.comments[i]));
  }
  socialComments.appendChild(fragment);
};

var renderBigSizePhoto = function (photoElement) {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCaption = document.querySelector('.social__caption');
  var commentsLoader = document.querySelector('.comments-loader');
  document.body.classList.add('modal-open');
  // bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImg.src = photoElement.url;
  likesCount.textContent = photoElement.likes;
  commentsCount.textContent = photoElement.comments.length;
  socialCaption.textContent = photoElement.description;

  createNewComments(photoElement);
};

renderBigSizePhoto(createPhotoElements()[0]);


var uploadFile = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');
var uploadEffects = document.querySelector('.img-upload__effects');
var uploadCancel = document.querySelector('#upload-cancel');
var body = document.querySelector('body');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Enter') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  body.classList.add('modal-open');
  editForm.classList.remove('hidden');
  uploadCancel.addEventListener('keydown', onPopupEscPress);
  uploadCancel.addEventListener('click', onPopupEscPress);
  hashtagInput.addEventListener('input', getCorrectHashtags);
  textDescription.addEventListener('input', getCorrectComment);
  uploadEffects.addEventListener('change', effectChange);
  scaleControlSmaller.addEventListener('click', rescaleMin);
  scaleControlBigger.addEventListener('click', rescaleMax);

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && hashtagInput !== document.activeElement && textDescription !== document.activeElement) {
      evt.preventDefault();
      editForm.classList.add('hidden');
    }
  });
};

uploadFile.addEventListener('change', function () {
  openPopup();
});

var closePopup = function () {
  body.classList.remove('modal-open');
  editForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadCancel.removeEventListener('keydown', onPopupEscPress);
  uploadCancel.removeEventListener('click', onPopupEscPress);
  hashtagInput.removeEventListener('input', getCorrectHashtags);
  textDescription.removeEventListener('input', getCorrectComment);
  uploadEffects.removeEventListener('change', effectChange);
  scaleControlSmaller.removeEventListener('click', rescaleMin);
  scaleControlBigger.removeEventListener('click', rescaleMax);
  uploadFile.value = '';
  effectOriginal();
};

uploadCancel.addEventListener('click', function () {
  closePopup();
});

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var uploadPreviewImg = document.querySelector('.img-upload__preview img');
var sliderToggle = document.querySelector('.img-upload__effect-level');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var hashtagInput = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');

var defaultValue = 100;
var minValue = 25;
var maxValue = 100;

scaleControlValue.value = defaultValue + '%';

var rescaleMin = function () {
  if (defaultValue >= minValue + 25) {
    defaultValue -= 25;
    uploadPreviewImg.style.transform = 'scale(' + (defaultValue / 100) + ')';
    scaleControlValue.value = defaultValue + '%';
  }
};

var rescaleMax = function () {
  if (defaultValue <= maxValue - 25) {
    defaultValue += 25;
    uploadPreviewImg.style.transform = 'scale(' + (defaultValue / 100) + ')';
    scaleControlValue.value = defaultValue + '%';
  }
};

var effectOriginal = function () {
  uploadPreviewImg.className = '';
  uploadPreviewImg.style = '';
};

var sliderHidden = function () {
  sliderToggle.classList.add('hidden');
};

var effectsChange = function () {
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');
  var effectNone = document.querySelector('#effect-none');

  /*
  if (!effect.matches(effectNone)) {
    sliderToggle.classList.remove('hidden');
    effectLevelPin.addEventListener('mouseup', effectsSettingIntensity);
  } else {
    effectOriginal();
    sliderHidden();
  }
  if (effect.matches(effectChrome)) {
    effectOriginal();
    uploadPreviewImg.classList.add('effects__preview--chrome');
  }
  if (effect.matches(effectSepia)) {
    effectOriginal();
    uploadPreviewImg.classList.add('effects__preview--sepia');
  }
  if (effect.matches(effectMarvin)) {
    effectOriginal();
    uploadPreviewImg.classList.add('effects__preview--marvin');
  }
  if (effect.matches(effectPhobos)) {
    effectOriginal();
    uploadPreviewImg.classList.add('effects__preview--phobos');
  }
  if (effect.matches(effectHeat)) {
    effectOriginal();
    uploadPreviewImg.classList.add('effects__preview--heat');
  } */

  effectChrome.addEventListener('click', function () {
    uploadPreviewImg.removeAttribute('class');
    uploadPreviewImg.classList.add('effects__preview--chrome');
  });
  effectSepia.addEventListener('click', function () {
    uploadPreviewImg.removeAttribute('class');
    uploadPreviewImg.classList.add('effects__preview--sepia');
  });
  effectMarvin.addEventListener('click', function () {
    uploadPreviewImg.removeAttribute('class');
    uploadPreviewImg.classList.add('effects__preview--marvin');
  });
  effectPhobos.addEventListener('click', function () {
    uploadPreviewImg.removeAttribute('class');
    uploadPreviewImg.classList.add('effects__preview--phobos');
  });
  effectHeat.addEventListener('click', function () {
    uploadPreviewImg.removeAttribute('class');
    uploadPreviewImg.classList.add('effects__preview--heat');
  });
  effectNone.addEventListener('click', function () {
    uploadPreviewImg.removeAttribute('class');
    uploadPreviewImg.classList.add('effects__preview--none');
    sliderHidden();
  });
};

var getPinPosition = function () {
  var width = effectLevelLine.clientWidth;
  var depth = effectLevelDepth.clientWidth;
  var pin = (depth / width);
  return pin;
};

var effectsSettingIntensity = function () {
  var part = getPinPosition().toFixed(1);
  var percent = (getPinPosition() * 100).toFixed() + '%';
  var pixel = (3 / 100) * (getPinPosition() * 100).toFixed() + 'px';

  if (uploadPreviewImg.classList.contains('effects__preview--chrome')) {
    uploadPreviewImg.style = 'filter: grayscale(' + part + ')';
  }
  if (uploadPreviewImg.classList.contains('effects__preview--sepia')) {
    uploadPreviewImg.style = 'filter: sepia(' + part + ')';
  }
  if (uploadPreviewImg.classList.contains('effects__preview--marvin')) {
    uploadPreviewImg.style = 'filter: invert(' + percent + ')';
  }
  if (uploadPreviewImg.classList.contains('effects__preview--phobos')) {
    uploadPreviewImg.style = 'filter: blur(' + pixel + ')';
  }
  if (uploadPreviewImg.classList.contains('effects__preview--heat')) {
    uploadPreviewImg.style = 'filter: brightness(' + part + ')';
  }
};

var effectChange = function (select) {
  var effect = select.effect;
  effectLevelPin.removeEventListener('mouseup', effectsSettingIntensity);
  effectsChange(effect);
};

var getCorrectHashtags = function () {
  hashtagInput.addEventListener('input', function () {
    var valueHashtag = hashtagInput.value;
    var MAX_HASHTAG_LENGTH = 20;
    var re = /^#[a-zA-Zа-яА-Я0-9]*$/;
    var hashtags = valueHashtag.split(' ');
    var MAX_HASHTAG = 5;

    for (var i = 0; i < hashtags.length; i++) {
      if (!re.test(hashtags[i])) {
        hashtagInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
      } else if (hashtags.length > MAX_HASHTAG) {
        hashtagInput.setCustomValidity('Максимальное количество хэштегов не более 5');
      } else if (i !== hashtags.indexOf(hashtags[i]) || i !== hashtags.lastIndexOf(hashtags[i])) {
        hashtagInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
      } else if (valueHashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Максимальная длина хэштега — 20 символов');
      } else if (hashtags[i][0] !== '#') {
        hashtagInput.setCustomValidity('Хэштег должен начинаться с "#"(решётка)');
      } else if (hashtags[i] === '#') {
        hashtagInput.setCustomValidity('Хэштег не может состоять только из одной решётки');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  });
};

var getCorrectComment = function () {
  textDescription.addEventListener('input', function () {
    var MAX_LENGTH_COMMENT = 140;
    var valueText = textDescription.value.length;

    if (valueText > MAX_LENGTH_COMMENT) {
      textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    } else {
      textDescription.setCustomValidity('');
    }
  });
};
