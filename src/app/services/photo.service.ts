import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { IPhoto } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})

/*
https://stackoverflow.com/questions/52055126/not-allowed-to-load-local-resource-ionic-3-android/55934321#55934321
https://stackoverflow.com/questions/48878116/convert-cordova-image-picker-results-to-base64-format-ionic
*/
export class PhotoService {
  /**Array contenente le foto scattate */
  public photos: IPhoto[] = [];

  /**Variabile che identifica la finestra corrente */
  private win: any = window;

  /**Opzioni per la fotocamera */
  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera, private file: File) { }

  /**Metodo che salva una foto quando viene scattata */
  public async addNewPhotoToGallery(){
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        this.photos.unshift({
          filepath: 'edai',
          webviewPath: imageData,
          convertedFileSrc: this.win.Ionic.WebView.convertFileSrc(imageData)
        });
        this.savePicture(imageData);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private async savePicture(imagePath){
    var sourceDirectory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
    var sourceFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
    this.file.copyFile(sourceDirectory, sourceFileName, this.file.dataDirectory, sourceFileName).then(
      (savedImage) => {
        console.log(savedImage);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
