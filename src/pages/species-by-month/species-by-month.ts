import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../services/data.service';
import {ChartService} from '../../services/chart.service';
import {Result} from '../../lib/result';
import {SpeciesForMonthPage} from '../species-for-month/species-for-month';

@Component({
    selector: 'page-species-by-month',
    templateUrl: 'species-by-month.html',
    providers: [
        DataService,
        ChartService
    ]
})
export class SpeciesByMonthPage implements OnInit {

    public months: Result[] = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private _dataService: DataService,
                private _chartService: ChartService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SpeciesByMonthPage');
    }

    ngOnInit() {
        this._dataService
            .getSpeciesByMonth()
            .subscribe(
                r => this.months = r,
                error => console.log("Error: ", error),
                () => this._chartService.drawChartSpeciesByMonth(this.months, 'chart_div_1')
            );
    }

    public monthSelected(month: Result): void {
        this.navCtrl.push(SpeciesForMonthPage, {
            month: month
        });
    }

}
