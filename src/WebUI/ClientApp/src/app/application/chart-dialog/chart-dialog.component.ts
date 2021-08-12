declare var CanvasJS: any;
import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calcTotalSeconds, Time } from '../../shared/services/timer/Timer';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit, AfterViewInit {

  constructor(private _dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public stopwatches: any[]) { }

  ngOnInit(): void {

  }

  async ngAfterViewInit() {
    await this.addCanvasScript();
    this.renderChart();
  }

  renderChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      exportEnabled: true,
      animationEnabled: true,
      legend: {
        cursor: 'pointer',
        itemclick: this.explodePie
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '{name}: <strong>{y}%</strong>',
        indexLabel: '{name} - {y}%',
        dataPoints: this.getDataPoints()
      }]
    });
    chart.render();
  }

  explodePie(e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === 'undefined' || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }

  getDataPoints(): unknown[] {
    const o_dataPoints = [];

    this.stopwatches.forEach(x => {
      const dataPoint = {
        y: this.getPercentage(x),
        name: x.title
      };

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
    let o_totalSeconds = 0;

    this.stopwatches.forEach(x => {
      const time: Time = new Time(x.time);
      o_totalSeconds += calcTotalSeconds(time);
    });

    return o_totalSeconds;
  }

  calcItemTotalSeconds(timeString: string) {
    const time: Time = new Time(timeString);
    return calcTotalSeconds(time);
  }

  async addCanvasScript() {
    return new Promise(function (resolve, reject) {
      const canvasScript = document.createElement('script');
      canvasScript.src = 'https://canvasjs.com/assets/script/canvasjs.min.js';
      canvasScript.onload = resolve;
      canvasScript.onerror = reject;
      document.head.appendChild(canvasScript);
    });
  }

  hideDialog(): void {
    this._dialogRef.close();
  }
}
