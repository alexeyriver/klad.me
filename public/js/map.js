let search = document.getElementById('search')
let create = document.getElementById('create')
let latitude, longitude
navigator.geolocation.getCurrentPosition((geo) => {
  latitude = geo.coords.latitude
  longitude = geo.coords.longitude
})


console.log('geo')
async function init() {
  let myMap = new ymaps.Map("map", {
    center: [59.9984, 30.3210],
    zoom: 10
  });
  let mapfeta = await fetch('/searchgift')
  let resmap = await mapfeta.json()
  var placemarks = [];
  console.log(resmap);
  for (let el of resmap) {
    createMenuGroup(el)
  }
  function createMenuGroup(group) {
    var collection = new ymaps.GeoObjectCollection(null, { preset: "islands#greenIcon" });
    myMap.geoObjects.add(collection);
    let loc = group.location.split(',')
    var placemark = new ymaps.Placemark(loc, { 
      balloonContentHeader: group.name ,
      balloonContentBody: `<h4 style='color:black; background-color: white'>Автор:${group.author.name}</h4>`+
      `<h4 style='color:black; background-color: white'> <p style='color:black; background-color: white'>Описание: Заблокировано!</p> Нажмите кнопку Взять клад, чтобы получить к нему доступ </h4>` +
     `<form action="/klad/${group._id}" method="GET"> <button type="submit">Взять клад</button></form>`
    },
      {
        iconLayout: 'default#image',
        iconImageHref: 'https://c0.klipartz.com/pngpicture/361/73/gratis-png-iconos-de-computadora-premio-regalo-de-diseno-de-icono-regalo.png',
        iconImageSize: [25, 30],
        iconImageOffset: [-5, -38]
      }
      );
    collection.add(placemark);
    placemarks.push(placemark)
  }

}

search.addEventListener('submit', async (e) => {
  e.preventDefault()
  const resphbs = await fetch('/template/searchgift.hbs');
  const hbs = await resphbs.text();
  const template = Handlebars.compile(hbs);
  let temp = template()
  let div = document.getElementById('createorsearch')
  let div2 = document.createElement('div')
  div2.className = 'searchclass'
  div2.innerHTML = temp
  let searchClass = document.querySelector('.searchclass')
  let createClass = document.querySelector('.createclass')
  let submitcreate = document.querySelector('.submitcreate')
  if (!searchClass && !createClass && !submitcreate) {
    div.append(div2)
    ymaps.ready(init);

  } else if (!searchClass && !submitcreate) {
    createClass.remove()
    div.append(div2)
    ymaps.ready(init);
  } else if (!searchClass && !createClass) {
    submitcreate.remove()
    div.append(div2)
    ymaps.ready(init);
  }



})


create.addEventListener('submit', async (e) => {
  e.preventDefault()
  const resphbs = await fetch('/template/creategift.hbs');
  const hbs = await resphbs.text();
  const template = Handlebars.compile(hbs);
  let temp = template()
  let div = document.getElementById('createorsearch')
  let div2 = document.createElement('div')
  div2.className = 'createclass'
  div2.innerHTML = temp
  let searchClass = document.querySelector('.searchclass')
  let createClass = document.querySelector('.createclass')
  let submitcreate = document.querySelector('.submitcreate')
  if (!searchClass && !createClass && !submitcreate) {
    div.append(div2)
    ymaps.ready(createfn)
  } else if (!createClass && !submitcreate) {
    searchClass.remove()
    div.append(div2)
    ymaps.ready(createfn)
  } else if (!createClass && !searchClass) {
    submitcreate.remove()
    div.append(div2)
    ymaps.ready(createfn)
  }

})

function createfn() {
  let myMap = new ymaps.Map('map', {
    center: [latitude, longitude],
    zoom: 15
  }, {
    searchControlProvider: 'yandex#search'
  })
  let arr = []
  myMap.events.add('click', (e) => {
    const coords = e.get('coords');
    arr.push(coords)
    let myPlacemark = new ymaps.Placemark(coords, {
      balloonContent: '<strong>Метка Вашего клада</strong>',
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'https://c0.klipartz.com/pngpicture/361/73/gratis-png-iconos-de-computadora-premio-regalo-de-diseno-de-icono-regalo.png',
      iconImageSize: [25, 30],
      iconImageOffset: [-5, -38]
    });
    myMap.geoObjects.add(myPlacemark)
    myPlacemark.events.add('contextmenu', function (e) {
      let object = e.get('target');
      arr = arr.filter((el) => el !== object.geometry._coordinates)
      myMap.geoObjects.remove(object)
    })
  })

  let creategiftpost = document.getElementById('creategiftpost')
  creategiftpost.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (arr.length) {
      let { name, description, img, action, coord } = e.target
      coord.value = arr[0]

      let formData = new FormData(creategiftpost);
      const resp = await fetch(action, {
        method: 'POST',
        body: formData
      })
      const frontResp = await resp.json()
      let newDiv = document.createElement('div')
      let div = document.getElementById('createorsearch')
      let createClass = document.querySelector('.createclass')
      newDiv.className = 'submitcreate'
      const resphbs2 = await fetch('/template/submitcreate.hbs');
      const hbs2 = await resphbs2.text();
      const template2 = Handlebars.compile(hbs2);
      newDiv.innerHTML = template2(frontResp)
      createClass.remove()
      div.append(newDiv)

    }
  })

}

