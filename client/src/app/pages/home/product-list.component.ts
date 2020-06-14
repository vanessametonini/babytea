import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProdutoService } from 'src/app/services/produto.service';
import { AddToMyListService } from 'src/app/services/add-to-my-list.service';
import { productStatus } from 'src/app/models/product-status.enum';
import { ProdutoComponent } from 'src/app/components/produto/produto.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { categoria } from 'src/app/models/categoria.enum';

@Component({
  selector: "bt-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  
  listaProdutos: Product[] = [];
  statusProduto = productStatus;
  active = 1;

  constructor(
    private produtoService: ProdutoService,
    private myListService: AddToMyListService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getListaDeProdutos(categoria.bebe);
  }

  getListaDeProdutos(cat) {
    this.produtoService
      .listar(cat)
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
        this.getListaDeProdutos(produto.categoria);
        this.myListService.atualizaProduto(produto);
      },
      erro => thisProdutoComponent.mensagemErro = erro
    );
  }

  mudouDeTab(tabClicada){

    let cat;

    (function (cat) {
      cat[cat[categoria.bebe] = 1] = categoria.bebe;
      cat[cat[categoria.mamae] = 2] = categoria.mamae;
      cat[cat[categoria.papai] = 3] = categoria.papai;
      cat[cat[categoria.familia] = 4] = categoria.familia;
    })(cat || (cat = {}));

    this.getListaDeProdutos(cat[tabClicada])
    
  }

}
