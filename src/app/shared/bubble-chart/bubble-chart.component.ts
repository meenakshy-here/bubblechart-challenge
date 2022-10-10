import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { getRandomRGB } from '../../utils';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnChanges, OnInit {

  constructor() { }

  @Input() chartData: any;

  canvas: any;
  context: any;

  gridSize = 100;

  xAxisStartingPoint = { number: 100, suffix: '' };
  yAxisStartingPoint = { number: 100, suffix: '' };

  canvasWidth: any;
  canvasHeight: any;

  numOfLinesX: any;
  numOfLinesY: any;

  xAxis: any;
  yAxis: any;

  ngOnChanges() {
    if (this.chartData.length > 0) {
        this.chartData.forEach((data: any) => {
        this.context?.beginPath();
        this.context?.arc(data.salary, -data.headcount, data.compratio, 0, 2*Math.PI);
        const rgb = getRandomRGB();
        this.context.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.5)";
        this.context.fill();
        this.context?.stroke();
        this.context.beginPath();
        this.context.fillStyle = "black";
        this.context.textAlign = 'center';
        this.context.font = "10px Arial";
        this.context.fillText(data.title, data.salary, -data.headcount);
        this.context.fill();
      })
    }
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById("myCanvas")
    this.context = this.canvas.getContext("2d");

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.numOfLinesX = Math.floor(this.canvasHeight/this.gridSize);
    this.numOfLinesY = Math.floor(this.canvasWidth/this.gridSize);

    this.xAxis = this.numOfLinesX - 1;
    this.yAxis = 1;

    // Draw grid lines along X-axis
    for(let i=0; i<=this.numOfLinesX; i++) {
      this.context.beginPath();
      this.context.lineWidth = 1;
      // If line represents X-axis draw in different color
      if(i == this.xAxis) 
      {
        this.context.strokeStyle = "#000000";
        // Label for X-Axis
        this.context.font = '15px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Salary', (this.canvasWidth/2) + 50, (this.gridSize*i + 50));
      }
      else {
        this.context.strokeStyle = "#e9e9e9";
      }
      this.context.moveTo(0, this.gridSize*i);
      this.context.lineTo(this.canvasWidth, this.gridSize*i);
      this.context.stroke();
    }

    // Draw grid lines along Y-axis
    for(let i=0; i<=this.numOfLinesY; i++) {
      this.context.beginPath();
      this.context.lineWidth = 1;
      // If line represents X-axis draw in different color
      if(i == this.yAxis) 
      {
          this.context.strokeStyle = "#000000";
          this.context.font = '15px Arial';
          this.context.textAlign = 'center';
          this.context.save();
          // this.context.translate(-10,300);
          this.context.rotate(-0.5*Math.PI);
          this.context.fillText('Head Count', -250, 50);
          this.context.restore();
      }
      else {
          this.context.strokeStyle = "#e9e9e9";
      }
      this.context.moveTo(this.gridSize*i, 0);
      this.context.lineTo(this.gridSize*i, this.canvasHeight);
      this.context.stroke();
  }
  
  // // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  this.context.translate(this.yAxis*this.gridSize, this.xAxis*this.gridSize);
  
  // Ticks marks along the X-axis
  for(let i=1; i<(this.numOfLinesY - this.yAxis); i++) {
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "#000000";

    this.context.moveTo(this.gridSize*i+0.5, -3);
    this.context.lineTo(this.gridSize*i+0.5, 3);
    this.context.stroke();

    this.context.font = '9px Arial';
    this.context.textAlign = 'start';
    this.context.fillText(this.xAxisStartingPoint.number*i + this.xAxisStartingPoint.suffix, this.gridSize*i-2, 15);
  }
  
  // // Ticks marks along the Y-axis
  for(let i=1; i<this.xAxis; i++) {
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "#000000";

    this.context.moveTo(-3, -this.gridSize*i+0.5);
    this.context.lineTo(3, -this.gridSize*i+0.5);
    this.context.stroke();

    this.context.font = '9px Arial';
    this.context.textAlign = 'start';
    this.context.fillText(this.yAxisStartingPoint.number*i + this.yAxisStartingPoint.suffix, -25, -this.gridSize*i+3);
    }

  }

  

}
