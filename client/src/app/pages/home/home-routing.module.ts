import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';

const rotas: Routes = [
  {
    path: '',
    component: ProductListComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
