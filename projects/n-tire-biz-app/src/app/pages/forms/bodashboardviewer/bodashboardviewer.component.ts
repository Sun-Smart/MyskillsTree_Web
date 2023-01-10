import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { mstapplicantskilldetailgridComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component';
import { mstapplicanteducationdetailgridComponent } from './../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationgrid.component';
import { mstapplicantgeographygrid } from './../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographygrid.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicDialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { mstapplicantworkrefgridComponent } from '../mstapplicantworkreference/mstapplicantworkrefgrid.component';
import { mstapplicantcareergridComponent } from '../mstapplicantcareerdetail/mstapplicantcareergrid.component';
import { mstapplicantsocialmediagridComponent } from '../mstapplicantsocialmediadetail/mstapplicantsocialmediagrid.component';
import { mstapplicantlanuagegridComponent } from '../mstapplicantlanguagedetail/mstapplicantlanguagegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { mstapplicantreferencerequestComponent } from '../mstapplicantreferencerequest/mstapplicantreferencerequest.component';
// import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ChartConfiguration } from 'chart.js';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantachievementdetailComponent } from '../mstapplicantachievementdetail/mstapplicantachievementdetail.component';
import { mstapplicantachivementgridComponent } from '../mstapplicantachievementdetail/mstapplicantachivementgrid.component';
import { ToastService } from '../../core/services/toast.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { mstapplicantmastermainComponent } from '../mstapplicantmaster/mstapplicantmastermain.component';
import { mstresumeapplicantComponent } from '../mstapplicantmaster/mstresumeapplicant.component';

@Component({
  selector: 'ngx-dashboardviewer',
  // template: `<div><canvas id="canvas"></canvas></div>`,
  styles: [` 
  /* #divChart {
    display: block;
    width: 400px;
    height: 400px;
  } */

  .skill_btn {
    width: 98%;
    margin: 0px !important;
    padding: 0px;
    text-align: left !important;
    border-radius: 0px !important;
  }

  .ref_btn2{
    background-color: #5B9BD5;
    color: #fff;
    border-radius: 0px;
  }
  .ref_btn1{
    background-color: #65AE12;
    color: #fff;
    border-radius: 0px;
  }



  .ref_btn {
    background-color: #ed7d31;
    color: #fff;
    border-radius: 0px;
  }

  .res_ref_btn {
    background-color: #a5a5a5;
    color: #fff;
    border-radius: 0px;
  }

  .pro_ref_btn {
    background-color: #ECB50E;
    color: #fff;
    border-radius: 0px;
  }

  .edu_ref_btn {
    background-color: #5B9BD5;
    color: #fff;
    border-radius: 0px;
  }

  .soc_ref_btn {
    background-color: #65AE12;
    color: #fff;
    border-radius: 0px;
  }

  .per_ref_btn {
    background-color: #ed7d31;
    color: #fff;
    border-radius: 0px;
  }

  .breadcrumb {
    background-color: transparent !important;
  }

  .breadcrumb li {
    display: inline-block;
    padding: 0;
    position: relative;
    min-width: 50px;
    height: fit-content;
    text-decoration: none;
    z-index: auto;
    -webkit-clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%);
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%);
    margin-right: -13px;
  }

  .breadcrumb li#last {
    -webkit-clip-path: polygon(0 0, calc(100% - 0px) 0, 100% 50%, calc(100% - 0px) 100%, 0 100%, 15px 50%);
    clip-path: polygon(0 0, calc(100% - 0px) 0, 100% 50%, calc(100% - 0px) 100%, 0 100%, 15px 50%);
  }

  .breadcrumb li:hover {
    color: white;
    background: #fff;
  }

  .breadcrumb li:first-child {
    -webkit-clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);
  }

  .tabbed {
    overflow-x: hidden;
  }

  .tabbed [type="radio"] {
    display: none;
  }

  .tab {
    margin-bottom: 1px !important;
  }

  .tabs {
    display: flex;
    align-items: stretch;
    list-style: none;
    padding: 0;
    /* border-bottom: 1px solid #ccc; */
  }

  .tab>label {
    display: block;
    /* margin-bottom: -1px; */
    padding: 12px 15px;
    /* border: 1px solid #ccc; */
    background: #eee;
    color: #666;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    /* letter-spacing: 1px; */
    cursor: pointer;
    /* transition: all 3s; */
  }

  .tab:hover label {
    /* border-top-color: gray; */
    color: #333;
  }

  .tab-content {
    display: none;
    color: #777;
  }

  .tabbed [type="radio"]:nth-of-type(1):checked~.tabs .tab:nth-of-type(1) label,
  .tabbed [type="radio"]:nth-of-type(2):checked~.tabs .tab:nth-of-type(2) label,
  .tabbed [type="radio"]:nth-of-type(3):checked~.tabs .tab:nth-of-type(3) label,
  .tabbed [type="radio"]:nth-of-type(4):checked~.tabs .tab:nth-of-type(4) label,
  .tabbed [type="radio"]:nth-of-type(5):checked~.tabs .tab:nth-of-type(5) label,
  .tabbed [type="radio"]:nth-of-type(6):checked~.tabs .tab:nth-of-type(6) label,
  .tabbed [type="radio"]:nth-of-type(7):checked~.tabs .tab:nth-of-type(7) label {
    /* border-bottom-color: #fff; */
    /* border-top-color: gray; */
    border-top: 5px solid green;
    /* border-bottom: 5px solid green; */
    /* line-height: 34px;
    margin-bottom: 10px; */
    /* border: 5px solid #000 !important; */
    /* transform: scale(2); */
    /* font-size: 10px; */
    /* width: 140px; */
    background: #fff;
    color: #222;
  }

  .tabbed [type="radio"]:nth-of-type(1):checked~.tab-content:nth-of-type(1),
  .tabbed [type="radio"]:nth-of-type(2):checked~.tab-content:nth-of-type(2),
  .tabbed [type="radio"]:nth-of-type(3):checked~.tab-content:nth-of-type(3),
  .tabbed [type="radio"]:nth-of-type(4):checked~.tab-content:nth-of-type(4),
  .tabbed [type="radio"]:nth-of-type(5):checked~.tab-content:nth-of-type(5),
  .tabbed [type="radio"]:nth-of-type(6):checked~.tab-content:nth-of-type(6),
  .tabbed [type="radio"]:nth-of-type(7):checked~.tab-content:nth-of-type(7) {
    display: block;
  }
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
  // labels: any = [];
  datalabel: any = [];
  datacolour: any = [];
  dataod: any[] = [];
  datacount: any[] = []; getdata: any;
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

  iscompleted: boolean = false;
  ispending: boolean = false;
  isnotstarted: boolean = false;
  appli_id: any;
  constructor(private sharedService: SharedService, public dialogRef: DynamicDialogRef, private toastr: ToastService, public dialog: DialogService, private mstapplicantmaster_service: mstapplicantmasterService, private currentRoute: ActivatedRoute, private pageroute: Router, private sessionService: SessionService) {
    debugger;
    this.applicantid = this.sessionService.getItem("applicantid");
    this.appli_id = this.sessionService.getItem("applicantid");
  }
  ngOnInit() {
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
    this.sessionService.setItem("attachedsaved", "true")

    // if (this.data != null && this.data.data != null) {
    //   this.data = this.data.data;
    // }
    // this.pkcol = this.data.maindatapkcol;

    this.mstapplicantmaster_service.get_profilecompletionsecond(this.appli_id).then(res => {
      debugger;
      console.log(res);
      this.getdata = res;


      for (let i = 0; i < this.getdata.length; i++) {
        this.datalabel.push(this.getdata[i].name)
        this.datacount.push(this.getdata[i].cnt);
        this.datacolour.push(this.getdata[i].colour);
        this.dataod.push(this.getdata[i].od);
        this.datarelease.push(this.getdata[i].releasestatus)
        debugger

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
              // return this.datalabel[ctx.dataIndex].toUpperCase() + "\n" + this.datacount[ctx.dataIndex]
              return this.datalabel[ctx.dataIndex].toUpperCase() + "\n";
              // [ctx.dataIndex].toUpperCase() + "\n" + percentage.toFixed(2) + "%";
            },
            color: '#fff',
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
          // labels: ['Completed', 'In-complete'],
          datasets: piedata,

        },

        options: options,

        plugins: [ChartDataLabels],
      });

    }).catch((err) => { console.log(err); });
    // this.applicantid = this.currentRoute.snapshot.paramMap.get('id');
    this.applicantid = this.sessionService.getItem('applicantid');
    if (this.sessionService.getItem("role") == '1') {
      this.isadmin = true;
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
  }
  // suneel2
  showmyProfile() {
    debugger;
    var showmyproid = "showMyPro";
    localStorage.setItem('showprofile', showmyproid);
    this.pageroute.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem('usersource')]);
    // this.pageroute.navigate(['/home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.applicantid]);
  }
  showAttachment() {
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
    // var attachmentid = "attachmentTab";
    // localStorage.setItem('attachmentTabname', attachmentid);
    // this.pageroute.navigate(['/home/mstapplicantmasters/mstapplicantmasters/edit/' + this.sessionService.getItem('usersource')]);
    // localStorage.removeItem('fullName');
    // localStorage.removeItem('fullName');
  }
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
  }
  showWorkRef() {
    this.dialog.open(mstapplicantworkrefgridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  showcareer() {
    this.dialog.open(mstapplicantcareergridComponent, {
      width: '100% !important',
      height: '60% !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  showEducation() {
    this.dialog.open(mstapplicanteducationdetailgridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  showAchievement() {
    this.dialog.open(mstapplicantachivementgridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })

  }
  showSocial() {
    this.dialog.open(mstapplicantsocialmediagridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  showLanguage() {
    this.dialog.open(mstapplicantlanuagegridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  edit_fullpagemstapplicantmasters() {
    debugger
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
    // this.dialog.open(mstapplicantmastermainComponent,
    //   {
    //     width: '100% !important',
    //     height: 'auto !important',
    //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    //   }
    // )
    // var fullpageid = "fullpage";
    // localStorage.setItem('fullName', fullpageid);
    // this.pageroute.navigate(['/home/mstapplicantmasters/mstapplicantmastersmain/edit/'  +  this.sharedService.pk_encode(this.sessionService.getItem('usersource'))]);
  }

  // suneel1
  edit_briefmstapplicantmasterss() {
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
    // var resumeid = "resumeTab";
    // localStorage.setItem('resumeTabname', resumeid);
    // this.pageroute.navigate(['/home/mstapplicantmasters/mstapplicantmasters/edit/' + this.sharedService.pk_encode(this.sessionService.getItem('usersource'))]);
    // localStorage.removeItem('fullName');
    // localStorage.removeItem('attachmentTabname');
  }
  showRefreq() {
    this.dialog.open(mstapplicantreferencegridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  ngAfterViewInit() {

  }


  //dhana
  uploadmethod() {
    debugger
    this.dialog.open(mstresumeapplicantComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
    // this.dialog.open(mstapplicantmastermainComponent,
    //   {
    //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    //   }
    // )
    // var resumeid = "resumeTabupload";
    // localStorage.setItem('resumeTabname', resumeid);

    // this.pageroute.navigate(['/home/mstapplicantmasters/mstapplicantmasters/edit/' + this.applicantid]);
    // localStorage.removeItem('fullName');
    // localStorage.removeItem('attachmentTabname');

  }

  releasemethod(e: any) {
    debugger

    let obj = {
      "applicantid": this.applicantid,
      "ReleaseStatus": e
    }

    debugger

    this.mstapplicantmaster_service.release_method(obj).subscribe(res => {
      debugger
      console.log(res)
      //need ngoninit api result need to arrange release status
      // need result for status=false

      if (res == "Released Successfully") {
        this.toastr.addSingle("success", "", "Successfully Released");
        this.isrelease = true
      }
      else {
        this.toastr.addSingle("success", "", "Your profile is successfully revoked");
        this.isrelease = false
      }

    })
  }
}
