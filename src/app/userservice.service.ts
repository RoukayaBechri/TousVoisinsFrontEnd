import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SimpleUser } from './entities/simpleUser';
import { Objets } from './entities/objet';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  public url  ="http://localhost:18080/SiteLocation-web/Site/User/getAllUser";
  public url1  ="http://localhost:18080/SiteLocation-web/Site/User/addUser";
  
  constructor(private http : Http) { }
  
  getallusers(){
    return this.http.get(this.url);
  }
  registerUser(simpleUser: SimpleUser){

    return this.http.post(this.url1, simpleUser)

  }

 
}