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

var offerType = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец'
};
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

// создадим переменную, которая выбирает дом элемент с классом .map
var map = document.querySelector('.map');
// у блока сложенного в переменную map удалим класс   map--faded
// map.classList.remove('map--faded');

// создадим функцию генерации пинов
// в переменную  newPin  клонируем выбранный DOM элемент с классом .map__pin
// стилизуем элементы клонированной DOM ноды
// навесим хендлер на пин - при клике исполняется функция onPinClick
var generatePin = function (offer) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');
  var newPin = mapPin.cloneNode(true);
  newPin.style.left = offer.Location.x + 'px';
  newPin.style.top = offer.Location.y + 'px';
  newPin.querySelector('img').src = offer.author.avatar;
  newPin.addEventListener('click', function (evt) {
    onPinClick(evt, offer);
  });
  return newPin;
};

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

// createPins(allOffers);

// На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
// создадим DOM-элемент объявления,
// заполним его данными из объекта
// и вставим полученный DOM-элемент в блок .map
// перед блоком .map__filters-container
// В список .popup__features выведите все доступные удобства в квартире из массива {{offer.features}}
// пустыми элементами списка (<li>) с классом feature feature--{{название удобства}}

var getFeatureElement = function (featureElement) {
  var liFragment = document.createDocumentFragment();
  var newElement = document.createElement('li');
  newElement.className = 'feature feature--' + featureElement;
  liFragment.appendChild(newElement);
  return liFragment;
};


var getCard = function (info) {
  var template = document.querySelector('template');
  var mapCard = template.content.querySelector('article.map__card');
  var offerCard = mapCard.cloneNode(true);
  var popUpClose = offerCard.querySelector('.popup__close');
  var cardElementP = offerCard.querySelectorAll('p');
  var ulElement = offerCard.querySelector('.popup__features');
  offerCard.querySelector('.popup__features').textContent = '';
  offerCard.querySelector('h3').textContent = info.offer.title;
  offerCard.querySelector('h4').textContent = offerType[info.offer.type];
  offerCard.querySelector('.popup__price').innerHTML = info.offer.price + '&#x20bd;/ночь';
  offerCard.querySelector('small').textContent = info.offer.address;
  offerCard.querySelector('.popup__avatar').setAttribute('src', info.author.avatar);
  cardElementP[2].textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей';
  cardElementP[3].textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
  var featuresList = getRandomFeatures(OfferInfo.FEATURES, randomArrayLength);
  for (var i = 0; i < featuresList.length; i++) {
    var element = getFeatureElement(featuresList[i]);
    ulElement.appendChild(element);
  }
  cardElementP[4].textContent = info.offer.description;
  // вешаем Listener на событие клика по кнопке закрытия
  popUpClose.addEventListener('click', function (evt) {
    onCloseClick(evt);
  });
  // функция которая добавляет класс hidden к ноде
  // и вызывается при щелчке на кнопку закрытия
  var onCloseClick = function () {
    offerCard.classList.add('hidden');
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active'); // удаляем этот класс
  };
  // возвращаем заполненнкую ноду
  return offerCard;
};

// module 4

// создадим функцию которая при событии MouseUp создаст пины итд
var onMainPinMouseUp = function () {
  map.classList.remove('map--faded');
  createPins(allOffers);
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.classList.remove('notice__form--disabled');
};

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', onMainPinMouseUp);

// Если до этого у другого элемента существовал класс pin--active,
// то у этого элемента класс нужно убрать
var onPinClick = function (evt, offer) {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) { // если в переменной лежит значение с классом .map__pin--active
    activePin.classList.remove('map__pin--active'); // удаляем этот класс
  }
  evt.currentTarget.classList.add('map__pin--active'); // иначе добавляем класс
  // вызываем функцию getCard(offer)
  // и ее результат вставляем в блок map перед классом '.map__filters-container'
  map.insertBefore(getCard(offer), document.querySelector('.map__filters-container'));
};

// Добавить обработчики для альтернативного ввода с клавиатуры keydown для кнопок открытия/закрытия объявлений:

// Если пин объявления в фокусе .map__pin,
// то диалог с подробностями должен показываться по нажатию кнопки ENTER

// Когда диалог открыт, то клавиша ESC должна закрывать диалог
// и деактивировать элемент .map__pin, который был помечен как активный

// Если диалог открыт и фокус находится на крестике,
// то нажатие клавиши ENTER приводит к закрытию диалога и деактивации элемента
// .map__pin, который был помечен как активный
