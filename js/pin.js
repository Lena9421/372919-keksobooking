'use strict';
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

var addPinsToMap = function (array) {
  var mapPins = window.map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(generatePin(window.allOffers[i]));
  }
  mapPins.appendChild(fragment);
};

// module4-task1
var removeActiveClass = function () {
  var activePin = document.querySelector('.map__pin--active');
  activePin.classList.remove('map__pin--active'); // удаляем этот класс
};

var keyDownEscape = function (evt) {
  if (evt.keyCode === 27) {
    var offerCard = document.querySelector('.map__card');
    window.map.removeChild(offerCard);
    removeActiveClass();
  }
};

document.addEventListener('keydown', keyDownEscape);

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
    window.map.removeChild(offerCard);
  }
  // вызываем функцию getCard(offer)
  // и ее результат вставляем в блок map перед классом '.map__filters-container'
  window.map.insertBefore(window.getCard(offer), document.querySelector('.map__filters-container'));
};

