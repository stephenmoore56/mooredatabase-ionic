import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../services/data.service';
import {Result} from '../../lib/result';
import {SpeciesDetailPage} from '../species-detail/species-detail';

@Component({
    selector: 'page-species-for-month',
    templateUrl: 'species-for-month.html',
    providers: [
        DataService
    ]
})
export class SpeciesForMonthPage implements OnInit {

    public birds: Result[] = [];
    public month: Result;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private _dataService: DataService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SpeciesForMonthPage');
    }

    ngOnInit() {
        this.month = this.navParams.get("month");
        this._dataService
            .getSpeciesForMonth(this.month.monthNumber)
            .subscribe(
                r => this.birds = r,
                error => console.log("Error: ", error)
            );
    }

    public birdSelected(bird: Result) {
        this.navCtrl.push(SpeciesDetailPage, {
            id: bird.id
        });
    }

}
