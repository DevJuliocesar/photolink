import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  private canvas;
  private paleta;

  colors: any = [
      {color: "#ecf0f1"},
      {color: "#95a5a6"},
      {color: "#7f8c8d"},
      {color: "#000000"},
      {color: "#F1A9A0"},
      {color: "#D2527F"},
      {color: "#f1c40f"},
      {color: "#f39c12"},
      {color: "#e67e22"},
      {color: "#d35400"},
      {color: "#e74c3c"},
      {color: "#c0392b"},
      {color: "#6D4C41"},
      {color: "#3E2723"},
      {color: "#1abc9c"},
      {color: "#16a085"},
      {color: "#2ecc71"},
      {color: "#27ae60"},
      {color: "#3498db"},
      {color: "#2980b9"},
      {color: "#34495e"},
      {color: "#2c3e50"},
      {color: "#9b59b6"},
      {color: "#8e44ad"},
  ];

  constructor(private navParams: NavParams, public viewCtrl: ViewController) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.canvas = this.navParams.data.contentEle;
      this.paleta = this.navParams.data.iconPaleta;
    }
  }

  changeBackground(color: any) {
    this.paleta.style.color = color;
    this.canvas.freeDrawingBrush.color = color;
    this.viewCtrl.dismiss();
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

}
