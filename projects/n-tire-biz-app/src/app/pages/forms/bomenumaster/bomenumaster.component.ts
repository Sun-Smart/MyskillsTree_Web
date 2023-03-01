import { bomenumasterService } from './../../../service/bomenumaster.service';
import { bomenumaster } from './../../../model/bomenumaster.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { bomenuactionComponent } from './../../../pages/forms/bomenuaction/bomenuaction.component';
import { bomenuactionService } from './../../../service/bomenuaction.service';
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
    selector: 'app-bomenumaster',
    templateUrl: './bomenumaster.component.html',
    styles: [],
    providers: []
})



export class bomenumasterComponent implements OnInit {
    formData: bomenumaster;
    list: bomenumaster[];
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

    bfilterPopulate_bomenumasters: boolean = false;
    bfilterPopulate_bomenuactions: boolean = false;
    bomenumaster_menuactions: any = []
    bomenuaction_menuactions: any = []
    @ViewChild('tbl_bomenuactions', { static: false }) tbl_bomenuactions: Ng2SmartTableComponent;

    bomenumaster_Form: FormGroup;

    parentid_List: DropDownValues[];
    parentid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bomenuactions_visiblelist: any;
    bomenuactions_hidelist: any;

    Deleted_bomenuaction_IDs: string = "";
    bomenuactions_ID: string = "1";
    bomenuactions_selectedindex: any;


    constructor( private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bomenumaster_service: bomenumasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bomenumaster_Form = this.fb.group({
            pk: [null],
            menuid: [null],
            menucode: [null],
            menudescription: [null, Validators.compose([Validators.required])],
            menuurl: [null],
            actionkey: [null],
            iconname: [null],
            helpurl: [null],
            helptext: [null],
            parentid: [null],
            parentiddesc: [null],
            orderno: [null],
            action: [null],
            showcheckbox: [null],
            showstatus: [null],
            checkboxcolumn: [null],
            nonew: [null],
            noedit: [null],
            nodelete: [null],
            wherecondition: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.bomenumaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        if (this.bomenumaster_Form.dirty && this.bomenumaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    menudescriptionexists(e: any) {
        let pos = this.pkList.map(function (e: any) { return e.menudescription.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

        if (pos >= 0 && this.pkList[pos].menuid.toString() != this.formid.toString()) {
            if (confirm("This Menu Description value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.menuid && pkDetail) {
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
        let bomenumasterid = null;

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
        this.formid = bomenumasterid;
        //alert(bomenumasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_bomenuactions_TableConfig();

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.bomenumaster_service.getDefaultData().then(res => {
            this.parentid_List = res.list_parentid.value;
        }).catch((err) => { this.spinner.hide();});

        //autocomplete
        this.bomenumaster_service.get_bomenumasters_List().then(res => {
            this.pkList = res as bomenumaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        //setting the flag that the screen is not touched
        this.bomenumaster_Form.markAsUntouched();
        this.bomenumaster_Form.markAsPristine();
    }
    onSelected_parentid(parentidDetail: any) {
        if (parentidDetail.value && parentidDetail) {
            this.bomenumaster_Form.patchValue({
                parentid: parentidDetail.value,
                parentiddesc: parentidDetail.label,

            });

        }
    }
    resetForm() {
        if (this.bomenumaster_Form != null)
            this.bomenumaster_Form.reset();
        this.bomenumaster_Form.patchValue({
        });
        setTimeout(() => {
            this.bomenuactions_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let menuid = this.bomenumaster_Form.get('menuid').value;
        if (menuid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomenumaster_service.delete_bomenumaster(menuid).then(res => {
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
        this.bomenumaster_Form.patchValue({
            menuid: null
        });
        if (this.formData.menuid != null) this.formData.menuid = null;
        for (let i = 0; i < this.tbl_bomenuactions.source.length; i++) {
            this.tbl_bomenuactions.source[i].actionid = null;
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
                        this.bomenumaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomenumaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomenumaster_Form.controls[key] != undefined) {
                                this.bomenumaster_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.menudescription != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.menudescription != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    parentid_onChange(evt: any) {
        let e = evt.value;
    }

    edit_bomenumasters() {
        this.showview = false;
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bomenumaster_service.get_bomenumasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.bomenumaster;
            let formproperty = res.bomenumaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bomenumaster.pkcol;
            this.formid = res.bomenumaster.menuid;
            this.FillData(res);
        }).catch((err) => {});
    }

    FillData(res: any) {
        this.formData = res.bomenumaster;
        this.formid = res.bomenumaster.menuid;
        this.pkcol = res.bomenumaster.pkcol;
        this.bmyrecord = false;
        if ((res.bomenumaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bomenumaster_Form.patchValue({
            menuid: res.bomenumaster.menuid,
            menucode: res.bomenumaster.menucode,
            menudescription: res.bomenumaster.menudescription,
            menuurl: res.bomenumaster.menuurl,
            actionkey: res.bomenumaster.actionkey,
            iconname: res.bomenumaster.iconname,
            helpurl: res.bomenumaster.helpurl,
            helptext: res.bomenumaster.helptext,
            parentid: res.bomenumaster.parentid,
            parentiddesc: res.bomenumaster.parentiddesc,
            orderno: res.bomenumaster.orderno,
            action: res.bomenumaster.action,
            showcheckbox: res.bomenumaster.showcheckbox,
            showstatus: res.bomenumaster.showstatus,
            checkboxcolumn: res.bomenumaster.checkboxcolumn,
            nonew: res.bomenumaster.nonew,
            noedit: res.bomenumaster.noedit,
            nodelete: res.bomenumaster.nodelete,
            wherecondition: res.bomenumaster.wherecondition,
            status: res.bomenumaster.status,
            statusdesc: res.bomenumaster.statusdesc,
        });
        this.bomenumaster_menuactions = res.bomenumaster_menuactions;
        this.bomenuaction_menuactions = res.bomenuaction_menuactions;
        this.bomenuactions_visiblelist = res.bomenuactions_visiblelist;
        //Child Tables if any
        this.Set_bomenuactions_TableConfig();
        this.bomenuactions_LoadTable(res.bomenuactions);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bomenumaster_Form.controls) {
            let val = this.bomenumaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bomenumaster_Form.controls[key] != null) {
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
        if (!this.bomenumaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bomenumaster_Form.getRawValue();
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

        if (!this.bomenumaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bomenumaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bomenumaster_Form.controls[key] != null) {
                        this.formData[key] = this.bomenumaster_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bomenuaction_IDs = this.Deleted_bomenuaction_IDs;
        this.spinner.show();
        this.bomenumaster_service.saveOrUpdate_bomenumasters(this.formData, this.tbl_bomenuactions?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bomenuactions.source) {
                    for (let i = 0; i < this.tbl_bomenuactions.source.data.length; i++) {
                        if (this.tbl_bomenuactions.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bomenuactions.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bomenumaster);
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
                        this.objvalues.push((res as any).bomenumaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomenumaster_Form.markAsUntouched();
                this.bomenumaster_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }


    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_bomenuactions.source = new LocalDataSource();
    }

    AddOrEdit_bomenuaction(event: any, actionid: any, menuid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bomenuactionComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, actionid, menuid, visiblelist: this.bomenuactions_visiblelist, hidelist: this.bomenuactions_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bomenuactions.source.add(res[i]);
                    }
                    this.tbl_bomenuactions.source.refresh();
                }
                else {
                    this.tbl_bomenuactions.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bomenuaction(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bomenuaction_IDs += childID + ",";
        this.tbl_bomenuactions.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bomenuactions
    bomenuactions_settings: any;

    show_bomenuactions_Checkbox() {
        if (this.tbl_bomenuactions.source.settings['selectMode'] == 'multi') this.tbl_bomenuactions.source.settings['selectMode'] = 'single';
        else
            this.tbl_bomenuactions.source.settings['selectMode'] = 'multi';
        this.tbl_bomenuactions.source.initGrid();
    }
    delete_bomenuactions_All() {
        this.tbl_bomenuactions.source.settings['selectMode'] = 'single';
    }
    show_bomenuactions_Filter() {
        if (this.tbl_bomenuactions.source.settings != null) this.tbl_bomenuactions.source.settings['hideSubHeader'] = !this.tbl_bomenuactions.source.settings['hideSubHeader'];
        this.tbl_bomenuactions.source.initGrid();
    }
    async Set_bomenuactions_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bomenuactions) {

            var clone = this.sharedService.clone(this.tbl_bomenuactions.source.settings);
            if (clone.columns['rowselecttype'] != undefined) clone.columns['rowselecttype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_rowselecttype.value)), }, };
            if (clone.columns['rowselecttype'] != undefined) clone.columns['rowselecttype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_rowselecttype.value)), }, };
            this.tbl_bomenuactions.source.settings = clone;
            this.tbl_bomenuactions.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_bomenuactions.source.settings);
            if (clone.columns['actiontype'] != undefined) clone.columns['actiontype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_actiontype.value)), }, };
            if (clone.columns['actiontype'] != undefined) clone.columns['actiontype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_actiontype.value)), }, };
            this.tbl_bomenuactions.source.settings = clone;
            this.tbl_bomenuactions.source.initGrid();
        }
        this.bfilterPopulate_bomenuactions = true;
    }
    async bomenuactions_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_bomenuactions_TableConfig() {
        this.bomenuactions_settings = {
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
                custom: this.bomenuaction_menuactions
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
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                rowselecttypedesc: {
                    title: 'Row Select Type',
                    type: 'html',
                    filter: true,
                },
                actionicon: {
                    title: 'Action Icon',
                    type: '',
                    filter: true,
                },
                actiontypedesc: {
                    title: 'Action Type',
                    type: 'html',
                    filter: true,
                },
                servicename: {
                    title: 'Service Name',
                    type: '',
                    filter: true,
                },
                actionname: {
                    title: 'Action Name',
                    type: '',
                    filter: true,
                },
                actioncondition: {
                    title: 'Action Condition',
                    type: '',
                    filter: true,
                },
                actionbutton: {
                    title: 'Action Button',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                actionbuttonlocation: {
                    title: 'Action Button Location',
                    type: '',
                    filter: true,
                },
                actionhelp: {
                    title: 'Action Help',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                actionrequestorfield: {
                    title: 'Action Requestor Field',
                    type: '',
                    filter: true,
                },
                actionassigneduserfield: {
                    title: 'Action Assigned User Field',
                    type: '',
                    filter: true,
                },
                notificationtext: {
                    title: 'Notification Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                actionrequestoremailfield: {
                    title: 'Action Requestor Email Field',
                    type: '',
                    filter: true,
                },
                actionassigneduseremailfield: {
                    title: 'Action Assigned User Email Field',
                    type: '',
                    filter: true,
                },
                actionstatus: {
                    title: 'Action Status',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bomenuactions_LoadTable(bomenuactions = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomenuactions_ID) >= 0) {
            if (this.tbl_bomenuactions != undefined) this.tbl_bomenuactions.source = new LocalDataSource();
            if (this.tbl_bomenuactions != undefined) this.tbl_bomenuactions.source.load(bomenuactions as any as LocalDataSource);
            if (this.tbl_bomenuactions != undefined) this.tbl_bomenuactions.source.setPaging(1, 20, true);
        }
    }

    bomenuactions_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bomenuaction(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bomenuaction(event, event.data.actionid, this.formid);
                break;
            case 'delete':
                this.onDelete_bomenuaction(event, event.data.actionid, ((this.tbl_bomenuactions.source.getPaging().page - 1) * this.tbl_bomenuactions.source.getPaging().perPage) + event.index);
                this.tbl_bomenuactions.source.refresh();
                break;
        }
    }
    bomenuactions_onDelete(obj) {
        let actionid = obj.data.actionid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bomenumaster_service.delete_bomenumaster(actionid).then(res =>
                this.bomenuactions_LoadTable()
            );
        }
    }
    async onCustom_bomenuactions_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bomenuactions");
        let formname = (objbomenuaction as any).actionname;
    }
    bomenuactions_Paging(val) {
        this.tbl_bomenuactions.source.setPaging(1, val, true);
    }

    handle_bomenuactions_GridSelected(event: any) {
        this.bomenuactions_selectedindex = this.tbl_bomenuactions.source.findIndex(i => i.actionid === event.data.actionid);
    }
    Is_bomenuactions_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomenuactions_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bomenuactions

}



