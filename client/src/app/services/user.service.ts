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
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: localStorage.getItem("bbt-token"),
    });
  }

  private setUserData(user) {

    localStorage.setItem("bbt-token", user.token);
    localStorage.setItem("bbt-user", JSON.stringify(user));

    this.headers = new HttpHeaders({
      Authorization: localStorage.getItem("bbt-token"),
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
    localStorage.removeItem('bbt-token');
    localStorage.removeItem('bbt-user');
  }

  getUserList (): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/mylist`, {headers: this.headers})
  }

}
