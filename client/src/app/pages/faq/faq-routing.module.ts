import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';

const rotas: Routes = [
  {
    path: '',
    component: FaqComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class FaqRoutingModule {

}
