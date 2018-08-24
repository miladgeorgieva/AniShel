import { Component, OnInit } from '@angular/core';
import { PetSingle } from '../pets/models/pet-single.model';
import { Observable } from 'rxjs';
import { PetsService } from '../pets/pets.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets : Observable<PetSingle[]>;
  searchResult : any;
  isSearch: boolean;

  constructor(private petsService: PetsService, private authService : AuthService) { }

  search(input : string) {
    return this.petsService.findPetsByBreed(input.search.toString().toLowerCase())
      .subscribe((data) => {
        for (let r of data) {
          r[1].createdAt = this.petsService.createdBeforeDays(r[1].createdAt);
          r[1].description = this.petsService.truncate(r[1].description); 
        }
        this.searchResult = data;
          this.isSearch = true;
      });
  }

  ngOnInit() {
    this.pets = this.petsService
     .getAllPets();
     this.authService.checkIfAdmin();
  }

}
