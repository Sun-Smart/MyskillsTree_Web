import { bodynamicformService } from './../../../service/bodynamicform.service';
import { bodynamicform } from './../../../model/bodynamicform.model';
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
import { bodynamicformdetailComponent } from './../../../pages/forms/bodynamicformdetail/bodynamicformdetail.component';
import { bodynamicformdetailService } from './../../../service/bodynamicformdetail.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';

@Component({
    selector: 'app-bodynamicform',
    templateUrl: './bodynamicform.component.html',
    styles: []
})
export class bodynamicformComponent implements OnInit {
    formData: bodynamicform;
    list: bodynamicform[];
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
    bfilterPopulate_bodynamicforms: boolean = false;
    bfilterPopulate_bodynamicformdetails: boolean = false;
    bodynamicform_menuactions: any = []
    bodynamicformdetail_menuactions: any = []
    @ViewChild('tbl_bodynamicformdetails', { static: false }) tbl_bodynamicformdetails: Ng2SmartTableComponent;
    bodynamicform_Form: FormGroup;
    tableid_List: DropDownValues[];
    tableid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    formtype_List: DropDownValues[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    bodynamicformdetails_visiblelist: any;
    bodynamicformdetails_hidelist: any;
    Deleted_bodynamicformdetail_IDs: string = "";
    bodynamicformdetails_ID: string = "1";
    bodynamicformdetails_selectedindex: any;
    constructor(private router: Router,
        private themeService: ThemeService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bodynamicform_service: bodynamicformService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.bodynamicform_Form = this.fb.group({
            pk: [null],
            tableid: [null],
            tableiddesc: [null],
            conditionfield: [null],
            conditionvalue: [null],
            formid: [null],
            formname: [null],
            formtype: [null],
            formtypedesc: [null],
            formhtml: [null],
            cols: [null],
            templatehtml: [null],
            hasattachments: [null],
            sequence: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bodynamicform_Form.controls; }
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (this.bodynamicform_Form.dirty && this.bodynamicform_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    onSelectedpk(pkDetail: any) {
        if (pkDetail.formid && pkDetail) {
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
        let bodynamicformid = null;

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
        this.formid = bodynamicformid;
        if (this.pkcol == null) {
            this.Set_bodynamicformdetails_TableConfig();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        }
        this.bodynamicform_service.getDefaultData().then(res => {
            this.tableid_List = res.list_tableid.value;
            this.formtype_List = res.list_formtype.value;
        }).catch((err) => { this.spinner.hide();});

        this.bodynamicform_service.get_bodynamicforms_List().then(res => {
            this.pkList = res as bodynamicform[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); });
        this.bodynamicform_Form.markAsUntouched();
        this.bodynamicform_Form.markAsPristine();
    }
    onSelected_tableid(tableidDetail: any) {
        if (tableidDetail.value && tableidDetail) {
            this.bodynamicform_Form.patchValue({
                tableid: tableidDetail.value,
                tableiddesc: tableidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bodynamicform_Form != null)
            this.bodynamicform_Form.reset();
        this.bodynamicform_Form.patchValue({
        });
        setTimeout(() => {
            this.bodynamicformdetails_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let formid = this.bodynamicform_Form.get('formid').value;
        if (formid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bodynamicform_service.delete_bodynamicform(formid).then(res => {
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
        this.bodynamicform_Form.patchValue({
            formid: null
        });
        if (this.formData.formid != null) this.formData.formid = null;
        for (let i = 0; i < this.tbl_bodynamicformdetails.source.length; i++) {
            this.tbl_bodynamicformdetails.source[i].formdetailid = null;
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
                        this.bodynamicform_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodynamicform_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodynamicform_Form.controls[key] != undefined) {
                                this.bodynamicform_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.formname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.formname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    tableid_onChange(evt: any) {
        let e = evt.value;
    }
    formtype_onChange(evt: any) {
        let e = this.f.formtype.value as any;
        this.bodynamicform_Form.patchValue({ formtypedesc: evt.options[evt.options.selectedIndex].text });
    }

    edit_bodynamicforms() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.bodynamicform_service.get_bodynamicforms_ByEID(pkcol).then(res => {
            this.spinner.hide();
            this.formData = res.bodynamicform;
            let formproperty = res.bodynamicform.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.bodynamicform.pkcol;
            this.formid = res.bodynamicform.formid;
            this.FillData(res);
        }).catch((err) => { });
    }

    FillData(res: any) {
        this.formData = res.bodynamicform;
        this.formid = res.bodynamicform.formid;
        this.pkcol = res.bodynamicform.pkcol;
        this.bmyrecord = false;
        if ((res.bodynamicform as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        this.bodynamicform_Form.patchValue({
            tableid: res.bodynamicform.tableid,
            tableiddesc: res.bodynamicform.tableiddesc,
            conditionfield: res.bodynamicform.conditionfield,
            conditionvalue: res.bodynamicform.conditionvalue,
            formid: res.bodynamicform.formid,
            formname: res.bodynamicform.formname,
            formtype: res.bodynamicform.formtype,
            formtypedesc: res.bodynamicform.formtypedesc,
            formhtml: res.bodynamicform.formhtml,
            cols: res.bodynamicform.cols,
            templatehtml: res.bodynamicform.templatehtml,
            hasattachments: res.bodynamicform.hasattachments,
            sequence: res.bodynamicform.sequence,
            status: res.bodynamicform.status,
            statusdesc: res.bodynamicform.statusdesc,
        });
        this.bodynamicform_menuactions = res.bodynamicform_menuactions;
        this.bodynamicformdetail_menuactions = res.bodynamicformdetail_menuactions;
        this.bodynamicformdetails_visiblelist = res.bodynamicformdetails_visiblelist;
        this.Set_bodynamicformdetails_TableConfig();
        this.bodynamicformdetails_LoadTable(res.bodynamicformdetails);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.bodynamicform_Form.controls) {
            let val = this.bodynamicform_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bodynamicform_Form.controls[key] != null) {
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
        if (!this.bodynamicform_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.bodynamicform_Form.getRawValue();
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

        if (!this.bodynamicform_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.bodynamicform_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.bodynamicform_Form.controls[key] != null) {
                        this.formData[key] = this.bodynamicform_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.Deleted_bodynamicformdetail_IDs = this.Deleted_bodynamicformdetail_IDs;
        this.spinner.show();
        this.bodynamicform_service.saveOrUpdate_bodynamicforms(this.formData, this.tbl_bodynamicformdetails?.source?.data,).subscribe(
            async res => {
                if (this.tbl_bodynamicformdetails.source) {
                    for (let i = 0; i < this.tbl_bodynamicformdetails.source.data.length; i++) {
                        if (this.tbl_bodynamicformdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bodynamicformdetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).bodynamicform);
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
                        this.objvalues.push((res as any).bodynamicform);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bodynamicform_Form.markAsUntouched();
                this.bodynamicform_Form.markAsPristine();
            },
            err => {
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
            }
        )
    }
    clearList() {
        this.tbl_bodynamicformdetails.source = new LocalDataSource();
    }

    AddOrEdit_bodynamicformdetail(event: any, formdetailid: any, formid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(bodynamicformdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, formdetailid, formid, visiblelist: this.bodynamicformdetails_visiblelist, hidelist: this.bodynamicformdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bodynamicformdetails.source.add(res[i]);
                    }
                    this.tbl_bodynamicformdetails.source.refresh();
                }
                else {
                    this.tbl_bodynamicformdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bodynamicformdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bodynamicformdetail_IDs += childID + ",";
        this.tbl_bodynamicformdetails.source.splice(i, 1);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    bodynamicformdetails_settings: any;

    show_bodynamicformdetails_Checkbox() {
        if (this.tbl_bodynamicformdetails.source.settings['selectMode'] == 'multi') this.tbl_bodynamicformdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_bodynamicformdetails.source.settings['selectMode'] = 'multi';
        this.tbl_bodynamicformdetails.source.initGrid();
    }
    delete_bodynamicformdetails_All() {
        this.tbl_bodynamicformdetails.source.settings['selectMode'] = 'single';
    }
    show_bodynamicformdetails_Filter() {
        if (this.tbl_bodynamicformdetails.source.settings != null) this.tbl_bodynamicformdetails.source.settings['hideSubHeader'] = !this.tbl_bodynamicformdetails.source.settings['hideSubHeader'];
        this.tbl_bodynamicformdetails.source.initGrid();
    }
    async Set_bodynamicformdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_bodynamicformdetails) {
            var clone = this.sharedService.clone(this.tbl_bodynamicformdetails.source.settings);
            if (clone.columns['controltype'] != undefined) clone.columns['controltype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodynamicformdetails_controltype.value)), }, };
            if (clone.columns['controltype'] != undefined) clone.columns['controltype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodynamicformdetails_controltype.value)), }, };
            this.tbl_bodynamicformdetails.source.settings = clone;
            this.tbl_bodynamicformdetails.source.initGrid();
        }
        this.bfilterPopulate_bodynamicformdetails = true;
    }
    async bodynamicformdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_bodynamicformdetails_TableConfig() {
        this.bodynamicformdetails_settings = {
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
                custom: this.bodynamicformdetail_menuactions
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
                tableid: {
                    title: 'Table',
                    type: 'number',
                    filter: true,
                },
                tableiddesc: {
                    title: 'Table I D',
                    type: '',
                    filter: true,
                },
                fieldname: {
                    title: 'Fieldname',
                    type: '',
                    filter: true,
                },
                controltypedesc: {
                    title: 'Controltype',
                    type: 'html',
                    filter: true,
                },
                required: {
                    title: 'Required',
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
                fk: {
                    title: 'Fk',
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
                sequence: {
                    title: 'Sequence',
                    type: 'number',
                    filter: true,
                },
                configurations: {
                    title: 'Configurations',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    bodynamicformdetails_LoadTable(bodynamicformdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodynamicformdetails_ID) >= 0) {
            if (this.tbl_bodynamicformdetails != undefined) this.tbl_bodynamicformdetails.source = new LocalDataSource();
            if (this.tbl_bodynamicformdetails != undefined) this.tbl_bodynamicformdetails.source.load(bodynamicformdetails as any as LocalDataSource);
            if (this.tbl_bodynamicformdetails != undefined) this.tbl_bodynamicformdetails.source.setPaging(1, 20, true);
        }
    }

    bodynamicformdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_bodynamicformdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bodynamicformdetail(event, event.data.formdetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_bodynamicformdetail(event, event.data.formdetailid, ((this.tbl_bodynamicformdetails.source.getPaging().page - 1) * this.tbl_bodynamicformdetails.source.getPaging().perPage) + event.index);
                this.tbl_bodynamicformdetails.source.refresh();
                break;
        }
    }
    bodynamicformdetails_onDelete(obj) {
        let formdetailid = obj.data.formdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bodynamicform_service.delete_bodynamicform(formdetailid).then(res =>
                this.bodynamicformdetails_LoadTable()
            );
        }
    }
    async onCustom_bodynamicformdetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bodynamicformdetails");
        let formname = (objbomenuaction as any).actionname;
    }
    bodynamicformdetails_Paging(val) {
        this.tbl_bodynamicformdetails.source.setPaging(1, val, true);
    }

    handle_bodynamicformdetails_GridSelected(event: any) {
        this.bodynamicformdetails_selectedindex = this.tbl_bodynamicformdetails.source.findIndex(i => i.formdetailid === event.data.formdetailid);
    }

    async bodynamicformdetails_moveUp() {
        this.bodynamicformdetails_move(-1);
    }

    async bodynamicformdetails_move(val) {
        let index = ((this.tbl_bodynamicformdetails.source.getPaging().page - 1) * this.tbl_bodynamicformdetails.source.getPaging().perPage) + this.bodynamicformdetails_selectedindex;
        if (index >= 0) {

            var current = this.bodynamicformdetails[index];
            var tmp = this.bodynamicformdetails[index + val];
            this.bodynamicformdetails[index + val] = this.bodynamicformdetails[index];
            this.bodynamicformdetails[index] = tmp;
            this.bodynamicformdetails[index + val].sequence = index + val;
            this.bodynamicformdetails[index].sequence = index;
            this.tbl_bodynamicformdetails.source.refresh();
            this.bodynamicformdetails_selectedindex = this.bodynamicformdetails.findIndex(i => i.formdetailid === current.formdetailid);
            this.tbl_bodynamicformdetails.source.grid.getRows().forEach((row: any) => {
                if (current.formdetailid == row.data.formdetailid) {
                    this.tbl_bodynamicformdetails.source.grid.selectRow(row);

                }
            });
        }
    }

    bodynamicformdetails_moveDown() {
        return this.bodynamicformdetails_move(1);
    }
    Is_bodynamicformdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodynamicformdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
}



