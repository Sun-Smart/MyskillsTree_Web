import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routinghrmsemployeemonthlysalarymaster } from './hrmsemployeemonthlysalarymaster.routing';
import { hrmsemployeemonthlysalarymasterComponent } from './hrmsemployeemonthlysalarymaster.component';


@NgModule({
  exports: [
    //NgCommonModule,
    hrmsemployeemonthlysalarymasterComponent
  ],
  imports: [boreportviewerModule,
    routinghrmsemployeemonthlysalarymaster,
    NgCommonModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    hrmsemployeemonthlysalarymasterComponent
  ]
})
export class hrmsemployeemonthlysalarymasterModule {
  /*
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: hrmsemployeemonthlysalarymasterModule,
    };
  }
*/
}
