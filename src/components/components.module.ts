import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw';
@NgModule({
	declarations: [CanvasDrawComponent],
	imports: [
		IonicModule
	],
	exports: [CanvasDrawComponent]
})
export class ComponentsModule {}
