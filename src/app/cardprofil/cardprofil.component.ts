import { Component, OnInit } from '@angular/core';
import { ParamService } from '../param.service';
import { PublicationService } from '../publication.service';
import { SimpleUser } from '../entities/simpleUser';
import { Feedback } from '../entities/feedback';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-cardprofil',
  templateUrl: './cardprofil.component.html',
  styleUrls: ['./cardprofil.component.css']
})
export class CardprofilComponent implements OnInit {
  
  profil: SimpleUser= new SimpleUser()
  mapData: any = [];
  offre: any=[];
  nbreOffre;
  nbreAvis;
  supply: any=[];
  feedbackData: any=[];
  feedback: Feedback= new Feedback();
  nbreSupply;
  note;
  image
  dataSet = {
  
    colors: ["#cccc00", "#cccc00", "#cccc00", "#cccc00", "#cccc00"]  ,
    showLabels: false // hide the label
  }
  myprofil
  constructor( private router: Router, private param:  ParamService,  private publicationService: PublicationService, private _sanitizer: DomSanitizer, private userService: UserserviceService) { }

  ngOnInit() {
    if (this.param.getActifUser().id == this.param.getprofilUser().id){
      this.myprofil=true;
    }
    else
    this.myprofil=false;
    this.nbreAvis=0
    this.note=0
    this.profil= this.param.getprofilUser();
    console.log("*****"+this.profil.userRank)
    this.publicationService.getfeedBackByUser(this.param.getprofilUser().id).subscribe(
      data=>{
        this.feedbackData= data.json();
        for(let i=0; i<this.feedbackData.length; i++){
          if (this.feedbackData[i].runk !=0){
            this.nbreAvis++
          }
        }
      }
    )
  }
  ngAfterViewInit() {
    this.profil= this.param.getprofilUser()
    this.userService.getUserById(this.param.getprofilUser().id).subscribe(
      data1=>{
        console.log("-->"+data1.json().userPhoto)
        this.image=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        +data1.json().userPhoto );
        console.log("Image++++>"+this.image)
       
      }
    )

    
  }

  showNote(){
    this.note=1
  }

  navigate1(route: string) {
    this.router.navigate([route]);


  }

  giveNote(){
    this.publicationService.addRunk(this.param.getActifUser().id, this.param.getprofilUser().id, this.feedback).subscribe(
      data=> {
        console.log(data.json())
        this.feedback.runk=0;
        this.ngOnInit()
        this.ngAfterViewInit()
        this.note=0
      }
    )
  }

  onError(){
    this.image="../../assets/photoprofil.jpg"
  }

}
