import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  emp:any={}

  loginFormModel=this.fb.group({
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
    pwd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  constructor(private us:UserService, private rout:Router,private fb:FormBuilder,private tost:ToastService){

  }
  ngOnInit(): void {
  }

  login(){
    

    if(this.loginFormModel.valid){
 
         var path=this.loginFormModel.value
 
         var loginData={
           email:path.email,
           password:path.pwd
 
         }
 
 
 
     this.us.signIn(loginData).subscribe({
       next:(res:any)=>{
        console.log(res.user.role);

         console.log(res);

        //  alert(`${res.user.username} login successfully`)
         this.tost.showSuccess(`${res.user.username} login successfully`)
 
         this.loginFormModel.reset()
         localStorage.setItem("currentUser",res.user.username)
         localStorage.setItem("currentUserId",res.user._id)
         localStorage.setItem("currentUserEmail",res.user.email)


         // Storing emp object in local storage
        // localStorage.setItem("currentEmp", JSON.stringify(res.emp));

        console.log(res.emp);
        // console.log("Emp object:", empObject);
// localStorage.setItem("currentEmp", JSON.stringify(res.emp));


 
 
         // store token in localstorage
         localStorage.setItem("token",res.token)
        console.log(res.user.role);
        
 
          if(res.user.role=="jobseeker"){

            this.rout.navigateByUrl("/userdash")


          }
          else if(res.user.role=="employer"){

            this.rout.navigateByUrl("/empdash")


          }
          else{
            this.rout.navigateByUrl("/admindash")

          }
 
 
         
         
 
       },
       error:(res:any)=>{
         console.log(res);
        //  alert(res.error)
         this.tost.showError(`${res.error} `)
 
 
       }
     })
    }
    else{
    //  alert('inavalid form')
     this.tost.showError("Invalid Form")
 
    }
      
    
     
   }

}
