import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { UserResponseObject } from '../models/user.ro';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class UserService {
  
  private url = `${environment.api}/user`;
  private headers = new HttpHeaders({
    Authorization: localStorage.getItem("bbt-token"),
  });

  private _userData: UserResponseObject;

  constructor(private http: HttpClient) {
    this._userData = JSON.parse(localStorage.getItem("bbt-user"));
  }

  private setUserData(user) {
    localStorage.setItem("bbt-token", user.token);
    localStorage.setItem("bbt-user", JSON.stringify(user));
    this._userData = user;
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
                    if (erro.error.message)
                      throw erro.error.message
                    return erro
                  })
                );
  }

  logout () {
    localStorage.removeItem('bbt-token');
    localStorage.removeItem('bbt-user');
  }

  getUserList (): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/${this._userData.id}/list`, {headers: this.headers})
  }

}
