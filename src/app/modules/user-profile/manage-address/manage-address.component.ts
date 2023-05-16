import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css'],
})
export class ManageAddressComponent {
  address: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private _encryptionservice: EncryptionService
  ) {
    this.apiService.getUserDetails()?.subscribe((res: any) => {
      if(res){
        this.address = res.data.addresses;
      }
    });
  }
  deleteAddress(id: any) {
    this.encryption(id);
  }

  encryption_data!: string;
  encryption(id: any) {
    this._encryptionservice.Encryption(JSON.stringify(id)).subscribe({
      next: (encryption_res) => {
        if(encryption_res){

          console.log('hello');
          console.log('encryption_res', encryption_res);
          this.encryption_data = encryption_res.data;
          console.log('encryption_data', this.encryption_data);
          console.log(this.encryption_data);
          this.apiService.deleteAddress(this.encryption_data)?.subscribe(() => {
            this.toastr.success('Address Deleted', 'Success');
          });
        }
        
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
      },
    });
  }
  editAddress(id: number) {
    this.router.navigate(['profile/edit-address', id]);
  }
  addAddress() {
    this.router.navigate(['profile/add-address']);
  }
}
