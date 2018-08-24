import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserModel } from './models/user.model';
import { map } from 'rxjs/operators';
import { RegisterUserModel } from './models/register-user.model';

const usersUrl = 'https://anishel-be7d3.firebaseio.com/users'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : string;
  userId : string;
  adminBoolean : boolean;
  isBlockedBoolean : boolean;

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
          this.createUser({userId : data.user.uid, displayName : displayName, email : email, isBlocked : false, isAdmin : false})
            .subscribe(() => {
              this.toastr.success('Signed Up', 'Success');
              this.router.navigate(['/home']);
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
    if(firebase.auth().currentUser) {
      firebase.auth()
      .currentUser
      .getIdToken()
      .then((token : string) => {
        this.token = token;
      })
  
      return this.token;
    }
    else {
      return "";
    }
  }

  isAuthenticated() : boolean {
    return this.token != null;
  }

  checkIfAdmin() {
    this.getUserById(this.getCurrentUserId())
      .subscribe((data) => {
        let keys = Object.keys(data);
        this.adminBoolean = data[keys[0]].isAdmin;
      })
  }

  isAdmin() {
    return this.adminBoolean;
  }

  createUser(body : RegisterUserModel) {
    return this.http.post(`${usersUrl}.json`, body);
  }

  getCurrentUserId() {
    let user = firebase.auth().currentUser.uid;
    return user;
  }
  
  getUserById(userId : string) {
    return this.http.get<UserModel>(`${usersUrl}.json/?orderBy="userId"&equalTo="${userId}"`);
  }

  getUserByEmail(email : string) {
    return this.http.get<UserModel>(`${usersUrl}.json/?orderBy="email"&equalTo="${email}"`);
  }

  getAllUsers() {
    return this.http.get(`${usersUrl}.json`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const users : UserModel[] = [];
        for (const i of ids) {
          if(res[i].userId === this.getCurrentUserId()) {
            continue;
          }
          users.push(new UserModel(i, res[i].userId, res[i].displayName,
            res[i].email, res[i].isBlocked, res[i].isAdmin));
        }

        return users;
      }));
  }

  blockUser(body) {
    return this.http.patch(`${usersUrl}.json`, body);
  }

  unblockUser(body) {
    return this.http.patch(`${usersUrl}.json`, body);
  }

  checkIfBlocked(userId : string) {
    this.getUserById(userId)
      .subscribe(data => {
        console.log(data)
      });
  }
}