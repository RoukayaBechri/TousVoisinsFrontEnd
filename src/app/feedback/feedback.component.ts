import { Component, OnInit } from '@angular/core';
import { ParamService } from '../param.service';
import { MapserviceService } from '../mapservice.service';
import { PublicationService } from '../publication.service';
import { SimpleUser } from '../entities/simpleUser';
import { Feedback } from '../entities/feedback';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  profil: SimpleUser= new SimpleUser()
  feedbackData: any=[];
  feedback: Feedback= new Feedback();

  constructor( private router: Router, private param:  ParamService, private mapdisplay: MapserviceService, private publicationService: PublicationService ) { }

  ngOnInit() {
         
    this.publicationService.getfeedBackByUser(this.param.getprofilUser().id).subscribe(
      data=>{
        this.feedbackData= data.json();
   
      }
    ) 
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

}
