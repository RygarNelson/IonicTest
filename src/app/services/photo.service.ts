import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable({
  providedIn: 'root',
})

export class PhotoService {
  /** Opzioni per la fotocamera */
  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera) { }

  /**Metodo che salva una foto quando viene scattata */
  public async addNewPhotoToGallery(){
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        console.log(imageData);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
