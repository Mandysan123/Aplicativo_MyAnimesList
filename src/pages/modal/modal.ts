import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Anime } from '../home/anime.model';
import { AnimeService } from '../home/anime.service';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {
  anime: Anime;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private viewCtrl: ViewController,
    private animeService: AnimeService
  ) {
    this.anime = {
      id: this.animeService.getNextId(),
      title: '',
      rating: 0,
      description: '',
      imageUrl: ''
    };
  }

  cancel() {
    this.viewCtrl.dismiss(null, 'cancel');
  }

  confirm() { // metodo para adicionar o anime no vetor
    this.animeService.addAnime(this.anime); // chamo o método addAnime para adicionar o anime 
    this.viewCtrl.dismiss(this.anime, 'confirm'); // fechar o modal após apertar o botao de confirm
  }

  onFileSelected(event: Event) { // meotodo para fazer o carregamento de imagens e mostrar o preview
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.anime.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
