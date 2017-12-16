'use strict';

window.card = (function () {
  var getFeatureElement = function (featureElement) {
    var liFragment = document.createDocumentFragment();
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + featureElement;
    liFragment.appendChild(newElement);
    return liFragment;
  };

  var removeActiveClass = function () {
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active'); // удаляем этот класс

    var offerType = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало',
      palace: 'Дворец'
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
      var featuresList = window.data.getRandomFeatures(window.data.OfferInfo.FEATURES, window.data.randomArrayLength);
      for (var i = 0; i < featuresList.length; i++) {
        var element = getFeatureElement(featuresList[i]);
        ulElement.appendChild(element);
      }
      cardElementP[4].textContent = info.offer.description;
      var onCloseClick = function () {
        window.map.removeChild(offerCard);
        removeActiveClass();
      };
      var onCloseEnter = function (evt) {
        if (evt.keyCode === 13) {
          window.map.removeChild(offerCard);
          removeActiveClass();
        }
      };
      popUpClose.addEventListener('click', onCloseClick);
      popUpClose.addEventListener('keydown', onCloseEnter);
      // возвращаем заполненнкую ноду
      return offerCard;
    };
  };
})();


