import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { mstapplicantskilldetailgridComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component';
import { mstapplicanteducationdetailgridComponent } from './../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationgrid.component';
import { mstapplicantgeographygrid } from './../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographygrid.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicDialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { mstapplicantworkrefgridComponent } from '../mstapplicantworkreference/mstapplicantworkrefgrid.component';
import { mstapplicantcareergridComponent } from '../mstapplicantcareerdetail/mstapplicantcareergrid.component';
import { mstapplicantsocialmediagridComponent } from '../mstapplicantsocialmediadetail/mstapplicantsocialmediagrid.component';
import { mstapplicantlanuagegridComponent } from '../mstapplicantlanguagedetail/mstapplicantlanguagegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantachivementgridComponent } from '../mstapplicantachievementdetail/mstapplicantachivementgrid.component';
import { ToastService } from '../../core/services/toast.service';
import { mstapplicantmastermainComponent } from '../mstapplicantmaster/mstapplicantmastermain.component';
import { mstresumeapplicantComponent } from '../mstapplicantmaster/mstresumeapplicant.component';
import { mstapplicantskilldetailService } from '../../../service/mstapplicantskilldetail.service';
import { mstapplicanteducationdetailService } from '../../../service/mstapplicanteducationdetail.service';
import { DatePipe } from '@angular/common';
import { mstapplicantcareerdetailService } from '../../../service/mstapplicantcareerdetail.service';
import { SharedService } from '../../../service/shared.service';
import { forEach } from 'jszip';
import { el } from 'date-fns/locale';
import { mstapplicantachievementdetailService } from '../../../service/mstapplicantachievementdetail.service';
import { mstapplicantreferencerequestService } from '../../../service/mstapplicantreferencerequest.service';
@Component({
  selector: 'ngx-dashboardviewer',
  styles: [`
  .skill_btn{width:98%;margin:0!important;padding:0;text-align:left!important;border-radius:0!important}.edu_ref_btn,.per_ref_btn,.pro_ref_btn,.ref_btn,.ref_btn1,.ref_btn2,.res_ref_btn,.soc_ref_btn{border-radius:0;color:#fff}.edu_ref_btn,.ref_btn2{background-color:#5b9bd5}.ref_btn1,.soc_ref_btn{background-color:#65ae12}.per_ref_btn,.ref_btn{background-color:#ed7d31}.res_ref_btn{background-color:#a5a5a5}.pro_ref_btn{background-color:#ecb50e}.breadcrumb{background-color:transparent!important}.breadcrumb li{display:inline-block;padding:0;position:relative;min-width:50px;height:fit-content;text-decoration:none;z-index:auto;-webkit-clip-path:polygon(0 0,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,0 100%,15px 50%);clip-path:polygon(0 0,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,0 100%,15px 50%);margin-right:-13px}.tab>label,.tabbed [type=radio]:first-of-type:checked~.tab-content:nth-of-type(1),.tabbed [type=radio]:nth-of-type(2):checked~.tab-content:nth-of-type(2),.tabbed [type=radio]:nth-of-type(3):checked~.tab-content:nth-of-type(3),.tabbed [type=radio]:nth-of-type(4):checked~.tab-content:nth-of-type(4),.tabbed [type=radio]:nth-of-type(5):checked~.tab-content:nth-of-type(5),.tabbed [type=radio]:nth-of-type(6):checked~.tab-content:nth-of-type(6),.tabbed [type=radio]:nth-of-type(7):checked~.tab-content:nth-of-type(7){display:block}.breadcrumb li#last{-webkit-clip-path:polygon(0 0,calc(100% - 0px) 0,100% 50%,calc(100% - 0px) 100%,0 100%,15px 50%);clip-path:polygon(0 0,calc(100% - 0px) 0,100% 50%,calc(100% - 0px) 100%,0 100%,15px 50%)}.breadcrumb li:hover{color:#fff;background:#fff}.breadcrumb li:first-child{-webkit-clip-path:polygon(0 0,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,0 100%);clip-path:polygon(0 0,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,0 100%)}.tabbed{overflow-x:hidden}.tabbed [type=radio]{display:none}.tab{margin-bottom:1px!important}.tabs{display:flex;align-items:stretch;list-style:none;padding:0}.tab>label{padding:12px 15px;background:#eee;color:#666;font-size:12px;font-weight:600;text-transform:uppercase;cursor:pointer}.tab:hover label{color:#333}.tab-content{display:none;color:#777}.tabbed [type=radio]:first-of-type:checked~.tabs .tab:nth-of-type(1) label,.tabbed [type=radio]:nth-of-type(2):checked~.tabs .tab:nth-of-type(2) label,.tabbed [type=radio]:nth-of-type(3):checked~.tabs .tab:nth-of-type(3) label,.tabbed [type=radio]:nth-of-type(4):checked~.tabs .tab:nth-of-type(4) label,.tabbed [type=radio]:nth-of-type(5):checked~.tabs .tab:nth-of-type(5) label,.tabbed [type=radio]:nth-of-type(6):checked~.tabs .tab:nth-of-type(6) label,.tabbed [type=radio]:nth-of-type(7):checked~.tabs .tab:nth-of-type(7) label{border-top:5px solid green;background:#fff;color:#222}@media only screen and (max-width:600px){#contentArea1 .container,.container .mobile_col{overflow-y:scroll!important;height:630px!important}.mobileView,td{word-break:break-word!important}#contentArea1 .container{margin-top:-40px!important;overflow-x:hidden!important}.dashboard-sidebar{width:100%!important;min-width:-webkit-fill-available!important;height:95%!important}.dash_list{padding:1px!important;width:130px!important}.dash_list img{width:35px!important}.main-dash-content{width:100%!important;min-width:fit-content!important}.dashboard-sidebar-content{height:600px!important;overflow-y:scroll!important}.mob_profile_release{white-space:nowrap!important}td{white-space:initial!important}}
  `],
  templateUrl: './bodashboardviewer.component.html',
})
export class BODashboardViewerComponent implements OnInit {
  chart1: Chart;
  formid: any;
  pkcol: any;
  data: any;
  skillapplicantid: any;
  applicantid: any;
  refapplicantid: any;
  careerapplicantid: any;
  educationapplicantid: any;
  socialmediaapplicantid: any;
  isadmin = false;
  isrelease: boolean;
  datalabel: any = [];
  datacolour: any = [];
  dataod: any[] = [];
  datacount: any[] = [];
  getdata: any;
  isskillcompleted: boolean;
  isresumecompleted: boolean;
  isprojectcompleted: boolean;
  iseducationcompleted: boolean;
  issocialcompleted: boolean;
  ispersonalcompleted: boolean;
  isskillnotstarted: boolean;
  isresumenotstarted: boolean;
  isprojectnotstarted: boolean;
  iseducationnotstarted: boolean;
  issocialnotstarted: boolean;
  ispersonalnotstarted: boolean;
  isskillpending: boolean;
  isresumepending: boolean;
  datarelease: any[] = [];
  isprojectpending: boolean;
  iseducationpending: boolean;
  issocialpending: boolean;
  ispersonalpending: boolean;
  finalarray: any = []
  iscompleted: boolean = false;
  ispending: boolean = false;
  isnotstarted: boolean = false;
  showOpenfile: boolean = false;
  showhearder_Details: boolean = false;
  nodata_found: boolean;
  mst_skillDetails: any;
  sub_category: any = [];
  starRate: any = [];
  skill_detail: any = [];
  countarray: any = [];
  showstr: any;
  str_rateCount: any;
  subCategory: any;
  r1: any;
  r2: any;
  r3: any;
  skill_desc: any;
  ratingarray: any = []
  ratingarray1: any = []
  career_array: any = [];
  project_array: any = [];
  career_detail: any = [];
  project_detail: any = [];
  employment_details: any = [];
  dashboard_details: any = [];
  dashboard_employementdetails: any = [];
  dashboard_reffreq_details: any = [];
  dashboard_educationdetails: any = [];
  dashboard_achievementdetails: Number[];
  dashboard_projectdetails: any = [];
  get_educationd_data: any = [];
  career_companyName: any;
  career_frDate: any;
  career_toDate: any;
  project_worktopic: any;
  project_workdescription: any;
  skill_id: any;
  education_details: any = [];
  startformat: any;
  endformat: any;
  dateFormat: object;
  espYr: any
  expYrs: any = [];
  sub_categorydesc: any;
  remarks: any;
  start_date: any;
  end_date: any;
  ref_date: any;
  sub: any;
  showNewApp_Dashboard: boolean;
  skillfromDate: any;
  skilltoDate: any;
  EachExpresult: any = [];
  EachskillExp: any = [];
  showExp: any = [];
  showpersonal: boolean = true;
  showSkill: boolean;
  showeducation: boolean;
  showExperience: boolean;
  showProject: boolean;
  showCertification: boolean;
  dataDashboard: any;
  arrayDate: any = [];
  checkTest: any = [];
  checkDateError: any = [];
  totalamount: any;
  startDate: any;
  endDate: any;
  totalExp_yrs: any = [];
  totalExp: any;
  overall_Exp: any;
  Dashskill_desc: any;
  DashExpSkill: any;
  skillDateError: any = [];
  totalSkillExp: any = [];
  totalExperience: any;
  totalExperience2: any;
  totalExperienceYrs: any = [];
  totalExperienceMonths: any = [];
  showexperience: boolean;

  info_graphy: boolean;
  info_personal: boolean = false;
  info_skillset: boolean = false;
  info_education: boolean = false;
  info_career: boolean = false;
  info_project: boolean = false;
  info_certification: boolean = false;

  personal_filled: boolean = false;
  skill_filled: boolean = false;
  education_filled: boolean = false;
  project_filled: boolean = false;
  career_filled: boolean = false;
  achevement_filled: boolean = false;

  career_unfilled: boolean = false
  achevement_unfilled: boolean = false

  skill_nodata: number;
  personal_nodata: number
  skill_withdata: number;
  education_nodata: number;
  education_withdata: number;
  career_nodata: number;
  career_withdata: number;
  achievement_nodata: number;
  achievement_withdata: number;
  project_nodata: number;
  project_withdata: number;


  // showDashboardDetails: boolean = false;


  constructor(public dialogRef: DynamicDialogRef,
    private toastr: ToastService, private sharedService: SharedService,
    public dialog: DialogService, private mstapplicantmaster_service: mstapplicantmasterService, private pageroute: Router,
    private sessionService: SessionService, private activateroute: ActivatedRoute,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,
    private mstapplicanteducationdetail_service: mstapplicanteducationdetailService,
    private mstapplicantachivement_service: mstapplicantachievementdetailService,
    private datepipe: DatePipe,
    private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
    private mstapplicantreferencerequestService: mstapplicantreferencerequestService,
  ) {
    this.applicantid = this.sessionService.getItem("applicantid");
    this.pkcol = this.sessionService.getItem('usersource');
  }
  ngOnInit() {
    this.get_allData();
    this.get_experience();
    this.get_infography();
    this.isskillcompleted = false
    this.isresumecompleted = false
    this.isprojectcompleted = false
    this.iseducationcompleted = false
    this.issocialcompleted = false
    this.ispersonalcompleted = false
    this.isskillnotstarted = false
    this.isresumenotstarted = false
    this.isprojectnotstarted = false
    this.iseducationnotstarted = false
    this.issocialnotstarted = false
    this.ispersonalnotstarted = false
    this.isskillpending = false
    this.isresumepending = false

    this.isprojectpending = false
    this.iseducationpending = false
    this.issocialpending = false
    this.ispersonalpending = false
    this.sessionService.setItem("attachedsaved", "true");

    this.sharedService.wizardShow.subscribe((res: any) => {

      console.log("skillwizard", res);

      if (res == true) {
        this.showNewApp_Dashboard = false;
        this.info_personal = true;
        this.info_graphy = false;
      }
    })

    this.mstapplicantmaster_service.get_profilecompletionsecond(this.applicantid).then(res => {

      this.getdata = res;
      for (let i = 0; i < this.getdata.length; i++) {
        this.datalabel.push(this.getdata[i].name)
        this.datacount.push(this.getdata[i].cnt);
        this.datacolour.push(this.getdata[i].colour);
        this.dataod.push(this.getdata[i].od);
        this.datarelease.push(this.getdata[i].releasestatus)


        if (this.getdata[i].name == "Skillset" && this.getdata[i].colour == "#65AE12") {
          this.isskillcompleted = true;
          this.isskillnotstarted = false;
          this.isskillpending = false;
        } else {
          if (this.getdata[i].name == "Skillset" && this.getdata[i].colour == "#ECB50E") {
            this.isskillcompleted = false;
            this.isskillnotstarted = false;
            this.isskillpending = true;
          } else {
            if (this.getdata[i].name == "Skillset" && this.getdata[i].colour == "#A5A5A5") {
              this.isskillcompleted = false;
              this.isskillnotstarted = true;
              this.isskillpending = false;
            }
          }
        }
        if (this.getdata[i].name == "Resume" && this.getdata[i].colour == "#65AE12") {
          this.isresumecompleted = true;
          this.isresumepending = false;
          this.isresumenotstarted = false;
        } else {
          if (this.getdata[i].name == "Resume" && this.getdata[i].colour == "#ECB50E") {
            this.isresumecompleted = false;
            this.isresumepending = true;
            this.isresumenotstarted = false;
          } else {
            if (this.getdata[i].name == "Resume" && this.getdata[i].colour == "#A5A5A5") {
              this.isresumecompleted = false;
              this.isresumepending = false;
              this.isresumenotstarted = true;
            }
          }
        }
        if (this.getdata[i].name == "Project" && this.getdata[i].colour == "#65AE12") {
          this.isprojectcompleted = true;
          this.isprojectpending = false;
          this.isprojectnotstarted = false;
        }
        else {

          if (this.getdata[i].name == "Project" && this.getdata[i].colour == "#ECB50E") {
            this.isprojectcompleted = false;
            this.isprojectpending = true;
            this.isprojectnotstarted = false;
          } else {
            if (this.getdata[i].name == "Project" && this.getdata[i].colour == "#A5A5A5") {
              this.isprojectcompleted = false;
              this.isprojectpending = false;
              this.isprojectnotstarted = true;
            }
          }
        }
        if (this.getdata[i].name == "Education" && this.getdata[i].colour == "#65AE12") {
          this.iseducationcompleted = true;
          this.iseducationpending = false;
          this.iseducationnotstarted = false;
        }
        else {
          if (this.getdata[i].name == "Education" && this.getdata[i].colour == "#ECB50E") {
            this.iseducationcompleted = false;
            this.iseducationpending = true;
            this.iseducationnotstarted = false;
          } else {
            if (this.getdata[i].name == "Education" && this.getdata[i].colour == "#A5A5A5") {
              this.iseducationcompleted = false;
              this.iseducationpending = false;
              this.iseducationnotstarted = true;
            }
          }
        }
        if (this.getdata[i].name == "Social Info" && this.getdata[i].colour == "#65AE12") {
          this.issocialcompleted = true;
          this.issocialpending = false;
          this.issocialnotstarted = false;
        }
        else {
          if (this.getdata[i].name == "Social Info" && this.getdata[i].colour == "#ECB50E") {
            this.issocialcompleted = false;
            this.issocialpending = true;
            this.issocialnotstarted = false;
          } else {
            if (this.getdata[i].name == "Social Info" && this.getdata[i].colour == "#A5A5A5") {
              this.issocialcompleted = false;
              this.issocialpending = false;
              this.issocialnotstarted = true;
            }
          }
        }
        if (this.getdata[i].name == "Personal" && this.getdata[i].colour == "#65AE12") {
          this.ispersonalcompleted = true;
          this.ispersonalpending = false;
          this.ispersonalnotstarted = false;
        }
        else {
          if (this.getdata[i].name == "Personal" && this.getdata[i].colour == "#ECB50E") {
            this.ispersonalcompleted = false;
            this.ispersonalpending = true;
            this.ispersonalnotstarted = false;
          } else {
            if (this.getdata[i].name == "Personal" && this.getdata[i].colour == "#A5A5A5") {
              this.ispersonalcompleted = false;
              this.ispersonalpending = false;
              this.ispersonalnotstarted = true;
            }
          }
        }
      }
      for (var i = 0; i < this.datarelease.length; i++) {
        if (this.datarelease[i] == true) {
          this.isrelease = true
        } else {
          this.isrelease = false
        }
      }
      Chart.plugins.register(ChartDataLabels);
      var options = {
        tooltips: {
          enabled: false
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const datapoints = ctx.chart.data.datasets[0].data;
              const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
              const percentage = value / total * 100
              return this.datalabel[ctx.dataIndex].toUpperCase() + "\n";
            },
            color: '#fff',
            font: {
              size: 7,
              weight: 600
            }
          }
        }
      };
      let piedata = [
        {
          data: this.datacount,
          backgroundColor: this.datacolour,
        }
      ];
      var ctx = (document.getElementById("canvas") as any).getContext('2d');
      this.chart1 = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: piedata,
        },
        options: options,
        plugins: [ChartDataLabels],
      });
    }).catch((err) => { });
    this.applicantid = this.sessionService.getItem('applicantid');
    if (this.sessionService.getItem("role") == '1') {
      this.isadmin = true;
    };
    this.get_infography();
  };


  personal(event: any) {
    console.log("event", event);
    if (event == true) {
      this.showpersonal = false;
      this.showSkill = true;

      this.info_graphy = false;
      this.info_personal = false;
      this.info_skillset = true;
    }
  };

  skills(event: any) {
    console.log("event", event);
    if (event == true) {
      // this.showpersonal = false;
      this.showSkill = false;
      this.showeducation = true;

      this.info_skillset = false;
      // this.info_graphy = false;
      // this.info_personal = false;
      this.info_education = true
    }
  }

  education(event: any) {
    console.log("event", event);
    if (event == true) {
      // this.showpersonal = false;
      // this.showSkill = false;
      this.showeducation = false;
      this.showExperience = true;

      // this.info_skillset = false;
      // this.info_graphy = false;
      // this.info_personal = false;
      this.info_education = false;
      this.info_career = true;
    }
  }

  career(event: any) {
    console.log("event", event);
    if (event.addcareer == true) {
      // this.showpersonal = false;
      // this.showSkill = false;
      // this.showeducation = false;
      this.showExperience = false;
      this.showProject = true;

      // this.info_skillset = false;
      // this.info_graphy = false;
      // this.info_personal = false;
      // this.info_education = false;
      this.info_career = false;
      this.info_project = true;
    }
    else {
      // this.showpersonal = false;
      // this.showSkill = false;
      // this.showeducation = false;
      this.showExperience = false;
      this.showProject = true;

      // this.info_skillset = false;
      // this.info_graphy = false;
      // this.info_personal = false;
      // this.info_education = false;
      this.info_career = false;
      this.info_project = true;

      // this.certiCareer_unfill = true;
    }
  }

  project(event: any) {
    console.log("event", event);
    if (event.addproject == true) {
      // this.showpersonal = false;
      // this.showSkill = false;
      // this.showeducation = false;
      // this.showExperience = false;
      this.showProject = false;
      this.showCertification = true;

      // this.info_skillset = false;
      // this.info_graphy = false;
      // this.info_personal = false;
      // this.info_education = false;
      // this.info_career = false;
      this.info_project = false;
      this.info_certification = true;
    }
    else {
      // this.showpersonal = false;
      // this.showSkill = false;
      // this.showeducation = false;
      // this.showExperience = false;
      this.showProject = false;
      this.showCertification = true;

      //   this.info_skillset = false;
      //   this.info_graphy = false;
      //   this.info_personal = false;
      //   this.info_education = false;
      //   this.info_career = false;
      this.info_project = false;
      this.info_certification = true;
    }
  }

  certification(event: any) {
    console.log("event", event);
    if (event == true) {
      // this.showpersonal = false;
      // this.showSkill = false;
      // this.showeducation = false;
      // this.showExperience = false;
      this.showProject = false;
      this.showCertification = false;
      this.showNewApp_Dashboard = true;
      window.location.reload();


    }

  };

  get_infography() {
    debugger
    // this.personal_nodata = 0;
    // this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.pkcol).then((res:any) => {
    //   if(res.mstapplicantmaster.length != 0 || res.mstapplicantmaster.length != null || res.mstapplicantmaster.length != undefined)
    //   {
    //   this.personal_nodata = 1;
    //   }
    // });

    this.skill_nodata = 0;
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then((res: any) => {
      debugger
      if (res.mstapplicantskilldetail.length > 0) {
        this.skill_nodata = 1;        
      }

    });
    this.education_nodata = 0;
    this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then((res: any) => {
      debugger
      if (res.mstapplicanteducationdetail.length > 0) {
        this.education_nodata = 1;
      }

    });
    this.career_nodata = 0;
    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByApplicantID(this.applicantid).then((res: any) => {
      debugger
      if (res.mstapplicantcareerdetail.length > 0) {
        this.career_nodata = 1;
      }
    });
    this.achievement_nodata = 0;
    this.mstapplicantachivement_service.get_mstapplicantachievementdetails_ByApplicantID(this.applicantid).then((res: any) => {
      debugger
      if (res.mstapplicantachievementdetail.length > 0) {
        this.achievement_nodata = 1;
      }
    })
    this.project_nodata = 0;
    this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then((res: any) => {
      debugger
      if (res.mstapplicantworkreference.length > 0) {
        this.project_nodata = 1;
      }
    });



    if (this.skill_nodata == 0 && this.education_nodata == 0 && this.career_nodata == 0 && this.achievement_nodata == 0 && this.project_nodata == 0) {
      debugger
      // this.skill_filled = true
      this.personal_filled = true

    }

    if (this.skill_nodata == 1 && this.education_nodata == 1 && this.career_nodata == 0 && this.achievement_nodata == 0 && this.project_nodata == 0) {
      debugger
      this.education_filled = true
    }

    if (this.skill_nodata == 1 && this.education_nodata == 1 && this.career_nodata == 1 && this.achievement_nodata == 0 && this.project_nodata == 0) {
      debugger
      this.career_filled = true
    }

    if (this.skill_nodata == 1 && this.education_nodata == 1 && this.career_nodata == 1 && this.achievement_nodata == 1 && this.project_nodata == 0) {
      this.achevement_filled = true
    }
    if (this.skill_nodata == 1 && this.education_nodata == 1 && this.career_nodata == 1 && this.achievement_nodata == 0 && this.project_nodata == 1) {
      this.project_filled = true
    }

    if (this.skill_nodata == 1 && this.education_nodata == 1 && this.career_nodata == 0 && this.achievement_nodata == 1 && this.project_nodata == 1) {
      this.career_unfilled = true
    }

    if (this.skill_nodata == 1 && this.education_nodata == 1 && this.career_nodata == 1 && this.achievement_nodata == 0 && this.project_nodata == 1) {
      this.achevement_unfilled = true
    }



  }

  get_allData() {

    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByOrderPriority(this.applicantid).then((res: any) => {

      console.log("dashboard", res.mstapplicantskilldetail[0].subcategoryiddesc);

      this.Dashskill_desc = res.mstapplicantskilldetail[0].subcategoryiddesc;


      if (res.mstapplicantskilldetail.length > 0) {
        this.showNewApp_Dashboard = true;
      }
      this.sub_category = res.mstapplicantskilldetail;
      for (let i = 0; i < this.sub_category.length; i++) {
        this.skill_detail.push({
          strRating: this.sub_category[i].selfrating,
          subCategory: this.sub_category[i].subcategoryiddesc,
          skill_id: this.sub_category[i].subcategoryid,
          remarks: this.sub_category[i].remarks,
        });
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByExperience(this.applicantid, this.sub_category[i].subcategoryid).then((res: any) => {
          console.log('response check', res);
          let yR = 0; let mN = 0;
          for (let i = 0; i < res.length; i++) {
            this.skillfromDate = res[i].fromdate;
            this.skilltoDate = res[i].todate;
            this.EachExpresult = getDateDifference(new Date(this.skillfromDate), new Date(this.skilltoDate));
            yR += this.EachExpresult.years;
            mN += this.EachExpresult.months;


            console.log(yR + 'year month ' + mN);
          }
          this.checkDateError = yR + '.' + mN;

          if (this.EachExpresult && !isNaN(this.EachExpresult.years)) {
            this.checkDateError = this.checkDateError;
          }
          if (this.checkDateError == "NaN.NaN" || this.checkDateError == 0 || this.checkDateError == undefined || this.checkDateError == "null") {
            this.checkDateError = "0.0";
          }
          console.log('checkckekce', this.checkDateError);
          if (this.checkDateError && !isNaN(this.checkDateError)) {
            this.checkDateError = this.checkDateError;
          }
          if (this.checkDateError == "NaN.NaN" || this.checkDateError == 0 || this.checkDateError == undefined || this.checkDateError == "null") {
            this.checkDateError = "0.0";
          }

          for (let i = 0; i < this.skill_detail.length; i++) {
            if (this.skill_detail[i].strRating == 1) {
              this.showstr = '???'
            } else if (this.skill_detail[i].strRating == 2) {
              this.showstr = '??????'
            } else if (this.skill_detail[i].strRating == 3) {
              this.showstr = '?????????'
            } else if (this.skill_detail[i].strRating == 4) {
              this.showstr = '????????????'
            } else if (this.skill_detail[i].strRating == 5) {
              this.showstr = '???????????????'
            } else if (this.skill_detail[i].strRating == null) {
              this.showstr = ' '
            };

            let body = {
              "applicantid": this.applicantid,
              "skillid": this.skill_detail[0].skill_id
            };

            this.mstapplicantmaster_service.get_dashboardAll_details(body).then(res => {

              this.showhearder_Details = true;
              this.dashboard_details = [],
                this.dashboard_employementdetails = []
              this.expYrs = []
              this.dashboard_details.push(res);
              this.dashboard_reffreq_details = this.dashboard_details[0].list_dashboardreff.value;
              this.dashboard_employementdetails = this.dashboard_details[0].list_dashboardemployeement.value;
              this.dashboard_achievementdetails = this.dashboard_details[0].list_dashboarachievment.value;
              this.dashboard_projectdetails = this.dashboard_details[0].lis_dashboardproject.value;
              this.dashboard_educationdetails = this.dashboard_details[0].list_dashboareducation.value;

              let StartDate = this.dashboard_projectdetails[0]?.fromdate;
              let EndDate = this.dashboard_projectdetails[0]?.todate;

              this.EachskillExp = getDateDifference(new Date(StartDate), new Date(EndDate));

              if (this.EachskillExp && !isNaN(this.EachskillExp.years)) {
                this.skillDateError = this.EachskillExp.years + '.' + this.EachskillExp.months
              }
              if (this.skillDateError == "NaN" || this.skillDateError == 0 || this.skillDateError == undefined || this.skillDateError == "null") {
                this.skillDateError = "0.0";
              };
            });

          }
          if (res == "[]" || res.length == 0) {
            this.checkDateError = "0.0";
          } else {
            this.checkDateError = this.checkDateError;
          }
          this.finalarray.push({
            subCategory: this.skill_detail[i].subCategory,
            skillId: this.skill_detail[i].skill_id,
            remarks: this.skill_detail[i].remarks,
            showstr: this.showstr,
            ExpSkill: this.checkDateError
          });

        })
      };

      this.showDetails(this.finalarray[0].skillId, this.finalarray[0].subCategory, this.finalarray[0].remarks)

      function getDateDifference(startDate, endDate) {
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth();
        var startDay = startDate.getDate();

        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth();
        var endDay = endDate.getDate();

        // We calculate February based on end year as it might be a leep year which might influence the number of days.
        var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
        var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
        var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

        var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

        // (12 + ...) % 12 makes sure index is always between 0 and 11
        var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

        return {
          years: years,
          months: months,
          days: days
        };

      }

    });

  };

  showDetails(get_id: any, category: any, remarks: any) {

    this.sub_categorydesc = category;
    this.remarks = remarks.replace(/['"]+/g, '');
    let body = {
      "applicantid": this.applicantid,
      "skillid": get_id
    };
    this.mstapplicantmaster_service.get_dashboardAll_details(body).then(res => {
      this.showhearder_Details = true;
      this.dashboard_details = [],
        this.dashboard_employementdetails = []
      this.skillDateError = []
      this.dashboard_details.push(res);
      this.dashboard_reffreq_details = this.dashboard_details[0].list_dashboardreff.value;
      this.dashboard_employementdetails = this.dashboard_details[0].list_dashboardemployeement.value;
      this.dashboard_achievementdetails = this.dashboard_details[0].list_dashboarachievment.value;
      this.dashboard_projectdetails = this.dashboard_details[0].lis_dashboardproject.value;
      this.dashboard_educationdetails = this.dashboard_details[0].list_dashboareducation.value;

      let StartDate = this.dashboard_projectdetails[0]?.fromdate;
      let EndDate = this.dashboard_projectdetails[0]?.todate;

      this.EachskillExp = getDateDifference(new Date(StartDate), new Date(EndDate));

      console.log("this.EachskillExp", this.EachskillExp);

      if (this.EachskillExp && !isNaN(this.EachskillExp.years)) {
        this.skillDateError = this.EachskillExp.years + '.' + this.EachskillExp.months
      }
      if (this.skillDateError == "NaN" || this.skillDateError == 0 || this.skillDateError == undefined || this.skillDateError == "null") {
        this.skillDateError = "0.0";
      };
    });

    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByExperience(this.applicantid, get_id).then((res: any) => {
      console.log('response check', res);

      for (let i = 0; i < res.length; i++) {
        this.skillfromDate = res[i].fromdate;
        this.skilltoDate = res[i].todate;
      }
      this.EachExpresult = getDateDifference(new Date(this.skillfromDate), new Date(this.skilltoDate));

      if (this.EachExpresult && !isNaN(this.EachExpresult.years)) {
        this.checkDateError = this.EachExpresult.years + '.' + this.EachExpresult.months
      }
      if (this.checkDateError == "NaN" || this.checkDateError == 0 || this.checkDateError == undefined || this.checkDateError == "null") {
        this.checkDateError = "0.0";
      }
      console.log('checkckekce', this.checkDateError);

      if (res == "[]" || res.length == 0) {
        this.checkDateError = "0.0";
      } else {
        this.checkDateError = this.checkDateError;
      }
    })

    function getDateDifference(startDate, endDate) {
      var startYear = startDate.getFullYear();
      var startMonth = startDate.getMonth();
      var startDay = startDate.getDate();

      var endYear = endDate.getFullYear();
      var endMonth = endDate.getMonth();
      var endDay = endDate.getDate();

      // We calculate February based on end year as it might be a leep year which might influence the number of days.
      var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
      var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
      var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

      var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

      // (12 + ...) % 12 makes sure index is always between 0 and 11
      var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

      return {
        years: years,
        months: months,
        days: days
      };

    }
  }

  get_experience() {

    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByApplicantID(this.applicantid).then((res: any) => {

      for (let i = 0; i < res.mstapplicantcareerdetail.length; i++) {
        this.startDate = res.mstapplicantcareerdetail[i].fromdate;
        this.endDate = res.mstapplicantcareerdetail[i].todate;

        this.start_date = this.datepipe.transform(new Date(this.startDate), 'yyyy-MM-dd');
        this.end_date = this.datepipe.transform(new Date(this.endDate), 'yyyy-MM-dd');

        this.totalSkillExp = getDateDifference(new Date(this.start_date), new Date(this.end_date));

        if (this.totalSkillExp && !isNaN(this.totalSkillExp.years)) {
          this.overall_Exp = this.totalSkillExp.years + '.' + this.totalSkillExp.months
        }

        this.totalExperienceYrs.push(this.totalSkillExp.years)
        this.totalExperienceMonths.push(this.totalSkillExp.months)

        let years = 0
        let months = 0

        this.totalExperienceYrs.forEach(element => {
          years += element;
        });

        let getyears = years;

        this.totalExperienceMonths.forEach(element => {
          months += element;
        });

        let getmonths = months / 12;

        if (months > 12) {
          this.showexperience = true
          let totalExp = getyears + getmonths;
          this.totalExperience = totalExp.toFixed(1);
        } else {
          this.totalExperience2 = getyears + '.' + months;
        }

        if (this.totalExperience == "NaN" || this.totalExperience == 0 || this.totalExperience == undefined || this.totalExperience == "null") {
          this.totalExperience = "0.0";
        }
      }
    });

    function getDateDifference(startDate, endDate) {
      var startYear = startDate.getFullYear();
      var startMonth = startDate.getMonth();
      var startDay = startDate.getDate();

      var endYear = endDate.getFullYear();
      var endMonth = endDate.getMonth();
      var endDay = endDate.getDate();

      // We calculate February based on end year as it might be a leep year which might influence the number of days.
      var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
      var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
      var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

      var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

      // (12 + ...) % 12 makes sure index is always between 0 and 11
      var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

      return {
        years: years,
        months: months,
        days: days
      };

    }
  }

  showSkills() {
    this.dialog.open(mstapplicantskilldetailgridComponent,
      {
        width: '100% !important',
        height: 'auto !important',
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showmyProfile() {
    var showmyproid = "showMyPro";
    localStorage.setItem('showprofile', showmyproid);
    this.pageroute.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem('usersource')]);
  };

  showAttachment() {
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showGeography() {
    this.dialog.open(mstapplicantgeographygrid,
      {
        width: '100% !important',
        height: 'auto !important',
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showWorkRef() {
    this.dialog.open(mstapplicantworkrefgridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showcareer() {
    this.dialog.open(mstapplicantcareergridComponent, {
      width: '100% !important',
      height: '370px !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showEducation() {
    this.dialog.open(mstapplicanteducationdetailgridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showAchievement() {
    this.dialog.open(mstapplicantachivementgridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })

  };

  showSocial() {
    this.dialog.open(mstapplicantsocialmediagridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showLanguage() {
    this.dialog.open(mstapplicantlanuagegridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  edit_fullpagemstapplicantmasters() {

    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { showOpenfile: false, ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  edit_briefmstapplicantmasterss() {
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  showRefreq() {
    this.dialog.open(mstapplicantreferencegridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  uploadmethod() {

    this.dialog.open(mstresumeapplicantComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })

  };

  releasemethod(e: any) {

    let obj = {
      "applicantid": this.applicantid,
      "ReleaseStatus": e
    }

    this.mstapplicantmaster_service.release_method(obj).subscribe(res => {

      if (res == "Released Successfully") {
        this.toastr.addSingle("success", "", "Successfully Released");
        this.isrelease = true
      }
      else {
        this.toastr.addSingle("success", "", "Your profile is successfully revoked");
        this.isrelease = false
      }
    })
  };
}
