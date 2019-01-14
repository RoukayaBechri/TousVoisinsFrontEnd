import { Component, OnInit } from '@angular/core';
import { SimpleUser } from '../entities/simpleUser';
import { Adresse } from '../entities/adresse';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  simpleUser : SimpleUser= new SimpleUser();
  userdata: any=[];
  mode: number =1;
  

  constructor(private userService: UserserviceService, private router: Router) { 
    this.simpleUser.userAdresse= new Adresse();
  }

  ngOnInit() {
  }
  register(){
    this.userService.registerUser(this.simpleUser).subscribe( data=>{
      this.userdata=data.json();
      console.log(this.userdata);
    })
    this.mode=2;
    
  }

  connecter(){
    this.router.navigate(['sign']);

  }

}
