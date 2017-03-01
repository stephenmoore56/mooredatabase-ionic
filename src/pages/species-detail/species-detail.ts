import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Result} from '../../lib/result';
import {DataService} from '../../services/data.service';
import {ChartService} from '../../services/chart.service';

@Component({
    selector: 'page-species-detail',
    templateUrl: './species-detail.html',
    providers: [
        DataService,
        ChartService
    ]
})
export class SpeciesDetailPage implements OnInit {

    public bird: Result = new Result();
    public months: Result[] = [this.bird];
    public speciesId: number;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private _dataService: DataService,
                private _chartService: ChartService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SpeciesDetailPage');
    }

    ngOnInit() {
        this.speciesId = this.navParams.get('id');
        this._dataService
            .getSpeciesDetail(this.speciesId)
            .subscribe(
                r => this.bird = r[0],
                error => console.log("Error: ", error),
                () => {
                    // don't query for sightings or draw chart for birds not seen
                    if (this.bird.last_seen != null) {
                        this._dataService
                            .getMonthsForSpecies(this.speciesId)
                            .subscribe(
                                r => this.months = r,
                                error => console.log("Error: ", error),
                                () => this._chartService.drawChartMonthsForSpecies(this.months, 'chart_div_2')
                            );
                    }
                }
            );
    }

    public searchImages(common_name: string) {
        let url = `http://images.google.com/images?q=${common_name}&sout=1`;
        window.open(url, '_blank');
    }

    public openWikipediaArticle(common_name: string) {
        let url = `http://en.wikipedia.org/wiki/${common_name}`;
        window.open(url, '_blank');
    }

}
