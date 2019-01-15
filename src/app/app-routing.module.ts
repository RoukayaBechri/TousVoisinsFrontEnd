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

const routes: Routes = [
  {path: '', component:AcceuilComponent},
  {path:'acceuil', component:AcceuilComponent},
  {path:'profil', component:ProfilComponent},
  {path:'demandes', component:DemandesComponent},
  {path:'publication', component:PublicationComponent},
  {path:'voisins', component:VoisinsComponent},
  {path:'moncompte', component:MoncompteComponent},
  {path:'register', component:RegisterComponent},
  {path:'sign', component:SignComponent},
  {path:'application', component:ApplicationComponent},
   {path:'applicationdisplay', component:ApplicationdisplayComponent},
   {path:'mesdemandes', component:MesdemandesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
