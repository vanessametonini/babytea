import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from '../models/product';

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  
  private url = "http://localhost:3000/produto";
  private headers = new HttpHeaders({
    Authorization: localStorage.getItem('bbt-token')
  });

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Product[]>(this.url, { headers: this.headers }).pipe<Product[]>((lista) => {
      console.log(lista);
      return lista;
    });
  }

  gravar(produto: Product) {
    return this.http.post(this.url, produto);
  }

  apagar(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  atualizar(produto: Product) {
    return this.http.patch(`${this.url}`, produto);
  }
}
