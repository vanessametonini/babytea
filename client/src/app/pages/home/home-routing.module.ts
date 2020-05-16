import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { WelcomeComponent } from './welcome.component';

const rotas: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
