import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-job-applctn',
  templateUrl: './job-applctn.component.html',
  styleUrls: ['./job-applctn.component.css']
})
export class JobApplctnComponent implements OnInit{
  logo: any = "";
  empObject: any = {};
  logInfo: any = {};
  jobAppli:any=[]
  jobTitle:any=""

  constructor(private es:EmployerService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.getLogedEmp()

    this.getJobAppli()
    

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
        

      }
    })
    
  }
  getJobAppli(){
    var email=localStorage.getItem("currentUserEmail")
    this.es.getJobApplications(email).subscribe({
      next:(result:any)=>{
        this.jobAppli=result
        console.log(this.jobAppli);
        

        

      },
      error:(result:any)=>{
        // alert(result)

      }
    })

  }

  changeStatus(id: string, newStatus: string) {
    this.es.updateStatus(id, newStatus)
      .subscribe({
        next: (result: any) => {
          console.log('Status updated successfully:', result);
          // Add any further handling if needed
          this.getJobAppli()

        },
        error: (error: any) => {
          console.error('Error updating status:', error);
          // Handle error appropriately
        }
      });
  }

  sortDataByAppliedDate(): void {
    this.jobAppli.sort((a: any, b: any) => {
      const dateA = new Date(a.appliedJob.applied_date);
      const dateB = new Date(b.appliedJob.applied_date);
      return dateA.getTime() - dateB.getTime();
    });

    // Assign the sorted array back to jobAppli
    this.jobAppli = [...this.jobAppli];

    // Trigger change detection
    this.cdr.detectChanges();
  }


  downloadResume(resumeBase64Data: string): void {
    console.log('Resume Base64 Data:', resumeBase64Data); // Log the resume data
    // Remove the prefix from the base64 string
const base64DataWithoutPrefix = resumeBase64Data.replace(/^data:application\/pdf;base64,/, '');

    const byteCharacters = atob(base64DataWithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'resume.pdf');

    // Simulate a click on the anchor element to trigger the download
    link.click();

    // Clean up the URL object after the download
    URL.revokeObjectURL(url);
}


}
