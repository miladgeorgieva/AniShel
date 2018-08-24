import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService : AuthService, private toastr : ToastrService) { }

  ngOnInit() {
  }

  login(form : NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.getUserByEmail(email)
      .subscribe((data) => {
        if(Object.keys(data).length > 0) {
          let user = Object.values(data)[0];
          if(user.isBlocked) {
            this.toastr.error("You have been blocked.", "Error");
            return;
          }
          this.authService.signIn(email, password);
        }
        else {
          this.toastr.error("Your email or password are incorrect.", "Error");
          return;
        }
      });
  }

}
