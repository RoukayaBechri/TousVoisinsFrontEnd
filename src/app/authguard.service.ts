import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParamService } from './param.service';
import { UserserviceService } from './userservice.service';
import { SimpleUser } from './entities/simpleUser';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  userData: SimpleUser = new SimpleUser()

  constructor(private userService: UserserviceService , private param: ParamService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem("loggedStatus"));
    console.log("++++++++++++"+user);
    if (user !=null ){
      this.userService.getUserById(user).subscribe(
        data=>{
          console.log(data.json());
         
          this.userData= data.json()

         
          this.param.setActifUser(this.userData)
             console.log("User"+this.userData.userName)
          this.param.setConnect(true)
          console.log("****"+ this.param.getConnect())
        }
      )
      return true
    }
  else
  {
    this.router.navigate(['/sign'])
  }

  }
}
