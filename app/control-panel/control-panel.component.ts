import { Component, OnInit } from '@angular/core';
import { ControlPanelService, Guest } from '../control-panel.service';
import * as XLSX from 'xlsx';
import * as firebase from 'firebase';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})

export class ControlPanelComponent implements OnInit {
  constructor(private fireBaseService:ControlPanelService, private Smessage:MessageService) { }
  public guest: any;
  phone:string = "";
  name:string = "";
  isComing:boolean = false;
  numberOfPeople:Number = 0;
  message:string;
  numberOfComing:number=0;
  numberOfNotComing:number=0;
  selectedFile = null;
  convertedJson:any;
  ngOnInit(): void 
  {
    this.getInitData();
  }
  sendRegularMessage(text){
    //TODO: need to add this text to phone message 
    console.log(text);
  }
  sentWhatsAppMessage(text){
    this.Smessage.sendWM().subscribe((data)=>{
      console.log(data);
    });
    //console.log(text);
  }
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }
  onUpload(){
   //console.log(this.selectedFile);
   const fileReader = new FileReader(); 
   fileReader.readAsBinaryString(this.selectedFile);
   fileReader.onload = (event) => {
     //console.log(event);
     let binaryData = event.target.result;
     let workbook = XLSX.read(binaryData,{type:'binary'});
     workbook.SheetNames.forEach(sheet =>{
       const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        //console.log(data);
        this.convertedJson = JSON.stringify(data,undefined,4);
        //console.log(this.convertedJson);
        this.submitToFireStore();
      })
     //console.log(workbook);
   }
  
  }
  //upload all the json data to firestore
  submitToFireStore(){
    const InvitedList = JSON.parse(this.convertedJson); 
    let flag:Boolean = true; 
    for (let guest of InvitedList) {
      //console.log(item.name +" - " +item.phone);
      for( let temp of this.guest)
        if(temp.phone == guest.phone)
          flag = false;
      if(flag){
          firebase.firestore().collection("guest").add({
            name: guest.name,
            phone: "0"+guest.phone,
            isComing: "?",
            numberOfPeople: "?"
        }).then(function(docRef) {
            console.log("Document written on firestore ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    } else
    console.log("{0"+guest.phone+"} - number alredy exist");
    flag = true;
  }
  }
 
  initStatistics(){
    //console.log(this.guest);
    if(this.guest){
      for(let item of this.guest){
        if(item.isComing && item.numberOfPeople != "?")
          this.numberOfComing+= item.numberOfPeople;
        else if(!item.isComing && item.numberOfPeople != "?"){
          if(item.numberOfPeople == 0)
            this.numberOfNotComing++;
          else
          this.numberOfNotComing+= item.numberOfPeople;
        }
      }
   }
  }
  getInitData():void{
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
      this.initStatistics();
    });
  }
  //add guest
  addGuest(){
    let Record = {};
    Record['phone'] = this.phone;
    Record['name'] = this.name;
    Record['isComing'] = this.isComing;
    Record['numberOfPeople'] = this.numberOfPeople;
    this.fireBaseService.addGuest(Record).then(res => {
      this.name = "";
      this.phone = "";
      this.isComing = undefined;
      this.numberOfPeople = undefined;
      //this.message = "Guest data save Done";
      console.log(this.message);
    }).catch(error => {
      console.log(error);
    });
  }
  getArrayGuest(){
    return this.guest;
  }
  updateGuest(){
    let _id:string;
    for(let item of this.guest){
      if(item.phone == "0546303074")
          _id =item.id;
  }
  //console.log(_id);
    let record = {};
    record ['name'] = "noam";
    record ['phone'] = "0546303074";
    record ['isComingame'] = false;
    record ['numberOfPeopleme'] = 2;
    this.fireBaseService.updateGuest(_id,record);
  }
  
}

 
  

    
    
