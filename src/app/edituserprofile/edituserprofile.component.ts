import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edituserprofile',
  templateUrl: './edituserprofile.component.html',
  styleUrls: ['./edituserprofile.component.css']
})
export class EdituserprofileComponent implements OnInit {
  profile: any = "https://i.pinimg.com/736x/64/c0/7c/64c07cd56fee2c3b0423168c5b10e58c.jpg";
  resume: any = "";
  userObject: any = {
   
      dob: '2024-04-11T00:00:00.000Z' 
  };
  formattedDOB: string = '';
  logInfo: any = {};
  selectedProfile: any = null;
  newResume:any = '';
  
  

  userUpdate = this.fb.group({
    uname: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    intro: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    quali: ['', [Validators.required]],
    stream: ['', [Validators.required]],
    pwd: ['', [Validators.required]],
    loc: ['', [Validators.required]],
    desig: ['', [Validators.required]],
    resume: [''],
    profile: [''],
  });

  constructor(private fb: FormBuilder, private us: UserService,  private sanitizer: DomSanitizer, private tost:ToastService) {}

  ngOnInit(): void {

    this.formattedDOB = this.formatDOB(this.userObject.dob); 
    this.getLogedEmp();
  }

  getFile(event: any) {
    const file = event.target.files[0];
  
    // Check if a file is selected
    if (file) {
      const reader = new FileReader();
  
      // Define the onload callback function
      reader.onload = (event: any) => {
        // Update the selectedProfile variable with the converted URL
        this.selectedProfile = event.target.result;
        this.profile=event.target.result;
      };
  
      // Convert the selected file to a data URL
      reader.readAsDataURL(file);
    }
  }
  
  getNewResume(event: any) {
    // const file = event.target.files[0];
    // const fileUrl = URL.createObjectURL(file);
    // this.newResume = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    const file = event.target.files[0];
  const allowedTypes = ['application/pdf'];

  if (file && allowedTypes.includes(file.type)) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      // Read the file content as data URL
      const resumeDataUrl = event.target.result;

      // Store the file content in a variable or upload it directly
      this.newResume = resumeDataUrl;

      // Optionally, you can also store the file object itself if needed
      // this.resumeFile = file;
    };

    reader.readAsDataURL(file);
  } else {
    alert('Please select a PDF file.');
    event.target.value = null;
  }
  }
  updatePro() {
    if (localStorage.getItem("currentUserEmail")) {
      const email = localStorage.getItem("currentUserEmail");
      if (this.userUpdate.valid) {
        const path = this.userUpdate.value;
        // this.resume = this.newResume ? this.newResume.toString() : '';
         this.resume = this.newResume ? this.newResume.toString() : this.userObject.resume;

        const userData = {
          username: path.uname,
          phone: path.phone,
          introduction: path.intro,
          dob: path.dob,
          qualification: path.quali,
          stream: path.stream,
          password: path.pwd,
          location: path.loc,
          designation: path.desig,
          resume: this.resume,
          profile: this.selectedProfile ? this.selectedProfile : this.userObject.profile // Use userObject.profile as fallback
        };
  
        this.us.updateProfile(email, userData).subscribe({
          next: (res: any) => {
            // alert(`${res} updated successfully`);
            this.tost.showSuccess('updated successfully')

            if (this.selectedProfile) {
              this.profile = this.selectedProfile;
              this.selectedProfile = null; // Reset selectedProfile
            }
            // Update profile image on the left side immediately
            this.userObject.profile = this.profile;
            // Update name and designation on the left side
            this.userObject.username = userData.username;
            this.userObject.designation = userData.designation;
          },
          error: (res: any) => {
            alert(res.error);
          }
        });
      } else {
        // alert('Invalid form');
        this.tost.showWarning('Invalid form')

      }
    } else {
      alert('Please log in');
    }
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


  viewResume() {
    window.open(this.userObject.resume, '_blank');
  }


  formatDOB(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
