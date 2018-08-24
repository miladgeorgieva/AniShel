import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetAdd } from './models/pet-add.model';
import { map } from 'rxjs/operators';
import { PetSingle } from './models/pet-single.model';
import { AuthService } from '../auth/auth.service';
import { AdoptPet } from './models/adopt-pet.model';

const baseUrl = 'https://anishel-be7d3.firebaseio.com/pets';
const adoptionsUrl = 'https://anishel-be7d3.firebaseio.com/adoptions'; 

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  constructor(
    private http : HttpClient,
    private authService : AuthService
  ) {  }

  pluralize(value) {
    if (value !== 1) return 's';
    else return '';
  }

  createdBeforeDays(value) {
    let dateIsoFormat = value;
      let diff = +new Date() - +(new Date(dateIsoFormat));
      diff = Math.floor(diff / 60000);
      if (diff < 1) return 'less than a minute ago';
      if (diff < 60) return diff + ' minute' + this.pluralize(diff) + ' ago';
      diff = Math.floor(diff / 60);
      if (diff < 24) return diff + ' hour' + this.pluralize(diff) + ' ago';
      diff = Math.floor(diff / 24);
      if (diff < 30) return diff + ' day' + this.pluralize(diff) + ' ago';
      diff = Math.floor(diff / 30);
      if (diff < 12) return diff + ' month' + this.pluralize(diff) + ' ago';
      diff = Math.floor(diff / 12);
      return diff + ' year' + this.pluralize(diff) + ' ago';
  } 

  truncate = (s) => {
    if (s.length > 100) {
        return s.substring(0, 100) + "...";
    } else {
        return s;
    }
  }

  getAllPets() {
    return this.http.get(`${baseUrl}.json`)
      .pipe(map((res : Response) => {
        const pets : PetSingle[] = [];
        if(res) {
          const ids = Object.keys(res);
          for (const i of ids) {
            let formattedDate = this.createdBeforeDays(res[i].createdAt);
            let formattedDesc = this.truncate(res[i].description);
            pets.push(new PetSingle(i, res[i].breed, res[i].breedLowercase,
              res[i].age, res[i].name, formattedDesc, res[i].category, res[i].gender, res[i].image, formattedDate, res[i].author));
          }
  
          return pets;
        }
        
        return pets;
      }));
  }

  addPet(body : PetAdd) {
    return this.http.post(`${baseUrl}.json`, body);
  }

  getById(petId : string) {
    return this.http.get<PetSingle>(`${baseUrl}/${petId}.json`);
  }

  editPet(body) {
    return this.http.patch(`${baseUrl}.json`, body);
  }

  deletePet(petId : string) {
    return this.http.delete(`${baseUrl}/${petId}.json`);
  }

  getPostsByUserId(userId : string) {
    return this.http.get(`${baseUrl}.json?orderBy="author"&equalTo="${userId}"`)
    .pipe(map((res : Response) => {
      const ids = Object.keys(res);
      const pets : PetSingle[] = [];
      for (const i of ids) {
        let formattedDate = this.createdBeforeDays(res[i].createdAt);
        let formattedDesc = this.truncate(res[i].description);
        pets.push(new PetSingle(i, res[i].breed, res[i].breedLowercase,
          res[i].age, res[i].name, formattedDesc, res[i].category, res[i].gender, res[i].image, formattedDate, res[i].author));
      }

      return pets;
    }));
  }

  getAllCats() {
    return this.http.get(`${baseUrl}.json?orderBy="category"&equalTo="cats"`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const pets : PetSingle[] = [];
        for (const i of ids) {
          let formattedDate = this.createdBeforeDays(res[i].createdAt);
          let formattedDesc = this.truncate(res[i].description);
          // let user = this.authService.getUser(res[i].author);
          pets.push(new PetSingle(i, res[i].breed, res[i].breedLowercase,
            res[i].age, res[i].name, formattedDesc, res[i].category, res[i].gender, res[i].image, formattedDate, res[i].author));
        }

        return pets;
      }));
  }

  getAllDogs() {
    return this.http.get(`${baseUrl}.json?orderBy="category"&equalTo="dogs"`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const pets : PetSingle[] = [];
        for (const i of ids) {
          let formattedDate = this.createdBeforeDays(res[i].createdAt);
          let formattedDesc = this.truncate(res[i].description);
          // let user = this.authService.getUser(res[i].author);
          pets.push(new PetSingle(i, res[i].breed, res[i].breedLowercase,
            res[i].age, res[i].name, formattedDesc, res[i].category, res[i].gender, res[i].image, formattedDate, res[i].author));
        }

        return pets;
      }));
  }

  adoptPet(body : AdoptPet) {
    return this.http.post(`${adoptionsUrl}.json`, body);
  }

  getAllAdoptedPets() {
    let myUserId = this.authService.getCurrentUserId();
    return this.http.get(`${adoptionsUrl}.json?orderBy="authorId"&equalTo="${myUserId}"`)
      .pipe(map((res : Response) => {
        const values = Object.values(res);
        const pets : PetSingle[] = [];
        for (const value of values) {
          this.getById(value.petId).subscribe(currentPet => {
            let formattedDate = this.createdBeforeDays(currentPet.createdAt);
            let formattedDesc = this.truncate(currentPet.description);
            pets.push(new PetSingle(value.petId, currentPet.breed, currentPet.breedLowercase,
              currentPet.age, currentPet.name, formattedDesc, 
              currentPet.category, currentPet.gender,
              currentPet.image, formattedDate, currentPet.author));
          });
        }

        return pets;
      }));
  }

  checkIfAdopted(petId : string) {
    let myUserId = this.authService.getCurrentUserId();
    return this.http.get(`${adoptionsUrl}.json?orderBy="authorId"&equalTo="${myUserId}"`)
      .pipe(map((res : Response) => {
        const values = Object.values(res);

        let index = values.findIndex(x => x.petId === petId);

        if(index > -1) {
          return true;
        }
        else {
          return false;
        }
      }));
  }

  getAdoptionId(petId : string) {
    let myUserId = this.authService.getCurrentUserId();

    return this.http.get(`${adoptionsUrl}.json?orderBy="authorId"&equalTo="${myUserId}"`)
      .pipe(map((res : Response) => {
        let adoptedPets = Object.entries(res);
        let petToUnadoptId = adoptedPets.filter(p => p[1].petId === petId)[0][0];

        return petToUnadoptId;
      }));
  }

  unadoptPet(adoptionId : string) {
    return this.http.delete(`${adoptionsUrl}/${adoptionId}.json`);
  }

  findPetsByBreed(input : string) {
    return this.http.get(`${baseUrl}.json?orderBy="breedLowercase"&equalTo="${input}"`)
      .pipe(map((res : Response) => {
        return Object.entries(res);
      }));
  }
}