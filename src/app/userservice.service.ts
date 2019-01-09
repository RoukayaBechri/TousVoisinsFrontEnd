import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  public url  ="http://localhost:18080/voisins-web/rest/users/getall";

  constructor(private http : Http) { }
  getallusers(){
    return this.http.get(this.url);
  }
}