import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../appcommon.module';
import { boreportviewerModule } from '../boreportviewer/boreportviewer.module';
import { routing } from './bomeetingreminder.routing';
import { bomeetingreminderComponent } from './bomeetingreminder.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [bomeetingreminderComponent]
                        })
export class bomeetingreminderModule { }
