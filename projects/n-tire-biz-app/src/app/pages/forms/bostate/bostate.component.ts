import { bostateService } from './../../../service/bostate.service';
import { bostate } from './../../../model/bostate.model';
import { Component, OnInit,ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { bocityComponent } from './../../../pages/forms/bocity/bocity.component';
import { bocityService } from './../../../service/bocity.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
    selector: 'app-bostate',
    templateUrl: './bostate.component.html',
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
    `],
    providers: []
})



export class bostateComponent implements OnInit {
    formData: bostate;
    list: bostate[];
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

    bfilterPopulate_bostates: boolean = false;
    bfilterPopulate_bocities: boolean = false;
    bostate_menuactions: any = []
    bocity_menuactions: any = []
    @ViewChild('tbl_bocities', { static: false }) tbl_bocities: Ng2SmartTableComponent;

    bostate_Form: FormGroup;


    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bocities_visiblelist: any;
    bocities_hidelist: any;

    Deleted_bocity_IDs: string = "";
    bocities_ID: string = "1";
    bocities_selectedindex: any;


    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bostate_service: bostateService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bostate_Form = this.fb.group({
            pk: [null],
            stateid: [null],
            code: [null, Validators.compose([Validators.required])],
            name: [null, Validators.compose([Validators.required])],
            countryid: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bostate_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bostate_Form.dirty && this.bostate_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.stateid && pkDetail) {
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
        let bostateid = null;

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
        this.formid = bostateid;

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bocities_TableConfig();

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.bostate_service.getDefaultData().then(res => {
        }).catch((err) => { this.spinner.hide();});

        //autocomplete
        this.bostate_service.get_bostates_List().then(res => {
            this.pkList = res as bostate[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.bostate_Form.markAsUntouched();
        this.bostate_Form.markAsPristine();
    }



    resetForm() {
        if (this.bostate_Form != null)
            this.bostate_Form.reset();
        this.bostate_Form.patchValue({
        });
        setTimeout(() => {
            this.bocities_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let stateid = this.bostate_Form.get('stateid').value;
        if (stateid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bostate_service.delete_bostate(stateid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { this.spinner.hide();});
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bostate_Form.patchValue({
            stateid: null
        });
        if (this.formData.stateid != null) this.formData.stateid = null;
        for (let i = 0; i < this.tbl_bocities.source.length; i++) {
            this.tbl_bocities.source[i].cityid = null;
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
                        this.bostate_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bostate_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bostate_Form.controls[key] != undefined) {
                                this.bostate_Form.controls[key].disable({ onlySelf: true });
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

    edit_bostates() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bostate_service.get_bostates_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bostate;
            let formproperty = res.bostate.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bostate.pkcol;
            this.formid = res.bostate.stateid;
            this.FillData(res);
        }).catch((err) => { });
    }
    FillData(res: any) {
        this.formData = res.bostate;
        this.formid = res.bostate.stateid;
        this.pkcol = res.bostate.pkcol;
        this.bmyrecord = false;
        if ((res.bostate as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bostate_Form.patchValue({
            stateid: res.bostate.stateid,
            code: res.bostate.code,
            name: res.bostate.name,
            countryid: res.bostate.countryid,
            status: res.bostate.status,
            statusdesc: res.bostate.statusdesc,
        });
        this.bostate_menuactions = res.bostate_menuactions;
        this.bocity_menuactions = res.bocity_menuactions;
        this.bocities_visiblelist = res.bocities_visiblelist;
        //Child Tables if any
        this.Set_bocities_TableConfig();
        this.bocities_LoadTable(res.bocities);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bostate_Form.controls) {
            let val = this.bostate_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bostate_Form.controls[key] != null) {
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
        if (!this.bostate_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bostate_Form.getRawValue();
        if (!confirm('Do you want to want to save?')) {
            return;
        }
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
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
        this.isSubmitted = true;
        let strError = "";
        if (strError != "") return this.sharedService.alert(strError);

        if (!this.bostate_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bostate_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bostate_Form.controls[key] != null) {
                        this.formData[key] = this.bostate_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bocity_IDs = this.Deleted_bocity_IDs;
        this.spinner.show();
        this.bostate_service.saveOrUpdate_bostates(this.formData, this.tbl_bocities?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bocities.source) {
                    for (let i = 0; i < this.tbl_bocities.source.data.length; i++) {
                        if (this.tbl_bocities.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bocities.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bostate);
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
                        this.objvalues.push((res as any).bostate);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bostate_Form.markAsUntouched();
                this.bostate_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_bocities.source = new LocalDataSource();
    }

    AddOrEdit_bocity(event: any, cityid: any, stateid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bocityComponent,
            { width:'40% !important',
            height:'30% !important',
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, cityid, stateid, visiblelist: this.bocities_visiblelist, hidelist: this.bocities_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bocities.source.add(res[i]);
                    }
                    this.tbl_bocities.source.refresh();
                }
                else {
                    this.tbl_bocities.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bocity(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bocity_IDs += childID + ",";
        this.tbl_bocities.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bocities
    bocities_settings: any;

    show_bocities_Checkbox() {
        if (this.tbl_bocities.source.settings['selectMode'] == 'multi') this.tbl_bocities.source.settings['selectMode'] = 'single';
        else
            this.tbl_bocities.source.settings['selectMode'] = 'multi';
        this.tbl_bocities.source.initGrid();
    }
    delete_bocities_All() {
        this.tbl_bocities.source.settings['selectMode'] = 'single';
    }
    show_bocities_Filter() {
        if (this.tbl_bocities.source.settings != null) this.tbl_bocities.source.settings['hideSubHeader'] = !this.tbl_bocities.source.settings['hideSubHeader'];
        this.tbl_bocities.source.initGrid();
    }
    async Set_bocities_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bocities) {
        }
        this.bfilterPopulate_bocities = true;
    }
    async bocities_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_bocities_TableConfig() {
        this.bocities_settings = {
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
                custom: this.bocity_menuactions
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
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                code: {
                    title: 'Code',
                    type: '',
                    filter: true,
                },
                name: {
                    title: 'Name',
                    type: '',
                    filter: true,
                },
            },
            attr: {
                class: 'table table-bordered table-header'
            },
        };
    }
    bocities_LoadTable(bocities = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bocities_ID) >= 0) {
            if (this.tbl_bocities != undefined) this.tbl_bocities.source = new LocalDataSource();
            if (this.tbl_bocities != undefined) this.tbl_bocities.source.load(bocities as any as LocalDataSource);
            if (this.tbl_bocities != undefined) this.tbl_bocities.source.setPaging(1, 20, true);
        }
    }

    bocities_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bocity(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bocity(event, event.data.cityid, this.formid);
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    this.onDelete_bocity(event, event.data.cityid, ((this.tbl_bocities.source.getPaging().page - 1) * this.tbl_bocities.source.getPaging().perPage) + event.index);
                    this.tbl_bocities.source.refresh();
                }
                break;
        }
    }
    bocities_onDelete(obj) {
        let cityid = obj.data.cityid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bostate_service.delete_bostate(cityid).then(res =>
                this.bocities_LoadTable()
            );
        }
    }
    async onCustom_bocities_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bocities");
        let formname = (objbomenuaction as any).actionname;
    }
    bocities_Paging(val) {
        this.tbl_bocities.source.setPaging(1, val, true);
    }

    handle_bocities_GridSelected(event: any) {
        this.bocities_selectedindex = this.tbl_bocities.source.findIndex(i => i.cityid === event.data.cityid);
    }
    Is_bocities_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bocities_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bocities

}



