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
  @Output() reservaProduto = new EventEmitter<boolean>();

  statusProduto = productStatus;

  constructor() { }

  ngOnInit(): void {
  }

  togglePresentear() {
    this.reservaProduto.emit();
  }

}
