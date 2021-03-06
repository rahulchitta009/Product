import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  upload(files){
    if(files.length == 0){
      return; 
    }

    const formData = new FormData();

    for(let file of files){
      formData.append(file.name, file);
    }

    const uploadReq = new HttpRequest('POST', 'https://localhost:44368/api/upload', formData, {
      reportProgress: true,
    })

    this.http.request(uploadReq).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress)
         this.progress = Math.round(100 * event.loaded/ event.total);
      else if(event.type === HttpEventType.Response)
         this.message = event.body.toString();
    });
  }

}
