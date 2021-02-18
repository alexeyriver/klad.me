const form = document.querySelector('.signup')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const { action, method } = e.target
    const body = {
        name, email, password
    }
    const response = await fetch(action, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const result = await response.json()
    if(!result.success){
      const resphbs = await fetch('/template/login/invaliduseremail.hbs');
      const hbs = await resphbs.text();
      const template = Handlebars.compile(hbs);
      let div = document.querySelector('.wrapper-auth')
      let temp = template()
      if (div.innerHTML.match(temp)==null)
      { div.append(temp) }
    }
    else if (result.success){
      window.location = '/'
    }
})
