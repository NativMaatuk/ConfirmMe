import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlPanelService } from '../control-panel.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user;
  public guest:any;
  userForm:FormGroup;
  constructor(
    private userService:UserService,
    private router:Router,
    private fireBaseService:ControlPanelService,
     ) { }
  isComing=null;
  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.createUserFormGroup();
    //
    this.fireBaseService.getAllGuest().subscribe(data => {
      this.guest = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          phone: e.payload.doc.data()['phone'],
          isComing: e.payload.doc.data()['isComing'],
          numberOfPeople: e.payload.doc.data()['numberOfPeople'],
        };
      })
    });
  }
  createUserFormGroup(){
    this.userForm = new FormGroup({
      phone: new FormControl,
      numberPepole: new FormControl
    })
  }
  //if the guest mark coming
  showSubmitWithPhone(){
    this.isComing = true;
  }
  //if the guest are not coming
  showSubmit(){
    this.isComing = false;
  }
  sendForm(){
    alert("תודה רבה על הפרטים");
  }
  onSubmit(){
   // alert(this.userForm.get('phone').value + " "+this.userForm.get('numberPepole').value +" "+this.isComing);
    if(this.userForm.get('phone').value == "012")
      this.router.navigate(['control-panel']);
    else
      this.updateGuest();  
  }
  //need to get phone number and number of people
  updateGuest(){
    if(!this.userForm.get('phone').value) return;
    let phone:string = this.userForm.get('phone').value;
    let number_of_people:number =  this.userForm.get('numberPepole').value;
    let _id:string;
    let name:string;
    let ifInvited: boolean = false;
    for(let item of this.guest){
      if(item.phone == phone){
        ifInvited = true;
        _id =item.id;
        name = item.name;
      }   
    }
    if(!ifInvited){
      alert('מצטערים מספר לא מוכר במערכת.');
      return;
    }
    let record = {};
    record ['name'] = name;
    record ['phone'] = phone;
    record ['isComing'] = this.isComing;
    record ['numberOfPeople'] = number_of_people;
    this.fireBaseService.updateGuest(_id,record);
    alert('המידע התקבל תודה רבה.');
  }
}
