import { Component, OnInit } from '@angular/core';
import { CoinApiService } from '../../services/coin-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit {
  public price!: number;
  public symbol!: number;
  public time!: string;
  destroy$ = new Subject<void>();

  constructor(private coinApiService: CoinApiService) {
  }

  ngOnInit(): void {
    this.coinApiService.getMessages().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.price = data.price_high;
        this.symbol = data.symbol_id;
        this.time = data.time_open;
      },
      error => console.log(error)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
