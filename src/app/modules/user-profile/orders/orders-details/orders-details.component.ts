import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
orderId: any;
  orderDetail: any;
constructor(private route: ActivatedRoute,private apiService:ApiService, private encryptionService:EncryptionService){}
ngOnInit(){
  this.route.params.subscribe(res=>{
    this.orderId = res['id']
    console.log(this.orderId)
    this.encryptionService.Encryption(this.orderId).subscribe((res:any)=>{
      if(res){
        console.log(res.data);
        let encryptyed_res = res
        this.apiService.orderById(encryptyed_res.data)?.subscribe({next:(res:any)=>{
          if(res){
            console.log(res)
            this.orderDetail = res
          }
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }
  }
    
    )
  })


}
}
