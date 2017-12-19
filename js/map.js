'use strict';
(function () {
  var OFFERS_COUNT = 8;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  var getOffersArray = function (arrayLength) {
    var offersArray = [];
    for (var i = 0; i < arrayLength; i++) {
      offersArray[i] = window.data.generateOffer(i);
    }
    return offersArray;
  };
  var allOffers = getOffersArray(OFFERS_COUNT);

  var addPinsToMap = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.generate(allOffers[i]));
    }
    mapPins.appendChild(fragment);
  };
  var onMainPinMouseUp = function () {
    map.classList.remove('map--faded');
    addPinsToMap(allOffers);
    window.form.noticeForm.classList.remove('notice__form--disabled');
    window.form.formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var keyDownEscape = function (evt) {
    if (evt.keyCode === 27) {
      var offerCard = document.querySelector('.map__card');
      map.removeChild(offerCard);
      window.pin.deactivate();
    }
  };
  var filtersContainer = document.querySelector('.map__filters-container');
  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
  document.addEventListener('keydown', keyDownEscape);

  var insertElement = function (element) {
    map.insertBefore(element, filtersContainer);
  };
  window.map = {
    insertElement: insertElement
  };
})();
