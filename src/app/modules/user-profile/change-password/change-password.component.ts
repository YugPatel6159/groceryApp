import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { changePassword } from 'src/app/shared/models/changePassword';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { AuthService } from 'src/app/shared/services/auth service/auth.service';
import {  passwordValidator } from '../validators/validator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  options: any;
  changePasswordForm:FormGroup;
  constructor(private router:ActivatedRoute, private fb:FormBuilder, private apiService:ApiService, private authService:AuthService,private toastr: ToastrService){
    this.changePasswordForm = this.fb.group({
      currPassword:['', Validators.required],
      newPassword:['',[Validators.required, Validators.minLength(8)]],
      confirmNewPassword:['',Validators.required]
    }, {validators:passwordValidator})
    
  }
  get currPassword()
  {
    return this.changePasswordForm.get('currPassword')
  }
  get newPassword()
  {
    return this.changePasswordForm.get('newPassword')
  }
  get confirmNewPassword()
  {
    return this.changePasswordForm.get('confirmNewPassword')
  }
  
  ngOnInit(){
    this.router.params.subscribe((res)=>{
      this.options = res['i']
    })
  }
  newchangePassword:any
  onChangePassword(){
    const token:string|null = JSON.stringify(localStorage.getItem('token'))
   this.newchangePassword={
      oldPassword:this.currPassword?.value,
      newPassword:this.newPassword?.value
    }
    if(token!=null){
      this.apiService.changePassword(this.newchangePassword)?.subscribe(
        {next:(data:any)=>{
        if(data){

          console.log(data)
          this.toastr.success("password changed successfully",'Success')} 
        },
        error:(err:any)=>{console.log(err)}
    });
    }
  }
  
}
