import { Component, OnInit } from '@angular/core';
import { MapserviceService } from '../mapservice.service';
import { Router } from '@angular/router';
import { ParamService } from '../param.service';

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

  constructor(private mapdisplay: MapserviceService, private router: Router, private paramService: ParamService ) { }

  ngOnInit() {
  }

  getadresseuser(){
    this.paramService.setInitialAdresse(this.userAdresse)
    
    this.mapdisplay.getApiAdresse(this.paramService.getInitialAdresse()).subscribe(
      data=>{this.userData= data.json();
     
      this.mapLatCenter=this.userData[0].lat
      this.mapLonCenter=this.userData[0].lon
      this.paramService.setInitialLat(this.mapLatCenter);
      this.paramService.setInitialLong(this.mapLonCenter);
      console.log("LAtitude"+this.paramService.getInitialLat());
      console.log("LAtitude"+this.paramService.getInitialLong());
      this.router.navigate(['voisins'],);
      })
      
      
     

  }

}
