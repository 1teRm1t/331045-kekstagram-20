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

var createNewCommets = function (photo) {
  var socialCommentTemplate = document.querySelector('.social__comment');
  var element = socialCommentTemplate.cloneNode(true);
  element.querySelector('.social__picture').src = photo.avatar;
  element.querySelector('.social__picture').setAttribute('alt', photo.names);
  element.querySelector('.social__text').textContent = photo.message;

  return element;
};

var renderBigSizePhoto = function (photoElement) {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialComments = document.querySelector('.social__comments');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCaption = document.querySelector('.social__caption');
  var commentsLoader = document.querySelector('.comments-loader');
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImg.src = photoElement.url;
  likesCount.textContent = photoElement.likes;
  commentsCount.textContent = photoElement.comments.length;
  socialCaption.textContent = photoElement.description;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoElement.comments.length; i++) {
    fragment.appendChild(createNewCommets(photoElement.comments[i]));
  }
  socialComments.appendChild(fragment);
};

renderBigSizePhoto(createPhotoElements()[0]);
