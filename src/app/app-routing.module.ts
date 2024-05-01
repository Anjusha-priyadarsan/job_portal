import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { EmpDashComponent } from './emp-dash/emp-dash.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { EmpjoblistComponent } from './empjoblist/empjoblist.component';
// import { EditJobComponent } from './edit-job/edit-job.component';
import { EditempProfileComponent } from './editemp-profile/editemp-profile.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EdituserprofileComponent } from './edituserprofile/edituserprofile.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { AppliedjoblistComponent } from './appliedjoblist/appliedjoblist.component';
import { SavedjoblistComponent } from './savedjoblist/savedjoblist.component';
import { JobApplctnComponent } from './job-applctn/job-applctn.component';
import { UserslistComponent } from './userslist/userslist.component';
import { EmplistComponent } from './emplist/emplist.component';
import { AdmineditComponent } from './adminedit/adminedit.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"userdash",component:UserDashComponent},
  {path:"empdash",component:EmpDashComponent},
  {path:"admindash",component:AdminDashComponent},
  {path:"empjoblist",component:EmpjoblistComponent},
  // {path:"editjob",component:EditJobComponent},
  {path:"editemp",component:EditempProfileComponent},
  {path:"edituser",component:EdituserprofileComponent},
  {path:"searchjob",component:SearchJobsComponent},
  {path:"view/:id",component:JobdetailsComponent},
  {path:"appliedjobs",component:AppliedjoblistComponent},
  {path:"savedjobs",component:SavedjoblistComponent},
  {path:"jobapp",component:JobApplctnComponent},
  {path:"userlist",component:UserslistComponent},
  {path:"emplist",component:EmplistComponent},
  {path:"adminedit",component:AdmineditComponent},
















];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
