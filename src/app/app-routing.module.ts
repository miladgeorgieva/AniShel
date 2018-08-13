import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PetsModule } from './pets/pets.module';
import { AuthGuard } from './auth/auth.guard';

const routes : Route[] = [
  { path: 'auth', children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
  ]  },
  { path: 'pets', 
   loadChildren: () => PetsModule ,
   canActivate: [AuthGuard] 
  }, 
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: '**', redirectTo: '/auth/signin'
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }