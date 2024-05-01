import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:any=false

  constructor(){}
  ngOnInit(): void {

    if(localStorage.getItem("currentUserEmail")){
      this.login=true
     
    }
    else{
      this.login=false
    }

    
  }

  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("currentUserEmail")


    localStorage.removeItem("token")
    this.login=false

  }
    


}
