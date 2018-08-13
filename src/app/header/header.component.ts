import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownLi : string = "nav-item dropdown";
  dropdownMenu : string = "dropdown-menu";

  dropdownLiProfile : string = "nav-item dropdown";
  dropdownMenuProfile : string = "dropdown-menu";

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  
  expandPets() {
    this.dropdownLi.endsWith('show') 
    ? this.dropdownLi = "nav-item dropdown" 
    : this.dropdownLi = "nav-item dropdown show";

    this.dropdownMenu.endsWith('show')
    ? this.dropdownMenu = "dropdown-menu"
    : this.dropdownMenu = "dropdown-menu show";
  }

  expandProfile() {
    this.dropdownLiProfile.endsWith('show') 
    ? this.dropdownLiProfile = "nav-item dropdown" 
    : this.dropdownLiProfile = "nav-item dropdown show";

    this.dropdownMenuProfile.endsWith('show')
    ? this.dropdownMenuProfile = "dropdown-menu"
    : this.dropdownMenuProfile = "dropdown-menu show";
  }

  logout() {
    this.authService.logout();
  }
}