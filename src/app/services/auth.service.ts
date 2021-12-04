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
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(result => {
        result.user?.sendEmailVerification().catch(error => {
          console.error(error)
        })
    })
    firebase.auth().signOut()
  }

  /*LOGUEO*/
  async login(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user?.emailVerified){
        console.log("Logeo correcto")
      } else {
        firebase.auth().signOut()
        alert("Debe verificar su correo")
      }
    })
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
