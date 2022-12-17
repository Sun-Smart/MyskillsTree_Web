import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './pmsproperty.routing';
import { pmspropertyComponent } from './pmsproperty.component';

import { pmspropertydocumentModule } from '../pmspropertydocument/pmspropertydocument.module';
import { pmspropertyimageModule } from '../pmspropertyimage/pmspropertyimage.module';
import { pmsleaseModule } from '../pmslease/pmslease.module';
import { pmspropertyunitModule } from '../pmspropertyunit/pmspropertyunit.module';

import { pmspropertycontactModule } from '../pmspropertycontact/pmspropertycontact.module';
import { pmspropertyopexdetailModule } from '../pmspropertyopexdetail/pmspropertyopexdetail.module';
import { pmspropertyassetModule } from '../pmspropertyasset/pmspropertyasset.module';


import { pmsworkorderModule } from '../pmsworkorder/pmsworkorder.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule, pmsworkorderModule,pmsleaseModule,pmspropertycontactModule,pmspropertyopexdetailModule,pmspropertyassetModule, pmspropertydocumentModule, pmspropertyimageModule, pmspropertyunitModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [pmspropertyComponent],
  entryComponents: []
})
export class pmspropertyModule { }
//pmspropertyinsuranceComponent,pmspropertyunitComponent,pmsleaseComponent