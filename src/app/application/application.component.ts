import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication.service';
import { ParamService } from '../param.service';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { Application } from '../entities/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  userData: any[]
  appliData: Application= new Application()

  constructor(private router: Router, private param: ParamService, private publicationService: PublicationService, private voisinsdisplay: UserserviceService) { }

  ngOnInit() {
    this.publicationService.getPublicationByIdUser(this.param.getActifUser().id).subscribe(
      data => {
      this.userData = data.json()
       console.log("publication"+this.userData[0])

      }
    )

  }

  showApplication(idpub: number,i) {
    console.log ("bonjour")
    
     this.param.setPubId(idpub)
     this.param.setPublication(this.userData[i])

     /*
    this.appliData = new Application()
    console.log(idpub)
    this.publicationService.getApplicationByIdPub(idpub).subscribe(
      data => {
      this.appliData = data.json()
      this.param.setApplication(this.appliData)
     
       this.router.navigate(['application/applicationdisplay'])

      }
    )
*/
this.router.navigate(['applicationdisplay'])
  }

}
