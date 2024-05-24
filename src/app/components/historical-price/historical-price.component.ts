import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CoinApiService } from '../../services/coin-api.service';

@Component({
  selector: 'app-historical-price',
  templateUrl: './historical-price.component.html',
  styleUrls: ['./historical-price.component.scss']
})
export class HistoricalPriceComponent implements OnInit, OnChanges {

  @Input() symbolId!: string;
  Highcharts: typeof Highcharts = Highcharts;

  lineChart: any = {
    title: {
      text: 'Charting Data',
      align: 'left'
    },

    subtitle: {
      text: 'Historical Highest Prices',
      align: 'left'
    },

    yAxis: {
      title: {
        text: 'Price'
      },
    },

    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },

    series: [{
      name: 'Price High'
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  }


  constructor(private coinApiService: CoinApiService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.symbolId) {
      this.coinApiService.getHistoricalPrices(this.symbolId).subscribe(data => {
        this.updateChart(data);
      })
    }
  }

  ngOnInit(): void {
  }

  updateChart(data: any): void {
    const seriesData = data.map((item: any) => ({
      x: new Date(item.time_close).getTime(),
      y: item.price_high
    }));
    this.lineChart = {
      series: [{
        name: 'Price High',
        data: seriesData
      }],
    };
  }
}
