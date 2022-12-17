import { mstcategoryService } from './../../../service/mstcategory.service';
import { mstcategory } from './../../../model/mstcategory.model';
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
import { mstsubcategory } from './../../../model/mstsubcategory.model';
import { mstsubcategoryComponent } from './../../../pages/forms/mstsubcategory/mstsubcategory.component';
import { mstsubcategoryService } from './../../../service/mstsubcategory.service';
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
  selector: 'app-mstcategory',
  templateUrl: './mstcategory.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class mstcategoryComponent implements OnInit {
  formData: mstcategory;
  list: mstcategory[];
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

  bfilterPopulate_mstcategories: boolean = false;
  bfilterPopulate_mstsubcategories: boolean = false;
  mstcategory_menuactions: any = []
  mstsubcategory_menuactions: any = []
  @ViewChild('tbl_mstsubcategories', { static: false }) tbl_mstsubcategories: Ng2SmartTableComponent;

  mstcategory_Form: FormGroup;


  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;



  mstsubcategories_visiblelist: any;
  mstsubcategories_hidelist: any;


  Deleted_mstsubcategory_IDs: string = "";
  mstsubcategories_ID: string = "1";
  mstsubcategories_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstcategory_service: mstcategoryService,
    private mstsubcategory_service: mstsubcategoryService,
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
    this.mstcategory_Form = this.fb.group({
      pk: [null],
      categoryid: [null],
      // code: [null],
      name: [null],
      segmentid: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.mstcategory_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.mstcategory_Form.dirty && this.mstcategory_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.categoryid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.categoryid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.categoryid && pkDetail) {
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
      debugger
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
    let mstcategoryid = null;

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
    this.formid = mstcategoryid;
    //alert(mstcategoryid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_mstsubcategories_TableConfig();
      setTimeout(() => {
        //this.Set_mstsubcategories_TableDropDownConfig();
      });

      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstcategory_service.getDefaultData().then(res => {
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstcategory_service.get_mstcategories_List().then(res => {
      this.pkList = res as mstcategory[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstcategory_Form.markAsUntouched();
    this.mstcategory_Form.markAsPristine();
  }



  resetForm() {
    if (this.mstcategory_Form != null)
      this.mstcategory_Form.reset();
    this.mstcategory_Form.patchValue({
    });
    setTimeout(() => {
      this.mstsubcategories_LoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let categoryid = this.mstcategory_Form.get('categoryid').value;
    if (categoryid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstcategory_service.delete_mstcategory(categoryid).then(res => {
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
    this.mstcategory_Form.patchValue({
      categoryid: null
    });
    if (this.formData.categoryid != null) this.formData.categoryid = null;
    for (let i = 0; i < this.tbl_mstsubcategories.source.length; i++) {
      this.tbl_mstsubcategories.source[i].subcategoryid = null;
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
            this.mstcategory_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstcategory_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstcategory_Form.controls[key] != undefined) {
                this.mstcategory_Form.controls[key].disable({ onlySelf: true });
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
    debugger
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }

    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      debugger
      this.onSubmitDataDlg(false);
    }
    else {
      debugger
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    debugger
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.name != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      // this.onSubmitDataDlg(true);

      this.onSubmitData(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  edit_mstcategories() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    debugger
    this.spinner.show();
    this.mstcategory_service.get_mstcategories_ByEID(pkcol).then(res => {
      debugger
      this.spinner.hide();

      this.formData = res.mstcategory;
      let formproperty = res.mstcategory.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstcategory.pkcol;
      this.formid = res.mstcategory.categoryid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    debugger
    this.formData = res.mstcategory;
    this.formid = res.mstcategory.categoryid;
    this.pkcol = res.mstcategory.pkcol;
    this.bmyrecord = false;
    if ((res.mstcategory as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.mstcategory_Form.patchValue({
      categoryid: res.mstcategory.categoryid,
      code: res.mstcategory.code,
      name: res.mstcategory.name,
      segmentid: res.mstcategory.segmentid,
      status: res.mstcategory.status,
      statusdesc: res.mstcategory.statusdesc,
    });
    this.mstcategory_menuactions = res.mstcategory_menuactions;
    this.mstsubcategory_menuactions = res.mstsubcategory_menuactions;
    this.mstsubcategories_visiblelist = res.mstsubcategories_visiblelist;
    //Child Tables if any
    setTimeout(() => {
      this.Set_mstsubcategories_TableConfig();
      this.mstsubcategories_LoadTable(res.mstsubcategories);
    });
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    debugger
    let ret = "";
    ret = html;

    for (let key in this.mstcategory_Form.controls) {
      let val = this.mstcategory_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstcategory_Form.controls[key] != null) {
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
    return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
  }

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.mstcategory_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstcategory_Form.getRawValue();
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
    // Object.keys(this.mstcategory_Form.controls).forEach(key => {
    //   debugger
    //   const controlErrors: ValidationErrors = this.mstcategory_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.mstcategory_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.mstcategory_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstcategory_Form.controls[key] != null) {
            this.formData[key] = this.mstcategory_Form.controls[key].value;
          }
        }
      }
    }
    this.formData.Deleted_mstsubcategory_IDs = this.Deleted_mstsubcategory_IDs;
    console.log(this.formData);
    this.spinner.show();
    this.mstcategory_service.saveOrUpdate_mstcategories(this.formData, this.tbl_mstsubcategories?.source?.data,).subscribe(
      async res => {
        debugger
        if (this.tbl_mstsubcategories.source) {
          for (let i = 0; i < this.tbl_mstsubcategories.source.data.length; i++) {
            if (this.tbl_mstsubcategories.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstsubcategories.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).mstcategory);
        if (!bclear) this.showview = true;
        // document.getElementById("contentAreascroll").scrollTop = 0;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
          document.getElementById("contentAreascroll").scrollTop = 0;
        }
        this.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).mstcategory);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstcategory_Form.markAsUntouched();
        this.mstcategory_Form.markAsPristine();
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
    this.tbl_mstsubcategories.source = new LocalDataSource();
  }

  AddOrEdit_mstsubcategory(event: any, subcategoryid: any, categoryid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(mstsubcategoryComponent,
      {
        width: "90% !important",

        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subcategoryid, categoryid, visiblelist: this.mstsubcategories_visiblelist, hidelist: this.mstsubcategories_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_mstsubcategories.source.add(res[i]);
          }
          this.tbl_mstsubcategories.source.refresh();
        }
        else {
          this.tbl_mstsubcategories.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_mstsubcategory(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_mstsubcategory_IDs += childID + ",";
    this.tbl_mstsubcategories.source.splice(i, 1);
    //this.updateGrandTotal();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes mstsubcategories
  mstsubcategories_settings: any;

  show_mstsubcategories_Checkbox() {
    debugger;
    if (this.tbl_mstsubcategories.source.settings['selectMode'] == 'multi') this.tbl_mstsubcategories.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstsubcategories.source.settings['selectMode'] = 'multi';
    this.tbl_mstsubcategories.source.initGrid();
  }
  delete_mstsubcategories_All() {
    this.tbl_mstsubcategories.source.settings['selectMode'] = 'single';
  }
  show_mstsubcategories_Filter() {
    setTimeout(() => {
      //  this.Set_mstsubcategories_TableDropDownConfig();
    });
    if (this.tbl_mstsubcategories.source.settings != null) this.tbl_mstsubcategories.source.settings['hideSubHeader'] = !this.tbl_mstsubcategories.source.settings['hideSubHeader'];
    this.tbl_mstsubcategories.source.initGrid();
  }
  show_mstsubcategories_InActive() {
  }
  enable_mstsubcategories_InActive() {
  }
  async Set_mstsubcategories_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstsubcategories) {
    }
    this.bfilterPopulate_mstsubcategories = true;
  }
  async mstsubcategories_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_mstsubcategories_TableConfig() {
    this.mstsubcategories_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        add: !this.showview,
        edit: true, // true,
        delete: !this.showview,
        position: 'left',
        custom: this.mstsubcategory_menuactions
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        code: {
          title: 'Code',
          type: '',
          filter: true,
        },
        name: {
          title: 'Name',
          type: '',
          filter: true,
        },
      },
    };
  }
  mstsubcategories_LoadTable(mstsubcategories = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstsubcategories_ID) >= 0) {
      if (this.tbl_mstsubcategories != undefined) this.tbl_mstsubcategories.source = new LocalDataSource();
      if (this.tbl_mstsubcategories != undefined) this.tbl_mstsubcategories.source.load(mstsubcategories as any as LocalDataSource);
      if (this.tbl_mstsubcategories != undefined) this.tbl_mstsubcategories.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  mstsubcategories_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.mstcategory_service.mstsubcategories.length == 0)
  {
      this.tbl_mstsubcategories.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new mstsubcategory();
      this.mstcategory_service.mstsubcategories.push(obj);
      this.tbl_mstsubcategories.source.refresh();
      if ((this.mstcategory_service.mstsubcategories.length / this.tbl_mstsubcategories.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstsubcategories.source.getPaging().page)
      {
          this.tbl_mstsubcategories.source.setPage((this.mstcategory_service.mstsubcategories.length / this.tbl_mstsubcategories.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_mstsubcategories.source.grid.edit(this.tbl_mstsubcategories.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  if (confirm('Do you want to want to delete?')) {
  let index = this.tbl_mstsubcategories.source.data.indexOf(event.data);
  this.onDelete_mstsubcategory(event,event.data.subcategoryid,((this.tbl_mstsubcategories.source.getPaging().page-1) *this.tbl_mstsubcategories.source.getPaging().perPage)+index);
  this.tbl_mstsubcategories.source.refresh();
  }
  break;
  }
  }

  */
  mstsubcategories_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_mstsubcategory(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_mstsubcategory(event, event.data.subcategoryid, this.formid);
        break;
      case 'delete':
        if (confirm('Do you want to want to delete?')) {
          this.onDelete_mstsubcategory(event, event.data.subcategoryid, ((this.tbl_mstsubcategories.source.getPaging().page - 1) * this.tbl_mstsubcategories.source.getPaging().perPage) + event.index);
          this.tbl_mstsubcategories.source.refresh();
        }
        break;
    }
  }
  mstsubcategories_onDelete(obj) {
    let subcategoryid = obj.data.subcategoryid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstcategory_service.delete_mstcategory(subcategoryid).then(res =>
        this.mstsubcategories_LoadTable()
      );
    }
  }
  async onCustom_mstsubcategories_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstsubcategories");
    let formname = (objbomenuaction as any).actionname;




  }
  mstsubcategories_Paging(val) {
    debugger;
    this.tbl_mstsubcategories.source.setPaging(1, val, true);
  }

  handle_mstsubcategories_GridSelected(event: any) {
    this.mstsubcategories_selectedindex = this.tbl_mstsubcategories.source.findIndex(i => i.subcategoryid === event.data.subcategoryid);
  }
  Is_mstsubcategories_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstsubcategories_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes mstsubcategories

}



