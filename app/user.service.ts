import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  getUser(){
    return new User("0546303074","nativo");
  }
}
  class User {
    private phone:string;
    private name:string;

    constructor(phone:string,name:string){
      this.phone = phone;
      this.name = name;
    }
    public getName() : string{
      return this.name;
    }
    public getPhone() : string{
      return this.phone;
    }
    public toString() : string{
      return this.name +" "+this.phone;
    }
  }

