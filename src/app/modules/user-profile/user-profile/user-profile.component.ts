import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  options: any;
  constructor(private router:Router, private cartService:CartService,private toastr: ToastrService){
  }
  ngOnInit(){
    
  }
  onLogout(){
      localStorage.removeItem('token');
      this.cartService.header.next(false);
      this.toastr.success('logged out','success')
      this.router.navigate([''])
  }
}
