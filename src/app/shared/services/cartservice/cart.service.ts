import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Grocery } from '../../models/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../models/cartItemInterface';
import { ApiService } from '../Api service/api.service';
import { ToastrService } from 'ngx-toastr';
import { jsDocComment } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartArr: any[]=[];
  constructor(private http: HttpClient, private apiService:ApiService,private toastr: ToastrService) {}

  header = new BehaviorSubject<boolean>(false);
  header$ = this.header.asObservable();
  subTotal = new Subject<number>();
  subTotal$ = this.subTotal.asObservable();
  cartLengths = new Subject<number>();
  cartLengths$ = this.cartLengths.asObservable();



  cartArray:any[]=[];
  existingProduct: any;
  getProducts(product: any,userName:any) {
    let cartItem: CartItem = {
      id: Number(product.id),
      imageUrl:product.avatar_image,
      grocery_name: product.title,
      price:  product.amount,
      discPrice:product.discount_amount,
      quantity: 1,
      subtotal: Number(
        product.discount_amount!=0 ? product.amount-product.discount_amount : product.amount
      ),
      quantityCount: 1, 
    };
    this.ADD_Cart_User_Wise(userName, cartItem, product.id);
  }
  cartLength!:number;
  // finalSubTotal!:number;
  addProductToCart(product: any,userId:any) {
    this.getProducts(product,userId);
    this.cartLengthAndTotal(product,userId);
 }
 cartLengthAndTotal(product:any,userId:any){
  console.log(product)
  console.log(userId)
 }
// local storage
User_Add_Cart(username: any) {
  let cart_Arr: any = [];
  console.log("cartArr",cart_Arr)
  if (localStorage.getItem('Cart')) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    cart_Arr = Merge.find((user: any) => user.username == username);
    console.log('Cart_Arr', cart_Arr);
    let cart = {
      username: username,
      items: [],
    };
    if (!cart_Arr) {
      console.log('username', username);
      console.log('cart', cart);
      let Arr = JSON.stringify([]);
      if (!localStorage.getItem('Cart')) {
        localStorage.setItem('Cart', Arr);
      }

      let Merge = JSON.parse(localStorage.getItem('Cart'));
      Merge.push(cart);
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      // localStorage.setItem("Cart",JSON.stringify(cart))
    }
  } else {
    let cart = {
      username: username,
      items: [],
    };
    if (!cart_Arr.length) {
      console.log('username', username);
      console.log('cart', cart);
      let Arr = JSON.stringify([]);
      if (!localStorage.getItem('Cart')) {
        localStorage.setItem('Cart', Arr);
      }

      let Merge = JSON.parse(localStorage.getItem('Cart'));
      Merge.push(cart);
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      // localStorage.setItem("Cart",JSON.stringify(cart))
    }
  }
}
GetTotalAndLength(cart:any){
  console.log(cart,'fromtotal')
  if(cart){
    let finalSubTotal = cart.map((product: any) => product.subtotal*product.quantity)
    .reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0);
    console.log(finalSubTotal)
    localStorage.setItem('length',JSON.stringify(cart.length))
    localStorage.setItem('finalSubTotal',JSON.stringify(finalSubTotal))
    this.subTotal.next(finalSubTotal);
    this.cartLengths.next(cart.length)
  }
}
ADD_Cart_User_Wise(username: any, data: any, id: any) {
  let Guest_cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
  if (!Guest_cart) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
    if (!duplicate) {
      cart.items.push(data);
      console.log('Cart in Service==>>', cart);
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      this.GetTotalAndLength(cart.items);
      this.toastr.success('Added to cart', data.title);
    } else {
      // duplicate.quantity=duplicate.quantity+1
      console.log('Merge', Merge);
      this.toastr.info('Already Added Please Go to Cart', data.title);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      this.GetTotalAndLength(cart.items);
    }
  } else {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
    if (!duplicate) {
      cart.items.push(data);
      if(Guest_cart[0].items.length){

        cart.items.push(Guest_cart[0].items[0]);
        if (Guest_cart) {
          let Merge = JSON.parse(localStorage.getItem('Guest_Cart'));
          if (Merge) {
            Merge[0].items = [];
            console.log("Merge",Merge)
            localStorage.setItem('Guest_Cart', JSON.stringify(Merge));
            this.GetTotalAndLength(cart.items)

          }
        }
      }
      console.log('Cart in Service==>>', cart);
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      this.GetTotalAndLength(cart.items)
      this.toastr.success('Added to cart', data.title);
    } else {
      // duplicate.quantity=duplicate.quantity+1
      console.log('Merge', Merge);
      this.toastr.info('Already Added Please Go to Cart', data.title);
      localStorage.setItem('Cart', JSON.stringify(Merge));
      this.GetTotalAndLength(cart.items)

    }
  }
}

ADD_Cart_User_Wise_Quantity(username: any, data: any, id: any) {
  // let Product_Quantity={
  //   qunatity:quantity
  // }

  let Merge = JSON.parse(localStorage.getItem('Cart'));
  let cart = Merge.find((user: any) => user.username == username);
  let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
  if (!duplicate) {
    cart.items.push(data);
    console.log('Cart in Service==>>', cart);
    console.log('Merge', Merge);
    localStorage.setItem('Cart', JSON.stringify(Merge));
    this.GetTotalAndLength(cart.items)

    this.toastr.success('Added to cart', data.title);
  } else {
    duplicate.quantity = duplicate.quantity + 1;
    console.log('Merge', Merge);
    localStorage.setItem('Cart', JSON.stringify(Merge));
    this.GetTotalAndLength(cart.items)

    this.toastr.info('Already Added Please Go to Cart', data.title);
  }
}
Quantity_Plus(username: any, data: any) {
  let Merge = JSON.parse(localStorage.getItem('Cart'));
  let cart = Merge.find((user: any) => user.username == username);
  let duplicate = cart.items.find(
    (Duplicate: any) => Duplicate.id == data.id
  );
    
  duplicate.quantity = duplicate.quantity + 1;
  console.log('Merge', Merge);
  // this.toastr.info('Already Added Please Go to Cart', data.title);
  localStorage.setItem('Cart', JSON.stringify(Merge));
  this.GetTotalAndLength(cart.items)

}
Quantity_Minus(username: any, data: any) {
  let Merge = JSON.parse(localStorage.getItem('Cart'));
  let cart = Merge.find((user: any) => user.username == username);
  let duplicate = cart.items.find(
    (Duplicate: any) => Duplicate.id == data.id
  );
  if (duplicate.quantity > 1) {
    duplicate.quantity = duplicate.quantity - 1;
    console.log('Merge', Merge);
    // this.toastr.info('Already Added Please Go to Cart', data.title);
    localStorage.setItem('Cart', JSON.stringify(Merge));
    this.GetTotalAndLength(cart.items)

  }
}
 Delete_Cart_LocalStorage(username: any, data: any) {
  let Merge = JSON.parse(localStorage.getItem('Cart'));
  let cart = Merge.find((user: any) => user.username == username);
  let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == data.id);
  console.log(duplicate, 'duplicate');
  let Index = cart.items.indexOf(duplicate);
  console.log('cart indexOf', Index);
  if (Index >= 0) {
    cart.items.splice(Index, 1);
  }
  localStorage.setItem('Cart', JSON.stringify(Merge));
  this.GetTotalAndLength(cart.items)

}
Delete_User_Cart_LocalStorage(username: any) {
  let Merge = JSON.parse(localStorage.getItem('Cart'));
  let cart = Merge.find((user: any) => user.username == username);
  cart.items = [];
  console.log('cart.items', cart.items);
  console.log('Merge', Merge);
  localStorage.setItem('Cart', JSON.stringify(Merge));
  this.GetTotalAndLength(cart.items)
  localStorage.setItem('finalSubTotal', JSON.stringify(0))
  localStorage.setItem('length',JSON.stringify(0))
  this.subTotal.next(0);
  this.cartLengths.next(0);
  // this.getItemCount()
  //   this.Subtotal()
}
Guest_cart_Generate() {
  if (!sessionStorage.getItem('Guest_Cart')) {
    let cart = {
      items: [],
    };

    console.log('cart', cart);
    let Arr = JSON.stringify([]);
    if (!sessionStorage.getItem('Guest_Cart')) {
      sessionStorage.setItem('Guest_Cart', Arr);
    }
    let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    Merge.push(cart);
    console.log('Merge', Merge);
    sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
    this.GetTotalAndLength(cart.items)

  }
}
Guest_User(data: any) {
  if (sessionStorage.getItem('Guest_Cart')) {
    let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    if (Merge[0].items.length == 0) {
      let duplicate = Merge[0].items.find(
        (Duplicate: any) => Duplicate.id == data.id
      );
      if (!duplicate) {
        Merge[0].items.push(data);
        console.log('Cart in Service==>>', Merge);
        sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
        
        this.toastr.success('Added to cart', data.title);
      } else {
        // duplicate.quantity=duplicate.quantity+1
        console.log('Merge', Merge);
        this.toastr.info('Already Added Please Go to Cart', data.title);
        sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
      }
    } else {
      this.toastr.error('Please Login For Add More Items in Cart');
    }
  }
}
Delete_Guest_cart() {
  let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
  if (Merge) {
    Merge[0].items = [];
    sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
  }
}
} 

