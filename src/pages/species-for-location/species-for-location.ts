import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {Result} from "../../lib/result";
import {DataService} from "../../services/data.service";
import {MapService} from "../../services/map.service";
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
    public locationId: number;
    public location: Result;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private _dataService: DataService,
                private _mapService: MapService) {
        this.location = new Result();
    }

    ngOnInit() {
        this.locationId = this.navParams.get("id");
        this._dataService
            .getSpeciesForLocation(this.locationId)
            .subscribe(
                r => this.birds = r,
                error => console.log("Error: ", error)
            );
        this._dataService
            .getLocation(this.locationId)
            .subscribe(
                r => {
                    this.location = r[0];
                },
                error => console.log("Error: ", error),
                () => this._mapService.drawLocationMap(this.location.latitude, this.location.longitude, 'map_div_1')
            );
    }

    public birdSelected(bird: Result) {
        this.navCtrl.push(SpeciesDetailPage, {
            id: bird.id
        });
    }

}
