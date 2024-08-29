import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Anime } from '../home/anime.model';

@Component({
  selector: 'edit-anime-modal',
  templateUrl: 'edit-anime-modal.html'
})
export class EditAnimeModalComponent {
  anime: Anime;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.anime = this.navParams.get('anime');
  }

  cancel() {
    this.viewCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (this.anime) {
      this.viewCtrl.dismiss({ anime: this.anime }, 'confirm');
    }
  }
  
  delete() {
    if (this.anime) { 
      this.viewCtrl.dismiss({ anime: this.anime }, 'delete');
    }
  }
}
