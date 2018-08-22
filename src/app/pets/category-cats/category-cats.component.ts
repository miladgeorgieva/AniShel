import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { PetSingle } from '../models/pet-single.model';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-category-cats',
  templateUrl: './category-cats.component.html',
  styleUrls: ['./category-cats.component.css']
})
export class CategoryCatsComponent implements OnInit {
  cats : Observable<PetSingle[]>

  constructor(private petsService: PetsService) { }

  ngOnInit() {
    this.cats = this.petsService
     .getAllCats();
  }

}
