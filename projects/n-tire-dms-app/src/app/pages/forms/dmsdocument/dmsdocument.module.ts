import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './dmsdocument.routing';
import { dmsdocumentComponent } from './dmsdocument.component';
import { dmssubscriptionModule } from '../dmssubscription/dmssubscription.module';
import { dmsarchiverestorerequestModule } from '../dmsarchiverestorerequest/dmsarchiverestorerequest.module';
import { dmsaudittrailModule } from '../dmsaudittrail/dmsaudittrail.module';
import { dmsdocumentfieldModule } from '../dmsdocumentfield/dmsdocumentfield.module';
import { dmslinkeddocumentModule } from '../dmslinkeddocument/dmslinkeddocument.module';
import { dmslinkModule } from '../dmslink/dmslink.module';

                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule,dmssubscriptionModule,dmsarchiverestorerequestModule,dmsaudittrailModule,dmsdocumentfieldModule,dmslinkeddocumentModule,dmslinkModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [dmsdocumentComponent]
                        })
export class dmsdocumentModule { }
