import { Component, OnInit } from '@angular/core';
import { CoinApiService } from './services/coin-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crypto';
  public price!: number;
  public symbol!: number;
  public time!: string;
  public symbolId!: string;

  constructor(private coinApiService: CoinApiService) {

  }

  ngOnInit(): void {
  }

  onGetSymbol(symbolId: string) {
    this.coinApiService.sendMessage(symbolId);
    this.symbolId = symbolId;
  }
}
