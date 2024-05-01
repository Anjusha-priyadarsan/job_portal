import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit {

  keywords: string = '';
  location: string = '';
  jobType: string = 'All';
  experience: string = '';
  jobs: any[] = [];
  error: string = '';
  p:number=1
  email:string=""
  

  constructor(private us:UserService,private tost:ToastService){}
  ngOnInit(): void {
    this.email = localStorage.getItem("currentUserEmail") || "";

    this.searchJobs()
    
  }

  searchJobs(): void {

    const searchCriteria = {
      keywords: this.keywords,
      location: this.location,
      jobType: this.jobType,
      experience: this.experience
    };
    console.log(searchCriteria);
    
    this.us.searchJobs(searchCriteria).subscribe({
      next:(result:any)=>{
        this.jobs = result;
        console.log(this.jobs);
        
        

      },
        error:(res:any)=>{
        console.log(res);
        // alert(res.error)
        this.tost.showWarning(`${res.error} `)

      }
    })
  }

  // Function to clear input fields
  clearInputs() {
    this.keywords = '';
    this.location = '';
    this.jobType = 'All';
    this.experience = '';
    this.searchJobs()

  }
      

}
