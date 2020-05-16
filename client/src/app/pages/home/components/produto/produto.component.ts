import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { productStatus } from "src/app/models/product-status.enum";

@Component({
  selector: 'bt-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Product;
  @Output() callLogin = new EventEmitter<boolean>();
  @Output() addToCart = new EventEmitter<Product>();

  statusProduto = productStatus;

  constructor() { }

  ngOnInit(): void {
  }

  presentear(produto) {

    if(localStorage.getItem('bbt-token')){
      this.addToCart.emit(produto)
    }
    else {
      this.callLogin.emit(true)
    }

  }

}
