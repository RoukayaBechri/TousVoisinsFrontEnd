import { Component, OnInit } from '@angular/core';
import { SimpleUser } from '../entities/simpleUser';
import { ParamService } from '../param.service';

@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.css']
})
export class MoncompteComponent implements OnInit {
  monprofil : SimpleUser= new SimpleUser();

  constructor(private param: ParamService) { }

  ngOnInit() {
    this.monprofil=this.param.getActifUser();

  }

}
