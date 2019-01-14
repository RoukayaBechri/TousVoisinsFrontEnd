import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication.service';
import { SimpleUser } from '../entities/simpleUser';
import { ParamService } from '../param.service';
import { Router } from '@angular/router';
import { Application } from '../entities/application';


@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
publicationData: any = [];
application: Application = new Application()
  constructor(private publicationService: PublicationService, private param:  ParamService, private router: Router) { }

  ngOnInit() {
    this.publicationService.getAllPublications().subscribe(data => {
      this.publicationData = data.json();
      console.log(this.publicationData);
    })
  }
  goToUser(user: SimpleUser){
    console.log(user)
    this.param.setprofilUser(user)
    this.router.navigate(['profil']);

  }

  proposer(idpublication: number){
    console.log("Id de m'utilasateur actif "+this.param.getActifUser().id)
    console.log("Id de la publication" +idpublication)
    this.publicationService.addApplication(this.param.getActifUser().id, idpublication, this.application ).subscribe(
      data =>{
        console.log(data.json())
      }
    )

  }

}
