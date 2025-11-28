var emailInputLogin = document.getElementById('emailInputLogin');
var passwordInputLogin = document.getElementById('passwordInputLogin');

async function Login() {
    var userData = {
     email: emailInputLogin.value,
     password: passwordInputLogin.value,
    };

    document.getElementById('loader').classList.replace('d-none','d-flex')

    console.log(userData);


    var res = await fetch( 'https://note-sigma-black.vercel.app/api/v1/users/signIn', {
     method: 'POST',
     headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

var data = await res.json();
console.log(data);

document.getElementById('msg').innerHTML = data.msg
 if(res.ok == true){
     localStorage.setItem ('token',JSON.stringify(data.token));
     window.location.href='../app.html'
    }

document.getElementById('loader').classList.replace('d-flex','d-none');
}





