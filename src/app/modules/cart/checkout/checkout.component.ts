import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { orderInterface } from 'src/app/shared/models/ordersObject';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  total!: number;
  address: any;
  orderObject!: orderInterface;
  addressLength: any;
  token: any;
  matcheduser: any;
  delivery_address_id: any;
  billing_address_id: any;
  paymentStatus = 'IJjOhx0uYI4ZK5Y-Wzfm2Q==';
  orderStatus = 'IJjOhx0uYI4ZK5Y-Wzfm2Q==';

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {
    this.token = localStorage.getItem('token');
  }
  addresses: any;
  cartArray: any[] = []; // initialize cartArray as an empty array

  ngOnInit() {
    this.getUserDetails();
    this.subtotalAndlength();
    this.checkoutOrder();
  }

  checkoutOrder(){

    let username = localStorage.getItem('user');
    let Cart = JSON.parse(localStorage.getItem('Cart'));
    if(Cart){
      this.matcheduser = Cart.find((res: any) => {
        return res.username === username;
      }).items;
    }
      console.log(this.matcheduser, 'checkout csrt');

    for (let i = 0; i < this.matcheduser.length; i++) {
      console.log(this.matcheduser[0].id, 'this.matcheduser[0].id');
      let cartProduct = {
        product_id: this.matcheduser[i].id,
        product_name: this.matcheduser[i].grocery_name,
        qty: this.matcheduser[i].quantity,
        product_amount: this.matcheduser[i].subtotal,
        discount_type: 2,
        discount_amount: 10,
      };
      console.log(cartProduct, 'cartoroduct');
      this.cartArray.push(cartProduct);
    }

    this.orderObject = {
      order_date: this.date(),
      special_note: 'Jaldi lekar ana bhai bhoookh lagi hai',
      estimate_delivery_date: this.date(),
      sub_total: this.total + 20,
      tax_amount: 20,
      discount_amount: 5,
      total_amount: this.total < 10 ? this.total : this.total - 5,
      paid_amount: this.total < 10 ? this.total : this.total - 5,
      payment_type: 2,
      order_products: this.cartArray,
    };
    console.log(this.orderObject, 'this.orderObject');
  }

  getUserDetails() {
    if (this.token) {
      this.apiService.getUserDetails()?.subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.address = res.data.addresses;
          this.addressLength = this.address.length;
        }
      });
    }
  }

  subtotalAndlength() {
    this.total = JSON.parse(localStorage.getItem('finalSubTotal'));
    this.cartService.subTotal$.subscribe((res: any) => {
      if (res) {
        this.total = res;
      }
    });
  }


  date() {
    let date = new Date();
    var getYear = date.toLocaleString('default', { year: 'numeric' });
    var getMonth = date.toLocaleString('default', { month: '2-digit' });
    var getDay = date.toLocaleString('default', { day: '2-digit' });
    var dateFormat = getYear + '-' + getMonth + '-' + getDay;
    return dateFormat;
  }


  encryptionAddress(id: any) {
    console.log('addressId ', id);
    this.encryptionService
      .Encryption(JSON.stringify(id))
      .subscribe((res: any) => {
        if (res) {
          console.log('encryptionIDOFADDRESS', res.data);
          this.delivery_address_id = res.data;
          this.billing_address_id = res.data;
          // console.log(this.paymentStatus)
          console.log(this.delivery_address_id);
          console.log(this.billing_address_id);
        }
      });
  }


  placeOrder() {
    console.log(this.delivery_address_id,
      this.billing_address_id,
      this.paymentStatus,
      this.orderStatus,
      this.orderObject,'aall; jerafmjjsdofihweuirf ')
    if(this.total){
      this.apiService
      .addOrdersApi(
        this.delivery_address_id,
        this.billing_address_id,
        this.paymentStatus,
        this.orderStatus,
        this.orderObject
        )
        ?.subscribe({
          next: (res: any) => {
            console.log('done', res);
            this.router.navigate(['cart/checkout/success']);
            let username = localStorage.getItem('user');
            this.cartService.Delete_User_Cart_LocalStorage(username);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
        this.cartService.subTotal.next(0);
            this.cartService.cartLengths.next(0);
      }
      else{
        alert('no products')
      }
    }
      

  cancelOrder() {
    const confirmBox = new ConfirmBoxInitializer();
  confirmBox.setTitle('Are you sure?');
  confirmBox.setMessage('Do you want to Delete?');
  confirmBox.setButtonLabels('DELETE', 'NO');

  // Choose layout color type
  confirmBox.setConfig({
    layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
  });

  // Simply open the popup and listen which button is clicked
  confirmBox.openConfirmBox$().subscribe((resp:any) => {
    // IConfirmBoxPublicResponse
    console.log('Clicked button response: ', resp);

    if(resp.success){
    this.router.navigate(['']);

    }})
      // this.cartService.subTotal.next(0);
    }
  addAddress() {
    this.router.navigate(['/profile/add-address']);
  }
}
