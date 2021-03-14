import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
      LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
