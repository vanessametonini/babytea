import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class UserService {
  
  private url = "http://localhost:3000/user";
  private headers = new HttpHeaders({
    Authorization: localStorage.getItem("bbt-token"),
  });

  constructor(private http: HttpClient) {}

  create (user) {

    const userDto = { ...user, ...{
      nomeCompleto: user.nome,
      password: user.senha
    }}

    console.log(userDto);
    
    return this.http
               .post(this.url, userDto)
               .pipe(
                  map((user: any) => {
                    console.log(user);
                    localStorage.setItem("bbt-token", user.token);
                    return user
                  }),
                  catchError(erro => {
                    throw erro.error.message
                  })
                );
  }

}
