import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetAdd } from './models/pet-add.model';
// import { map } from 'rxjs/operators';
// import { RecipeList } from './models/recipe-list.model';
// import { RecipeCreate } from './models/recipe-create.model';
// import { PetAddComponent } from './pet-add/pet-add.component';

const baseUrl = 'https://anishel-be7d3.firebaseio.com/pets'

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  constructor(
    private http : HttpClient
  ) {  }

//   getAllRecipes() {
//     return this.http.get(`${baseUrl}.json`)
//       .pipe(map((res : Response) => {
//         const ids = Object.keys(res);
//         const recipes : RecipeList[] = [];
//         for (const i of ids) {
//           recipes.push(new RecipeList(i, res[i].name, 
//             res[i].imagePath, res[i].description));
//         }

//         return recipes;
//       }));
//   }

  addPet(body : PetAdd) {
    return this.http.post(`${baseUrl}.json`, body);
  }

//   getById(recipeId : string) {
//     return this.http.get<RecipeList>(`${baseUrl}${recipeId}/.json`);
//   }

//   editRecipe(body) {
//     return this.http.patch(`${baseUrl}.json`, body);
//   }

//   deleteRecipe(recipeId : string) {
//     return this.http.delete(`${baseUrl}${recipeId}/.json`);
//   }
}