import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { prjtestrundetail } from './../../../model/prjtestrundetail.model';
import { NgForm } from '@angular/forms';
import { prjtestrunService } from './../../../service/prjtestrun.service';
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
  selector: 'app-prjtestrundetails',
  templateUrl: './prjtestrundetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class prjtestrundetailComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  pkcol: any;
  prjtestrundetailForm: FormGroup;

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
    private prjtestrunservice: prjtestrunService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,

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
    this.prjtestrundetailForm = this.fb.group({
      pk: [null],
      ImageName: [null],
      projectid: [null],
      testrundetailid: [null],
      testrunid: [null],
      testcaseid: [null],
      parentid: [null],
      planid: [null],
      result: [null],
      details: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.prjtestrundetailForm.controls; }


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
    if (this.data.notes != null && this.data.notes != undefined) this.prjtestrundetailForm.patchValue({ notes: this.data.notes });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.formid = ppk;

    if (this.pkcol == null) {
      this.prjtestrundetailForm.patchValue({
      });
    }
    else {
      let obj = this.prjtestrunservice.prjtestrundetails.filter(x => (x as any).pkcol == ppk)[0];
      this.prjtestrundetailForm.patchValue({
        projectid: obj.projectid,
        testrundetailid: obj.testrundetailid,
        testrunid: obj.testrunid,
        testcaseid: obj.testcaseid,
        parentid: obj.parentid,
        planid: obj.planid,
        result: obj.result,
        details: obj.details,
        notes: obj.notes,
        attachment: obj.attachment,
        status: obj.status,
      });


      if (this.prjtestrundetailForm.get('attachment')!.value != "" && this.prjtestrundetailForm.get('attachment')!.value != null && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.prjtestrundetailForm.get('attachment')!.value));

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
      if (this.prjtestrundetailForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjtestrundetailForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.prjtestrundetailForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prjtestrundetailForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.prjtestrundetailForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.prjtestrundetailForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.prjtestrundetailForm.controls[key] != null) {
            obj[key] = this.prjtestrundetailForm.controls[key]!.value;
          }
        }
      }
    }
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
          else if (key == "notes")
            json = '{"' + key + '": ' + mainscreendata[key] + ' }';
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.prjtestrundetailForm.controls[key] != null) {
              this.prjtestrundetailForm.patchValue(json);
              if (bdisable) this.prjtestrundetailForm.controls[key].disable({ onlySelf: true });
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

}


