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
      avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
      message: getArrayRandomElement(COMMENTS),
      name: getArrayRandomElement(NAMES)
    };
    comments.push(comment);
  }
  return comments;
};

var createPhotoElement = function () {
  var photoElement = [];
  for (var i = 0; i < TOTAL_PHOTO; i++) {
    var element = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: createComments()
    };
    photoElement.push(element);
  }
  return photoElement;
};

var renderCards = function (photoElement) {
  var pictures = document.querySelector('.pictures section');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  for (var i = 0; i < TOTAL_PHOTO; i++) {
    var templateElement = template.cloneNode(true);
    templateElement.querySelector('.picture__img').src = photoElement[i].url;
    templateElement.querySelector('.picture__comments').textContent = photoElement[i].comments.length;
    templateElement.querySelector('.picture__likes').textContent = photoElement[i].likes;
    pictures.insertAdjacentElement('beforebegin', templateElement);
  }
};

renderCards(createPhotoElement());
