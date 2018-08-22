import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserModel } from './models/user.model';

const usersUrl = 'https://anishel-be7d3.firebaseio.com/users'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string;
  userId : string;

  constructor(
    private http : HttpClient,
    private toastr : ToastrService,
    private router : Router
  ) { }

  signUp(email: string, displayName: string, password : string, repeatPass : string) {
    if(repeatPass === password) {
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          this.createUser({userId : data.user.uid, displayName : displayName})
            .subscribe(() => {
              this.toastr.success('Signed Up', 'Success');
              this.router.navigate(['/auth/signin']);
            });
        })
        .catch((err) => {
          this.toastr.error(err.message, 'Warning');
        });
    } else {
      this.toastr.error('Passwords do not match', 'Warning');
    }
  }

  signIn(email : string, password : string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        firebase.auth()
          .currentUser
          .getIdToken()
          .then((token : string) => {
            this.token = token;
          })

          this.router.navigate(['/home']);
          this.toastr.success('Logged In', 'Success');
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Warning');
      });
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.router.navigate(['/auth/signin']);
        this.token = null;
      });
  }

  getToken() {
    firebase.auth()
    .currentUser
    .getIdToken()
    .then((token : string) => {
      this.token = token;
    })

    return this.token;
  }

  isAuthenticated() : boolean {
    return this.token != null;
  }

  createUser(body : UserModel) {
    return this.http.post(`${usersUrl}.json`, body);
  }

  getCurrentUserId() {
    let user = firebase.auth().currentUser.uid;
    return user;
  }
  
  getUserById(userId) {
    return this.http.get<UserModel>(`${usersUrl}.json/?orderBy="userId"&equalTo="${userId}"`);
  }
}