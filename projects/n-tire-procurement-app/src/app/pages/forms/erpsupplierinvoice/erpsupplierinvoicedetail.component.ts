import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erpsupplierinvoicedetail } from '../../../../../../n-tire-procurement-app/src/app/model/erpsupplierinvoicedetail.model';
import { NgForm } from '@angular/forms';
import { erpsupplierinvoiceService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsupplierinvoice.service';
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
import { erptaxmaster, IerptaxmasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erptaxmaster.model';
import { erptaxmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptaxmaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-erpsupplierinvoicedetails',
  templateUrl: './erpsupplierinvoicedetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erpsupplierinvoicedetailComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erpsupplierinvoicedetailForm: FormGroup;
  itemidList: erpitemmaster[];
  itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  itemid_erpitemmastersForm: FormGroup;
  itemid_erpitemmastersoptions: any;
  itemid_erpitemmastersformatter: any;
  uomList: boconfigvalue[]=[];
  currencyList: boconfigvalue[]=[];
  tax1nameList: erptaxmaster[];
  tax2nameList: erptaxmaster[];
  basecurrencyList: boconfigvalue[]=[];
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
    private erpsupplierinvoiceservice: erpsupplierinvoiceService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private erpitemmasterservice: erpitemmasterService,
    private erptaxmasterservice: erptaxmasterService,
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
    this.erpsupplierinvoicedetailForm = this.fb.group({
      invoiceid: [null],
      invoicedetailid: [null],
      itemid: [null],
      itemiddesc: [null],
      itemdescription: [null],
      quantity: [null],
      uom: [null],
      uomdesc: [null],
      currency: [null],
      currencydesc: [null],
      unitprice: [null],
      discountpercent: [null],
      tax1name: [null],
      tax1namedesc: [null],
      tax1value: [null],
      tax2name: [null],
      tax2namedesc: [null],
      tax2value: [null],
      othercharges: [null],
      totalvalue: [null],
      basecurrency: [null],
      basecurrencydesc: [null],
      basevalue: [null],
      poid: [null],
      suppliersoreference: [null],
      grnno: [null],
      remarks: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erpsupplierinvoicedetailForm.controls; }


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
    else if (this.data != null && this.data.invoicedetailid != null) {
      ppk = this.data.invoicedetailid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.invoicedetailid != null && this.data.invoicedetailid != undefined) ppk = this.data.invoicedetailid;
    if (this.data.supplierid != null && this.data.supplierid != undefined) this.erpsupplierinvoicedetailForm.patchValue({ supplierid: this.data.supplierid });
    if (this.data != null) {
      for (let key in this.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
          let json = JSON.parse(jsonstring);
          if (this.erpsupplierinvoicedetailForm.controls[key] != null) {
            this.erpsupplierinvoicedetailForm.patchValue(json);
            this.erpsupplierinvoicedetailForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erpsupplierinvoicedetailForm.patchValue({
      });
    }
    else {
      let obj = this.erpsupplierinvoiceservice.erpsupplierinvoicedetails.filter(x => x.invoicedetailid == ppk)[0];
      this.erpsupplierinvoicedetailForm.patchValue({
        supplierid: obj.supplierid,
        invoiceid: obj.invoiceid,
        invoicedetailid: obj.invoicedetailid,
        itemid: obj.itemid,
        itemiddesc: obj.itemiddesc,
        itemdescription: obj.itemdescription,
        quantity: obj.quantity,
        uom: obj.uom,
        uomdesc: obj.uomdesc,
        currency: obj.currency,
        currencydesc: obj.currencydesc,
        unitprice: obj.unitprice,
        discountpercent: obj.discountpercent,
        tax1name: obj.tax1name,
        tax1namedesc: obj.tax1namedesc,
        tax1value: obj.tax1value,
        tax2name: obj.tax2name,
        tax2namedesc: obj.tax2namedesc,
        tax2value: obj.tax2value,
        othercharges: obj.othercharges,
        totalvalue: obj.totalvalue,
        basecurrency: obj.basecurrency,
        basecurrencydesc: obj.basecurrencydesc,
        basevalue: obj.basevalue,
        poid: obj.poid,
        suppliersoreference: obj.suppliersoreference,
        grnno: obj.grnno,
        remarks: obj.remarks,
        status: obj.status,
      });
    }
    this.erpitemmasterservice.geterpitemmastersList().then((res:any) => {
      this.itemidList = res as erpitemmaster[];
      if (this.formdata && this.formdata.erpsupplierinvoicedetail && this.formdata.erpsupplierinvoicedetail.itemid) {
        this.itemidoptionsEvent.emit(this.itemidList);
        this.erpsupplierinvoicedetailForm.patchValue({
          itemid: this.formdata.erpsupplierinvoicedetail.itemid,
          itemiddesc: this.formdata.erpsupplierinvoicedetail.itemiddesc,
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
    this.erptaxmasterservice.geterptaxmastersList().then((res:any) => {
      this.tax1nameList = res as erptaxmaster[];
    }
    );
    this.erptaxmasterservice.geterptaxmastersList().then((res:any) => {
      this.tax2nameList = res as erptaxmaster[];
    }
    );
    this.configservice.getList("currency").then((res:any) => this.basecurrencyList = res as boconfigvalue[]);
  }

  onSelecteditemid(itemidDetail: any) {
    if (itemidDetail.itemid && itemidDetail) {
      this.erpsupplierinvoicedetailForm.patchValue({
        itemid: itemidDetail.itemid,
        itemiddesc: itemidDetail.itemcode,

      });

    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erpsupplierinvoicedetailForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierinvoicedetailForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erpsupplierinvoicedetailForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erpsupplierinvoicedetailForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erpsupplierinvoicedetailForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.erpsupplierinvoicedetailForm!.value;
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
  itemidonChange(evt:any) {
    let e = evt!.value;
  }
  uomonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierinvoicedetailForm.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
  }
  currencyonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierinvoicedetailForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
  }
  tax1nameonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierinvoicedetailForm.patchValue({ tax1namedesc: evt.options[evt.options.selectedIndex].text });
  }
  tax2nameonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierinvoicedetailForm.patchValue({ tax2namedesc: evt.options[evt.options.selectedIndex].text });
  }
  basecurrencyonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierinvoicedetailForm.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
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

  AddOrEdittax1name(taxid) {
    let ScreenType = '2';
    /*this.dialog.open(erptaxmasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.erptaxmasterservice.geterptaxmastersList().then((res:any) => this.tax1nameList = res as erptaxmaster[]);
    });*/
  }

  AddOrEdittax2name(taxid) {
    let ScreenType = '2';
    /*this.dialog.open(erptaxmasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.erptaxmasterservice.geterptaxmastersList().then((res:any) => this.tax2nameList = res as erptaxmaster[]);
    });*/
  }


}


