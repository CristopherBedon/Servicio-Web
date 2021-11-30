// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC1cZjh3zUw9TmtN43glCrigeVIvZS4Sqg",
    authDomain: "fir-angular-765e4.firebaseapp.com",
    projectId: "fir-angular-765e4",
    storageBucket: "fir-angular-765e4.appspot.com",
    messagingSenderId: "288063315143",
    appId: "1:288063315143:web:b59257352977f191c9f2e2",
    measurementId: "G-V34XM0QLWS"
});

//Iniciación de Firestore
var db = firebase.firestore();

//Agregar Datos
function guardar(){
    var nombre   = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var fecha    = document.getElementById("fecha").value;

    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("fecha").value = "";
    })
    .catch((error) => {
        //console.error("Error adding document: ", error);
    });
}

//Leer Datos
    var tabla = document.getElementById("tabla");

    db.collection("users").onSnapshot((querySnapshot) => {
        //Limpiar la Tabla
        tabla.innerHTML = "";

        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().first}`);
            tabla.innerHTML += `
                            <tr>
                                <th scope="row">${doc.id}</th>
                                <td> ${doc.data().first}</td>
                                <td> ${doc.data().last}</td>
                                <td> ${doc.data().born}</td>
                                <td>
                                    <button class="btn btn-danger" 
                                    onclick="eliminar('${doc.id}')">
                                    Eliminar
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-warning" 
                                    onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">
                                    Editar
                                    </button>
                                </td>
                            </tr>
                                ` 
        });
    });

//Borrar Datos
function eliminar(id){
    db.collection("users").doc(id).delete().then(() => {
        //console.log("Document successfully deleted!");
    }).catch((error) => {
        //console.error("Error removing document: ", error);
    });
}

//Editar Datos
function editar(id,nombre,apellido,fecha){

        document.getElementById("nombre").value = nombre;
        document.getElementById("apellido").value = apellido;
        document.getElementById("fecha").value = fecha;

        var boton = document.getElementById("boton");
        boton.innerHTML = "Editar"

        boton.onclick = function(){
            var washingtonRef = db.collection("users").doc(id);
            // Set the "capital" field of the city 'DC'

            var nombre   = document.getElementById("nombre").value;
            var apellido = document.getElementById("apellido").value;
            var fecha    = document.getElementById("fecha").value;

            return washingtonRef.update({
                first: nombre,
                last: apellido,
                born: fecha
            })
            .then(() => {
                //console.log("Document successfully updated!");
                boton.innerHTML = "Guardar"
                document.getElementById("nombre").value = "";
                document.getElementById("apellido").value = "";
                document.getElementById("fecha").value = "";
            })
            .catch((error) => {
                // The document probably doesn't exist.
                //console.error("Error updating document: ", error);
            });
        }
    
}



/*LOGUEO*/
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const signupEmail    = document.querySelector("#signup-email").value;
    const signupPassword = document.querySelector("#signup-password").value;

    console.log(signupEmail, signupPassword);
})

//Creamos constantes para llamar tan solo a la autenticación
function logueo(){
    var email    = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    });
}



