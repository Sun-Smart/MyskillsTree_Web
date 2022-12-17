import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erptenderquotationdetail } from '../../../../../../n-tire-procurement-app/src/app/model/erptenderquotationdetail.model';
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
import { erpitemmaster, IerpitemmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpitemmaster.model';
import { erpitemmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpitemmaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
  selector: 'app-erptenderquotationdetails',
  templateUrl: './erptenderquotationdetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erptenderquotationdetailComponent implements OnInit {
  customfieldservicelist: any;
  @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erptenderquotationdetailForm: FormGroup;
  itemidList: erpitemmaster[];
  itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  itemid_erpitemmastersForm: FormGroup;
  itemid_erpitemmastersoptions: any;
  itemid_erpitemmastersformatter: any;
  uomList: boconfigvalue[]=[];
  currencyList: boconfigvalue[]=[];
  paymenttermtypeList: boconfigvalue[]=[];
  viewhtml: any = '';
  showview: boolean = false;
  formdata: any;
  shortcuts: ShortcutInput[] = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  showformtype: any;
  data: any;
  SESSIONUSERID: any;
  customfieldjson: any;
  customfieldvisible: boolean = true;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentfieldjson: any[] = [];
  attachmentvisible: boolean = true;

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
    private erpitemmasterservice: erpitemmasterService,
    private customfieldservice: customfieldconfigurationService,
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
    this.erptenderquotationdetailForm = this.fb.group({
      ImageName: [null],
      tenderid: [null],
      quotationid: [null],
      quotationdetailid: [null],
      itemid: [null],
      itemiddesc: [null],
      itemdescription: [null],
      supplierproductcode: [null],
      supplierproductname: [null],
      supplierproductdescription: [null],
      supplierproductbrand: [null],
      supplierproducturl: [null],
      uom: [null],
      uomdesc: [null],
      quantity: [null],
      currency: [null],
      currencydesc: [null],
      unitprice: [null],
      tax1name: [null],
      tax1value: [null],
      tax2name: [null],
      tax2value: [null],
      othercharges: [null],
      totalquotevalue: [null],
      basecurrency: [null],
      basevalue: [null],
      expecteddelivery: [null],
      paymenttermtype: [null],
      paymenttermtypedesc: [null],
      offerquantity1: [null],
      unitprice1: [null],
      totalcost1: [null],
      offerquantity2: [null],
      unitprice2: [null],
      totalcost2: [null],
      offerquantity3: [null],
      unitprice3: [null],
      totalcost3: [null],
      remarks: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      discountpercent: [null],
    });
  }
  get f() { return this.erptenderquotationdetailForm.controls; }


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
    else if (this.data != null && this.data.quotationdetailid != null) {
      ppk = this.data.quotationdetailid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.quotationdetailid != null && this.data.quotationdetailid != undefined) ppk = this.data.quotationdetailid;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          if (typeof (this.dynamicconfig.data[key]) == "string")
            jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          else
            jsonstring = '{"' + key + '": ' + this.dynamicconfig.data[key] + ' }';
          let json = JSON.parse(jsonstring);
          if (this.erptenderquotationdetailForm.controls[key] != null) {
            this.erptenderquotationdetailForm.patchValue(json);
            this.erptenderquotationdetailForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erptenderquotationdetailForm.patchValue({
        expecteddelivery: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
      this.FillCustomField();
    }
    else {
      let obj = this.erptenderquotationmasterservice.erptenderquotationdetails.filter(x => x.quotationdetailid == ppk)[0];
      this.erptenderquotationdetailForm.patchValue({
        tenderid: obj.tenderid,
        quotationid: obj.quotationid,
        quotationdetailid: obj.quotationdetailid,
        itemid: obj.itemid,
        itemiddesc: obj.itemiddesc,
        itemdescription: obj.itemdescription,
        supplierproductcode: obj.supplierproductcode,
        supplierproductname: obj.supplierproductname,
        supplierproductdescription: obj.supplierproductdescription,
        supplierproductbrand: obj.supplierproductbrand,
        supplierproducturl: obj.supplierproducturl,
        uom: obj.uom,
        uomdesc: obj.uomdesc,
        quantity: obj.quantity,
        currency: obj.currency,
        currencydesc: obj.currencydesc,
        unitprice: obj.unitprice,
        tax1name: obj.tax1name,
        tax1value: obj.tax1value,
        tax2name: obj.tax2name,
        tax2value: obj.tax2value,
        othercharges: obj.othercharges,
        totalquotevalue: obj.totalquotevalue,
        basecurrency: obj.basecurrency,
        basevalue: obj.basevalue,
        expecteddelivery: this.ngbDateParserFormatter.parse(obj.expecteddelivery as any),
        paymenttermtype: obj.paymenttermtype,
        paymenttermtypedesc: obj.paymenttermtypedesc,
        offerquantity1: obj.offerquantity1,
        unitprice1: obj.unitprice1,
        totalcost1: obj.totalcost1,
        offerquantity2: obj.offerquantity2,
        unitprice2: obj.unitprice2,
        totalcost2: obj.totalcost2,
        offerquantity3: obj.offerquantity3,
        unitprice3: obj.unitprice3,
        totalcost3: obj.totalcost3,
        remarks: obj.remarks,
        customfield: obj.customfield,
        attachment: obj.attachment,
        status: obj.status,
        discountpercent: obj.discountpercent,
      });
      if (this.erptenderquotationdetailForm.get('customfield')!.value != "" && this.erptenderquotationdetailForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.erptenderquotationdetailForm.get('customfield')!.value);
      this.FillCustomField();
      if (this.erptenderquotationdetailForm.get('attachment')!.value != "" && this.erptenderquotationdetailForm.get('attachment')!.value != null && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(JSON.parse(this.erptenderquotationdetailForm.get('attachment')!.value));
    }
    this.erpitemmasterservice.geterpitemmastersList().then((res:any) => {
      this.itemidList = res as erpitemmaster[];
      if (this.formdata && this.formdata.erptenderquotationdetail && this.formdata.erptenderquotationdetail.itemid) {
        this.itemidoptionsEvent.emit(this.itemidList);
        this.erptenderquotationdetailForm.patchValue({
          itemid: this.formdata.erptenderquotationdetail.itemid,
          itemiddesc: this.formdata.erptenderquotationdetail.itemiddesc,
        });
      }
    }
    );
    this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
    this.configservice.getList("uom").then((res:any) => this.uomList = res as boconfigvalue[]);
    this.configservice.getList("currency").then((res:any) => this.currencyList = res as boconfigvalue[]);
    this.configservice.getList("paymenttermtype").then((res:any) => this.paymenttermtypeList = res as boconfigvalue[]);
  }

  onSelecteditemid(itemidDetail: any) {
    if (itemidDetail.itemid && itemidDetail) {
      this.erptenderquotationdetailForm.patchValue({
        itemid: itemidDetail.itemid,
        itemiddesc: itemidDetail.itemcode,

      });

    }
  }


  attachmentuploader(e:any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileattachmentlist.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
      max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentfieldjson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erptenderquotationdetailForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderquotationdetailForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erptenderquotationdetailForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erptenderquotationdetailForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erptenderquotationdetailForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.erptenderquotationdetailForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.erptenderquotationdetailForm.controls[key] != null) {
            obj[key] = this.erptenderquotationdetailForm.controls[key]!.value;
          }
        }
      }
    }
    obj.expecteddelivery = this.ngbDateParserFormatter.format(this.erptenderquotationdetailForm.get('expecteddelivery')!.value);
    obj.customfield = JSON.stringify(customfields);
    obj.attachment = JSON.stringify(this.attachmentfieldjson);
    obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
    obj.fileattachmentlist = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.fileattachmentlist);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.dialogRef.close(obj);
  }

  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("erptenderquotationdetails", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
      this.customfieldservicelist = res;
      return res;
    });


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
  itemidonChange(evt:any) {
    let e = evt!.value;
  }
  uomonChange(evt:any) {
    let e = evt!.value;
    this.erptenderquotationdetailForm.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
  }
  currencyonChange(evt:any) {
    let e = evt!.value;
    this.erptenderquotationdetailForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
  }
  paymenttermtypeonChange(evt:any) {
    let e = evt!.value;
    this.erptenderquotationdetailForm.patchValue({ paymenttermtypedesc: evt.options[evt.options.selectedIndex].text });
  }
  AddOrEdititemid(itemid) {
    let ScreenType = '2';
    /*this.dialog.open(erpitemmasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.erpitemmasterservice.geterpitemmastersList().then((res:any) => this.itemidList = res as erpitemmaster[]);
    });*/
  }


}


