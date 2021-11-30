import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:""          , component: LoginComponent },
  {path:"login"     , component: LoginComponent },
  {path:"registro"  , component: RegistrarComponent },
  {path:"dashboard" , component: DashboardComponent },
  {path:"lista"     , component: ListEmpleadosComponent },
  {path:"create"    , component: CreateEmpleadosComponent },
  {path:"editEmpleado/:id" , component: CreateEmpleadosComponent },
  {path:"**"        , component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
