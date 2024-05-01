import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashComponent } from './user-dash/user-dash.component';
import { EmpDashComponent } from './emp-dash/emp-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EmpjoblistComponent } from './empjoblist/empjoblist.component';
// import { EditJobComponent } from './edit-job/edit-job.component';
import { EditempProfileComponent } from './editemp-profile/editemp-profile.component';
import { EmpSettingsComponent } from './emp-settings/emp-settings.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './employerPipe/search.pipe';
import { EdituserprofileComponent } from './edituserprofile/edituserprofile.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { AppliedjoblistComponent } from './appliedjoblist/appliedjoblist.component';
import { SavedjoblistComponent } from './savedjoblist/savedjoblist.component';
import { AppliedjobsearchPipe } from './employerPipe/appliedjobsearch.pipe';
import { SavedjobsearchPipe } from './employerPipe/savedjobsearch.pipe';
import { JobApplctnComponent } from './job-applctn/job-applctn.component';
import { JobappsearchPipe } from './employerPipe/jobappsearch.pipe';
import { SortPipe } from './employerPipe/sort.pipe';
import { UserslistComponent } from './userslist/userslist.component';
import { EmplistComponent } from './emplist/emplist.component';
import { AdmineditComponent } from './adminedit/adminedit.component';
import { UsersearchPipe } from './employerPipe/usersearch.pipe';
import { EmpsearchPipe } from './employerPipe/empsearch.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserDashComponent,
    EmpDashComponent,
    AdminDashComponent,
    EdituserComponent,
    EmpjoblistComponent,
    EditempProfileComponent,
    EmpSettingsComponent,
    SearchPipe,
    EdituserprofileComponent,
    SearchJobsComponent,
    JobdetailsComponent,
    AppliedjoblistComponent,
    SavedjoblistComponent,
    AppliedjobsearchPipe,
    SavedjobsearchPipe,
    JobApplctnComponent,
    JobappsearchPipe,
    SortPipe,
    UserslistComponent,
    EmplistComponent,
    AdmineditComponent,
    UsersearchPipe,
    EmpsearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
