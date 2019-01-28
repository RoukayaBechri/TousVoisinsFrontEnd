import { Component, OnInit } from '@angular/core';
import { ParamService } from '../param.service';
import { MapserviceService } from '../mapservice.service';
import { PublicationService } from '../publication.service';
import { SimpleUser } from '../entities/simpleUser';
import { Feedback } from '../entities/feedback';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  profil: SimpleUser= new SimpleUser()
  feedbackData: any=[];
  feedback: Feedback= new Feedback();
  photo: any=[]
  image;

  constructor(private _sanitizer: DomSanitizer, 
    private router: Router, 
    private param:  ParamService, 
   private userService : UserserviceService,
     private publicationService: PublicationService ) { }

  ngOnInit() {
         
    this.publicationService.getfeedBackByUser(this.param.getprofilUser().id).subscribe(
      data=>{
        this.feedbackData= data.json();
        for (let i=0;i<this.feedbackData.length ; i++){
          this.photo.push(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.feedbackData[i].simpleUser1.userPhoto))
           console.log(this.photo[i])
        }
   
      }
    ) 
  }

  ngAfterViewInit() {
   
    
  }

 

  commenter(){
    
    this.publicationService.addFeedback(this.param.getActifUser().id, this.param.getprofilUser().id, this.feedback).subscribe(
      data=> {
        console.log(data.json())
        this.feedback.description="";
        this.ngOnInit();
   
      }
    )
  }

  onError(i: number){
    this.photo[i]="../../assets/photoprofil.jpg"
  }

}
