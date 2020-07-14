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
  for (var i = 0; i < getRandomNumber(2, 6); i++) {
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
      id: i,
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: createComments()
    };
    photoElement.push(element);
  }
  return photoElement;
};

var addElements = createPhotoElements();

var createPhotoElement = function (photoElement) {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.picture__img').src = photoElement.url;
  templateElement.querySelector('.picture__comments').textContent = photoElement.comments.length;
  templateElement.querySelector('.picture__likes').textContent = photoElement.likes;
  templateElement.dataset.id = photoElement.id;
  return templateElement;
};

var pictures = document.querySelector('.pictures');

var renderCards = function (frag) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < TOTAL_PHOTO; i++) {
    fragment.appendChild(createPhotoElement(frag[i]));
  }
  pictures.appendChild(fragment);
};

renderCards(addElements);

var createNewComment = function (photo) {
  var socialCommentTemplateContent = document.querySelector('#social__comment_template').content;
  var socialCommentTemplate = socialCommentTemplateContent.querySelector('.social__comment');
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

var bigPicture = document.querySelector('.big-picture');

var renderBigSizePhoto = function (photoElement) {
  bigPicture.classList.remove('hidden');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCaption = document.querySelector('.social__caption');
  var commentsLoader = document.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImg.src = photoElement.url;
  likesCount.textContent = photoElement.likes;
  commentsCount.textContent = photoElement.comments.length;
  socialCaption.textContent = photoElement.description;
  socialFooterText.addEventListener('input', getCorrectBigPhotoComment);
  document.addEventListener('keydown', onEscapePress);
  bigPictureCancel.addEventListener('click', closeBigPhoto);
  createNewComments(photoElement);
};

var uploadFile = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');
var uploadPreviewImg = document.querySelector('.img-upload__preview img');
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
  uploadCancel.addEventListener('click', closePopupButton);
  hashtagInput.addEventListener('input', getCorrectHashtags);
  textDescription.addEventListener('input', getCorrectComment);
  effectsList.addEventListener('change', effectChange);
  effectLevelPin.addEventListener('mouseup', effectsChange);
  scaleControlSmaller.addEventListener('click', rescaleMin);
  scaleControlBigger.addEventListener('click', rescaleMax);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && hashtagInput !== document.activeElement && textDescription !== document.activeElement) {
      evt.preventDefault();
      editForm.classList.add('hidden');
    }
  });
};

uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  openPopup();
});

var closePopupButton = function () {
  closePopup();
};

var closePopup = function () {
  body.classList.remove('modal-open');
  editForm.classList.add('hidden');
  uploadCancel.removeEventListener('keydown', onPopupEscPress);
  uploadCancel.removeEventListener('click', closePopupButton);
  hashtagInput.removeEventListener('input', getCorrectHashtags);
  textDescription.removeEventListener('input', getCorrectComment);
  effectsList.removeEventListener('change', effectChange);
  effectLevelPin.removeEventListener('mouseup', effectsChange);
  scaleControlSmaller.removeEventListener('click', rescaleMin);
  scaleControlBigger.removeEventListener('click', rescaleMax);
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFile.value = '';
  uploadPreviewImg.style.transform = '';
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

sliderToggle.classList.add('hidden');

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

var bigPictureCancel = document.querySelector('.big-picture__cancel');

var onEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    var picture = evt.target.closest('.picture');
    if (picture) {
      var id = picture.dataset.id;
      renderBigSizePhoto(addElements[id]);
    }
  }
};

var onEscapePress = function (evt) {
  if (evt.key === 'Escape' && socialFooterText !== document.activeElement) {
    closeBigPhoto();
  }
};

var onOpenBigPhoto = function (evt) {
  var photo = evt.target.closest('.picture');
  for (var i = 0; i < addElements.length; i++) {
    if (photo) {
      var id = photo.dataset.id;
      renderBigSizePhoto(addElements[id]);
    }
  }
};

var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  socialFooterText.removeEventListener('input', getCorrectBigPhotoComment);
  bigPictureCancel.removeEventListener('keydown', closeBigPhoto);
};

pictures.addEventListener('click', onOpenBigPhoto);
pictures.addEventListener('keydown', onEnterPress);

var socialFooterText = document.querySelector('.social__footer-text');

var getCorrectBigPhotoComment = function () {
  socialFooterText.addEventListener('input', function () {
    var MAX_LENGTH_COMMENT = 140;
    var valueText = socialFooterText.value.length;

    if (valueText > MAX_LENGTH_COMMENT) {
      socialFooterText.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    } else {
      socialFooterText.setCustomValidity('');
    }
  });
};
