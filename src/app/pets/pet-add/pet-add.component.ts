import { Component, OnInit } from '@angular/core';
import { PetAdd } from '../models/pet-add.model';
import { PetsService } from '../pets.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {
  bindingModel : PetAdd;

  constructor(
    private recipeService : PetsService,
    private toastr : ToastrService,
    private router : Router
  ) {
    this.bindingModel = new PetAdd("", 0, "", "", "");
   }

  ngOnInit() {
  }

  addPet() {
    this.recipeService.addPet(this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Recipe created!', 'Success');
        this.router.navigate(['/recipes/list']);
      });
  }
}
