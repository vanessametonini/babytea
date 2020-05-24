import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){
  }

  canActivate() {

    if(localStorage.getItem('bbt-token')){
      return true;
    } else {
      this.router.navigate(['welcome'])
    }
  }
  
}
