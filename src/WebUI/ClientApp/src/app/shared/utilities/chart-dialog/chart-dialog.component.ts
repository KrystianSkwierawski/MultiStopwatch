declare var CanvasJS: any;
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calcTotalSeconds, Time } from '../../services/timer/Timer';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit, AfterViewInit {

  constructor(private _dialogRef: MatDialogRef<ChartDialogComponent>,
    private _elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngAfterViewInit() {
    this.addCanvasJsScript();
  }

  ngOnInit(): void {
    var chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      animationEnabled: true,
      legend: {
        cursor: "pointer",
        itemclick: this.explodePie
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y}%",
        dataPoints: this.getDataPoints()
      }]
    });
    chart.render();
  }

  explodePie(e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }

  getDataPoints(): unknown[] {
    let o_dataPoints = [];

    this.data.forEach(x => {
      const dataPoint = {
        y: this.getPercentage(x),
        name: x.title
      }

      o_dataPoints.push(dataPoint);
    });

    return o_dataPoints;
  }

  getPercentage(item: any) {
    let o_percentage = 0;

    const itemsTotalSeconds = this.calcAllItemsTotalSeconds();
    const itemTotalSeconds: number = this.calcItemTotalSeconds(item.time);

    o_percentage = Math.round((itemTotalSeconds / itemsTotalSeconds) * 100);

    return o_percentage;
  }

  calcAllItemsTotalSeconds(): number {
    let o_totalSeconds: number = 0;

    this.data.forEach(x => {
      const time: Time = new Time(x.time);
      o_totalSeconds += calcTotalSeconds(time.hours, time.minutes, time.seconds);
    });

    return o_totalSeconds;
  }

  calcItemTotalSeconds(timeString: string) {
    const time: Time = new Time(timeString);
    return calcTotalSeconds(time.hours, time.minutes, time.seconds);
  }

  addCanvasJsScript() {
    const canvasJsScript = document.createElement("script");
    canvasJsScript.type = "text/javascript";
    canvasJsScript.src = "https://canvasjs.com/assets/script/canvasjs.min.js";
    this._elementRef.nativeElement.appendChild(canvasJsScript);
  }

  hideDialog(): void {
    this._dialogRef.close();
  }
}
