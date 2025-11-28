var nameInput = document.getElementById('nameInput')
var emailInput = document.getElementById('emailInput');
var ageInput = document.getElementById('ageInput');
var phoneInput = document.getElementById ('phoneInput');
var passwordInput = document.getElementById('passwordInput');

//add user
async function addUser() {
    document.getElementById('loader').classList.replace('d-none','d-flex')

    console.log('Adding user');
    var newUser = {
        name: nameInput.value,
        email: emailInput.value, 
        password: passwordInput.value, 
        age: ageInput.value,
        phone: phoneInput.value
    };


    console.log(newUser);
    
      var res = await fetch( 'https://note-sigma-black.vercel.app/api/v1/users/signUp', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'  
            }, 
            body: JSON.stringify(newUser)
        });
        var data = await res.json();
        console. log(res); 
        console. log(data);
        document.getElementById('msg').innerHTML=data.msg;

    document.getElementById('loader').classList.replace('d-flex','d-none');

if(res.ok == true){
    window.location.href='../sign-in.html'
}
}

        