import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  list: any = [];

  public constructor(private service: VideosService) { }

  ngOnInit() {
    this.service.getVideos().subscribe((data) => {
      this.list = data;
      console.log(this.list)
    })
  }


  redirect(video: any): void {
    // Atualizar os views no backend
    const updatedVideo = { ...video, views: video.views + 1 };

    this.service.updateVideo(updatedVideo.id, updatedVideo).subscribe(() => {
      // Atualizar o valor no frontend localmente
      const index = this.list.findIndex((v: any) => v.id === video.id);
      if (index !== -1) {
        this.list[index].views = updatedVideo.views;
      }

      // Abrir o link em uma nova aba
      window.open(video.link, '_blank');
    });
  }

}
