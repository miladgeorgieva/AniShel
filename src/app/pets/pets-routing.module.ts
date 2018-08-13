import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PetAddComponent } from './pet-add/pet-add.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';

const routes : Route[] = [
  { path: 'pet-add', component: PetAddComponent, canActivate: [ AuthGuard ] },
  { path: 'edit/:id', component: PetEditComponent, canActivate: [ AuthGuard ] },
  { path: 'details/:id', component: PetDetailsComponent, canActivate: [ AuthGuard ] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class PetsRoutingModule {}