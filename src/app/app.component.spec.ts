import {  TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have default options 1 hour'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.selectedRange).toEqual(60);
  });

  it(`should have 25 columns if options 1 hour'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit()
    app.renderColumns(60)
    expect(app.columnHeader.length).toEqual(25);
  });

  it(`should have 49 columns if options 30 min'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit()
    app.renderColumns(30)
    expect(app.columnHeader.length).toEqual(49);
  });

  it(`should have 289 columns if options 5 min'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit()
    app.renderColumns(5)
    expect(app.columnHeader.length).toEqual(289);
  });

  it(`should have uniq date (row)`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit()
    app.initialRecords = [
      {time: 1637358993885, record: 'Detail: 11:56:33 PM'}, //Fri Nov 19 2021 23:56:33
      {time: 1635885312689, record: 'Detail: 10:35:12 PM'}, //Tue Nov 02 2021 22:35:12
      {time: 1636653278148, record: 'Detail: 7:54:38 PM'}, //Thu Nov 11 2021 19:54:38
      {time: 1636292748528, record: 'Detail: 3:45:48 PM'}, //Sun Nov 07 2021 15:45:48
      {time: 1636292748528, record: 'Detail: 3:45:48 PM'}, //Sun Nov 07 2021 15:45:48
      {time: 1636602888682, record: 'Detail: 5:54:48 AM'}, //Thu Nov 11 2021 05:54:48
      {time: 1635783895270, record: 'Detail: 6:24:55 PM'}, //Mon Nov 01 2021 18:24:55
      {time: 1637670499100, record: 'Detail: 2:28:19 PM'}, //Tue Nov 23 2021 14:28:19
      {time: 1637670499100, record: 'Detail: 2:28:19 PM'}, //Tue Nov 23 2021 14:28:19
    ]
    app.renderColumns(60)
    expect(app.shownRecords.length).toEqual(6);
  });

  it(`should sort by range 1 hour `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit()
    app.initialRecords = [
      {time: 1637358993885, record: 'Detail: 23:56\n'}, //Fri Nov 19 2021 23:56:33
      {time: 1635885312689, record: 'Detail: 22:35\n'}, //Tue Nov 02 2021 22:35:12
      {time: 1636653278148, record: 'Detail: 19:54\n'}, //Thu Nov 11 2021 19:54:38
      {time: 1636292748528, record: 'Detail: 15:45\n'}, //Sun Nov 07 2021 15:45:48
      {time: 1636602888682, record: 'Detail: 05:54\n'}, //Thu Nov 11 2021 05:54:48
      {time: 1635783895270, record: 'Detail: 18:24\n'}, //Mon Nov 01 2021 18:24:55
      {time: 1637670499100, record: 'Detail: 14:28\n'}, //Tue Nov 23 2021 14:28:19
    ]
    app.renderColumns(60)

    const expect1 = app.shownRecords.filter(item => item.date === '19')
    const expect2 = app.shownRecords.filter(item => item.date === '2')
    const expect3 = app.shownRecords.filter(item => item.date === '11')
    const expect4 = app.shownRecords.filter(item => item.date === '7')
    const expect5 = app.shownRecords.filter(item => item.date === '1')
    const expect6 = app.shownRecords.filter(item => item.date === '23')

    expect(expect1.length).toEqual(1);
    expect(expect1[0][app.columnHeader[24]]).toEqual('Detail: 23:56\n');
    expect(expect2[0][app.columnHeader[23]]).toEqual('Detail: 22:35\n');
    expect(expect3[0][app.columnHeader[20]]).toEqual('Detail: 19:54\n');
    expect(expect3[0][app.columnHeader[6]]).toEqual('Detail: 05:54\n');
    expect(expect4[0][app.columnHeader[16]]).toEqual('Detail: 15:45\n');
    expect(expect5[0][app.columnHeader[19]]).toEqual('Detail: 18:24\n');
    expect(expect6[0][app.columnHeader[15]]).toEqual('Detail: 14:28\n');
  });

  it(`should have show column name if selected 5 min'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    app.renderColumns(5)

    expect(app.columnHeader[0]).toEqual('date');
    expect(app.columnHeader[1]).toEqual('00:05');
    expect(app.columnHeader[2]).toEqual('00:10');
    expect(app.columnHeader[287]).toEqual('23:55');
    expect(app.columnHeader[288]).toEqual('00:00');
  });

  it(`should have show column name if selected 30 min'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    app.renderColumns(30)

    expect(app.columnHeader[0]).toEqual('date');
    expect(app.columnHeader[1]).toEqual('00:30');
    expect(app.columnHeader[2]).toEqual('01:00');
    expect(app.columnHeader[47]).toEqual('23:30');
    expect(app.columnHeader[48]).toEqual('00:00');
  });

  it(`should have show column name if selected 1 hour'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    app.renderColumns(60)

    expect(app.columnHeader[0]).toEqual('date');
    expect(app.columnHeader[1]).toEqual('01:00');
    expect(app.columnHeader[2]).toEqual('02:00');
    expect(app.columnHeader[23]).toEqual('23:00');
    expect(app.columnHeader[24]).toEqual('00:00');
  });

});
