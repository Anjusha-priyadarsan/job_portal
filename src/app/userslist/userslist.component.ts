import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../services/employer.service';
import { AdminService } from '../services/admin.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  p:number=1
  users:any=[]
  adObject:any={}
  profile:any=""
  userName:string=""
  constructor(private as:AdminService){}
  ngOnInit(): void {
    this.getallUsers()
    this.logedAd()
  }

  getallUsers(){
    this.as.getUsers().subscribe({
      next:(result:any)=>{
        this.users=result
        console.log(this.users);
        

      }
    })
  }

  logedAd(){
    var email=localStorage.getItem("currentUserEmail")
    this.as.getAdmin(email).subscribe({
      next:(result:any)=>{

        this.adObject=result.admin
        console.log(this.adObject);
        
        this.profile=this.adObject.profile

       
    }})
  }

  convertPdf(){
    let pdf=new jsPDF()
      // seting heading for table
      let head=[["Id", "Name","Email","place","phone","Designation"]]
      // setting body [{},{},...] convert to [[],[],...]
      let body:any=[]
      this.users.forEach((i:any,index:any)=>{
        body.push([index+1,i.username,i.email,i.location,i.phone,i.designation])
      })
      pdf.setFontSize(16)
      // heading and position of heaing respective of xand y axis
      pdf.text("User Directory",10,10)

      // table generate

      autoTable(pdf,{head,body})

      // open in new window

      pdf.output('dataurlnewwindow')

      // auto download

      pdf.save('UsersData.pdf')
    
  }



}
