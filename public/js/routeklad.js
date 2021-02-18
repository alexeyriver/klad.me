
let latitude, longitude, coord
navigator.geolocation.getCurrentPosition((geo) => {
  console.log(geo.coords.latitude)
  console.log(geo.coords.longitude)
  latitude = geo.coords.latitude
  longitude = geo.coords.longitude
})

let form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  coord = e.target.name.split(',')
  coord[0] = Number(coord[0])
  coord[1] = Number(coord[1])
  let mapdiv = document.createElement('div')
  mapdiv.id = 'map'
  mapdiv.className = 'routemap '
  let check = document.querySelector('.routemap')
  if (!check) {
    document.body.append(mapdiv)
    ymaps.ready(init);
  }

})



function init() {

  let multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      [latitude, longitude],
      coord
    ],
    params: {
      routingMode: 'masstransit'
    }
  }, {
    boundsAutoApply: true
  });

  var changeLayoutButton = new ymaps.control.Button({
    data: { content: "Изменить макет подписи для пеших сегментов" },
    options: { selectOnClick: true }
  });

  changeLayoutButton.events.add('select', function () {
    multiRoute.options.set(
      "routeWalkMarkerIconContentLayout",
      ymaps.templateLayoutFactory.createClass('{{ properties.duration.text }}')
    );
  });

  changeLayoutButton.events.add('deselect', function () {
    multiRoute.options.unset("routeWalkMarkerIconContentLayout");
  });

  var myMap = new ymaps.Map('map', {
    center: [latitude, longitude],
    zoom: 12,
    controls: [changeLayoutButton]
  }, {
    buttonMaxWidth: 350
  });

  myMap.geoObjects.add(multiRoute);
}

