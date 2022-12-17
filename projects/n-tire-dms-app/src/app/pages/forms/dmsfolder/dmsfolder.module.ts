import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './dmsfolder.routing';
import { dmsfolderComponent } from './dmsfolder.component';
import { dmsdownloadqueueModule } from '../dmsdownloadqueue/dmsdownloadqueue.module';
import { dmslinkedfolderModule } from '../dmslinkedfolder/dmslinkedfolder.module';

                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule,dmsdownloadqueueModule,dmslinkedfolderModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [dmsfolderComponent]
                        })
export class dmsfolderModule { }
