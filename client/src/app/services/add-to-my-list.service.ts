import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToMyListService {

  private listaDeProdutos: Product[] = [];
  public emissorDeProdutos = new Subject<Product[]>();

  constructor() { }

  adicionarProduto(produto: Product){
    this.listaDeProdutos.push(produto);
    this.emissorDeProdutos.next(this.listaDeProdutos);
  }

  removerProduto(produto: Product) {
    this.listaDeProdutos = this.listaDeProdutos.filter(produtoDaLista => produtoDaLista.id != produto.id);
    this.emissorDeProdutos.next(this.listaDeProdutos);
  }

}
