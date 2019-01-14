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
  voisinsAdresse;
  userAdresse;
  voisinName;
  marker: any=[];
  markerLayers = [];
  supply: Supply=new Supply()
  actifUser: SimpleUser= new SimpleUser();
  objet: Objets=new Objets();
  service: Service= new Service();

  constructor(private acceuil: AcceuilComponent, private mapdisplay: MapserviceService, private voisinsdisplay: UserserviceService, private param:  ParamService, private publicationService: PublicationService) { }

  ngOnInit() {
    console.log("adresse------- : "+this.param.getInitialAdresse());
    console.log("adresse--------: "+this.param.getInitialLat());
    console.log("adresse--------: "+this.param.getInitialLong());
    this.initialAdresse= this.param.getInitialAdresse()
    console.log("initial adresse: "+this.param.getInitialAdresse() )

    this.mapdisplay.getApiAdresse(this.initialAdresse).subscribe(
      data1 => {
      this.mapData = data1.json();
        console.log(this.mapData);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon
       
        console.log("LAtitude"+this.mapLat);
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
  


    this.voisinsdisplay.getallusers().subscribe(data => {
    this.voisinsData = data.json();
      
      for (var i = 0; i < this.voisinsData.length; i++) {
       
        this.voisinsAdresse = this.voisinsData[i].adresse.street + " " + this.voisinsData[i].adresse.city;
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
  ngAfterViewInit(){
   

  }
  search() {
    //console.log(this.userAdresse);
   // console.log(this.objet)
   // console.log(this.supply)
   /* this.mapdisplay.getApiAdresse(this.userAdresse).subscribe(
      data => {
      this.mapData = data.json();
        console.log(this.mapData);
        console.log(this.mapData[0].lat);
        console.log(this.mapData[0].lon);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon
      })
    this.map.flyTo([this.mapLat, this.mapLong], 12);*/


//poster la demande
console.log("bbbbbbbbbbbbbbb")
console.log(this.modelprop)

if (this.modelprop ==="objet"){
  this.publicationService.addObjet(this.objet).subscribe(
    data=>{
      console.log(data.json())
      let idObjet= data.json().id;
      this.publicationService.addSupply(this.param.getActifUser().id,idObjet,this.supply).subscribe(
        data=>{
          console.log(data.json())
        }
      )
    }
  )
 }
 else if (this.modelprop==="service"){
   this.publicationService.addService(this.service).subscribe(
     data=>{
       console.log(data.json())
       let idService= data.json().id;
       this.publicationService.addSupply(this.param.getActifUser().id,idService,this.supply).subscribe(
         data=>{
           console.log(data.json())
         }
       )
     }
   )

 }



  }


}
