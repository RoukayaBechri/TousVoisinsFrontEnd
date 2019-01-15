import { Injectable } from '@angular/core';
import { SimpleUser } from './entities/simpleUser';
import { Application } from './entities/application';
import { Publication } from './entities/publication';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  private actifUser: SimpleUser = new SimpleUser();
  private initialAdresse: string;
  private lat;
  private long;
  private connect: boolean=false;
  private profilUser: SimpleUser = new SimpleUser(); 
  private application: Application = new Application();
  private publication: Publication = new Publication();
  pubid: number;

  constructor() { }


  public setPubId(id) {
    this.pubid = id;

  }
  public getPubId() {
    return this.pubid;
  
}

  public getPublication() {
    return this.publication
  }
  public setPublication(pub: Publication) {
    this.publication = pub;

  }


  public getApplication() {
    return this.application
  }
  public setApplication(apli: Application) {
    this.application = apli;

  }

  public getprofilUser() {
    return this.profilUser
  }
  public setprofilUser(user: SimpleUser) {
    this.profilUser = user;

  }

  public getConnect(){
    return this.connect
  }
  public setConnect(val:boolean){
    this.connect=val;
  }

  public getActifUser() {
    return this.actifUser
  }
  public setActifUser(user: SimpleUser) {
    this.actifUser = user;

  }

  public setInitialLat(latitude: number) {
    this.lat = latitude;

  }
  public getInitialLat() {
    return this.lat;
  }

  public setInitialLong(longitude: number) {
    this.long = longitude;

  }
  public getInitialLong() {
    return this.long;
  }

  public setInitialAdresse(adresse) {
    this.initialAdresse = adresse;

  }
  public getInitialAdresse() {
    return this.initialAdresse;
  }
}
