import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders:any
    constructor(private apiService:ApiService,private router:Router){
      this.apiService.getAllOrders()?.subscribe((res:any)=>{
        if(res){  
          console.log(res.data.orders);
          this.orders = res.data.orders
        }
      })
    }
    moreDetails(id:any){
      this.router.navigate(['profile/orders/order-detail',id])
    }
}
