import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { UserResponseObject } from '../models/user.ro';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class UserService {
  
  private url = `${environment.api}/user`;
  private headers: HttpHeaders;

  constructor(private http: HttpClient
    , private tokenService: TokenService
    , private router: Router) {

    this.headers = new HttpHeaders({
      Authorization: this.tokenService.getToken(),
    });
    
  }

  private setUserData(user) {

    this.tokenService.setToken(user.token);
    localStorage.setItem("bbt-user", JSON.stringify(user));

    this.headers = new HttpHeaders({
      Authorization: this.tokenService.getToken(),
    });

    return user;
    
  }

  create (user) {

    const userDto = { ...user, ...{
      nomeCompleto: user.nome,
      password: user.senha
    }}

    return this.http
               .post(this.url, userDto)
               .pipe(
                  map((user: any) => this.setUserData(user)),
                  catchError(erro => {
                    if(erro.error.message)
                      throw erro.error.message
                    return erro
                  })
                );
  }

  login (loginData) {

    const loginDto = {
      email: loginData.email,
      password: loginData.senha
    }

    return this.http
                .post(`${this.url}/login`, loginDto)
                .pipe(
                  map((user: UserResponseObject) => this.setUserData(user)),
                  catchError(erro => {
                    throw erro.error.message
                  })
                );
  }

  logout () {
    this.tokenService.removeToken();
    this.router.navigate(["welcome"]);
  }

  getUserList (): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/mylist`, {headers: this.headers})
  }

  isTokenValid () {
    return this.http.head(`${this.url}/token`, { headers: this.headers, observe: 'response' })
  }

}
