'use strict';
// module4-task2 Валидация

// Поля «время заезда» и «время выезда» синхронизированы.
var timeinSelect = document.querySelector('#timein');
var timeoutSelect = document.querySelector('#timeout');

// присвоить значение timeout к значению выбранной опции в timein
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
var typeToPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
// функция приравнивающая значение минимальной цены
// соответствующей типу жилья к атрибуту min для селекта #price

var syncTypeAndMinPrice = function () {
  minPriceOfAp.min = typeToPrice[typeOfApartment.value];
};

// обработчик события для typeOfApartment
typeOfApartment.addEventListener('change', syncTypeAndMinPrice);

// Количество комнат связано с количеством гостей:
// находим селекты в документе
var numberOfRooms = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
// слева ключ, справа значения
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
  }); // закончился цикл
  capacity.value = capacityValues[0];
};
sincRoomAndGuests();

// вешаем  обработчик на numberOfRooms
numberOfRooms.addEventListener('change', sincRoomAndGuests);

var noticeForm = document.querySelector('.notice__form');

// обработчик события для незаполненных полей
noticeForm.addEventListener('invalid', function (evt) {
  var invalidField = evt.target;
  invalidField.style.borderColor = 'red';
}, true);


