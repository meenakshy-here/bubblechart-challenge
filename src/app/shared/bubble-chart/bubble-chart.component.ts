import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { getRandomRGB } from '../../utils';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnChanges {

  constructor() { }

  @Input() chartData: any;

  bubbleChartOptions: ChartOptions = {};
  bubbleChartType: ChartType = 'bubble';
  bubbleChartLegend: boolean = true;
  bubbleChartFormatData:ChartDataset[] = [];

  ngOnChanges(): void {
       this.bubbleChartOptions = {
        responsive: true,
        scales: {
          x: {
            suggestedMin: 100,
            suggestedMax: 200,
            title: {
              display: true,
              text: 'Salary'
            }
          },
          y: {
              title: {
                display: true,
                text: 'Head Count'
              },
              suggestedMin: 100,
              suggestedMax: 200,
          }
        },
      };
      this.bubbleChartType = 'bubble';
      this.bubbleChartLegend = true;
    
      this.chartData.forEach((cData:any) => {
        const { salary, compratio, headcount } = cData
        const rgb = getRandomRGB();
        const obj = {
          data: [
            { x: salary, y: headcount, r: compratio},
          ],
          title: "dataTitle3",
          label: cData.title,
          backgroundColor: ["rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.7)"]
        }
        this.bubbleChartFormatData.push(obj)
      })
  }
}
