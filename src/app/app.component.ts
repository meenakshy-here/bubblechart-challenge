import { Component } from "@angular/core";
import { ChartDataService } from "./services/chart-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  chartData: any;

  constructor(public chartDataService: ChartDataService) {}

  ngOnInit() {
    this.chartData = this.chartDataService
      .getChartData()
      .subscribe((data: any) => {
        this.chartData = data;
      });
    // To test the app using this static data, please un-comment lines in file bubble-chart.components.ts file 
    // from line 47 to 50
    //   this.chartData = [
    //     {
    //        "title":"HR",
    //        "salary":550,
    //        "compratio":10,
    //        "headcount":300
    //     }
    //     ,
    //     {
    //        "title":"Marketing",
    //        "salary":660,
    //        "compratio":25,
    //        "headcount":380
    //     },
    //     {
    //        "title":"Engineering",
    //        "salary":700,
    //        "compratio":30,
    //        "headcount":550
    //     },
    //     {
    //        "title":"Operations",
    //        "salary":750,
    //        "compratio":20,
    //        "headcount":700
    //     }
    //  ];
  }
}
