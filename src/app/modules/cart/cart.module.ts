import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartComponent } from './cart/cart.component';
// import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    // NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    // ConfirmBoxConfigModule.forRoot()
  ]

})
export class CartModule { }
