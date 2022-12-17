import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { hrmsmprassign } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsmprassign.model';
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
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-hrmsmprassigns',
  templateUrl: './hrmsmprassign.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class hrmsmprassignComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  pkcol: any;
  hrmsmprassignForm: FormGroup;
  assignedownerList: bousermaster[];
  assignedowneroptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  assignedowner_bousermastersForm: FormGroup;
  assignedowner_bousermastersoptions: any;
  assignedowner_bousermastersformatter: any;

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
    private bousermasterservice: bousermasterService,

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
    this.hrmsmprassignForm = this.fb.group({
      pk: [null],
      mprid: [null],
      assignid: [null],
      assignedowner: [null],
      assignedownerdesc: [null],
      assignedquantity: [null],
      offered1: [null],
      joined1: [null],
      startdate1: [null],
      completiondate1: [null],
      offered2: [null],
      joined2: [null],
      startdate2: [null],
      completiondate2: [null],
      offered3: [null],
      joined3: [null],
      startdate3: [null],
      completiondate3: [null],
      offered4: [null],
      joined4: [null],
      startdate4: [null],
      completiondate4: [null],
      offered5: [null],
      joined5: [null],
      startdate5: [null],
      completiondate5: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.hrmsmprassignForm.controls; }


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
      this.hrmsmprassignForm.patchValue({
        startdate1: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        completiondate1: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        startdate2: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        completiondate2: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        startdate3: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        completiondate3: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        startdate4: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        completiondate4: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        startdate5: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        completiondate5: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.hrmsmanpowerrequestservice.hrmsmprassigns.filter(x => (x as any).pkcol == ppk)[0];
      this.hrmsmprassignForm.patchValue({
        mprid: obj.mprid,
        assignid: obj.assignid,
        assignedowner: obj.assignedowner,
        assignedownerdesc: obj.assignedownerdesc,
        assignedquantity: obj.assignedquantity,
        offered1: obj.offered1,
        joined1: obj.joined1,
        startdate1: this.ngbDateParserFormatter.parse(obj.startdate1 as any),
        completiondate1: this.ngbDateParserFormatter.parse(obj.completiondate1 as any),
        offered2: obj.offered2,
        joined2: obj.joined2,
        startdate2: this.ngbDateParserFormatter.parse(obj.startdate2 as any),
        completiondate2: this.ngbDateParserFormatter.parse(obj.completiondate2 as any),
        offered3: obj.offered3,
        joined3: obj.joined3,
        startdate3: this.ngbDateParserFormatter.parse(obj.startdate3 as any),
        completiondate3: this.ngbDateParserFormatter.parse(obj.completiondate3 as any),
        offered4: obj.offered4,
        joined4: obj.joined4,
        startdate4: this.ngbDateParserFormatter.parse(obj.startdate4 as any),
        completiondate4: this.ngbDateParserFormatter.parse(obj.completiondate4 as any),
        offered5: obj.offered5,
        joined5: obj.joined5,
        startdate5: this.ngbDateParserFormatter.parse(obj.startdate5 as any),
        completiondate5: this.ngbDateParserFormatter.parse(obj.completiondate5 as any),
        status: obj.status,
      });



    }
    this.bousermasterservice.getbousermastersList().then((res:any) => {
      this.assignedownerList = res as bousermaster[];
      if (this.formdata && this.formdata.hrmsmprassign && this.formdata.hrmsmprassign.assignedowner) {
        this.assignedowneroptionsEvent.emit(this.assignedownerList);
        this.hrmsmprassignForm.patchValue({
          assignedowner: this.formdata.hrmsmprassign.assignedowner,
          assignedownerdesc: this.formdata.hrmsmprassign.assignedownerdesc,
        });
      }
    }
    );
    this.assignedowner_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.assignedownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.assignedowner_bousermastersformatter = (result: any) => result.username;
  }

  onSelectedassignedowner(assignedownerDetail: any) {
    if (assignedownerDetail.assignedowner && assignedownerDetail) {
      this.hrmsmprassignForm.patchValue({
        assignedowner: assignedownerDetail.assignedowner,
        assignedownerdesc: assignedownerDetail.username,

      });

    }
  }



  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.hrmsmprassignForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsmprassignForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.hrmsmprassignForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.hrmsmprassignForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.hrmsmprassignForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.hrmsmprassignForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.hrmsmprassignForm.controls[key] != null) {
            obj[key] = this.hrmsmprassignForm.controls[key]!.value;
          }
        }
      }
    }
    obj.startdate1 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate1')!.value);
    obj.completiondate1 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate1')!.value);
    obj.startdate2 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate2')!.value);
    obj.completiondate2 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate2')!.value);
    obj.startdate3 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate3')!.value);
    obj.completiondate3 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate3')!.value);
    obj.startdate4 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate4')!.value);
    obj.completiondate4 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate4')!.value);
    obj.startdate5 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate5')!.value);
    obj.completiondate5 = this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate5')!.value);
    console.log(obj);
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
          else if (key == "startdate1")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "completiondate1")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "startdate2")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "completiondate2")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "startdate3")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "completiondate3")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "startdate4")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "completiondate4")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "startdate5")
            json = '{"' + key + '": ' + this.ngbDateParserFormatter.parse(mainscreendata[key]) + ' }';
          else if (key == "completiondate5")
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
            if (this.hrmsmprassignForm.controls[key] != null) {
              this.hrmsmprassignForm.patchValue(json);
              if (bdisable) this.hrmsmprassignForm.controls[key].disable({ onlySelf: true });
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
  assignedowneronChange(evt:any) {
    let e = evt!.value;
  }

  AddOrEditassignedowner(userid) {
    let ScreenType = '2';
    /*this.dialog.open(bousermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bousermasterservice.getbousermastersList().then((res:any) => this.assignedownerList = res as bousermaster[]);
    });*/
  }


}


