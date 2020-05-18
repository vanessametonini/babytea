import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'bt-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  products: Product[] = [];
  user= "";
  isProductsVisible = 'none';

  constructor() { }

  ngOnInit(): void {

    const produto = new Product()
    produto.id = 'sdsdsd';
    produto.titulo = 'Carrinho';

    this.products.push(produto)
  }

  verLista(){
    if(this.isProductsVisible === 'none') {
      this.isProductsVisible = 'block';
    } 
    else {
      this.isProductsVisible = 'none'
    }
  }

}
