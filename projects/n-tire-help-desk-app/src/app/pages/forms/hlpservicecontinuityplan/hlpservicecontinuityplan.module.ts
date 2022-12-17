import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hlpservicecontinuityplan.routing';
import { hlpservicecontinuityplanComponent } from './hlpservicecontinuityplan.component';
import { hlpservicecontinuityplandetailComponent } from '../hlpservicecontinuityplandetail/hlpservicecontinuityplandetail.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [hlpservicecontinuityplanComponent,hlpservicecontinuityplandetailComponent],
entryComponents:[hlpservicecontinuityplandetailComponent]
                        })
export class hlpservicecontinuityplanModule { }
