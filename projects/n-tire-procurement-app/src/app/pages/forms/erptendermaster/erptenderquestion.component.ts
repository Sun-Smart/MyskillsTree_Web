import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erptenderquestion } from '../../../../../../n-tire-procurement-app/src/app/model/erptenderquestion.model';
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

@Component({
  selector: 'app-erptenderquestions',
  templateUrl: './erptenderquestion.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erptenderquestionComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erptenderquestionForm: FormGroup;
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
    private erptendermasterservice: erptendermasterService,
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
    this.erptenderquestionForm = this.fb.group({
      tenderid: [null],
      questionid: [null],
      question: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erptenderquestionForm.controls; }


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
    else if (this.data != null && this.data.questionid != null) {
      ppk = this.data.questionid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.questionid != null && this.data.questionid != undefined) ppk = this.data.questionid;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          if (typeof (this.dynamicconfig.data[key]) == "string")
            jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          else
            jsonstring = '{"' + key + '": ' + this.dynamicconfig.data[key] + ' }';
          let json = JSON.parse(jsonstring);
          if (this.erptenderquestionForm.controls[key] != null) {
            this.erptenderquestionForm.patchValue(json);
            this.erptenderquestionForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erptenderquestionForm.patchValue({
      });
    }
    else {
      let obj = this.erptendermasterservice.erptenderquestions.filter(x => x.questionid == ppk)[0];
      this.erptenderquestionForm.patchValue({
        tenderid: obj.tenderid,
        questionid: obj.questionid,
        question: obj.question,
        status: obj.status,
      });
    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erptenderquestionForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderquestionForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erptenderquestionForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erptenderquestionForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erptenderquestionForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.erptenderquestionForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.erptenderquestionForm.controls[key] != null) {
            obj[key] = this.erptenderquestionForm.controls[key]!.value;
          }
        }
      }
    }
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


