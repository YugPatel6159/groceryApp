import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.baseUrl;
  encryption = 'encryption'
  Encryption(id:any){
    
      return this.http.get<any>(this.baseUrl+this.encryption,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','id':id})})
    
  }
}
