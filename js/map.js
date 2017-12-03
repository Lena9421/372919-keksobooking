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
// Функция выбирающая случайное число в заданном диапозоне
var getRandomInteger = function (min, max) {
  return (Math.random() * (max - min)) + min;
};

// функция, выбирающая случайный номер из массива без повторов
// (результат - все элементы массива в разном порядке)
var getRandomWithoutRepeat = function (arr) {
  var randomElements = [];
  var arrcopy = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    randomElements[i] = arrcopy.splice(getRandomElement(arrcopy), 1);
  }
  return randomElements;
};

var randomArrayLength = getRandomInteger(1, OfferInfo.FEATURES.length);

// создадим функцию для генерации массива случайной длины
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
console.log(getRandomFeatures(OfferInfo.FEATURES, randomArrayLength));
// arr.splice(index[, deleteCount, elem1, ..., elemN])
// arr.splice(1, 1); // начиная с позиции 1, удалить 1 элемент

// функция, которая выдает нам адрес изображения для аватара
var avatarAddress = function (numberOfArrayElement) {
  return ImgProperties.ADDRESS + ImgProperties.PREFIX + numberOfArrayElement
    + ImgProperties.EXTENSION;
};

// создадим функцию, которая генерирует объект содержащий все необходимые свойства для вывода информации о сдаваемом жилье
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
    'Location': {
      x: locationX,
      y: locationY
    }
  };
};
// создадим функцию которая генерирует массив из объектов
var getOffersArray = function (arrayLength) {
  var offersArray = [];
  for (var i = 0; i < arrayLength; i++) {
    offersArray[i] = generateOffer(i);
  }
  return offersArray;
};
// количество объектов в массиве равно 8
var offersCount = 8;
// создадим переменную в которую сложим все значения, которые генерирует функция  getOffersArray
var allOffers = getOffersArray(offersCount);

console.log(getOffersArray(offersCount));
// создадим переменную, которая выбирает дом элемент с классом .map
var map = document.querySelector('.map');
// у блока сложенного в переменную map удалим класс   map--faded
map.classList.remove('map--faded');


// создадим функцию генерации пинов
// в переменную  newPin  клонируем выбранный DOM элемент с классом .map__pin
// стилизуем элементы клонированной DOM ноды
var generatePin = function (info) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');
  var newPin = mapPin.cloneNode(true);
  newPin.style.left = info.Location.x + 'px';
  newPin.style.top = info.Location.y + 'px';
  newPin.querySelector('img').src = info.author.avatar;
  return newPin;
};

generatePin(generateOffer(offersCount));

// создадим функцию  createPins которая отрисует сгенерированные DOM элементы в блок с классом .map__pins.
// Для вставки элементов используем DocumentFragment.
var mapPins = map.querySelector('.map__pins');
var createPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generatePin(allOffers[i]));
  }
  mapPins.appendChild(fragment);
};

createPins(allOffers);

// На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
// создадим DOM-элемент объявления,
// заполним его данными из объекта
// и вставим полученный DOM-элемент в блок .map
// перед блоком .map__filters-container
// В список .popup__features выведите все доступные удобства в квартире из массива {{offer.features}}
// пустыми элементами списка (<li>) с классом feature feature--{{название удобства}}


var template = document.querySelector('template').content;
template.querySelector('.popup__features').innerHTML = '';
var ulElement = document.querySelector('.popup__features');

var getFeaturesList = function (features) {
  var liFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + features[i];
    liFragment.appendChild(newElement);
  }
  ulElement.appendChild(liFragment);
};

var renderCard = function (info) {
  template = document.querySelector('template');
  var mapCard = template.content.querySelector('article.map__card');
  var cardElement = mapCard.cloneNode(true);
  var mapCardP = mapCard.querySelectorAll('p');
  cardElement.querySelector('h3').textContent = info.offer.title;
  cardElement.querySelector('.popup__price').innerHTML = info.offer.price + '&#x20bd;/ночь';
  cardElement.querySelector('small').textContent = info.offer.address;
  cardElement.querySelector('.popup__avatar').setAttribute('src', info.author.avatar);
  mapCardP[2].textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей';
  mapCardP[3].textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
  mapCardP[4].textContent = info.offer.description;
  map.insertBefore(cardElement, document.querySelector('map__filters-container'));
  return mapCard;
};

renderCard(generateOffer(0));

