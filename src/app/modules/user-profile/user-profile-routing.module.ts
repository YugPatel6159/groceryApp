import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddAddressComponent } from './manage-address/add-address/add-address.component';
import { EditAddressComponent } from './manage-address/edit-address/edit-address.component';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
 {
  path:'profile', component:UserProfileComponent,canActivate:[AuthGuard], 
  children:[ 
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path:'', component:ProfileComponent
    },
    {
      path:'add-address', component:AddAddressComponent
    },
    {
      path:'edit-address/:id', component:EditAddressComponent
    },
    {
      path:'manage-Address', component:ManageAddressComponent
    },
    {
      path:'change-password', component:ChangePasswordComponent
    },
    {
      path:'orders', component:OrdersComponent
    },
    {
      path:'orders/order-detail/:id', component:OrdersDetailsComponent
    },
    {
      path:'wishlist', component:WishlistComponent
    }
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
