import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../services/employer.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  userCount:any=0
  empCount:any=0
  jobCount:any=0
  adObject:any={}
  profile:any=""
  logInfo:any={}


  constructor(private as:AdminService){}
  ngOnInit(): void {
    this.logedAd()
    // count user
    this.as.getUsers().subscribe({
      next:(result:any)=>{
        this.userCount=result.length
        console.log(this.userCount);
        

      }
    })
    // count emp
    this.as.getEmps().subscribe({
      next:(result:any)=>{
        this.empCount=result.length
        console.log(this.empCount);
        

      }
    })

    // job count

    this.as.getJobs().subscribe({
      next:(result:any)=>{
        this.jobCount=result.length
        console.log(this.jobCount);
        

      }
    })




  }


  logedAd(){
    var email=localStorage.getItem("currentUserEmail")
    this.as.getAdmin(email).subscribe({
      next:(result:any)=>{

        this.adObject=result.admin
        this.logInfo=result.log
        console.log(this.adObject);
        console.log(this.logInfo);
        
        this.profile=this.adObject.profile

       
    }})
  }

}
