import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { lmstask } from './../../../model/lmstask.model';
import { NgForm } from '@angular/forms';
import { lmspendingService } from './../../../service/lmspending.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';

@Component({
  selector: 'app-lmstasks',
  templateUrl: './lmstask.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})
export class lmstaskComponent implements OnInit {
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  isSubmitted: boolean = false;
  isValid: boolean = true;
  formid: any;
  lmstaskForm: FormGroup;
  assigntoList: bousermaster[];
  assignto_bousermastersForm: FormGroup;
  assignto_bousermastersoptions: any;
  assignto_bousermastersformatter: any;
  shortcuts: ShortcutInput[] = [];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  data: any;
  SESSIONUSERID: any;
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


  constructor(
    private keyboard: KeyboardShortcutsService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private lmspendingservice: lmspendingService,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private toastr: ToastService,
    private dialog: DialogService,
    private sharedService: SharedService,
    public sessionService: SessionService,
    private configservice: boconfigvalueService,
    private bousermasterservice: bousermasterService,
    private currentRoute: ActivatedRoute) {
    this.data = dynamicconfig;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.dialogRef.close(),
        preventDefault: true
      },
      {
        key: 'cmd s',
        command: () => this.onSubmitData(false),
        preventDefault: true
      },
      {
        key: 'cmd c',
        command: () => this.dialogRef.close(null),
        preventDefault: true
      }
    ]);
    this.lmstaskForm = this.fb.group({
      ImageName: [null],
      taskid: [null],
      subject: [null],
      description: [null],
      assignto: [null],
      assigntodesc: [null],
      targetdate: [null],
      assigneddate: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.lmstaskForm.controls; }


  async ngOnInit() {
    let sessiondata = this.sessionService.getSession();
    if (sessiondata != null) {
      this.SESSIONUSERID = sessiondata.userid;
    }

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
    if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
    if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
    let ppk = null;
    if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
    if (this.data.taskid != null && this.data.taskid != undefined) ppk = this.data.taskid;
    this.formid = ppk;

    if (ppk == null) {
      this.lmstaskForm.patchValue({
        targetdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        assigneddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      });
    }
    else {
      let obj = this.lmspendingservice.lmstasks.filter(x => x.taskid == ppk)[0];
      this.lmstaskForm.patchValue({
        productid: obj.productid,
        leadid: obj.leadid,
        opportunityid: obj.opportunityid,
        taskid: obj.taskid,
        subject: obj.subject,
        description: obj.description,
        assignto: obj.assignto,
        assigntodesc: obj.assigntodesc,
        targetdate: this.ngbDateParserFormatter.parse(obj.targetdate as any),
        assigneddate: this.ngbDateParserFormatter.parse(obj.assigneddate as any),
        attachment: obj.attachment,
        status: obj.status,
      });
      if (this.lmstaskForm.get('attachment').value != "" && this.lmstaskForm.get('attachment').value != null) this.attachmentfieldjson = JSON.parse(this.lmstaskForm.get('attachment').value);
    }
    this.bousermasterservice.getbousermastersList().then((res:any) => {
      this.assigntoList = res as bousermaster[];
    }
    );
    this.assignto_bousermastersoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.assigntoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.assignto_bousermastersformatter = (result: any) => result.username;
  }

  onSelectedassignto(assigntoDetail: any) {
    if (assigntoDetail) {
      this.lmstaskForm.patchValue({ assignto: assigntoDetail.item.userid });
      this.lmstaskForm.patchValue({ assigntodesc: assigntoDetail.item.username });
      assigntoDetail.preventDefault();

    }
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
  }


  pushtoUpload() {
    var imageBlob = this.sharedService.dataURItoBlob(this.webcamImage.imageAsDataUrl);
    const imageFile = new File([imageBlob], this.lmstaskForm.get('ImageName').value + ".jpeg", { type: 'image/jpeg' });
    var files: any[] = [];
    files.push(imageFile);
    let e = { files: files };
    this.attachmentuploader(e:any);


  }
  onSubmitData(bclear:any) {
    this.isSubmitted = true;
    if (!this.lmstaskForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.lmstaskForm.value;
    obj.targetdate = this.ngbDateParserFormatter.format(this.lmstaskForm.get('targetdate').value);
    obj.assigneddate = this.ngbDateParserFormatter.format(this.lmstaskForm.get('assigneddate').value);
    obj.attachment = JSON.stringify(this.attachmentfieldjson);
    console.log(obj);
    this.sharedService.upload(this.fileattachmentlist);
    this.attachmentlist = [];
    this.fileattachment.clear();
    this.dialogRef.close(obj);
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
  assigntoonChange(evt:any) {
    let e = evt.value;
  }
  AddOrEditassignto(userid) {
    let ScreenType = '2';
    /*this.dialog.open(bousermasterComponent, 
    {
    data: { ScreenType }
    } 
    ).onClose.subscribe((res:any) => {
    this.bousermasterservice.getbousermastersList().then((res:any) => this.assigntoList = res as bousermaster[]);
    });*/
  }


}


