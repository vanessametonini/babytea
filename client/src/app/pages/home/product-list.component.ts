import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProdutoService } from 'src/app/services/produto.service';
import { AddToMyListService } from 'src/app/services/add-to-my-list.service';
import { productStatus } from 'src/app/models/product-status.enum';
import { ProdutoComponent } from './components/produto/produto.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "bt-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  listaProdutos: Product[] = [];
  statusProduto = productStatus;

  constructor(
    private produtoService: ProdutoService,
    private myListService: AddToMyListService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getListaDeProdutos();
  }

  getListaDeProdutos() {
    this.produtoService
      .listar()
      .subscribe(
        lista => this.listaProdutos = lista,
        (erro: HttpErrorResponse) => {
          erro.status == 403 
            this.userService.logout()
        }
      );
  }

  reservarProduto(produto: Product, thisProdutoComponent: ProdutoComponent) {
    this.produtoService.atualizarReserva(produto).subscribe(
      produto => {
        this.getListaDeProdutos();
        this.myListService.atualizaProduto(produto);
      },
      erro => thisProdutoComponent.mensagemErro = erro
    );
  }
}
