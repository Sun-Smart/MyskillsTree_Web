import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erppurchasesubdeliverydetail } from '../../../../../../n-tire-procurement-app/src/app/model/erppurchasesubdeliverydetail.model';
import { NgForm } from '@angular/forms';
import { erppurchaseorderdetailService } from '../../../../../../n-tire-procurement-app/src/app/service/erppurchaseorderdetail.service';
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
import { bocountry, IbocountryResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
import { bostate, IbostateResponse } from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
import { bocity, IbocityResponse } from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-erppurchasesubdeliverydetails',
  templateUrl: './erppurchasesubdeliverydetail.component.html',
  styles: [],
  providers: [KeyboardShortcutsService, DialogService]
})
export class erppurchasesubdeliverydetailComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  erppurchasesubdeliverydetailForm: FormGroup;
  itemidList: erpitemmaster[];
  itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  itemid_erpitemmastersForm: FormGroup;
  itemid_erpitemmastersoptions: any;
  itemid_erpitemmastersformatter: any;
  uomList: boconfigvalue[]=[];
  deliverycountryList: bocountry[];
  deliverycountryoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  deliverycountry_bocountriesForm: FormGroup;
  deliverycountry_bocountriesoptions: any;
  deliverycountry_bocountriesformatter: any;
  deliverystateList: bostate[];
  deliverystateoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  deliverystate_bostatesForm: FormGroup;
  deliverystate_bostatesoptions: any;
  deliverystate_bostatesformatter: any;
  deliverycityList: bocity[];
  deliverycityoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  deliverycity_bocitiesForm: FormGroup;
  deliverycity_bocitiesoptions: any;
  deliverycity_bocitiesformatter: any;
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
    private erppurchaseorderdetailservice: erppurchaseorderdetailService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private erpitemmasterservice: erpitemmasterService,
    private bocountryservice: bocountryService,
    private bostateservice: bostateService,
    private bocityservice: bocityService,
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
    this.erppurchasesubdeliverydetailForm = this.fb.group({
      branchid: [null],
      poid: [null],
      subdeliveryid: [null],
      supplierid: [null],
      versionnumber: [null],
      podetailid: [null],
      itemid: [null],
      itemiddesc: [null],
      uom: [null],
      uomdesc: [null],
      quantity: [null],
      deliveryaddress1: [null],
      deliveryaddress2: [null],
      deliverycountry: [null],
      deliverycountrydesc: [null],
      deliverystate: [null],
      deliverystatedesc: [null],
      deliverycity: [null],
      deliverycitydesc: [null],
      deliverypin: [null],
      deliverylatlong: [null],
      deliverydate: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.erppurchasesubdeliverydetailForm.controls; }


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
    else if (this.data != null && this.data.subdeliveryid != null) {
      ppk = this.data.subdeliveryid;
    }
    else {
      ppk = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    if (this.data.subdeliveryid != null && this.data.subdeliveryid != undefined) ppk = this.data.subdeliveryid;
    if (this.data != null) {
      for (let key in this.data) {

        if (key != 'visiblelist' && key != 'hidelist') {
          let jsonstring = '';
          jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
          let json = JSON.parse(jsonstring);
          if (this.erppurchasesubdeliverydetailForm.controls[key] != null) {
            this.erppurchasesubdeliverydetailForm.patchValue(json);
            this.erppurchasesubdeliverydetailForm.controls[key].disable({ onlySelf: true });
          }
        }
      }
    }
    this.formid = ppk;

    if (ppk == null) {
      this.erppurchasesubdeliverydetailForm.patchValue({
        deliverydate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.erppurchaseorderdetailservice.erppurchasesubdeliverydetails.filter(x => x.subdeliveryid == ppk)[0];
      this.erppurchasesubdeliverydetailForm.patchValue({
        branchid: obj.branchid,
        poid: obj.poid,
        subdeliveryid: obj.subdeliveryid,
        supplierid: obj.supplierid,
        versionnumber: obj.versionnumber,
        podetailid: obj.podetailid,
        itemid: obj.itemid,
        itemiddesc: obj.itemiddesc,
        uom: obj.uom,
        uomdesc: obj.uomdesc,
        quantity: obj.quantity,
        deliveryaddress1: obj.deliveryaddress1,
        deliveryaddress2: obj.deliveryaddress2,
        deliverycountry: obj.deliverycountry,
        deliverycountrydesc: obj.deliverycountrydesc,
        deliverystate: obj.deliverystate,
        deliverystatedesc: obj.deliverystatedesc,
        deliverycity: obj.deliverycity,
        deliverycitydesc: obj.deliverycitydesc,
        deliverypin: obj.deliverypin,
        deliverylatlong: obj.deliverylatlong,
        deliverydate: this.ngbDateParserFormatter.parse(obj.deliverydate as any),
        status: obj.status,
      });
    }
    this.erpitemmasterservice.geterpitemmastersList().then((res:any) => {
      this.itemidList = res as erpitemmaster[];
      if (this.formdata && this.formdata.erppurchasesubdeliverydetail && this.formdata.erppurchasesubdeliverydetail.itemid) {
        this.itemidoptionsEvent.emit(this.itemidList);
        this.erppurchasesubdeliverydetailForm.patchValue({
          itemid: this.formdata.erppurchasesubdeliverydetail.itemid,
          itemiddesc: this.formdata.erppurchasesubdeliverydetail.itemiddesc,
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
    this.bocountryservice.getbocountriesList().then((res:any) => {
      this.deliverycountryList = res as bocountry[];
      if (this.formdata && this.formdata.erppurchasesubdeliverydetail && this.formdata.erppurchasesubdeliverydetail.deliverycountry) {
        this.deliverycountryoptionsEvent.emit(this.deliverycountryList);
        this.erppurchasesubdeliverydetailForm.patchValue({
          deliverycountry: this.formdata.erppurchasesubdeliverydetail.deliverycountry,
          deliverycountrydesc: this.formdata.erppurchasesubdeliverydetail.deliverycountrydesc,
        });
      }
    }
    );
    this.deliverycountry_bocountriesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.deliverycountryList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.deliverycountry_bocountriesformatter = (result: any) => result.name;
    setTimeout(() => {
      if (this.f.deliverycountry!.value && this.f.deliverycountry!.value != "" && this.f.deliverycountry!.value != null) this.bostateservice.getListBycountryid(this.f.deliverycountry!.value).then((res:any) => {
        this.deliverystateList = res as bostate[];
        if (this.formdata && this.formdata.erppurchasesubdeliverydetail && this.formdata.erppurchasesubdeliverydetail.deliverystate) {
          this.erppurchasesubdeliverydetailForm.patchValue({
            deliverystate: this.formdata.erppurchasesubdeliverydetail.deliverystate,
            deliverystatedesc: this.formdata.erppurchasesubdeliverydetail.deliverystatedesc,
          });
        }
      });
    });
    this.deliverystate_bostatesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.deliverystateList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.deliverystate_bostatesformatter = (result: any) => result.name;
    setTimeout(() => {
      if (this.f.deliverystate!.value && this.f.deliverystate!.value != "" && this.f.deliverystate!.value != null) this.bocityservice.getListBystateid(this.f.deliverystate!.value).then((res:any) => {
        this.deliverycityList = res as bocity[];
        if (this.formdata && this.formdata.erppurchasesubdeliverydetail && this.formdata.erppurchasesubdeliverydetail.deliverycity) {
          this.erppurchasesubdeliverydetailForm.patchValue({
            deliverycity: this.formdata.erppurchasesubdeliverydetail.deliverycity,
            deliverycitydesc: this.formdata.erppurchasesubdeliverydetail.deliverycitydesc,
          });
        }
      });
    });
    this.deliverycity_bocitiesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.deliverycityList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.deliverycity_bocitiesformatter = (result: any) => result.name;
  }

  onSelecteditemid(itemidDetail: any) {
    if (itemidDetail.itemid && itemidDetail) {
      this.erppurchasesubdeliverydetailForm.patchValue({
        itemid: itemidDetail.itemid,
        itemiddesc: itemidDetail.itemcode,

      });

    }
  }

  onSelecteddeliverycountry(deliverycountryDetail: any) {
    if (deliverycountryDetail.deliverycountry && deliverycountryDetail) {
      this.erppurchasesubdeliverydetailForm.patchValue({
        deliverycountry: deliverycountryDetail.deliverycountry,
        deliverycountrydesc: deliverycountryDetail.name,

      });
      this.bostateservice.getListBycountryid(deliverycountryDetail.deliverycountry).then((res:any) => {
        this.deliverystateList = res as bostate[]
      });

    }
  }

  onSelecteddeliverystate(deliverystateDetail: any) {
    if (deliverystateDetail.deliverystate && deliverystateDetail) {
      this.erppurchasesubdeliverydetailForm.patchValue({
        deliverystate: deliverystateDetail.deliverystate,
        deliverystatedesc: deliverystateDetail.name,

      });
      this.bocityservice.getListBystateid(deliverystateDetail.deliverystate).then((res:any) => {
        this.deliverycityList = res as bocity[]
      });

    }
  }

  onSelecteddeliverycity(deliverycityDetail: any) {
    if (deliverycityDetail.deliverycity && deliverycityDetail) {
      this.erppurchasesubdeliverydetailForm.patchValue({
        deliverycity: deliverycityDetail.deliverycity,
        deliverycitydesc: deliverycityDetail.name,

      });

    }
  }


  getHtml(html:any) {
    let ret = "";
    ret = html;
    for (let key in this.f) {
      if (this.erppurchasesubdeliverydetailForm.controls[key] != null) {
        ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erppurchasesubdeliverydetailForm.controls[key]!.value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear:any) {
    this.isSubmitted = true;
    let strError = "";
    Object.keys(this.erppurchasesubdeliverydetailForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.erppurchasesubdeliverydetailForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        });
      }
    });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.erppurchasesubdeliverydetailForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.erppurchasesubdeliverydetailForm!.value;
    obj.deliverydate = this.ngbDateParserFormatter.format(this.erppurchasesubdeliverydetailForm.get('deliverydate')!.value);
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
    this.erppurchasesubdeliverydetailForm.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
  }
  deliverycountryonChange(evt:any) {
    let e = evt!.value;
  }
  deliverystateonChange(evt:any) {
    let e = evt!.value;
  }
  deliverycityonChange(evt:any) {
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

  AddOrEditdeliverycountry(countryid) {
    let ScreenType = '2';
    /*this.dialog.open(bocountryComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bocountryservice.getbocountriesList().then((res:any) => this.deliverycountryList = res as bocountry[]);
    });*/
  }

  AddOrEditdeliverystate(stateid) {
    let ScreenType = '2';
    /*this.dialog.open(bostateComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bostateservice.getbostatesList().then((res:any) => this.deliverystateList = res as bostate[]);
    });*/
  }

  AddOrEditdeliverycity(cityid) {
    let ScreenType = '2';
    /*this.dialog.open(bocityComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bocityservice.getbocitiesList().then((res:any) => this.deliverycityList = res as bocity[]);
    });*/
  }


}


