import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProdutoService } from 'src/app/services/produto.service';
import { AddToMyListService } from 'src/app/services/add-to-my-list.service';
import { productStatus } from 'src/app/models/product-status.enum';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bt-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listaProdutos: Product[] = [];
  statusProduto = productStatus;

  constructor(private produtoService: ProdutoService
              ,private myListService: AddToMyListService
              , private userService: UserService) { }

  ngOnInit() {
    this.produtoService.listar().subscribe(lista => this.listaProdutos = lista);
  }

  atualizarProdutoEListaNaAPI (produto) {
    this.produtoService.atualizarStatus(produto).subscribe(
      () => {
        this.userService.updateUserList(produto)
          .subscribe()
      }
    )
  }

  toggleProdutoNaMinhaLista(isAdd: boolean, produto: Product) {

    if(isAdd){
      produto.status = productStatus.reservado;
      this.myListService.adicionarProduto(produto);
      this.atualizarProdutoEListaNaAPI(produto);
    }
    else {
      produto.status = productStatus.livre;
      this.myListService.removerProduto(produto);
      this.atualizarProdutoEListaNaAPI(produto);
    }

  }

}
