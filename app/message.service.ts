import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class MessageService implements OnInit {
  
  constructor(private router:Router,private http:HttpClient) { }
  baseUrl:string = 'http://localhost:3000/';
  headers = { 'content-type' : 'application/json'};
  ngOnInit(): void {
  
  }
  sendWM():Observable<any>{
    return this.http.get(this.baseUrl + 'send');
    
  }
}