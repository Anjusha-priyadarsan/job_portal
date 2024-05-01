import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BaseUrl="http://localhost:8000"

  accessTokenHeader(){
    var headers=new HttpHeaders()
    if(localStorage.getItem("token")){
      const token=localStorage.getItem("token")
      var headers=headers.append('access_token',`Bearer ${token}`)
    }
    return {headers}
   }


  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get(`${this.BaseUrl}/admin/all-users`,this.accessTokenHeader())
   }
   getEmps(){
    return this.http.get(`${this.BaseUrl}/admin/all-emps`,this.accessTokenHeader())
   }
   getJobs(){
    return this.http.get(`${this.BaseUrl}/admin/all-jobs`,this.accessTokenHeader())
   }
   removeEmp(empId:any){
    return this.http.delete(`${this.BaseUrl}/admin/delete-emp/${empId}`,this.accessTokenHeader())
   }
   getAdmin(email:any){
    return this.http.get(`${this.BaseUrl}/admin/${email}`)
   }
   updateProfile(emailId:any,bodyData:any){
    return this.http.put(`${this.BaseUrl}/admin/update-profile/${emailId}`,bodyData,this.accessTokenHeader())
  }
 

}
