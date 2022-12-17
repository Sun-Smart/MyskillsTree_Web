import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { hlpticketdetail } from '../../../../../../n-tire-help-desk-app/src/app/model/hlpticketdetail.model';
import { NgForm } from '@angular/forms';
import { hlpticket } from '../../../../../../n-tire-help-desk-app/src/app/model/hlpticket.model';
import { hlpticketService } from '../../../../../../n-tire-help-desk-app/src/app/service/hlpticket.service';
import { hlpticketdetailService } from '../../../../../../n-tire-help-desk-app/src/app/service/hlpticketdetail.service';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { boconfigvalue } from '../../../../../../n-tire-biz-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-biz-app/src/app/service/boconfigvalue.service';

import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';
//Custom control
import { durationComponent } from '../../../../../../n-tire-biz-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";

import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { bousermaster, IbousermasterResponse } from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-biz-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';

@Component({
  selector: 'app-hlpticketdetails',
  templateUrl: './hlpticketdetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class hlpticketdetailComponent implements OnInit {
  customFieldServiceList: any;
  @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  pkcol: any;
  hlpticketdetail_Form: FormGroup;
  ticketid_List: hlpticket[];
  ticketid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();
  ticketid_hlptickets_Form: FormGroup;
  ticketid_hlpticketsoptions: any;
  ticketid_hlpticketsformatter: any;
  actionuser_List: bousermaster[];
  actionuser_optionsEvent: EventEmitter<any> = new EventEmitter<any>();
  actionuser_bousermasters_Form: FormGroup;
  actionuser_bousermastersoptions: any;
  actionuser_bousermastersformatter: any;

  hidelist: any = [];
  objvalues: any = [];
  viewHtml: any = '';
  showview: boolean = false;
  theme: string = "";
  //formData:any;
  shortcuts: ShortcutInput[] = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  showFormType: any;
  data: any;
  maindata: any;
  SESSIONUSERID: any;
  sessionData: any;
  sourceKey: any;
  customFieldJson: any;
  customFieldVisible: boolean = true;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;


  constructor(
    private nav: Location,
    private keyboard: KeyboardShortcutsService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private hlpticketdetail_service: hlpticketdetailService,
    private hlpticket_service: hlpticketService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private configservice: boconfigvalueService,
    private bousermaster_service: bousermasterService,
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
    this.hlpticketdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      ticketdetailid: [null],
      ticketid: [null],
      ticketiddesc: [null],
      assignedto: [null],
      actionuser: [null],
      actionuserdesc: [null],
      assigneddate: [null],
      actiondate: [null],
      tatends: [null],
      actionremarks: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.hlpticketdetail_Form.controls; }


  async ngOnInit() {
    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.SESSIONUSERID = this.sessionData.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');
    //this.viewHtml=this.sessionService.getViewHtml();
    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
      this.maindata = this.data;
    }
    if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
    if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
    if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
    let ppk = null;
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      ppk = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      //this.viewHtml=this.sessionService.getViewHtml();
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showFormType = this.currentRoute.snapshot.paramMap.get('showFormType');
    }
    if (this.data.pkcol != null && this.data.pkcol != undefined) ppk = this.data.pkcol;
    if (this.data.sourcereference != null && this.data.sourcereference != undefined) this.hlpticketdetail_Form.patchValue({ sourcereference: this.data.sourcereference });
    if (this.data.sourcefield != null && this.data.sourcefield != undefined) this.hlpticketdetail_Form.patchValue({ sourcefield: this.data.sourcefield });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.formid = ppk;

    if (this.pkcol == null) {
      this.hlpticketdetail_Form.patchValue({
        assigneddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        actiondate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        tatends: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
      this.FillCustomField();
    }
    else {
      let obj = this.hlpticket_service.hlpticketdetails.filter(x => (x as any).pkcol == ppk)[0];
      this.formData = obj;
      this.hlpticketdetail_Form.patchValue({
        ticketdetailid: obj.ticketdetailid,
        ticketid: obj.ticketid,
        ticketiddesc: obj.ticketiddesc,
        sourcefield: obj.sourcefield,
        sourcereference: obj.sourcereference,
        assignedto: obj.assignedto,
        actionuser: obj.actionuser,
        actionuserdesc: obj.actionuserdesc,
        assigneddate: this.ngbDateParserFormatter.parse(obj.assigneddate as any),
        actiondate: this.ngbDateParserFormatter.parse(obj.actiondate as any),
        tatends: this.ngbDateParserFormatter.parse(obj.tatends as any),
        actionremarks: obj.actionremarks,
        customfield: obj.customfield,
        attachment: obj.attachment,
        status: obj.status,
      });


      if (this.hlpticketdetail_Form.get('customfield').value != "" && this.hlpticketdetail_Form.get('customfield').value != null) this.customFieldJson = JSON.parse(this.hlpticketdetail_Form.get('customfield').value);
      this.FillCustomField();
      if (this.hlpticketdetail_Form.get('attachment').value != "" && this.hlpticketdetail_Form.get('attachment').value != null && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.hlpticketdetail_Form.get('attachment').value);

    }
    this.hlpticketdetail_service.getDefaultData().then(res => {
      this.ticketid_List = res.list_ticketid.value;
      this.actionuser_List = res.list_actionuser.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });
  }

  onSelected_ticketid(ticketidDetail: any) {
    if (ticketidDetail.value && ticketidDetail) {
      this.hlpticketdetail_Form.patchValue({
        ticketid: ticketidDetail.value,
        ticketiddesc: ticketidDetail.label,

      });

    }
  }

  onSelected_actionuser(actionuserDetail: any) {
    if (actionuserDetail.value && actionuserDetail) {
      this.hlpticketdetail_Form.patchValue({
        actionuser: actionuserDetail.value,
        actionuserdesc: actionuserDetail.label,

      });

    }
  }


  attachmentuploader(e: any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileAttachmentList.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
      max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentFieldJson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }



  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.hlpticketdetail_Form.controls[key] != null) {
        if (false) {
          if (this.hlptickets_service.formData[key] != null && this.hlptickets_service.formData[key] != undefined && this.hlptickets_service.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.hlptickets_service.formData[key])[0]["name"]);
        }
        else
          ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpticketdetail_Form.controls[key].value);
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
  }

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    // Object.keys(this.hlpticketdetail_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.hlpticketdetail_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.hlpticketdetail_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.hlpticketdetail_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.hlpticketdetail_Form.controls[key] != null) {
            obj[key] = this.hlpticketdetail_Form.controls[key].value;
          }
        }
      }
    }
    if (this.hlpticketdetail_Form.get('assignedto').value != null) obj.assignedto = JSON.stringify(this.hlpticketdetail_Form.get('assignedto').value);
    obj.assigneddate = new Date(this.hlpticket_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('assigneddate').value) + '  UTC' : null);
    obj.actiondate = new Date(this.hlpticket_Form.get('actiondate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('actiondate').value) + '  UTC' : null);
    obj.tatends = new Date(this.hlpticket_Form.get('tatends').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('tatends').value) + '  UTC' : null);
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
    setTimeout(() => {
      //this.dialogRef.destroy();
    }, 200);
  }

  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "assignedto")
            this.hlpticketdetail_Form.patchValue({ "assignedto": mainscreendata[key] });
          else if (key == "assigneddate")
            this.hlpticketdetail_Form.patchValue({ "assigneddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "actiondate")
            this.hlpticketdetail_Form.patchValue({ "actiondate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "tatends")
            this.hlpticketdetail_Form.patchValue({ "tatends": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.hlpticketdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.hlpticketdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.hlpticketdetail_Form.controls[key] != undefined) {
                this.hlpticketdetail_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("hlpticketdetails", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }

  onSubmitAndWait() {
    this.onSubmitDataDlg(false);
  }
  onSubmit() {
    this.onSubmitDataDlg(true);
  }
  ticketid_onChange(evt: any) {
    let e = evt.value;
  }
  actionuser_onChange(evt: any) {
    let e = evt.value;
  }

  edit_hlptickets() {
    this.showview = false;
    return false;
  }




  AddOrEdit_ticketid(ticketid) {
    let ScreenType = '2';
    /*this.dialog.open(hlpticketComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe(res => {
    if(res)
    {
    this.hlpticket_service.get_hlptickets_List().then(res => this.ticketid_List = res as hlpticket[]);
    }
    });*/
  }


  AddOrEdit_actionuser(userid) {
    let ScreenType = '2';
    /*this.dialog.open(bousermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe(res => {
    if(res)
    {
    this.bousermaster_service.get_bousermasters_List().then(res => this.actionuser_List = res as bousermaster[]);
    }
    });*/
  }


}


