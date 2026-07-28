const email = document.getElementById('email')
const password = document.getElementById('password')
const button = document.getElementById('button')

button.addEventListener('click' , async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:7000/auth/login',{
        method : 'POST',
        body : JSON.stringify({
            email : email.value,
            password : password.value
        }),
        credentials : 'include',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const data = await res.json()
   
    if(res.status == 422){
        alert(data.map(error => error.message + '\n'))
    }
    else if(res.status == 404){
        alert(data.map(error => error.message + '\n'))
    }
    else if(res.status == 401) {
        alert(data.map(error => error.message + '\n'))
    }
    else if(res.status == 200) {
        alert(data.map(error => error.message + '\n'))
        window.location.href = '/profile'

    }
})