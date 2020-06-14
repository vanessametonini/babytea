import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { productStatus } from 'src/app/models/product-status.enum';

@Component({
  selector: 'bt-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent {

  @Input() produto: Product;
  @Output() reservaProduto = new EventEmitter();
  @Input() myList = false;
  statusProduto = productStatus;
  mensagemErro = "";

  closePopover () {
    this.mensagemErro = "";
  }

  togglePresentear() {
    this.reservaProduto.emit();
  }

}
