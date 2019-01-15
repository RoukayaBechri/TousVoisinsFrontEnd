import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {
  public url  = "https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=";

  constructor(private http : Http) { }

  getApiAdresse(adresse : string  ){
    
    return this.http.get(this.url + adresse +"&format=json&limit=1");

  }

  
}
