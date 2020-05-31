import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  
  private url = `${environment.api}/produto`;
  private headers = new HttpHeaders({
    Authorization: localStorage.getItem('bbt-token')
  });

  constructor(private http: HttpClient) {}

  listar(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { headers: this.headers })
  }

  gravar(produto: Product) {
    return this.http.post(this.url, produto);
  }

  apagar(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  atualizar(produto: Product) {
    return this.http.put(`${this.url}`, produto);
  }

  atualizarReserva({ id, status }): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, {status}, { headers: this.headers })
                    .pipe(
                      map(produto => produto),
                      catchError(
                        (httpError: HttpErrorResponse) => { 
                          throw httpError.error.message;
                        }
                      )
                    )
                    
  }
  
}
