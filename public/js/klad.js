
let form = document.querySelectorAll('form')

form.forEach((el) => {
  el.addEventListener('submit', async (e) => {
    e.preventDefault()
    let { action } = e.target
    let kladfeta = await fetch(action)
    let respklad = await kladfeta.json()
    if (respklad.status) {
      let id = action.split('/')
      let div = document.getElementById(id[5])
      div.remove()
    }
  })
})
