import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../services/data.service';
import {Result} from '../../lib/result';
import {SpeciesForLocationPage} from '../species-for-location/species-for-location';

@Component({
    selector: 'page-species-by-location',
    templateUrl: 'species-by-location.html',
    providers: [
        DataService
    ]
})
export class SpeciesByLocationPage implements OnInit {

    public locations: Result[] = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private _dataService: DataService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SpeciesByLocationPage');
    }

    ngOnInit() {
        this._dataService
            .getSpeciesByLocation()
            .subscribe(
                r => this.locations = r,
                error => console.log("Error: ", error)
            );
    }

    public locationSelected(location: Result): void {
        this.navCtrl.push(SpeciesForLocationPage, {
            id: location.id
        });
    }

}

