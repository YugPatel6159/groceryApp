import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './shared/components/home/home.component';
import { SliderComponent } from './layouts/slider/slider.component';
import { FrontModule } from './modules/front/front.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/front/user/user.module';
// import { CatalogueModule } from './modules/front/catalogue/catalogue.module';
import { ExploreCategoriesComponent } from './shared/components/explore-categories/explore-categories.component';
import { FeaturedProductsComponent } from './shared/components/featured-products/featured-products.component';
import { TrendingItemsComponent } from './shared/components/trending-items/trending-items.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { AuthInterceptor } from './shared/services/interceptor/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
// import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
// import { AdditionalInfoComponent } from './layouts/additional-info/additional-info.component';
// ;




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    ExploreCategoriesComponent,
    FeaturedProductsComponent,
    TrendingItemsComponent,
    // AdditionalInfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontModule,
    AdminModule,
    UserModule,
    // CatalogueModule,
    FormsModule,
    HttpClientModule,
    UserProfileModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    // NgxAwesomePopupModule.forRoot(), 
    // ConfirmBoxConfigModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
