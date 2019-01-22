import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamService } from '../param.service';

import { SimpleUser } from '../entities/simpleUser';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  connect: boolean
  user: SimpleUser = new SimpleUser()
  notification: any = [];
  nbreNotification = 0;

  constructor(private router: Router, private param: ParamService, private publicationService: PublicationService) { }

  ngOnInit() {
    this.connect = this.param.getConnect();
    console.log("Connect from menu :" + this.connect)
    this.user = this.param.getActifUser();
    this.publicationService.getApplicationByIdUser(this.user.id).subscribe(
      data => {
      this.notification = data.json();
        for (var i = 0; i < this.notification.length; i++) {
          if (this.notification[i].validApp == false) {
            console.log(this.notification[i].validApp)
             this.nbreNotification++; }
        }
      }
    )
  }
  navigate1(route: string) {
    this.router.navigate([route]);


  }
  navigate2() {
    this.router.navigate(['sign']);

  }
  goToMyProfil(){
    
    this.param.setprofilUser(this.param.getActifUser())
    this.router.navigate(['profil']);

  }

  deconnecter() {
    this.connect = false;
    this.param.setConnect(false)
    this.param.setActifUser(new SimpleUser())
  }


}
