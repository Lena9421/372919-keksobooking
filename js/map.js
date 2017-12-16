'use strict';


// создадим функцию  addPinsToMap которая отрисует сгенерированные DOM элементы в блок с классом .map__pins.
// Для вставки элементов используем DocumentFragment.
var map = document.querySelector('.map');

// создадим функцию которая при событии MouseUp создаст пины итд
var noticeForm = document.querySelector('.notice__form');
var formElements = noticeForm.querySelectorAll('.form__element');

var onMainPinMouseUp = function () {
  map.classList.remove('map--faded');
  window.addPinsToMap(window.allOffers);
  noticeForm.classList.remove('notice__form--disabled');
  formElements.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mouseup', onMainPinMouseUp);
