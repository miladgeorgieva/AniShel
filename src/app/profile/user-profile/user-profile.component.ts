import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetSingle } from '../../pets/models/pet-single.model';
import { PetsService } from '../../pets/pets.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userPets : Observable<PetSingle[]>;
  id : string;
  user : string;

  constructor(private petsService : PetsService,
    private route : ActivatedRoute,
    private authService : AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.authService.getUserById(this.id)
          .subscribe(user => {
            this.user = Object.values(user)[0].displayName;       
          })
    this.userPets = this.petsService
     .getPostsByUserId(this.id);
  }
}
