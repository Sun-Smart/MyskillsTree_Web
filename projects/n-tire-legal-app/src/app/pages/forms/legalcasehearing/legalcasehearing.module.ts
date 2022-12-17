import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './legalcasehearing.routing';
import { legalcasehearingComponent } from './legalcasehearing.component';
import { legalcasehearingdetailnoteComponent } from '../legalcasehearingdetailnote/legalcasehearingdetailnote.component';
import { boexpenseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [legalcasehearingComponent,boexpenseComponent,legalcasehearingdetailnoteComponent],
entryComponents:[boexpenseComponent,legalcasehearingdetailnoteComponent]
                        })
export class legalcasehearingModule { }
