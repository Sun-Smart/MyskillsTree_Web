import { mstsegmentService } from './../../../service/mstsegment.service';
import { mstsegment } from './../../../model/mstsegment.model';
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
import { mstcategory } from './../../../model/mstcategory.model';
import { mstcategoryComponent } from './../../../pages/forms/mstcategory/mstcategory.component';
import { mstcategoryService } from './../../../service/mstcategory.service';
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
  selector: 'app-mstsegment',
  templateUrl: './mstsegment.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class mstsegmentComponent implements OnInit {
  formData: mstsegment;
  list: mstsegment[];
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

  bfilterPopulate_mstsegments: boolean = false;
  bfilterPopulate_mstcategories: boolean = false;
  mstsegment_menuactions: any = []
  mstcategory_menuactions: any = []
  @ViewChild('tbl_mstcategories', { static: false }) tbl_mstcategories: Ng2SmartTableComponent;

  mstsegment_Form: FormGroup;


  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;



  mstcategories_visiblelist: any;
  mstcategories_hidelist: any;

  Deleted_mstcategory_IDs: string = "";
  mstcategories_ID: string = "1";
  mstcategories_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstsegment_service: mstsegmentService,
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
    this.mstsegment_Form = this.fb.group({
      pk: [null],
      segmentid: [null],
      // code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.mstsegment_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.mstsegment_Form.dirty && this.mstsegment_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.segmentid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.segmentid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.segmentid && pkDetail) {
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
    let mstsegmentid = null;

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
    this.formid = mstsegmentid;
    //alert(mstsegmentid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_mstcategories_TableConfig();
      setTimeout(() => {
        //this.Set_mstcategories_TableDropDownConfig();
      });

      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstsegment_service.getDefaultData().then(res => {
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstsegment_service.get_mstsegments_List().then(res => {
      this.pkList = res as mstsegment[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstsegment_Form.markAsUntouched();
    this.mstsegment_Form.markAsPristine();
  }



  resetForm() {
    if (this.mstsegment_Form != null)
      this.mstsegment_Form.reset();
    this.mstsegment_Form.patchValue({
    });
    setTimeout(() => {
      this.mstcategories_LoadTable();
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }
  onDelete() {
    debugger
    let segmentid = this.mstsegment_Form.get('segmentid').value;
    if (segmentid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstsegment_service.delete_mstsegment(segmentid).then(res => {
          debugger
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
    this.mstsegment_Form.patchValue({
      segmentid: null
    });
    if (this.formData.segmentid != null) this.formData.segmentid = null;
    for (let i = 0; i < this.tbl_mstcategories.source.length; i++) {
      this.tbl_mstcategories.source[i].categoryid = null;
    }
  }
  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    debugger
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (ctrltype == "string") {
            this.mstsegment_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstsegment_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstsegment_Form.controls[key] != undefined) {
                this.mstsegment_Form.controls[key].disable({ onlySelf: true });
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.name != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.name != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  edit_mstsegments() {
    debugger
    this.showview = false;
    setTimeout(() => {
    });
    return true;
  }



  async PopulateScreen(pkcol: any) {
    debugger
    this.spinner.show();
    debugger
    this.mstsegment_service.get_mstsegments_ByEID(pkcol).then(res => {
      debugger
      console.log("test")
      this.spinner.hide();

      this.formData = res.mstsegment;
      let formproperty = res.mstsegment.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstsegment.pkcol;
      this.formid = res.mstsegment.segmentid;
      this.FillData(res);
      console.log(res)
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.mstsegment;
    this.formid = res.mstsegment.segmentid;
    this.pkcol = res.mstsegment.pkcol;
    this.bmyrecord = false;
    if ((res.mstsegment as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.mstsegment_Form.patchValue({
      segmentid: res.mstsegment.segmentid,
      code: res.mstsegment.code,
      name: res.mstsegment.name,
      status: res.mstsegment.status,
      statusdesc: res.mstsegment.statusdesc,
    });
    this.mstsegment_menuactions = res.mstsegment_menuactions;
    this.mstcategory_menuactions = res.mstcategory_menuactions;
    this.mstcategories_visiblelist = res.mstcategories_visiblelist;
    //Child Tables if any
    setTimeout(() => {
      this.Set_mstcategories_TableConfig();
      this.mstcategories_LoadTable(res.mstcategories);
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

    for (let key in this.mstsegment_Form.controls) {
      let val = this.mstsegment_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstsegment_Form.controls[key] != null) {
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
    if (!this.mstsegment_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstsegment_Form.getRawValue();
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
    // Object.keys(this.mstsegment_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.mstsegment_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.mstsegment_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.mstsegment_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstsegment_Form.controls[key] != null) {
            this.formData[key] = this.mstsegment_Form.controls[key].value;
          }
        }
      }
    }
    this.formData.Deleted_mstcategory_IDs = this.Deleted_mstcategory_IDs;

    console.log(this.formData);
    this.spinner.show();
    this.mstsegment_service.saveOrUpdate_mstsegments(this.formData, this.tbl_mstcategories?.source?.data,).subscribe(
      async res => {
        if (this.tbl_mstcategories.source) {
          for (let i = 0; i < this.tbl_mstcategories.source.data.length; i++) {
            if (this.tbl_mstcategories.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstcategories.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).mstsegment);
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
            this.objvalues.push((res as any).mstsegment);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstsegment_Form.markAsUntouched();
        this.mstsegment_Form.markAsPristine();
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
    this.tbl_mstcategories.source = new LocalDataSource();
  }

  AddOrEdit_mstcategory(event: any, categoryid: any, segmentid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(mstcategoryComponent,
      {
         width: "90% !important",

        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, categoryid, segmentid, visiblelist: this.mstcategories_visiblelist, hidelist: this.mstcategories_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_mstcategories.source.add(res[i]);
          }
          this.tbl_mstcategories.source.refresh();
        }
        else {
          this.tbl_mstcategories.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_mstcategory(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_mstcategory_IDs += childID + ",";
    this.tbl_mstcategories.source.splice(i, 1);
    //this.updateGrandTotal();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes mstcategories
  mstcategories_settings: any;

  show_mstcategories_Checkbox() {
    debugger;
    if (this.tbl_mstcategories.source.settings['selectMode'] == 'multi') this.tbl_mstcategories.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstcategories.source.settings['selectMode'] = 'multi';
    this.tbl_mstcategories.source.initGrid();
  }
  delete_mstcategories_All() {
    this.tbl_mstcategories.source.settings['selectMode'] = 'single';
  }
  show_mstcategories_Filter() {
    setTimeout(() => {
      //  this.Set_mstcategories_TableDropDownConfig();
    });
    if (this.tbl_mstcategories.source.settings != null) this.tbl_mstcategories.source.settings['hideSubHeader'] = !this.tbl_mstcategories.source.settings['hideSubHeader'];
    this.tbl_mstcategories.source.initGrid();
  }
  show_mstcategories_InActive() {
  }
  enable_mstcategories_InActive() {
  }
  async Set_mstcategories_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstcategories) {
    }
    this.bfilterPopulate_mstcategories = true;
  }
  async mstcategories_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_mstcategories_TableConfig() {
    this.mstcategories_settings = {
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
        custom: this.mstcategory_menuactions
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
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
      },
    };
  }
  mstcategories_LoadTable(mstcategories = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstcategories_ID) >= 0) {
      if (this.tbl_mstcategories != undefined) this.tbl_mstcategories.source = new LocalDataSource();
      //suneelerror1
      if (this.tbl_mstcategories != undefined) this.tbl_mstcategories.source.load(mstcategories as any as LocalDataSource);
      if (this.tbl_mstcategories != undefined) this.tbl_mstcategories.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  mstcategories_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.mstsegment_service.mstcategories.length == 0)
  {
      this.tbl_mstcategories.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new mstcategory();
      this.mstsegment_service.mstcategories.push(obj);
      this.tbl_mstcategories.source.refresh();
      if ((this.mstsegment_service.mstcategories.length / this.tbl_mstcategories.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstcategories.source.getPaging().page)
      {
          this.tbl_mstcategories.source.setPage((this.mstsegment_service.mstcategories.length / this.tbl_mstcategories.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_mstcategories.source.grid.edit(this.tbl_mstcategories.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  if (confirm('Do you want to want to delete?')) {
  let index = this.tbl_mstcategories.source.data.indexOf(event.data);
  this.onDelete_mstcategory(event,event.data.categoryid,((this.tbl_mstcategories.source.getPaging().page-1) *this.tbl_mstcategories.source.getPaging().perPage)+index);
  this.tbl_mstcategories.source.refresh();
  }
  break;
  }
  }

  */
  mstcategories_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_mstcategory(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_mstcategory(event, event.data.categoryid, this.formid);
        break;
      case 'delete':
        if (confirm('Do you want to want to delete?')) {
          this.onDelete_mstcategory(event, event.data.categoryid, ((this.tbl_mstcategories.source.getPaging().page - 1) * this.tbl_mstcategories.source.getPaging().perPage) + event.index);
          this.tbl_mstcategories.source.refresh();
        }
        break;
    }
  }
  mstcategories_onDelete(obj) {
    let categoryid = obj.data.categoryid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstsegment_service.delete_mstsegment(categoryid).then(res =>
        this.mstcategories_LoadTable()
      );
    }
  }
  async onCustom_mstcategories_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstcategories");
    let formname = (objbomenuaction as any).actionname;




  }
  mstcategories_Paging(val) {
    debugger;
    this.tbl_mstcategories.source.setPaging(1, val, true);
  }

  handle_mstcategories_GridSelected(event: any) {
    this.mstcategories_selectedindex = this.tbl_mstcategories.source.findIndex(i => i.categoryid === event.data.categoryid);
  }
  Is_mstcategories_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstcategories_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes mstcategories

}



