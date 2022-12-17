import { cmsarticleService } from './../../../service/cmsarticle.service';
import { cmsarticle } from './../../../model/cmsarticle.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { bousermaster } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import {
    Compiler,  Injector, VERSION,  NgModule, NgModuleRef,
    ViewContainerRef,AfterViewInit
  } from '@angular/core';

@Component({
    selector: 'app-cmsarticle',
    template: `
    <ng-container #vc></ng-container>
    `,
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class cmsarticleComponent implements OnInit {
    @ViewChild('vc', {static:false,read: ViewContainerRef}) vc;
    formdata: any;
    shortcuts: ShortcutInput[] = [];
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulatecmsarticles: boolean = false;
    datacmsarticlestype3: any = [];
    datacmsarticlesicon3: any = [];
    datacmsarticlesauthor3: any = [];
    datacmsarticleslanguage3: any = [];
    cmsarticleForm: FormGroup;
    typeList: boconfigvalue[]=[];
    iconList: boconfigvalue[]=[];
    authorList: bousermaster[];
    authoroptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    author_bousermastersForm: FormGroup;
    author_bousermastersoptions: any;
    author_bousermastersformatter: any;
    languageList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    // toggle webcam on/off
    public showWebcam = false;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];
    // latest snapshot
    public webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

    SESSIONUSERID: any;
    sessiondata: any;
    customfieldvisible: boolean = true;
    attachmentvisible: boolean = true;

    
ngAfterViewInit() {
    this.ChangeTemplate('cmsarticle');
}
ChangeTemplate(strTemplate)
{
    debugger;
    if(strTemplate=="")strTemplate="cmsarticle";
    let strTemplateUrl = './'+strTemplate.toLowerCase()+'.component.html';

    

    const tmpCmp = Component({
        moduleId: module.id, templateUrl: strTemplateUrl})(class {
    });

    const tmpModule = NgModule({declarations: [tmpCmp],entryComponents:[tmpCmp]})(class {
    });

    let f1=this._compiler.compileModuleAndAllComponentsSync(tmpModule);

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._m);
        cmpRef.instance.name = 'dynamic';
        this.vc.insert(cmpRef.hostView);
      })
  }
  


    constructor(
        private _compiler: Compiler,
        private _injector: Injector,
        private _m: NgModuleRef<any>,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private cmsarticleservice: cmsarticleService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bousermasterservice: bousermasterService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
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
        this.cmsarticleForm = this.fb.group({
            ImageName: [null],
            articleid: [null],
            code: [null],
            title: [null],
            type: [null],
            typedesc: [null],
            keywords: [null],
            icon: [null],
            icondesc: [null],
            summary: [null],
            details: [null],
            markpublic: [null],
            author: [null],
            authordesc: [null],
            publisheddate: [null],
            expirationdate: [null],
            language: [null],
            languagedesc: [null],
            rating: [null],
            notes: [null],
            comments: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.cmsarticleForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ToolBar(prop:any) {
        this.toolbarvisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.cmsarticleForm.dirty && this.cmsarticleForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != null) {
            this.SESSIONUSERID = this.sessiondata.userid;
        }

        debugger;
        let cmsarticleid = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.articleid != null) {
            cmsarticleid = this.data.articleid;
        }
        else {
            cmsarticleid = this.currentRoute.snapshot.paramMap.get('id');
            this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
        }
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {

                    let jsonstring = "";
                    if (typeof (this.data[key]) == "string")
                        jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
                    else
                        jsonstring = '{"' + key + '": ' + this.data[key] + ' }';
                    let json = JSON.parse(jsonstring);
                    if (this.cmsarticleForm.controls[key] != null) {
                        this.cmsarticleForm.patchValue(json);
                        this.cmsarticleForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = cmsarticleid;
        //this.sharedService.alert(cmsarticleid);
        if (cmsarticleid == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            await this.PopulateScreen(cmsarticleid);
        }
        this.configservice.getList("articletype").then((res:any) => this.typeList = res as boconfigvalue[]);
        this.configservice.getList("icon").then((res:any) => this.iconList = res as boconfigvalue[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => {
            this.authorList = res as bousermaster[];
            if (this.formdata && this.formdata.cmsarticle && this.formdata.cmsarticle.author) {
                this.authoroptionsEvent.emit(this.authorList);
                this.cmsarticleForm.patchValue({
                    author: this.formdata.cmsarticle.author,
                    authordesc: this.formdata.cmsarticle.authordesc,
                });
            }
        }
        );
        this.author_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.authorList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.author_bousermastersformatter = (result: any) => result.username;
        this.configservice.getList("language").then((res:any) => this.languageList = res as boconfigvalue[]);
        this.cmsarticleForm.markAsUntouched();
        this.cmsarticleForm.markAsPristine();
    }
    onSelectedauthor(authorDetail: any) {
        if (authorDetail.author && authorDetail) {

        }
    }




    resetForm() {
        if (this.cmsarticleForm != null)
            this.cmsarticleForm.reset();
        this.cmsarticleForm.patchValue({
            author: this.sessiondata.userid,
            authordesc: this.sessiondata.username,
        });
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {

                    let jsonstring = "";
                    if (typeof (this.data[key]) == "string")
                        jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
                    else
                        jsonstring = '{"' + key + '": ' + this.data[key] + ' }';
                    let json = JSON.parse(jsonstring);
                    if (this.cmsarticleForm.controls[key] != null) {
                        this.cmsarticleForm.patchValue(json);
                        this.cmsarticleForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
    }

    onDelete() {
        let articleid = this.cmsarticleForm.get('articleid').value;
        if (articleid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.cmsarticleservice.deletecmsarticle(articleid).then((res:any) => {
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
        this.cmsarticleForm.patchValue({
            articleid: null
        });
        if (this.cmsarticleservice.formData.articleid != null) this.cmsarticleservice.formData.articleid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("cmsarticles", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
            this.customfieldservicelist = res;
            return res;
        });


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
    typeonChange(evt:any) {
        let e = evt.value;
        this.cmsarticleForm.patchValue({ typedesc: evt.options[evt.options.selectedIndex].text });
    }
    icononChange(evt:any) {
        let e = evt.value;
        this.cmsarticleForm.patchValue({ icondesc: evt.options[evt.options.selectedIndex].text });
    }
    authoronChange(evt:any) {
        let e = evt.value;
    }
    languageonChange(evt:any) {
        let e = evt.value;
        this.cmsarticleForm.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    public triggerSnapshot(): void {
        debugger;
        this.trigger.next();
    }

    public toggleWebcam(): void {
        debugger;
        this.showWebcam = !this.showWebcam;
    }

    public handleInitError(error: WebcamInitError): void {
        debugger;
        this.errors.push(error);
    }

    public showNextWebcam(directionOrDeviceId: boolean | string): void {
        debugger;
        // true => move forward through devices
        // false => move backwards through devices
        // string => move to device with given deviceId
        this.nextWebcam.next(directionOrDeviceId);
    }

    public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.webcamImage = webcamImage;
    }

    public cameraWasSwitched(deviceId: string): void {
        console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
    }

    public get triggerObservable(): Observable<void> {
        debugger;
        return this.trigger.asObservable();
    }

    public get nextWebcamObservable(): Observable<boolean | string> {
        debugger;
        return this.nextWebcam.asObservable();
    }
    async OCR() {

        const worker = createWorker({
            //logger: m => console.log(m),
        });
        await worker.load();
        await worker.loadLanguage('eng+ara');
        await worker.initialize('eng+ara');
        const rectangles = [];
        let rectangle: any;
        rectangle = { left: 294, top: 616, width: 335 - 294, height: 635 - 616 };
        rectangles.push(rectangle);
        rectangle = { left: 440, top: 618, width: 499 - 440, height: 635 - 618 };
        rectangles.push(rectangle);
        rectangle = { left: 568, top: 616, width: 739 - 568, height: 647 - 616 };
        rectangles.push(rectangle);
        rectangle = { left: 278, top: 655, width: 337 - 278, height: 674 - 655 };
        rectangles.push(rectangle);
        rectangle = { left: 276, top: 702, width: 740 - 276, height: 721 - 702 };
        rectangles.push(rectangle);
        rectangle = { left: 280, top: 744, width: 429 - 280, height: 769 - 744 };
        rectangles.push(rectangle);
        /*
          const values = [];
          for (let i = 0; i < rectangles.length; i++) {
            const { data: { text } } = await worker.recognize("/assets/"+this.cmsarticleForm.get('ImageName').value, { rectangle: rectangles[i] });
            values.push(text);
          }
          console.log(values);
        */
        //, { rectangle }
        debugger;
        const { data: { text } } = await worker.recognize("/assets/" + this.cmsarticleForm.get('ImageName').value);
        this.sharedService.alert(text);
        console.log(text);

        const { data } = await worker.detect("/assets/" + this.cmsarticleForm.get('ImageName').value);
        console.log(data);
        await worker.terminate();
        if (this.customfieldservice.list != null) {
            for (let i = 0; i < this.customfieldservice.list.length; i++) {
                let value = this.customfieldservice.list[i];
                if (value.controltype == 'ocr' && (value.configurations != undefined && value.configurations != null)) {
                    var obj = (document.all[value.name]) as any;
                    var re = new RegExp(value.configurations, "gm");
                    let match = re.exec(text);
                    console.log(match);
                    if (match != null && match[0] != null) obj.value = match[0];//result.text.replace(re,"$1");
                }
            }
        }

    }


    pushtoUpload() {
        var imageBlob = this.sharedService.dataURItoBlob(this.webcamImage.imageAsDataUrl);
        const imageFile = new File([imageBlob], this.cmsarticleForm.get('ImageName').value + ".jpeg", { type: 'image/jpeg' });
        var files: any[] = [];
        files.push(imageFile);
        let e = { files: files };
        this.attachmentuploader(e:any);


    }
    async PopulateScreen(cmsarticleid: any) {
        this.cmsarticleservice.getcmsarticlesByID(parseInt(cmsarticleid)).then((res:any) => {

            this.formdata = res;
            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.cmsarticleForm.patchValue({
            articleid: res.cmsarticle.articleid,
            code: res.cmsarticle.code,
            title: res.cmsarticle.title,
            type: res.cmsarticle.type,
            typedesc: res.cmsarticle.typedesc,
            keywords: res.cmsarticle.keywords,
            icon: res.cmsarticle.icon,
            icondesc: res.cmsarticle.icondesc,
            summary: res.cmsarticle.summary,
            details: res.cmsarticle.details,
            markpublic: res.cmsarticle.markpublic,
            author: res.cmsarticle.author,
            authordesc: res.cmsarticle.authordesc,
            publisheddate: this.ngbDateParserFormatter.parse(res.cmsarticle.publisheddate),
            expirationdate: this.ngbDateParserFormatter.parse(res.cmsarticle.expirationdate),
            language: res.cmsarticle.language,
            languagedesc: res.cmsarticle.languagedesc,
            rating: res.cmsarticle.rating,
            notes: res.cmsarticle.notes,
            comments: res.cmsarticle.comments,
            customfield: res.cmsarticle.customfield,
            attachment: res.cmsarticle.attachment,
            status: res.cmsarticle.status,
            statusdesc: res.cmsarticle.statusdesc,
        });
        if (this.cmsarticleForm.get('customfield').value != null && this.cmsarticleForm.get('customfield').value != "") this.customfieldjson = JSON.parse(this.cmsarticleForm.get('customfield').value);
        this.FillCustomField();
        if (this.cmsarticleForm.get('attachment').value != null && this.cmsarticleForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.cmsarticleForm.get('attachment').value);
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.cmsarticleForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.cmsarticleservice.formData = this.cmsarticleForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.cmsarticleForm.controls[key] != null) {
                        this.cmsarticleservice.formData[key] = this.cmsarticleForm.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.cmsarticleservice.formData.publisheddate = new Date(this.ngbDateParserFormatter.format(this.cmsarticleForm.get('publisheddate').value) + '  UTC');
        this.cmsarticleservice.formData.expirationdate = new Date(this.ngbDateParserFormatter.format(this.cmsarticleForm.get('expirationdate').value) + '  UTC');
        this.cmsarticleservice.formData.customfield = JSON.stringify(customfields);
        this.cmsarticleservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.cmsarticleservice.formData);
        this.cmsarticleservice.saveOrUpdatecmsarticles().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.cmsarticleservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.cmsarticle);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.cmsarticleForm.markAsUntouched();
                this.cmsarticleForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditauthor(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.authorList = res as bousermaster[]);
        });*/
    }

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



