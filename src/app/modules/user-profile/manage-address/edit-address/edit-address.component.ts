import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { addAddress } from 'src/app/shared/models/addAddress';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent {
  states = [  
    {     name: 'Andaman and Nicobar Islands',     cities: ['Port Blair'] 
  },
  { 
    name: 'Andhra Pradesh', 
    cities: [
      'Adoni', 'Amaravati', 'Anantapur', 'Chandragiri', 'Chittoor', 
      'Dowlaiswaram', 'Eluru', 'Guntur', 'Kadapa', 'Kakinada', 
      'Kurnool', 'Machilipatnam', 'Nagarjunakoṇḍa', 'Rajahmundry', 
      'Srikakulam', 'Tirupati', 'Vijayawada', 'Visakhapatnam', 
      'Vizianagaram', 'Yemmiganur'
    ] 
  },
  { 
    name: 'Arunachal Pradesh', 
    cities: [
      'Itanagar'
    ] 
  },
  { 
    name: 'Assam', 
    cities: [
      'Dhuburi', 'Dibrugarh', 'Dispur', 'Guwahati', 'Jorhat', 
      'Nagaon', 'Sibsagar', 'Silchar', 'Tezpur', 'Tinsukia'
    ] 
  },
  { 
    name: 'Bihar', 
    cities: [
      'Ara', 'Baruni', 'Begusarai', 'Bettiah', 'Bhagalpur', 
      'Bihar Sharif', 'Bodh Gaya', 'Buxar', 'Chapra', 'Darbhanga', 
      'Dehri', 'Dinapur Nizamat', 'Gaya', 'Hajipur', 'Jamalpur', 
      'Katihar', 'Madhubani', 'Motihari', 'Munger', 'Muzaffarpur', 
      'Patna', 'Purnia', 'Pusa', 'Saharsa', 'Samastipur', 'Sasaram', 
      'Sitamarhi', 'Siwan'
    ] 
  },
  { 
    name: 'Chandigarh', 
    cities: [
      'Chandigarh'
    ] 
  },
  { 
    name: 'Chhattisgarh', 
    cities: [
      'Ambikapur', 'Bhilai', 'Bilaspur', 'Dhamtari', 'Durg', 
      'Jagdalpur', 'Raipur', 'Rajnandgaon'
    ] 
  },
  { 
    name: 'Dadra and Nagar Haveli and Daman and Diu', 
    cities: [
      'Daman', 'Diu'
    ] 
  },
  { 
    name: 'Delhi', 
    cities: [
      'Delhi', 'New Delhi'
    ] 
  },
  { 
    name: 'Goa', 
    cities: [
      'Mormugao', 'Panaji'
    ] 
  },
  { 
    name: 'Gujarat', 
    cities: [
      'Ahmedabad', 'Amreli', 'Bharuch', 'Bhavnagar', 'Bhuj', 
      'Dwarka', 'Gandhinagar', 'Godhra', 'Jamnagar', 'Junagadh', 
      'Kandla', 'Khambhat', 'Kheda', 'Mahesana', 'Morvi', 'Nadiad', 'Navsari', 'Okha', 'Palanpur',
      'Patan', 'Porbandar', 'Rajkot', 'Surat', 'Surendranagar',
      'Valsad', 'Veraval', 'Vadodara'
      ]
      },
      {
      name: 'Haryana',
      cities: [
      'Ambala', 'Bhiwani', 'Chandigarh', 'Faridabad', 'Fatehabad',
      'Gurgaon', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal',
      'Kurukshetra', 'Mahendragarh', 'Narnaul', 'Narwana', 'Palwal',
      'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat',
      'Tohana', 'Yamunanagar'
      ]
      },
      {
      name: 'Himachal Pradesh',
      cities: [
      'Bilaspur', 'Chamba', 'Dalhousie', 'Dharamsala', 'Hamirpur',
      'Kangra', 'Kullu', 'Mandi', 'Nahan', 'Shimla', 'Una'
      ]
      },
      {
      name: 'Jammu and Kashmir',
      cities: [
      'Anantnag', 'Baramula', 'Doda', 'Gulmarg', 'Jammu', 'Kathua',
      'Leh', 'Punch', 'Rajauri', 'Srinagar', 'Udhampur'
      ]
      },
      {
      name: 'Jharkhand',
      cities: [
      'Bokaro', 'Chaibasa', 'Deoghar', 'Dhanbad', 'Dumka', 'Giridih',
      'Hazaribag', 'Jamshedpur', 'Jharia', 'Rajmahal', 'Ranchi',
      'Saraikela'
      ]
      },
      {
      name: 'Karnataka',
      cities: [
      'Badami', 'Ballari', 'Bangalore', 'Belgavi', 'Bhadravati',
      'Bidar', 'Chikkamagaluru', 'Chitradurga', 'Davangere',
      'Halebidu', 'Hassan', 'Hubballi-Dharwad', 'Kalaburagi',
      'Kolar', 'Madikeri', 'Mandya', 'Mangaluru', 'Mysuru',
      'Raichur', 'Shivamogga', 'Shravanabelagola', 'Tumkuru', 'Udupi'
      ]
      },
      {
      name: 'Kerala',
      cities: [
      'Alappuzha', 'Badagara', 'Idukki', 'Kannur', 'Kochi', 'Kollam',
      'Kottayam', 'Kozhikode', 'Mattancherry', 'Palakkad', 'Thalassery',
      'Thiruvananthapuram', 'Thrissur'
      ]
      },
      {
      name: 'Ladakh',
      cities: [
      'Kargil', 'Leh'
      ]
      }]
      editAddress!:FormGroup;
      stateArr:[]=[]
  addressData!:addAddress;
  address: any;
  constructor(private fb:FormBuilder, private apiService:ApiService, private route:ActivatedRoute, private encryptionService: EncryptionService){
   this.editAddress=this.fb.group({
     address1:['',Validators.required],
     address2:['',Validators.required],
     area:['', [Validators.required]],
     city:['', [Validators.required]],
     state:['', [ Validators.required]],
     country:['', [ Validators.required]],
     postalCode:['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
     landMark:['',Validators.required],
     tag:['',Validators.required]
   }
   )
  }
  addressId:any
  ngOnInit(){
    this.route.params.subscribe((res)=>{
      if(res){
        this.addressId = res['id']
      }
    })
    this.apiService.getUserDetails()?.subscribe({next:(res:any)=>{
      if(res){
        
        console.log('res',res.data.addresses,this.addressId)
        this.address = res.data.addresses.find((res:any)=>{
          return res.id==this.addressId 
        })
      }
      console.log('city',this.address.city);
      
      this.editAddress.patchValue({
        address1: this.address.address_line_1,
        address2: this.address.address_line_2,
        area: this.address.area,
        city: this.address.city,
        state:this.address.state,
        country: this.address.country,
        postalCode: this.address.postal_code,
        landMark:this.address.landmark,
        tag: this.address.tag
      })
    }})
  }
  cities:any;
  selectedState(state:any){
    this.cities = this.states.find(val=>{
      return state.value === val.name  
    })
    this.cities =this.cities.cities
    // console.log(state.value)
  }
  selectedStates:any
 get address1(){
   return this.editAddress.get('address1')
 }
 get address2(){
   return this.editAddress.get('address2')
 }
 get area(){
   return this.editAddress.get('area')
 }
 get city(){
   return this.editAddress.get('city')
 }
 get state(){
   return this.editAddress.get('state')
 }
 get country(){
   return this.editAddress.get('country')
 }
 get postalCode(){
   return this.editAddress.get('postalCode')
 }
 get landMark(){
  return this.editAddress.get('landMark')
}
get tag(){
  return this.editAddress.get('tag')
}

onSave(){
  this.addressData = {
    address_line_1: this.address1?.value,
        address_line_2: this.address2?.value,
        area: this.area?.value,
        city: this.city?.value,
        state: this.state?.value,
        country: this.country?.value,
        postal_code: this.postalCode?.value,
        landmark: this.landMark?.value,
        tag: this.tag?.value
  }
  console.log('changed Address',this.addressData)
  this.encryptionService.Encryption(this.addressId).subscribe((res:any)=>{
    if(res){

      console.log(res);
      this.apiService.editAddress(this.addressData, res.data)?.subscribe(
        {next:(res:any)=>{
          if(res){
            console.log(res)
          }
        },
        error:(err:any)=>{  
          console.log(err)
        }})  
      }
  })
  
}
}
