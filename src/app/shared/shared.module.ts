import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    BubbleChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports: [
    BubbleChartComponent
  ]
})

export class SharedModule { }
