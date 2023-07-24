import { HomepageModule } from './homepage/homepage.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { InfoPageComponent } from './info/info.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserIdService } from './shared/user-id.service'; // Import the UserIdService

@NgModule({
  declarations: [AppComponent, LoginComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HomepageModule, // Add this line
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserIdService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
