import { bobranchholidayService } from './../../../service/bobranchholiday.service';
import { bobranchholiday } from './../../../model/bobranchholiday.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
  selector: 'app-bobranchholiday',
  templateUrl: './bobranchholiday.component.html',
  styles: [],
})



export class bobranchholidayComponent implements OnInit {
  formData: bobranchholiday;
  list: bobranchholiday[];
  bmyrecord: boolean = false;
  hidelist: any = [];
  objvalues: any = [];
  viewHtml: any = '';
  showview: boolean = false;
  theme: string = "";
  shortcuts: ShortcutInput[] = [];
  showSubmit: boolean = true;
  showGoWorkFlow: boolean = false;
  pkList: any;
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  toolbarVisible: boolean = true;
  customFieldServiceList: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  p_menuid: any;
  p_currenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  maindata: any;
  bfilterPopulate_bobranchholidays: boolean = false;
  bobranchholiday_menuactions: any = []
  bobranchholiday_Form: FormGroup;
  financialyearid_List: DropDownValues[];
  holidayday_List: DropDownValues[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user
  sessionData: any;
  sourceKey: any;
  constructor(private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bobranchholiday_service: bobranchholidayService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.bobranchholiday_Form = this.fb.group({
      pk: [null],
      branchholidayid: [null],
      branchid: [null],
      financialyearid: [null],
      financialyeariddesc: [null],
      holidaydate: [null],
      holidayday: [null],
      holidaydaydesc: [null],
      reason: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.bobranchholiday_Form.controls; }
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bobranchholiday_Form.dirty && this.bobranchholiday_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }
  onSelectedpk(pkDetail: any) {
    if (pkDetail.branchholidayid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }
  async ngOnInit() {
    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });
    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.SESSIONUSERID = this.sessionData.userid;
    }
    this.theme = this.sessionService.getItem('selected-theme');
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
      this.maindata = this.data;
    }
    if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
    if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
      this.viewHtml = '';
    }
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
      this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
    }
    let bobranchholidayid = null;

    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
    }
    else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
      this.pkcol = this.sessionService.getItem('usersource');
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showFormType = this.currentRoute.snapshot.paramMap.get('showFormType');
    }
    this.viewHtml = ``;
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = bobranchholidayid;
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
    }
    this.bobranchholiday_service.getDefaultData().then(res => {
      this.financialyearid_List = res.list_financialyearid.value;
      this.holidayday_List = res.list_holidayday.value;
    }).catch((err) => { this.spinner.hide();  });
    this.bobranchholiday_service.get_bobranchholidays_List().then(res => {
      this.pkList = res as bobranchholiday[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    this.bobranchholiday_Form.markAsUntouched();
    this.bobranchholiday_Form.markAsPristine();
  }
  resetForm() {
    if (this.bobranchholiday_Form != null)
      this.bobranchholiday_Form.reset();
    this.bobranchholiday_Form.patchValue({
      financialyearid: this.sessionData.finyearid,
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }
  onDelete() {
    let branchholidayid = this.bobranchholiday_Form.get('branchholidayid').value;
    if (branchholidayid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bobranchholiday_service.delete_bobranchholiday(branchholidayid).then(res => {
          this.resetForm();
        }
        ).catch((err) => { this.spinner.hide(); });
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.bobranchholiday_Form.patchValue({
      branchholidayid: null
    });
    if (this.formData.branchholidayid != null) this.formData.branchholidayid = null;
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
          else if (key == "holidaydate")
            this.bobranchholiday_Form.patchValue({ "holidaydate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.bobranchholiday_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bobranchholiday_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bobranchholiday_Form.controls[key] != undefined) {
                this.bobranchholiday_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  financialyearid_onChange(evt: any) {
    let e = evt.value;
    this.bobranchholiday_Form.patchValue({ financialyeariddesc: evt.options[evt.options.selectedIndex].text });
  }
  holidayday_onChange(evt: any) {
    let e = this.f.holidayday.value as any;
    this.bobranchholiday_Form.patchValue({ holidaydaydesc: evt.options[evt.options.selectedIndex].text });
  }

  edit_bobranchholidays() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }
  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.bobranchholiday_service.get_bobranchholidays_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.bobranchholiday;
      let formproperty = res.bobranchholiday.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bobranchholiday.pkcol;
      this.formid = res.bobranchholiday.branchholidayid;
      this.FillData(res);
    }).catch((err) => { });
  }

  FillData(res: any) {
    this.formData = res.bobranchholiday;
    this.formid = res.bobranchholiday.branchholidayid;
    this.pkcol = res.bobranchholiday.pkcol;
    this.bmyrecord = false;
    if ((res.bobranchholiday as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    this.bobranchholiday_Form.patchValue({
      branchholidayid: res.bobranchholiday.branchholidayid,
      branchid: res.bobranchholiday.branchid,
      financialyearid: res.bobranchholiday.financialyearid,
      financialyeariddesc: res.bobranchholiday.financialyeariddesc,
      holidaydate: this.ngbDateParserFormatter.parse(res.bobranchholiday.holidaydate),
      holidayday: res.bobranchholiday.holidayday,
      holidaydaydesc: res.bobranchholiday.holidaydaydesc,
      reason: res.bobranchholiday.reason,
      status: res.bobranchholiday.status,
      statusdesc: res.bobranchholiday.statusdesc,
    });
    this.bobranchholiday_menuactions = res.bobranchholiday_menuactions;
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.bobranchholiday_Form.controls) {
      let val = this.bobranchholiday_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bobranchholiday_Form.controls[key] != null) {
        if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
        }
        else if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
        }
        else if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
        }
        else
          ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
      }
    }
    var re = /##(\w+)##/g;
    ret = ret.replace(re, '');
    return ret;
  }

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.bobranchholiday_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.bobranchholiday_Form.getRawValue();
    obj.holidaydate = new Date(this.bobranchholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bobranchholiday_Form.get('holidaydate').value) + '  UTC' : null);
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
    setTimeout(() => {
    }, 200);
  }
  afterAction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }

  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);
    if (!this.bobranchholiday_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.bobranchholiday_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bobranchholiday_Form.controls[key] != null) {
            this.formData[key] = this.bobranchholiday_Form.controls[key].value;
          }
        }
      }
    }
    this.formData.holidaydate = new Date(this.bobranchholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bobranchholiday_Form.get('holidaydate').value) + '  UTC' : null);
    this.spinner.show();
    this.bobranchholiday_service.saveOrUpdate_bobranchholidays(this.formData).subscribe(
      async res => {
        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).bobranchholiday);
        if (!bclear) this.showview = true;
        if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
          if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        }
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).bobranchholiday);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.bobranchholiday_Form.markAsUntouched();
        this.bobranchholiday_Form.markAsPristine();
      },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      }
    )
  }
  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
}



