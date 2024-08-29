import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AnimeService } from '../pages/home/anime.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalComponent } from '../pages/modal/modal'; 
import { AnimeDetailsPage } from '../pages/anime-details/anime-details';
import { EditAnimeModalComponent } from '../pages/edit-anime-modal/edit-anime-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalComponent,
    AnimeDetailsPage,
    EditAnimeModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalComponent,
    AnimeDetailsPage,
    EditAnimeModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AnimeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
