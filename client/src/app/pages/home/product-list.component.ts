import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProdutoService } from 'src/app/services/produto.service';
import { AddToMyListService } from 'src/app/services/add-to-my-list.service';
import { productStatus } from 'src/app/models/product-status.enum';
import { ProdutoComponent } from './components/produto/produto.component';

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
    private myListService: AddToMyListService
  ) {}

  ngOnInit() {
    this.getListaDeProdutos();
  }

  getListaDeProdutos() {
    this.produtoService
      .listar()
      .subscribe((lista) => (this.listaProdutos = lista));
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
