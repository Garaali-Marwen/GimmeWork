import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Candidat} from "../Entity/Candidat";
import {Image} from "../Entity/Image";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImage(candidat: Candidat){
    const candidatImage: any[] = candidat.images;
    const candidatImageToImage: Image[] = [];

    for (let i=0; i<candidatImage.length; i++){
      const imageFileData = candidatImage[i];
      const imageBlob = this.dataURItoBlob(imageFileData.imageBytes, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.nom, {type: imageFileData.type});
      const imageFinal: Image = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      candidatImageToImage.push(imageFinal);
    }

    candidat.images = candidatImageToImage;
    return candidat;

  }

  public dataURItoBlob(imageBytes: any, imageType: any){
    const byteString = window.atob(imageBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }

}
