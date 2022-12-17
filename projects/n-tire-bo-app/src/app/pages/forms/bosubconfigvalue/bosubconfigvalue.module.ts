import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../appcommon.module';
import { boreportviewerModule } from '../boreportviewer/boreportviewer.module';
import { routing } from './bosubconfigvalue.routing';
import { bosubconfigvalueComponent } from './bosubconfigvalue.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [bosubconfigvalueComponent]
                        })
export class bosubconfigvalueModule { }
