import { Component, OnInit } from '@angular/core';
import { ParamService } from '../param.service';
import { SimpleUser } from '../entities/simpleUser';
import { MapserviceService } from '../mapservice.service';
import { PublicationService } from '../publication.service';
import { Feedback } from '../entities/feedback';
import { Router } from '@angular/router';
declare let L;
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profil: SimpleUser= new SimpleUser()
  mapData: any = [];
  offre: any=[];
  nbreOffre;
  supply: any=[];
  feedbackData: any=[];
  feedback: Feedback= new Feedback();
  nbreSupply;
  mapLat;
  mapLong;
  map
  dataSet = {
  
  colors: ["#cccc00", "#cccc00", "#cccc00", "#cccc00", "#cccc00"]  ,
  showLabels: false // hide the label
}
myprofil;
  constructor(private router: Router, private param:  ParamService, private mapdisplay: MapserviceService, private publicationService: PublicationService ) { }

  ngOnInit() {
    if (this.param.getActifUser().id == this.param.getprofilUser().id){
      this.myprofil=true;
    }
    else
    this.myprofil=false;
    this.profil= this.param.getprofilUser();
    let adresse= this.param.getprofilUser().userAdresse.street+" "+this.param.getprofilUser().userAdresse.city

    this.mapdisplay.getApiAdresse(adresse).subscribe(
      data1 => {
        this.mapData = data1.json();
        console.log(this.mapData);
        this.mapLat = this.mapData[0].lat
        this.mapLong = this.mapData[0].lon

        console.log("LAtitude" + this.mapLat);
        console.log("Longitude"+this.mapLong);

        this.map = L.map('map').setView([this.mapLat, this.mapLong], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var circle = L.circle([this.mapLat, this.mapLong], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.map);
    this.publicationService.getOffreById(this.param.getprofilUser().id).subscribe(
      data=>{
        this.offre= data.json()
        console.log("Offe"+this.offre)
        this.nbreOffre= this.offre.length;
        console.log("nombre"+this.nbreOffre);
        this.publicationService.getSupplyById(this.param.getprofilUser().id).subscribe(
          data=>{
            this.supply= data.json()
            console.log("Supply"+this.supply)
            this.nbreSupply= this.supply.length;
            console.log("nombre"+this.nbreSupply);
            this.publicationService.getfeedBackByUser(this.param.getprofilUser().id).subscribe(
              data=>{
                this.feedbackData= data.json();
              }
            )
          }
        )
      }
    )
    
  })
     

   

    
    
    

    console.log("nombre"+this.nbreOffre);
    console.log("nombre"+this.nbreSupply);
  
    
  }

  commenter(){
    console.log(this.feedback.description)
    
    this.publicationService.addFeedback(this.param.getActifUser().id, this.param.getprofilUser().id, this.feedback).subscribe(
      data=> {
        console.log(data.json())
        this.feedback.description="";
       this.ngOnInit();
        
      }
    )
  }


  navigate1(route: string) {
    this.router.navigate([route]);


  }

}
