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
  public url2="http://localhost:18080/SiteLocation-web/Site/User/getUserByID/";
  public url3="http://localhost:18080/SiteLocation-web/Site/User/addUserPhoto/";
  public url4="http://localhost:18080/SiteLocation-web/Site/User/getPhotoByUser/";
  public url5="http://localhost:18080/SiteLocation-web/Site/User/updateUser/"
  
  constructor(private http : Http) { }
  
  getallusers(){
    return this.http.get(this.url);
  }
  registerUser(simpleUser: SimpleUser){

    return this.http.post(this.url1, simpleUser)

  }
  getUserById(userId: number){
    return this.http.get(this.url2+userId)
  }

  addUserPhot(userId: number, imag: string){
    return this.http.put(this.url3+userId, imag  )
  }

  getPhotoByUser(id :number){
    return this.http.get(this.url4+id)
  }
  updateUser(id: number, user: SimpleUser)
  {
    return this.http.put(this.url5+id, user)
  }

 
}