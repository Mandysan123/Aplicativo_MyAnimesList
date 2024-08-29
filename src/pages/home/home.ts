import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalComponent } from '../modal/modal'; 
import { AnimeService } from './anime.service';
import { AnimeDetailsPage } from '../anime-details/anime-details';

export interface Anime {
  id: number;
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animes: Anime[] = []; // array respoonsável por trazer todos os dados do array animes
  searchTerm: string = ''; // atributo responsavel por guardar o valor do input
  filteredAnimes: Anime[] = []; // array responsavel por renderizar os animes filtrados na tela 

  constructor( // injeção de dependencias 
    private modalCtrl: ModalController, // instância da classe ModalController do ionic para renderizar o Modal
    private navCtrl: NavController, // instância da classe NavController do ionic para fazer a navegação de páginas
    private animeService: AnimeService // instância da classe feita para abstrair a lógica de manipulação de arrays
  ) {}

  ionViewWillEnter() {  // Método que visualiza cada alteração e renderiza na tela (Após adicionar animes ou excluir)
    this.initializeAnimes();
  }

  initializeAnimes() {  // Método que busca e lista todos os animes
    this.animes = this.animeService.getAnimes();
    this.filterAnimes();
  }

  deleteAnime(anime: Anime) {
    this.animeService.deleteAnime(anime); // Chama o metodo do service de deletar o anime
    this.initializeAnimes();  // Atualiza a lista após exclusão
    this.filterAnimes();       // Filtra a lista atualizada
  }

  filterAnimes() {  // método responsável por filtrar animes
    if (this.searchTerm.trim() === '') { // caso esteja vazio não projeta alteração na página 
      this.filteredAnimes = this.animes;
    } else {
      this.filteredAnimes = this.animes.filter(anime =>  // Caso tenha alteração, transforma em minúsculo e faz o filtro utilizando o metodo filter do proprio array, e coloca o resultado no atributo auxiliar filteredAnimes
        anime.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openModal() {  // metodo responsavel para fazer o carregamento do modal
    let modal = this.modalCtrl.create(ModalComponent);  // utilizando o proprio metodo do ModalController do ionic para fazer a renderização do componente
    modal.present();

    modal.onDidDismiss(data => {
      if (data && data.confirm) {
        this.initializeAnimes();  // Atualiza a lista de animes
        this.filterAnimes();      // Filtra a lista de animes atualizada
      }
    });
  }

  openAnimeDetails(anime: Anime) {  // método responsável por fazer a navegação para um outro componente
    this.navCtrl.push(AnimeDetailsPage, { anime }); // chama o metodo push do navController passando como parâmentro a classe do Componente, juntamento com o dado do anime clicado
  }
}
