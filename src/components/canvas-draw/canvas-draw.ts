import { Component, ViewChild, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {
  photo: any;
  @Input() set funcion(funcion: string){
    console.log(funcion);
    if(funcion != ''){
      this.addImageOnCanvas(funcion);
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
  foto: any;

  constructor(public events: Events) {
    this.foto = 'assets/img/iconos/sombrero.png';
  }

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasJC.nativeElement);
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
    let textString = this.textString;
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
      // this.selectItemAfterAdded(image);
    });
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
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
