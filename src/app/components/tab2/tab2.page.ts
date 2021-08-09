import { Component } from '@angular/core';

import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

/*
https://stackoverflow.com/questions/46048904/no-provider-for-camera-injectionerror 
*/
export class Tab2Page {

  constructor(public photoService: PhotoService) {}

  public addPhotoToGallery(){
    this.photoService.addNewPhotoToGallery();
  }

}
