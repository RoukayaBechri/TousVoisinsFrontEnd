import { Component, OnInit } from '@angular/core';
import { AcceuilComponent } from '../acceuil/acceuil.component';
import { MapserviceService } from '../mapservice.service';
import { UserserviceService } from '../userservice.service';
import { ParamService } from '../param.service';
import { Supply } from '../entities/supply';
import { SimpleUser } from '../entities/simpleUser';
import { Objets } from '../entities/objet';
import { Service } from '../entities/service';
import { PublicationService } from '../publication.service';
import { Application } from '../entities/application';

declare let L;

@Component({
  selector: 'app-voisins',
  templateUrl: './voisins.component.html',
  styleUrls: ['./voisins.component.css']
})
export class VoisinsComponent implements OnInit {
  modelprop;
  initialAdresse
  map;
  mapLat;
  mapLong;
  mapData: any = [];
  voisinsData: any = [];
  searchData: any = [];
  voisinsAdresse;
  userAdresse;
  voisinName;
  mapMarkers: any = [];
  markerLayers = [];
  supply: Supply = new Supply()
  actifUser: SimpleUser = new SimpleUser();
  application: Application = new Application()
  objet: Objets = new Objets();
  service: Service = new Service();
  mode = 1;
  display=0



  constructor(private acceuil: AcceuilComponent, private mapdisplay: MapserviceService, private voisinsdisplay: UserserviceService, private param: ParamService, private publicationService: PublicationService) { }

  ngOnInit() {
    
    this.initialAdresse = this.param.getInitialAdresse()
    console.log("initial adresse: " + this.param.getInitialAdresse())

    this.mapdisplay.getApiAdresse(this.initialAdresse).subscribe(
      data1 => {
        this.mapData = data1.json();
        console.log(this.mapData);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon

        console.log("LAtitude" + this.mapLat);
        console.log(this.mapLong);

      })

    this.map = L.map('map').setView([this.param.getInitialLat(), this.param.getInitialLong()], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var circle = L.circle([this.param.getInitialLat(), this.param.getInitialLong()], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.map);
    this.mapMarkers.push(circle);



    this.voisinsdisplay.getallusers().subscribe(data => {
      this.voisinsData = data.json();


      for (let i = 0; i < this.voisinsData.length; i++) {

        this.voisinsAdresse = this.voisinsData[i].userAdresse.street + " " + this.voisinsData[i].userAdresse.city;
        this.voisinName = this.voisinsData[i].userName + " " + this.voisinsData[i].userLastName;
        this.mapdisplay.getApiAdresse(this.voisinsAdresse).subscribe(
          data => {
            console.log(i);
            this.mapData = data.json();
            var marker = L.marker([this.mapData[0].lat, this.mapData[0].lon]).addTo(this.map);
            this.mapMarkers.push(marker);
            marker.bindPopup("<mat-card class='example-card' style='align-self:center'> <mat-card-header><div mat-card-avatar class='example-header-image' style='background-image: url('https://www.eliterencontre.fr/sites/www.eliterencontre.fr/files/styles/elite_rectangle_article_arrow_left_frame/public/2b_en_articleslide_sm5.jpg'); background-size: cover;' ></div><mat-card-title>" + this.voisinsData[i].userName + " " + this.voisinsData[i].userLastName + "</mat-card-title><br><mat-card-subtitle><i class='fas fa-map-marker-alt'></i>La marsa</mat-card-subtitle><br><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked'></span><span class=fa fa-star></span></mat-card-header>").openPopup();

          })

      }
    })




  }
  ngAfterViewInit() {


  }
  search() {
    for (var i = 0; i < this.mapMarkers.length; i++) {
      this.map.removeLayer(this.mapMarkers[i]);
    }


    this.mapdisplay.getApiAdresse(this.userAdresse).subscribe(
      data => {
        this.mapData = data.json();
        console.log(this.mapData);
        console.log(this.mapData[0].lat);
        console.log(this.mapData[0].lon);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon
        this.map.flyTo([this.mapLat, this.mapLong], 12);

        var circle = L.circle([this.mapLat, this.mapLong], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(this.map);
        this.mapMarkers.push(circle);

      })

    if (this.modelprop === "objet") {

      this.publicationService.getPublicationByCategorie(this.objet.catObjet).subscribe(
        data => {
          this.searchData = data.json()
          console.log(this.searchData)
          for (var i = 0; i < this.searchData.length; i++) {

            this.voisinsAdresse = this.searchData[i].simpleUser.userAdresse.street + " " + this.searchData[i].simpleUser.userAdresse.city;
            this.voisinName = this.searchData[i].simpleUser.userName + " " + this.searchData[i].simpleUser.userLastName
            this.mapdisplay.getApiAdresse(this.voisinsAdresse).subscribe(
              data => {
                this.mapData = data.json();
                var marker = L.marker([this.mapData[0].lat, this.mapData[0].lon]).addTo(this.map);
                this.mapMarkers.push(marker);
                marker.bindPopup("<mat-card class='example-card' style='align-self:center'> <mat-card-header><div mat-card-avatar class='example-header-image' style='background-image: url('https://www.eliterencontre.fr/sites/www.eliterencontre.fr/files/styles/elite_rectangle_article_arrow_left_frame/public/2b_en_articleslide_sm5.jpg'); background-size: cover;' ></div><mat-card-title>" + this.voisinName + "</mat-card-title><br><mat-card-subtitle><i class='fas fa-map-marker-alt'></i>La marsa</mat-card-subtitle><br><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked'></span><span class=fa fa-star></span></mat-card-header>").openPopup();
              })
          }

        }
      )
    }


    if (this.modelprop === "service") {

      this.publicationService.getPublicationByCategorie(this.service.catService).subscribe(
        data => {
          this.searchData = data.json()
          console.log(this.searchData)
          for (var i = 0; i < this.searchData.length; i++) {

            this.voisinsAdresse = this.searchData[i].simpleUser.userAdresse.street + " " + this.searchData[i].simpleUser.userAdresse.city;
            this.voisinName = this.searchData[i].simpleUser.userName + " " + this.searchData[i].simpleUser.userLastName
            this.mapdisplay.getApiAdresse(this.voisinsAdresse).subscribe(
              data => {
                this.mapData = data.json();
                var marker = L.marker([this.mapData[0].lat, this.mapData[0].lon]).addTo(this.map);
                this.mapMarkers.push(marker);
                marker.bindPopup("<mat-card class='example-card' style='align-self:center'> <mat-card-header><div mat-card-avatar class='example-header-image' style='background-image: url('https://www.eliterencontre.fr/sites/www.eliterencontre.fr/files/styles/elite_rectangle_article_arrow_left_frame/public/2b_en_articleslide_sm5.jpg'); background-size: cover;' ></div><mat-card-title>" + this.voisinName + "</mat-card-title><br><mat-card-subtitle><i class='fas fa-map-marker-alt'></i>La marsa</mat-card-subtitle><br><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked' style='color: #F9E005;'></span><span class='fa fa-star checked'></span><span class=fa fa-star></span></mat-card-header>").openPopup();
              })
          }

        }
      )
    }
     this.mode=2;

  }

  



  proposer(idpublication: number){
    console.log("Id de m'utilasateur actif "+this.param.getActifUser().id)
    console.log("Id de la publication" +idpublication)
    console.log(this.application.proposition)
    this.publicationService.addApplication(this.param.getActifUser().id, idpublication, {proposition:this.application.proposition} ).subscribe(
      data =>{
        console.log(data.json())
      }
    )

  this.display=0;
    }

    afficher(){
      this.display=1;
    }


}
