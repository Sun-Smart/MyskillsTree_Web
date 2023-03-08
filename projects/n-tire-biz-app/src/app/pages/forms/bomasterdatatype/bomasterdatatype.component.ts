import { bomasterdatatypeService } from './../../../service/bomasterdatatype.service';
import { bomasterdatatype } from './../../../model/bomasterdatatype.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { bomasterdataComponent } from './../../../pages/forms/bomasterdata/bomasterdata.component';
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
    selector: 'app-bomasterdatatype',
    templateUrl: './bomasterdatatype.component.html',
    styles: [`
    :host /deep/ ng2-smart-table tbody > tr:nth-child(even) {
        background-color : #f4f4f4 !important;
        }
        .table thead tr {
            background-color: #a89888 !important;
            color: #fff !important;
            border: #6b431d !important;
        }
        ::ng-deep ng2-smart-table-title a{
            font-size:13px;
            color:#fff !important;
        }
        .table{
            margin: auto !important;
        }
    
        ::ng-deep  .ng2-smart-row td {
            vertical-align: middle;
        }
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
          right: 100px !important;
          width: auto !important;
        }
      }
    `],
    providers: []
})

export class bomasterdatatypeComponent implements OnInit {
    formData: bomasterdatatype;
    list: bomasterdatatype[];
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

    bfilterPopulate_bomasterdatatypes: boolean = false;
    bfilterPopulate_bomasterdatas: boolean = false;
    bomasterdatatype_menuactions: any = []
    bomasterdata_menuactions: any = []
    @ViewChild('tbl_bomasterdatas', { static: false }) tbl_bomasterdatas: Ng2SmartTableComponent;

    bomasterdatatype_Form: FormGroup;

    code_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    checkrelease : boolean = false;
    releasecheckbox : boolean = false;
    canedit:boolean = false ;
    bomasterdatas_visiblelist: any;
    bomasterdatas_hidelist: any;

    Deleted_bomasterdata_IDs: string = "";
    bomasterdatas_ID: string = "1";
    bomasterdatas_selectedindex: any;
    masterdatatypeid1: string;
    mdata: any;
    boarray: any[];
check1:boolean = false ;

    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bomasterdatatype_service: bomasterdatatypeService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bomasterdatatype_Form = this.fb.group({
            pk: [null],
            datatypeid: [null],
            code: [null],
            codedesc: [null],
            masterdataname: [null, Validators.compose([Validators.required])],
            hassubcategory: [null],
            canadd: [null],
            canedit: [null],
            candelete: [null],
            erp: [null],
            cams: [null],
            crm: [null],
            procurement: [null],
            legal: [null],
            hrms: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bomasterdatatype_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {

        if (this.bomasterdatatype_Form.dirty && this.bomasterdatatype_Form.touched) {
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
        if (pkDetail.datatypeid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }


    // initialize
    async ngOnInit() {
        this.checkRelease();
        //session & theme
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.SESSIONUSERID = this.sessionData.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');
        //this.viewHtml=this.sessionService.getViewHtml();


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
        let bomasterdatatypeid = null;

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
        this.formid = bomasterdatatypeid;
        //alert(bomasterdatatypeid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bomasterdatas_TableConfig();
            setTimeout(() => {
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.bomasterdatatype_service.getDefaultData().then(res => {
            this.code_List = res.list_code.value;
        }).catch((err) => { this.spinner.hide(); });

        //autocomplete
        this.bomasterdatatype_service.get_bomasterdatatypes_List().then(res => {
            this.pkList = res as bomasterdatatype[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide();});
        //setting the flag that the screen is not touched
        this.bomasterdatatype_Form.markAsUntouched();
        this.bomasterdatatype_Form.markAsPristine();
        console.log( this.bomasterdatatype_Form.value.hassubcategory)



    }

    checkRelease()
    {
       localStorage.setItem("releasecheckbox", JSON.stringify(this.releasecheckbox));

    }
    checkedit(){
        localStorage.setItem("canedit", JSON.stringify(this.canedit));
    }

    release(release: any) {
        throw new Error('Method not implemented.');
    }

    resetForm() {
        if (this.bomasterdatatype_Form != null)
            this.bomasterdatatype_Form.reset();
        this.bomasterdatatype_Form.patchValue({
        });
        setTimeout(() => {
            this.bomasterdatas_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let datatypeid = this.bomasterdatatype_Form.get('datatypeid').value;
        if (datatypeid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomasterdatatype_service.delete_bomasterdatatype(datatypeid).then(res => {
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
        this.bomasterdatatype_Form.patchValue({
            datatypeid: null
        });
        if (this.formData.datatypeid != null) this.formData.datatypeid = null;
        for (let i = 0; i < this.tbl_bomasterdatas.source.length; i++) {
            this.tbl_bomasterdatas.source[i].masterdataid = null;
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
                        this.bomasterdatatype_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomasterdatatype_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomasterdatatype_Form.controls[key] != undefined) {
                                this.bomasterdatatype_Form.controls[key].disable({ onlySelf: true });
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
    goBack(){

        this.router.navigate(['/home/boreportviewer/v2mgx']);

    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdataname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdataname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    code_onChange(evt: any) {
        let e = this.f.code.value as any;
        this.bomasterdatatype_Form.patchValue({ codedesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bomasterdatatypes() {
        this.showview = false;
        return false;
    }

    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bomasterdatatype_service.get_bomasterdatatypes_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bomasterdatatype;
            let formproperty = res.bomasterdatatype.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bomasterdatatype.pkcol;
            this.formid = res.bomasterdatatype.datatypeid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bomasterdatatype;
        this.formid = res.bomasterdatatype.datatypeid;
        this.pkcol = res.bomasterdatatype.pkcol;
        this.bmyrecord = false;
        if ((res.bomasterdatatype as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.mdata=res.bomasterdatatype.masterdataname
        this.bomasterdatatype_Form.patchValue({
            datatypeid: res.bomasterdatatype.datatypeid,
            code: res.bomasterdatatype.code,
            codedesc: res.bomasterdatatype.codedesc,
            masterdataname: res.bomasterdatatype.masterdataname,
            hassubcategory: res.bomasterdatatype.hassubcategory,
            canadd: res.bomasterdatatype.canadd,
            canedit: res.bomasterdatatype.canedit,
            candelete: res.bomasterdatatype.candelete,
            erp: res.bomasterdatatype.erp,
            cams: res.bomasterdatatype.cams,
            crm: res.bomasterdatatype.crm,
            procurement: res.bomasterdatatype.procurement,
            legal: res.bomasterdatatype.legal,
            hrms: res.bomasterdatatype.hrms,
            status: res.bomasterdatatype.status,
            statusdesc: res.bomasterdatatype.statusdesc,
        });
        this.bomasterdatatype_menuactions = res.bomasterdatatype_menuactions;
        this.bomasterdata_menuactions = res.bomasterdata_menuactions;
        this.bomasterdatas_visiblelist = res.bomasterdatas_visiblelist;
        //Child Tables if any
        this.Set_bomasterdatas_TableConfig();
        this.bomasterdatas_LoadTable(res.bomasterdatas);

    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bomasterdatatype_Form.controls) {
            let val = this.bomasterdatatype_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bomasterdatatype_Form.controls[key] != null) {
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
        if (!this.bomasterdatatype_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bomasterdatatype_Form.getRawValue();
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

        if (!this.bomasterdatatype_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bomasterdatatype_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bomasterdatatype_Form.controls[key] != null) {
                        this.formData[key] = this.bomasterdatatype_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bomasterdata_IDs = this.Deleted_bomasterdata_IDs;
        this.spinner.show();
        this.bomasterdatatype_service.saveOrUpdate_bomasterdatatypes(this.formData, this.tbl_bomasterdatas?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bomasterdatas.source) {
                    for (let i = 0; i < this.tbl_bomasterdatas.source.data.length; i++) {
                        if (this.tbl_bomasterdatas.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bomasterdatas.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();

                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bomasterdatatype);
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
                        this.objvalues.push((res as any).bomasterdatatype);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomasterdatatype_Form.markAsUntouched();
                this.bomasterdatatype_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_bomasterdatas.source = new LocalDataSource();
    }

    AddOrEdit_bomasterdata(event: any, masterdataid: any, datatypeid: any) {

        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bomasterdataComponent,
            { width: '50% !important',
            height: '40% !important',
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, masterdataid, datatypeid, visiblelist: this.bomasterdatas_visiblelist, hidelist: this.bomasterdatas_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bomasterdatas.source.add(res[i]);
                    }
                    this.tbl_bomasterdatas.source.refresh();
                }
                else {
                    this.tbl_bomasterdatas.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bomasterdata(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bomasterdata_IDs += childID + ",";
        this.tbl_bomasterdatas.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bomasterdatas
    bomasterdatas_settings: any;

    show_bomasterdatas_Checkbox() {

        if (this.tbl_bomasterdatas.source.settings['selectMode'] == 'multi') this.tbl_bomasterdatas.source.settings['selectMode'] = 'single';
        else
            this.tbl_bomasterdatas.source.settings['selectMode'] = 'multi';
        this.tbl_bomasterdatas.source.initGrid();
    }
    delete_bomasterdatas_All() {
        this.tbl_bomasterdatas.source.settings['selectMode'] = 'single';
    }
    show_bomasterdatas_Filter() {
        if (this.tbl_bomasterdatas.source.settings != null) this.tbl_bomasterdatas.source.settings['hideSubHeader'] = !this.tbl_bomasterdatas.source.settings['hideSubHeader'];
        this.tbl_bomasterdatas.source.initGrid();
    }
    async Set_bomasterdatas_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bomasterdatas) {

            var clone = this.sharedService.clone(this.tbl_bomasterdatas.source.settings);
            if (clone.columns['masterdatatypeid'] != undefined) clone.columns['masterdatatypeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomasterdatas_masterdatatypeid.value)), }, };
            if (clone.columns['masterdatatypeid'] != undefined) clone.columns['masterdatatypeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomasterdatas_masterdatatypeid.value)), }, };
            this.tbl_bomasterdatas.source.settings = clone;
            this.tbl_bomasterdatas.source.initGrid();
        }
        this.bfilterPopulate_bomasterdatas = true;
    }
    async bomasterdatas_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_bomasterdatas_TableConfig() {
        this.bomasterdatas_settings = {
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
                custom: this.bomasterdata_menuactions
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
                masterdatacode: {
                    title: 'Master Data Code',
                    type: '',
                    filter: true,
                },
                masterdatadescription: {
                    title: 'Master Data Description',
                    type: '',
                    filter: true,
                },

            },
            attr: {
                class: 'table table-bordered table-header'
            },
        };
    }
    bomasterdatas_LoadTable(bomasterdatas = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomasterdatas_ID) >= 0) {
            if (this.tbl_bomasterdatas != undefined) this.tbl_bomasterdatas.source = new LocalDataSource();
            if (this.tbl_bomasterdatas != undefined) this.tbl_bomasterdatas.source.load(bomasterdatas as any as LocalDataSource);
            if (this.tbl_bomasterdatas != undefined) this.tbl_bomasterdatas.source.setPaging(1, 20, true);
        }
    }


    bomasterdatas_route(event: any, action: any) {

        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bomasterdata(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bomasterdata(event, event.data.masterdataid, this.formid);
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    this.onDelete_bomasterdata(event, event.data.masterdataid, ((this.tbl_bomasterdatas.source.getPaging().page - 1) * this.tbl_bomasterdatas.source.getPaging().perPage) + event.index);
                    this.tbl_bomasterdatas.source.refresh();
                }
                break;
        }
    }
    masterdataname(event: any, arg1: null, formid: any, masterdataname: any) {
        throw new Error('Method not implemented.');
    }
    bomasterdatas_onDelete(obj) {
        let masterdataid = obj.data.masterdataid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bomasterdatatype_service.delete_bomasterdatatype(masterdataid).then(res =>
                this.bomasterdatas_LoadTable()
            );
        }
    }
    async onCustom_bomasterdatas_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bomasterdatas");
        let formname = (objbomenuaction as any).actionname;




    }
    bomasterdatas_Paging(val) {

        this.tbl_bomasterdatas.source.setPaging(1, val, true);
    }

    handle_bomasterdatas_GridSelected(event: any) {
        this.bomasterdatas_selectedindex = this.tbl_bomasterdatas.source.findIndex(i => i.masterdataid === event.data.masterdataid);
    }
    Is_bomasterdatas_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomasterdatas_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bomasterdatas

}



