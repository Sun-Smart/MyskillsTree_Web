import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../appcommon.module';
import { boreportviewerModule } from '../boreportviewer/boreportviewer.module';
import { routing } from './bodatamaskingrolerestrict.routing';
import { bodatamaskingrolerestrictComponent } from './bodatamaskingrolerestrict.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [bodatamaskingrolerestrictComponent]
                        })
export class bodatamaskingrolerestrictModule { }
