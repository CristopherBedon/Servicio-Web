import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {email:'',password:'',}
  flag: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z.0-9]+@[a-zA-Z0-9]+\.[a-z]{2,4}')]],
    password: ['', [Validators.required, Validators.pattern('[0-9]{4,8}')]],
  });

  submitted = false;

  constructor(
    private authService : AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ingresar(){
    this.submitted = true;
    const {email,password} = this.usuario;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user?.emailVerified){
        console.log("Logeo correcto")
        this.authService.login(email,password).then(res => {
          console.log("Se registro: " , res,);
          this.router.navigate(['/dashboard']);
        })
      } else {
        firebase.auth().signOut()
        alert("Debe verificar su correo")
      }
    })
  }

  ingresarConGoogle(){
    const {email,password} = this.usuario;
    this.authService.loginWithGoogle(email,password).then(res => {
      console.log("Se registro: " , res);
      this.router.navigate(['/dashboard']);
    })
  }

  ingresarConFacebook(){
    alert("Ingreso con Facebook");
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
  }
  
}
