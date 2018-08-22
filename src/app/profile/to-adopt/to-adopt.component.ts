import { Component, OnInit } from '@angular/core';
import { PetSingle } from '../../pets/models/pet-single.model';
import { Observable } from '../../../../node_modules/rxjs';
import { AuthService } from '../../auth/auth.service';
import { PetsService } from '../../pets/pets.service';

@Component({
  selector: 'app-to-adopt',
  templateUrl: './to-adopt.component.html',
  styleUrls: ['./to-adopt.component.css']
})
export class ToAdoptComponent implements OnInit {
  pets : Observable<PetSingle[]>;

  constructor(private authService: AuthService, private petsService : PetsService) { }

  ngOnInit() {
    this.pets = this.petsService
     .getAllAdoptedPets();
  }
}
