import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Result} from '../../lib/result';
import {DataService} from '../../services/data.service';
import {MapService} from '../../services/map.service';
import {SpeciesDetailPage} from '../species-detail/species-detail';

@Component({
    selector: 'page-species-for-location',
    templateUrl: 'species-for-location.html',
    providers: [
        DataService,
        MapService
    ]
})
export class SpeciesForLocationPage implements OnInit {

    public birds: Result[];
    public filteredBirds: Result[];
    public locationId: number;
    public location: Result;

    constructor(private _navCtrl: NavController,
                private _navParams: NavParams,
                private _dataService: DataService,
                private _mapService: MapService) {
        this.location = new Result();
    }

    ngOnInit() {
        this.locationId = this._navParams.get('id');
        this._dataService
            .getSpeciesForLocation(this.locationId)
            .subscribe(
                r => {
                    this.birds = r;
                    this.filteredBirds = r;
                },
                error => console.log('Error: ', error)
            );
        this._dataService
            .getLocation(this.locationId)
            .subscribe(
                r => {
                    this.location = r[0];
                },
                error => console.log('Error: ', error),
                () => this._mapService.drawLocationMap(this.location.latitude, this.location.longitude, 'map_div_1')
            );
    }

    public birdSelected(bird: Result) {
        this._navCtrl.push(SpeciesDetailPage, {
            id: bird.id
        });
    }

    public filterBirds(e: any) {
        // set val to the value of the searchbar
        let val = e.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.filteredBirds = this.birds.filter((bird) => {
                return (bird.common_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.filteredBirds = this.birds;
        }
    }

}
