import { Injectable, OnInit } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { IPhoto } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})

/*
https://stackoverflow.com/questions/52055126/not-allowed-to-load-local-resource-ionic-3-android/55934321#55934321
https://dbwriteups.wordpress.com/2015/09/19/saving-images-to-app-storage-in-ionic-using-ngcordova/
*/
export class PhotoService {
  /**Array contenente le foto scattate */
  public photos: IPhoto[] = [];
  private PHOTO_STORAGE: string = "photos";

  /**Variabile che identifica la finestra corrente */
  private win: any = window;

  /**Opzioni per la fotocamera */
  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera, private file: File, private nativeStorage: NativeStorage) { }

  /**Metodo che salva una foto quando viene scattata */
  public async addNewPhotoToGallery(){
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        this.savePicture(imageData).then(
          (savedImage) => {
            this.photos.unshift({
              filepath: savedImage.nativeURL,
              convertedFileSrc: this.win.Ionic.WebView.convertFileSrc(savedImage.nativeURL)
            });
            this.nativeStorage.setItem(this.PHOTO_STORAGE, this.photos).then(
              () => {
                console.log("Salvataggio su memoria permanente effettuato");
              },
              (error) => {
                console.log("Errore salvataggio permanente su memoria interna");
                console.log(error);
              }
            )
          },
          (error) => {
            console.log("Errore salvataggio foto su memoria interna");
            console.log(error);
          }
        );
      },
      (error) => {
        console.log("Errore lettura foto da fotocamera");
        console.log(error);
      }
    );
  }

  public async loadSaved() {
    this.nativeStorage.getItem(this.PHOTO_STORAGE).then(
      (photoList) => {
        this.photos = photoList;
      },
      (error) => {
        console.log("Errore lettura files");
        console.log(error);
      }
    );
  }

  /**Salvataggio foto su memoria interna del dispositivo */
  private async savePicture(imagePath){
    var sourceDirectory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
    var sourceFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
    return this.file.copyFile(sourceDirectory, sourceFileName, this.file.dataDirectory, sourceFileName);
  }
}
