import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

/*
https://stackoverflow.com/questions/46048904/no-provider-for-camera-injectionerror
https://forum.ionicframework.com/t/native-storage-error-plugin-not-installed/68014
*/
export class Tab2Page implements OnInit{

  constructor(public photoService: PhotoService, public platform: Platform) {}

  ngOnInit(): void {
    this.platform.ready().then(
      () => {
        this.photoService.loadSaved();
      },
      (error) => {
        console.log('Errore caricamento piattaforma');
        console.log(error);
      }
    );
  }

  public addPhotoToGallery(){
    this.photoService.addNewPhotoToGallery();
  }

}
