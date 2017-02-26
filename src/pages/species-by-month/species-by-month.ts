import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ReportDataService} from '../../services/reportdata.service';
import {Result} from '../../lib/result';
import {SpeciesForMonthPage} from '../species-for-month/species-for-month';

@Component({
  selector: 'page-species-by-month',
  templateUrl: 'species-by-month.html',
  providers: [
    ReportDataService
  ]
})
export class SpeciesByMonthPage implements OnInit {

  public months: Result[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _reportDataService: ReportDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeciesByMonthPage');
  }

  ngOnInit() {
    this._reportDataService
      .getSpeciesByMonth()
      .subscribe(
        r => this.months = r,
        error => console.log("Error: ", error)
      );
  }

  public monthSelected(month: Result): void {
    this.navCtrl.push(SpeciesForMonthPage, {
      month: month
    });
  }

}
