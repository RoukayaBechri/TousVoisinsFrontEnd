import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication.service';
import { ParamService } from '../param.service';
import { SimpleUser } from '../entities/simpleUser';
import { Objets } from '../entities/objet';
import { Service } from '../entities/service';
import { Offre } from '../entities/offre';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  modelprop;
  actifUser: SimpleUser = new SimpleUser();
  objet: Objets = new Objets();
  service: Service = new Service();
  offre: Offre = new Offre();
  offerAdress;
  rayon;
  typeProduct;
  nomPublication;
  catObjet;
  productName;
  modeExpl;
  dureeExpl;
  productPrice;
  catService;
  typeFacturation;
  dateExpiration;
  mode ;



  constructor(private publicationService: PublicationService, private param: ParamService) { }

  ngOnInit() {
    this.actifUser = this.param.getActifUser();
    this.mode = 1;

  }
  resposter() {
    this.mode = 1
  }
  poster() {
    if (this.typeProduct === "objet") {
      this.publicationService.addObjet(this.objet).subscribe(
        data => {
          console.log(data.json())
          let idObjet = data.json().id;
          this.publicationService.addOffre(this.param.getActifUser().id, idObjet, this.offre).subscribe(
            data => {
              console.log(data.json())
              
            }
          )
        }
      )
    }
    else if (this.typeProduct === "service") {
      this.publicationService.addService(this.service).subscribe(
        data => {
          console.log(data.json())
          let idService = data.json().id;
          this.publicationService.addOffre(this.param.getActifUser().id, idService, this.offre).subscribe(
            data => {
              console.log(data.json())
             
            }
          )
        }
      )

    }

    this.mode=2
    console.log("mode"+this.mode)
  }


}
