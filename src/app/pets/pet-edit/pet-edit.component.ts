import { Component, OnInit } from '@angular/core';
import { PetAdd } from '../models/pet-add.model';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {
  id : string;
  bindingModel : PetAdd;

  constructor(
    private petsService : PetsService,
    private route : ActivatedRoute,
    private router : Router,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.petsService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
      });
  }

  edit() {
    const body = {
      [this.id] : this.bindingModel
    }
    
    this.petsService.editPet(body)
      .subscribe((data) => {
        this.toastr.success('Pet edited!', 'Success!');
        this.router.navigate(['/pets/details/' + this.id]);
      });
  }

}
