import { Component, OnInit } from '@angular/core';
import { PetSingle } from '../../pets/models/pet-single.model';
import { Observable } from '../../../../node_modules/rxjs';
import { PetsService } from '../../pets/pets.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  myPets : Observable<PetSingle[]>;

  constructor(private petsService : PetsService, private authService : AuthService) { }

  ngOnInit() {
    let myUserId = this.authService.getCurrentUserId();
    this.myPets = this.petsService
     .getPostsByUserId(myUserId);
  }

}
