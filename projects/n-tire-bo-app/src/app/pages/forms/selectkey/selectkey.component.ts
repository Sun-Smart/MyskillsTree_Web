import { selectkeyService } from './../../../service/selectkey.service';
import { selectkey } from './../../../model/selectkey.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
//import { keyComponent } from '../key/key.component';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';

@Component({
  selector: 'app-selectkey',
  templateUrl: './selectkey.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class selectkeyComponent implements OnInit {
  reportcode: any = '';
  param: any = '';
  key: any = '';
  viewhtml: any = '';
  showview: boolean = false;
  theme: string = "";
  formdata: any;
  shortcuts: ShortcutInput[] = [];
  showsubmit: boolean = true;
  showGoWorkFlow: boolean = false;
  pkList: any;
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  pk_tblForm: FormGroup;
  pk_tbloptions: any;
  pk_tblformatter: any;
  toolbarvisible: boolean = true;
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  pmenuid: any;
  pcurrenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  data3: any = [];
  bfilterPopulateselectkeys: boolean = false;
  dataselectkeyskeyval3: any = [];
  selectkeyForm: FormGroup;
  keyvalList: any[];
  keyvaloptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  keyval_keysForm: FormGroup;
  keyval_keysoptions: any;
  keyval_keysformatter: any;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  SESSIONUSERID: any;
  sessiondata: any;


  constructor(
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private selectkeyservice: selectkeyService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private currentRoute: ActivatedRoute) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.pmenuid = sharedService.menuid;
    this.pcurrenturl = sharedService.currenturl;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
        preventDefault: true
      },
      {
        key: 'cmd s',
        command: () => this.onSubmitData(false),
        preventDefault: true
      },
      {
        key: 'cmd f',
        command: () => this.resetForm(),
        preventDefault: true
      }
    ]);
    this.selectkeyForm = this.fb.group({
      pk: [null],
      param: [null],
      keyval: [null],
      keyvaldesc: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.selectkeyForm.controls; }

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  ToolBar(prop:any) {
    this.toolbarvisible = prop;
  }
  canDeactivate(): Observable<boolean> | boolean {
    //debugger;
    if (this.selectkeyForm.dirty && this.selectkeyForm.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }
  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }
  prev() {
    //debugger;
    let pos = this.pkList.map(function (e:any) { return e.pk.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }
  next() {
    //debugger;
    let pos = this.pkList.map(function (e:any) { return e.pk.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }
  onSelectedpk(pkDetail: any) {
    if (pkDetail.pk && pkDetail) {
      //debugger;

      //  this.PopulateScreen(pkDetail.pkcol);
    }
  }
  async ngOnInit() {
    //debugger;
    this.sessiondata = this.sessionService.getSession();
    if (this.sessiondata != null) {
      this.SESSIONUSERID = this.sessiondata.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');
    //debugger;
    let selectkeyid = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      selectkeyid = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      this.viewhtml = this.sessionService.getViewHtml();
    }
    else if (this.data != null && this.data.pk != null) {
      selectkeyid = this.data.pk;
    }
    else {
      selectkeyid = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
    }
    this.formid = selectkeyid;
    //this.sharedService.alert(selectkeyid);
    if (selectkeyid == null) {
      this.resetForm();
    }
    else {
      await this.PopulateScreen(selectkeyid);
    }

    this.param = this.currentRoute.snapshot.paramMap.get('param');
    this.reportcode = this.currentRoute.snapshot.paramMap.get('reportcode');
    //debugger;
    this.selectkeyservice.getList(this.param).then((res:any) => {
      this.keyvalList = res as any;
      if (this.formdata && this.formdata.selectkey && this.formdata.selectkey.keyval) {
        this.keyvaloptionsEvent.emit(this.keyvalList);
        this.selectkeyForm.patchValue({
          keyval: this.formdata.selectkey.keyval,
          keyvaldesc: this.formdata.selectkey.keyvaldesc,
        });
      }
    }
    );
    this.keyval_keysoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.keyvalList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.keyval_keysformatter = (result: any) => result.name;
    /*this.selectkeyservice.getList(this.param).then((res:any) => {
      this.pkList = res as selectkey[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;
*/
    this.selectkeyForm.markAsUntouched();
    this.selectkeyForm.markAsPristine();
  }
  onSelectedkeyval(keyvalDetail: any) {
    //debugger;
    if (keyvalDetail.id && keyvalDetail) {
      this.selectkeyForm.patchValue({
        keyval: keyvalDetail.id,
        keyvaldesc: keyvalDetail.name,

      });
      this.key = keyvalDetail.pkcol;
    }
  }




  resetForm() {
    if (this.selectkeyForm != null)
      this.selectkeyForm.reset();
    this.selectkeyForm.patchValue({
      keyval: "",
      keyvaldesc: "",
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let pk = this.selectkeyForm.get('pk').value;
    if (pk != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.selectkeyservice.deleteselectkey(pk).then((res:any) => {
          this.resetForm();
        }
        );
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.selectkeyForm.patchValue({
      pk: null
    });
    if (this.selectkeyservice.formData.pk != null) this.selectkeyservice.formData.pk = null;
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
          else if (ctrltype == "string") {
            jsonstring = '{"' + key + '": "' + mainscreendata[key] + '" }';
            json = JSON.parse(jsonstring);
          }
          else {
            jsonstring = '{"' + key + '": ' + mainscreendata[key] + ' }';
            json = JSON.parse(jsonstring);
          }
          {
            if (this.selectkeyForm.controls[key] != null) {
              this.selectkeyForm.patchValue(json);
              if (bdisable) this.selectkeyForm.controls[key].disable({ onlySelf: true });
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
    if (this.data.save == true) {
      this.onSubmitData(false);
    }
    else if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  keyvalonChange(evt:any) {
    let e = evt.value;
  }
  async PopulateScreen(selectkeyid: any) {
    this.selectkeyservice.getselectkeysByEID(selectkeyid).then((res:any) => {

      this.formdata = res;
      let formproperty = res.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.formid = res.selectkey.pk;
      this.FillData(res);
    });
  }
  FillData(res: any) {
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.selectkeyForm.patchValue({
      pk: res.selectkey.pk,
      param: res.selectkey.param,
      keyval: res.selectkey.keyval,
      keyvaldesc: res.selectkey.keyvaldesc,
      status: res.selectkey.status,
      statusdesc: res.selectkey.statusdesc,
    });
  }
  validate() {
    let ret = true;
    return ret;
  }
  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.selectkeyForm.controls) {
      if (this.selectkeyForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.selectkeyForm.controls[key].value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    if (!this.selectkeyForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.selectkeyForm.value;
    console.log(obj);
    this.dialogRef.close(obj);
  }

  afteraction(mode: any) {
    let formname = "camspmschedules";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }
  async onSubmitData(bclear:any) {
    //debugger;
    return this.router.navigate(['/home/boreportviewer/' + this.reportcode + '/pkcol/' + this.key]);

    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.selectkeyForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.selectkeyForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.selectkeyForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.selectkeyservice.formData = this.selectkeyForm.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.selectkeyForm.controls[key] != null) {
            this.selectkeyservice.formData[key] = this.selectkeyForm.controls[key].value;
          }
        }
      }
    }
    console.log(this.selectkeyservice.formData);
    this.selectkeyservice.saveOrUpdateselectkeys().subscribe(
      async (res:any) => {
        //debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.dynamicconfig.data.save) {
          this.dialogRef.close((res as any).result.value.selectkey);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.selectkeyservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close((res as any).result.value.selectkey);
          }
          else {
            this.FillData(res);
          }
        }
        this.selectkeyForm.markAsUntouched();
        this.selectkeyForm.markAsPristine();
      },
      (err:any) => {
        //debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }



  AddOrEditkeyval(userid) {
    /*let ScreenType='2';
    this.dialog.open(keyComponent, 
    {
    data: {userid:this.selectkeyForm.get('keyval').value, ScreenType:2 }
    } 
    ).onClose.subscribe((res:any) => {
    });*/
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}



