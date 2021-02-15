const form = document.querySelector('.signin')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const { action, method } = e.target
    const body = {
      email, password
    }
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const result = await response.json()
    if (!result.success) {
      const resphbs = await fetch('/template/login/invaliddata.hbs');
      const hbs = await resphbs.text();
      const template = Handlebars.compile(hbs);
      let div = document.querySelector('.container-login')
      let temp = template()
      let parag = document.createElement('p')
      parag.className = 'invaliddata'
      let invalidpass = document.querySelector('.invalidpass')
      let invaliddata = document.querySelector('.invaliddata')
      parag.innerHTML = temp
      if (!invalidpass && !invaliddata)    
      { div.appendChild(parag) }
      else if (invalidpass) {
        invalidpass.remove()
        div.append(parag)
      }
    }
    else if (result.success == 'invalid') {
      const resphbs2 = await fetch('/template/login/invalidpass.hbs');
      const hbs2 = await resphbs2.text();
      const template2 = Handlebars.compile(hbs2);
      let div = document.querySelector('.container-login')        
      let temp2 = template2()
      let parag2 = document.createElement('p')
      parag2.className = 'invalidpass'
      parag2.innerHTML = temp2
      let invalidpass = document.querySelector('.invalidpass')
      let invaliddata = document.querySelector('.invaliddata')
      if (!invalidpass && !invaliddata) { div.append(parag2) }
      else if (invaliddata) {
        invaliddata.remove()
        div.append(parag2)
      }
    }
    else if (result.success) { window.location = '/' }
  })
