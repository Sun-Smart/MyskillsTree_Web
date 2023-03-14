import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { mstapplicantachievementdetailService } from '../../../service/mstapplicantachievementdetail.service';
import { mstapplicantachievementdetailComponent } from './mstapplicantachievementdetail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantachievementdetail } from '../../../model/mstapplicantachievementdetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
@Component({
  selector: 'app-applicantachivementgrid',
  template: `
  <div style = "float: left;width: 100%;height:100%;">
    <div *ngIf="showWebviewDetect" class="row form-group sticky1" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

<div class="col-4">
    <h4 class="columns left">{{'Certification'}}</h4>
</div>

<div class="col-6"></div>

<div class="col-2" style="text-align: end; margin: auto;display:flex;justify-content:space-evenly;">

                <button type = "button"  class="alert-success" (click)="Add_mstapplicantachievementdetail(null, 'create', 'this.applicantid')"><i
                class="fa fa-plus"></i> Add</button>

                <button type = "button"  class="alert-danger" (click)="onClose()" *ngIf = "buttonview"><i
                class="fa fa-close"></i> Close</button>

                </div>
</div>


<div *ngIf="showMobileDetectskill" class="row form-group sticky1" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

<div class="col-4">
    <h4 class="columns left">{{'Certification'}}</h4>
</div>

<div class="col-4"></div>

<div class="col-4" style="text-align: end; margin: auto;">

                <button type="button" class="btn btn-outline-primary  popup-add-button" (click)="mstapplicantachievementdetails_route(null, 'create')"
                  title = "Add Details">Add</button>
                <button type = "button"   class="" (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" class="achive_btn" style="width: 20px;" title = "Close"/></button>
</div>
</div>

<div class = "row">
<div class = "col-12"style = "padding:0;">
<form [formGroup]="mstapplicantachievementdetail_Form"  *ngIf="showWebviewDetect">
              <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
        <thead>
          <tr>
            <th scope="col" class="achieve_title" style="width: 18%;">Category</th>
            <th scope="col" style="width:25%">Achievement Details</th>
            <th scope="col" style="width:17%">Skills</th>
            <th scope="col" style="width:15%">From Date</th>
            <th scope="col" style="width:15%">To Date</th>
            <th scope="col" style="width:15%;text-align: center;"> Action</th>
          </tr>
        </thead>

        <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
            <tr>

            <!--Master Data Type-->

                <td>
                    <select  id="masterdataid" required (change)="masterdataid_onChange($event.target)"
                    formControlName="masterdataid" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of masterdataid_List" value="{{item.value}}">{{item.label}}</option>
                    </select>
                </td>

            <!-- Achievement details -->

                <td>
                    <textarea autosize rows="1" cols="10" onlyGrow="true"  id="achievementdetails" required
                    formControlName="achievementdetails" class="form-control">
                    </textarea>
                </td>

                <!-- Skills -->

                <td>
                <!-- <select  id="skill" required
                    (change)="skill_onchange($event.target)" formControlName="skill" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of skill_list" value="{{item.value}}">{{item.label}}</option>
                    </select> -->

                    <p-autoComplete formControlName="skill" field="label" [multiple]="true" [suggestions]="skills_results"
                    (completeMethod)="search_skills($event)"></p-autoComplete>
                  </td>

                <!-- From Date -->

                <td>
                <div >
                <div class="input-group" style="display: flex;width: 100%;">

                  <input #d="ngbDatepicker" readonly ngbDatepicker [minDate]='{year: 1901, month:1, day: 1}'
                  [maxDate]="maxDate"  name="fromdateformpicker" id="fromyear" required
                    formControlName="fromyear" style="margin-right: 5px;" class="form-control">

                  <button class="input-group-addon" (click)="d.toggle()" type="button"><i
                      class="fa fa-calendar" aria-hidden="true"></i></button>
                </div>
              </div>
                </td>

                <!-- To Date -->

                <td>
                <div>
                <div style="display: flex;width: 80%;">
                <input #t="ngbDatepicker" readonly  ngbDatepicker [minDate]='{year: 1901, month:1, day: 1}'
                [maxDate]="maxDate"  name="toyearformpicker" id="toyear" formControlName="toyear" class="form-control"
                     style="margin-right: 5px;">

                     <button class="input-group-addon"  (click)="t.toggle()" type="button"><i
                         class="fa fa-calendar" aria-hidden="true"></i></button>
               </div>
                    <div *ngIf="showDateError" style="color: red;font-size: 12px;">
                          To date is greater than from date
                    </div>
               </div>
                </td>

            <!-- Submit & Close -->

                <td class="field-add-close-button">
                    <i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                    <i class="fa fa-window-close field-close-button" aria-hidden="true"
                    (click)="skillClose()"></i>
                </td>
            </tr>
        </tbody>
</table>
</form>
</div>

<form [formGroup]="mstapplicantachievementdetail_Form"  *ngIf="showMobileDetectskill">
<div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<div class="col-md-12">
<label>Category</label>
<select  id="masterdataid" required (change)="masterdataid_onChange($event.target)"
                    formControlName="masterdataid" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of masterdataid_List" value="{{item.value}}">{{item.label}}</option>
                    </select>
</div>
<div class="col-md-12">
<label>Achievement Details</label>
<textarea autosize rows="1" cols="10" onlyGrow="true"  id="achievementdetails" required
                    formControlName="achievementdetails" class="form-control">
                    </textarea>
</div>
<div class="col-md-12">
  <label>Skill</label>
<select  id="skill" required
                    (change)="skill_onchange($event.target)" formControlName="skill" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of skill_list" value="{{item.value}}">{{item.label}}</option>
                    </select>
</div>
<div class="col-md-12">
  <label>From Date</label>
  <div class="input-group" style="display: flex;width: 100%;">
                  <input #d="ngbDatepicker" readonly ngbDatepicker
                    name="fromyearformpicker" id="fromyear" required
                    formControlName="fromyear" style="margin-right: 5px;" class="form-control">
                  <button class="input-group-addon" (click)="d.toggle()" type="button"><i
                      class="fa fa-calendar" aria-hidden="true"></i></button>
                </div>
</div>
<div class="col-md-12">
  <label>To Date</label>
  <div class="input-group" style="display: flex;width: 100%;">
                <input #t="ngbDatepicker" readonly  ngbDatepicker
                      name="toyearformpicker" id="toyear" formControlName="toyear" class="form-control"
                     style="margin-right: 5px;">

                     <button class="input-group-addon"  (click)="t.toggle()" type="button"><i
                         class="fa fa-calendar" aria-hidden="true"></i></button>
               </div>
</div>

<div class="col" style="position: relative;left: 120px;top: 7px;">

<i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                    <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                    (click)="skillClose()"></i>
</div>

</div>
</form>

<div class = "col-12" style="overflow-y: scroll;height: 360px;padding:0;">
              <ng2-smart-table #tbl_mstapplicantachievementdetails
                (userRowSelect)="handle_mstapplicantachievementdetails_GridSelected($event)"
                [settings]="mstapplicantachievementdetails_settings"
                (custom)="onCustom_mstapplicantachievementdetails_Action($event)"
                (custom)="onCustom_mstapplicantskilldetailsAttachment_Action($event)"
                [source]="tbl_mstapplicantachievementdetails?.source?.data"
                (delete)="mstapplicantachievementdetails_route($event,'delete')"
                (deleteConfirm)="mstapplicantachievementdetails_route($event,'delete')"
                (create)="mstapplicantachievementdetails_route($event,'create')"
                (createConfirm)="mstapplicantachievementdetails_beforesave($event)"
                (edit)="mstapplicantachievementdetails_route($event,'edit')"
                (editConfirm)="mstapplicantachievementdetails_beforesave($event)">
              </ng2-smart-table>
              </div>

        <div class="col-12" *ngIf = "!buttonview" style="display: flex;justify-content: end;margin: 10px auto;position:absolute;right:0; bottom : 1rem;">

        <!--<button class="wizard-button" (click)="skip_details()"   style="margin-right:10px;"> Skip</button>-->

        <button class="wizard-button" (click)="onSubmitWithCertification()">
        Dashboard <i class="fa fa-undo" aria-hidden="true"></i></button>

        </div>
        </div>
    `,
  styles: [
    `
      @media only screen and (max-width: 600px) {
        h4.columns.left{
        margin-top: 10px !important;
      }
      .achieve_title{
        padding-left: 0px !important;
      }
      button.btn.btn-outline-primary.popup-add-button{
        position: absolute !important;
        right: 50px !important;
        bottom: -3px !important;
      }
      }
      `
  ]
})
export class mstapplicantachivementgridComponent implements OnInit {

  mstapplicantachievementdetail_Form: FormGroup;

  formData: mstapplicantachievementdetail;
  isadmin = false;
  bfilterPopulate_mstapplicantachievementdetails: boolean = false;
  mstapplicantachievementdetail_menuactions: any = []
  @ViewChild('tbl_mstapplicantachievementdetails', { static: false }) tbl_mstapplicantachievementdetails: Ng2SmartTableComponent;
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  stapplicantachievementdetails_visiblelist: any;
  mstapplicantachievementdetails_hidelist: any;
  Deleted_mstapplicantachievementdetail_IDs: string = "";
  mstapplicantachievementdetails_ID: string = "7";
  mstapplicantachievementdetails_selectedindex: any;
  pkList: any;//stores values - used in search, prev, next

  ShowTableslist: any;
  pkcol: any;

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;
  showDateError: boolean;


  applicantid_List: DropDownValues[];
  masterdataid_List: DropDownValues[];
  referenceacceptance_List: DropDownValues[];
  skill_list: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[];


  applicantid: any;
  data: any;
  checkstar: any = [];
  objvalues: any = [];
  hidelist: any = [];
  starres: any;
  onestar: string;
  showstar: string;
  mstapplicantachievementdetails_visiblelist: any;
  showSkillDetails_input: boolean = false;
  isSubmitted: boolean = false;
  showview: boolean = false;

  @Output() certification = new EventEmitter<boolean>();

  maindata: any;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  showAttachment: boolean = true;
  SESSIONUSERID: any;//current user
  maxDate = undefined;

  sessionData: any;
  sourceKey: any;
  formid: any;
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  fromyear: Date;
  toyear: Date;
  skills: null;
  myDate: any;
  showButton: any;
  buttonview: boolean;

  constructor(
    private mstapplicantachievementdetail_service: mstapplicantachievementdetailService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private fb: FormBuilder,
    public dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService, private datePipe: DatePipe,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private mstapplicantachivement_service: mstapplicantachievementdetailService,
  ) {
    var date = new Date()
    this.myDate = this.datePipe.transform(date);
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    this.showButton = this.data.showButton;
  }

  ngOnInit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }
    this.Set_mstapplicantachievementdetails_TableConfig();
    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = localStorage.getItem('applicantid');

    this.mstapplicantachievementdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      achievementid: [null],
      masterdataid: [null, Validators.compose([Validators.required])],
      masterdataiddesc: [null],
      achievementdetails: [null, Validators.compose([Validators.required])],
      fromyear: [null, Validators.compose([Validators.required])],
      toyear: [null],
      selfrating: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      skill: [null],
      skilldesc: [null],
    });

    this.FillData();

    if (this.showButton == true) {
      this.buttonview = true;
    }

    this.mstapplicantachievementdetail_service.get_mstapplicantachievementdetails_List().then((res: any) => {
      this.pkList = res as mstapplicantachievementdetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    this.mstapplicantachievementdetail_service.getskillsDetails(this.applicantid).then((res: any) => {
      console.log('skill res', res);
      this.skills_List = res;
    }).catch((err) => { this.spinner.hide(); });

    this.mstapplicantachievementdetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.masterdataid_List = res.list_masterdataid.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
      // this.skill_list = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); });

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    }
  };

  skillClose() {
    this.showSkillDetails_input = false;
    this.mstapplicantachievementdetail_Form.reset();
  };
  masterdataid_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicantachievementdetail_Form.patchValue({ masterdataiddesc: evt.options[evt.options.selectedIndex].text });
  };

  search_skills(event) {
    this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
  };

  getSkills(skills_List) {
    let skills: any[] = [];

    for (let i = 0; i < skills_List.length; i++) {
      skills.push((skills_List[i] as any).value.toString());
    }
    return skills;
  }

  getSkillsDescription() {
    let skillsdescription: any[] = [];
    for (let i = 0; i < this.skills_List.length; i++) {
      for (let j = 0; j < this.mstapplicantachievementdetail_Form.get('skill').value.length; j++) {
        if ((this.skills_List[i] as any).value.toString() == this.mstapplicantachievementdetail_Form.get('skill').value[j].toString()) {

          skillsdescription.push((this.skills_List[i] as any));
        }
      }
    }
    this.mstapplicantachievementdetail_Form.patchValue({ skill: skillsdescription });
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      this.onSubmitData(false);
    }
    else {
      this.onSubmitData(false);
    }
  };

  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantachievementdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantachievementdetail_Form.getRawValue();

    this.formData.fromyear = new Date(this.mstapplicantachievementdetail_Form.get('fromyear').value ? this.ngbDateParserFormatter.format(this.mstapplicantachievementdetail_Form.get('fromyear').value) + '  UTC' : null);

    if (this.mstapplicantachievementdetail_Form.value.currentlyworking == true) {
      this.formData.toyear = new Date()
    } else {
      this.formData.toyear = new Date(this.mstapplicantachievementdetail_Form.get('toyear').value ? this.ngbDateParserFormatter.format(this.mstapplicantachievementdetail_Form.get('toyear').value) + '  UTC' : null);
    }
    // this.formData.skills = null;
    this.formData.applicantid = this.applicantid;

    if (this.formData.fromyear > this.formData.toyear) {
      this.showDateError = true;
      return;
    } else {
      this.spinner.show();

      if (this.mstapplicantachievementdetail_Form.get('skill').value != null) this.formData.skill = this.getSkills(this.mstapplicantachievementdetail_Form.get('skill').value);

      this.mstapplicantachievementdetail_service.saveOrUpdate_mstapplicantachievementdetails(this.formData).subscribe(
        async res => {
          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicantachievementdetail);
          this.mstapplicantachievementdetail_Form.reset();
          this.ngOnInit();
          if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.dialogRef.close(this.objvalues);
            return;
          }
          else {
            if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          }

          if (bclear) {
            this.resetForm();
          }
          else {
            if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
              this.objvalues.push((res as any).mstapplicantachievementdetail);
              this.dialogRef.close(this.objvalues);
            }
            else {
              this.FillData();
            }
          }
          this.mstapplicantachievementdetail_Form.markAsUntouched();
          this.mstapplicantachievementdetail_Form.markAsPristine();

        });
    }
  };

  async onSubmitWithCertification(bclear: any) {

    this.certification.emit(true);

    // this.mstapplicantachivement_service.get_mstapplicantachievementdetails_ByApplicantID(this.applicantid).then(res => {
    //   if (res.mstapplicantachievementdetail.length > 0) {

    //     let certification = {
    //       addcertification: true,
    //     }
    //     this.certification.emit(certification);
    //   } else {
    //     let certification = {
    //       skipcertification: true,
    //     }
    //     this.certification.emit(certification);

    //     return
    //   }
    // });
  };

  skip_details() {
    // this.certification.emit(true);
  }

  resetForm() {
    if (this.mstapplicantachievementdetail_Form != null)
      this.mstapplicantachievementdetail_Form.reset();
    this.mstapplicantachievementdetail_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  };

  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "fromyear")
            this.mstapplicantachievementdetail_Form.patchValue({ "fromyear": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "toyear")
            this.mstapplicantachievementdetail_Form.patchValue({ "toyear": this.ngbDateParserFormatter.parse(mainscreendata[key]) });

          else if (ctrltype == "string") {
            this.mstapplicantachievementdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantachievementdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantachievementdetail_Form.controls[key] != undefined) {
                this.mstapplicantachievementdetail_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }


  FillData() {
    this.mstapplicantachivement_service.get_mstapplicantachievementdetails_ByApplicantID(this.applicantid).then(res => {
      debugger
      this.mstapplicantachievementdetail_menuactions = res.mstapplicantachievementdetail_menuactions;
      this.Set_mstapplicantachievementdetails_TableConfig();
      this.mstapplicantachievementdetails_LoadTable(res.mstapplicantachievementdetail);
    });
  }
  mstapplicantachievementdetailshtml() {
    let ret = "";
    ret += `
        <table class="table table-hover" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr style="word-break: break-word !important;">
            <th scope="row" style="white-space: break-spaces;width:20%;">##masterdataiddesc##</th>
            <th scope="row" class="card1 profile__section__item__sub" style="white-space: break-spaces;width:28%;">##achievementdetails##</th>
            <!--<th scope="row" style="white-space: break-spaces;">##remarks##</th>-->
            <th scope="row" style="white-space: break-spaces;width:20%;">##skilldesc##</th>
            <th scope="row" style="white-space: break-spaces;width:16%;">##fromyear##</th>
            <th scope="row" style="white-space: break-spaces;width:20%;">##toyear##</th>
          </tr>
        </tbody>
      </table>
`;
    return ret;
  }
  mstapplicantachievementdetailshtml1() {
    let ret = "";
    ret += `
      <ul class="list-group" style="line-height: 15px;margin: 0px;">
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Category </span>: <label style="font-size: small;">##masterdataiddesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Achievement Details </span>: <label style="font-size: small;">##achievementdetails##</label></li>
    <!--<li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks :</span> <label style="font-size: small;">##remarks##</label></li>-->
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Skill :</span> <label style="font-size: small;">##skilldesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">From Date :</span> <label style="font-size: small;">##fromyear##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">To Date :</span> <label style="font-size: small;">##toyear##</label></li>
  </ul>
`;
    return ret;
  }
  Add_mstapplicantachievementdetail(event: any, achievementid: any, applicantid: any) {
    this.showSkillDetails_input = true;

    let add = false;
    if (event == null) add = true;
  }

  Edit_mstapplicantachievementdetail(event: any, achievementid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.mstapplicantachievementdetail_service.get_mstapplicantachievementdetails_ByEID(event.data.pkcol).then(res => {
      this.formData = res.mstapplicantachievementdetail;
      this.formid = res.mstapplicantachievementdetail.achievementid;
      this.pkcol = res.mstapplicantachievementdetail.pkcol;
      this.mstapplicantachievementdetail_Form.patchValue({
        applicantid: res.mstapplicantachievementdetail.applicantid,
        applicantiddesc: res.mstapplicantachievementdetail.applicantiddesc,
        achievementid: res.mstapplicantachievementdetail.achievementid,
        masterdataid: res.mstapplicantachievementdetail.masterdataid,
        masterdataiddesc: res.mstapplicantachievementdetail.masterdataiddesc,
        achievementdetails: res.mstapplicantachievementdetail.achievementdetails,
        selfrating: res.mstapplicantachievementdetail.selfrating,
        remarks: res.mstapplicantachievementdetail.remarks,
        requestid: res.mstapplicantachievementdetail.requestid,
        skill: res.mstapplicantachievementdetail.skill,
        skilldesc: res.mstapplicantachievementdetail.skilldesc,
        referenceacceptance: res.mstapplicantachievementdetail.referenceacceptance,
        referenceacceptancedesc: res.mstapplicantachievementdetail.referenceacceptancedesc,
        fromyear: this.ngbDateParserFormatter.parse(res.mstapplicantachievementdetail.fromyear),
        toyear: this.ngbDateParserFormatter.parse(res.mstapplicantachievementdetail.toyear),
        status: res.mstapplicantachievementdetail.status,
        statusdesc: res.mstapplicantachievementdetail.statusdesc,
      });

      setTimeout(() => {
        this.getSkillsDescription();
        this.mstapplicantachievementdetail_service.getDefaultData().then(res => {
          this.masterdataid_List = res.list_masterdataid.value;
          // this.skill_list = res.list_skills.value;
        });
        this.mstapplicantachievementdetail_service.getskillsDetails(this.applicantid).then((res: any) => {
          console.log('skill res', res);
          this.skills_List = res.mstapplicantachievementdetail.skilldesc;
        }).catch((err) => { this.spinner.hide(); });
      })
    })
  }

  onDelete_mstapplicantachievementdetail(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicantachivement_service.delete_mstapplicantachievementdetail(childID).then(res => {
        this.mstapplicantachivement_service.get_mstapplicantachievementdetails_ByApplicantID(this.applicantid).then(res => {
          this.ngOnInit();
          this.mstapplicantachievementdetails_LoadTable(res.mstapplicantachievementdetail);
        });
      })
    } else {
      return;
    }
  }
  //start of Grid Codes mstapplicantachievementdetails
  mstapplicantachievementdetails_settings: any;

  show_mstapplicantachievementdetails_Checkbox() {
    if (this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantachievementdetails.source.initGrid();
  }
  delete_mstapplicantachievementdetails_All() {
    this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantachievementdetails_Filter() {
    if (this.tbl_mstapplicantachievementdetails.source.settings != null) this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'];
    this.tbl_mstapplicantachievementdetails.source.initGrid();
  }
  async Set_mstapplicantachievementdetails_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstapplicantachievementdetails) {

      var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
      this.tbl_mstapplicantachievementdetails.source.settings = clone;
      this.tbl_mstapplicantachievementdetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
      if (clone.columns['masterdataid'] != undefined) clone.columns['masterdataid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
      if (clone.columns['masterdataid'] != undefined) clone.columns['masterdataid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
      this.tbl_mstapplicantachievementdetails.source.settings = clone;
      this.tbl_mstapplicantachievementdetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
      if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
      if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
      this.tbl_mstapplicantachievementdetails.source.settings = clone;
      this.tbl_mstapplicantachievementdetails.source.initGrid();
    }
    this.bfilterPopulate_mstapplicantachievementdetails = true;
  }
  async mstapplicantachievementdetails_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_mstapplicantachievementdetails_TableConfig() {
    this.mstapplicantachievementdetails_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        custom: this.mstapplicantachievementdetail_menuactions
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="fa fa-edit commonEditicon commonEditicon1" title="Edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon commonDeleteicon1" title="Delete"></i>',
        confirmDelete: true,
      },
      columns: {
        colhtml:
        {
          title: '',
          type: 'html',
          filter: true,
          editor:
          {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            cell = this.mstapplicantachievementdetailshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantachievementdetailshtml1();
            }
            var divrow = JSON.parse(JSON.stringify(row));

            divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";

            divrow["fromyear"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["fromyear"]));
            divrow["toyear"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["toyear"]));
            var dateee = divrow["toyear"]
            if (divrow["toyear"] == this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(this.myDate))) {
              divrow["toyear"] = "Till date";
              return this.sharedService.HtmlValue(divrow, cell)
            } else {
              divrow["toyear"] = dateee
              return this.sharedService.HtmlValue(divrow, cell)
            }

          },
        },
      },
    };
  }
  mstapplicantachievementdetails_LoadTable(mstapplicantachievementdetail = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
      if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source = new LocalDataSource();
      if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source.load(mstapplicantachievementdetail as any as LocalDataSource);
      if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source.setPaging(1, 20, true);
    }
  }

  mstapplicantachievementdetails_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.Add_mstapplicantachievementdetail(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicantachievementdetail(event, event.data.achievementid, this.applicantid);
        break;
      case 'delete':
        this.onDelete_mstapplicantachievementdetail(event, event.data.achievementid, ((this.tbl_mstapplicantachievementdetails.source.getPaging().page - 1) * this.tbl_mstapplicantachievementdetails.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicantachievementdetails.source.refresh();
        break;
    }
  }
  mstapplicantachievementdetails_onDelete(obj) {
    let achievementid = obj.data.achievementid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantachivement_service.delete_mstapplicantachievementdetail(achievementid).then(res =>
        this.mstapplicantachievementdetails_LoadTable()
      );
    }
  }
  async onCustom_mstapplicantachievementdetails_Action(event: any) {

    let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Achievements ' + event.data.masterdataiddesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Details: ' + event.data.achievementdetails + '</li>'


    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantachievementdetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantreferencerequests") {
      this.dialog.open(mstapplicantreferencerequestComponent,
        {
          data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 319, requestmasterid: event.data.achievementid, ScreenType: 2, save: true }
        }
      ).onClose.subscribe(res => {
      });
    }
  };

  async onCustom_mstapplicantskilldetailsAttachment_Action(event: any, achievementid: any, applicantid: any) {

    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantachievementdetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantachievementdetails") {
      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicantachievementdetailComponent,
        {
          data: { showAttachment: true, save: childsave, maindatapkcol: this.pkcol, event, achievementid, applicantid, visiblelist: this.mstapplicantachievementdetails_visiblelist, hidelist: this.mstapplicantachievementdetails_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicantachievementdetails.source.add(res[i]);
            }
            this.tbl_mstapplicantachievementdetails.source.refresh();
          }
          else {
            this.tbl_mstapplicantachievementdetails.source.update(event.data, res[0]);
          }
        }
      });

    }

  }

  mstapplicantachievementdetails_Paging(val) {
    this.tbl_mstapplicantachievementdetails.source.setPaging(1, val, true);
  }

  handle_mstapplicantachievementdetails_GridSelected(event: any) {
    this.mstapplicantachievementdetails_selectedindex = this.tbl_mstapplicantachievementdetails.source.findIndex(i => i.achievementid === event.data.achievementid);
  }
  Is_mstapplicantachievementdetails_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes mstapplicantachievementdetails
  onClose() {
    this.dialogRef.close();
  }

}
