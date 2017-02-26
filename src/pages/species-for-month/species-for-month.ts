import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ReportDataService} from '../../services/reportdata.service';
import {Result} from '../../lib/result';
import {SpeciesDetailPage} from '../species-detail/species-detail';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-species-for-month',
  templateUrl: 'species-for-month.html',
  providers: [
    ReportDataService
  ]
})
export class SpeciesForMonthPage implements OnInit {

  public birds: Result[] = [];
  public month: Result;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _reportDataService: ReportDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeciesForMonthPage');
  }

  ngOnInit() {
    this.month = this.navParams.get("month");
    this._reportDataService
      .getSpeciesForMonth(this.month.monthNumber)
      .subscribe(
        r => this.birds = r,
        error => console.log("Error: ", error)
      );
  }

  public birdSelected(bird: Result) {
    this.navCtrl.push(SpeciesDetailPage, {
      bird: bird
    });
  }

  public goHome(): void {
    this.navCtrl.push(HomePage);
  }

}
