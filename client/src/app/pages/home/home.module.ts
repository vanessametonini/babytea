import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProdutoComponent } from './components/produto/produto.component';
import { WelcomeComponent } from './welcome.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent,
    ProdutoComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
})
export class HomeModule {}
