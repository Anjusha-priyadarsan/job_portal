import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-emp-dash',
  templateUrl: './emp-dash.component.html',
  styleUrls: ['./emp-dash.component.css']
})
export class EmpDashComponent implements OnInit{
  logo: any = "";
  empObject: any = {};
  logInfo: any = {};
  jobCount:any="0"
  appCount:any="0"
  reviewed:any="0"

  constructor(private es:EmployerService){}
  ngOnInit(): void {

    

    this.getLogedEmp()
  }
  getLogedEmp(){

    var email=localStorage.getItem("currentUserEmail")
    this.es.getSingleEmp(email).subscribe({
      next:(result:any)=>{

        this.empObject=result.emp
        this.logInfo=result.log
        console.log(this.empObject);
        this.logInfo=result.log
        this.logo=this.empObject.logo

        this.es.getPostedJob(email).subscribe({
          next:(result:any)=>{
            console.log(result);
            
            this.jobCount=result.length
            console.log(this.jobCount);
            
          },
          error:(result:any)=>{
            // alert(result)
          }
        })

          
        
    }})
    this.es.getJobApplications(email).subscribe({
      next:(result:any)=>{
        this.appCount=result.length
        console.log(this.appCount);
        console.log(result);
        
        const filteredResults = result.filter((items:any) => items.appliedJob.status ==='1' );
        this.reviewed=filteredResults.length
        console.log(this.reviewed);
        
        

        

      },
      error:(result:any)=>{
        // alert(result)

      }
    })
    
  }

 
  } 


