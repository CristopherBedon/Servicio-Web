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

  usuario = { email: '', password: '', }

  regForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z.0-9]+@[a-zA-Z0-9]+\.[a-z]{2,4}')]],
    password: ['', [Validators.required, Validators.pattern('[0-9]{4,8}')]],
  });

  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  registrar() {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    } else {
      const { email, password } = this.usuario;
      this.authService.register(email, password).then(res => {
        console.log("Se registro: ", res);
      });
      alert("Se registró el Usuario: " + email + "\n Por favor. Verifique su correo antes de iniciar sesión");
      this.router.navigate(['/login']);
    }
  }

}
