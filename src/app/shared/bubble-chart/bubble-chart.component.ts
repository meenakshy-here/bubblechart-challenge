import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { getRandomRGB } from "../../utils";

@Component({
  selector: "app-bubble-chart",
  templateUrl: "./bubble-chart.component.html",
  styleUrls: ["./bubble-chart.component.scss"],
})
export class BubbleChartComponent implements OnChanges, OnInit {
  constructor() {}

  @Input() chartData: any;

  canvas: any;
  context: any;

  xAxisStartingPoint: any;
  yAxisStartingPoint: any;

  canvasWidth: any;
  canvasHeight: any;

  maxNumOfLinesX: any;
  maxNumOfLinesY: any;

  numOfLinesX: any;
  numOfLinesY: any;

  widthBtwLinesX: any;
  widthBtwLinesY: any;

  xAxis: any;
  yAxis: any;

  widthDiffX: any;
  widthDiffY: any;

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
  }

  ngOnChanges() {
    // this.canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    // this.context = this.canvas.getContext("2d");
    // this.canvasWidth = this.canvas.width;
    // this.canvasHeight = this.canvas.height;
    if (this.chartData.length > 0) {
      this.findMaxNumOfLines(this.chartData);

      this.numOfLinesX = this.maxNumOfLinesX + 2;
      this.numOfLinesY = this.maxNumOfLinesY + 2;

      this.widthBtwLinesX = Math.floor(this.canvasHeight / this.numOfLinesX);
      this.widthBtwLinesY = Math.floor(this.canvasWidth / this.numOfLinesY);

      this.xAxis = this.numOfLinesX - 1;
      this.yAxis = 1;

      // Draw grid lines along X-axis
      for (let i = 1; i <= this.numOfLinesX; i++) {
        // If line represents X-axis draw in different color
        if (i == this.xAxis) {
          this.context.strokeStyle = "#000000";
          // Label for X-Axis
          this.drawText(
            "Salary",
            "15px",
            this.canvasWidth / 2 + 50,
            this.widthBtwLinesX * i + 50
          );
        } else {
          this.context.strokeStyle = "#e9e9e9";
        }
        this.drawLine(
          0,
          this.widthBtwLinesX * i,
          this.canvasWidth,
          this.widthBtwLinesX * i
        );
      }

      // Draw grid lines along Y-axis
      for (let i = 1; i <= this.numOfLinesY; i++) {
        // If line represents X-axis draw in different color
        if (i == this.yAxis) {
          this.context.strokeStyle = "#000000";
          // Label for X-Axis
          this.context.save();
          this.context.rotate(-0.5 * Math.PI);
          this.drawText("Head Count", "15px", -250, 100);
          this.context.restore();
        } else {
          this.context.strokeStyle = "#e9e9e9";
        }
        this.drawLine(
          this.widthBtwLinesY * i,
          0,
          this.widthBtwLinesY * i,
          this.canvasHeight
        );
      }

      // // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph
      this.context.translate(
        this.yAxis * this.widthBtwLinesY,
        this.xAxis * this.widthBtwLinesX
      );

      // Tick marks along x-axis
      for (let i = 1; i <= this.maxNumOfLinesY; i++) {
        this.context.strokeStyle = "#000000";
        this.drawLine(this.widthBtwLinesY * i, -3, this.widthBtwLinesY * i, +3);
        this.drawText(
          this.xAxisStartingPoint + (i - 1) * 100,
          "9px",
          this.widthBtwLinesY * i - 2,
          15
        );
      }

      // Tick marks along the Y-axis
      for (let i = 1; i <= this.maxNumOfLinesX; i++) {
        this.context.strokeStyle = "#000000";
        this.drawLine(
          -3,
          -this.widthBtwLinesX * i,
          3,
          -this.widthBtwLinesX * i
        );
        this.drawText(
          this.yAxisStartingPoint + (i - 1) * 100,
          "9px",
          -20,
          -this.widthBtwLinesX * i + 3
        );
      }

      this.widthDiffX = (this.widthBtwLinesY - 100) / 100;
      this.widthDiffY = (this.widthBtwLinesX - 100) / 100;
      this.chartData.forEach((data: any) => {
        this.context?.beginPath();

        let { salary, compratio, headcount } = data;

        salary = salary - this.xAxisStartingPoint + 100;
        salary = salary + salary * this.widthDiffX;
        headcount = headcount - this.yAxisStartingPoint + 100;
        headcount = headcount + headcount * this.widthDiffY;

        this.context?.arc(salary, -headcount, compratio, 0, 2 * Math.PI);

        const rgb = getRandomRGB();
        this.context.fillStyle =
          "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ", 0.5)";
        this.context.fill();
        this.context?.stroke();

        this.drawText(data.title, "10px", salary, -headcount);
      });
    }
  }

  findMaxNumOfLines(chartData: any) {
    let minX, maxX;
    let minY, maxY;
    let arrX: any = [],
      arrY: any = [];

    chartData.forEach((data: any) => {
      arrX.push(data.salary);
      arrY.push(data.headcount);
    });

    minX = Math.min(...arrX);
    maxX = Math.max(...arrX);
    minY = Math.min(...arrY);
    maxY = Math.max(...arrY);

    minX = Math.floor(minX / 100) * 100;
    maxX = Math.ceil(maxX / 100) * 100;

    minY = Math.floor(minY / 100) * 100;
    maxY = Math.ceil(maxY / 100) * 100;

    // Graph starts with 100
    if (minX < 100) {
      minX = 100;
    }

    if (minY < 100) {
      minY = 100;
    }

    this.xAxisStartingPoint = minX;
    this.yAxisStartingPoint = minY;

    this.maxNumOfLinesY = maxX / 100 - minX / 100 + 2;
    this.maxNumOfLinesX = maxY / 100 - minY / 100 + 2;
  }

  drawLine(x1: any, y1: any, x2: any, y2: any) {
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  drawText(text: string, fontSize: any, x: any, y: any) {
    this.context.beginPath();
    this.context.fillStyle = "black";
    this.context.textAlign = "center";
    this.context.font = fontSize + " Arial";
    this.context.fillText(text, x, y);
    this.context.fill();
  }
}
