import { bocityService } from './../../../service/bocity.service';
import { bocity } from './../../../model/bocity.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { bolocationComponent } from './../../../pages/forms/bolocation/bolocation.component';
import { bolocationService } from './../../../service/bolocation.service';
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

@Component({
    selector: 'app-bocity',
    templateUrl: './bocity.component.html',
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
    `]
})



export class bocityComponent implements OnInit {
    formData: bocity;
    list: bocity[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    objvalues: any = [];
    viewHtml: any = '';
    showview: boolean = false;
    theme: string = "";
    shortcuts: ShortcutInput[] = [];
    showSubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    pkList: any;
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
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
    bfilterPopulate_bocities: boolean = false;
    bfilterPopulate_bolocations: boolean = false;
    bocity_menuactions: any = []
    bolocation_menuactions: any = []
    @ViewChild('tbl_bolocations', { static: false }) tbl_bolocations: Ng2SmartTableComponent;
    bocity_Form: FormGroup;
    countryid_List: DropDownValues[];
    countryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user
    sessionData: any;
    sourceKey: any;
    bolocations_visiblelist: any;
    bolocations_hidelist: any;
    Deleted_bolocation_IDs: string = "";
    bolocations_ID: string = "1";
    bolocations_selectedindex: any;
    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bocity_service: bocityService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bocity_Form = this.fb.group({
            pk: [null],
            cityid: [null],
            code: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            stateid: [null],
            countryid: [null],
            countryiddesc: [null],
            metro: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bocity_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.bocity_Form.dirty && this.bocity_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.cityid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    async ngOnInit() {
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.SESSIONUSERID = this.sessionData.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');
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
        let bocityid = null;
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
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
        this.viewHtml = ``;
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = bocityid;
        if (this.pkcol == null) {
            this.Set_bolocations_TableConfig();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bocity_service.getDefaultData().then(res => {
            this.countryid_List = res.list_countryid.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.bocity_service.get_bocities_List().then(res => {
            this.pkList = res as bocity[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide();});
        this.bocity_Form.markAsUntouched();
        this.bocity_Form.markAsPristine();
    }
    onSelected_countryid(countryidDetail: any) {
        if (countryidDetail.value && countryidDetail) {
            this.bocity_Form.patchValue({
                countryid: countryidDetail.value,
                countryiddesc: countryidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bocity_Form != null)
            this.bocity_Form.reset();
        this.bocity_Form.patchValue({
        });
        setTimeout(() => {
            this.bolocations_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let cityid = this.bocity_Form.get('cityid').value;
        if (cityid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocity_service.delete_bocity(cityid).then(res => {
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
        this.bocity_Form.patchValue({
            cityid: null
        });
        if (this.formData.cityid != null) this.formData.cityid = null;
        for (let i = 0; i < this.tbl_bolocations.source.length; i++) {
            this.tbl_bolocations.source[i].locationid = null;
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
                    else if (ctrltype == "string") {
                        this.bocity_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocity_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocity_Form.controls[key] != undefined) {
                                this.bocity_Form.controls[key].disable({ onlySelf: true });
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
    countryid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_bocities() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bocity_service.get_bocities_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bocity;
            let formproperty = res.bocity.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bocity.pkcol;
            this.formid = res.bocity.cityid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bocity;
        this.formid = res.bocity.cityid;
        this.pkcol = res.bocity.pkcol;
        this.bmyrecord = false;
        if ((res.bocity as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bocity_Form.patchValue({
            cityid: res.bocity.cityid,
            code: res.bocity.code,
            name: res.bocity.name,
            stateid: res.bocity.stateid,
            countryid: res.bocity.countryid,
            countryiddesc: res.bocity.countryiddesc,
            metro: res.bocity.metro,
            status: res.bocity.status,
            statusdesc: res.bocity.statusdesc,
        });
        this.bocity_menuactions = res.bocity_menuactions;
        this.bolocation_menuactions = res.bolocation_menuactions;
        this.bolocations_visiblelist = res.bolocations_visiblelist;
        this.Set_bolocations_TableConfig();
        this.bolocations_LoadTable(res.bolocations);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bocity_Form.controls) {
            let val = this.bocity_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bocity_Form.controls[key] != null) {
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
        if (!this.bocity_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bocity_Form.getRawValue();
        console.log(obj);
        if (!confirm('Do you want to want to save?')) {
            return;
        }
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
    }
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
        let strError = "";
        if (strError != "") return this.sharedService.alert(strError);
        if (!this.bocity_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bocity_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bocity_Form.controls[key] != null) {
                        this.formData[key] = this.bocity_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bolocation_IDs = this.Deleted_bolocation_IDs;
        this.spinner.show();
        this.bocity_service.saveOrUpdate_bocities(this.formData, this.tbl_bolocations?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bolocations.source) {
                    for (let i = 0; i < this.tbl_bolocations.source.data.length; i++) {
                        if (this.tbl_bolocations.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bolocations.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bocity);
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
                        this.objvalues.push((res as any).bocity);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocity_Form.markAsUntouched();
                this.bocity_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }
    clearList() {
        this.tbl_bolocations.source = new LocalDataSource();
    }

    AddOrEdit_bolocation(event: any, locationid: any, cityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bolocationComponent,
            { 
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, cityid, visiblelist: this.bolocations_visiblelist, hidelist: this.bolocations_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bolocations.source.add(res[i]);
                    }
                    this.tbl_bolocations.source.refresh();
                }
                else {
                    this.tbl_bolocations.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bolocation(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bolocation_IDs += childID + ",";
        this.tbl_bolocations.source.splice(i, 1);
    }

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    bolocations_settings: any;

    show_bolocations_Checkbox() {
        if (this.tbl_bolocations.source.settings['selectMode'] == 'multi') this.tbl_bolocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_bolocations.source.settings['selectMode'] = 'multi';
        this.tbl_bolocations.source.initGrid();
    }
    delete_bolocations_All() {
        this.tbl_bolocations.source.settings['selectMode'] = 'single';
    }
    show_bolocations_Filter() {
        if (this.tbl_bolocations.source.settings != null) this.tbl_bolocations.source.settings['hideSubHeader'] = !this.tbl_bolocations.source.settings['hideSubHeader'];
        this.tbl_bolocations.source.initGrid();
    }
    async Set_bolocations_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bolocations) {

            var clone = this.sharedService.clone(this.tbl_bolocations.source.settings);
            if (clone.columns['locationid'] != undefined) clone.columns['locationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bolocations_locationid.value)), }, };
            if (clone.columns['locationid'] != undefined) clone.columns['locationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bolocations_locationid.value)), }, };
            this.tbl_bolocations.source.settings = clone;
            this.tbl_bolocations.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bolocations.source.settings);
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bolocations_branchid.value)), }, };
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bolocations_branchid.value)), }, };
            this.tbl_bolocations.source.settings = clone;
            this.tbl_bolocations.source.initGrid();
        }
        this.bfilterPopulate_bolocations = true;
    }
    async bolocations_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_bolocations_TableConfig() {
        this.bolocations_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: 'Actions',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.bolocation_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class=""></i>',
                confirmDelete: false,
            },
            columns: {
                branchiddesc: {
                    title: 'Branch',
                    type: 'html',
                    filter: true,
                },
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
                postalcode: {
                    title: 'Postal Code',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                state: {
                    title: 'State',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                stateid: {
                    title: 'State',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                city: {
                    title: 'City',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                latitude: {
                    title: 'Latitude',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                longitude: {
                    title: 'Longitude',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                areadetails: {
                    title: 'Area Details',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                population: {
                    title: 'Population',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                remarks: {
                    title: 'Remarks',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                customfield: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getCustomValue(cell);
                        return ret;
                    },
                },
            },
        };
    }
    bolocations_LoadTable(bolocations = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bolocations_ID) >= 0) {
            if (this.tbl_bolocations != undefined) this.tbl_bolocations.source = new LocalDataSource();
            if (this.tbl_bolocations != undefined) this.tbl_bolocations.source.load(bolocations as any as LocalDataSource);
            if (this.tbl_bolocations != undefined) this.tbl_bolocations.source.setPaging(1, 20, true);
        }
    }
    bolocations_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bolocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bolocation(event, event.data.locationid, this.formid);
                break;
            case 'delete':
                this.onDelete_bolocation(event, event.data.locationid, ((this.tbl_bolocations.source.getPaging().page - 1) * this.tbl_bolocations.source.getPaging().perPage) + event.index);
                this.tbl_bolocations.source.refresh();
                break;
        }
    }
    bolocations_onDelete(obj) {
        let locationid = obj.data.locationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bocity_service.delete_bocity(locationid).then(res =>
                this.bolocations_LoadTable()
            );
        }
    }
    async onCustom_bolocations_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bolocations");
        let formname = (objbomenuaction as any).actionname;
    }
    bolocations_Paging(val) {
        this.tbl_bolocations.source.setPaging(1, val, true);
    }
    handle_bolocations_GridSelected(event: any) {
        this.bolocations_selectedindex = this.tbl_bolocations.source.findIndex(i => i.locationid === event.data.locationid);
    }
    Is_bolocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bolocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }

}



