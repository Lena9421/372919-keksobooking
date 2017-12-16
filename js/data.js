'use strict';

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

var offerType = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец'
};

var offersCount = 8;
// Функция выбирающая случайный элемент из массива
var getRandomElement = function (array) {
  return Math.floor(Math.random() * (array.length));
};
// Функция выбирающая случайное число в заданном диапозоне
var getRandomInteger = function (min, max) {
  return (Math.random() * (max - min)) + min;
};
// создадим переменную для хранения результата выполнения функции.
// Результат - случайная длинна массива в диапазоне от 1 до длины массива с OfferInfo.features
var randomArrayLength = getRandomInteger(1, OfferInfo.FEATURES.length);
// создадим функцию для генерации массива случайной длины фич
var getRandomFeatures = function (arr, arraylength) {
  var randomFeatures = [];
  var arrcopy = arr.slice();
  for (var i = 0; i < arraylength; i++) {
    //  приравняем массив к выражению, в котором используется метод splice по отношению
    // к копии масива, при чем, каждый раз вырезается рандомный элемент
    randomFeatures[i] = arrcopy.splice(getRandomElement(arrcopy), 1) + '';
  }
  return randomFeatures;
};

getRandomFeatures(OfferInfo.FEATURES, randomArrayLength);

// функция, которая выдает нам адрес изображения для аватара
var avatarAddress = function (numberOfArrayElement) {
  return ImgProperties.ADDRESS + ImgProperties.PREFIX + numberOfArrayElement
    + ImgProperties.EXTENSION;
};

// создадим функцию, которая генерирует объект содержащий все необходимые
// свойства для вывода информации о сдаваемом жилье
var generateOffer = function (i) {
  var locationX = getRandomInteger(Location.X_MIN, Location.X_MAX).toFixed();
  var locationY = getRandomInteger(Location.Y_MIN, Location.Y_MAX).toFixed();
  return {
    'author': {
      'avatar': avatarAddress(i + 1)
    },
    'offer': {
      'title': OfferInfo.TITLES[getRandomElement(OfferInfo.TITLES)],
      'address': locationX + ', ' + locationY,
      'price': getRandomInteger(OfferInfo.MIN_PRICE, OfferInfo.MAX_PRICE).toFixed(),
      'type': OfferInfo.TYPES[getRandomElement(OfferInfo.TYPES)],
      'rooms': getRandomInteger(OfferInfo.ROOMS_MIN, OfferInfo.ROOMS_MAX).toFixed(),
      'guests': getRandomInteger(OfferInfo.GUESTS_MIN, OfferInfo.GUESTS_MAX).toFixed(),
      'checkin': OfferInfo.CHECKIN[getRandomElement(OfferInfo.CHECKIN)],
      'checkout': OfferInfo.CHECKOUT[getRandomElement(OfferInfo.CHECKOUT)],
      'features': getRandomFeatures(OfferInfo.FEATURES, randomArrayLength),
      'description': '',
      'photos': []
    },
    'location': {
      x: locationX,
      y: locationY
    }
  };
};

// функция которая генерирует массив из объектов
var getOffersArray = function (arrayLength) {
  var offersArray = [];
  for (var i = 0; i < arrayLength; i++) {
    offersArray[i] = generateOffer(i);
  }
  return offersArray;
};

// создадим переменную в которую сложим все значения, которые генерирует функция  getOffersArray
var allOffers = getOffersArray(offersCount);
