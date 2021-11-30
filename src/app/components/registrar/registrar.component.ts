import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  usuario = {email:'',password:'',}
  
  constructor(
    private authService : AuthService,
    private router: Router
  ){ }

  ngOnInit(): void {
  }

  registrar(){
    const {email,password} = this.usuario;
    this.authService.register(email,password).then(res => {
      console.log("Se registro: " , res);
    })
    alert("Se registró el Usuario: " + email);
    this.router.navigate(['/login']);
  }

}
