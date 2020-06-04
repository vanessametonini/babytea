import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class FaqService {

  private url = `${environment.api}/faq`;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: localStorage.getItem("bbt-token"),
    });
  }

  getFaq(): Observable<Faq> {
    return this.http.get<Faq>(this.url, { headers: this.headers }).pipe (map( faq => faq[0]))
  }

}

type Faq = {
  content: string;
}