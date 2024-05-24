import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CryptoSelectorComponent } from './components/crypto-selector/crypto-selector.component';
import { FormsModule } from '@angular/forms';
import { RealTimeComponent } from './components/real-time/real-time.component';
import { HistoricalPriceComponent } from './components/historical-price/historical-price.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CryptoSelectorComponent,
    RealTimeComponent,
    HistoricalPriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    HighchartsChartModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,


  ],
  providers: [
    {
    provide: 'env',
    useValue: environment
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
