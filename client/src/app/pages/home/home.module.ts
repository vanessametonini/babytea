import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbNavModule,
    SharedComponentsModule
  ],
})
export class HomeModule {}
