import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Result} from '../../lib/result';

@Component({
  selector: 'page-species-detail',
  templateUrl: 'species-detail.html'
})
export class SpeciesDetailPage implements OnInit {

  public bird: Result;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeciesDetailPage');
  }

  ngOnInit() {
    this.bird = this.navParams.get('bird');
  }

}
