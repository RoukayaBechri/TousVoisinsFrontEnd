import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { ParamService } from '../param.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {



  userData: any = [];
  email: string;
  password: string;
  connect: boolean;

  constructor(private userService: UserserviceService, private param: ParamService, private router: Router ) { }

  ngOnInit() {
  }
  connecter() {
    this.userService.getallusers().subscribe(
      data => {
      this.userData = data.json();

        for (var i = 0; i < this.userData.length; i++) {
          if ((this.email === this.userData[i].userEmail) && (this.password === this.userData[i].userPassword)) {
            this.param.setConnect(true);
            this.connect = true
            console.log("Connect from sign is: " + this.param.getConnect())
            this.param.setActifUser(this.userData[i]);
            localStorage.setItem("loggedStatus", this.userData[i].id );
            localStorage.setItem("connection", "true" );
            this.router.navigate(['acceuil']);
          }
          else 
          this.connect=false;


        }
        console.log("Autentification" + this.connect);
        console.log("actif User is : " + this.param.getActifUser().userLastName)

      })

  }





}
