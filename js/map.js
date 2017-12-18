'use strict';

(function () {
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var formElements = noticeForm.querySelectorAll('.form__element');
  var mapPinMain = document.querySelector('.map__pin--main');

  var addPinsToMap = function (array) {
    var mapPins = map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pin.generate(window.data.allOffers[i]));
    }
    mapPins.appendChild(fragment);
  };
  var onMainPinMouseUp = function () {
    map.classList.remove('map--faded');
    addPinsToMap(window.data.allOffers);
    noticeForm.classList.remove('notice__form--disabled');
    formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var keyDownEscape = function (evt) {
    if (evt.keyCode === 27) {
      var offerCard = document.querySelector('.map__card');
      map.removeChild(offerCard);
      window.pin.removeActiveClass();
    }
  };
  mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
  document.addEventListener('keydown', keyDownEscape);

  window.map = {
    map: map
  };
})();
