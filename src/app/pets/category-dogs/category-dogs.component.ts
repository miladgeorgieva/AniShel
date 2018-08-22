import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { PetSingle } from '../models/pet-single.model';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-category-dogs',
  templateUrl: './category-dogs.component.html',
  styleUrls: ['./category-dogs.component.css']
})
export class CategoryDogsComponent implements OnInit {
  dogs : Observable<PetSingle[]>

  constructor(private petsService: PetsService) { }

  ngOnInit() {
    this.dogs = this.petsService
     .getAllDogs();
  }
}
