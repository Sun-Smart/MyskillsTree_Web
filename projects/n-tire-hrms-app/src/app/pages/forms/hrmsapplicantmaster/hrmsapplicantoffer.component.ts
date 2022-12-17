import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { hrmsapplicantoffer } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsapplicantoffer.model';
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
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-hrmsapplicantoffers',
  templateUrl: './hrmsapplicantoffer.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class hrmsapplicantofferComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  hrmsapplicantofferForm: FormGroup;
  viewhtml: any = '';
  showview: boolean = false;
  formdata: any;
  shortcuts: ShortcutInput[] = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  showformtype: any;
  data: any;
  SESSIONUSERID: any;

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
    this.hrmsapplicantofferForm = this.fb.group({
      offerid: [null],
      mprid: [null],
      interviewid: [null],
      offerdate: [null],
      joiningdate: [null],
      referenceno: [null],
      applicantid: [null],
      applicantcode: [null],
      applicantname: [null],
      title: [null],
      department: [null],
      location: [null],
      salarytype: [null],
      basic: [null],
      allowances: [null],
      grosssalary: [null],
      deductions: [null],
      taxallowed: [null],
      tax: [null],
      netsalary: [null],
      notes: [null],
      remarks: [null],
      approvaldate: [null],
      offersentdate: [null],
      acknowledged: [null],
      acknowledgedate: [null],
      joineddate: [null],
      offerstatus: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.hrmsapplicantofferForm.controls; }


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
    else if (this.data != null && this.data.offerid != null) {
      ppk = this.data.offerid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.offerid != null && this.data.offerid != undefined) ppk = this.data.offerid;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          if (typeof (this.dynamicconfig.data[key]) == "string")
            jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          else
            jsonstring = '{"' + key + '": ' + this.dynamicconfig.data[key] + ' }';
          let json = JSON.parse(jsonstring);
          if (this.hrmsapplicantofferForm.controls[key] != null) {
            this.hrmsapplicantofferForm.patchValue(json);
            this.hrmsapplicantofferForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.hrmsapplicantofferForm.patchValue({
        offerdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        joiningdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        approvaldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        offersentdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        acknowledgedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        joineddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.hrmsapplicantmasterservice.hrmsapplicantoffers.filter(x => x.offerid == ppk)[0];
      this.hrmsapplicantofferForm.patchValue({
        offerid: obj.offerid,
        mprid: obj.mprid,
        interviewid: obj.interviewid,
        offerdate: this.ngbDateParserFormatter.parse(obj.offerdate as any),
        joiningdate: this.ngbDateParserFormatter.parse(obj.joiningdate as any),
        referenceno: obj.referenceno,
        applicantid: obj.applicantid,
        applicantcode: obj.applicantcode,
        applicantname: obj.applicantname,
        title: obj.title,
        department: obj.department,
        location: obj.location,
        salarytype: obj.salarytype,
        basic: obj.basic,
        allowances: obj.allowances,
        grosssalary: obj.grosssalary,
        deductions: obj.deductions,
        taxallowed: obj.taxallowed,
        tax: obj.tax,
        netsalary: obj.netsalary,
        notes: obj.notes,
        remarks: obj.remarks,
        approvaldate: this.ngbDateParserFormatter.parse(obj.approvaldate as any),
        offersentdate: this.ngbDateParserFormatter.parse(obj.offersentdate as any),
        acknowledged: obj.acknowledged,
        acknowledgedate: this.ngbDateParserFormatter.parse(obj.acknowledgedate as any),
        joineddate: this.ngbDateParserFormatter.parse(obj.joineddate as any),
        offerstatus: obj.offerstatus,
        status: obj.status,
      });
    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.hrmsapplicantofferForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsapplicantofferForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.hrmsapplicantofferForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.hrmsapplicantofferForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.hrmsapplicantofferForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.hrmsapplicantofferForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.hrmsapplicantofferForm.controls[key] != null) {
            obj[key] = this.hrmsapplicantofferForm.controls[key]!.value;
          }
        }
      }
    }
    obj.offerdate = this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('offerdate')!.value);
    obj.joiningdate = this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('joiningdate')!.value);
    obj.approvaldate = this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('approvaldate')!.value);
    obj.offersentdate = this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('offersentdate')!.value);
    obj.acknowledgedate = this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('acknowledgedate')!.value);
    obj.joineddate = this.ngbDateParserFormatter.format(this.hrmsapplicantofferForm.get('joineddate')!.value);
    console.log(obj);
    this.dialogRef.close(obj);
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


