import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw';
import { PopoverComponent } from './popover/popover';
@NgModule({
	declarations: [CanvasDrawComponent,
    PopoverComponent],
	imports: [
		IonicModule
	],
	exports: [CanvasDrawComponent,
    PopoverComponent]
})
export class ComponentsModule {}
