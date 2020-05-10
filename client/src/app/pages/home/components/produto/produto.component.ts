import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { productStatus } from "src/app/models/product-status.enum";

@Component({
  selector: 'bt-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Product;

  statusProduto = productStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
