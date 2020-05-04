import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

const rotas: Routes = [
  {
    path: '', 
    component: CadastroComponent,
    pathMatch: 'full'
  }
]
@NgModule({
 imports: [RouterModule.forChild(rotas)],
 exports: [RouterModule]
})
export class CadastroRoutingModule {
  
}
