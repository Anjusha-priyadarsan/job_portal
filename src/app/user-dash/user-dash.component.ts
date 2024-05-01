import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
  profile: any = "https://i.pinimg.com/736x/64/c0/7c/64c07cd56fee2c3b0423168c5b10e58c.jpg";
  userObject: any = {};
  logInfo: any = {};
  jobCount:any="0"
  savedCount:any="0"
  reviewed:any="0"

  constructor(private us:UserService){}
  ngOnInit(): void {

    this.getLogedEmp()
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

    // job count

    this.us.getAppliedJob(email).subscribe({
      next:(result:any)=>{
        console.log(result);
        
        this.jobCount=result.length
        console.log(this.jobCount);
        // reviewed count

      const filteredResults = result.filter((items:any) => items.appliedjob.status ==='1' );

      this.reviewed=filteredResults.length
      console.log(this.reviewed);
        
      }
  } )

  // get saved count

  this.us.getSavedJobs(email).subscribe({
    next: (result: any) => {
      console.log(result);
      
      this.savedCount = result.length;
      console.log(this.savedCount);

      
        
    }
  })

}
}
