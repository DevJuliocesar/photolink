import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController, AlertController, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
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
    public platform: Platform,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) { }

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
    this.canvas.backgroundImage.scaleToHeight(this.datoH);
    fabric.Image.fromURL(imagen, (image) => {
      image.scale(0.2).set({
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