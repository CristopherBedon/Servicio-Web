import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {email:'',password:'',}
  flag: boolean = false;

  constructor(
    private authService : AuthService,
    private router: Router
  ){}

  ingresar(){
    const {email,password} = this.usuario;
    this.authService.login(email,password).then(res => {
      console.log("Se registro: " , res);
      this.router.navigate(['/dashboard']);
    });
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
