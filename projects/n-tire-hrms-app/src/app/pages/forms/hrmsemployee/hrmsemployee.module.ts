import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployee.routing';
import { hrmsemployeeComponent } from './hrmsemployee.component';

import { hrmsemployeetraveldocumentModule } from '../hrmsemployeetraveldocument/hrmsemployeetraveldocument.module';
import { hrmsemployeedocumentModule } from '../hrmsemployeedocument/hrmsemployeedocument.module';
import { hrmsemployeepresentationModule } from '../hrmsemployeepresentation/hrmsemployeepresentation.module';
import { hrmsemployeerewardModule } from '../hrmsemployeereward/hrmsemployeereward.module';
import { hrmsemployeemembershipdetailModule } from '../hrmsemployeemembershipdetail/hrmsemployeemembershipdetail.module';
import { hrmsemployeeeducationModule } from '../hrmsemployeeeducation/hrmsemployeeeducation.module';
import { hrmsemployeecareerModule } from '../hrmsemployeecareer/hrmsemployeecareer.module';
import { hrmsemployeeskillModule } from '../hrmsemployeeskill/hrmsemployeeskill.module';
import { hrmsemployeelanguageskillModule } from '../hrmsemployeelanguageskill/hrmsemployeelanguageskill.module';
import { hrmsemployeechecklistModule } from '../hrmsemployeechecklist/hrmsemployeechecklist.module';
import { hrmsemployerchecklistModule } from '../hrmsemployerchecklist/hrmsemployerchecklist.module';
import { hrmsemployeekraModule } from '../hrmsemployeekra/hrmsemployeekra.module';
import { hrmsemployeememoModule } from '../hrmsemployeememo/hrmsemployeememo.module';
import { hrmsemployeetransferModule } from '../hrmsemployeetransfer/hrmsemployeetransfer.module';
import { hrmsemployeelettermanagementModule } from '../hrmsemployeelettermanagement/hrmsemployeelettermanagement.module';
import { hrmsemployeeinfrarequestmasterModule } from '../hrmsemployeeinfrarequestmaster/hrmsemployeeinfrarequestmaster.module';
import { hrmsemployeestationaryrequestModule } from '../hrmsemployeestationaryrequest/hrmsemployeestationaryrequest.module';

import { hrmsemployeemonthlysalarymasterModule } from '../hrmsemployeemonthlysalarymaster/hrmsemployeemonthlysalarymaster.module';
import { hrmspascheduleModule } from '../hrmspaschedule/hrmspaschedule.module';
//import { ToastModule } from 'primeng/toast';
//import { hrmsemployeemonthlysalarymasterComponent } from '../hrmsemployeemonthlysalarymaster/hrmsemployeemonthlysalarymaster.module';

@NgModule({
  exports: [
    NgCommonModule,
    //   ToastModule,
    //hrmsemployeemonthlysalarymasterComponent
  ],
  imports: [boreportviewerModule,

    NgCommonModule,
    //ToastModule,
    hrmspascheduleModule,
    hrmsemployeemonthlysalarymasterModule, hrmsemployeetraveldocumentModule, hrmsemployeedocumentModule, hrmsemployeepresentationModule, hrmsemployeerewardModule,
    hrmsemployeemembershipdetailModule, hrmsemployeeeducationModule, hrmsemployeecareerModule, hrmsemployeeskillModule,
    hrmsemployeelanguageskillModule, hrmsemployeechecklistModule, hrmsemployerchecklistModule, hrmsemployeekraModule,
    hrmsemployeememoModule, hrmsemployeetransferModule, hrmsemployeelettermanagementModule, hrmsemployeeinfrarequestmasterModule,
    hrmsemployeestationaryrequestModule,

    routing,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    hrmsemployeeComponent,
    /* hrmsemployeetraveldocumentComponent,  hrmsemployeedocumentComponent,hrmsemployeepresentationComponent,hrmsemployeerewardComponent,
     hrmsemployeemembershipdetailComponent,hrmsemployeeeducationComponent,hrmsemployeecareerComponent,hrmsemployeeskillComponent,
     hrmsemployeelanguageskillComponent,hrmsemployeechecklistComponent,hrmsemployerchecklistComponent,hrmsemployeekraComponent,
     hrmsemployeememoComponent,hrmsemployeetransferComponent,hrmsemployeelettermanagementComponent,hrmsemployeeinfrarequestmasterComponent,
     hrmsemployeestationaryrequestComponent,*/
    //hrmspascheduleComponent
    //hrmsemployeemonthlysalarymasterComponent

  ],
  entryComponents: [

    /*hrmsemployeetraveldocumentComponent,hrmsemployeedocumentComponent,hrmsemployeepresentationComponent,hrmsemployeerewardComponent,
    hrmsemployeemembershipdetailComponent,hrmsemployeeeducationComponent,hrmsemployeecareerComponent,hrmsemployeeskillComponent,
    hrmsemployeelanguageskillComponent,hrmsemployeechecklistComponent,hrmsemployerchecklistComponent,hrmsemployeekraComponent,
    hrmsemployeememoComponent,hrmsemployeetransferComponent,hrmsemployeelettermanagementComponent,hrmsemployeeinfrarequestmasterComponent,
    hrmsemployeestationaryrequestComponent,*/
    //hrmspascheduleComponent,
    //hrmsemployeemonthlysalarymasterComponent

  ]
})
export class hrmsemployeeModule { }
