import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpfapayment.routing';
import { erpfapaymentComponent } from './erpfapayment.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [erpfapaymentComponent]
                        })
export class erpfapaymentModule { }
