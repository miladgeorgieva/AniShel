import { Component, OnInit } from '@angular/core';
import { PetAdd } from '../models/pet-add.model';
import { PetsService } from '../pets.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {
  bindingModel : PetAdd;
  selectedImage : File = null;

  constructor(
    private petsService : PetsService,
    private toastr : ToastrService,
    private router : Router
  ) {
    this.bindingModel = new PetAdd("", 0, "", "", "", "", "");
   }

  ngOnInit() {
  }

  addPet() {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('images/' + this.selectedImage.name).put(this.selectedImage);

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
        var current = this;
        current.bindingModel.image = downloadUrl;
        current.petsService.addPet(this.bindingModel)
              .subscribe(() => {
                current.toastr.success('Pet added!', 'Success');
                current.router.navigate(['/home']);
              });
      });
    });
  }

  onFileSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }
}
