import { Component, OnInit } from '@angular/core';
import { Objets } from '../entities/objet';
import { Service } from '../entities/service';
import { Supply } from '../entities/supply';
import { PublicationService } from '../publication.service';
import { ParamService } from '../param.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
  modelprop;
  objet: Objets = new Objets();
  service: Service = new Service();
  supply: Supply = new Supply()

  constructor(private publicationService: PublicationService,private param: ParamService) { }

  ngOnInit() {
  }


  addSupply() {
    if (this.modelprop === "objet") {
      this.publicationService.addObjet(this.objet).subscribe(
        data => {
          console.log(data.json())
          let idObjet = data.json().id;
          this.publicationService.addSupply(this.param.getActifUser().id, idObjet, this.supply).subscribe(
            data => {
              console.log(data.json())
            }
          )
        }
      )
    }
    else if (this.modelprop === "service") {
      this.publicationService.addService(this.service).subscribe(
        data => {
          console.log(data.json())
          let idService = data.json().id;
          this.publicationService.addSupply(this.param.getActifUser().id, idService, this.supply).subscribe(
            data => {
              console.log(data.json())
            }
          )
        }
      )

    }
  }

}
