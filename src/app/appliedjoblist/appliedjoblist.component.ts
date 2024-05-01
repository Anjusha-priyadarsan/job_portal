import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-appliedjoblist',
  templateUrl: './appliedjoblist.component.html',
  styleUrls: ['./appliedjoblist.component.css']
})
export class AppliedjoblistComponent implements OnInit {

  profile: any = "https://i.pinimg.com/736x/64/c0/7c/64c07cd56fee2c3b0423168c5b10e58c.jpg";
  userObject: any = {};
  logInfo: any = {};
  error:any=""

  jobs:any=[]
  userEmail:any=""
  jobTitle:any=""
  filteredAppliedJobs: any[] = [];


  constructor(private us:UserService){

  }
  ngOnInit(): void {
    if(localStorage.getItem("currentUserEmail")){
      this.userEmail=localStorage.getItem("currentUserEmail")
      console.log(this.userEmail);
      
      this.getJobs()
      this.getLogedEmp()
      console.log(this.jobTitle);
      
  }
}

  getJobs(){
    this.us.getAppliedJob(this.userEmail).subscribe({
      next:(result:any)=>{
        this.jobs=result
        console.log(this.jobs);
        
      },
      error:(result:any)=>{
        console.error("Error fetching saved jobs:", result);

        // alert(result)
      }
    })
  }

  getLogedEmp() {
    const email = localStorage.getItem("currentUserEmail");
    this.us.getSingleUser(email).subscribe({
      next: (result: any) => {
        this.userObject = result.user;
        this.logInfo = result.log;
        this.profile = this.userObject.profile; // Set profile image
      }
    });
  } 

  
    // This method filters applied jobs based on the searchTitle
    filterAppliedJobs() {
      console.log(this.jobTitle);
      
      if (this.jobTitle.trim() === '') {
          this.filteredAppliedJobs = this.jobs;
          
      } else {
          this.filteredAppliedJobs = this.jobs.filter((job:any) => 
              job.job.title.toLowerCase().includes(this.jobTitle.trim().toLowerCase())
          
          );
          console.log(this.filterAppliedJobs);

      }
  }

}
