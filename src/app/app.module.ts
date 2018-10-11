// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

// AngularFire Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Service Imports
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { AuthGuard } from './guard/auth.guard';
import { RegisterGuard } from './guard/register.guard';

export const firebaseConfig = {
  apiKey: 'AIzaSyDqb8XSkc04cb2Q1Q81_Gv579rr-a4XOtE',
  authDomain: 'clientpanel-2fe74.firebaseapp.com',
  databaseURL: 'https://clientpanel-2fe74.firebaseio.com',
  storageBucket: 'clientpanel-2fe74.appspot.com',
  messagingSenderId: '102476274568'
};

const appRoutes: Routes =  [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'add-client', component: AddClientComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SlidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    SettingsService,
    AuthService,
    AuthGuard,
    RegisterGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
