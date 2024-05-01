import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-savedjoblist',
  templateUrl: './savedjoblist.component.html',
  styleUrls: ['./savedjoblist.component.css']
})
export class SavedjoblistComponent implements OnInit {

  jobs: any[] = [];
  user_email: string = "";
  error:any=""
  profile: any = "";
  userObject: any = {};
  logInfo: any = {};
  jobTitle:any=""


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user_email = localStorage.getItem("currentUserEmail") || "";
    if (this.user_email) {
      this.getSavedJobs();
      this.getLogedEmp()
    }
  }

  getSavedJobs() {
    this.userService.getSavedJobs(this.user_email).subscribe({
      next: (result: any) => {
        this.jobs = result;
        console.log(this.jobs);
      },
      error: (error: any) => {
        console.error("Error fetching saved jobs:", error);
        // Handle error (e.g., show error message)
      }
    });
  }

  getLogedEmp() {
    const email = localStorage.getItem("currentUserEmail");
    this.userService.getSingleUser(email).subscribe({
      next: (result: any) => {
        this.userObject = result.user;
        this.logInfo = result.log;
        this.profile = this.userObject.profile; // Set profile image
      }
    });
  } 

  
}
