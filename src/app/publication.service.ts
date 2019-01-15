import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Objets } from './entities/objet';

import { Service } from './entities/service';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private url  ="http://localhost:18080/SiteLocation-web/Site/Publication/getListPublication";
  public url2  ="http://localhost:18080/SiteLocation-web/Site/Product/addObjet";
  public url3 ="http://localhost:18080/SiteLocation-web/Site/Publication/addOffer/"
  public url4  ="http://localhost:18080/SiteLocation-web/Site/Product/addService";
  public url5 ="http://localhost:18080/SiteLocation-web/Site/Publication/addSupply/"
  public url6 ="http://localhost:18080/SiteLocation-web/Site/Publication/saveApplication/"
  public url7 ="http://localhost:18080/SiteLocation-web/Site/Publication/getApplicationsBySimpleUser/"
  public url8= "http://localhost:18080/SiteLocation-web/Site/Publication/PubByCategory/"
  public url9="http://localhost:18080/SiteLocation-web/Site/Publication/offreByUser/"
  public url10="http://localhost:18080/SiteLocation-web/Site/Publication/getApplicationsByPub/"
  public url11="http://localhost:18080/SiteLocation-web/Site/Publication/acceptApplication/"
  constructor(private http : Http) { }

  public getAllPublications(){
    return this.http.get(this.url);
  }
  public addOffre(userId:number, productId: number, publication){
    return this.http.post(this.url3 +userId+ "/" +productId, publication );
  }

  addObjet(objet: Objets){
    return this.http.post(this.url2, objet)

  }

  addService(service: Service ){
    return this.http.post(this.url4, service)

  }


  public addSupply(userId:number, productId: number, publication){
    return this.http.post(this.url5 +userId+ "/" +productId, publication );
  }

  public addApplication(userId:number, publicationId: number, application){
    return this.http.post(this.url6 +userId+ "/" +publicationId, application );
  }

  public getApplicationByIdUser(userId:number){
    return this.http.get(this.url7+userId );
  }



  public getPublicationByCategorie(categorie : string){
   return this.http.get(this.url8+categorie);
  }


  public getPublicationByIdUser(userId:number){
    return this.http.get(this.url9+userId );
  }

  public getApplicationByIdPub(pubId:number){
    return this.http.get(this.url10+pubId );
  }

  public acceptApplication(userId: number, publicationId: number){
    return this.http.put(this.url11+userId+"/"+publicationId,{});
  }





}
