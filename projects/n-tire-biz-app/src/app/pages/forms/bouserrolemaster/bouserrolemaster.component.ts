import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
import { bouserrolemaster } from './../../../model/bouserrolemaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';

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
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { bousertypemenuaccess } from './../../../model/bousertypemenuaccess.model';
import { bousertypemenuaccessComponent } from './../../../pages/forms/bousertypemenuaccess/bousertypemenuaccess.component';
import { bousertypemenuaccessService } from './../../../service/bousertypemenuaccess.service';
import { bomenumasterComponent } from './../bomenumaster/bomenumaster.component';
import { bomenumasterService } from './../../../service/bomenumaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
  selector: 'app-bouserrolemaster',
  templateUrl: './bouserrolemaster.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class bouserrolemasterComponent implements OnInit {
  formData: bouserrolemaster;
  list: bouserrolemaster[];
  bmyrecord: boolean = false;
  hidelist: any = [];
  objvalues: any = [];
  viewHtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  theme: string = "";//current theme
  //formdata: any;//current form data
  shortcuts: ShortcutInput[] = [];//keyboard keys
  showSubmit: boolean = true;//button to show
  showGoWorkFlow: boolean = false;
  pkList: any;//stores values - used in search, prev, next
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
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

  Insertbousertypemenuaccesses: any;

  bfilterPopulate_bouserrolemasters: boolean = false;
  bfilterPopulate_bousertypemenuaccesses: boolean = false;
  bouserrolemaster_menuactions: any = []
  bousertypemenuaccess_menuactions: any = []
  @ViewChild('tbl_bousertypemenuaccesses', { static: false }) tbl_bousertypemenuaccesses: Ng2SmartTableComponent;

  bouserrolemaster_Form: FormGroup;


  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;



  bousertypemenuaccesses_visiblelist: any;
  bousertypemenuaccesses_hidelist: any;

  Deleted_bousertypemenuaccess_IDs: string = "";
  bousertypemenuaccesses_ID: string = "1";
  bousertypemenuaccesses_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bouserrolemaster_service: bouserrolemasterService,
    private bomenumaster_service: bomenumasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.router.navigate(["/home/" + this.p_currenturl]),
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
    this.bouserrolemaster_Form = this.fb.group({
      pk: [null],
      userroleid: [null],
      userrole: [null, Validators.compose([Validators.required])],
      additionalnotes: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.bouserrolemaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bouserrolemaster_Form.dirty && this.bouserrolemaster_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields

  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.userroleid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    //session & theme
    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });

    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.SESSIONUSERID = this.sessionData.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');
    //this.viewHtml=this.sessionService.getViewHtml();

    debugger;
    //getting data - from list page, from other screen through dialog
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
    let bouserrolemasterid = null;

    //if view button(eye) is clicked
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      //this.viewHtml=this.sessionService.getViewHtml();
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
    //copy the data from previous dialog 
    this.viewHtml = ``;
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = bouserrolemasterid;
    //alert(bouserrolemasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_bousertypemenuaccesses_TableConfig();
      setTimeout(() => {
        //this.Set_bousertypemenuaccesses_TableDropDownConfig();
      });

      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.bouserrolemaster_service.getDefaultData().then(res => {
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.bouserrolemaster_service.get_bouserrolemasters_List().then(res => {
      this.pkList = res as bouserrolemaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched 
    this.bouserrolemaster_Form.markAsUntouched();
    this.bouserrolemaster_Form.markAsPristine();
  }



  resetForm() {
    if (this.bouserrolemaster_Form != null)
      this.bouserrolemaster_Form.reset();
    this.bouserrolemaster_Form.patchValue({
    });
    setTimeout(() => {
      this.Insertbousertypemenuaccesses = [];
      this.bousertypemenuaccesses_LoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let userroleid = this.bouserrolemaster_Form.get('userroleid').value;
    if (userroleid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bouserrolemaster_service.delete_bouserrolemaster(userroleid).then(res => {
          this.resetForm();
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.bouserrolemaster_Form.patchValue({
      userroleid: null
    });
    if (this.formData.userroleid != null) this.formData.userroleid = null;
    for (let i = 0; i < this.tbl_bousertypemenuaccesses.source.length; i++) {
      this.tbl_bousertypemenuaccesses.source[i].rolemenuaccessid = null;
    }
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
          else if (ctrltype == "string") {
            this.bouserrolemaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bouserrolemaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bouserrolemaster_Form.controls[key] != undefined) {
                this.bouserrolemaster_Form.controls[key].disable({ onlySelf: true });
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.userrole != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.userrole != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  edit_bouserrolemasters() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.bouserrolemaster_service.get_bouserrolemasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.bouserrolemaster;
      let formproperty = res.bouserrolemaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bouserrolemaster.pkcol;
      this.formid = res.bouserrolemaster.userroleid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.bouserrolemaster;
    this.formid = res.bouserrolemaster.userroleid;
    this.pkcol = res.bouserrolemaster.pkcol;
    this.bmyrecord = false;
    if ((res.bouserrolemaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bouserrolemaster_Form.patchValue({
      userroleid: res.bouserrolemaster.userroleid,
      userrole: res.bouserrolemaster.userrole,
      additionalnotes: res.bouserrolemaster.additionalnotes,
      status: res.bouserrolemaster.status,
      statusdesc: res.bouserrolemaster.statusdesc,
    });
    this.bouserrolemaster_menuactions = res.bouserrolemaster_menuactions;
    this.bousertypemenuaccess_menuactions = res.bousertypemenuaccess_menuactions;
    this.bousertypemenuaccesses_visiblelist = res.bousertypemenuaccesses_visiblelist;
    //Child Tables if any
    this.Set_bousertypemenuaccesses_TableConfig();
    this.bousertypemenuaccesses_LoadTable(res.bousertypemenuaccesses);
    this.Insertbousertypemenuaccesses = [];
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.bouserrolemaster_Form.controls) {
      let val = this.bouserrolemaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bouserrolemaster_Form.controls[key] != null) {
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
    if (!this.bouserrolemaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.bouserrolemaster_Form.getRawValue();
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
    setTimeout(() => {
      //this.dialogRef.destroy();
    }, 200);
  }

  //This has to come from bomenuactions & procedures
  afterAction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }



  async onSubmitData(bclear: any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    // Object.keys(this.bouserrolemaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.bouserrolemaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.bouserrolemaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.bouserrolemaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bouserrolemaster_Form.controls[key] != null) {
            this.formData[key] = this.bouserrolemaster_Form.controls[key].value;
          }
        }
      }
    }
    this.formData.Deleted_bousertypemenuaccess_IDs = this.Deleted_bousertypemenuaccess_IDs;
    console.log(this.formData);
    this.spinner.show();
    this.bouserrolemaster_service.saveOrUpdate_bouserrolemasters(this.formData, this.tbl_bousertypemenuaccesses?.source?.data, this.Insertbousertypemenuaccesses,).subscribe(
      async res => {
        if (this.tbl_bousertypemenuaccesses.source) {
          for (let i = 0; i < this.tbl_bousertypemenuaccesses.source.data.length; i++) {
            if (this.tbl_bousertypemenuaccesses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bousertypemenuaccesses.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).bouserrolemaster);
        if (!bclear) this.showview = true;
        if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
          if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        }
        this.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).bouserrolemaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.bouserrolemaster_Form.markAsUntouched();
        this.bouserrolemaster_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer
  clearList() {
    this.tbl_bousertypemenuaccesses.source = new LocalDataSource();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes bousertypemenuaccesses
  async onCustom_bousertypemenuaccesses_Action(event: any) {
    debugger;
    switch (event.action) {
      case 'viewrecord':
        let val = event.data.pkcol;
        this.dialog.open(bomenumasterComponent,
          {
            data: { showview: false, pkcol: val, ScreenType: 2 },
          }
        ).onClose.subscribe(res => {
        });
        break;
    }
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bousertypemenuaccesses");
    let formname = (objbomenuaction as any).actionname;
  }
  bousertypemenuaccesses_settings: any;

  show_bousertypemenuaccesses_Checkbox() {
    debugger;
    if (this.tbl_bousertypemenuaccesses.source.settings['selectMode'] == 'multi') this.tbl_bousertypemenuaccesses.source.settings['selectMode'] = 'single';
    else
      this.tbl_bousertypemenuaccesses.source.settings['selectMode'] = 'multi';
    this.tbl_bousertypemenuaccesses.source.initGrid();
  }
  delete_bousertypemenuaccesses_All() {
    this.tbl_bousertypemenuaccesses.source.settings['selectMode'] = 'single';
  }
  show_bousertypemenuaccesses_Filter() {
    setTimeout(() => {
      //  this.Set_bousertypemenuaccesses_TableDropDownConfig();
    });
    if (this.tbl_bousertypemenuaccesses.source.settings != null) this.tbl_bousertypemenuaccesses.source.settings['hideSubHeader'] = !this.tbl_bousertypemenuaccesses.source.settings['hideSubHeader'];
    this.tbl_bousertypemenuaccesses.source.initGrid();
  }
  show_bousertypemenuaccesses_InActive() {
  }
  enable_bousertypemenuaccesses_InActive() {
  }
  async Set_bousertypemenuaccesses_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_bousertypemenuaccesses) {
    }
    this.bfilterPopulate_bousertypemenuaccesses = true;
  }
  async bousertypemenuaccesses_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_bousertypemenuaccesses_TableConfig() {
    this.bousertypemenuaccesses_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'multi',
      actions: {
        columnTitle: '',
        width: '300px',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        custom: [
          { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>' }
        ],
      },
      columns: {
        rolemenuaccessid: {
          title: 'Role Menu Access',
          type: '',
        },
        menuid: {
          title: 'Menu',
          type: '',
        },
        menudescription: {
          title: 'Menudescription',
          type: '',
        },
        menuurl: {
          title: 'Menuurl',
          type: '',
        },
        parentid: {
          title: 'Parentid',
          type: '',
        },
      },
    };
  }
  bousertypemenuaccesses_LoadTable(bousertypemenuaccesses = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousertypemenuaccesses_ID) >= 0) {
      if (this.tbl_bousertypemenuaccesses != undefined) this.tbl_bousertypemenuaccesses.source = new LocalDataSource();
      if (this.tbl_bousertypemenuaccesses != undefined) this.tbl_bousertypemenuaccesses.source.load(bousertypemenuaccesses as any as LocalDataSource);
      setTimeout(() => {
        if (this.tbl_bousertypemenuaccesses.source != null) {
          this.tbl_bousertypemenuaccesses.source.grid.getRows().forEach((row: any) => {
            if (row.data.rolemenuaccessid != null && row.data.rolemenuaccessid != "") {
              this.Insertbousertypemenuaccesses.push(row.data);
              this.tbl_bousertypemenuaccesses.source.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }

  //external to inline
  /*
  bousertypemenuaccesses_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.bouserrolemaster_service.bousertypemenuaccesses.length == 0)
  {
      this.tbl_bousertypemenuaccesses.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bousertypemenuaccess();
      this.bouserrolemaster_service.bousertypemenuaccesses.push(obj);
      this.tbl_bousertypemenuaccesses.source.refresh();
      if ((this.bouserrolemaster_service.bousertypemenuaccesses.length / this.tbl_bousertypemenuaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bousertypemenuaccesses.source.getPaging().page)
      {
          this.tbl_bousertypemenuaccesses.source.setPage((this.bouserrolemaster_service.bousertypemenuaccesses.length / this.tbl_bousertypemenuaccesses.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_bousertypemenuaccesses.source.grid.edit(this.tbl_bousertypemenuaccesses.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_bousertypemenuaccesses.source.data.indexOf(event.data);
  this.onDelete_bousertypemenuaccess(event,event.data.rolemenuaccessid,((this.tbl_bousertypemenuaccesses.source.getPaging().page-1) *this.tbl_bousertypemenuaccesses.source.getPaging().perPage)+index);
  this.tbl_bousertypemenuaccesses.source.refresh();
  break;
  }
  }
  
  */
  bousertypemenuaccesses_Paging(val) {
    debugger;
    this.tbl_bousertypemenuaccesses.source.setPaging(1, val, true);
  }

  handle_bousertypemenuaccesses_GridSelected(event: any) {
    debugger;

    if (event.isSelected) {
      if (event.data.rolemenuaccessid == null || event.data.rolemenuaccessid == "") {
        var obj = { roleid: this.formid, menuid: event.data.menuid }
        this.Insertbousertypemenuaccesses.push(obj as any);
      }
      else {
        var deletedids = this.Deleted_bousertypemenuaccess_IDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.rolemenuaccessid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.rolemenuaccessid != null && event.data.rolemenuaccessid != "") this.Deleted_bousertypemenuaccess_IDs += event.data.rolemenuaccessid + ",";
    }
  }
  Is_bousertypemenuaccesses_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousertypemenuaccesses_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bousertypemenuaccesses

}



