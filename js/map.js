'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var formElements = noticeForm.querySelectorAll('.form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var offersCount = 8;

  var getOffersArray = function (arrayLength) {
    var offersArray = [];
    for (var i = 0; i < arrayLength; i++) {
      offersArray[i] = window.data.generateOffer(i);
    }
    return offersArray;
  };
  var allOffers = getOffersArray(offersCount);
  var addPinsToMap = function (array) {
    var mapPins = map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.generatePin(allOffers[i]));
    }
    mapPins.appendChild(fragment);
  };
  var onMainPinMouseUp = function () {
    map.classList.remove('map--faded');
    addPinsToMap(allOffers);
    noticeForm.classList.remove('notice__form--disabled');
    formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
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
  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
  document.addEventListener('keydown', keyDownEscape);
})();
