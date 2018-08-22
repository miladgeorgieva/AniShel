import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetsRoutingModule } from './pets-routing.module';
import { PetAddComponent } from './pet-add/pet-add.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { CategoryCatsComponent } from './category-cats/category-cats.component';
import { CategoryDogsComponent } from './category-dogs/category-dogs.component';

@NgModule({
  declarations: [
    PetAddComponent,
    PetDetailsComponent,
    PetEditComponent,
    CategoryCatsComponent,
    CategoryDogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PetsRoutingModule
  ]
})
export class PetsModule { }