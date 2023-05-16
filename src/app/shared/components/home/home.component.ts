import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CartService } from '../../services/cartservice/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private spinner: NgxSpinnerService,private cartService:CartService) {}
ngOnInit(){
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
  window.scrollTo(0,0);
  
  let username=(localStorage.getItem('user'))
  console.log("username",username)
}


}
