window.addEventListener("load", function(){
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event){
        
    /*    let nombre = document.querySelector("div#name");
        if (nombre.value.length < 4){
            let errorName = document.querySelector('div.fullName');
            errorName.innerHTML = "we"
            errorName.style.display = 'block'
            errorName.style.color = 'red'
        }

*/


       let errores = [];

        let nombreUsuario = document.querySelector("#user_id");
        if (nombreUsuario.value == ''){
            errores.push('El campo nombre de usuario se encuentra vacio');
        } else if (nombreUsuario.value.length < 3){
            errores.push('el nombre de usuario es demasiado corto');
        }

        let nombre = document.querySelector("#user_name");
        if (nombre.value == ''){
            errores.push('El campo nombre se encuentra vacio');
        } else if (nombre.value.length < 3){
            errores.push('el nombre es demasiado corto');
        }

        let apellido = document.querySelector("#user_lastname");
        if (apellido.value == ''){
            errores.push('El campo apellido se encuentra vacio');
        } else if (apellido.value.length < 3){
            errores.push('el apellido es demasiado corto');
        }

        let mail = document.querySelector("#user_mail");
        if (mail.value.indexOf('@') == -1){
            errores.push('no es un email valido');
        } 

        let password = document.querySelector('#user_password');
        if (password.value.length < 8){
            errores.push('la contrasena tiene que tener al menos 8 caracteres')
        }
    
        let password2 = document.querySelector('#user_password2');
        if (password2.value !== password.value){
            errores.push('las contrasenas no coinciden')
        }


        if(errores.length > 0){
            event.preventDefault();


                let errors = document.querySelector("div.erroress ul");
                for (let i = 0; i < errores.length; i++){
                    errors.innerHTML += "<li>" + errores[i] + "</li>"
                }
            
                errors.style.color = 'red'
                errors.style.display = 'block'
        } 
    }) 
})