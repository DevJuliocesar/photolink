import { Component, ViewChild } from '@angular/core';
import { Events } from 'ionic-angular';
// import * as fabric from 'fabric';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvasJC: any;

  CanvasElement: any;
  text: string;
  private canvas;
  private boundBox;
  private image;

  constructor(public events: Events) {
    events.subscribe('eventado', (image) => {
      this.image = image;
      console.log(this.image);  
  });
  }

  ngAfterViewInit() {

    this.CanvasElement = this.canvasJC.nativeElement;

    this.canvas = new fabric.Canvas(this.CanvasElement); 
    this.boundBox = new fabric.Rect({
      width: 50,
      height: 50,
      fill: 'red',
      stroke: '#666',
      strokeDashArray: [5, 5]
    });
    this.canvas.setBackgroundImage(this.image);
    this.canvas.add(this.boundBox);
    this.canvas.centerObject(this.boundBox);
  }

}
