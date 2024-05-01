import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  maxDate: string=""
  registerForm:any=""
  profile:any="https://i.pinimg.com/736x/64/c0/7c/64c07cd56fee2c3b0423168c5b10e58c.jpg"
  resume:any=""
  logo:any="https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"

  userSignUp=this.fb.group({
    uname:['',[Validators.required]],
    email:['',[Validators.required]],
    phone:['',[Validators.required]],
    intro:['',[Validators.required]],
    dob:['',[Validators.required]],
    quali:['',[Validators.required]],
    stream:['',[Validators.required]],
    pwd:['',[Validators.required]],
    // cpwd:['',[Validators.required]],
    loc:['',[Validators.required]],
    desig:['',[Validators.required]],
    resume:['',[Validators.required]],
    profile:[''],



  })

  empSignUp=this.fb.group({
    uname:['',[Validators.required]],
    cname:['',[Validators.required]],
    website:['',[Validators.required]],
    email:['',[Validators.required]],
    phone:['',[Validators.required]],
    intro:['',[Validators.required]],
    pwd:['',[Validators.required]],
    // cpwd:['',[Validators.required]],
    loc:['',[Validators.required]],
    logo:['',[Validators.required]],



  })
  
  constructor(private fb:FormBuilder,private us:UserService,private rout:Router,private es:EmployerService, private tost:ToastService){}
  ngOnInit(): void {

    this.maxDate = new Date().toISOString().split('T')[0];

    this.signup
   
  }
getUserForm(){
  this.registerForm=false
}
getEmpForm(){
  this.registerForm=true
}

getFile(event:any){
  let file=event.target.files[0]

  // url conversion
  let fr= new FileReader()

  // convert
  fr.readAsDataURL(file)

  // store the coverted url
  fr.onload=(event:any)=>{
    // console.log(event.target.result);

    // preview

    this.profile=event.target.result
    this.logo=event.target.result

    console.log(this.profile);
    
    
  }
}


getResume(event: any) {
  const file = event.target.files[0];
  const allowedTypes = ['application/pdf'];

  if (file && allowedTypes.includes(file.type)) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      // Read the file content as data URL
      const resumeDataUrl = event.target.result;

      // Store the file content in a variable or upload it directly
      this.resume = resumeDataUrl;

      // Optionally, you can also store the file object itself if needed
      // this.resumeFile = file;
    };

    reader.readAsDataURL(file);
  } else {
    this.tost.showError('Please select a PDF file. ')

    // alert('Please select a PDF file.');
    event.target.value = null;
  }
}


signup(){

  if(this.userSignUp.valid){

    var path=this.userSignUp.value

    var userData={
          username:path.uname,
          email:path.email,
          phone:path.phone,
          introduction:path.intro,
          dob:path.dob,
          qualification:path.quali,
          stream:path.stream,
          password:path.pwd,
          location:path.loc,
          designation:path.desig,
          resume:this.resume,
          profile:this.profile
    }
    console.log(userData);
    // const formData = this.userSignUp.value;
    // console.log(formData); // Log the form data to the console
    
    this.us.signUp(userData).subscribe({
      next:(res:any)=>{
        console.log(res);
        // alert(`${res.username} registered successfully`)
        this.tost.showSuccess(`${res.username}registered successfully `)

        this.userSignUp.reset()
        this.rout.navigateByUrl('/login')
        
        

      },
      error:(res:any)=>{
        console.log(res);
        // alert(res.error)
        this.tost.showError(`${res.error} `)


      }
    })

  }
  else{
    // alert('invalid form')
    this.tost.showError("Invalid Form")


  }

  
  

}

empsignup(){

  if(this.empSignUp.valid){

    var path=this.empSignUp.value

    var userData={
          username:path.uname,
          companyname:path.cname,
          website:path.website,
          email:path.email,
          phone:path.phone,
          introduction:path.intro,
          password:path.pwd,
          location:path.loc,
          logo:this.logo
    }
    console.log(userData);
    // const formData = this.userSignUp.value;
    // console.log(formData); // Log the form data to the console
    
    this.es.signUp(userData).subscribe({
      next:(res:any)=>{
        console.log(res);
        // alert(`${res.username} registered successfully`)
        this.tost.showSuccess('registered successfully ')

        this.userSignUp.reset()
        this.rout.navigateByUrl('/login')
        
        

      },
      error:(res:any)=>{
        console.log(res);
        // alert(res.error)
        this.tost.showError(`${res.error} `)


      }
    })

  }
  else{
    // alert('invalid form')
    this.tost.showError("Invalid Form")


  }


}
}
