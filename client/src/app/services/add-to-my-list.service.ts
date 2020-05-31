import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Subject } from 'rxjs';
import { productStatus } from '../models/product-status.enum';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AddToMyListService {

  private listaDeProdutos: Product[] = [];
  public emissorDeProdutos = new Subject<Product[]>();

  constructor(private userService: UserService) {

    this.userService.getUserList().subscribe(listaDeProdutosUserApi => {
      if (listaDeProdutosUserApi){
        this.listaDeProdutos = listaDeProdutosUserApi;
        this.emissorDeProdutos.next(this.listaDeProdutos);
      }
    })

   }

  atualizaProduto(produto: Product): void {    

    switch (produto.status) {

      case productStatus.livre:
        this.removerProduto(produto)
        break;

      case productStatus.reservado:
        this.adicionarProduto(produto)
        break;

      case productStatus.ilimitado:

        const produtoEncontrado = this.listaDeProdutos.find(produtoMyList => produtoMyList.id == produto.id);

        if (produtoEncontrado) {
          this.removerProduto(produto)
          break;
        }
        
        this.adicionarProduto(produto)
        break;
    }

  }

  adicionarProduto(produto: Product): void {
    this.listaDeProdutos.push(produto);
    this.emissorDeProdutos.next(this.listaDeProdutos);
  }

  removerProduto(produto: Product): void {
    this.listaDeProdutos = this.listaDeProdutos.filter(produtoDaLista => produtoDaLista.id != produto.id);
    this.emissorDeProdutos.next(this.listaDeProdutos);
  }

}
