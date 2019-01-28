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
  appliData: Application = new Application()
  applibypub: any = []
  applications: Array<number>
  applicationsNonLus: Array<number>
  nbreApplication;
  nbre
  count=0



  constructor(private router: Router, private param: ParamService, private publicationService: PublicationService, private voisinsdisplay: UserserviceService) { }

  ngOnInit() {
    this.count=0
    this.publicationService.getPublicationByIdUser(this.param.getActifUser().id).subscribe(
      data => {
        this.userData = data.json()
        this.applications = new Array(this.userData.length)
        this.applicationsNonLus = new Array(this.userData.length)
        for (let i = 0; i < this.userData.length; i++) {
          this.publicationService.getApplicationByIdPub(this.userData[i].id).subscribe(
            data1 => {
              this.applibypub = data1.json()
              this.applications[i] = this.applibypub.length
              console.log("Publication N" + i + ": --> Application:" + this.applications[i])
              this.count=0
              for (let j = 0; j < this.applibypub.length; j++) {
                if(!(this.applibypub[j].readApp)){
                  console.log("_______"+this.applibypub)
                    this.count++
                }
                
              }
              this.applicationsNonLus[i]= this.count 
              console.log("Publication N" + i + ": --> Application Non lus:" + this.applicationsNonLus[i])

            }
          )

        }
       console.log(this.applications)
        console.log("publication" + this.userData[0])

      }
    )

  }

  showApplication(idpub: number, i) {
    console.log("bonjour")

    this.param.setPubId(idpub)
    this.param.setPublication(this.userData[i])


    this.router.navigate(['applicationdisplay'])
  }


  notify(idpub: number) {
    this.publicationService.readApplicationPub(idpub).subscribe(
      data => {
        console.log(data)
        console.log("Application is read")
      }
    )
  }

  calculNumberApp(idpub: number) {
    this.publicationService.getApplicationByIdPub(idpub).subscribe(
      data => {
        this.applibypub = data.json();

        this.nbreApplication = this.applibypub.length
        return this.nbreApplication

      }
    )


  }
  getNumberApp(idpub: number) {
    this.nbre = this.calculNumberApp(idpub);
    return this.nbre
  }


}
