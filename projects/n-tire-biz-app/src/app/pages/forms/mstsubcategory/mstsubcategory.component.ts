import { mstsubcategoryService } from './../../../service/mstsubcategory.service';
import { mstsubcategory } from './../../../model/mstsubcategory.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
  selector: 'app-mstsubcategory',
  templateUrl: './mstsubcategory.component.html',
  styles: [`
  @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .mobile_btn{
          position: relative !important;
          bottom: 5px !important;
        }
      }
  `],
  providers: []
})



export class mstsubcategoryComponent implements OnInit {
  formData: mstsubcategory;
  list: mstsubcategory[];
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

  bfilterPopulate_mstsubcategories: boolean = false;
  mstsubcategory_menuactions: any = []

  mstsubcategory_Form: FormGroup;

  segmentid_List: DropDownValues[];
  segmentid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;

  constructor(private router: Router,
    private themeService: ThemeService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstsubcategory_service: mstsubcategoryService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.mstsubcategory_Form = this.fb.group({
      pk: [null],
      subcategoryid: [null],
      name: [null, Validators.compose([Validators.required])],
      categoryid: [null],
      segmentid: [null],
      segmentiddesc: [null],
      status: [null],
      statusdesc: [null],
      skillcategory: [null]
    });
  }

  get f() { return this.mstsubcategory_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    if (this.mstsubcategory_Form.dirty && this.mstsubcategory_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.subcategoryid && pkDetail) {
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
    let mstsubcategoryid = null;

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
    this.formid = mstsubcategoryid;

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }

    this.mstsubcategory_service.getDefaultData().then(res => {
      this.segmentid_List = res.list_segmentid.value;
    }).catch((err) => { this.spinner.hide(); });

    //autocomplete
    this.mstsubcategory_service.get_mstsubcategories_List().then(res => {
      this.pkList = res as mstsubcategory[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    //setting the flag that the screen is not touched
    this.mstsubcategory_Form.markAsUntouched();
    this.mstsubcategory_Form.markAsPristine();
  }
  onSelected_segmentid(segmentidDetail: any) {
    if (segmentidDetail.value && segmentidDetail) {
      this.mstsubcategory_Form.patchValue({
        segmentid: segmentidDetail.value,
        segmentiddesc: segmentidDetail.label,

      });

    }
  }

  resetForm() {
    if (this.mstsubcategory_Form != null)
      this.mstsubcategory_Form.reset();
    this.mstsubcategory_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let subcategoryid = this.mstsubcategory_Form.get('subcategoryid').value;
    if (subcategoryid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstsubcategory_service.delete_mstsubcategory(subcategoryid).then(res => {
          this.resetForm();
        }
        ).catch((err) => { this.spinner.hide();});
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.mstsubcategory_Form.patchValue({
      subcategoryid: null
    });
    if (this.formData.subcategoryid != null) this.formData.subcategoryid = null;
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
            this.mstsubcategory_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstsubcategory_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstsubcategory_Form.controls[key] != undefined) {
                this.mstsubcategory_Form.controls[key].disable({ onlySelf: true });
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
    if
      (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      debugger
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined)
    ) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  segmentid_onChange(evt: any) {
    let e = evt.value;
  }

  edit_mstsubcategories() {
    this.showview = false;
    return false;
  }

  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstsubcategory_service.get_mstsubcategories_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.mstsubcategory;
      let formproperty = res.mstsubcategory.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstsubcategory.pkcol;
      this.formid = res.mstsubcategory.subcategoryid;
      this.FillData(res);
    }).catch((err) => { });
  }

  FillData(res: any) {
    this.formData = res.mstsubcategory;
    this.formid = res.mstsubcategory.subcategoryid;
    this.pkcol = res.mstsubcategory.pkcol;
    this.bmyrecord = false;
    if ((res.mstsubcategory as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    this.mstsubcategory_Form.patchValue({
      subcategoryid: res.mstsubcategory.subcategoryid,
      code: res.mstsubcategory.code,
      name: res.mstsubcategory.name,
      categoryid: res.mstsubcategory.categoryid,
      segmentid: res.mstsubcategory.segmentid,
      segmentiddesc: res.mstsubcategory.segmentiddesc,
      status: res.mstsubcategory.status,
      statusdesc: res.mstsubcategory.statusdesc,
    });
    this.mstsubcategory_menuactions = res.mstsubcategory_menuactions;
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;

    for (let key in this.mstsubcategory_Form.controls) {
      let val = this.mstsubcategory_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstsubcategory_Form.controls[key] != null) {
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
    if (!this.mstsubcategory_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstsubcategory_Form.getRawValue();
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
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
    this.isSubmitted = true;

    if (!this.mstsubcategory_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.mstsubcategory_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstsubcategory_Form.controls[key] != null) {
            this.formData[key] = this.mstsubcategory_Form.controls[key].value;
          }
        }
      }
    }
    this.spinner.show();
    this.mstsubcategory_service.saveOrUpdate_mstsubcategories(this.formData).subscribe(
      async res => {
        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any));
        if (!bclear) this.showview = true;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
          document.getElementById("contentAreascroll").scrollTop = 0;
        }
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).mstsubcategory);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstsubcategory_Form.markAsUntouched();
        this.mstsubcategory_Form.markAsPristine();
      },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("success", 'your data added successfully', "please clear and add new data");
      }
    )
  }



  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}



