import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../services/data.service';
import {MapService} from "../../services/map.service";
import {Result} from '../../lib/result';
import {SpeciesForLocationPage} from '../species-for-location/species-for-location';

@Component({
    selector: 'page-species-by-location',
    templateUrl: 'species-by-location.html',
    providers: [
        DataService,
        MapService
    ]
})
export class SpeciesByLocationPage implements OnInit {

    public locations: Result[] = [];

    constructor(private _navCtrl: NavController,
                private _dataService: DataService,
                private _mapService: MapService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SpeciesByLocationPage');
    }

    ngOnInit() {
        this._dataService
            .getSpeciesByLocation()
            .subscribe(
                r => this.locations = r,
                error => console.log("Error: ", error),
              () => this._mapService.drawAllLocationsMap(this.locations, 'map_div_2')
            );
    }

    public locationSelected(location: Result): void {
        this._navCtrl.push(SpeciesForLocationPage, {
            id: location.id
        });
    }

}

