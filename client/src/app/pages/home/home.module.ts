import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProdutoComponent } from './components/produto/produto.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductListComponent,
    ProdutoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbNavModule
  ],
})
export class HomeModule {}
