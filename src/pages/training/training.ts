import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/*
 Generated class for the Training page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-training',
  templateUrl: 'training.html'
})
export class TrainingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');
  }

}
