console.log('routeklad');

let latitude, longitude, coord
navigator.geolocation.getCurrentPosition((geo) => {
  console.log(geo.coords.latitude)
  console.log(geo.coords.longitude)
  latitude = geo.coords.latitude
  longitude = geo.coords.longitude
})

let form = document.querySelector('form')
form.addEventListener('submit', (e)=>{
e.preventDefault()
console.log(e.target.name.split(','))
coord=e.target.name.split(',')
coord[0]=Number(coord[0])
coord[1]=Number(coord[1])
console.log(coord)
// let maindiv=document.querySelector('.klad')
// let mapdiv = document.createElement('div')
// mapdiv.id='map'
// maindiv.append(mapdiv)
ymaps.ready(init);
})



function init () {
  
  let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
          [latitude, longitude],
          coord
      ],
      params: {
          routingMode: 'masstransit'
      }
  }, {
      // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
      boundsAutoApply: true
  });

  // Создаем кнопку.
  var changeLayoutButton = new ymaps.control.Button({
      data: { content: "Изменить макет подписи для пеших сегментов"},
      options: { selectOnClick: true }
  });

  // Объявляем обработчики для кнопки.
  changeLayoutButton.events.add('select', function () {
      multiRoute.options.set(
          // routeMarkerIconContentLayout - чтобы показывать время для всех сегментов.
          "routeWalkMarkerIconContentLayout",
          ymaps.templateLayoutFactory.createClass('{{ properties.duration.text }}')
      );
  });

  changeLayoutButton.events.add('deselect', function () {
      multiRoute.options.unset("routeWalkMarkerIconContentLayout");
  });

  // Создаем карту с добавленной на нее кнопкой.
  var myMap = new ymaps.Map('map', {
      center: [latitude, longitude],
      zoom: 12,
      controls: [changeLayoutButton]
  }, {
      buttonMaxWidth: 350
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

