'use strict';
window.form = (function () {
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var typeOfApartment = document.getElementById('type');
  var minPriceOfAp = document.getElementById('price');
  var noticeForm = document.querySelector('.notice__form');
  var numberOfRooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');

  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomToGuest = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var equateInOutTime = function () {
    timeoutSelect.value = timeinSelect.value;
  };
  var equateOutInTime = function () {
    timeinSelect.value = timeoutSelect.value;
  };

  var syncTypeAndMinPrice = function () {
    minPriceOfAp.min = typeToPrice[typeOfApartment.value];
  };

  var sincRoomAndGuests = function () {
    var capacityValues = roomToGuest[numberOfRooms.value];
    capacityOptions.forEach(function (item) { // запускаем цикл по массиву capacityOptions(2-й селект)
      item.disabled = !capacityValues.includes(item.value);
    });
    capacity.value = capacityValues[0];
  };
  sincRoomAndGuests();
  numberOfRooms.addEventListener('change', sincRoomAndGuests);
  typeOfApartment.addEventListener('change', syncTypeAndMinPrice);
  timeinSelect.addEventListener('change', equateInOutTime);
  timeoutSelect.addEventListener('change', equateOutInTime);
  noticeForm.addEventListener('invalid', function (evt) {
    var invalidField = evt.target;
    invalidField.style.borderColor = 'red';
  }, true);
})();
