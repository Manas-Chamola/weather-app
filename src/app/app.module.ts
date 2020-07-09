import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather-component/weather-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherService } from './weather-component/weather-service';

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([]),
    NgbModule,
  ],
  providers: [HttpClient, WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
