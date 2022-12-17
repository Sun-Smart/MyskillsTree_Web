import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
import { boreport } from '../../../../../../n-tire-biz-app/src/app/model/boreport.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
@Component({
  selector: 'app-bodlgviewer',
  templateUrl: './bodlgviewer.component.html',
  styles: []
})



export class bodlgviewerComponent implements OnInit {

  data: any;
  constructor(
    private router: Router,
    private toastr: ToastService,
    dynamicdata: DynamicDialogConfig,
    //private dialog: NbDialogService,
    private currentRoute: ActivatedRoute) {
    this.data = dynamicdata;
  }


  ngOnInit() {
    debugger;
    let bodlgviewer = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.url != null) {
      // this.router.navigate([this.data.url]);
      //this.data.url
      //this.router.navigateByUrl('/home/camsworkrequests/camsworkrequests');

      //this.router.navigate([{ outlets: { modal: [ 'camsworkrequests' ] }}]);

    }

  }


}



