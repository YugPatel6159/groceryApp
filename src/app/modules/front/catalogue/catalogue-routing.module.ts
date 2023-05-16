import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from '../../cart/checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SuccessComponent } from '../../cart/success/success.component';

const routes: Routes = [
  {
    path:'category',component:CategoryComponent
  },
  {
    path:'categories/:i', component:CategoryComponent
  },
  {
    path:'search-categories/:i', component:CategoryComponent
  },
  {
    path:'search-categories/:category/product-details/:grocery_name/:id', component:ProductDetailsComponent
  },
  {
    path:'categories/:category/product-details/:title/:id', component:ProductDetailsComponent
  },
  {
    path:'featured-products/:i.grocery_name', component:ProductDetailsComponent
  },
  {
    path:'top-sells/:category.category', component:ProductDetailsComponent
  },
  {
    path:'top-rated/:product.grocery_name', component:ProductDetailsComponent
  },
  {
    path:'trending-items/:category.category', component:ProductDetailsComponent
  },
  {
    path:'recently-added/:category.category', component:ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule {
  constructor(){
    console.log('catalogue module')
  }
  
 }
