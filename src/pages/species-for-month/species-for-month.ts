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
  public filteredBirds: Result[] = [];
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
        r => {
          this.birds = r;
          this.filteredBirds = r;
        },
        error => console.log("Error: ", error)
      );
  }

  public birdSelected(bird: Result) {
    this.navCtrl.push(SpeciesDetailPage, {
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
