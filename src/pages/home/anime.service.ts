import { Injectable } from '@angular/core';

export interface Anime {
  id: number;
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
}

@Injectable()
export class AnimeService {
  private animes: Anime[] = [
    {
      id: 1,
      title: 'Jujutsu Kaisen',
      rating: 10,
      description: 'Jujutsu Kaisen é uma história épica sobre um estudante colegial chamado Yuji Itadori que é transformado quando acidentalmente liberta uma maldição de um artefato amaldiçoado. A história começa quando Yuji se inscreve no Clube de Ocultismo e, juntamente com os seus colegas, encontra um objeto amaldiçoado e remove o selo, o que atrai criaturas sobrenaturais chamadas de "maldições". Yuji torna-se um aprendiz de feiticeiro e aprende a combater as maldições e a proteger os seus amigos.',
      imageUrl: '../../assets/imgs/jujutsu.jpg'
    },
    {
      id: 2,
      title: 'Attack on Titan',
      rating: 9,
      description: 'Shingeki no Kyojin (Attack on Titan) é uma série de anime que se passa num mundo onde a humanidade vive em cidades cercadas por muralhas para se proteger dos Titãs, gigantescos humanoides que devoram humanos. A história segue Eren Jaeger, que jura exterminar os Titãs depois de um Titã destruir a sua cidade natal e matar a sua mãe. Eren junta-se à Survey Corps, um grupo de soldados que lutam contra os Titãs, e treina com os melhores da Survey para ter a oportunidade de lutar contra os Titãs e investigar a sua origem e história. ',
      imageUrl: '../../assets/imgs/aot.jpg'
    },
    {
      id: 3,
      title: 'One Piece',
      rating: 8.5,
      description: 'One Piece é uma série de anime e mangá japonesa que conta a história de Monkey D. Luffy, um jovem que sonha em se tornar o Rei dos Piratas. Luffy ganha poderes de borracha depois de comer uma fruta do diabo, a Gomu Gomu no Mi, e reúne uma tripulação para procurar o One Piece, o tesouro mais procurado do mundo. O One Piece é o tesouro que o Rei dos Piratas Gol D. Roger ganhou e que se diz estar localizado na ilha final da Grand Line, Laugh Tale. ',
      imageUrl: '../../assets/imgs/onepiece.png'
    },
    {
      id: 4,
      title: 'Hunter x Hunter',
      rating: 9.5,
      description: 'Hunter x Hunter é uma série de anime e mangá que conta a história de Gon Freecss, um rapaz de 12 anos que sonha em se tornar um Hunter, um caçador de tesouros, artefatos místicos e criaturas estranhas. Gon quer seguir o legado do seu pai, o lendário Hunter Ging Freecss, que o deixou quando era criança. Ao descobrir que o pai está vivo, Gon sai em busca dele, conhecendo ao longo do caminho outros jovens com as mesmas aspirações, como Killua, Kurapika e Leorio. Juntos, embarcam em aventuras emocionantes e perigosas.  ',
      imageUrl: '../../assets/imgs/hunterhunter.jpg'
    }
  ];

  getAnimes(): Anime[] {
    return this.animes; // retorna todo o array de animes 
  }

  deleteAnime(anime: Anime) { // metodo que passa por parâmetro um elemento especifico do array 
    this.animes = this.animes.filter(a => a.id !== anime.id); // o metodo filter do proprio array para buscar o anime correspondente com o do parametro
  }

  deleteAnimeById(id: number) { // metodo que passa somente o numero (id) do anime
    this.animes = this.animes.filter(a => a.id !== id); // busca no array de anime o elemento correspondente com o id fornecido
  }

  addAnime(anime: Anime) { // metodo que adiciona anime no array
    this.animes.push(anime); // metodo push para adicionar o anime no array
  }

  getNextId(): number { // metodo auxiliar para garantir que o proximo elemento criado será com o id subsequente ao anterior
    return this.animes.length > 0 ? Math.max(...this.animes.map(a => a.id)) + 1 : 1;
  }
}
