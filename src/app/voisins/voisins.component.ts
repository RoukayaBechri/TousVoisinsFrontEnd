import { Component, OnInit } from '@angular/core';
import { AcceuilComponent } from '../acceuil/acceuil.component';
import { MapserviceService } from '../mapservice.service';
import { UserserviceService } from '../userservice.service';

declare let L;

@Component({
  selector: 'app-voisins',
  templateUrl: './voisins.component.html',
  styleUrls: ['./voisins.component.css']
})
export class VoisinsComponent implements OnInit {
  modelprop;
  initialAdresse = "l'aouina tunis"
  map;
  mapLat;
  mapLong;
  mapData: any = [];
  voisinsData: any = [];
  voisinsAdresse;
  userAdresse;
  voisinName;
  marker: any=[];
  markerLayers = [];

  constructor(private acceuil: AcceuilComponent, private mapdisplay: MapserviceService, private voisinsdisplay: UserserviceService) { }

  ngOnInit() {
    this.mapdisplay.getApiAdresse(this.initialAdresse).subscribe(
      data => {
      this.mapData = data.json();
        console.log(this.mapData);
        console.log(this.mapData[0].lat);
        console.log(this.mapData[0].lon);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon
      })
    this.map = L.map('map').setView([36.8491478, 10.2639359], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var circle = L.circle([36.8491478, 10.2639359], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.map);
  


    this.voisinsdisplay.getallusers().subscribe(data => {
    this.voisinsData = data.json();
      console.log(this.voisinsData);
      for (var i = 0; i < this.voisinsData.length; i++) {
        console.log("Adresse user " + this.voisinsData[i].userName + " " + this.voisinsData[i].userLastName);
        this.voisinsAdresse = this.voisinsData[i].userAdress.street + " " + this.voisinsData[i].userAdress.city;
       this.voisinName= this.voisinsData[i].userName + " " + this.voisinsData[i].userLastName
        this.mapdisplay.getApiAdresse(this.voisinsAdresse).subscribe(
          data1 => {
          this.mapData = data1.json(); 
            var marker = L.marker([this.mapData[0].lat, this.mapData[0].lon]).addTo(this.map);

            marker.bindPopup("<mat-card class='example-card' style='align-self:center'> <mat-card-header><div mat-card-avatar class='example-header-image' style='background-image: url('https://www.eliterencontre.fr/sites/www.eliterencontre.fr/files/styles/elite_rectangle_article_arrow_left_frame/public/2b_en_articleslide_sm5.jpg'); background-size: cover;' ></div><mat-card-title>Mouhamed Youssfi</mat-card-title><br><mat-card-subtitle><i class='fas fa-map-marker-alt'></i>La marsa</mat-card-subtitle><br><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked'></span><span class=fa fa-star></span></mat-card-header>").openPopup();
              
              
              
              
             
            


          })

      }
    })
    

  }
  search() {
    console.log(this.userAdresse);
    this.mapdisplay.getApiAdresse(this.userAdresse).subscribe(
      data => {
      this.mapData = data.json();
        console.log(this.mapData);
        console.log(this.mapData[0].lat);
        console.log(this.mapData[0].lon);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon
      })
    this.map.flyTo([this.mapLat, this.mapLong], 12);

  }


}
