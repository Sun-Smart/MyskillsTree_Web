import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erpsupplierquotationdetail } from '../../../../../../n-tire-procurement-app/src/app/model/erpsupplierquotationdetail.model';
import { NgForm } from '@angular/forms';
import { erpsupplierquotationmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsupplierquotationmaster.service';
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
  selector: 'app-erpsupplierquotationdetails',
  templateUrl: './erpsupplierquotationdetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erpsupplierquotationdetailComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erpsupplierquotationdetailForm: FormGroup;
  itemidList: erpitemmaster[];
  itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  itemid_erpitemmastersForm: FormGroup;
  itemid_erpitemmastersoptions: any;
  itemid_erpitemmastersformatter: any;
  uomList: boconfigvalue[]=[];
  tax1nameList: erptaxmaster[];
  tax2nameList: erptaxmaster[];
  paymenttermtypeList: boconfigvalue[]=[];
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
    private erpsupplierquotationmasterservice: erpsupplierquotationmasterService,
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
    this.erpsupplierquotationdetailForm = this.fb.group({
      quotationid: [null],
      quotationdetailid: [null],
      itemid: [null],
      itemiddesc: [null],
      uom: [null],
      uomdesc: [null],
      quantity: [null],
      currency: [null],
      unitprice: [null],
      discountpercent: [null],
      tax1name: [null],
      tax1namedesc: [null],
      tax1value: [null],
      tax2name: [null],
      tax2namedesc: [null],
      tax2value: [null],
      othercharges: [null],
      totalquotevalue: [null],
      basecurrency: [null],
      basevalue: [null],
      expecteddelivery: [null],
      paymenttermtype: [null],
      paymenttermtypedesc: [null],
      remarks: [null],
      offerquantity1: [null],
      unitprice1: [null],
      totalcost1: [null],
      offerquantity2: [null],
      unitprice2: [null],
      totalcost2: [null],
      offerquantity3: [null],
      unitprice3: [null],
      totalcost3: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erpsupplierquotationdetailForm.controls; }


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
    if (this.data.rfqid != null && this.data.rfqid != undefined) this.erpsupplierquotationdetailForm.patchValue({ rfqid: this.data.rfqid });
    if (this.data.supplierid != null && this.data.supplierid != undefined) this.erpsupplierquotationdetailForm.patchValue({ supplierid: this.data.supplierid });
    if (this.data.versionnumber != null && this.data.versionnumber != undefined) this.erpsupplierquotationdetailForm.patchValue({ versionnumber: this.data.versionnumber });
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          let json = JSON.parse(jsonstring);
          if (this.erpsupplierquotationdetailForm.controls[key] != null) {
            this.erpsupplierquotationdetailForm.patchValue(json);
            this.erpsupplierquotationdetailForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erpsupplierquotationdetailForm.patchValue({
        expecteddelivery: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.erpsupplierquotationmasterservice.erpsupplierquotationdetails.filter(x => x.quotationdetailid == ppk)[0];
      this.erpsupplierquotationdetailForm.patchValue({
        rfqid: obj.rfqid,
        supplierid: obj.supplierid,
        quotationid: obj.quotationid,
        quotationdetailid: obj.quotationdetailid,
        versionnumber: obj.versionnumber,
        itemid: obj.itemid,
        itemiddesc: obj.itemiddesc,
        uom: obj.uom,
        uomdesc: obj.uomdesc,
        quantity: obj.quantity,
        currency: obj.currency,
        unitprice: obj.unitprice,
        discountpercent: obj.discountpercent,
        tax1name: obj.tax1name,
        tax1namedesc: obj.tax1namedesc,
        tax1value: obj.tax1value,
        tax2name: obj.tax2name,
        tax2namedesc: obj.tax2namedesc,
        tax2value: obj.tax2value,
        othercharges: obj.othercharges,
        totalquotevalue: obj.totalquotevalue,
        basecurrency: obj.basecurrency,
        basevalue: obj.basevalue,
        expecteddelivery: this.ngbDateParserFormatter.parse(obj.expecteddelivery as any),
        paymenttermtype: obj.paymenttermtype,
        paymenttermtypedesc: obj.paymenttermtypedesc,
        remarks: obj.remarks,
        offerquantity1: obj.offerquantity1,
        unitprice1: obj.unitprice1,
        totalcost1: obj.totalcost1,
        offerquantity2: obj.offerquantity2,
        unitprice2: obj.unitprice2,
        totalcost2: obj.totalcost2,
        offerquantity3: obj.offerquantity3,
        unitprice3: obj.unitprice3,
        totalcost3: obj.totalcost3,
        status: obj.status,
      });
    }
    this.erpitemmasterservice.geterpitemmastersList().then((res:any) => {
      this.itemidList = res as erpitemmaster[];
      if (this.formdata && this.formdata.erpsupplierquotationdetail && this.formdata.erpsupplierquotationdetail.itemid) {
        this.itemidoptionsEvent.emit(this.itemidList);
        this.erpsupplierquotationdetailForm.patchValue({
          itemid: this.formdata.erpsupplierquotationdetail.itemid,
          itemiddesc: this.formdata.erpsupplierquotationdetail.itemiddesc,
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
    this.erptaxmasterservice.geterptaxmastersList().then((res:any) => {
      this.tax1nameList = res as erptaxmaster[];
      {
        let arrtax1name = this.tax1nameList.filter(v => v.taxid == this.erpsupplierquotationdetailForm.get('tax1name')!.value);
        let objtax1name;
        if (arrtax1name.length > 0) objtax1name = arrtax1name[0];
        if (objtax1name) {
          this.erpsupplierquotationdetailForm.patchValue({ tax1value: objtax1name.taxpercentage });
        }
      }
    }
    );
    this.erptaxmasterservice.geterptaxmastersList().then((res:any) => {
      this.tax2nameList = res as erptaxmaster[];
      {
        let arrtax2name = this.tax2nameList.filter(v => v.taxid == this.erpsupplierquotationdetailForm.get('tax2name')!.value);
        let objtax2name;
        if (arrtax2name.length > 0) objtax2name = arrtax2name[0];
        if (objtax2name) {
          this.erpsupplierquotationdetailForm.patchValue({ tax2value: objtax2name.taxpercentage });
        }
      }
    }
    );
    this.configservice.getList("paymentterm").then((res:any) => this.paymenttermtypeList = res as boconfigvalue[]);
  }

  onSelecteditemid(itemidDetail: any) {
    if (itemidDetail.itemid && itemidDetail) {
      this.erpsupplierquotationdetailForm.patchValue({
        itemid: itemidDetail.itemid,
        itemiddesc: itemidDetail.itemcode,

      });

    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erpsupplierquotationdetailForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierquotationdetailForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erpsupplierquotationdetailForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erpsupplierquotationdetailForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erpsupplierquotationdetailForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.erpsupplierquotationdetailForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.erpsupplierquotationdetailForm.controls[key] != null) {
            obj[key] = this.erpsupplierquotationdetailForm.controls[key]!.value;
          }
        }
      }
    }
    obj.expecteddelivery = this.ngbDateParserFormatter.format(this.erpsupplierquotationdetailForm.get('expecteddelivery')!.value);
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
    this.erpsupplierquotationdetailForm.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
  }
  tax1nameonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierquotationdetailForm.patchValue({ tax1namedesc: evt.options[evt.options.selectedIndex].text });
    this.erpsupplierquotationdetailForm.patchValue({ tax1value: this.tax1nameList[evt.options.selectedIndex].taxpercentage });
  }
  tax2nameonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierquotationdetailForm.patchValue({ tax2namedesc: evt.options[evt.options.selectedIndex].text });
    this.erpsupplierquotationdetailForm.patchValue({ tax2value: this.tax2nameList[evt.options.selectedIndex].taxpercentage });
  }
  paymenttermtypeonChange(evt:any) {
    let e = evt!.value;
    this.erpsupplierquotationdetailForm.patchValue({ paymenttermtypedesc: evt.options[evt.options.selectedIndex].text });
  }
  calculate() {
    debugger
    let ret = 0;
    this.erpsupplierquotationdetailForm.patchValue({ unitprice: this.f.basevalue!.value * 2 });
    let tot = this.f.quantity!.value * this.f.unitprice!.value;
    ret = tot;
    if (this.f.tax1value!.value != null) ret += ((this.f.tax1value!.value / 100) * tot);
    if (this.f.tax2value!.value != null) ret += ((this.f.tax2value!.value / 100) * tot);
    if (this.f.discountpercent!.value != null) ret -= ((this.f.discountpercent!.value / 100) * tot);
    if (this.f.othercharges!.value != null) ret += this.f.othercharges!.value;
    this.erpsupplierquotationdetailForm.patchValue({ totalquotevalue: ret });
  } AddOrEdititemid(itemid) {
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


