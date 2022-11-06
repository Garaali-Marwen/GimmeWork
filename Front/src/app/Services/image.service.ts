import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Candidat} from "../Entity/Candidat";
import {Image} from "../Entity/Image";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) { }

  public createImage(user: any){
    const userImage: any = user.image;

      const imageFileData = userImage;
      const imageBlob = this.dataURItoBlob(imageFileData.imageBytes, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.nom, {type: imageFileData.type});
      const imageFinal: Image = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }

    user.image = imageFinal;
    return user;

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

  public deleteImage(imageId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/image/delete/${imageId}`);
  }

}
