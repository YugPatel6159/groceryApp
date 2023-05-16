import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from '../../front/catalogue/category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../cart/cart/cart.component';
import { CheckoutComponent } from '../../cart/checkout/checkout.component';
import { SuccessComponent } from '../../cart/success/success.component';
import { AdditionalInfoComponent } from 'src/app/layouts/additional-info/additional-info.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    SuccessComponent,
    AdditionalInfoComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule
  ]
})
export class CatalogueModule { }
