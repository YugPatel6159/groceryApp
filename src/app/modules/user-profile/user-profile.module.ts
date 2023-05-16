import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from './manage-address/add-address/add-address.component';
import { EditAddressComponent } from './manage-address/edit-address/edit-address.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WishlistComponent } from './wishlist/wishlist.component';
// import { SidebarComponent } from './Layouts/sidebar/sidebar.component';


@NgModule({
  declarations: [
    // SidebarComponent
    ProfileComponent,
    OrdersComponent,
    ManageAddressComponent,
    ChangePasswordComponent,
    AddAddressComponent,
    EditAddressComponent,
    OrdersDetailsComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileModule { }
