import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path:'', component:CartComponent
  },
  {
    path:'checkout', component:CheckoutComponent
  },
  {
    path:'checkout/success', component:SuccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
