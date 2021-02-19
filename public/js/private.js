console.log('hihihihihihihi');

let input = document.querySelector('input')
console.log(input.id);

async function init2() {
  let myMap = new ymaps.Map("map", {
    center: [59.9984, 30.3210],
    zoom: 10
  });
  let mapfeta = await fetch(`private/map/${input.id}`)
  let resmap = await mapfeta.json()

 
  console.log(resmap);
 
    var collection = new ymaps.GeoObjectCollection(null, { preset: "islands#greenIcon" });
    myMap.geoObjects.add(collection);
    let loc = resmap.location.split(',')
    console.log(loc);
    var placemark = new ymaps.Placemark(loc, { 
      balloonContentHeader: resmap.name ,
      balloonContentBody: 
      `<h4 style='color:black; background-color: white'> <p style='color:black; background-color: white'>Приватный клад!</p> Нажмите кнопку Взять клад</h4>` +
     `<form action="/klad/${resmap._id}" method="GET"> <button type="submit">Взять клад</button></form>`
    },
      {
        iconLayout: 'default#image',
        iconImageHref: 'https://c0.klipartz.com/pngpicture/361/73/gratis-png-iconos-de-computadora-premio-regalo-de-diseno-de-icono-regalo.png',
        iconImageSize: [25, 30],
        iconImageOffset: [-5, -38]
      }
      );
      myMap.geoObjects.add(placemark)
    

}





  ymaps.ready(init2)
