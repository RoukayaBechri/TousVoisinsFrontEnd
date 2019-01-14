import { Component, OnInit } from '@angular/core';
import { ParamService } from '../param.service';
import { SimpleUser } from '../entities/simpleUser';
declare let L;
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profil: SimpleUser= new SimpleUser()
map
  constructor(private param:  ParamService ) { }

  ngOnInit() {
    this.profil= this.param.getprofilUser();


    this.map = L.map('map').setView([36.8491478, 10.2639359], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
