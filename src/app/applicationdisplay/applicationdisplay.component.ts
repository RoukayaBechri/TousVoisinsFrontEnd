import { Component, OnInit } from '@angular/core';
import { ParamService } from '../param.service';
import { Application } from '../entities/application';
import { Publication } from '../entities/publication';
import { UserserviceService } from '../userservice.service';
import { SimpleUser } from '../entities/simpleUser';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'app-applicationdisplay',
  templateUrl: './applicationdisplay.component.html',
  styleUrls: ['./applicationdisplay.component.css']
})
export class ApplicationdisplayComponent implements OnInit {

  constructor(private param: ParamService, private userService: UserserviceService, private publicationService: PublicationService) { }
  appli: Application = new Application()
  publication: Publication = new Publication()
  appliData: any = [];
  user: SimpleUser = new SimpleUser()
  ngOnInit() {

    
  this.publication= this.param.getPublication()
    this.publicationService.getApplicationByIdPub(this.param.getPubId()).subscribe(
      data => {
        this.appliData = data.json()
        this.param.setApplication(this.appliData)
         console.log(this.appliData)

      }
    )
  }
  ngAfterViewInit() {
    this.publicationService.readApplicationPub(this.param.getPubId()).subscribe(
      data=>{
        console.log(data)
      }
    )
    
    
  }

accepter(i: number){
  var idUser= this.appliData[i].applicationPK.idSimpleUser;
  var idPub=  this.appliData[i].applicationPK.idPublication;
  console.log(idUser)
  console.log(idPub)

  this.publicationService.acceptApplication(idUser,idPub).subscribe(
    data=>{
      console.log(data.json())
      this.ngOnInit()
    }
  );

}

}
