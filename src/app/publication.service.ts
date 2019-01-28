import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Objets } from './entities/objet';

import { Service } from './entities/service';
import { Feedback } from './entities/feedback';
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
  public url12="http://localhost:18080/SiteLocation-web/Site/Publication/getListOfferById/"
  public url13="http://localhost:18080/SiteLocation-web/Site/Publication/getListSupplyById/"
  public url14="http://localhost:18080/SiteLocation-web/Site/feedback/getFeedbacksBySimpleUser/"
  public url15="http://localhost:18080/SiteLocation-web/Site/feedback/saveFeedback/"
  public url16="http://localhost:18080/SiteLocation-web/Site/Publication/getListOffer"
  public url17="http://localhost:18080/SiteLocation-web/Site/Publication/getAllSupply"
  public url18="http://localhost:18080/SiteLocation-web/Site/Publication/offreByCategoryObjet/"
  public url19="http://localhost:18080/SiteLocation-web/Site/Publication/supplyByCategoryObjet/"
  public url20="http://localhost:18080/SiteLocation-web/Site/Publication/offreByCategoryService/"
  public url21="http://localhost:18080/SiteLocation-web/Site/Publication/supplyByCategoryService/"
  public url22="http://localhost:18080/SiteLocation-web/Site/Publication/getApplicationsByUser/"
  public url23= "http://localhost:18080/SiteLocation-web/Site/Publication/updateNotificationAppBySimpleUser/"
  public url24="http://localhost:18080/SiteLocation-web/Site/Publication/updateNotificationAppByPub/"
  public url25="http://localhost:18080/SiteLocation-web/Site/feedback/saveRunk/"
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
  public getOffreById(id: number){
    return this.http.get(this.url12+id );
  }

  public getSupplyById(id: number){
    return this.http.get(this.url13+id);
  }

  public getfeedBackByUser(id: number){
    return this.http.get(this.url14+id);
  }

  public addFeedback(iduser1: number, iduser2: number, feedback: Feedback){
   return this.http.post (this.url15+iduser1+"/"+iduser2, feedback)
  }


  public getAllOffer(){
    return this.http.get(this.url16);
  }

  public getAllSupply(){
    return this.http.get(this.url17);
  }

  public getOffreByCategObjet(categ: string){
    return this.http.get(this.url18+categ)

  }

  public getSupplyByCategObjet(categ: string){
    return this.http.get(this.url19+categ)
  }

  public getOffreByCategService(categ: string){
    return this.http.get(this.url20+categ)

  }

  public getSupplyByCategService(categ: string){
    return this.http.get(this.url21+categ)
  }

  public getApplicationByUser(id: number){
    return this.http.get(this.url22+id)
  }

  public readApplicationPub(idPub: number){
      return this.http.put(this.url24+idPub,{})
  }

  public addRunk(iduser1: number, iduser2: number, feedback: Feedback){
    return this.http.post (this.url25+iduser1+"/"+iduser2, feedback)
   }




}
