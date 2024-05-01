import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {
  p:number=1
  emps:any=[]
  adObject:any={}
  profile:any=""
  companyname:string=""

  constructor(private as:AdminService){}
  ngOnInit(): void {
    this.getEmps()
    this.logedAd()
  }
  getEmps(){
    this.as.getEmps().subscribe({
      next:(result:any)=>{
        this.emps=result
        console.log(this.emps);
        

      }
    })

  }

  removeEmp(_id:any){
    this.as.removeEmp(_id).subscribe({
      next:(result:any)=>{
       alert(`${result}removed`)
       this.getEmps()


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
      let head=[["Id", "Company Name","HR Name","place","Email","phone","website"]]
      // setting body [{},{},...] convert to [[],[],...]
      let body:any=[]
      this.emps.forEach((i:any,index:any)=>{
        body.push([index+1,i.companyname,i.username,i.location,i.email,i.phone,i.website])
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
