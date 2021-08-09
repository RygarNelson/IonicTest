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

  private async savePicture(imageData){
    let imageName = imageData.split('/').pop();
    let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
    this.file.readAsDataURL(path, imageName).then(
      (base64File) => {
        this.convertToBlobImage(base64File.replace('data:image/jpeg;base64,','')).then(
          (blobImage) => {
            console.log(blobImage);
            let fileName = new Date().getTime() + '.jpeg';
            this.file.writeFile('', fileName, blobImage, {replace: true}).then(
              (fileWritten) => {
                console.log(fileWritten)
              },
              (error) => {
                console.log("Errore scrittura file");
                console.log(error);
              }
            );
          },
          (error) => {
            console.log("Errore conversione Blob");
            console.log(error);
          }
        );
      },
      (error) => {
        console.log("Errore lettura immagine");
        console.log(error);
      }
    )
  }

  private async convertToBlobImage(base64File){
    const base64Response = await fetch(`data:image/jpeg;base64,${base64File}`);
    return await base64Response.blob();
  }
}
