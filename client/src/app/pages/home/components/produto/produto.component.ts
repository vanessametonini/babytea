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
  @Output() enviaProduto = new EventEmitter<boolean>();

  statusProduto = productStatus;
  presentar = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePresentear() {
    this.presentar = !this.presentar;
    this.enviaProduto.emit();
  }

}
