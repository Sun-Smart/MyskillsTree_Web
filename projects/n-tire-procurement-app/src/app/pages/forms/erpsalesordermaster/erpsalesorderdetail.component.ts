import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erpsalesorderdetail } from '../../../../../../n-tire-procurement-app/src/app/model/erpsalesorderdetail.model';
import { NgForm } from '@angular/forms';
import { erpsalesordermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsalesordermaster.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
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
    selector: 'app-erpsalesorderdetails',
    templateUrl: './erpsalesorderdetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class erpsalesorderdetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    formid: any;
    erpsalesorderdetailForm: FormGroup;
    detailtypeList: boconfigvalue[]=[];
    itemidList: erpitemmaster[];
    itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    itemid_erpitemmastersForm: FormGroup;
    itemid_erpitemmastersoptions: any;
    itemid_erpitemmastersformatter: any;
    uomList: boconfigvalue[]=[];
    currencyList: boconfigvalue[]=[];
    discounttypeList: boconfigvalue[]=[];
    tax1nameList: erptaxmaster[];
    tax2nameList: erptaxmaster[];
    basecurrencyList: boconfigvalue[]=[];
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
        private erpsalesordermasterservice: erpsalesordermasterService,
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
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd c',
                command: () => this.dialogRef.close(null),
                preventDefault: true
            }
        ]);
        this.erpsalesorderdetailForm = this.fb.group({
            sodetailid: [null],
            versionnumber: [null],
            soid: [null],
            detailtype: [null],
            detailtypedesc: [null],
            itemid: [null],
            itemiddesc: [null],
            description: [null],
            details: [null],
            quantity: [null],
            uom: [null],
            uomdesc: [null],
            currency: [null],
            currencydesc: [null],
            unitprice: [null],
            discountpercent: [null],
            discounttype: [null],
            discounttypedesc: [null],
            discountvalue: [null],
            saleprice: [null],
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
            expecteddelivery: [null],
            size: [null],
            color: [null],
            weight: [null],
            notes: [null],
            paymenttermtype: [null],
            remarks: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.erpsalesorderdetailForm.controls; }


    async ngOnInit() {
        let sessiondata = this.sessionService.getSession();
        if (sessiondata != null) {
            this.SESSIONUSERID = sessiondata.userid;
        }

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.sodetailid != null && this.data.sodetailid != undefined) ppk = this.data.sodetailid;
        if (this.data.customerid != null && this.data.customerid != undefined) this.erpsalesorderdetailForm.patchValue({ customerid: this.data.customerid });
        if (this.data != null) {
            for (let key in this.data) {

                if (key != 'visiblelist' && key != 'hidelist') {
                    let json = JSON.parse('{"' + key + '": ' + this.data[key] + ' }');
                    if (this.erpsalesorderdetailForm.controls[key] != null) {
                        this.erpsalesorderdetailForm.patchValue(json);
                        this.erpsalesorderdetailForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        this.formid = ppk;

        if (ppk == null) {
            this.erpsalesorderdetailForm.patchValue({
                expecteddelivery: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.erpsalesordermasterservice.erpsalesorderdetails.filter(x => x.sodetailid == ppk)[0];
            this.erpsalesorderdetailForm.patchValue({
                sodetailid: obj.sodetailid,
                versionnumber: obj.versionnumber,
                soid: obj.soid,
                customerid: obj.customerid,
                detailtype: obj.detailtype,
                detailtypedesc: obj.detailtypedesc,
                itemid: obj.itemid,
                itemiddesc: obj.itemiddesc,
                description: obj.description,
                details: obj.details,
                quantity: obj.quantity,
                uom: obj.uom,
                uomdesc: obj.uomdesc,
                currency: obj.currency,
                currencydesc: obj.currencydesc,
                unitprice: obj.unitprice,
                discountpercent: obj.discountpercent,
                discounttype: obj.discounttype,
                discounttypedesc: obj.discounttypedesc,
                discountvalue: obj.discountvalue,
                saleprice: obj.saleprice,
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
                expecteddelivery: this.ngbDateParserFormatter.parse(obj.expecteddelivery as any),
                size: obj.size,
                color: obj.color,
                weight: obj.weight,
                notes: obj.notes,
                paymenttermtype: obj.paymenttermtype,
                remarks: obj.remarks,
                status: obj.status,
            });
        }
        this.configservice.getList("sodetailtype").then((res:any) => this.detailtypeList = res as boconfigvalue[]);
        this.erpitemmasterservice.geterpitemmastersList().then((res:any) => {
            this.itemidList = res as erpitemmaster[];
            if (this.formdata && this.formdata.erpsalesorderdetail && this.formdata.erpsalesorderdetail.itemid) {
                this.itemidoptionsEvent.emit(this.itemidList);
                this.erpsalesorderdetailForm.patchValue({
                    itemid: this.formdata.erpsalesorderdetail.itemid,
                    itemiddesc: this.formdata.erpsalesorderdetail.itemiddesc,
                });
            }
            {
                let arritemid = this.itemidList.filter(v => v.itemid == this.erpsalesorderdetailForm.get('itemid')!.value);
                let objitemid;
                if (arritemid.length > 0) objitemid = arritemid[0];
                if (objitemid) {
                    this.erpsalesorderdetailForm.patchValue({ itemdescription: objitemid.itemdescription });
                }
            }
            {
                let arritemid = this.itemidList.filter(v => v.itemid == this.erpsalesorderdetailForm.get('itemid')!.value);
                let objitemid;
                if (arritemid.length > 0) objitemid = arritemid[0];
                if (objitemid) {
                    this.erpsalesorderdetailForm.patchValue({ uom: objitemid.uom });
                }
            }
        }
        );
        this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1 || v.itemshortname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.itemid_erpitemmastersformatter = (result: any) => result.itemcode + '  ' + result.itemshortname;
        this.configservice.getList("uom").then((res:any) => this.uomList = res as boconfigvalue[]);
        this.configservice.getList("currency").then((res:any) => this.currencyList = res as boconfigvalue[]);
        this.configservice.getList("discounttype").then((res:any) => this.discounttypeList = res as boconfigvalue[]);
        this.erptaxmasterservice.geterptaxmastersList().then((res:any) => {
            this.tax1nameList = res as erptaxmaster[];
            {
                let arrtax1name = this.tax1nameList.filter(v => v.taxid == this.erpsalesorderdetailForm.get('tax1name')!.value);
                let objtax1name;
                if (arrtax1name.length > 0) objtax1name = arrtax1name[0];
                if (objtax1name) {
                    this.erpsalesorderdetailForm.patchValue({ tax1value: objtax1name.taxpercentage });
                }
            }
        }
        );
        this.erptaxmasterservice.geterptaxmastersList().then((res:any) => {
            this.tax2nameList = res as erptaxmaster[];
            {
                let arrtax2name = this.tax2nameList.filter(v => v.taxid == this.erpsalesorderdetailForm.get('tax2name')!.value);
                let objtax2name;
                if (arrtax2name.length > 0) objtax2name = arrtax2name[0];
                if (objtax2name) {
                    this.erpsalesorderdetailForm.patchValue({ tax2value: objtax2name.taxpercentage });
                }
            }
        }
        );
        this.configservice.getList("currency").then((res:any) => this.basecurrencyList = res as boconfigvalue[]);
    }

    onSelecteditemid(itemidDetail: any) {
        if (itemidDetail.itemid && itemidDetail) {
            this.erpsalesorderdetailForm.patchValue({ itemdescription: itemidDetail.itemdescription });
            this.erpsalesorderdetailForm.patchValue({ uom: itemidDetail.uom });

        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.erpsalesorderdetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.erpsalesorderdetailForm!.value;
        obj.expecteddelivery = this.ngbDateParserFormatter.format(this.erpsalesorderdetailForm.get('expecteddelivery')!.value);
        console.log(obj);
        this.dialogRef.close(obj);
    }

    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    detailtypeonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ detailtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    itemidonChange(evt:any) {
        let e = evt!.value;
    }
    uomonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ uomdesc: evt.options[evt.options.selectedIndex].text });
    }
    currencyonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
    }
    discounttypeonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ discounttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    tax1nameonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ tax1namedesc: evt.options[evt.options.selectedIndex].text });
        this.erpsalesorderdetailForm.patchValue({ tax1value: this.tax1nameList[evt.options.selectedIndex].taxpercentage });
    }
    tax2nameonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ tax2namedesc: evt.options[evt.options.selectedIndex].text });
        this.erpsalesorderdetailForm.patchValue({ tax2value: this.tax2nameList[evt.options.selectedIndex].taxpercentage });
    }
    basecurrencyonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderdetailForm.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
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


