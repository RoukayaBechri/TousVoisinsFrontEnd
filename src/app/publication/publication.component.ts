import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publication.service';
import { ParamService } from '../param.service';
import { SimpleUser } from '../entities/simpleUser';
import { Objets } from '../entities/objet';
import { Service } from '../entities/service';
import { Offre } from '../entities/offre';
import { NavigationEnd, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  context: CanvasRenderingContext2D;

  @ViewChild('mycanvas1') mycanvas1;

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
  mode;
  nbreObjet = 0
  nbreService = 0
  offerData: any = []
  dataUri
  image
  selectPhoto;




  constructor(private userService: UserserviceService, private router: Router, private publicationService: PublicationService, private param: ParamService) { }

  ngOnInit() {
    this.actifUser = this.param.getActifUser();
    this.mode = 1;
    this.publicationService.getPublicationByIdUser(this.param.getActifUser().id).subscribe(
      data => {
        this.offerData = data.json()
        console.log(this.offerData)
        for (let i = 0; i < this.offerData.length; i++) {
          console.log("=========" + this.offerData[i].offerType)
          if (this.offerData[i].offerType == "objet") {
            this.nbreObjet++;
          }
          else if (this.offerData[i].offerType == "service") {
            this.nbreService++;
          }

        }
      }
    )

  }

  preview1(e: any): void {
    let canvas = this.mycanvas1.nativeElement;
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, 50, 50);

    var render = new FileReader();
    render.onload = function(event: any) {
      var img = new Image();
      img.onload = function() {
        context.drawImage(img, 0, 0, 50, 50);
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
    this.offre.photo = btoa(binaryString);
    console.log("+++++>" + btoa(binaryString));
   // this.userService.addUserPhot(9, this.image).subscribe(
     // data => {
      //  console.log(data)
     // }
   // )

  }












  reposter() {
    this.mode = 1;
    this.service = new Service();
    this.offre = new Offre();
  }
  poster() {
    if (this.param.getConnect() == false) {
      this.mode = 404;
    }
    else if ((this.offre.offerType === "objet") && (this.param.getConnect() == true)) {
      this.publicationService.addObjet(this.objet).subscribe(
        data => {
          console.log(data.json())
          let idObjet = data.json().id;
          this.publicationService.addOffre(this.param.getActifUser().id, idObjet, this.offre).subscribe(
            data => {
              console.log(data.json())
              this.mode = 2
            },
            error => {
              console.log("Erreur---->" + error.status)
              this.mode = error.status;


            }
          )
        }
      )
    }
    else if ((this.offre.offerType === "service") && (this.param.getConnect() == true)) {
      this.publicationService.addService(this.service).subscribe(
        data => {
          console.log(data.json())
          let idService = data.json().id;
          this.publicationService.addOffre(this.param.getActifUser().id, idService, this.offre).subscribe(
            data => {
              console.log(data.json())
              this.mode = 2
            },
            error => {
              console.log("Erreur---->" + error.status)
              this.mode = error.status;
            }
          )
        }
      )

    }




  }
  navigate(route: string) {
    this.router.navigate([route])

  }


}
