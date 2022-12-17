import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { hrmsapplicantcareer } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsapplicantcareer.model';
import { NgForm } from '@angular/forms';
import { hrmsapplicantmasterService } from './../../../service/hrmsapplicantmaster.service';
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
import { bouserrolemaster, IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
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
  selector: 'app-hrmsapplicantcareers',
  templateUrl: './hrmsapplicantcareer.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class hrmsapplicantcareerComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  pkcol: any;
  hrmsapplicantcareerForm: FormGroup;
  mappedtoourroleList: bouserrolemaster[];
  currencyList: boconfigvalue[]=[];

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
    private hrmsapplicantmasterservice: hrmsapplicantmasterService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private bouserrolemasterservice: bouserrolemasterService,

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
    this.hrmsapplicantcareerForm = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: [null],
      hacid: [null],
      employer: [null],
      fromdate: [null],
      todate: [null],
      totalmonths: [null],
      designation: [null],
      mappedtoourrole: [null],
      mappedtoourroledesc: [null],
      responsibilities: [null],
      currency: [null],
      currencydesc: [null],
      salary: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.hrmsapplicantcareerForm.controls; }


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
      this.hrmsapplicantcareerForm.patchValue({
        fromdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        todate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.hrmsapplicantmasterservice.hrmsapplicantcareers.filter(x => (x as any).pkcol == ppk)[0];
      this.hrmsapplicantcareerForm.patchValue({
        applicantid: obj.applicantid,
        hacid: obj.hacid,
        employer: obj.employer,
        fromdate: this.ngbDateParserFormatter.parse(obj.fromdate as any),
        todate: this.ngbDateParserFormatter.parse(obj.todate as any),
        totalmonths: obj.totalmonths,
        designation: obj.designation,
        mappedtoourrole: obj.mappedtoourrole,
        mappedtoourroledesc: obj.mappedtoourroledesc,
        responsibilities: obj.responsibilities,
        currency: obj.currency,
        currencydesc: obj.currencydesc,
        salary: obj.salary,
        remarks: obj.remarks,
        attachment: obj.attachment,
        status: obj.status,
      });


      if (this.hrmsapplicantcareerForm.get('attachment')!.value != "" && this.hrmsapplicantcareerForm.get('attachment')!.value != null && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.hrmsapplicantcareerForm.get('attachment')!.value));

    }
    this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => {
      this.mappedtoourroleList = res as bouserrolemaster[];
    }
    );
    this.configservice.getList("currency").then((res:any) => this.currencyList = res as boconfigvalue[]);
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
      if (this.hrmsapplicantcareerForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsapplicantcareerForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.hrmsapplicantcareerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.hrmsapplicantcareerForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.hrmsapplicantcareerForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.hrmsapplicantcareerForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.hrmsapplicantcareerForm.controls[key] != null) {
            obj[key] = this.hrmsapplicantcareerForm.controls[key]!.value;
          }
        }
      }
    }
    obj.fromdate = this.ngbDateParserFormatter.format(this.hrmsapplicantcareerForm.get('fromdate')!.value);
    obj.todate = this.ngbDateParserFormatter.format(this.hrmsapplicantcareerForm.get('todate')!.value);
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
          else if (key == "fromdate")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "todate")
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
            if (this.hrmsapplicantcareerForm.controls[key] != null) {
              this.hrmsapplicantcareerForm.patchValue(json);
              if (bdisable) this.hrmsapplicantcareerForm.controls[key].disable({ onlySelf: true });
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
  mappedtoourroleonChange(evt:any) {
    let e = evt!.value;
    this.hrmsapplicantcareerForm.patchValue({ mappedtoourroledesc: evt.options[evt.options.selectedIndex].text });
  }
  currencyonChange(evt:any) {
    let e = evt!.value;
    this.hrmsapplicantcareerForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
  }

  AddOrEditmappedtoourrole(userroleid) {
    let ScreenType = '2';
    /*this.dialog.open(bouserrolemasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.mappedtoourroleList = res as bouserrolemaster[]);
    });*/
  }


}


