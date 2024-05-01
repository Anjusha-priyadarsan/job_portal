import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '../services/employer.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-editemp-profile',
  templateUrl: './editemp-profile.component.html',
  styleUrls: ['./editemp-profile.component.css']
})
export class EditempProfileComponent implements OnInit {

  emp:any={}
  empObject:any={}
  logo:any="https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
  logInfo:any={}
  selectedLogo:any=null;

  empUpdate=this.fb.group({
    uname:['',[Validators.required]],
    cname:['',[Validators.required]],
    website:['',[Validators.required]],
    // email:['',[Validators.required]],
    phone:['',[Validators.required]],
    intro:['',[Validators.required]],
   
    loc:['',[Validators.required]],
    logo:[''],
    pwd:['',[Validators.required]]



  })


  constructor(private fb:FormBuilder, private es:EmployerService,private tost:ToastService){}
  ngOnInit(): void {

    

    this.getLogedEmp()
    
  }

  getFile(event:any){
    let file=event.target.files[0]
    if(file){
    // url conversion

      const  reader= new FileReader();

      reader.onload=(event:any)=>{
        console.log(event.target.result);
  
        // preview
  
        this.selectedLogo=event.target.result
        this.logo=event.target.result      
  
        
        
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

      console.log(this.empUpdate.value);
  
      if (this.empUpdate.valid) {
        var path = this.empUpdate.value;
  
        var empData = {
          username: path.uname,
          companyname: path.cname,
          website: path.website,
          phone: path.phone,
          // email: path.email,
          introduction: path.intro,
          location: path.loc, // Corrected typo
         // Only include logo if a new one has been selected
        logo: this.selectedLogo ? this.selectedLogo : this.empObject.logo, // Use existing logo if no new one selected

          password:path.pwd
          
        };
  
        console.log(empData);
  
        this.es.updateProfile(email,empData).subscribe({
          next: (res: any) => {
            console.log(res);
            // alert(`${res} updated successfully`);
            this.tost.showSuccess('updated successfully')
            this.getLogedEmp()

            if (this.selectedLogo) {
              this.logo = this.selectedLogo;
              this.selectedLogo = null; // Reset selectedProfile
            }
            // Update profile image on the left side immediately
            this.empObject.profile = this.logo;
            // Update name and designation on the left side
            this.empObject.companyname = empData.companyname;
            this.empObject.username = empData.username;

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

  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("currentUserEmail")


    localStorage.removeItem("token")
   

  }
  

}
