import { Component, ViewChild, Input } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {
  photo: any;
  @Input() set sticker(sticker: string){
    if(sticker){
      this.addImageOnCanvas(sticker);
    }
  };
  @Input() set imagen(imagen: string){
    this.photo = imagen;
  };
  @ViewChild('myCanvas') canvasJC: any;

  CanvasElement: any;
  text: string;
  private canvas;
  private textString: string;

  constructor(public events: Events, public platform: Platform) {
  }

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasJC.nativeElement);
    this.canvas.setWidth(this.platform.width());
    console.log(this.platform.height());
    this.canvas.setHeight(this.platform.height());
  }

  addFigure(){
    let boundBox = new fabric.Rect({
      left: 10,
      top: 10,
      width: 50,
      height: 50,
      fill: 'red',
      stroke: '#666',
      strokeDashArray: [5, 5]
    });
    this.canvas.add(boundBox);
  }

  addText() {
    let text = new fabric.IText('hola', {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.textString = '';
  }

  addImageOnCanvas(imagen) {
    fabric.Image.fromURL(imagen, (image) => {
      image.scale(0.3).set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornersize: 10,
        hasRotatingPoint: true
      });
      this.extend(image, this.randomId());
      this.canvas.add(image);
    });
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }
  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

}
