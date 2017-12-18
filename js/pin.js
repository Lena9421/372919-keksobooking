'use strict';

(function () {
  var map = document.querySelector('.map');
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

  var onPinClick = function (evt, offer) {
    var activePin = document.querySelector('.map__pin--active');
    var offerCard = document.querySelector('.map__card');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active'); // иначе добавляем класс
    if (offerCard) {
      window.map.map.removeChild(offerCard);
    }
    // вызываем функцию getCard(offer)
    // и ее результат вставляем в блок map перед классом '.map__filters-container'
    map.insertBefore(window.card.get(offer), document.querySelector('.map__filters-container'));
  };
  var removeActiveClass = function () {
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active'); // удаляем этот класс
  };
  window.pin = {
    generate: generatePin,
    removeActiveClass: removeActiveClass
  };
})();
