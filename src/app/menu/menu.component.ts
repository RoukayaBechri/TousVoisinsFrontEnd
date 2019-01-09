import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  navigate1(){
    this.router.navigate(['register']);


  }
  navigate2(){
    this.router.navigate(['sign']);
    
  }
  

}
