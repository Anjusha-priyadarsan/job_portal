import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  BaseUrl="http://localhost:8000"


  constructor(private http:HttpClient) { }

  signUp(bodyData:any){
    return this.http.post(`${this.BaseUrl}/addd-new-employer`,bodyData)

   }

   accessTokenHeader(){
    var headers=new HttpHeaders()
    if(localStorage.getItem("token")){
      const token=localStorage.getItem("token")
      var headers=headers.append('access_token',`Bearer ${token}`)
    }
    return {headers}
   }

   addJob(bodyData:any){
    return this.http.post(`${this.BaseUrl}/emp/add-job`,bodyData,this.accessTokenHeader())

   }

   getPostedJob(email:any){
    return this.http.get(`${this.BaseUrl}/emp/get-jobpost/${email}`,this.accessTokenHeader())
   }

   removeJob(itemId:any){
    return this.http.delete(`${this.BaseUrl}/emp/delete-job/${itemId}`,this.accessTokenHeader())
   }

   getSingleJob(id:any){
    return this.http.get(`${this.BaseUrl}/single-job/${id}`)
   }

   updateJob(id:any,bodyData:any){
    return this.http.put(`${this.BaseUrl}/emp/update-job/${id}`,bodyData,this.accessTokenHeader())
  }
  updateProfile(emailId:any,bodyData:any){
    return this.http.put(`${this.BaseUrl}/emp/update-profile/${emailId}`,bodyData,this.accessTokenHeader())
  }
 
  getSingleEmp(email:any){
    return this.http.get(`${this.BaseUrl}/single-emp/${email}`)
   }
   getJobApplications(email:any){
    return this.http.get(`${this.BaseUrl}/emp/get-applied-jobs/${email}`,this.accessTokenHeader())
   }
   
   updateStatus(id: string, status: string) {
    const bodyData = { status }; // Pass status as an object
    return this.http.put(`${this.BaseUrl}/updateStatus/${id}`, bodyData, this.accessTokenHeader());
  }
  
}
