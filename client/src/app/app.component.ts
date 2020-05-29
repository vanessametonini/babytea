import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Product } from './models/product';

@Component({
  selector: 'bt-root',
  templateUrl: `./app.component.html`,
  styles: [],
})
export class AppComponent implements OnInit{

  userList: Product[] = [];

  constructor(private userService: UserService
              ,private router: Router) {}

  ngOnInit() {
  }

  sair(){
    this.userService.logout();
    this.router.navigate(["welcome"]);
  }

  isLoggedIn() {
    if (localStorage.getItem('bbt-token')) {
      return true;
    }
    else {
      return false;
    }
  }
  
}
