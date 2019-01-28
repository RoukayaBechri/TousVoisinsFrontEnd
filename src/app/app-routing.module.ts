import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { VoisinsComponent } from './voisins/voisins.component';
import { ProfilComponent } from './profil/profil.component';
import { DemandesComponent } from './demandes/demandes.component';
import { PublicationComponent } from './publication/publication.component';
import { MoncompteComponent } from './moncompte/moncompte.component';
import { RegisterComponent } from './register/register.component';
import { SignComponent } from './sign/sign.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationdisplayComponent } from './applicationdisplay/applicationdisplay.component';
import { MesdemandesComponent } from './mesdemandes/mesdemandes.component';
import { SupplyComponent } from './supply/supply.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  {path: '', component:AcceuilComponent},
  {path:'acceuil', component:AcceuilComponent},
  {path:'profil', canActivate: [AuthguardService], component:ProfilComponent, children:[{path:'feedback', component: FeedbackComponent}]},
  {path:'demandes', canActivate: [AuthguardService], component:DemandesComponent},
  {path:'publication',canActivate: [AuthguardService], component:PublicationComponent},
  {path:'voisins', canActivate: [AuthguardService], component:VoisinsComponent},
  {path:'moncompte',canActivate: [AuthguardService], component:MoncompteComponent},
  {path:'register', component:RegisterComponent},
  {path:'sign', component:SignComponent},
  {path:'application',canActivate: [AuthguardService], component:ApplicationComponent},
   {path:'applicationdisplay', component:ApplicationdisplayComponent},
   {path:'mesdemandes', component:MesdemandesComponent, children:[
     { path:'supply', component:SupplyComponent}
   ]
  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
