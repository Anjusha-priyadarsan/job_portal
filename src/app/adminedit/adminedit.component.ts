import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.css']
})
export class AdmineditComponent implements OnInit {
  profile:any=""
  selectedProfile:any=""
  adminObject:any={}
  logInfo:any={}
  adminUpdate=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required]],
   
    profile:[''],
    pwd:['',[Validators.required]]



  })

  constructor(private fb:FormBuilder,private as:AdminService){}
  ngOnInit(): void {
    this.getLogedAdm()
  }

  getFile(event:any){
    let file=event.target.files[0]
    if(file){
    // url conversion

      const  reader= new FileReader();

      reader.onload=(event:any)=>{
        console.log(event.target.result);
  
        // preview
  
        this.selectedProfile=event.target.result
        this.profile=event.target.result      
  
        
        
      }
      
    // convert
    reader.readAsDataURL(file)



    }


    // store the coverted url
   
  }


  updatePro() {
    if (localStorage.getItem("currentUserEmail")) {
      var email = localStorage.getItem("currentUserEmail");
      // var date = new Date();

      console.log(this.adminUpdate.value);
  
      if (this.adminUpdate.valid) {
        var path = this.adminUpdate.value;
  
        var adminData = {
          username: path.name,
          email: path.email,
          profile: this.selectedProfile ? this.selectedProfile : this.adminObject.profile, // Use userObject.profile as fallback

          password:path.pwd
          
        };
  
        console.log(adminData);
  
        this.as.updateProfile(email,adminData).subscribe({
          next: (res: any) => {
            console.log(res);
            alert(`${res} updated successfully`);
            this.getLogedAdm()

            if (this.selectedProfile) {
              this.profile = this.selectedProfile;
              this.selectedProfile = null; // Reset selectedProfile
            }
            // Update profile image on the left side immediately
            this.adminObject.profile = this.profile;
            // Update name and designation on the left side
            this.adminObject.username = adminData.username;

          },
          error: (res: any) => {
            console.log(res);
            alert(res.error);
          }
        });
      } else {
        alert('Invalid form');
      }
    } else {
      alert('Please log in');
    }
  }

  getLogedAdm(){

    var email=localStorage.getItem("currentUserEmail")
    this.as.getAdmin(email).subscribe({
      next:(result:any)=>{

        this.adminObject=result.admin
        this.logInfo=result.log
        console.log(this.adminObject);
        this.logInfo=result.log
        this.profile=this.adminObject.profile

      }
    })
    
  }


}
