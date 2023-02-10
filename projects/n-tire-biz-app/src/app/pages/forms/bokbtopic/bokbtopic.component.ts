import { bokbtopicService } from './../../../service/bokbtopic.service';
import { bokbtopic } from './../../../model/bokbtopic.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ReportViewerCtrlComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/reportviewerctrl.component';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';

//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog'

//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
import { ThemeService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';

@Component({
    selector: 'app-bokbtopic',
    templateUrl: './bokbtopic.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class bokbtopicComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: bokbtopic;
    list: bokbtopic[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    keylist: any = [];
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
    @ViewChild('panelscroller') private panelscroller: ElementRef;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_bokbtopics: boolean = false;
    bokbtopic_menuactions: any = []

    bokbtopic_Form: FormGroup;

    kbid_List: DropDownValues[];
    kbid_Suggestions: any[];
    kbid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    contenttype_List: DropDownValues[];
    contenttype_Suggestions: any[];
    contenttype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    @ViewChild('contenturl', { static: false }) contenturl: AttachmentComponent;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;






    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bokbtopic_service: bokbtopicService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute) {
        try {
            this.sessionData = this.sessionService.getSession();
            if (this.sessionData != null) {
                this.translate.use(this.sessionData.language);
            }
            this.data = dynamicconfig;
            this.p_menuid = sharedService.menuid;
            this.p_currenturl = sharedService.currenturl;
            this.keyboard.add([
                {
                    key: 'cmd l',
                    command: () => this.router.navigate(["/home/" + this.p_currenturl]),
                    preventDefault: true
                },
                {
                    key: 'cmd s',
                    command: () => this.onSubmitData(false),
                    preventDefault: true
                },
                {
                    key: 'cmd f',
                    command: () => this.resetForm(),
                    preventDefault: true
                }
            ]);
            this.bokbtopic_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                kbtopicid: [null],
                kbid: [null, Validators.compose([Validators.required,])],
                kbiddesc: [null],
                description: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                sequence: [null],
                contenttype: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
                contenttypedesc: [null],
                contenttext: [null, Validators.compose([Validators.required,])],
                contenturl: [null, Validators.compose([Validators.pattern(/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/), Validators.maxLength(160)])],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }

    get f() { return this.bokbtopic_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.bokbtopic_Form.dirty && this.bokbtopic_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.kbtopicid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.kbtopicid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.kbtopicid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        try {
            if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
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

            //debugger;
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
            let bokbtopicid = null;

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
            this.formData = new bokbtopic();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = bokbtopicid;
            //alert(bokbtopicid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bokbtopic_service.getDefaultData().then(res => {
                this.kbid_List = res.list_kbid.value;
                this.kbid_Suggestions = this.kbid_List;
                if (this.formData?.kbid != undefined && this.formData?.kbid != null) {
                    this.bokbtopic_Form.patchValue({
                        kbid: this.sharedService.getValue("value", this.kbid_List, this.formData.kbid?.toString(), 'kbid')
                    });
                }
                this.contenttype_List = res.list_contenttype.value;
                if (this.formData?.contenttype != undefined && this.formData?.contenttype != null) {
                    this.bokbtopic_Form.patchValue({
                        contenttype: this.formData.contenttype
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.bokbtopic_service.get_bokbtopics_List().then(res => {
                this.pkList = res as bokbtopic[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'bokbtopicsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.bokbtopic_Form.markAsUntouched();
            this.bokbtopic_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }
    onEntered_kbid(value: any) {
        this.kbid_Suggestions = this.kbid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_kbid(kbidDetail: any) {
        if (kbidDetail.value && kbidDetail) {

        }
    }

    onEntered_contenttype(value: any) {
        this.contenttype_Suggestions = this.contenttype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_contenttype(contenttypeDetail: any) {
        if (contenttypeDetail.value && contenttypeDetail) {

        }
    }




    getcontenturl() {
        //debugger;
        if (this.contenturl?.getAttachmentList()?.length > 0) {
            let file = this.contenturl.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.bokbtopic_Form != null)
            this.bokbtopic_Form.reset();
        this.bokbtopic_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let kbtopicid = this.bokbtopic_Form.get('kbtopicid').value;
        if (kbtopicid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.bokbtopic_service.delete_bokbtopic(kbtopicid);
                this.toastr.addSingle("success", "", "Successfully Deleted");
                this.resetForm();
                return new Promise(resolve => {
                    resolve(true);
                });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.formid = null;
        this.bokbtopic_Form.patchValue({
            kbtopicid: null
        });
        if (this.formData.kbtopicid != null) this.formData.kbtopicid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.bokbtopic_Form.patchValue({
            kbtopicid: null
        });
        if (this.formData.kbtopicid != null) this.formData.kbtopicid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'kbtopicid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.bokbtopic_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bokbtopic_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bokbtopic_Form.controls[key] != undefined) {
                                this.bokbtopic_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                                this.keylist.push(key);
                                this.formData[key] = this.f[key]?.value;
                            }
                        }
                    }
                }
            }
        }
    }
    onClose() {
        this.dialogRef.close(null);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.description != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.description != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    kbid_onChange(evt: any) {
        let e = this.f.kbid.value as any;
    }
    contenttype_onChange(evt: any) {
        let e = this.f.contenttype.value as any;
    }

    edit_bokbtopics() {
        this.showview = false;
        setTimeout(() => {
            if (this.contenturl != null && this.contenturl != undefined) this.contenturl.setattachmentlist(this.bokbtopic_Form.get('contenturl').value);
        });
        return false;
    }



    InitializeGrid() {
        try {
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.bokbtopic_service.get_bokbtopics_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.bokbtopic;
                let formproperty = res.bokbtopic.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.bokbtopic.pkcol;
                this.formid = res.bokbtopic.kbtopicid;
                setTimeout(() => {
                    this.InitializeGrid();
                    this.FillData(res)
                }, 500);
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'filldata ' + err);
            });
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }

    FillData(res: any) {
        try {
            this.formData = res.bokbtopic;
            this.formid = res.bokbtopic.kbtopicid;
            this.pkcol = res.bokbtopic.pkcol;
            this.bmyrecord = false;
            if ((res.bokbtopic as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.bokbtopic_Form.patchValue({
                pkcol: res.bokbtopic.pkcol,
                kbtopicid: res.bokbtopic.kbtopicid,
                kbid: this.sharedService.getValue("value", this.kbid_List, res.bokbtopic.kbid, 'kbid'),
                kbiddesc: res.bokbtopic.kbiddesc,
                description: res.bokbtopic.description,
                sequence: res.bokbtopic.sequence,
                contenttype: this.sharedService.getValue("value", this.contenttype_List, res.bokbtopic.contenttype, 'contenttype'),
                contenttypedesc: res.bokbtopic.contenttypedesc,
                contenttext: res.bokbtopic.contenttext,
                contenturl: res.bokbtopic.contenturl,
                status: res.bokbtopic.status,
                statusdesc: res.bokbtopic.statusdesc,
            });
            this.bokbtopic_menuactions = res.bokbtopic_menuactions;
            if (this.bokbtopic_Form.get('contenturl').value != null && this.bokbtopic_Form.get('contenturl').value != "" && this.contenturl != null && this.contenturl != undefined) this.contenturl.setattachmentlist(this.bokbtopic_Form.get('contenturl').value);
            //Child Tables if any
            setTimeout(() => {
            });
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;

        for (let key in this.bokbtopic_Form.controls) {
            let val = this.bokbtopic_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bokbtopic_Form.controls[key] != null) {
                if (key == "contenturl") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + this.formData[key])[0]["name"];
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
        return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
    }


    SetFormValues() {
    }

    GetFormValues() {
        let formData: any;
        formData = this.bokbtopic_Form.getRawValue();
        formData.kbid = (this.bokbtopic_Form.get('kbid'))?.value?.value;
        formData.contenttype = (this.bokbtopic_Form.get('contenttype'))?.value?.value;
        if (this.contenturl.getAttachmentList() != null) formData.contenturl = JSON.stringify(this.contenturl.getAttachmentList());
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.bokbtopic_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.kbtopicid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.bokbtopic_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.GetFormValues();
        console.log(obj);
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
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



    async onSubmitData(bclear: any): Promise<any> {
        try {
            //debugger;
            this.SetFormValues();
            this.isSubmitted = true;
            let strError = "";
            Object.keys(this.bokbtopic_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.bokbtopic_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        // strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.bokbtopic_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.bokbtopic_service.save_bokbtopics(this.formData, this.contenturl.getAllFiles());
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).bokbtopic);
            if (!bclear && (this.formid != null && this.formid != "")) this.showview = true;
            if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
            if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                this.dialogRef.close(this.objvalues);
                return;
            }
            else {
                if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
            }
            this.clearList();
            if (bclear) {
                this.resetForm();
            }
            else {
                if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.objvalues.push((res as any).bokbtopic);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.bokbtopic_Form.markAsUntouched();
            this.bokbtopic_Form.markAsPristine();
            return new Promise(resolve => {
                resolve(res);
            });
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }


    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



