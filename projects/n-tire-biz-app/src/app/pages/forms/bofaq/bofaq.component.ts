import { bofaqService } from './../../../service/bofaq.service';
import { bofaq } from './../../../model/bofaq.model';
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

@Component({
    selector: 'app-bofaq',
    templateUrl: './bofaq.component.html',
    styles: [],
    providers: [KeyboardShortcutsService,SharedService]
})



export class bofaqComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: bofaq;
    list: bofaq[];
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

    bfilterPopulate_bofaqs: boolean = false;
    bofaq_menuactions: any = []

    bofaq_Form: FormGroup;

    sourcefield_List: DropDownValues[];
    sourcefield_Suggestions: any[];
    sourcefield_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    categoryid_List: DropDownValues[];
    categoryid_Suggestions: any[];
    categoryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    subcategoryid_List: DropDownValues[];
    subcategoryid_Suggestions: any[];
    subcategoryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
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
        private bofaq_service: bofaqService,
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
            this.bofaq_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                faqid: [null],
                sourcefield: [null, Validators.compose([Validators.maxLength(10)])],
                sourcefielddesc: [null],
                sourcereference: [null],
                categoryid: [null, Validators.compose([Validators.required,])],
                categoryiddesc: [null],
                subcategoryid: [null],
                subcategoryiddesc: [null],
                question: [null, Validators.compose([Validators.required,])],
                answer: [null, Validators.compose([Validators.required,])],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }

    get f() { return this.bofaq_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.bofaq_Form.dirty && this.bofaq_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.faqid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.faqid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.faqid && pkDetail) {
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
            let bofaqid = null;

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
            this.formData = new bofaq();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = bofaqid;
            //alert(bofaqid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys
            }
            this.bofaq_service.getDefaultData().then(res => {
                this.sourcefield_List = res.list_sourcefield.value;
                if (this.formData?.sourcefield != undefined && this.formData?.sourcefield != null) {
                    this.bofaq_Form.patchValue({
                        sourcefield: this.formData.sourcefield
                    });
                }
                this.categoryid_List = res.list_categoryid.value;
                this.categoryid_Suggestions = this.categoryid_List;
                if (this.formData?.categoryid != undefined && this.formData?.categoryid != null) {
                    this.bofaq_Form.patchValue({
                        categoryid: this.sharedService.getValue("value", this.categoryid_List, this.formData.categoryid?.toString(), 'categoryid')
                    });
                }
                if (this.formData?.categoryid && this.formData?.categoryid?.toString() != "" && this.formData?.categoryid != null) {
                    this.bofaq_service.getList_subcategoryid(this.formData?.categoryid).then(res => {
                        this.subcategoryid_List = res as DropDownValues[];
                        this.bofaq_Form.patchValue({
                            subcategoryid: this.sharedService.getValue("value", this.subcategoryid_List, this.formData.subcategoryid?.toString(), 'subcategoryid')
                        });
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.bofaq_service.get_bofaqs_List().then(res => {
                this.pkList = res as bofaq[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'bofaqsList ' + err);
            });
            //setting the flag that the screen is not touched
            this.blockedDocument = false;
            this.bofaq_Form.markAsUntouched();
            this.bofaq_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            // this.sharedService.error(e);
        }
    }
    onEntered_sourcefield(value: any) {
        this.sourcefield_Suggestions = this.sourcefield_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_sourcefield(sourcefieldDetail: any) {
        if (sourcefieldDetail.value && sourcefieldDetail) {

        }
    }

    onEntered_categoryid(value: any) {
        this.categoryid_Suggestions = this.categoryid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_categoryid(categoryidDetail: any) {
        if (categoryidDetail.value && categoryidDetail) {
            this.bofaq_service.getList_subcategoryid(categoryidDetail.value).then(res => {
                this.subcategoryid_List = res as DropDownValues[]
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocompleteselection  subcategoryid ' + err);
            });

        }
    }

    onEntered_subcategoryid(value: any) {
        this.subcategoryid_Suggestions = this.subcategoryid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_subcategoryid(subcategoryidDetail: any) {
        if (subcategoryidDetail.value && subcategoryidDetail) {

        }
    }




    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.bofaq_Form != null)
            this.bofaq_Form.reset();
        this.bofaq_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.bofaq_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }

    async onDelete(): Promise<any> {
        let faqid = this.bofaq_Form.get('faqid').value;
        if (faqid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.bofaq_service.delete_bofaq(faqid);
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
        this.bofaq_Form.patchValue({
            faqid: null
        });
        if (this.formData.faqid != null) this.formData.faqid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.bofaq_Form.patchValue({
            faqid: null
        });
        if (this.formData.faqid != null) this.formData.faqid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'faqid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.bofaq_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bofaq_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bofaq_Form.controls[key] != undefined) {
                                this.bofaq_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    sourcefield_onChange(evt: any) {
        let e = this.f.sourcefield.value as any;
    }
    categoryid_onChange(evt: any) {
        let e = this.f.categoryid.value as any;
    }
    subcategoryid_onChange(evt: any) {
        let e = this.f.subcategoryid.value as any;
    }

    edit_bofaqs() {
        this.showview = false;
        setTimeout(() => {
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
            this.bofaq_service.get_bofaqs_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.bofaq;
                let formproperty = res.bofaq.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.bofaq.pkcol;
                this.formid = res.bofaq.faqid;
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
            this.formData = res.bofaq;
            this.formid = res.bofaq.faqid;
            this.pkcol = res.bofaq.pkcol;
            this.bmyrecord = false;
            if ((res.bofaq as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.bofaq_Form.patchValue({
                pkcol: res.bofaq.pkcol,
                faqid: res.bofaq.faqid,
                sourcefield: this.sharedService.getValue("value", this.sourcefield_List, res.bofaq.sourcefield, 'sourcefield'),
                sourcefielddesc: res.bofaq.sourcefielddesc,
                sourcereference: res.bofaq.sourcereference,
                categoryid: this.sharedService.getValue("value", this.categoryid_List, res.bofaq.categoryid, 'categoryid'),
                categoryiddesc: res.bofaq.categoryiddesc,
                subcategoryid: this.sharedService.getValue("value", this.subcategoryid_List, res.bofaq.subcategoryid, 'subcategoryid'),
                subcategoryiddesc: res.bofaq.subcategoryiddesc,
                question: res.bofaq.question,
                answer: res.bofaq.answer,
                status: res.bofaq.status,
                statusdesc: res.bofaq.statusdesc,
            });
            this.bofaq_menuactions = res.bofaq_menuactions;
            setTimeout(() => {
                if (this.formData?.categoryid && this.formData?.categoryid?.toString() != "" && this.formData?.categoryid != null) {
                    this.onSelected_categoryid(this.f.categoryid?.value);
                }
            });
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

        for (let key in this.bofaq_Form.controls) {
            let val = this.bofaq_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bofaq_Form.controls[key] != null) {
                if (false) {
                    // if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + this.sharedService.JSON_parse(this.formData[key])[0]["name"]);
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
        formData = this.bofaq_Form.getRawValue();
        formData.sourcefield = (this.bofaq_Form.get('sourcefield'))?.value?.value;
        formData.categoryid = (this.bofaq_Form.get('categoryid'))?.value?.value;
        formData.subcategoryid = (this.bofaq_Form.get('subcategoryid'))?.value?.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.bofaq_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.faqid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.bofaq_Form.valid) {
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
            Object.keys(this.bofaq_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.bofaq_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        // strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.bofaq_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.bofaq_service.save_bofaqs(this.formData);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).bofaq);
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
                    this.objvalues.push((res as any).bofaq);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.bofaq_Form.markAsUntouched();
            this.bofaq_Form.markAsPristine();
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



