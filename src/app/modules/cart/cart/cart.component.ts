import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { Grocery } from 'src/app/shared/models/interface';
import { ProductService } from 'src/app/shared/services/productservice/product.service';
import { CartItem } from 'src/app/shared/models/cartItemInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { confirmBoxCoreConfig } from '@costlydeveloper/ngx-awesome-popup/ngx-awesome-popup/types/confirm-box/core/classes';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  categoryToShow: any;
  productByCategory: any;
  totalPrice: any;
  cartLength: any;
  matchedCustomer: any;
  matchedCustomerCart: any;
  cartArray: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {


}
finalSubTotal!:number;
cartApiData: any;
ngOnInit() {
  this.cartData();
  this.subtotalAndlength();
  this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  productByCategories() {
    let categoryToShow = this.cartApiData.map((product: any) => product.category);
    this.categoryToShow = Array.from(new Set(categoryToShow));
    console.log('cat of cart', this.categoryToShow);
    this.productByCategory = this.cartApiData.reduce(
      (result: any, product: any) => {
        (result[product.category] = result[product.category] || []).push(
          product
        );
        if (product.discPrice == null) {
          result[product.category].totalPrice =
            (result[product.category].totalPrice || 0) + product.price*product.quantityCount;
          return result;
        } else {
          result[product.category].totalPrice =
            (result[product.category].totalPrice || 0) + product.discPrice*product.quantityCount;
          return result;
        }
      },
      {}
    );
  }
  subtotalAndlength() {
    this.finalSubTotal = JSON.parse(localStorage.getItem('finalSubTotal'))
    this.cartService.subTotal$.subscribe((res:any)=>{
      if(res){
        this.finalSubTotal=res
      }
    })
  }
  cartData() {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    let username = localStorage.getItem('user');
    console.log(cart,'cart')
    let matchedUser = cart.find((res:any)=>{
      return res.username === username
    })
    if(matchedUser){
      this.matchedCustomerCart = matchedUser.items
      console.log(matchedUser,'matchedUser')
      console.log(matchedUser.items,'matcheddCart')
      console.log(this.matchedCustomerCart,'mtchecart')
    }
  }

  // for checkout price
  cartCheckoutPrice() {
    console.log('fial', this.finalSubTotal)
  }

  // increase count
  plus(products: any) {
    let username = localStorage.getItem('user')
    this.cartService.Quantity_Plus(username, products);
    this.subtotalAndlength();
    this.cartData();
  }

  // decrease count
  minus(products: any) {
    let username = localStorage.getItem('user')
    this.cartService.Quantity_Minus(username,products)
    this.subtotalAndlength();
    this.cartData();
  }

  // remove product

  removeProduct(product: any){
      if(confirm('are you sure you want to delete?')){
        let userName = localStorage.getItem('user')
        let cart = JSON.parse(localStorage.getItem('Cart'))
        let matchedUserCart = cart.find((res:any)=>userName === res.username).items
        console.log(matchedUserCart,'matchedUserCart')
        const index = matchedUserCart.findIndex((res:any)=>res.id === product.id);
        console.log(index,'index')
        this.matchedCustomerCart.splice(index, 1);
        this.cartService.Delete_Cart_LocalStorage(userName,product);
        console.log(cart,'cart')
        this.subtotalAndlength();
      }
  }

  routeToCheckout() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.router.navigate(['cart/checkout']);
  }
}
