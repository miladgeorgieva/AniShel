import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  register(form : NgForm) {
    const email = form.value.email;
    const displayName = form.value.displayName;
    const password = form.value.password;
    const repeatPass = form.value.repeatPass;
    this.authService.signUp(email, displayName, password, repeatPass);
  }
}
