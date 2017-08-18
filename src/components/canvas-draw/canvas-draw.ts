import { Component, ViewChild, Input } from '@angular/core';
import { Events, Platform, AlertController } from 'ionic-angular';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {
  foto: any;
  @Input() set sticker(sticker: string) {
    if (sticker) {
      this.addImageOnCanvas(sticker);
    }
  };
  @Input() set imagen(imagen: string) {
    if (imagen) {
      this.foto = imagen;
    }
  };
  @Input() set borrar(borrar: string) {
    if (borrar) {
      this.undoLastObject();
    }
  };
  @ViewChild('myCanvas') canvasJC: any;

  CanvasElement: any;
  text: string;
  private canvas;
  private textString: string;
  datoW: any;
  datoH: any;

  constructor(public events: Events, public platform: Platform, private alertCtrl: AlertController) {
  }

  ngAfterContentInit() {
    this.canvas = new fabric.Canvas(this.canvasJC.nativeElement);
    this.datoH = this.platform.height() - 56;
    this.datoW = this.platform.width();
    this.canvas.setWidth(this.platform.width());
    this.canvas.width = this.platform.width();
    this.canvas.setHeight(this.datoH);
    this.canvas.height = this.datoH;

    if (this.foto) {

      this.canvas.setBackgroundImage(this.foto, this.canvas.renderAll.bind(this.canvas), {
        originX: 'left',
        originY: 'top'
      });
      this.presentAlert();
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Edición',
      subTitle: 'Esta en modo edición su imagen',
      buttons: [{
        text: 'Cerrar',
        handler: () => {
          this.canvas.backgroundImage.scaleToHeight(this.datoH);
        }
      }]
    });
    alert.present();
  }


  addFigure() {
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

  undoLastObject() {
    let canvas_objects = this.canvas._objects;
    let last = canvas_objects[canvas_objects.length - 1];
    this.canvas.remove(last);
    this.canvas.renderAll();
  }

}
