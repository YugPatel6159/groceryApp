import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { registerData } from 'src/app/shared/models/registerdata';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: any;
  constructor(private fb:FormBuilder,private toastr:ToastrService, private route:ActivatedRoute, private router: Router, private http:HttpClient, private apiService:ApiService){
   
  }
  
  ngOnInit(){
    this.registrationForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['', [Validators.required, Validators.email]],
      number:['', [Validators.required,Validators.pattern('[6789][0-9]{9}')]],
      userName:['', [Validators.required]],
      password:['', [Validators.minLength(8), Validators.required ]],
    }
    )
  }
  
 get firstName(){
   return this.registrationForm.get('firstName')
 }
 get lastName(){
   return this.registrationForm.get('lastName')
 }
 get email(){
   return this.registrationForm.get('email')
 }
 get number(){
   return this.registrationForm.get('number')
 }
 get password(){
   return this.registrationForm.get('password')
 }
 get userName(){
   return this.registrationForm.get('userName')
 }
 
 onRegFormSubmit(){
  let userData:registerData = {
    first_name:this.firstName.value,
    last_name: this.lastName.value,
    primary_mobile_number:this.number.value,
    primary_email: this.email.value,
    username:this.userName.value,
    password:this.password.value
  }
    this.apiService.registerUser(userData)?.subscribe
    (
      {
        next:(res:any)=>{
        if(res){this.toastr.success(res.message,'Success!')}},
        error:(err:any)=>this.toastr.error(err.message,'Failure!')
      }
    );
    
    this.router.navigate(['/login'])
 }
}
