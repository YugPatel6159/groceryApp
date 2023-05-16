import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  constructor(private apiService:ApiService ,private service:CartService, private router:Router){
  }
  routeToHome(){
    this.router.navigate([''])
  }
}
