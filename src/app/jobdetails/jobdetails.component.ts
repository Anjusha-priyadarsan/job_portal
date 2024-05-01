import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit
 {
  id:any=""
   details:any={}
  constructor( private us:UserService,private ar :ActivatedRoute,private rout:Router, private tost:ToastService,private rou:Router){}
  ngOnInit(): void {
    this.ar.params.subscribe((data: any) => {
      this.id=data.id

    this.us.getjobDetails(this.id).subscribe({
      next:(result:any)=>{
        this.details=result
        console.log( this.details);
        
      },
      error:(result:any)=>{
        alert(result)
      }

    })
  })
}

addtoSaved(job_id:any,email:any,title:any,description:any,type:any,vacancy:any,salary:any,experiance:any,qualification:any,skills:any,date:any){
  // console.log(id,title,price,description,category,image,rating);
  
  if(this.isLoggedIn()){
    if(localStorage.getItem("currentUserEmail")){
      var user_email=localStorage.getItem("currentUserEmail")
      const bodyData={
        user_email,job_id,email,title,description,type,vacancy,salary,experiance,qualification,skills,date
      }
      console.log(bodyData);
      
      this.us.addToSaved(bodyData).subscribe({
        next:(result:any)=>{
          // alert(result)
          this.tost.showSuccess(`${result}`)

          

        },
        error:(result:any)=>{
          // alert(result.error)
          this.tost.showError(`${result.error} `)
          

          
          console.log(result.error);
          // alert("Failed to add to wishlist. Error: " +result. error.message);
          // console.log("Error adding to wishlist:", result.error);
          

        }
      })
    }
  }
  else{
    // alert("plaese login first")
    this.tost.showWarning("plaese login First")

    this.rou.navigateByUrl("login")
  }


}



applyjob(job_id:any,email:any,title:any,description:any,type:any,vacancy:any,salary:any,experiance:any,qualification:any,skills:any,date:any){
  // console.log(id,title,price,description,category,image,rating);
  
  if(this.isLoggedIn()){
    if(localStorage.getItem("currentUserEmail")){
      var user_email=localStorage.getItem("currentUserEmail")
      var applied_date = new Date()

      const bodyData={
        user_email,job_id,email,title,description,type,vacancy,salary,experiance,qualification,skills,date,applied_date,status:0
      }
      console.log(bodyData);
      
      this.us.applyjob(bodyData).subscribe({
        next:(result:any)=>{
          alert(result)
          
          this.tost.showSuccess(`${result}`)
          this.rou.navigateByUrl('/appliedjobs')

          

        },
        error:(result:any)=>{
          // alert(result.error)
          this.tost.showError(`${result.error} `)
          

          
          console.log(result.error);
          // alert("Failed to add to wishlist. Error: " +result. error.message);
          // console.log("Error adding to wishlist:", result.error);
          

        }
      })
    }
  }
  else{
    // alert("plaese login first")
    this.tost.showWarning("plaese login First")

    // this.rou.navigateByUrl("login")
  }


}





isLoggedIn(){
  if(localStorage.getItem("currentUser")){
    return true
  }
  else{
    return false
  }
}


  

}
