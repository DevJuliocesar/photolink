import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController, AlertController, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import 'fabric';
declare const fabric: any;

@IonicPage()
@Component({
  selector: 'page-edit-image',
  templateUrl: 'edit-image.html',
})
export class EditImagePage {

  @ViewChild('myCanvas', { read: ElementRef }) canvasJC: ElementRef;

  openMenu = false;
  private canvas;

  items = [
    'assets/img/iconos/BARBATUSCA.svg',
    'assets/img/iconos/CEBOLLA.svg',
    'assets/img/iconos/COLUMNA.svg',
    'assets/img/iconos/CUPULA.svg'
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private screenOrientation: ScreenOrientation
  ) { }

  ngAfterContentInit() {

    this.canvas = new fabric.Canvas(this.canvasJC.nativeElement); //Creacion del canvas con fabric
    this.containerResize(); //Redimensionar canvas al contenedor

    if (this.navParams.get('photo')) { // Si es nativo
      this.setBackgroundImageToCanvas(this.navParams.get('photo'));
    } else {      // Si no esm nativo, borrar esto
      this.setBackgroundImageToCanvas('http://i.imgur.com/tENv1w4.jpg');
    }
  }

  containerResize() {
    this.canvas.setWidth(this.platform.width());
    this.canvas.setHeight(this.platform.height() - 112);
    this.canvas.width = this.platform.width();
    this.canvas.height = this.platform.height() - 112;
  }

  setBackgroundImageToCanvas(image) {
    let img = new Image();
    let foto = image;
    img.crossOrigin = "anonymous";
    img.src = foto;
    let canvas = this.canvas;
    img.onload = function () {
      canvas.setBackgroundImage(new fabric.Image(img, {
        scaleY: canvas.width / img.width,
        scaleX: canvas.width / img.width,
        originX: 'left',
        originY: 'top'
      }), canvas.renderAll.bind(canvas));
      if (img.height > 0) {
        canvas.setHeight(img.height * (canvas.width / img.width));
      }
    }
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, {
      contentEle: this.canvas
    });
    popover.present({
      ev: ev
    });
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  goToPopup(data) {
    this.addImageOnCanvas(data);
    this.togglePopupMenu();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  addImageOnCanvas(imagen) {
    // this.canvas.backgroundImage.scaleToHeight(this.datoH);
    fabric.Image.fromURL(imagen, (image) => {
      image.scale(0.2).set({
        left: 10,
        top: 10,
        angle: 0,
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

  deleteAllObject() {
    let canvas_objects = this.canvas._objects;
    let all = canvas_objects;
    console.log(all);
    this.canvas.remove(all);
    this.canvas.renderAll();
  }

  selectDeleteObject() {
    if (this.canvas.getActiveObject()) {
      this.canvas.getActiveObject().remove();
    }
  }

  saveDrawing() {
    let drawing = this.canvas.toDataURL();
    this.navCtrl.push('HomePage', { foto: drawing });
    this.viewCtrl.dismiss();
  }

}