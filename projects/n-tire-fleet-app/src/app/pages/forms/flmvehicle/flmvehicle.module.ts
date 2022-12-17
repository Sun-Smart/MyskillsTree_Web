import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './flmvehicle.routing';
import { flmvehicleComponent } from './flmvehicle.component';
import { flmaccidentComponent } from './flmaccident.component';
import { flmassignmentComponent } from './flmassignment.component';
import { flmexpenseComponent } from './flmexpense.component';
import { flminspectionComponent } from './flminspection.component';
import { flminsuranceComponent } from './flminsurance.component';
import { flmvehicleissueComponent } from './flmvehicleissue.component';

import { flmservicerequestComponent } from '../flmservicerequest/flmservicerequest.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [flmvehicleComponent, flmaccidentComponent, flmservicerequestComponent, flmassignmentComponent, flmexpenseComponent, flminspectionComponent, flminsuranceComponent, flmvehicleissueComponent],
  entryComponents: [flmaccidentComponent, flmassignmentComponent, flmservicerequestComponent, flmexpenseComponent, flminspectionComponent, flminsuranceComponent, flmvehicleissueComponent]
})
export class flmvehicleModule { }
