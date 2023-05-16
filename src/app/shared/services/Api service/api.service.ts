import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartService } from '../cartservice/cart.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  allCategories = environment.allCategoryUrl;
  userApiId: any;
  finalSubTotal: any;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  baseUrl = environment.baseUrl;
  // cartUrl = environment.cartUrl;
  changePasswordUrl = environment.changePassword;
  // cartTotal = environment.getCartApi;
  addAddress = environment.addAddress;
  customerDetails: any;
  edituserDetails = environment.editUserDetails;
  // addAddressApi = environment.addAddressToApi;
  getAllOrdersApi = environment.getOrdersApi;
  withoutTokenCrt!:any[]
  registerUser(userData: any) {
    try {
      const registerUrl = environment.registerUrl;
      return this.http.post(this.baseUrl + registerUrl, userData);
    } catch (error) {
      console.error(error);
      return null
    }
  }

  loginUser(userData: any) {
    try {
      const loginUrl = environment.loginUrl;
    return this.http.post(this.baseUrl + loginUrl, userData);
    } catch (error) {
      console.log(error)
    return null
    }
    
  }
  // cartItem = new BehaviorSubject<any>([]);
  // cartItem$ = this.cartItem.asObservable();
  // withoutTokenCart = new BehaviorSubject<any>([]);
  // withoutTokenCart$ = this.withoutTokenCart.asObservable();
  
  addCartApi(products: any, customerId: any) {
    console.log('Api service', products);
    console.log('Customer ID', customerId);
  }

  getUserDetails() {
    try {
      return this.http.get(this.baseUrl + environment.userDetails, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
    } catch (error) {
      console.log(error)
      return null
    }
    
  }
  changePassword(newPassword: any) {
    try {
      return this.http.put(this.baseUrl + this.changePasswordUrl, newPassword);      
    } catch (error) {
      console.log(error)
      return null
    }
  }


  
  cartSubTotal!: number;
  updateCartTotal(subtotal: number) {
    this.cartSubTotal = subtotal;
  }

  
  postAddressData(address: any) {
    try {
      return this.http.post(this.baseUrl + this.addAddress, address);
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  
  // addAddressToApi(address: any) {
  //   try {
  //     return this.http.post(this.addAddressApi, address);
      
  //   } catch (error) {
  //     console.log(error)
  //     return null
  //   }
  // }
  
  // getAddressFromApi() {
  //   try {
      
  //     return this.http.get(this.addAddressApi);
  //   } catch (error) {
  //     console.log(error)
  //     return null
  //   }
  // }

  deleteAddress(id: string) {
    try {
      return this.http.delete(this.baseUrl + 'customer/delete-customer-address', {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          address_id: id,
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  editAddress(address: any, id: any) {
    try {
      console.log(address);
      return this.http.put(
        this.baseUrl + 'customer/update-customer-address',
        address,
        { headers: new HttpHeaders({ address_id: id }) }
      );
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  getAllCategories() {
    try {
      return this.http.get(this.baseUrl + this.allCategories, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  editCustomer(userDetails: any) {
    try {
      
      return this.http.put(this.baseUrl + this.edituserDetails, userDetails);
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getAllOrders() {
    try {
      return this.http.get(this.baseUrl + this.getAllOrdersApi, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  getProductsByCategories(id: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .get(this.baseUrl + 'product/get-product-by-category-id', {
          headers: new HttpHeaders({
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Access-Control-Allow-Origin': '*',
            category_id: id,
          }),
        })
        .subscribe({
          next: (products: any) => {
            if(products){

              observer.next(products);
              observer.complete();
            }
          },
          error: (error: any) => {
            observer.error(error);
          },
        });
    });
  }

  allProducts = new Subject<any>();
  getAllProducts() {
    try {
      return this.http.get(this.baseUrl + 'product/get-all-products', {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  addOrdersApi(
    delivery_address_id: string,
    billing_address_id: string,
    payment_status: any,
    order_status: string,
    orderObject: any
  ) {
    try {
      console.log(delivery_address_id);
      console.log(billing_address_id);
      console.log(payment_status);
      console.log(order_status);
      return this.http.post<any>(this.baseUrl + 'order/add-order', orderObject, {
        headers: new HttpHeaders({
          delivery_address_id: delivery_address_id,
          billing_address_id: billing_address_id,
          payment_status: payment_status,
          order_status: order_status,
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }
  orderById(order_id: any) {
    try {
      return this.http.get(this.baseUrl + 'order/get-order-by-id', {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          order_id: order_id,
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getProductsById(product_id: any) {
    try {
      return this.http.get(this.baseUrl + 'product/get-product-by-id', {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          product_id: product_id,
        }),
      });
      
    } catch (error) {
      console.log(error)
      return null
    }
  }

  addUserToServer(userId: number, cartItems: any[]) {
    try {
      const url = 'http://localhost:3000/users';
      console.log(userId); // replace with your JSON server URL
      const body = {
        customerId: userId,
        cart: cartItems,
      };
      return this.http.post(url, body);
    }
     catch (error) {
      console.log(error)
      return null 
    }
  }
}
