import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: "root",
})
export class FaqService {

  private url = `${environment.api}/faq`;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.headers = new HttpHeaders({
      Authorization: this.tokenService.getToken(),
    });
  }

  getFaq(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.url, { headers: this.headers }).pipe (map(faq => faq))
  }

}

type Faq = {
  content: string;
}