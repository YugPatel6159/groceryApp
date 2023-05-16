import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  title: any;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private cartService: CartService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {

    this.likedProduct();
  }
  urlGroceryName: any;
  urlCategory: any;
  productId: number = 0;
  matchedProduct: any = [];
  productImg: any;
  price: any;
  discPrice: any;
  quantityCount: number = 1;

  ngOnInit() {

    this.route.params.subscribe((res) => {
      if (res) {
        this.title = res['title'];
        this.productId = Number(res['id']);
        console.log(this.title, this.urlCategory, this.productId);
        this.encryptedProduct(this.productId);
      }
    });
    console.log(this.matchedProduct);
  }

  encryptedProduct(id: any) {
    this.encryptionService
      .Encryption(JSON.stringify(id))
      .subscribe((res: any) => {
        if (res) {
          console.log(res.data);
          let encryptedId = res.data;
          this.getProductById(encryptedId);
        }
      });
    return this.matchedProduct;
  }

  minus() {
    if (this.quantityCount > 1) {
      console.log('hejknweioff');
      this.quantityCount -= 1;
      this.price =
        this.price -
        (this.matchedProduct.amount - this.matchedProduct.discount_amount);
      // this.discPrice = this.discPrice - this.matchedProduct.discount_amount;
    }
  }
  
  plus() {
    console.log(this.matchedProduct, 'matchedProduct');
    if (this.quantityCount >= 0) {
      this.quantityCount += 1;
      // this.price = this.price + (this.matchedProduct.amount- this.matchedProduct.discount_amount);
      this.price =
        (this.matchedProduct.amount - this.matchedProduct.discount_amount) *
        this.quantityCount;
      // this.discPrice = this.discPrice + this.matchedProduct.discpunt_amount;
    }
  }

  onAdd(product: any) {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    let username = localStorage.getItem('user');
    console.log(cart, 'cart');
    let matchedUser = cart.find((res: any) => {
      return res.username === username;
    });
    console.log(matchedUser, 'matchedUser');
    this.cartService.getProducts(product, username);
  }

  getProductById(encryptedId: any) {
    this.apiService.getProductsById(encryptedId)?.subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res.data);
          this.matchedProduct = res.data;
          console.log(this.matchedProduct);
          this.price =
            this.matchedProduct.amount - this.matchedProduct.discount_amount;
          this.discPrice = this.matchedProduct.discount_amount;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  likedProduct() {
    let liked_Arr: any = [];
    console.log("cartArr",liked_Arr)
    if (localStorage.getItem('likedProducts')) {
      let Merge = JSON.parse(localStorage.getItem('likedProducts'));
      liked_Arr = Merge.find((user: any) => user.username == localStorage.getItem('user'));
      console.log('liked_Arr', liked_Arr);
      let likedOject = {
        username: localStorage.getItem('user'),
        items: [],
      };
      if (!liked_Arr) {
        // console.log('username', username);
        console.log('likedProducts', likedOject);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('likedProducts')) {
          localStorage.setItem('likedProducts', Arr);
        }
  
        let Merge = JSON.parse(localStorage.getItem('likedProducts'));
        Merge.push(likedOject);
        console.log('Merge', Merge);
        localStorage.setItem('likedProducts', JSON.stringify(Merge));
        // localStorage.setItem("likedProducts",JSON.stringify(likedProducts))
      }
    } else {
      let likedOject = {
        username: localStorage.getItem('user'),
        items: [],
      };
      if (!liked_Arr.length) {
        // console.log('username', username);
        console.log('likedProducts', likedOject);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('likedProducts')) {
          localStorage.setItem('likedProducts', Arr);
        }
  
        let Merge = JSON.parse(localStorage.getItem('likedProducts'));
        Merge.push(likedOject);
        console.log('Merge', Merge);
        localStorage.setItem('likedProducts', JSON.stringify(Merge));
        // localStorage.setItem("likedProducts",JSON.stringify(likedProducts))
      }
    }
  }
  likedProductUserWise(product:any){
    let Merge = JSON.parse(localStorage.getItem('likedProducts'));
    let matchedLikeUser = Merge.find((user: any) => user.username == localStorage.getItem('user'));
    let duplicate = matchedLikeUser.items.find((res: any) => res.id == product.id);
    if(!duplicate){
      matchedLikeUser.items.push(product);
      localStorage.setItem('likedProducts', JSON.stringify(Merge));
      this.toastr.success('Product added successfully');
    }else{
      matchedLikeUser.items.splice(matchedLikeUser.items.indexOf(duplicate), 1);
      localStorage.setItem('likedProducts', JSON.stringify(Merge));
      this.toastr.success('Product removed successfully');
    }
    }
}
