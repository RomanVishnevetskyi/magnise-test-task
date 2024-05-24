import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoinApiService } from '../../services/coin-api.service';

@Component({
  selector: 'app-crypto-selector',
  templateUrl: './crypto-selector.component.html',
  styleUrls: ['./crypto-selector.component.scss']
})
export class CryptoSelectorComponent implements OnInit {
  selectedCrypto!: string;
  public cryptos!: any;
  @Output() symbol = new EventEmitter<any>();

  constructor(private coinApiService: CoinApiService) {
  }

  ngOnInit() {
    this.coinApiService.getAllSymbols().subscribe(data => {
      this.cryptos = data;
    })
  }

  onCryptoChange(): void {
    this.symbol.emit(this.selectedCrypto)
  }
}
