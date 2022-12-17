import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bocall.routing';
import { bocallComponent } from './bocall.component';
import { bocallinviteModule } from '../bocallinvite/bocallinvite.module';
import { bocallreminderModule } from '../bocallreminder/bocallreminder.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bocallinviteModule,bocallreminderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bocallComponent]
})
export class bocallModule { }
