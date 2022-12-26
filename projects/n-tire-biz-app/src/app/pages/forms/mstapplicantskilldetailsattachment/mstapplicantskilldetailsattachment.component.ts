import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
import { mstapplicantreferencerequest } from '../../../model/mstapplicantreferencerequest.model';
import { mstapplicantskilldetailService } from '../../../service/mstapplicantskilldetail.service';
import { SharedService } from '../../../service/shared.service';
import { AppConstants } from '../../../shared/helper';
import { SessionService } from '../../core/services/session.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-mstapplicantskilldetailsattachment',
  templateUrl: './mstapplicantskilldetailsattachment.component.html',
  styleUrls: ['./mstapplicantskilldetailsattachment.component.scss']
})
export class MstapplicantskilldetailsattachmentComponent implements OnInit {

  mstapplicantAttachment_Form: FormGroup;

  formData: mstapplicantreferencerequest;
  list: mstapplicantreferencerequest[];
  mstapplicantreferencerequest_menuactions: any = []


  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;

  applicantid: any;
  maindata: any;
  isSubmitted: boolean = false;

  constructor(private fb : FormBuilder, private toastr: ToastService,
    private sharedService: SharedService, public dynamicconfig: DynamicDialogConfig,
    private spinner: NgxSpinnerService,private sessionService: SessionService,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,) { 
    this.mstapplicantAttachment_Form = this.fb.group({
      applicantid: [this.applicantid],
      segmentid: [''],
      segmentcategoryothers: [''],
      skillcategory: [''],
      skillcategoryothers: [''],
      subcategoryid: [''],
      subcategoryidothers: [''],
      selfrating: [''],
      remarks: [''],
      attachment : ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      // this.onSubmitDataDlg(false);
      this.onSubmitData(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(true);
    }
    else {
      this.onSubmitData(true);
    }
  };


  onSubmitData(bclear: any){
    debugger;
    this.isSubmitted = true;
    let strError = "";

    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantAttachment_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    };
    this.formData = this.mstapplicantAttachment_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicantAttachment_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicantAttachment_Form.controls[key].value;
          }
        }
      }
    }
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    // if (this.contactfileattach.getAttachmentList() != null) this.formData.contactfileattach = JSON.stringify(this.contactfileattach.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe.subscribe(
      async res => {
        // await this.sharedService.upload(this.contactfileattach.getAllFiles());
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.sessionService.setItem("attachedsaved", "true")
      });
  }


  validate() {
    let ret = true;
    return ret;
  }

}
