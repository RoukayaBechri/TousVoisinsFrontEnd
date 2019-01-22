import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from'./material'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AcceuilComponent } from './acceuil/acceuil.component';
import { Http, HttpModule } from '@angular/http';
import { VoisinsComponent } from './voisins/voisins.component';
import { ProfilComponent } from './profil/profil.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandesComponent } from './demandes/demandes.component';
import { MenuComponent } from './menu/menu.component';
import { PublicationComponent } from './publication/publication.component';
import { MoncompteComponent } from './moncompte/moncompte.component';
import { RegisterComponent } from './register/register.component';
import { SignComponent } from './sign/sign.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationdisplayComponent } from './applicationdisplay/applicationdisplay.component';
import { MesdemandesComponent } from './mesdemandes/mesdemandes.component';
import { SupplyComponent } from './supply/supply.component';
import { StarRatingModule } from 'angular-rating-star';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    VoisinsComponent,
    ProfilComponent,
    DemandesComponent,
    MenuComponent,
    PublicationComponent,
    MoncompteComponent,
    RegisterComponent,
    SignComponent,
    ApplicationComponent,
    ApplicationdisplayComponent,
    MesdemandesComponent,
    SupplyComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StarRatingModule
  ],
  providers: [
    AcceuilComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
