import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  private canvas;
  constructor(private navParams: NavParams) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.canvas = this.navParams.data.contentEle;
    }
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
