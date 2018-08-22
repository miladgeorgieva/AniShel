import { Component, OnInit } from '@angular/core';
import { PetSingle } from '../pets/models/pet-single.model';
import { Observable } from 'rxjs';
import { PetsService } from '../pets/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets : Observable<PetSingle[]>

  constructor(private petsService: PetsService) { }

  ngOnInit() {
    this.pets = this.petsService
     .getAllPets();
  }

}
