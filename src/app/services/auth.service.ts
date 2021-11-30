import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth
  ) { }

  /*REGISTRARSE*/
  async register(email: string, password: string){
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error en el Login: " , error);
      return null;
    }
  }

  /*LOGUEO*/
  async login(email: string, password: string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error en el Login: " , error);
      return null;
    }
  }

  /*LOGUEO CON GOOGLE*/
  async loginWithGoogle(email: string, password: string){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.error("Error en el Login con Google: " , error);
      return null;
    }
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  logout(){
    this.afauth.signOut();
  }

  

}
