import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpResponseBase } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router
    , private userService: UserService
    , private tokenService: TokenService){
  }

  canActivate() {

    return this.userService
      .isTokenValid()
      .pipe(
        map((response:HttpResponseBase) => response.ok)
        ,catchError(() => {
          this.tokenService.removeToken()
          this.router.navigate(['welcome']);
          return [false]
        })
      )


  }
  
}
