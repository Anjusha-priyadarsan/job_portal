import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '../services/employer.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-empjoblist',
  templateUrl: './empjoblist.component.html',
  styleUrls: ['./empjoblist.component.css']
})
export class EmpjoblistComponent implements OnInit {

  p: number = 1;

  jobs:any=[]
  userEmail:any=""
  jobId:any=""
  singleJob:any=[]
  jobTitle:any=""
  logo: any = "";
  empObject: any = {};
  logInfo: any = {};

  jobPost = this.fb.group({

    // companymail:['',[Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    type: ['', [Validators.required]],
    vacancy: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    experiance: ['', [Validators.required]],
    qualification: ['', [Validators.required]],
    skills: ['', [Validators.required]],

    // date:['',[Validators.required]],




  })

  constructor(private fb: FormBuilder, private es: EmployerService, private ar:ActivatedRoute,private tost:ToastService) { }
  ngOnInit(): void {

    if(localStorage.getItem("currentUserEmail")){
      this.userEmail=localStorage.getItem("currentUserEmail")
      console.log(this.userEmail);
      
      this.getJobs()
      this.getLogedEmp()
    }

  }


  getJobs(){
    if (this.userEmail) {
      this.es.getPostedJob(this.userEmail).subscribe({
        next: (result: any) => {
          this.jobs = result;
          console.log(this.jobs);
        },
        error: (error: any) => {
          console.error("Error fetching jobs:", error);
          // alert("Failed to fetch jobs");
        }
      });
    } else {
      console.error("User email not found");
      alert("User email not found");
    }
  }
  








  postJob() {

    if (localStorage.getItem("currentUserEmail")) {

      var email = localStorage.getItem("currentUserEmail")
      var date = new Date()
      if (this.jobPost.valid) {

        var path = this.jobPost.value

        var jobData = {
          email: email,
          title: path.title,
          description: path.description,
          type: path.type,
          vacancy: path.vacancy,
          salary: path.salary,
          experiance: path.experiance,
          qualification: path.qualification,
          skills: path.skills,
          date: date

        }
        console.log(jobData);


        this.es.addJob(jobData).subscribe({
          next: (res: any) => {
            console.log(res);
            // alert(`${res} added successfully`)
            this.tost.showSuccess('added successfully')
            this.getJobs()


            this.jobPost.reset()
            // this.rout.navigateByUrl('/login')



          },
          error: (res: any) => {
            console.log(res);
            // alert(res.error)
            // this.tost.showSuccess(`${res.error} `)


          }
        })

      }
      else {
        // alert('invalid form')
        this.tost.showError("Invalid Form")


      }


    }
    else {
      alert("please logged in")
    }















  }


  removeJob(itemId:any){
    this.es.removeJob(itemId).subscribe({
      next:(result:any)=>{
        // this.jobs = this.jobs.filter((job: any) => job.id !== itemId);
        this.getJobs()

        // alert(result)
        this.tost.showError('deleted')

        
        
      },
      error:(result:any)=>{
        // alert(result.error)
      }

    })
  }



  getSingleJob(id:any){
    // this.ar.params.subscribe((data: any) => {
      this.jobId = id
      console.log(this.jobId);
      
      this.es.getSingleJob(this.jobId).subscribe({
        next: (result: any) => {
          // console.log(result);
          
          this.singleJob = result
          console.log(this.singleJob);

        },
        error: (result: any) => {
          // alert(result.error.message)

        }
      })


    // })
  }


  updateJob(id:any) {
    if (localStorage.getItem("currentUserEmail")) {
      var email = localStorage.getItem("currentUserEmail");
      var date = new Date();
  
      if (this.jobPost.valid) {
        var path = this.jobPost.value;
  
        var jobData = {
          email: email,
          title: path.title,
          description: path.description,
          type: path.type,
          vacancy: path.vacancy,
          salary: path.salary,
          experiance: path.experiance, // Corrected typo
          qualification: path.qualification,
          skills: path.skills,
          date: date
        };
  
        console.log(jobData);
  
        this.es.updateJob(id,jobData).subscribe({
          next: (res: any) => {
            console.log(res);
            // alert(`${res} updated successfully`);
            this.tost.showSuccess('update successfully')
            this.getJobs();
            this.jobPost.reset();
          },
          error: (res: any) => {
            console.log(res);
            // alert(res.error);
          }
        });
      } else {
        alert('Invalid form');
      }
    } else {
      alert('Please log in');
    }
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
  

 

  }
