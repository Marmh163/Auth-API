const email = document.getElementById('email')
const password = document.getElementById('password')
const button = document.getElementById('button')

button.addEventListener('click' , async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:7000/auth/register',{
        method : 'POST',
        body : JSON.stringify({
            email : email.value,
            password : password.value,
            role : "user"
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const data = await res.json()
    if(res.status == 422){
        alert(data.map(error => error.message + '\n'))
    }
    else if(res.status == 409){
        alert(data.map(error => error.message + '\n'))
    }else if(res.status == 201) {
        alert(data.map(error => error.message + '\n'))
    }
})