import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { editCustomer } from 'src/app/shared/models/editCustomer';
import { ApiService } from 'src/app/shared/services/Api service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: any;
 constructor(private fb:FormBuilder,private toastr: ToastrService, private apiService:ApiService,private spinner: NgxSpinnerService){
  this.profileForm=this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['', [Validators.required, Validators.email]],
    number:['', [Validators.required,Validators.pattern('[6789][0-9]{9}')]],
    altEmail:['', [ Validators.email]],
    altNumber:['', [ Validators.pattern('[6789][0-9]{9}')]],
    dob:['', Validators.required],
    password:['',[Validators.required, Validators.minLength(8)]]
  }
  )
 }
 
 ngOnInit(){
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
   this.apiService.getUserDetails()?.subscribe(
    {
      next:(data:any)=>{
        if(data){

          console.log(data.data);
          this.profileForm.patchValue({
            firstName:data.data.first_name,
            lastName:data.data.last_name,
            email:data.data.primary_email,
            number:data.data.primary_mobile_number
          })
        }
      },
      error: (err:any)=>
      {
        console.log(err)
      }
    })
      
 }
 
get firstName(){
  return this.profileForm.get('firstName')
}
get lastName(){
  return this.profileForm.get('lastName')
}
get email(){
  return this.profileForm.get('email')
}
get number(){
  return this.profileForm.get('number')
}
get altEmail(){
  return this.profileForm.get('altEmail')
}
get altNumber(){
  return this.profileForm.get('altNumber')
}
get dob(){
  return this.profileForm.get('dob')
}
get password()
  {
    return this.profileForm.get('password')
  }
editCustomerDetails!:editCustomer;
onSave(){
  this.editCustomerDetails = {
    first_name: this.firstName.value ,
    last_name: this.lastName.value ,
    date_of_birth: this.dob.value ,
    password: this.password.value,
    secondary_mobile_number: this.altNumber.value,
    secondary_email: this.altEmail.value
  }
  this.apiService.editCustomer(this.editCustomerDetails)?.subscribe(
    {
      next:res=>console.log(res),
      error: err=>console.log(err)
    })
  this.toastr.success()
}
}
