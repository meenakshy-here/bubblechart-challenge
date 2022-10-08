import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { getRandomRGB } from '../../utils';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnChanges, OnInit {

  constructor() { }

  @Input() chartData: any;

  grid_size = 100;
  grid_vertical_size = 50;
  grid_horizontal_size = 200;
  x_axis_starting_point = { number: 100, suffix: '' };
  y_axis_starting_point = { number: 100, suffix: '' };

  canvas: any;
  ctx: any;

  canvas_width: any;
  canvas_height: any;

  num_lines_x: any;
  num_lines_y: any;
  x_axis_distance_grid_lines: any;
  y_axis_distance_grid_lines: any;

  ngOnChanges() {
    console.log('chartData', this.chartData)
    if (this.chartData.length > 0) {
        this.chartData.forEach((data: any) => {
        let x = (Math.floor(data.salary / 2))
        console.log('data, x', data.salary, x)
        let y = (Math.floor(data.headcount / 2))
        console.log('data, y', data.headcount, y)
        this.ctx?.beginPath();
        this.ctx?.arc(data.salary, -data.headcount, data.compratio, 0, 2*Math.PI);
        const rgb = getRandomRGB();
        console.log('rgb', rgb)
        this.ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.5)";
        this.ctx.fill();
        this.ctx?.stroke();
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = 'center';
        this.ctx.font = "10px Arial";
        this.ctx.fillText(data.title, data.salary, -data.headcount);
        this.ctx.fill();
      })
    }
    // this.ctx?.beginPath();
    // this.ctx?.arc(100, -100, 10, 0, 2*Math.PI);
    // this.ctx?.stroke();

  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById("myCanvas")
    this.ctx = this.canvas.getContext("2d");

    this.canvas_width = this.canvas.width;
    this.canvas_height = this.canvas.height;

    this.num_lines_x = Math.floor(this.canvas_height/this.grid_size);
    this.num_lines_y = Math.floor(this.canvas_width/this.grid_size);

    this.x_axis_distance_grid_lines = this.num_lines_x - 1;
    this.y_axis_distance_grid_lines = 1;

    // console.log('num_lines_x', num_lines_x)

    // Draw grid lines along X-axis
    for(let i=0; i<=this.num_lines_x; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
        
        // If line represents X-axis draw in different color
        if(i == this.x_axis_distance_grid_lines) 
          this.ctx.strokeStyle = "#000000";
        else
          this.ctx.strokeStyle = "#e9e9e9";

        this.ctx.moveTo(0, this.grid_size*i);
        this.ctx.lineTo(this.canvas_width, this.grid_size*i);
        this.ctx.stroke();
    }

    // Draw grid lines along Y-axis
    for(let i=0; i<=this.num_lines_y; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      
      // If line represents X-axis draw in different color
      if(i == this.y_axis_distance_grid_lines) 
          this.ctx.strokeStyle = "#000000";
      else
          this.ctx.strokeStyle = "#e9e9e9";
      
      this.ctx.moveTo(this.grid_size*i, 0);
      this.ctx.lineTo(this.grid_size*i, this.canvas_height);
      this.ctx.stroke();
  }
  
  // // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  this.ctx.translate(this.y_axis_distance_grid_lines*this.grid_size, this.x_axis_distance_grid_lines*this.grid_size);
  
  // Ticks marks along the positive X-axis
  for(let i=1; i<(this.num_lines_y - this.y_axis_distance_grid_lines); i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#000000";
  
      // Draw a tick mark 6px long (-3 to 3)
      this.ctx.moveTo(this.grid_size*i+0.5, -3);
      this.ctx.lineTo(this.grid_size*i+0.5, 3);
      this.ctx.stroke();
  
      // Text value at that point
      this.ctx.font = '9px Arial';
      this.ctx.textAlign = 'start';
      this.ctx.fillText(this.x_axis_starting_point.number*i + this.x_axis_starting_point.suffix, this.grid_size*i-2, 15);
  }
  
  // Ticks marks along the negative X-axis
  for(let i=1; i<this.y_axis_distance_grid_lines; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#000000";
  
      // Draw a tick mark 6px long (-3 to 3)
      this.ctx.moveTo(-this.grid_size*i+0.5, -3);
      this.ctx.lineTo(-this.grid_size*i+0.5, 3);
      this.ctx.stroke();
  
      // Text value at that point
      this.ctx.font = '9px Arial';
      this.ctx.textAlign = 'end';
      this.ctx.fillText(-this.x_axis_starting_point.number*i + this.x_axis_starting_point.suffix, -this.grid_size*i+3, 15);
  }
  
  // Ticks marks along the positive Y-axis
  // Positive Y-axis of graph is negative Y-axis of the canvas
  for(let i=1; i<(this.num_lines_x - this.x_axis_distance_grid_lines); i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#000000";
  
      // Draw a tick mark 6px long (-3 to 3)
      this.ctx.moveTo(-3, this.grid_size*i+0.5);
      this.ctx.lineTo(3, this.grid_size*i+0.5);
      this.ctx.stroke();
  
      // Text value at that point
      this.ctx.font = '9px Arial';
      this.ctx.textAlign = 'start';
      this.ctx.fillText(-this.y_axis_starting_point.number*i + this.y_axis_starting_point.suffix, 8, this.grid_size*i+3);
  }
  
  // // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for(let i=1; i<this.x_axis_distance_grid_lines; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#000000";
  
      // Draw a tick mark 6px long (-3 to 3)
      this.ctx.moveTo(-3, -this.grid_size*i+0.5);
      this.ctx.lineTo(3, -this.grid_size*i+0.5);
      this.ctx.stroke();
  
      // Text value at that point
      this.ctx.font = '9px Arial';
      this.ctx.textAlign = 'start';
      this.ctx.fillText(this.y_axis_starting_point.number*i + this.y_axis_starting_point.suffix, 8, -this.grid_size*i+3);
    }
  }

}
