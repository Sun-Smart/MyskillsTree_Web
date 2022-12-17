import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { hrmsmpragency } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsmpragency.model';
import { NgForm } from '@angular/forms';
import { hrmsmanpowerrequestService } from './../../../service/hrmsmanpowerrequest.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";

import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { hrmsrecruitmentagency, IhrmsrecruitmentagencyResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsrecruitmentagency.model';
import { hrmsrecruitmentagencyService } from './../../../service/hrmsrecruitmentagency.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
  selector: 'app-hrmsmpragencies',
  templateUrl: './hrmsmpragency.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class hrmsmpragencyComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  pkcol: any;
  hrmsmpragencyForm: FormGroup;
  agencyidList: hrmsrecruitmentagency[];
  agencyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  agencyid_hrmsrecruitmentagenciesForm: FormGroup;
  agencyid_hrmsrecruitmentagenciesoptions: any;
  agencyid_hrmsrecruitmentagenciesformatter: any;

  viewhtml: any = '';
  showview: boolean = false;
  theme: string = "";
  formdata: any;
  shortcuts: ShortcutInput[] = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  showformtype: any;
  data: any;
  SESSIONUSERID: any;
  sessiondata: any;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentfieldjson: any[] = [];
  attachmentvisible: boolean = true;


  constructor(
    private keyboard: KeyboardShortcutsService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private hrmsmanpowerrequestservice: hrmsmanpowerrequestService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private hrmsrecruitmentagencyservice: hrmsrecruitmentagencyService,

    private currentRoute: ActivatedRoute) {
    this.data = dynamicconfig;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.dialogRef.close(),
        preventDefault: true
      },
      {
        key: 'cmd s',
        command: () => this.onSubmitDataDlg(false),
        preventDefault: true
      },
      {
        key: 'cmd c',
        command: () => this.dialogRef.close(null),
        preventDefault: true
      }
    ]);
    this.hrmsmpragencyForm = this.fb.group({
      pk: [null],
      ImageName: [null],
      mprid: [null],
      raassignid: [null],
      agencyid: [null],
      agencyiddesc: [null],
      assignedquantity: [null],
      startdate: [null],
      completiondate: [null],
      chargesperresource: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.hrmsmpragencyForm.controls; }


  async ngOnInit() {
    this.sessiondata = this.sessionService.getSession();
    if (this.sessiondata != null) {
      this.SESSIONUSERID = this.sessiondata.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');
    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
    if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
    if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
    let ppk = null;
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      ppk = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      this.viewhtml = this.sessionService.getViewHtml();
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.pkcol != null && this.data.pkcol != undefined) ppk = this.data.pkcol;
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.formid = ppk;

    if (this.pkcol == null) {
      this.hrmsmpragencyForm.patchValue({
        startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        completiondate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.hrmsmanpowerrequestservice.hrmsmpragencies.filter(x => (x as any).pkcol == ppk)[0];
      this.hrmsmpragencyForm.patchValue({
        mprid: obj.mprid,
        raassignid: obj.raassignid,
        agencyid: obj.agencyid,
        agencyiddesc: obj.agencyiddesc,
        assignedquantity: obj.assignedquantity,
        startdate: this.ngbDateParserFormatter.parse(obj.startdate as any),
        completiondate: this.ngbDateParserFormatter.parse(obj.completiondate as any),
        chargesperresource: obj.chargesperresource,
        remarks: obj.remarks,
        attachment: obj.attachment,
        status: obj.status,
      });


      if (this.hrmsmpragencyForm.get('attachment')!.value != "" && this.hrmsmpragencyForm.get('attachment')!.value != null && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.hrmsmpragencyForm.get('attachment')!.value));

    }
    this.hrmsrecruitmentagencyservice.gethrmsrecruitmentagenciesList().then((res:any) => {
      this.agencyidList = res as hrmsrecruitmentagency[];
      if (this.formdata && this.formdata.hrmsmpragency && this.formdata.hrmsmpragency.agencyid) {
        this.agencyidoptionsEvent.emit(this.agencyidList);
        this.hrmsmpragencyForm.patchValue({
          agencyid: this.formdata.hrmsmpragency.agencyid,
          agencyiddesc: this.formdata.hrmsmpragency.agencyiddesc,
        });
      }
    }
    );
    this.agencyid_hrmsrecruitmentagenciesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.agencyidList.filter(v => v.agencyname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.agencyid_hrmsrecruitmentagenciesformatter = (result: any) => result.agencyname;
  }

  onSelectedagencyid(agencyidDetail: any) {
    if (agencyidDetail.agencyid && agencyidDetail) {
      this.hrmsmpragencyForm.patchValue({
        agencyid: agencyidDetail.agencyid,
        agencyiddesc: agencyidDetail.agencyname,

      });

    }
  }


  attachmentuploader(e:any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileattachmentlist.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
      max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentfieldjson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }



  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.hrmsmpragencyForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsmpragencyForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.hrmsmpragencyForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.hrmsmpragencyForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.hrmsmpragencyForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.hrmsmpragencyForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.hrmsmpragencyForm.controls[key] != null) {
            obj[key] = this.hrmsmpragencyForm.controls[key]!.value;
          }
        }
      }
    }
    obj.startdate = this.ngbDateParserFormatter.format(this.hrmsmpragencyForm.get('startdate')!.value);
    obj.completiondate = this.ngbDateParserFormatter.format(this.hrmsmpragencyForm.get('completiondate')!.value);
    obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
    obj.fileattachmentlist = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.fileattachmentlist);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.dialogRef.close(obj);
  }

  PopulateFromMainScreen(mainscreendata:any, bdisable:any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "startdate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "completiondate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.hrmsmpragencyForm.controls[key] != null) {
              this.hrmsmpragencyForm.patchValue(json);
              if (bdisable) this.hrmsmpragencyForm.controls[key].disable({ onlySelf: true });
            }
          }
        }
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmitAndWait() {
    this.onSubmitDataDlg(false);
  }
  onSubmit() {
    this.onSubmitDataDlg(true);
  }
  agencyidonChange(evt:any) {
    let e = evt!.value;
  }

  AddOrEditagencyid(raid) {
    let ScreenType = '2';
    /*this.dialog.open(hrmsrecruitmentagencyComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.hrmsrecruitmentagencyservice.gethrmsrecruitmentagenciesList().then((res:any) => this.agencyidList = res as hrmsrecruitmentagency[]);
    });*/
  }


}


