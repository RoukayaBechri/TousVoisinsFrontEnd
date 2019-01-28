import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication.service';
import { SimpleUser } from '../entities/simpleUser';
import { ParamService } from '../param.service';
import { Router } from '@angular/router';
import { Application } from '../entities/application';
import { MatTabChangeEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {
publicationData: any = [];
offerData: any =[];
supplyData: any= [];
application: Application = new Application()
mode=1
offreImage: any=[]
supplyImage: any=[]
error=1
currentPublication
affich=0

  constructor(private _sanitizer: DomSanitizer, private publicationService: PublicationService, private param:  ParamService, private router: Router) { }

  ngOnInit() {
    this.publicationService.getAllOffer().subscribe(
      data=>{
        this.offerData= data.json()
        console.log("+++"+this.offerData)
        for (let i=0; i<this.offerData.length; i++){
          this.offreImage[i]=(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.offerData[i].photo))
          console.log(this.offreImage[i])
        }
        this.publicationService.getAllSupply().subscribe(
          data1=>{
            this.supplyData= data1.json()
            console.log("===="+this.supplyData)
            for (let i=0; i<this.supplyData.length; i++){
              this.supplyImage[i]=(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.supplyData[i].photo))
              console.log(this.supplyImage[i])
            }
            this.mode=1;
          }
        )
      }
    )
  }
  goToUser(user: SimpleUser){
    console.log(user)
    this.param.setprofilUser(user)
    this.router.navigate(['profil']);

  }

  proposer(){
    console.log("Id de m'utilasateur actif "+this.param.getActifUser().id)
    
    console.log(this.application.proposition)
    this.publicationService.addApplication(this.param.getActifUser().id, this.currentPublication, {proposition:this.application.proposition} ).subscribe(
      data =>{
      console.log(data.json())
      this.error=2;
      },
      error=>{
          console.log(error.status)
          this.error= error.status;
    

      }
  
    )
  this.affich=0;
    }

  display( i: number){
    this.mode= i
    console.log(this.mode)
  }

searchObjet(categ: string){
 
  this.publicationService.getOffreByCategObjet(categ).subscribe(
    data=>{
      this.offerData= data.json();
      for (let i=0; i<this.offerData.length; i++){
        this.offreImage[i]=(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.offerData[i].photo))
        console.log(this.offreImage[i])
      }
      this.publicationService.getSupplyByCategObjet(categ).subscribe(
        data1=>{
          this.supplyData= data1.json();
          for (let i=0; i<this.supplyData.length; i++){
            this.supplyImage[i]=(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.supplyData[i].photo))
            console.log(this.supplyImage[i])
          }
        }
      )
    }
  )
}


searchService(categ: string){
  
  this.publicationService.getOffreByCategService(categ).subscribe(
    data=>{
      this.offerData= data.json();
      console.log(this.offerData)
      for (let i=0; i<this.offerData.length; i++){
        this.offreImage[i]=(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.offerData[i].photo))
        console.log(this.offreImage[i])
      }
      this.publicationService.getSupplyByCategService(categ).subscribe(
        data1=>{
          this.supplyData= data1.json();
          for (let i=0; i<this.supplyData.length; i++){
            this.supplyImage[i](this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.supplyData[i].photo))
            console.log(this.supplyImage[i])
          }
        }
      )
    }
  )
}

onError(i:number){
  this.supplyImage[i]="../../assets/image1.jpg"
}
onError2(i:number){
  this.offreImage[i]="../../assets/image1.jpg"
}

afficher(i,id){
  this.error=1;
  console.log(this.param.getActifUser().id)
  if (!this.param.getActifUser().id){
        this.error=404
  }
  console.log(i);
  console.log(id);
  this.currentPublication=id
  
}



}
