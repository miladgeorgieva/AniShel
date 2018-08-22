import { Component, OnInit } from '@angular/core';
import { PetSingle } from '../models/pet-single.model';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  pet : PetSingle;
  id : string;
  isAdopted : boolean;
  authorName : string;
  adoptionId : string;

  constructor(
    private petsService : PetsService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router,
    private authService : AuthService
  ) { }
 
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.petsService.getById(this.id)
      .subscribe(data => {
        this.authService.getUserById(data.author)
          .subscribe(user => {
            this.authorName = Object.values(user)[0].displayName;
            this.pet = data;              
          })
      });
    this.petsService.checkIfAdopted(this.id)
      .subscribe(data => {
        this.isAdopted = data;

        if(this.isAdopted) {
          this.petsService.getAdoptionId(this.id)
            .subscribe(adoptionId => {
              this.adoptionId = adoptionId;
            });
        }
      })
  }

  delete() {
    this.petsService.deletePet(this.id)
      .subscribe((data) => {
        this.toastr.success('Pet deleted!', 'Success!');
        this.router.navigate(['/home']);
      })
  }

  adopt() {
    let body = {
      petId : this.id,
      authorId: this.authService.getCurrentUserId()
    }
    this.petsService.adoptPet(body)
    .subscribe((data) => {
      this.toastr.success('Pet added to adopted pets!', 'Success!');
      this.router.navigate(['../../profile/im-adopting']);
    });
  }

  unadopt() {
    this.petsService.unadoptPet(this.adoptionId)
      .subscribe((data) => {
        this.toastr.success('Pet removed from adopted pets!', 'Success!');
        this.router.navigate(['../../profile/im-adopting']);
      });
  }
}
