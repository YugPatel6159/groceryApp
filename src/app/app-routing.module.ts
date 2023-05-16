import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart/cart.component';
import { CategoryComponent } from './modules/front/catalogue/category/category.component';
import { ProductDetailsComponent } from './modules/front/catalogue/product-details/product-details.component';
import { LoginComponent } from './modules/front/user/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthGuard } from './shared/Guards/auth.guard';

const routes: Routes = [
  {
    path:'', component:HomeComponent 
  }, 
  {
    path:'catalogue',
    loadChildren:()=>import('./modules/front/catalogue/catalogue.module').then(m=>m.CatalogueModule),
  },
  {
    path:'cart',
    loadChildren:()=>import('./modules/cart/cart.module').then(m=>m.CartModule),
  },
  {
    path:'user',
    loadChildren:()=>import('./modules/front/user/user.module').then(m=>m.UserModule),
    canActivate:[AuthGuard]
  },
  {
    path:'user-profile',
    loadChildren:()=>import('./modules/user-profile/user-profile.module').then(m=>m.UserProfileModule),
    canActivate:[AuthGuard]
   },{
    path:'product-details/:grocery_name/:id', component:ProductDetailsComponent
  },
  {
    path:'top-rated/:grocery_name/:id', component:ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

  