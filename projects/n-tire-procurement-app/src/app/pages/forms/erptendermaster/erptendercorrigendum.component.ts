import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erptendercorrigendum } from '../../../../../../n-tire-procurement-app/src/app/model/erptendercorrigendum.model';
import { NgForm } from '@angular/forms';
import { erptendermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptendermaster.service';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
  selector: 'app-erptendercorrigendums',
  templateUrl: './erptendercorrigendum.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erptendercorrigendumComponent implements OnInit {
  customfieldservicelist: any;
  @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erptendercorrigendumForm: FormGroup;
  viewhtml: any = '';
  showview: boolean = false;
  formdata: any;
  shortcuts: ShortcutInput[] = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  showformtype: any;
  data: any;
  SESSIONUSERID: any;
  customfieldjson: any;
  customfieldvisible: boolean = true;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentfieldjson: any[] = [];
  attachmentvisible: boolean = true;

  constructor(
    private keyboard: KeyboardShortcutsService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private erptendermasterservice: erptendermasterService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private customfieldservice: customfieldconfigurationService,
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
    this.erptendercorrigendumForm = this.fb.group({
      ImageName: [null],
      tenderid: [null],
      corrigendumid: [null],
      corrigendumdate: [null],
      description: [null],
      notes: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erptendercorrigendumForm.controls; }


  async ngOnInit() {
    let sessiondata = this.sessionService.getSession();
    if (sessiondata != null) {
      this.SESSIONUSERID = sessiondata.userid;
    }

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
    if (this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
    if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
    if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
    let ppk = null;
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      ppk = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      this.viewhtml = this.sessionService.getViewHtml();
    }
    else if (this.data != null && this.data.corrigendumid != null) {
      ppk = this.data.corrigendumid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.corrigendumid != null && this.data.corrigendumid != undefined) ppk = this.data.corrigendumid;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          if (typeof (this.dynamicconfig.data[key]) == "string")
            jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          else
            jsonstring = '{"' + key + '": ' + this.dynamicconfig.data[key] + ' }';
          let json = JSON.parse(jsonstring);
          if (this.erptendercorrigendumForm.controls[key] != null) {
            this.erptendercorrigendumForm.patchValue(json);
            this.erptendercorrigendumForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erptendercorrigendumForm.patchValue({
        corrigendumdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
      this.FillCustomField();
    }
    else {
      let obj = this.erptendermasterservice.erptendercorrigendums.filter(x => x.corrigendumid == ppk)[0];
      this.erptendercorrigendumForm.patchValue({
        tenderid: obj.tenderid,
        corrigendumid: obj.corrigendumid,
        corrigendumdate: this.ngbDateParserFormatter.parse(obj.corrigendumdate as any),
        description: obj.description,
        notes: obj.notes,
        customfield: obj.customfield,
        attachment: obj.attachment,
        status: obj.status,
      });
      if (this.erptendercorrigendumForm.get('customfield')!.value != "" && this.erptendercorrigendumForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.erptendercorrigendumForm.get('customfield')!.value);
      this.FillCustomField();
      if (this.erptendercorrigendumForm.get('attachment')!.value != "" && this.erptendercorrigendumForm.get('attachment')!.value != null && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.erptendercorrigendumForm.get('attachment')!.value));
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
      if (this.erptendercorrigendumForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptendercorrigendumForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erptendercorrigendumForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erptendercorrigendumForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erptendercorrigendumForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.erptendercorrigendumForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.erptendercorrigendumForm.controls[key] != null) {
            obj[key] = this.erptendercorrigendumForm.controls[key]!.value;
          }
        }
      }
    }
    obj.corrigendumdate = this.ngbDateParserFormatter.format(this.erptendercorrigendumForm.get('corrigendumdate')!.value);
    obj.customfield = JSON.stringify(customfields);
    obj.attachment = JSON.stringify(this.attachmentfieldjson);
    obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
    obj.fileattachmentlist = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.fileattachmentlist);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.dialogRef.close(obj);
  }

  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("erptendercorrigendums", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
      this.customfieldservicelist = res;
      return res;
    });


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


