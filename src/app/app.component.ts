import { Component, OnInit } from '@angular/core';

interface Record {
  time: number;
  record: string;
}

interface ShownRecord {
  [key: string]: string;
}

interface Intervals {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedRange: number = 60;
  columnHeader: string[] = [];
  rangeColumnsForCalculate: number[] = [];
  initialRecords: Record[] = AppComponent.generateRandomDate();
  shownRecords: ShownRecord[] = [];

  intervals: Intervals[] = [
    {value: 5, viewValue: '5 Min'},
    {value: 30, viewValue: '30 Min'},
    {value: 60, viewValue: '1 hour'}
  ];

  ngOnInit(): void {
    this.renderColumns(this.selectedRange)
  }

  private static generateRandomDate(): Record[] {
    const records: Record[] = [];
    const start: Date = new Date(2021, 10, 1);
    const end: Date = new Date(2021, 11, 1);
    for (let i = 0; i < 1000; i++) {
      const time = AppComponent.randomDate(start, end);
      records.push({
        time: time.getTime(),
        record: 'Detail: ' + time.toLocaleTimeString('en-US',{hour12: false}).slice(0,5).replace('24:', '00:'),
      });
    }
    return records;
  }

  private static randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  public renderColumns(range: number): void {
    this.selectedRange = range;
    const columnHeader: Array<string> = ['date'];
    const columnsCount = (24 * 60) / this.selectedRange;

    for (let i = 1; i <= columnsCount; i++) {
      const minutesCount = i * this.selectedRange;
      columnHeader.push(AppComponent.getColumnHeader(minutesCount));
      this.rangeColumnsForCalculate.push(minutesCount);
    }

    this.columnHeader = columnHeader;
    this.shownRecords = [];
    this.fillShownRecords();
  }

  private fillShownRecords(): void {
    const uniqDates: number[] = this.initialRecords
      .map(d => new Date(d.time).getDate())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a - b);

    uniqDates.forEach(date => {
        this.shownRecords.push(this.getRecordsForDate(date));
      }
    )
  }

  private getRecordsForDate(date: number): ShownRecord {
    const result: ShownRecord = {
      date: date.toString(),
    };
    const allRecordsByDay = this.initialRecords.filter(record => new Date(record.time).getDate() === date);
    this.rangeColumnsForCalculate.forEach(range => {
        result[AppComponent.getColumnHeader(range)] = this.getRecordByRange(range, allRecordsByDay);
      }
    );
    return result;
  }

  getRecordByRange(range: number, records: Record[]): string {
    return records.filter(record => {
      const minutes = new Date(record.time).getHours() * 60 + new Date(record.time).getMinutes();
      if (minutes <= range && minutes > (range - this.selectedRange)) {
        return record;
      }
      return;
    }).map(rec => rec.record).join('\n');
  }

  private static getColumnHeader(columnName: number): string {
    const h = Math.trunc(columnName / 60);
    const m = columnName % 60;
    if (h === 24) {
      return '00:00';
    }
    return `${ h > 9 ? h : '0' + h }:${ m > 9 ? m : '0' + m }`;
  }

}
