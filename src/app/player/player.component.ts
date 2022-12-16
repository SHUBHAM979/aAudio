import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';
import { CloudService } from '../cloud.service';
import { StreamState } from '../stream-state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public state!: StreamState;
  constructor(private audioService : AudioService, private cloudService : CloudService) { 
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });
    
    
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });

  }

  ngOnInit(): void {
  }


  files: Array<any> = [
    
  ];
  
  currentFile: any = {};

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }
  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  playStream(url : string) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file: any, index: number) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }
  previoussong() { const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);}
  play(){
    this.audioService.play();
  }
  pause(){
    this.audioService.pause();
  }
  nextsong(){
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);

  }
  stop() {
    this.audioService.stop();
  }

}
