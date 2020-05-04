import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProdutoComponent } from './components/produto/produto.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule {}
