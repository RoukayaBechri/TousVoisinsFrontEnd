import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleUser } from '../entities/simpleUser';
import { ParamService } from '../param.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.css']
})
export class MoncompteComponent implements OnInit {
  context: CanvasRenderingContext2D;

  @ViewChild('mycanvas1') mycanvas1;
  monprofil : SimpleUser= new SimpleUser();
  value="identite"

  constructor(private param: ParamService, private userService : UserserviceService) { }

  ngOnInit() {
    this.monprofil=this.param.getActifUser();
    this.value="identite"

  }

  display(val: string){
    this.value= val;
  }

  preview1(e: any): void {
    let canvas = this.mycanvas1.nativeElement;
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, 200, 200);

    var render = new FileReader();
    render.onload = function(event: any) {
      var img = new Image();
      img.onload = function() {
        context.drawImage(img, 0, 0, 200, 200);
      };
img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }


  preview(e: any): void {

    
    
    var files = e.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.monprofil.userPhoto = btoa(binaryString);
    console.log("+++++>" + btoa(binaryString));
   // this.userService.addUserPhot(9, this.image).subscribe(
     // data => {
      //  console.log(data)
     // }
   // )

  }


  save(){
    this.userService.updateUser(this.param.getActifUser().id, this.monprofil).subscribe(
      data=>{
        console.log(data.json())
      }
    )
  }
  

}
