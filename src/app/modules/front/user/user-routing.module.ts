import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../../user-profile/change-password/change-password.component';
import { ManageAddressComponent } from '../../user-profile/manage-address/manage-address.component';
import { OrdersComponent } from '../../user-profile/orders/orders.component';
import { ProfileComponent } from '../../user-profile/profile/profile.component';
import { UserProfileComponent } from '../../user-profile/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
// path:'profile', component:UserProfileComponent, 
// children:[ 
//   { path: '', redirectTo: 'profile', pathMatch: 'full' },
//   {
//     path:'', component:ProfileComponent
//   },
//   {
//     path:'manage-Address', component:ManageAddressComponent
//   },
//   {
//     path:'change-password', component:ChangePasswordComponent
//   },
//   {
//     path:'orders', component:OrdersComponent
//   }
// ]