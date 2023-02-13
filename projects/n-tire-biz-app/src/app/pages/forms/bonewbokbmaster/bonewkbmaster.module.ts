import { NgModule } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';
import { SharedService } from 'projects/n-tire-bo-app/src/app/service/shared.service';
import { BonewbokbmasterComponent } from './bonewbokbmaster.component';
import { BonewbokbmasterRoutes } from './bonewbokbmaster.routing';
import { bokbmasterService } from 'projects/n-tire-bo-app/src/app/service/bokbmaster.service';
import { ThemeService } from 'projects/n-tire-bo-app/src/app/pages/core/services/theme.service';

@NgModule({
  imports: [
    NgCommonModule,
    BonewbokbmasterRoutes
  ],
  declarations: [BonewbokbmasterComponent],
  providers:[ThemeService,bokbmasterService,SharedService]
})
export class BonewkbmasterModule { }
