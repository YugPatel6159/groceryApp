import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginData } from 'src/app/shared/models/logindata';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  userId: any;
  cartItems: any[] = [];
  matchedCustomer: any;
  loginData!: loginData
  constructor(private fb: FormBuilder, private toastr: ToastrService, private apiService: ApiService, private router: Router, private cartService: CartService) {
  }
  ngOnInit() {
    this.check();
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    }
    )
  }
  check(){
    let token = localStorage.getItem('token')
    if(token){
      this.router.navigate([''])
    }
  }
  get userName() {
    return this.loginForm.get('userName')
  }
  get password() {
    return this.loginForm.get('password')
  }

  getUserDetails(){
    this.apiService.getUserDetails()?.subscribe((res: any) => {
      if (res) {
        this.userId = res.data.id;
        localStorage.setItem('customerId', this.userId)
        console.log(res,'rees.')
        let username = localStorage.getItem('user');
        let cart = JSON.parse(localStorage.getItem('Cart'))
        console.log(cart,'cart')
        let userCart = cart.find((res:any)=>{
         return res.username === username
        }).items
        let finalSubTotal = userCart.
          map((product: any) => ({price:product.price,quantity:product.quantity}))
          .reduce((acc, obj) => acc + obj.price * obj.quantity, 0);
          console.log(finalSubTotal,'finalSubtotal')
          let length = userCart.length;
          localStorage.setItem('finalSubTotal',finalSubTotal)
          localStorage.setItem('length',length)
          this.cartService.subTotal.next(finalSubTotal)
          this.cartService.cartLengths.next(length);
          console.log(userCart,'uservcasjnclk')
      }
      

    })
  }


  loginUser() {
    this.loginData = {
      username: this.userName.value,
      password: this.password.value
    }
    this.userLogin();
  }


  userLogin() {
    this.apiService.loginUser(this.loginData)?.subscribe
      (
        {
          next: (data: any) => {
            if (data) {
              this.cartService.User_Add_Cart(data.data.user.username);
              this.toastr.success(data.message, 'success!')
              localStorage.setItem('token', data.data.token)
              localStorage.setItem('user', data.data.user.username)
              this.getUserDetails();
              console.log(data)
              this.router.navigate([''])
              this.cartService.header.next(true)
            }
          },
          error: (err: any) => {
            console.log(err)
            this.toastr.error(err.error.message, 'Failure!')
          }
        }
      );

  }
}
