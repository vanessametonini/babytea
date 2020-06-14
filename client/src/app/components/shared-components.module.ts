import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto/produto.component';


@NgModule({
  declarations: [
    ProdutoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProdutoComponent
  ]
})
export class SharedComponentsModule { }
