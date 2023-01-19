import { Component, forwardRef, ViewChild, Input, HostListener, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FileUpload } from 'primeng/fileupload';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AppConstants } from '../../shared/helper';
import { SharedService } from '../../service/shared.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as JSZip from 'jszip';
import fileSaver from 'file-saver';
import { Guid } from "guid-typescript";
import { DialogService } from 'primeng/dynamicDialog';
import { openfileComponent } from '../openfile.component';
import { opencommentComponent } from '../opencomment.component';
import { SessionService } from '../../pages/core/services/session.service';

function readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        reader.addEventListener("error", function (event) {
            reject(event);
        }, false);

        reader.readAsDataURL(file);
    });
    return future;
}

// const URL = '/api/';
const URL = AppConstants.UploadURL;

@Component({
    selector: 'app-attachment',
    styles: [`
      .my-drop-zone { border: dotted 3px lightgray; }
    .nv-file-over { border: dotted 3px red; }
    .another-file-over-class { border: dotted 3px green; }

    html, body { height: 100%; }
  `],
    template: `
    <form  [formGroup]="attachmentForm">
    <div class="container">
    <div class="row">
    <div ng2FileDrop
         [ngClass]="{'another-file-over-class': hasAnotherDropZoneOver}"
         (fileOver)="fileOverAnother($event)"
         [uploader]="uploader"
          (onFileDrop)="onFileSelected($event)"
         class="well my-drop-zone">
    </div>

    <!--Multiple-->
    <ng-container *ngIf='isAttachment'>
    <div class="col-4">
    Category <label style="color: red;">*</label><br/><select (click)="show()" id="category" formControlName="category" class="form-control">
    <option  [ngValue]="null" [disabled]="true" selected>-Select-</option>
    <!-- <option value="W">Work</option>
    <option value="L">Work Links</option>
    <option value="A">Appreciations</option>
    <option value="S">Social Media</option>
    <option value="I">Images</option> -->
    <option value="W">Work Experience</option>
    <option value="L">Degree Certificates</option>
    <option value="A">Course Certification</option>
    <option value="S">Documents</option>
    <option value="I">Others</option>
    </select>
    <div *ngIf="attachmentForm.controls['category'].invalid && attachmentForm.controls['category'].touched" >
     <div *ngIf="attachmentForm.controls['category'].errors.required">
     <label style="color: red;"> Category is required.</label>
   </div>
 </div>
    </div>
    <div class="col-4">
    <div>
      Description <label style="color: red;">*</label>
    <br/> <input  id="description" (click)="show()" formControlName="description" class="form-control" placeholder="Enter attachment description">
    <div *ngIf="attachmentForm.controls['description'].invalid && attachmentForm.controls['description'].touched" >
    <div *ngIf="attachmentForm.controls['description'].errors.required">
    <label style="color: red;">Description is required.</label>
  </div>
</div>
    </div>
    </div>
    <div class="col-4">
    URL <br/><input  id="url" (click)="show()" formControlName="url" [(ngModel)]="url" style="margin-top: 7px;" class="form-control">
    </div>
    <!--<div>
    Select <br/><input type="file" style="margin-top: 8px;" #myImageInput formControlName="ImageName"  appImgCompressor  [uploader]="uploader" multiple  (onFileSelected)="onFileSelected($event)" class="" />
    </div>
    <div class="col">
    <a [routerLink]='' (click)="test(attachmentForm)" *ngIf="showplus==true"><i style="color:black !important; font-size: 20px; position: absolute;
    margin-top: 27px;" class="fa fa-plus"></i></a>
    </div>-->
    
    </ng-container>

    <div class="col-5" style="top:8px;">
    <label>Select</label> <br>
   
     <!-- <input type="file"  appImgCompressor  [uploader]="uploader" multiple  (onFileSelected)="onFileSelected($event)" class="" /> -->
     <input type="file" style="" #myImageInput formControlName="ImageName"  appImgCompressor  [uploader]="uploader" multiple  (onFileSelected)="onFileSelected($event)" class="" />
    
     <a [routerLink]='' (click)="test(attachmentForm)" *ngIf="showplus"><i style="color:black !important; font-size: 20px; position: absolute;
        margin: auto 5rem;
" class="fa fa-plus-circle"></i></a>
    
    </div>

    <!-- <div class="col-5">
 
    </div> -->
   
    

    <div class="col-2">
    <!-- <div  *ngIf="!isAttachment && src!=null && src!=undefined"><img [src]="src" style="width:200px;height:200px"></div> -->
    </div>
</div>

        <div class="row" style="margin-bottom: 40px" *ngIf="isAttachment">

            <table class="table" style="
            max-width: 100%;
            overflow-x: scroll;">
                <thead>
                <tr>
                <th>Category</th>
                <th>Description</th>
                <th>URL</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th *ngFor="let attachmentfield of attachmentfields">
                        {{attachmentfield.label}}
                    </th>
                    <th><i class='fa fa-thumbs-up'></i></th>
                    <th *ngIf='showremove' >&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                <tr  *ngFor="let uploadedfile of attachedfiles">
                <td>{{getCategoryDescription(uploadedfile.category)}}</td>
                <td>{{uploadedfile.desc}}</td>
                <td>   <a href="https://{{uploadedfile.certificationurl}}" target="_blank">{{uploadedfile.certificationurl}}</a></td>
                
                <td><a href="javascript:void(0);" (click)="geturl(uploadedfile,uploadedfile.filekey,uploadedfile.type)" >{{uploadedfile.name}}</a></td>
                <!--<td *ngFor="let attachmentfield of attachmentfields">
                    {{uploadedfile[attachmentfield.label + uploadedfile.Key]}}
                </td>-->
                <td>{{uploadedfile.size}} bytes</td>
                <th><i class='fa fa-thumbs-up backcolor' (click)='updateRatings(uploadedfile)'>&nbsp;{{uploadedfile.ratings}}</i>&nbsp;&nbsp;<i class='fa fa-eye backcolor'>&nbsp;{{uploadedfile.views}}</i>&nbsp;&nbsp;<i class='fa fa-comment backcolor'  (click)='opencomment(uploadedfile)'>&nbsp;{{getCount(uploadedfile.comments)}}</i></th>
                <td *ngIf='showremove' ><button type="button" class="btn btn-danger btn-xs"
                (click)="delete(uploadedfile.filekey)"> <span class="glyphicon glyphicon-trash"></span> Remove </button></td>

                </tr>

                </tbody>
            </table>

        </div>

    </div>

    </form>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AttachmentComponent),
        multi: true
    }]
})
export class AttachmentComponent implements ControlValueAccessor {

    showplus: boolean = false;

    showOpenfile: boolean = false;

    onChange: Function;


    onTouched: Function;

    @Input() SessionData: any;
    @Input() isAttachment: boolean = false;
    @Input() showremove: boolean = true;

    @ViewChild('fileUpload', { static: false }) fileUpload: FileUpload;

    attachmentForm: FormGroup;
    color: string = "#30e4c3";
    _value: any;
    src: any;
    private uploadedFiles: any[] = [];
    private attachedfiles: any[] = [];
    private AllFiles: any[] = [];
    readonly URL = AppConstants.UploadURL;
    readonly AttachmentURL = AppConstants.AttachmentURL;

    public attachmentfields: any[] = [];
    public attachmentfieldlist: any = { "fields": this.attachmentfields };
    bshowcolor: boolean = false;
    bshowcamera: boolean = false;
    @ViewChild('myImageInput') myInputVariable: ElementRef;
    // toggle webcam on/off
    private showWebcamImage = false;
    private showWebcam = false;
    private allowCameraSwitch = true;
    private multipleWebcamsAvailable = false;
    private deviceId: string;
    private videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };
    private errors: WebcamInitError[] = [];
    // latest snapshot
    private webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

    //uploader: FileUploader;
    public uploader: FileUploader = new FileUploader({
        url: URL,
        disableMultipart: true
    });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    fileObject: any;
    showview: any;
    setpage: any;


    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    public async onFileSelected(event: EventEmitter<File[]>) {

        localStorage.removeItem("attachedsaved")
        this.showplus = !this.showplus;
        this.showOpenfile = !this.showOpenfile;

        this.setpage = localStorage.getItem("choosefileforprofile")
        if (this.setpage == "ok") {
            debugger
            const file: File = event[0];
            debugger;
            this.onFileSelect(event);
            this.src = await readBase64(file)
                .then(function (data) {
                    return data;
                })
            this.showplus = false;
        }
        else {
            if (!this.attachmentForm.valid) {
                alert("Enter the required fields")
                this.attachmentForm.reset();
                this.myInputVariable.nativeElement.value = "";
            }
            else {
                const file: File = event[0];
                //debugger;
                this.onFileSelect(event);
                this.src = await readBase64(file)
                    .then(function (data) {
                        return data;
                    })
                this.attachmentForm.reset();
            }
            this.attachmentForm.reset();
        }
        // localStorage.removeItem("attachedsaved")
        // this.showplus = !this.showplus;
        // if(!this.attachmentForm.valid){
        //     alert("Enter the required fields")
        //     this.attachmentForm.reset();
        //     this.myInputVariable.nativeElement.value = "";

        //   }
        //   else{
        //     const file: File = event[0];

        //     //debugger;
        //     this.onFileSelect(event);

        //     this.src = await readBase64(file)
        //         .then(function (data) {
        //             return data;

        //         })
        //         this.attachmentForm.reset();
        //   }
        //   this.attachmentForm.reset();
        // // const file: File = event[0];

        // // //debugger;
        // // this.onFileSelect(event);

        // // this.src = await readBase64(file)
        // //     .then(function (data) {
        // //         return data;
        // //     })
    }

    constructor(private fb: FormBuilder, private sharedService: SharedService, public dialog: DialogService, public sessionService: SessionService) {
        ////debugger;
        this.attachmentForm = this.fb.group({
            // category: ['', Validators.required],
            // description: ['', Validators.required],
            category: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            color: [null],
            ImageName: [null],
            // url: ['', Validators.required]
            // category: [null],
            // description: [null],
            // color: [null],
            // ImageName: [null],
            url: [null]
        });
    }
    getCount(e) {
        if (e != undefined && e != null && e != "") {
            //debugger;
            // console.log(e);
            // console.log(JSON.parse(e))
            return JSON.parse(e).length;
        }

    }
    show() {
        this.myInputVariable.nativeElement.value = "";
        this.showplus = true;
    }
    test(form) {
        console.log(form.value);
        if (this.attachmentForm.valid) {
            this.attachedfiles.push(form.value);
            for (let i = 0; i < this.attachedfiles.length; i++) {
                this.attachedfiles[i]['certificationurl'] = this.attachedfiles[i].url;
                this.attachedfiles[i]['desc'] = this.attachedfiles[i].description;
            }
            this.attachmentForm.reset();
            this.myInputVariable.nativeElement.value = "";
        } else {
            alert("Enter the required fields");
            this.attachmentForm.reset();
            this.myInputVariable.nativeElement.value = "";
        }


    }
    upload() {
        ////debugger;
        //this.fileUpload.upload();
        this.sharedService.upload(this.AllFiles);
        this.AllFiles = [];
        if (this.fileUpload) this.fileUpload.clear();
    }
    remove(event: Event, file: any) {
        ////debugger;
        const index: number = this.uploadedFiles.indexOf(file);

        if (index > -1) {
            this.attachedfiles.splice(index, 1);
            this.uploadedFiles.splice(index, 1);
        }
        this.fileUpload.remove(event, index);
    }
    delete(file: any) {
        //debugger;
        const index: number = -1;
        for (let i = 0; i < this.attachedfiles.length; i++) {
            if (this.attachedfiles[i].name == file) {
                this.attachedfiles.splice(i, 1);
                return;
            }

        }

        //this.remove(null, index);
    }

    onChangeAction(val) {
        ////debugger;
        if (val == "Color") this.bshowcolor = !this.bshowcolor;
        if (val == "Camera") this.bshowcamera = !this.bshowcamera;
    }
    opencomment(e) {
        //debugger;
        this.dialog.open(opencommentComponent,
            {
                'width': '60% !important',
                data: { comments: e.comments, ScreenType: 2 },
                header: "Comments"
            }
        ).onClose.subscribe(res => {
            if (res != undefined) this.attachedfiles[this.attachedfiles.findIndex(x => x.Key === e.Key)].comments = res;
        });
    }
    geturl(e: any, filename: string, filetype: string) {
        debugger;
        this.showview = this.sessionService.getItem("attachedsaved");
        if (this.showview == "true") {
            console.log(e, filename, filetype);
            this.attachedfiles[this.attachedfiles.findIndex(x => x.Key === e.Key)].views += 1;
            this.dialog.open(openfileComponent,
                {
                    data: { url: AppConstants.AttachmentURL + filename, ScreenType: 2 },
                    header: filename
                }
            );
        }
        else {
            alert("View the file once you submit")
            return
        }


        //old
        //debugger;
        // console.log(e, filename, filetype);

        // this.attachedfiles[this.attachedfiles.findIndex(x => x.Key === e.Key)].views += 1;
        // this.dialog.open(openfileComponent,
        //     {
        //         data: { url: AppConstants.AttachmentURL + filename, ScreenType: 2 },
        //         header: filename
        //     }
        // );

        //end

        //window.open(AppConstants.AttachmentURL + filename);
        return;
        fetch(AppConstants.AttachmentURL + filename)
            .then((res: any) => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                JSZip.loadAsync(blob).then(function (zip) {
                    console.log(zip.files);
                    var url;//  = this.createObjectURL(zip.files[0]);
                    let file = zip.files;
                    Object.keys(zip.files).forEach((filename) => {

                        zip.file(filename).async('blob').then((blob) => {
                            var file = new Blob([blob], {
                                type: filetype
                            });
                            url = window.URL.createObjectURL(file);//blob
                            window.open(url);
                        });
                    });
                    //url= window.URL.createObjectURL( file._data );

                    //window.open(url);
                    // folder1/
                    // folder1/folder2/
                    // folder1/folder2/folder3/
                    // folder1/folder2/folder3/file1.txt
                });

            });

        //return AppConstants.AttachmentURL + filename;
    }
    createObjectURL(file) {
        if (window.URL && window.URL.createObjectURL) {
            return window.URL.createObjectURL(file);
        } else {
            return null;
        }
    }
    getcolor(color: string) {
        return { 'background-color': color };
    }
    updatecolor() {
        return { 'background-color': this.color };
    }
    handleChange(e: any) {
        //////debugger;
        this.color = e;
    }
    getLength() {
        ////debugger;
        return this.attachedfiles?.length;
    }
    getAllFiles() {
        ////debugger;
        return this.AllFiles;
    }
    setattachmentlist(files) {
        ////debugger;
        this.attachedfiles = files;

    }
    getattachmentlist() {
        return this.attachedfiles;
    }
    getAttachmentList() {
        return this.attachedfiles;
    }
    async onFileSelect(e: any) {

        ////debugger;
        //this.attachedfiles = [];
        if (!this.isAttachment) {
            this.uploadedFiles = [];
            this.attachedfiles = [];
        }

        for (let i = 0; i < e.length; i++) {
            let max = 0;
            let attachmentobj = null;
            if (this.attachedfiles == null) this.attachedfiles = [];
            max = Array.of(this.uploadedFiles).length + Array.of(this.attachedfiles).length;



            //this.fileattachmentlist.push(e.files[i]);
            //this.AllFiles.push(e[i]);
            /*const jszip = new JSZip();


                let reader = new FileReader();
                let content;

                let filename=e[i].name;
                let filekey=Guid.create() + ".zip"; //e[i].name.split('.')[0]
                    let filetype=e[i].type;

                    jszip.file(filename,e[i]);
                    let objFile=await  jszip.generateAsync({type:"blob",compression: "DEFLATE",compressionOptions: {level: 9}}).then(function(blob) {
                          return blob;
                    });
                    (objFile as any).name = filekey;
                      */
            this.AllFiles.push(e[i]);


            let description = this.attachmentForm.get('description').value;
            let category = this.attachmentForm.get('category').value;
            let url = this.attachmentForm.get('url').value;
            attachmentobj = { Key: (this.attachedfiles.length + 1 + max).toString(), name: e[i].name, size: e[i].size, type: e[i].type, username: this.SessionData.username, uploadeddate: this.getCurrentDate(), desc: description, category: category, certificationurl: url, ratings: 0, views: 0, comments: '', color: this.color, filekey: e[i].name };


            this.attachmentfields.forEach((attachmentfield) => {
                attachmentobj[attachmentfield.name] = (document.all[attachmentfield.name + (this.attachedfiles.length + 1 + max).toString()]);
            });
            this.attachedfiles.push(attachmentobj);
            max = 0;
            //if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            //this.attachmentlist.push(attachmentobj);
            let arr = this.uploadedFiles.concat(this.attachedfiles);

            //let arr=this.attachedfiles;
            let jsonstring = JSON.stringify(arr);
            this._value = jsonstring;
            if (this.onChange) this.onChange(jsonstring);
            //this.attachmentForm.patchValue({ description: "" });
        }
        this.attachmentForm.patchValue({
            category: [null],
            description: [null],
            url: [null]
        });
    }

    /*
        makeZip(zip, name) {
            name = name.split('.')[0] + ".zip";
            zip.generateAsync({type:"blob", compression:"DEFLATE", compressionOptions: { level: 9 }})
              .then(function(content) {
                 // see FileSaver.js
                 console.log(content)
                 fileSaver.saveAs(content, name)
                 var item = {
                   'name': name,
                   'type': content.type,
                   'size': content.size,
                   'guid': Guid.create()
                 };
              });
        }
    */
    clear() {
        //debugger;
        this.attachedfiles = [];
        if (this.fileUpload) this.fileUpload.files = [];
    }
    getCurrentDate() {
        return formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }
    getCategoryDescription(val) {
        let ret = "";

        if (val == "W")
            ret = "Work Experience";
        else if (val == "A")
            ret = "Degree Certificates";
        else if (val == "L")
            ret = "Course Certification";
        else if (val == "S")
            ret = "Documents";
        else if (val == "I")
            ret = "Others";
        return ret;
    }
    getDescription() {
        console.log(this.attachmentForm.get('description').value);
        return this.attachmentForm.get('description').value;
    }
    // updateRatings(e) {
    //     //debugger;
    //     console.log(e);
    //     this.attachedfiles[this.attachedfiles.findIndex(x => x.Key === e.Key)].ratings += 1;
    // }
    updateRatings(e) {

        console.log(e);
        if (e.ratings === 1) {
        } else {
            this.attachedfiles[this.attachedfiles.findIndex(x => x.Key === e.Key)].ratings += 1;
        }
    }
    getFile(file) {
        console.log(file);
        return "";
    }

    get value() {
        //////debugger;
        return this._value;

    }


    set value(value: any) {
        ////debugger;
        this._value = value;

        if (value != null && value != undefined && value != "[]") {
            this.uploadedFiles = value;
            if (this.uploadedFiles.length > 0) this.src = this.AttachmentURL + this.uploadedFiles[0].name;
        }
        //JSON.parse(value)
        else
            this.uploadedFiles = [];

        this.attachmentForm.patchValue({ color: "#fff" });

        if (this.onChange) {
            this.onChange(value);
        }
    }

    writeValue(obj: any): void {
        this.value = obj;
    }


    registerOnChange(fn: any): void {
        //////debugger;
        this.onChange = fn;
    }


    registerOnTouched(fn: any): void {
        this.onTouched = fn;

    }

    public triggerSnapshot(): void {
        ////debugger;
        this.trigger.next();
        this.showWebcam = false;

    }

    public toggleWebcam(): void {
        ////debugger;
        this.showWebcam = !this.showWebcam;

        this.showWebcamImage = this.showWebcam;
    }

    public handleInitError(error: WebcamInitError): void {
        ////debugger;
        this.errors.push(error);
    }

    public showNextWebcam(directionOrDeviceId: boolean | string): void {
        ////debugger;
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
        ////debugger;
        return this.trigger.asObservable();
    }

    public get nextWebcamObservable(): Observable<boolean | string> {
        ////debugger;
        return this.nextWebcam.asObservable();
    }

    /*
        async OCR() {

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
                const { data: { text } } = await worker.recognize("/assets/"+this.camsassetadditionForm.get('ImageName').value, { rectangle: rectangles[i] });
                values.push(text);
              }
              console.log(values);
            */
    //, { rectangle }
    /*
    ////debugger;
    const { data: { text } } = await worker.recognize("/assets/" + this.camsassetadditionForm.get('ImageName').value);
    this.sharedService.alert(text);
    console.log(text);

    const { data } = await worker.detect("/assets/" + this.camsassetadditionForm.get('ImageName').value);
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
*/

    pushtoUpload() {
        var imageBlob = this.sharedService.dataURItoBlob(this.webcamImage.imageAsDataUrl);
        const imageFile = new File([imageBlob], this.attachmentForm.get('ImageName').value + ".jpeg", { type: 'image/jpeg' });
        var files: any[] = [];
        files.push(imageFile);
        let e = { files: files };
        this.onFileSelect(e);
        this.showWebcamImage = false;

    }



}



