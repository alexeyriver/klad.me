let search = document.getElementById('search')
let create = document.getElementById('create')
let latitude, longitude
navigator.geolocation.getCurrentPosition((geo) => {
  console.log(geo.coords.latitude)
  console.log(geo.coords.longitude)
  latitude = geo.coords.latitude
  longitude = geo.coords.longitude
})

let flag = true

console.log('geo')
function init() {
  let myMap = new ymaps.Map("map", {
    center: [59.9984, 30.3210],
    zoom: 10
  });
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
  if (!searchClass && !createClass) {
    div.append(div2)
    ymaps.ready(init);

  } else if (!searchClass) {
    createClass.remove()
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
  if (!searchClass && !createClass) {
    div.append(div2)
    ymaps.ready(function () {
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
        console.log(coords);
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

          console.log(object.geometry._coordinates, '===', arr, '====', coords);
          myMap.geoObjects.remove(object)
        })









      })


let creategiftpost= document.getElementById('creategiftpost')
creategiftpost.addEventListener('submit', async(e)=>{
  e.preventDefault()
  if (arr.length){
  console.log(e.target);
let {name, description, file,action} = e.target
console.log(name.value, description, file,action);
  const resp = await fetch(action, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(
      { name:name.value, description:description.value,file: img.value ,coord: arr[0]})
  })
  const frontResp = await resp.json()
}

})





    })
  } else if (!createClass) {
    searchClass.remove()
    div.append(div2)
    ymaps.ready(function () {
      let myMap = new ymaps.Map('map', {
        center: [latitude, longitude],
        zoom: 9
      }, {
        searchControlProvider: 'yandex#search'
      }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'https://c0.klipartz.com/pngpicture/361/73/gratis-png-iconos-de-computadora-premio-regalo-de-diseno-de-icono-regalo.png',
          iconImageSize: [30, 42],
          iconImageOffset: [-5, -38]
        })
      myMap.geoObjects
        .add(myPlacemark)
    })
  }






})




