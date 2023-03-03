import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
import { lmsproductmaster } from './../../../model/lmsproductmaster.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-lmsproductmaster',
  templateUrl: './lmsproductmaster.component.html',
  styles: [],
  providers: []
})



export class lmsproductmasterComponent implements OnInit {
  formData: lmsproductmaster;
  list: lmsproductmaster[];
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
  @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  p_menuid: any;
  p_currenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  maindata: any;

  bfilterPopulate_lmsproductmasters: boolean = false;
  bfilterPopulate_lmsbundledproducts: boolean = false;
  lmsproductmaster_menuactions: any = []
  Insertlmsbundledproducts = [];
  lmsbundledproduct_menuactions: any = []
  @ViewChild('tbl_lmsbundledproducts', { static: false }) tbl_lmsbundledproducts: Ng2SmartTableComponent;

  lmsproductmaster_Form: FormGroup;

  productgroup_List: DropDownValues[];

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  customFieldJson: any;
  customFieldVisible: boolean = true;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;

  lmsbundledproducts_visiblelist: any;
  lmsbundledproducts_hidelist: any;

  Deleted_lmsbundledproduct_IDs: string = "";
  lmsbundledproducts_ID: string = "1";
  lmsbundledproducts_selectedindex: any;


  constructor(private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private lmsproductmaster_service: lmsproductmasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private customfieldservice: customfieldconfigurationService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.lmsproductmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      productid: [null],
      productgroup: [null],
      productgroupdesc: [null],
      productcode: [null, Validators.compose([Validators.required])],
      productname: [null, Validators.compose([Validators.required])],
      productimage: [null],
      description: [null],
      dimension: [null],
      details: [null],
      bundleproduct: [null],
      productowner: [null],
      validfrom: [null],
      validto: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.lmsproductmaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    if (this.lmsproductmaster_Form.dirty && this.lmsproductmaster_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields
  productcodeexists(e: any) {
    let pos = this.pkList.map(function (e: any) { return e.productcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].productid.toString() != this.formid.toString()) {
      if (confirm("This Product Code value exists in the database.Do you want to display the record ? ")) {
        this.PopulateScreen(this.pkList[pos].pkcol);
        return true;
      }
      else {
        e.stopPropagation();
        e.preventDefault();
        e.target.focus();
        e.target.markAsDirty();
        return false;
      }
    }
    return true;
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.productid && pkDetail) {
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
    let lmsproductmasterid = null;

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
    this.formid = lmsproductmasterid;
    //alert(lmsproductmasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_lmsbundledproducts_TableConfig();

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.lmsproductmaster_service.getDefaultData().then(res => {
      this.productgroup_List = res.list_productgroup.value;
    }).catch((err) => { this.spinner.hide(); });

    //autocomplete
    this.lmsproductmaster_service.get_lmsproductmasters_List().then(res => {
      this.pkList = res as lmsproductmaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    //setting the flag that the screen is not touched
    this.lmsproductmaster_Form.markAsUntouched();
    this.lmsproductmaster_Form.markAsPristine();
  }



  resetForm() {
    if (this.lmsproductmaster_Form != null)
      this.lmsproductmaster_Form.reset();
    this.lmsproductmaster_Form.patchValue({
    });
    setTimeout(() => {
      this.Insertlmsbundledproducts = [];
      this.lmsbundledproducts_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let productid = this.lmsproductmaster_Form.get('productid').value;
    if (productid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.lmsproductmaster_service.delete_lmsproductmaster(productid).then(res => {
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
    this.lmsproductmaster_Form.patchValue({
      productid: null
    });
    if (this.formData.productid != null) this.formData.productid = null;
    for (let i = 0; i < this.tbl_lmsbundledproducts.source.length; i++) {
      this.tbl_lmsbundledproducts.source[i].bundleproductid = null;
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
          else if (key == "productowner")
            this.lmsproductmaster_Form.patchValue({ "productowner": mainscreendata[key] });
          else if (key == "validfrom")
            this.lmsproductmaster_Form.patchValue({ "validfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "validto")
            this.lmsproductmaster_Form.patchValue({ "validto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.lmsproductmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.lmsproductmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.lmsproductmaster_Form.controls[key] != undefined) {
                this.lmsproductmaster_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsproductmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


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
  productgroup_onChange(evt: any) {
    let e = this.f.productgroup.value as any;
    this.lmsproductmaster_Form.patchValue({ productgroupdesc: evt.options[evt.options.selectedIndex].text });
  }
  attachmentuploader(e: any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileAttachmentList.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
      max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentFieldJson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }

  edit_lmsproductmasters() {
    this.showview = false;
    return false;
  }

  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.lmsproductmaster_service.get_lmsproductmasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.lmsproductmaster;
      let formproperty = res.lmsproductmaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.lmsproductmaster.pkcol;
      this.formid = res.lmsproductmaster.productid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.lmsproductmaster;
    this.formid = res.lmsproductmaster.productid;
    this.pkcol = res.lmsproductmaster.pkcol;
    this.bmyrecord = false;
    if ((res.lmsproductmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.lmsproductmaster_Form.patchValue({
      productid: res.lmsproductmaster.productid,
      productgroup: res.lmsproductmaster.productgroup,
      productgroupdesc: res.lmsproductmaster.productgroupdesc,
      productcode: res.lmsproductmaster.productcode,
      productname: res.lmsproductmaster.productname,
      productimage: res.lmsproductmaster.productimage,
      description: res.lmsproductmaster.description,
      dimension: res.lmsproductmaster.dimension,
      details: res.lmsproductmaster.details,
      bundleproduct: res.lmsproductmaster.bundleproduct,
      productowner: JSON.parse(res.lmsproductmaster.productowner),
      validfrom: this.ngbDateParserFormatter.parse(res.lmsproductmaster.validfrom),
      validto: this.ngbDateParserFormatter.parse(res.lmsproductmaster.validto),
      customfield: res.lmsproductmaster.customfield,
      attachment: JSON.parse(res.lmsproductmaster.attachment),
      status: res.lmsproductmaster.status,
      statusdesc: res.lmsproductmaster.statusdesc,
    });
    this.lmsproductmaster_menuactions = res.lmsproductmaster_menuactions;
    this.lmsbundledproduct_menuactions = res.lmsbundledproduct_menuactions;
    this.lmsbundledproducts_visiblelist = res.lmsbundledproducts_visiblelist;
    if (this.lmsproductmaster_Form.get('customfield').value != null && this.lmsproductmaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmsproductmaster_Form.get('customfield').value);
    this.FillCustomField();
    if (this.lmsproductmaster_Form.get('attachment').value != null && this.lmsproductmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmsproductmaster_Form.get('attachment').value);
    //Child Tables if any
    this.Set_lmsbundledproducts_TableConfig();
    this.lmsbundledproducts_LoadTable(res.lmsbundledproducts);
    this.Insertlmsbundledproducts = [];
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;

    for (let key in this.lmsproductmaster_Form.controls) {
      let val = this.lmsproductmaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.lmsproductmaster_Form.controls[key] != null) {
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
    if (!this.lmsproductmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.lmsproductmaster_Form.getRawValue();
    if (this.lmsproductmaster_Form.get('productowner').value != null) obj.productowner = JSON.stringify(this.lmsproductmaster_Form.get('productowner').value);
    obj.validfrom = new Date(this.lmsproductmaster_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmsproductmaster_Form.get('validfrom').value) + '  UTC' : null);
    obj.validto = new Date(this.lmsproductmaster_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmsproductmaster_Form.get('validto').value) + '  UTC' : null);
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
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
    // Object.keys(this.lmsproductmaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.lmsproductmaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.lmsproductmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.lmsproductmaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.lmsproductmaster_Form.controls[key] != null) {
            this.formData[key] = this.lmsproductmaster_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    if (this.lmsproductmaster_Form.get('productowner').value != null) this.formData.productowner = JSON.stringify(this.lmsproductmaster_Form.get('productowner').value);
    this.formData.validfrom = new Date(this.lmsproductmaster_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmsproductmaster_Form.get('validfrom').value) + '  UTC' : null);
    this.formData.validto = new Date(this.lmsproductmaster_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmsproductmaster_Form.get('validto').value) + '  UTC' : null);
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_lmsbundledproduct_IDs = this.Deleted_lmsbundledproduct_IDs;
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.lmsproductmaster_service.saveOrUpdate_lmsproductmasters(this.formData, this.tbl_lmsbundledproducts?.source?.data, this.Insertlmsbundledproducts,).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_lmsbundledproducts.source) {
          for (let i = 0; i < this.tbl_lmsbundledproducts.source.data.length; i++) {
            if (this.tbl_lmsbundledproducts.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsbundledproducts.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).lmsproductmaster);
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
            this.objvalues.push((res as any).lmsproductmaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.lmsproductmaster_Form.markAsUntouched();
        this.lmsproductmaster_Form.markAsPristine();
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
    this.tbl_lmsbundledproducts.source = new LocalDataSource();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes lmsbundledproducts
  async onCustom_lmsbundledproducts_Action(event: any) {
    debugger;
    switch (event.action) {
      case 'viewrecord':
        let val = event.data.pkcol;
        this.dialog.open(lmsproductmasterComponent,
          {
            data: { showview: false, pkcol: val, ScreenType: 2 },
          }
        ).onClose.subscribe(res => {
        });
        break;
    }
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsbundledproducts");
    let formname = (objbomenuaction as any).actionname;
  }
  lmsbundledproducts_settings: any;

  show_lmsbundledproducts_Checkbox() {
    debugger;
    if (this.tbl_lmsbundledproducts.source.settings['selectMode'] == 'multi') this.tbl_lmsbundledproducts.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmsbundledproducts.source.settings['selectMode'] = 'multi';
    this.tbl_lmsbundledproducts.source.initGrid();
  }
  delete_lmsbundledproducts_All() {
    this.tbl_lmsbundledproducts.source.settings['selectMode'] = 'single';
  }
  show_lmsbundledproducts_Filter() {
    setTimeout(() => {
      //  this.Set_lmsbundledproducts_TableDropDownConfig();
    });
    if (this.tbl_lmsbundledproducts.source.settings != null) this.tbl_lmsbundledproducts.source.settings['hideSubHeader'] = !this.tbl_lmsbundledproducts.source.settings['hideSubHeader'];
    this.tbl_lmsbundledproducts.source.initGrid();
  }
  show_lmsbundledproducts_InActive() {
  }
  enable_lmsbundledproducts_InActive() {
  }
  async Set_lmsbundledproducts_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmsbundledproducts) {
    }
    this.bfilterPopulate_lmsbundledproducts = true;
  }
  async lmsbundledproducts_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmsbundledproducts_TableConfig() {
    this.lmsbundledproducts_settings = {
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
        bundleproductid: {
          title: 'Bundle Product',
          type: '',
        },
        productid: {
          title: 'Product',
          type: '',
        },
      },
    };
  }
  lmsbundledproducts_LoadTable(lmsbundledproducts = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsbundledproducts_ID) >= 0) {
      if (this.tbl_lmsbundledproducts != undefined) this.tbl_lmsbundledproducts.source = new LocalDataSource();
      if (this.tbl_lmsbundledproducts != undefined) this.tbl_lmsbundledproducts.source.load(lmsbundledproducts as any as LocalDataSource);
      setTimeout(() => {
        if (this.tbl_lmsbundledproducts.source != null) {
          this.tbl_lmsbundledproducts.source.grid.getRows().forEach((row: any) => {
            if (row.data.bundleproductid != null && row.data.bundleproductid != "") {
              this.Insertlmsbundledproducts.push(row.data);
              this.tbl_lmsbundledproducts.source.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }

  //external to inline
  /*
  lmsbundledproducts_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmsproductmaster_service.lmsbundledproducts.length == 0)
  {
      this.tbl_lmsbundledproducts.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmsbundledproduct();
      this.lmsproductmaster_service.lmsbundledproducts.push(obj);
      this.tbl_lmsbundledproducts.source.refresh();
      if ((this.lmsproductmaster_service.lmsbundledproducts.length / this.tbl_lmsbundledproducts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsbundledproducts.source.getPaging().page)
      {
          this.tbl_lmsbundledproducts.source.setPage((this.lmsproductmaster_service.lmsbundledproducts.length / this.tbl_lmsbundledproducts.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmsbundledproducts.source.grid.edit(this.tbl_lmsbundledproducts.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmsbundledproducts.source.data.indexOf(event.data);
  this.onDelete_lmsbundledproduct(event,event.data.bundleproductid,((this.tbl_lmsbundledproducts.source.getPaging().page-1) *this.tbl_lmsbundledproducts.source.getPaging().perPage)+index);
  this.tbl_lmsbundledproducts.source.refresh();
  break;
  }
  }

  */
  lmsbundledproducts_Paging(val) {
    debugger;
    this.tbl_lmsbundledproducts.source.setPaging(1, val, true);
  }

  handle_lmsbundledproducts_GridSelected(event: any) {
    debugger;

    if (event.isSelected) {
      if (event.data.bundleproductid == null || event.data.bundleproductid == "") {
        var obj = { productid: this.formid }
        this.Insertlmsbundledproducts.push(obj as any);
      }
      else {
        var deletedids = this.Deleted_lmsbundledproduct_IDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.bundleproductid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.bundleproductid != null && event.data.bundleproductid != "") this.Deleted_lmsbundledproduct_IDs += event.data.bundleproductid + ",";
    }
  }
  Is_lmsbundledproducts_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsbundledproducts_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmsbundledproducts

}



