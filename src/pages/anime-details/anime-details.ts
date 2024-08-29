import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Anime } from '../home/anime.model';
import { AnimeService } from '../home/anime.service';
import { EditAnimeModalComponent } from '../edit-anime-modal/edit-anime-modal'; 

@Component({
  selector: 'page-anime-details',
  templateUrl: 'anime-details.html',
})
export class AnimeDetailsPage {
  anime: Anime;
  newComment: string = '';
  comments: string[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private animeService: AnimeService
  ) {
    this.anime = this.navParams.get('anime'); // carregar os dados de acordo com o item clicado na navegação anterior 
    if (this.anime) { // fazer a verificação no LocalStorage do navegador se o anime correspondente clicado possui algum comentário
      this.comments = JSON.parse(localStorage.getItem(`comments_${this.anime.id}`) || '[]'); // Para carregar o comentario do id do anime específico 
    }
  }

  editAnime() {  // método responsavel por fazer a alteração nos dados do anime 
    let modal = this.modalCtrl.create(EditAnimeModalComponent, { anime: this.anime }); // Responsavel por carregar esse modal
    
    modal.onDidDismiss(data => { // Visualizar as alterações feitas no modal
      if (data) { // verificação por dados
        if (data.role === 'delete') { // Caso aperta o botao X ele fecha o modal
          this.deleteAnime(data.anime);
        } else if (data.anime) { // Caso altere os dados
          this.anime = data.anime;  // Os dados alterados e substituir nos dados antigos
        }
      }
    });
  
    modal.present();
  }

  confirmDelete() { // metodo para mostrar o dialog para confirmar a exclusão do anime
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você tem certeza que deseja excluir este anime?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          cssClass: 'alert-danger-button',
          handler: () => {  // caso aperte no botao "excluir" chama o metodo de deletar o anime
            this.deleteAnime(this.anime);
          }
        }
      ]
    });

    alert.present();
  }

  deleteAnime(anime: Anime) { // metodo de deletar o anime
    this.animeService.deleteAnimeById(anime.id);
    this.navCtrl.pop(); // Volta para a página anterior
  }

  addComment() { // meotodo que adiciona o comentário para o anime especifico
    if (this.newComment.trim().length > 0) {
      this.comments.push(this.newComment); // adiciona o comentario e salva no array "comments"
      this.newComment = '';
      localStorage.setItem(`comments_${this.anime.id}`, JSON.stringify(this.comments));  // Atribuo o comentario criado ao id do anime e guardo no LocalStorage do navegador
    }
  }
}
