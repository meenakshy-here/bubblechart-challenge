import { Component } from '@angular/core';
import { ChartDataService } from './services/chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  chartData: any;
 
  constructor(public chartDataService: ChartDataService) {}

  ngOnInit() {
    this.chartData = this.chartDataService.getChartData().subscribe((data: any) => {
      this.chartData = data;
    })
  }

}
