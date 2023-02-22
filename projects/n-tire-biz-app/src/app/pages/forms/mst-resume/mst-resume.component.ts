import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { mstapplicantmasterService } from './../../../service/mstapplicantmaster.service';
import { mstapplicantmaster } from './../../../model/mstapplicantmaster.model';
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-mst-resume',
  templateUrl: './mst-resume.component.html',
  styleUrls: ['./mst-resume.component.scss']
})
export class MstResumeComponent implements OnInit {

  mstapplicantmaster_Form: FormGroup;
  formData: mstapplicantmaster;

  loginUser: any;
  formid: any;
  pkcol: any;
  maindata: any;
  objvalues:any =[];

  isSubmitted: boolean = false;

  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  @ViewChild('profilephoto', { static: false }) profilephoto: AttachmentComponent;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;
  data: any;
  p_menuid: any;
  p_currenturl: any;
  applicantid: any;



  constructor(private route: Router,
    private fb: FormBuilder,private translate: TranslateService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantmaster_service: mstapplicantmasterService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {


    this.loginUser = localStorage.getItem('username');
    this.applicantid = localStorage.getItem('applicantid');

    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;

    this.mstapplicantmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      firstname: [null],
      lastname: [null],
      emailid: [null],
      mobilenumber: [null],
      applicanttype: [null],
      applicanttypedesc: [null],
      gender: [null],
      genderdesc: [null],
      dob: [null],
      address1: [null],
      address2: [null],
      address3: [null],
      country: [null],
      countrydesc: [null],
      state: [null],
      statedesc: [null],
      city: [null],
      citydesc: [null],
      zipcode: [null],
      recoveryemailid: [null],
      profilephoto: [null],
      briefintroduction: [null],
      statuscrimp: [null],
      availableforjob: [null],
      profilecompletion: [null],
      applicantreference: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  };

  get f() { return this.mstapplicantmaster_Form.controls; }

  ngOnInit() {


    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.SESSIONUSERID = this.sessionData.userid;
    }
  }

  onSubmit() {
   debugger


    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  };

  onSubmitAndWait() {
    debugger
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  };

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.mstapplicantmaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantmaster_Form.getRawValue();
    obj.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
    // if (this.profilephoto.getAttachmentList() != null) obj.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    // await this.sharedService.upload(this.profilephoto.getAllFiles());
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
    setTimeout(() => {
      //this.dialogRef.destroy();
    }, 200);
  };

  onSubmitData(bclear: any){
    debugger;
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantmaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };
    this.formData = this.mstapplicantmaster_Form.getRawValue();
    this.formData.applicantid = this.applicantid;

    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    this.spinner.show();

    this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmastermains(this.formData).subscribe(
      async (res:any) => {

        console.log("Response", res);

        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.route.navigate(['/home/newlanguage'])
        this.objvalues.push((res as any).mstapplicantmaster);

      });
  }

  attachmentuploader(e: any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileAttachmentList.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
      max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentFieldJson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }

  addlanguagedetails() {
    this.route.navigate(['/home/newlanguage'])
  }
  back() {
    this.route.navigate(['/home/newcertification'])
  }
}
