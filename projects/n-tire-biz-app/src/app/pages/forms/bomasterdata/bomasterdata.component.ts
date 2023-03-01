import { bomasterdataService } from './../../../service/bomasterdata.service';
import { bomasterdata } from './../../../model/bomasterdata.model';
import {  Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { bosubcategorymasterComponent } from './../../../pages/forms/bosubcategorymaster/bosubcategorymaster.component';
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
    selector: 'app-bomasterdata',
    templateUrl: './bomasterdata.component.html',
    styles: [`
    @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
      }
    `]
})

export class bomasterdataComponent implements OnInit {
    formData: bomasterdata;
    list: bomasterdata[];
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

    bfilterPopulate_bomasterdatas: boolean = false;
    bfilterPopulate_bosubcategorymasters: boolean = false;
    bomasterdata_menuactions: any = []
    bosubcategorymaster_menuactions: any = []
    @ViewChild('tbl_bosubcategorymasters', { static: false }) tbl_bosubcategorymasters: Ng2SmartTableComponent;

    bomasterdata_Form: FormGroup;

    masterdatatypeid_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user
    plusbutton : boolean = true ;
    sessionData: any;
    sourceKey: any;

    bosubcategorymasters_visiblelist: any;
    bosubcategorymasters_hidelist: any;

    Deleted_bosubcategorymaster_IDs: string = "";
    bosubcategorymasters_ID: string = "1";
    bosubcategorymasters_selectedindex: any;
    masterdatatypeid: any;
    addbutton: string;


    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bomasterdata_service: bomasterdataService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bomasterdata_Form = this.fb.group({
            pk: [null],
            masterdataid: [null],
            masterdatatypeid: [null, Validators.compose([Validators.required])],
            masterdataname: [null],
            masterdatatypeiddesc: [null],
            masterdatacode: [null, Validators.compose([Validators.required])],
            masterdatadescription: [null, Validators.compose([Validators.required])],
            orderno: [null],
            htmlcode: [null],
            param1: [null],
            param2: [null],
            helptext: [null],
            flag: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bomasterdata_Form.controls; }

    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bomasterdata_Form.dirty && this.bomasterdata_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.masterdataid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    async ngOnInit() {
        // this.masterdatatypeid = this.bomasterdata_service.boarray
        // this.bomasterdata_Form.patchValue({ masterdatatypeid: this.masterdatatypeid[0] })
        
        this.addbutton = localStorage.getItem("releasecheckbox");
        console.log(this.addbutton);
        
        if(this.addbutton == "false")
        {
            this.plusbutton = true;
        }
      if(this.addbutton == "true")
        { 
            this.plusbutton = false;
        }
        


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
        let bomasterdataid = null;

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
        this.formid = bomasterdataid;

        if (this.pkcol == null) {
            this.Set_bosubcategorymasters_TableConfig();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bomasterdata_service.getDefaultData().then(res => {
            this.masterdatatypeid_List = res.list_masterdatatypeid.value;
            // this.masterdatatypeid_List = res.list_masterdatatypeid.label;
        }).catch((err) => { this.spinner.hide(); });

        this.bomasterdata_service.get_bomasterdatas_List().then(res => {
            this.pkList = res as bomasterdata[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        this.bomasterdata_Form.markAsUntouched();
        this.bomasterdata_Form.markAsPristine();
    }

    resetForm() {
        if (this.bomasterdata_Form != null)
            this.bomasterdata_Form.reset();
        this.bomasterdata_Form.patchValue({
        });
        setTimeout(() => {
            this.bosubcategorymasters_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let masterdataid = this.bomasterdata_Form.get('masterdataid').value;
        if (masterdataid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomasterdata_service.delete_bomasterdata(masterdataid).then(res => {
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
        this.bomasterdata_Form.patchValue({
            masterdataid: null
        });
        if (this.formData.masterdataid != null) this.formData.masterdataid = null;
        for (let i = 0; i < this.tbl_bosubcategorymasters.source.length; i++) {
            this.tbl_bosubcategorymasters.source[i].subcategoryid = null;
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
                        this.bomasterdata_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomasterdata_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomasterdata_Form.controls[key] != undefined) {
                                this.bomasterdata_Form.controls[key].disable({ onlySelf: true });
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


    goBack() {

        this.router.navigate(['/home/boreportviewer/aj5qt']);

    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdatadescription != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdatadescription != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    masterdatatypeid_onChange(evt: any) {
        let e = evt.value;
        this.bomasterdata_Form.patchValue({ masterdatatypeiddesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bomasterdatas() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {

        this.spinner.show();
        this.bomasterdata_service.get_bomasterdatas_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bomasterdata;
            let formproperty = res.bomasterdata.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bomasterdata.pkcol;
            this.formid = res.bomasterdata.masterdataid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {

        this.Set_bosubcategorymasters_TableConfig();
        this.bosubcategorymasters_LoadTable(res.bosubcategorymasters);
        this.formData = res.bomasterdata;
        this.formid = res.bomasterdata.masterdataid;
        this.pkcol = res.bomasterdata.pkcol;
        this.bmyrecord = false;
        if ((res.bomasterdata as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bomasterdata_Form.patchValue({
            masterdataid: res.bomasterdata.masterdataid,
            masterdatatypeid:  res.bomasterdata.masterdatatypeid,
            masterdatatypeiddesc:  res.bomasterdata.masterdatatypeiddesc,
            masterdataname: res.bomasterdatatype.masterdataname,
            masterdatacode: res.bomasterdata.masterdatacode,
            masterdatadescription: res.bomasterdata.masterdatadescription,
            orderno: res.bomasterdata.orderno,
            htmlcode: res.bomasterdata.htmlcode,
            param1: res.bomasterdata.param1,
            param2: res.bomasterdata.param2,
            helptext: res.bomasterdata.helptext,
            flag: res.bomasterdata.flag,
            status: res.bomasterdata.status,
            statusdesc: res.bomasterdata.statusdesc,
        });
        this.bomasterdata_menuactions = res.bomasterdata_menuactions;
        this.bosubcategorymaster_menuactions = res.bosubcategorymaster_menuactions;
        this.bosubcategorymasters_visiblelist = res.bosubcategorymasters_visiblelist;
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bomasterdata_Form.controls) {
            let val = this.bomasterdata_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bomasterdata_Form.controls[key] != null) {
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
        if (!this.bomasterdata_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bomasterdata_Form.getRawValue();
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

        if (!this.bomasterdata_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bomasterdata_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bomasterdata_Form.controls[key] != null) {
                        this.formData[key] = this.bomasterdata_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bosubcategorymaster_IDs = this.Deleted_bosubcategorymaster_IDs;
        this.spinner.show();
        this.bomasterdata_service.saveOrUpdate_bomasterdatas(this.formData, this.tbl_bosubcategorymasters?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bosubcategorymasters.source) {
                    for (let i = 0; i < this.tbl_bosubcategorymasters.source.data.length; i++) {
                        if (this.tbl_bosubcategorymasters.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bosubcategorymasters.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bomasterdata);
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
                        this.objvalues.push((res as any).bomasterdata);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomasterdata_Form.markAsUntouched();
                this.bomasterdata_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }

    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_bosubcategorymasters.source = new LocalDataSource();
    }

    AddOrEdit_bosubcategorymaster(event: any, subcategoryid: any, masterdataid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bosubcategorymasterComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subcategoryid, categoryid: masterdataid, visiblelist: this.bosubcategorymasters_visiblelist, hidelist: this.bosubcategorymasters_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bosubcategorymasters.source.add(res[i]);
                    }
                    this.tbl_bosubcategorymasters.source.refresh();
                }
                else {
                    this.tbl_bosubcategorymasters.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bosubcategorymaster(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bosubcategorymaster_IDs += childID + ",";
        this.tbl_bosubcategorymasters.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bosubcategorymasters
    bosubcategorymasters_settings: any;

    show_bosubcategorymasters_Checkbox() {
        if (this.tbl_bosubcategorymasters.source.settings['selectMode'] == 'multi') this.tbl_bosubcategorymasters.source.settings['selectMode'] = 'single';
        else
            this.tbl_bosubcategorymasters.source.settings['selectMode'] = 'multi';
        this.tbl_bosubcategorymasters.source.initGrid();
    }
    delete_bosubcategorymasters_All() {
        this.tbl_bosubcategorymasters.source.settings['selectMode'] = 'single';
    }
    show_bosubcategorymasters_Filter() {
        if (this.tbl_bosubcategorymasters.source.settings != null) this.tbl_bosubcategorymasters.source.settings['hideSubHeader'] = !this.tbl_bosubcategorymasters.source.settings['hideSubHeader'];
        this.tbl_bosubcategorymasters.source.initGrid();
    }
    async Set_bosubcategorymasters_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bosubcategorymasters) {
        }
        this.bfilterPopulate_bosubcategorymasters = true;
    }
    async bosubcategorymasters_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_bosubcategorymasters_TableConfig() {
        this.bosubcategorymasters_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.bosubcategorymaster_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                subcategoryname: {
                    title: 'Sub Category Name',
                    type: '',
                    filter: true,
                },
                orderno: {
                    title: 'Order No',
                    type: 'number',
                    filter: true,
                },
            },
            // attr: {
            //     class: 'table table-bordered table-header'
            // },
        };
    }
    bosubcategorymasters_LoadTable(bosubcategorymasters = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubcategorymasters_ID) >= 0) {
            if (this.tbl_bosubcategorymasters != undefined) this.tbl_bosubcategorymasters.source = new LocalDataSource();
            if (this.tbl_bosubcategorymasters != undefined) this.tbl_bosubcategorymasters.source.load(bosubcategorymasters as any as LocalDataSource);
            if (this.tbl_bosubcategorymasters != undefined) this.tbl_bosubcategorymasters.source.setPaging(1, 20, true);
        }
    }
    bosubcategorymasters_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bosubcategorymaster(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bosubcategorymaster(event, event.data.subcategoryid, this.formid);
                break;
            case 'delete':
                this.onDelete_bosubcategorymaster(event, event.data.subcategoryid, ((this.tbl_bosubcategorymasters.source.getPaging().page - 1) * this.tbl_bosubcategorymasters.source.getPaging().perPage) + event.index);
                this.tbl_bosubcategorymasters.source.refresh();
                break;
        }
    }
    bosubcategorymasters_onDelete(obj) {
        let subcategoryid = obj.data.subcategoryid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bomasterdata_service.delete_bomasterdata(subcategoryid).then(res =>
                this.bosubcategorymasters_LoadTable()
            );
        }
    }
    async onCustom_bosubcategorymasters_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bosubcategorymasters");
        let formname = (objbomenuaction as any).actionname;
    }
    bosubcategorymasters_Paging(val) {
        this.tbl_bosubcategorymasters.source.setPaging(1, val, true);
    }

    handle_bosubcategorymasters_GridSelected(event: any) {
        this.bosubcategorymasters_selectedindex = this.tbl_bosubcategorymasters.source.findIndex(i => i.subcategoryid === event.data.subcategoryid);
    }
    Is_bosubcategorymasters_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubcategorymasters_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }

}



