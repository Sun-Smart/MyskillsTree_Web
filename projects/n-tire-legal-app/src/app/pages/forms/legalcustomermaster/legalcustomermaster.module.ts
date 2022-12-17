import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './legalcustomermaster.routing';
import { legalcustomermasterComponent } from './legalcustomermaster.component';
import { legalopponentmasterComponent } from '../legalopponentmaster/legalopponentmaster.component';
import { bocontactComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [legalcustomermasterComponent, legalopponentmasterComponent,bocontactComponent],
  entryComponents: [legalopponentmasterComponent,bocontactComponent]
})
export class legalcustomermasterModule { }
