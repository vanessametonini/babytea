import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { AddToMyListService } from './add-to-my-list.service';
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

  private userData: UserResponseObject;

  constructor(private http: HttpClient) {
    this.userData = JSON.parse(localStorage.getItem("bbt-user"));
  }

  create (user) {

    const userDto = { ...user, ...{
      nomeCompleto: user.nome,
      password: user.senha
    }}

    return this.http
               .post(this.url, userDto)
               .pipe(
                  map((user: any) => {
                    localStorage.setItem("bbt-token", user.token);
                    localStorage.setItem("bbt-user", JSON.stringify(user));
                    return user;
                  }),
                  catchError(erro => {
                    if(erro.error.message)
                      throw erro.error.message
                    return erro
                  })
                );
  }

  async login (loginData) {

    const loginDto = {
      email: loginData.email,
      password: loginData.senha
    }

    return await this.http
                .post(`${this.url}/login`, loginDto)
                .pipe(
                  map((user: UserResponseObject) => {

                    localStorage.setItem("bbt-token", user.token);
                    localStorage.setItem("bbt-user", JSON.stringify(user));

                    return user
                  }),
                  catchError(erro => {
                    throw erro.error.message
                  })
                );
  }

  logout () {
    localStorage.removeItem('bbt-token');
    localStorage.removeItem('bbt-user');
  }

  updateUserList (produto: Product) {
    return this.http.put(`${this.url}/${this.userData.id}/list`, produto)
  }

}
