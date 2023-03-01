import { BOReportViewerService } from '../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service';
import {  Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
@Component({
  selector: 'app-boformviewer',
  templateUrl: './boformviewer.component.html',
  styles: []
})

export class boformviewerComponent implements OnInit {
  isSubmitted: boolean = false;
  data: any;
  formid: any;
  configdata: any;
  results: any;
  viewhtml: any;
  pk: any
  constructor(
    private router: Router,
    private boreportviewerservice: BOReportViewerService, private sharedService: SharedService,
    private currentRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let boformviewer = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.reportid != null) {
      boformviewer = this.data.reportid;
    }
    else
      boformviewer = this.currentRoute.snapshot.paramMap.get('id');
    this.pk = this.currentRoute.snapshot.paramMap.get('pk');
    this.formid = boformviewer;
    this.sharedService.alert('4');
    this.boreportviewerservice.getBOReportResultsByID(boformviewer, null, null, null, null, status, null, null, this.pk).then((res: any) => {
      this.configdata = res.boreport;
      this.results = res.results;
      let rowData = this.results[0];
      this.viewhtml = this.configdata.viewhtml;

      let cols = res.boreportcolumn;
      cols.forEach((col: any) => {
        if (this.viewhtml != null && this.viewhtml != undefined) this.viewhtml = this.viewhtml.replace(new RegExp('##' + col.field + '##', 'g'), rowData[col.field]);
      });
    });

  }

  route(action, recordid = null) {
    let formname = "";
    recordid = this.pk;
    this.sharedService.alert(recordid);
    if (action == "edit" && (recordid == null || recordid == "")) {
      this.sharedService.alert("Select a record to edit");
      return;
    }
    if (this.configdata.maintablename == "boreports") {
      formname = "boreports";

    }
    else {
      formname = (this.configdata.component as string);
      if (formname == null || formname == "") {
        formname = (this.configdata.maintablename as string).toLowerCase();
      }
    }


    let child = false;
    switch (action) {

      case 'create':
        this.router.navigate(['/home/' + formname + '/' + formname]);
        break;
      case 'view':
        this.router.navigate(['/home/boreportviewer/view/' + this.configdata.reportid + '/' + recordid]);
        break;
      case 'edit':
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);

        break;
    }

  }
  //end of Grid Codes boformviewer

}



