import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erptenderdetail } from '../../../../../../n-tire-procurement-app/src/app/model/erptenderdetail.model';
import { NgForm } from '@angular/forms';
import { erptendermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erptendermaster.service';
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
import { erpsuppliermaster, IerpsuppliermasterResponse } from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-erptenderdetails',
  templateUrl: './erptenderdetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erptenderdetailComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erptenderdetailForm: FormGroup;
  itemidList: erpitemmaster[];
  itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  itemid_erpitemmastersForm: FormGroup;
  itemid_erpitemmastersoptions: any;
  itemid_erpitemmastersformatter: any;
  uomList: boconfigvalue[]=[];
  currencyList: boconfigvalue[]=[];
  finalsupplieridList: erpsuppliermaster[];
  finalsupplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  finalsupplierid_erpsuppliermastersForm: FormGroup;
  finalsupplierid_erpsuppliermastersoptions: any;
  finalsupplierid_erpsuppliermastersformatter: any;
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
    private erptendermasterservice: erptendermasterService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private erpitemmasterservice: erpitemmasterService,
    private erpsuppliermasterservice: erpsuppliermasterService,
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
    this.erptenderdetailForm = this.fb.group({
      tenderdetailid: [null],
      tenderid: [null],
      itemid: [null],
      itemiddesc: [null],
      description: [null],
      details: [null],
      quantity: [null],
      uom: [null],
      uomdesc: [null],
      currency: [null],
      currencydesc: [null],
      estimatedvalue: [null],
      finalsupplierid: [null],
      finalsupplieriddesc: [null],
      finalquantity: [null],
      finalunitprice: [null],
      finalcost: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erptenderdetailForm.controls; }


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
    else if (this.data != null && this.data.tenderdetailid != null) {
      ppk = this.data.tenderdetailid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.tenderdetailid != null && this.data.tenderdetailid != undefined) ppk = this.data.tenderdetailid;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          if (typeof (this.dynamicconfig.data[key]) == "string")
            jsonstring = '{"' + key + '": "' + this.dynamicconfig.data[key] + '" }';
          else
            jsonstring = '{"' + key + '": ' + this.dynamicconfig.data[key] + ' }';
          let json = JSON.parse(jsonstring);
          if (this.erptenderdetailForm.controls[key] != null) {
            this.erptenderdetailForm.patchValue(json);
            this.erptenderdetailForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erptenderdetailForm.patchValue({
      });
    }
    else {
      let obj = this.erptendermasterservice.erptenderdetails.filter(x => x.tenderdetailid == ppk)[0];
      this.erptenderdetailForm.patchValue({
        tenderdetailid: obj.tenderdetailid,
        tenderid: obj.tenderid,
        itemid: obj.itemid,
        itemiddesc: obj.itemiddesc,
        description: obj.description,
        details: obj.details,
        quantity: obj.quantity,
        uom: obj.uom,
        uomdesc: obj.uomdesc,
        currency: obj.currency,
        currencydesc: obj.currencydesc,
        estimatedvalue: obj.estimatedvalue,
        finalsupplierid: obj.finalsupplierid,
        finalsupplieriddesc: obj.finalsupplieriddesc,
        finalquantity: obj.finalquantity,
        finalunitprice: obj.finalunitprice,
        finalcost: obj.finalcost,
        status: obj.status,
      });
    }
    this.erpitemmasterservice.geterpitemmastersList().then((res:any) => {
      this.itemidList = res as erpitemmaster[];
      if (this.formdata && this.formdata.erptenderdetail && this.formdata.erptenderdetail.itemid) {
        this.itemidoptionsEvent.emit(this.itemidList);
        this.erptenderdetailForm.patchValue({
          itemid: this.formdata.erptenderdetail.itemid,
          itemiddesc: this.formdata.erptenderdetail.itemiddesc,
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
    this.erpsuppliermasterservice.geterpsuppliermastersList().then((res:any) => {
      this.finalsupplieridList = res as erpsuppliermaster[];
      if (this.formdata && this.formdata.erptenderdetail && this.formdata.erptenderdetail.finalsupplierid) {
        this.finalsupplieridoptionsEvent.emit(this.finalsupplieridList);
        this.erptenderdetailForm.patchValue({
          finalsupplierid: this.formdata.erptenderdetail.finalsupplierid,
          finalsupplieriddesc: this.formdata.erptenderdetail.finalsupplieriddesc,
        });
      }
    }
    );
    this.finalsupplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.finalsupplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.finalsupplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
  }

  onSelecteditemid(itemidDetail: any) {
    if (itemidDetail.itemid && itemidDetail) {
      this.erptenderdetailForm.patchValue({
        itemid: itemidDetail.itemid,
        itemiddesc: itemidDetail.itemcode,

      });

    }
  }

  onSelectedfinalsupplierid(finalsupplieridDetail: any) {
    if (finalsupplieridDetail.finalsupplierid && finalsupplieridDetail) {
      this.erptenderdetailForm.patchValue({
        finalsupplierid: finalsupplieridDetail.finalsupplierid,
        finalsupplieriddesc: finalsupplieridDetail.suppliercode,

      });

    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erptenderdetailForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptenderdetailForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erptenderdetailForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erptenderdetailForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erptenderdetailForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.erptenderdetailForm!.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.erptenderdetailForm.controls[key] != null) {
            obj[key] = this.erptenderdetailForm.controls[key]!.value;
          }
        }
      }
    }
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
    this.erptenderdetailForm.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
  }
  currencyonChange(evt:any) {
    let e = evt!.value;
    this.erptenderdetailForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
  }
  finalsupplieridonChange(evt:any) {
    let e = evt!.value;
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

  AddOrEditfinalsupplierid(supplierid) {
    let ScreenType = '2';
    /*this.dialog.open(erpsuppliermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.erpsuppliermasterservice.geterpsuppliermastersList().then((res:any) => this.finalsupplieridList = res as erpsuppliermaster[]);
    });*/
  }


}


