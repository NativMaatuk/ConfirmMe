import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
/*export class Guest {
  public phone:string;
  public name:string;
  public isComing:boolean;
  public numberOfPeople:Number;
  constructor(phone:string,name:string,isComing:boolean,numberOfPeople:Number){
    this.phone = phone;
    this.name = name;
    this.isComing = isComing;
    this.numberOfPeople = numberOfPeople;
  }
}*/
@Injectable({
  providedIn: 'root'
})
export class ControlPanelService{ 
  constructor(public firestore : AngularFirestore){ }
 
  addGuest(Record){
    return this.firestore.collection('guest').add(Record);
  }
  getAllGuest(){
    return this.firestore.collection('guest').snapshotChanges();
  }
  updateGuest(_id:string,record){
    this.firestore.doc('guest/'+_id).update(record);
  }
  }
export interface Guest {
  payload: any;
  id? : String;
  phone:string;
  name:string;
  isComing:boolean;
  numberOfPeople:Number;
}




