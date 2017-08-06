import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditImagePage } from './edit-image';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditImagePage,
  ],
  imports: [
    IonicPageModule.forChild(EditImagePage),
    ComponentsModule
  ],
})
export class EditImagePageModule {}
