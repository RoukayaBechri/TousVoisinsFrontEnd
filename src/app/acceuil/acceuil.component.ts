import { Component, OnInit } from '@angular/core';
import { MapserviceService } from '../mapservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  userAdresse;
  userData: any = [];
  mapLatCenter;
  mapLonCenter;

  constructor(private mapdisplay: MapserviceService, private router: Router) { }

  ngOnInit() {
  }

  getadresseuser(){
    this.mapdisplay.getApiAdresse(this.userAdresse).subscribe(
      data=>{this.userData= data.json();
      console.log(this.userData);
      console.log(this.userData[0].lat);
      console.log(this.userData[0].lon);
      this.mapLatCenter=this.userData[0].lat
      this.mapLonCenter=this.userData[0].lon
      })
      this.router.navigate(['voisins']);

  }

}
