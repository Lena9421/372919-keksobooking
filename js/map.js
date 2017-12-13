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
    'location': {
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

// создадим функцию генерации пинов
// в переменную  newPin  клонируем выбранный DOM элемент с классом .map__pin
// стилизуем элементы клонированной DOM ноды
// навесим хендлер на пин - при клике исполняется функция onPinClick
var generatePin = function (offer) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');
  var newPin = mapPin.cloneNode(true);
  newPin.style.left = offer.location.x + 'px';
  newPin.style.top = offer.location.y + 'px';
  newPin.querySelector('img').src = offer.author.avatar;
  newPin.addEventListener('click', function (evt) {
    onPinClick(evt, offer);
  });
  return newPin;
};

// создадим функцию  addPinsToMap которая отрисует сгенерированные DOM элементы в блок с классом .map__pins.
// Для вставки элементов используем DocumentFragment.
var mapPins = map.querySelector('.map__pins');
var addPinsToMap = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generatePin(allOffers[i]));
  }
  mapPins.appendChild(fragment);
};

// На основе первого по порядку элемента из сгенерированного массива и шаблона template article.map__card
// создадим DOM-элемент объявления,
// заполним его данными из объекта
// и вставим полученный DOM-элемент в блок .map
// перед блоком .map__filters-container

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
  var onCloseClick = function () {
    map.removeChild(offerCard);
    removeActiveClass();
  };
  var onCloseEnter = function (evt) {
    if (evt.keyCode === 13) {
      map.removeChild(offerCard);
      removeActiveClass();
    }
  };
  // вешаем листенеры на  popUpClose
  popUpClose.addEventListener('click', onCloseClick);
  popUpClose.addEventListener('keydown', onCloseEnter);
  // возвращаем заполненнкую ноду
  return offerCard;
};

// module4-task1
var removeActiveClass = function () {
  var activePin = document.querySelector('.map__pin--active');
  activePin.classList.remove('map__pin--active'); // удаляем этот класс
};
var keyDownEscape = function (evt) {
  if (evt.keyCode === 27) {
    var offerCard = document.querySelector('.map__card');
    map.removeChild(offerCard);
    removeActiveClass();
  }
};
document.addEventListener('keydown', keyDownEscape);

// создадим функцию которая при событии MouseUp создаст пины итд
var noticeForm = document.querySelector('.notice__form');
var formElement = noticeForm.querySelectorAll('.form__element');

var onMainPinMouseUp = function () {
  map.classList.remove('map--faded');
  addPinsToMap(allOffers);
  noticeForm.classList.remove('notice__form--disabled');
  formElement.removeAttribute('disabled');
};

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', onMainPinMouseUp);

// Если до этого у другого элемента существовал класс pin--active,
// то у этого элемента класс нужно убрать
var onPinClick = function (evt, offer) {
  var activePin = document.querySelector('.map__pin--active');
  var offerCard = document.querySelector('.map__card');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  evt.currentTarget.classList.add('map__pin--active'); // иначе добавляем класс
  if (offerCard) {
    map.removeChild(offerCard);
  }
  // вызываем функцию getCard(offer)
  // и ее результат вставляем в блок map перед классом '.map__filters-container'
  map.insertBefore(getCard(offer), document.querySelector('.map__filters-container'));
};
// module4-task2 Валидация

// Поля «время заезда» и «время выезда» синхронизированы.
// При изменении одного из полей, значение второго автоматически выставляется точно таким же
// — например, если время заезда указано «после 14», то время выезда будет равно «до 14»
var timeinSelect = document.getElementById('timein');
var timeoutSelect = document.getElementById('timeout');

// нужно приравнять значение timeout к значению выбранной опции в timein
var equateInOutTime = function () {
  timeoutSelect.value = timeinSelect.value;
};
var equateOutInTime = function () {
  timeinSelect.value = timeoutSelect.value;
};
timeinSelect.addEventListener('change', equateInOutTime);
timeoutSelect.addEventListener('change', equateOutInTime);

// Значение поля «Тип жилья» синхронизировано с минимальной ценой:
// находим элементы в документе
var typeOfApartment = document.getElementById('type');
var minPriceOfAp = document.getElementById('price');

// соответствие значения вида апартаментов и минимальной цены
var myMap = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
// функция приравнивающая значение минимальной цены
// соответствующей типу жилья к атрибуту min для селекта #price
var syncTypeAndMinPrice = function () {
  myMap[typeOfApartment.value] = minPriceOfAp.min;
};
// обработчик события для typeOfApartment
typeOfApartment.addEventListener('change', syncTypeAndMinPrice);

// Количество комнат связано с количеством гостей:
// 1 комната — «для одного гостя»
// 2 комнаты — «для 2-х или 1-го гостя»
// 3 комнаты — «для 2-х, 1-го или 3-х гостей»
// 100 комнат — «не для гостей»

// находим селекты в документе
var numberOfRooms = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
// слева ключ справа значения
// ответ - нужный массив
var roomToGuest = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var sincRoomAndGuests = function () {
  var capacityValues = roomToGuest[numberOfRooms.value];
  capacityOptions.forEach(function (item) { // запускаем цикл по массиву capacityOptions(2-й селект)
    // Если значение в поле value у option есть в массиве,
    // то не добавляем disabled, если нет — добавляем
    item.disabled = !capacityValues.includes(item.value);
  });
  capacity.value = capacityValues[0];
};
// вешаем  обработчик на numberOfRooms
numberOfRooms.addEventListener('change', sincRoomAndGuests);
