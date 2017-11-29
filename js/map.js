'use strict';

// константы
var ImgProperties = {
  ADDRESS: 'img/avatars/user',
  PREFIX: 0,
  EXTENSION: '.png'
};
var OfferInfo = {
  TITLES: ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  TYPES: ['flat', 'house', 'bungalo'],
  ROOMS_MIN: 1,
  ROOMS_MAX: 5,
  MIN_PRICE: 1000,
  MAX_PRICE: 100000,
  GUESTS_MIN: 1,
  GUESTS_MAX: 6,
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ]
};
var Location = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 100,
  Y_MAX: 500
};

// Функция выбирающая случайный элемент из массива
var getRandomElement = function (array) {
  return Math.floor(Math.random() * (array.length));
};
// Функция выбирающая случайное целое число
var getRandomInteger = function (min, max) {
  return (Math.random().toFixed() * (max - min + 1)) + min;
};
// Функция выбирающая элемент не включающая max
var getRandomNumber = function (min, max) {
  return (Math.random().toFixed(2) * (max - min + 1)) + min;
};

// функция, выбирающая случайный номер без повторов
var getRandomWithoutRepeat = function (arr) {
  var randomElements = [];
  var arrcopy = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    randomElements[i] = arrcopy.splice(getRandomElement(arrcopy), 1);
  }
  return randomElements;
};
// arr.splice(index[, deleteCount, elem1, ..., elemN])
// arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент

// функция, которая выдает нам адрес изображения для аватара
var avatarAddress = function (number) {
  return ImgProperties.ADDRESS + ImgProperties.PREFIX + number
    + ImgProperties.EXTENSION;
};

// создадим объект apartments содержащий все необходимые свойства для вывода информации о сдаваемом жилье
var getOffer = function (i) {
  return {
    'author': {
      'avatar': avatarAddress(i + 1)
    },
    'offer': {
      'title': getRandomElement(OfferInfo.TITLES),
      'address': '',
      'price': getRandomInteger(OfferInfo.MIN_PRICE, OfferInfo.MAX_PRICE),
      'type': OfferInfo.TYPES[getRandomElement(OfferInfo.TYPES)],
      'rooms': getRandomInteger(OfferInfo.ROOMS_MIN, OfferInfo.ROOMS_MAX),
      'guests': getRandomInteger(OfferInfo.GUESTS_MIN, OfferInfo.GUESTS_MAX),
      'checkin': OfferInfo.CHECKIN[getRandomElement(OfferInfo.CHECKIN)],
      'checkout': OfferInfo.CHECKOUT[getRandomElement(OfferInfo.CHECKOUT)],
      'features': getRandomWithoutRepeat(OfferInfo.FEATURES),
      'description': '',
      'photos': []
    },
    'Location': {
      x: getRandomNumber(Location.X_MIN, Location.X_MAX),
      y: getRandomNumber(Location.Y_MIN, Location.Y_MAX)
    }
  };
};

var getOffersArray = function (arrayLength) {
  var offersArray = [];
  for (var i = 0; i < arrayLength; i++) {
    offersArray[i] = getOffer(i);
  }
  return offersArray;
};
var offersCount = 8;
var allOffers = getOffersArray(offersCount);

console.log(getOffersArray(8));

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// var pin = document.querySelector('.map__pin');
