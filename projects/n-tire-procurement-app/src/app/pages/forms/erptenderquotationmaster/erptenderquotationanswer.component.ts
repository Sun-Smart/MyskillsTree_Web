import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erptenderquotationanswer } from '../../../../../../n-tire-procurement-app/src/app/model/erptenderquotationanswer.model';
import { NgForm } from '@angular/forms';
import { erptenderquotationmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptenderquotationmaster.service';
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
import { erptenderquestion, IerptenderquestionResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erptenderquestion.model';
import { erptenderquestionService } from '../../../../../../n-tire-procurement-app/src/app/service/erptenderquestion.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-erptenderquotationanswers',
  templateUrl: './erptenderquotationanswer.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erptenderquotationanswerComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erptenderquotationanswerForm: FormGroup;
  questionidList: erptenderquestion[];
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
    private erptenderquotationmasterservice: erptenderquotationmasterService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private erptenderquestionservice: erptenderquestionService,
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
    this.erptenderquotationanswerForm = this.fb.group({
      tenderid: [null],
      quotationid: [null],
      answerid: [null],
      questionid: [null],
      questioniddesc: [null],
      question: [null],
      answer: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erptenderquotationanswerForm.controls; }


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
    else if (this.data != null && this.data.answerid != null) {
      ppk = this.data.answerid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.answerid != null && this.data.answerid != undefined) ppk = this.data.answerid;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          if (typeof (this.dynamicconfig.data[key]) == "string")
            jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          else
            jsonstring = '{"' + key + '": ' + this.dynamicconfig.data[key] + ' }';
          let json = JSON.parse(jsonstring);
          if (this.erptenderquotationanswerForm.controls[key] != null) {
            this.erptenderquotationanswerForm.patchValue(json);
            this.erptenderquotationanswerForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erptenderquotationanswerForm.patchValue({
      });
    }
    else {
      let obj = this.erptenderquotationmasterservice.erptenderquotationanswers.filter(x => x.answerid == ppk)[0];
      this.erptenderquotationanswerForm.patchValue({
        tenderid: obj.tenderid,
        quotationid: obj.quotationid,
        answerid: obj.answerid,
        questionid: obj.questionid,
        questioniddesc: obj.questioniddesc,
        question: obj.question,
        answer: obj.answer,
        status: obj.status,
      });
    }
    this.erptenderquestionservice.geterptenderquestionsList().then((res:any) => {
      this.questionidList = res as erptenderquestion[];
    }
    );
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erptenderquotationanswerForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderquotationanswerForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erptenderquotationanswerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erptenderquotationanswerForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erptenderquotationanswerForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.erptenderquotationanswerForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.erptenderquotationanswerForm.controls[key] != null) {
            obj[key] = this.erptenderquotationanswerForm.controls[key]!.value;
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
  questionidonChange(evt:any) {
    let e = evt!.value;
    this.erptenderquotationanswerForm.patchValue({ questioniddesc: evt.options[evt.options.selectedIndex].text });
  }
  AddOrEditquestionid(questionid) {
    let ScreenType = '2';
    /*this.dialog.open(erptenderquestionComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.erptenderquestionservice.geterptenderquestionsList().then((res:any) => this.questionidList = res as erptenderquestion[]);
    });*/
  }


}


