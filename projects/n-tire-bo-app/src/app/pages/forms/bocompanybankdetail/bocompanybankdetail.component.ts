import { bocompanybankdetailService } from '../../../../../../n-tire-bo-app/src/app/service/bocompanybankdetail.service';
import { bocompanybankdetail } from '../../../../../../n-tire-bo-app/src/app/model/bocompanybankdetail.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { bocountry } from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
import { bostate } from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
import { bocity } from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';

@Component({
    selector: 'app-bocompanybankdetail',
    templateUrl: './bocompanybankdetail.component.html',
    styles: []
})



export class bocompanybankdetailComponent implements OnInit {
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulatebocompanybankdetails: boolean = false;
    databocompanybankdetailsbankcurrency3: any = [];
    databocompanybankdetailsbankcountry3: any = [];
    databocompanybankdetailsbankstate3: any = [];
    databocompanybankdetailsbankcity3: any = [];
    bocompanybankdetailForm: FormGroup;
    bankcurrencyList: boconfigvalue[]=[];
    bankcountryList: bocountry[];
    bankcountry_bocountriesForm: FormGroup;
    bankcountry_bocountriesoptions: any;
    bankcountry_bocountriesformatter: any;
    bankstateList: bostate[];
    bankstate_bostatesForm: FormGroup;
    bankstate_bostatesoptions: any;
    bankstate_bostatesformatter: any;
    bankcityList: bocity[];
    bankcity_bocitiesForm: FormGroup;
    bankcity_bocitiesoptions: any;
    bankcity_bocitiesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    attachmentlist: any[] = [];

    constructor(
        private router: Router,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocompanybankdetailservice: bocompanybankdetailService,
        private fb: FormBuilder,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bocountryservice: bocountryService,
        private bostateservice: bostateService,
        private bocityservice: bocityService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.bocompanybankdetailForm = this.fb.group({
            bankid: [null],
            bankname: [null],
            accountnumber: [null],
            ibancode: [null],
            swiftcode: [null],
            otherreferences: [null],
            bankcurrency: [null],
            bankcurrencyDesc: [null],
            bankaddress1: [null],
            bankaddress2: [null],
            bankcountry: [null],
            bankcountryDesc: [null],
            bankstate: [null],
            bankstateDesc: [null],
            bankcity: [null],
            bankcityDesc: [null],
            bankpin: [null],
            banklatlong: [null],
            status: [null],
            statusDesc: [null],
        });
    }
    get f() { return this.bocompanybankdetailForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ngOnInit() {
        //debugger;
        let bocompanybankdetail = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.bankid != null) {
            bocompanybankdetail = this.data.bankid;
        }
        else
            bocompanybankdetail = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = bocompanybankdetail;
        //this.sharedService.alert(bocompanybankdetail);
        if (bocompanybankdetail == null) {
            this.resetForm();
        }
        else {
            this.bocompanybankdetailservice.getbocompanybankdetailsByID(parseInt(bocompanybankdetail)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.bocompanybankdetailForm.patchValue({
                    bankid: res.bocompanybankdetail.bankid,
                    bankname: res.bocompanybankdetail.bankname,
                    accountnumber: res.bocompanybankdetail.accountnumber,
                    ibancode: res.bocompanybankdetail.ibancode,
                    swiftcode: res.bocompanybankdetail.swiftcode,
                    otherreferences: res.bocompanybankdetail.otherreferences,
                    bankcurrency: res.bocompanybankdetail.bankcurrency,
                    bankcurrencyDesc: res.bocompanybankdetail.bankcurrencyDesc,
                    bankaddress1: res.bocompanybankdetail.bankaddress1,
                    bankaddress2: res.bocompanybankdetail.bankaddress2,
                    bankcountry: res.bocompanybankdetail.bankcountry,
                    bankcountryDesc: res.bocompanybankdetail.bankcountryDesc,
                    bankstate: res.bocompanybankdetail.bankstate,
                    bankstateDesc: res.bocompanybankdetail.bankstateDesc,
                    bankcity: res.bocompanybankdetail.bankcity,
                    bankcityDesc: res.bocompanybankdetail.bankcityDesc,
                    bankpin: res.bocompanybankdetail.bankpin,
                    banklatlong: res.bocompanybankdetail.banklatlong,
                    status: res.bocompanybankdetail.status,
                    statusDesc: res.bocompanybankdetail.statusDesc,
                });
                setTimeout(() => {
                    if (this.f.bankcountry.value != "" && this.f.bankcountry.value != null) this.bostateservice.getListBycountryid(this.f.bankcountry.value).then((res:any) => this.bankstateList = res as bostate[]);
                });
                setTimeout(() => {
                    if (this.f.bankstate.value != "" && this.f.bankstate.value != null) this.bocityservice.getListBystateid(this.f.bankstate.value).then((res:any) => this.bankcityList = res as bocity[]);
                });
            });
        }
        this.configservice.getList("currency").then((res:any) => this.bankcurrencyList = res as boconfigvalue[]);
        this.bocountryservice.getbocountriesList().then((res:any) => this.bankcountryList = res as bocountry[]);
        this.bankcountry_bocountriesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.bankcountryList.filter(v => v.name.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.bankcountry_bocountriesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.bankcountry.value != "" && this.f.bankcountry.value != null) this.bostateservice.getListBycountryid(this.f.bankcountry.value).then((res:any) => this.bankstateList = res as bostate[]);
        });
        this.bankstate_bostatesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.bankstateList.filter(v => v.name.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.bankstate_bostatesformatter = (result: any) => result.name;
        setTimeout(() => {
            if (this.f.bankstate.value != "" && this.f.bankstate.value != null) this.bocityservice.getListBystateid(this.f.bankstate.value).then((res:any) => this.bankcityList = res as bocity[]);
        });
        this.bankcity_bocitiesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.bankcityList.filter(v => v.name.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.bankcity_bocitiesformatter = (result: any) => result.name;
    }
    onSelectedbankcountry(bankcountryDetail: any) {
        if (bankcountryDetail) {
            this.bocompanybankdetailForm.patchValue({ bankcountry: bankcountryDetail.item.countryid });
            this.bocompanybankdetailForm.patchValue({ bankcountryDesc: bankcountryDetail.item.name });
            bankcountryDetail.preventDefault();
            this.bostateservice.getListBycountryid(this.f.bankcountry.value).then((res:any) => this.bankstateList = res as bostate[]);

        }
    }

    onSelectedbankstate(bankstateDetail: any) {
        if (bankstateDetail) {
            this.bocompanybankdetailForm.patchValue({ bankstate: bankstateDetail.item.stateid });
            this.bocompanybankdetailForm.patchValue({ bankstateDesc: bankstateDetail.item.name });
            bankstateDetail.preventDefault();
            this.bocityservice.getListBystateid(this.f.bankstate.value).then((res:any) => this.bankcityList = res as bocity[]);

        }
    }

    onSelectedbankcity(bankcityDetail: any) {
        if (bankcityDetail) {
            this.bocompanybankdetailForm.patchValue({ bankcity: bankcityDetail.item.cityid });
            this.bocompanybankdetailForm.patchValue({ bankcityDesc: bankcityDetail.item.name });
            bankcityDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.bocompanybankdetailForm != null)
            this.bocompanybankdetailForm.reset();
    }

    onDelete() {
        let bankid = this.bocompanybankdetailForm.get('bankid').value;
        if (bankid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanybankdetailservice.deletebocompanybankdetail(bankid).then((res:any) => {
                    this.resetForm();
                }
                );
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bocompanybankdetailForm.patchValue({
            bankid: null
        });
        this.bocompanybankdetailservice.formData.bankid = null;
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    bankcountryonChange(e:any) {
    }
    bankstateonChange(e:any) {
    }
    onSubmitData(bclear:any) {
        //debugger;
        this.isSubmitted = true;
        if (!this.bocompanybankdetailForm.valid)
            return;
        this.bocompanybankdetailservice.formData = new bocompanybankdetail(this.bocompanybankdetailForm.get('bankid').value, this.bocompanybankdetailForm.get('bankname').value, this.bocompanybankdetailForm.get('accountnumber').value, this.bocompanybankdetailForm.get('ibancode').value, this.bocompanybankdetailForm.get('swiftcode').value, this.bocompanybankdetailForm.get('otherreferences').value, this.bocompanybankdetailForm.get('bankcurrency').value, this.bocompanybankdetailForm.get('bankcurrencyDesc').value, this.bocompanybankdetailForm.get('bankaddress1').value, this.bocompanybankdetailForm.get('bankaddress2').value, this.bocompanybankdetailForm.get('bankcountry').value, this.bocompanybankdetailForm.get('bankcountryDesc').value, this.bocompanybankdetailForm.get('bankstate').value, this.bocompanybankdetailForm.get('bankstateDesc').value, this.bocompanybankdetailForm.get('bankcity').value, this.bocompanybankdetailForm.get('bankcityDesc').value, this.bocompanybankdetailForm.get('bankpin').value, this.bocompanybankdetailForm.get('banklatlong').value, this.bocompanybankdetailForm.get('status').value);
        console.log(this.bocompanybankdetailservice.formData);
        if (this.bocompanybankdetailForm.get('bankid').value == null || this.bocompanybankdetailForm.get('bankid').value == '' || this.bocompanybankdetailForm.get('bankid').value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.bocompanybankdetailservice.saveOrUpdatebocompanybankdetails().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.bocompanybankdetailservice.clearList();
                    this.resetForm();
                }
            },
            (err:any) => {
                //debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }
    updateRecord(bclear:any) {
        this.bocompanybankdetailservice.saveOrUpdatebocompanybankdetails().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.bocompanybankdetailservice.clearList();
                    this.resetForm();
                }
            },
            (err:any) => {
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }
    AddOrEditbankcountry(countryid) {
        let ScreenType = '2';
        /*this.dialog.open(bocountryComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bocountryservice.getbocountriesList().then((res:any) => this.bankcountryList = res as bocountry[]);
        });*/
    }

    AddOrEditbankstate(stateid) {
        let ScreenType = '2';
        /*this.dialog.open(bostateComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bostateservice.getbostatesList().then((res:any) => this.bankstateList = res as bostate[]);
        });*/
    }

    AddOrEditbankcity(cityid) {
        let ScreenType = '2';
        /*this.dialog.open(bocityComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bocityservice.getbocitiesList().then((res:any) => this.bankcityList = res as bocity[]);
        });*/
    }


}



