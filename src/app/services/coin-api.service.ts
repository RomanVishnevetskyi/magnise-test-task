import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';

@Injectable({
  providedIn: 'root'
})
export class CoinApiService {
  private readonly API_KEY = this.environment.coinApiKey;
  private readonly REST_API_URL = 'https://rest.coinapi.io/v1/';
  private readonly WS_API_URL = 'wss://ws.coinapi.io/v1/';
  private socket$: WebSocketSubject<any>;


  constructor(@Inject('env') private environment: any,
              private http: HttpClient) {
    this.socket$ = new WebSocketSubject(this.WS_API_URL);
  }

  getAllSymbols(): Observable<any> {
    const url = `${this.REST_API_URL}symbols?filter_symbol_id=BITSTAMP_`;
    return this.http.get(url, {
      headers: {
        'Accept': 'application/json',
        'X-CoinAPI-Key': this.API_KEY
      }
    });
  }

  getHistoricalPrices(symbol: string, period: string='1MTH'): Observable<any> {
    const url = `${this.REST_API_URL}ohlcv/${symbol}/history?period_id=${period}`;
    return this.http.get(url, {
      headers: {
        'Accept': 'application/json',
        'X-CoinAPI-Key': this.API_KEY
      }
    });
  }

  sendMessage(symbolId: string): void {
    this.socket$.next({
      type: 'hello',
      apikey: this.API_KEY,
      subscribe_data_type: ['ohlcv'],
      subscribe_filter_symbol_id: [symbolId]
    });
  }

  getMessages() {
    return this.socket$.asObservable();
  }

}
