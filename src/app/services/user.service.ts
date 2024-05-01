import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BaseUrl="http://localhost:8000"


  constructor(private http:HttpClient) { }

  accessTokenHeader(){
    var headers=new HttpHeaders()
    if(localStorage.getItem("token")){
      const token=localStorage.getItem("token")
      var headers=headers.append('access_token',`Bearer ${token}`)
    }
    return {headers}
   }


  signUp(bodyData:any){
    return this.http.post(`${this.BaseUrl}/addd-new-jobseeker`,bodyData)

   }
   signIn(bodyData:any){
    return this.http.post(`${this.BaseUrl}/login`,bodyData)

   }

   updateProfile(emailId:any,bodyData:any){
    return this.http.put(`${this.BaseUrl}/user/update-profile/${emailId}`,bodyData,this.accessTokenHeader())
  }
 
  getSingleUser(email:any){
    return this.http.get(`${this.BaseUrl}/single-user/${email}`)
   }

   searchJobs(criteria: any) {
    return this.http.post(`${this.BaseUrl}/jobs/search`, criteria);
  }

  getjobDetails(id:any){
    return this.http.get(`${this.BaseUrl}/jobs/${id}`)
   }

   addToSaved(bodyData:any){
    return this.http.post(`${this.BaseUrl}/user/add-to-savedjobs`,bodyData,this.accessTokenHeader())

   }
   applyjob(bodyData:any){
    return this.http.post(`${this.BaseUrl}/user/add-to-applyjobs`,bodyData,this.accessTokenHeader())

   }
   getAppliedJob(emailId:any){
    return this.http.get(`${this.BaseUrl}/user/get-appliedjob/${emailId}`,this.accessTokenHeader())
   }

   getSavedJobs(user_email: any) {
    return this.http.get(`${this.BaseUrl}/user/get-savedjobs/${user_email}`, this.accessTokenHeader());
  }
  
   

}
