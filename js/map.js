'use strict';

// константы
var TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = ['flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 100000;
var GUESTS_MIN = 1;
var GUESTS_MAX = 6;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var description = '';
var photos = [];
var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 100;
var LOCATION_Y_MAX = 500;

// Функция выбирающая случайный элемент из массива (формула)
var getRandomElement = function (array) {
  return Math.floor(Math.random() * (array.length));
};
// Функция выбирающая случайный элемент не включающая max
var getRandomNumber = function (min, max) {
  return (Math.random() * (max - min + 1)) + min;
};

var IMG_ADDRESS = 'img/avatars/user';
var IMG_PREFIX = 0;
var IMG__MIN_COUNT = 1;
var IMG_MAX_COUNT = 8;
var IMG_EXTENSION = '.png';

// arr.splice(index[, deleteCount, elem1, ..., elemN])
// arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент
// функция, выбирающая случайный номер без повторов


var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var getRandomWithoutRepeat = function () {
  var randomElements = [];
  var arrcopy = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    randomElements[i] = arrcopy.splice(getRandomElement(arrcopy), 1);
  }
  return randomElements;
};

console.log(getRandomWithoutRepeat(arr));

var appartments = {
  'author': {
    'avatar': IMG_ADDRESS + IMG_PREFIX + getRandomNumber(IMG__MIN_COUNT, IMG_MAX_COUNT) + IMG_EXTENSION
  },

  'offer': {
    'title': getRandomWithoutRepeat(TITLES),
    'address': '',
    'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
    'type': TYPES[getRandomElement(TYPES)],
    'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
    'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
    'checkin': CHECKIN[getRandomElement(CHECKIN)],
    'checkout': CHECKOUT[getRandomElement(CHECKOUT)],
    'features': FEATURES[getRandomElement(FEATURES)],
    'description': [],
    'photos': []
  },
  'location': {
    'x': getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
    'y': getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
  }
};

