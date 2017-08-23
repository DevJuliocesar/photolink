import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import 'fabric';
declare const fabric: any;



@Component({
  selector: 'text',
  templateUrl: 'text.html'
})
export class TextComponent {
  private canvas;
  todo = {};
  colors: any = [
    { color: "#ecf0f1" },
    { color: "#95a5a6" },
    { color: "#7f8c8d" },
    { color: "#000000" },
    { color: "#F1A9A0" },
    { color: "#D2527F" },
    { color: "#f1c40f" },
    { color: "#f39c12" },
    { color: "#e67e22" },
    { color: "#d35400" },
    { color: "#e74c3c" },
    { color: "#c0392b" },
    { color: "#6D4C41" },
    { color: "#3E2723" },
    { color: "#1abc9c" },
    { color: "#16a085" },
    { color: "#2ecc71" },
    { color: "#27ae60" },
    { color: "#3498db" },
    { color: "#2980b9" },
    { color: "#34495e" },
    { color: "#2c3e50" },
    { color: "#9b59b6" },
    { color: "#8e44ad" },
  ];

  color: string = '#000';
  background: string = "#ecf0f1";

  constructor(private navParams: NavParams, public viewCtrl: ViewController) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.canvas = this.navParams.data.contentEle;
    }
  }

  logForm() {
    let text = new fabric.IText(this.todo['text'], {
      left: 10,
      top: 30,
      fontFamily: 'helvetica',
      angle: 0,
      fill: this.background,
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.viewCtrl.dismiss();
  }

  changeBackground(color: any) {
    this.background = color;
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
