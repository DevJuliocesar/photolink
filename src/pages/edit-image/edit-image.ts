import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController } from 'ionic-angular';
import 'fabric';
declare const fabric: any;

@IonicPage()
@Component({
  selector: 'page-edit-image',
  templateUrl: 'edit-image.html',
})
export class EditImagePage {

  @ViewChild('myCanvas') canvasJC: any;

  openMenu = false;

  private canvas;
  private datoW: any;
  private datoH: any;

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
    public platform: Platform
  ) {}

  ngAfterContentInit() {
    this.canvas = new fabric.Canvas(this.canvasJC.nativeElement);
    this.datoH = this.platform.height() - 56;
    this.datoW = this.platform.width();
    this.canvas.setWidth(this.platform.width());
    this.canvas.width = this.platform.width();
    this.canvas.setHeight(this.datoH);
    this.canvas.height = this.datoH;

    if (this.navParams.get('photo')) {
      let foto = this.navParams.get('photo')
      this.canvas.setBackgroundImage(foto, this.canvas.renderAll.bind(this.canvas), {
        originX: 'left',
        originY: 'top'
      });
    }
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

  saveDrawing(){
    let drawing = this.canvas.toDataURL();
    this.navCtrl.push('HomePage', {foto : drawing});
    this.viewCtrl.dismiss();
  }

}
