import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Product } from './models/product';
import { environment } from "src/environments/environment";
import { TokenService } from './services/token.service';

@Component({
  selector: "bt-root",
  templateUrl: `./app.component.html`,
  styles: [],
})
export class AppComponent implements OnInit {
  
  userList: Product[] = [];
  phone = environment.phone;

  constructor(private userService: UserService
    , private tokenService: TokenService) {}

  ngOnInit() {}

  sair() {
    this.userService.logout();
  }

  isLoggedIn() {
    if (this.tokenService.getToken()) {
      return true;
    } else {
      return false;
    }
  }
}
