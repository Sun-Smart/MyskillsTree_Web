import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstsegment.routing';
import { mstsegmentComponent } from './mstsegment.component';
import { mstcategoryModule } from '../mstcategory/mstcategory.module';
import { mstsubcategoryModule } from '../mstsubcategory/mstsubcategory.module';

                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],
imports: [boreportviewerModule,
    routing,
    NgCommonModule,mstcategoryModule,mstsubcategoryModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [mstsegmentComponent]
                        })
export class mstsegmentModule { }
