import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AddToMyListService } from '../services/add-to-my-list.service';

@Component({
  selector: 'bt-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  products: Product[] = [];
  user= "";
  isProductsVisible = 'none';

  constructor(private myListService: AddToMyListService) { }

  ngOnInit(): void {
    this.myListService
        .emissorDeProdutos
        .subscribe(listaDeProdutos => {
          this.products = listaDeProdutos
        })
  }

  verLista(){
    if(this.isProductsVisible === 'none') {
      this.isProductsVisible = 'block';
    } 
    else {
      this.isProductsVisible = 'none'
    }
  }

  removerLista(produto) {
    this.myListService.removerProduto(produto);
  }

}
