import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { UserIdleService } from 'angular-user-idle';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { UserContextService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
import { botaskService } from '../../../../../../n-tire-biz-app/src/app/service/botask.service';
import { DialogService } from 'primeng/dynamicDialog';
import { lmstaskComponent } from '../../../../../../n-tire-biz-app/src/app/pages/forms/lmstask/lmstask.component';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { bousermasterService } from './../../../service/bousermaster.service';
import { ToastService } from '../../core/services/toast.service';
import { mstapplicantmastermainComponent } from '../../forms/mstapplicantmaster/mstapplicantmastermain.component';
import { mstapplicantskilldetailgridComponent } from '../../forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component';
import { mstapplicantgeographygrid } from '../../forms/mstapplicantgeographypreference/mstapplicantgeographygrid.component';
import { mstresumeapplicantComponent } from '../../forms/mstapplicantmaster/mstresumeapplicant.component';
import { mstapplicantcareergridComponent } from '../../forms/mstapplicantcareerdetail/mstapplicantcareergrid.component';
import { mstapplicantworkrefgridComponent } from '../../forms/mstapplicantworkreference/mstapplicantworkrefgrid.component';
import { mstapplicanteducationdetailgridComponent } from '../../forms/mstapplicanteducationdetail/mstapplicanteducationgrid.component';
import { mstapplicantachivementgridComponent } from '../../forms/mstapplicantachievementdetail/mstapplicantachivementgrid.component';
import { mstapplicantsocialmediagridComponent } from '../../forms/mstapplicantsocialmediadetail/mstapplicantsocialmediagrid.component';
import { mstapplicantlanuagegridComponent } from '../../forms/mstapplicantlanguagedetail/mstapplicantlanguagegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { mstcorporatemasterService } from '../../../service/mstcorporatemaster.service';
import { NewskillsearchComponent } from '../../forms/newskillsearch/newskillsearch.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuItems: any[];
  user: any;
  menuhide: boolean = false;
  username: any;
  userrole: any;
  userData: any;
  items: any[];
  userphoto: any;
  displayNotifications: boolean;
  showNotify: boolean = false;
  notifications: any = [];
  menuvisible: boolean = true;
  loggedIn: boolean = false;
  @Output() toggleMenubar: EventEmitter<any> = new EventEmitter();

  @ViewChild('showsearchbar') showsearchbar: NewskillsearchComponent;
  theme: string;
  _start: boolean;
  actionid: any;
  userid: any;
  notificationDelete: any = [];
  showheader: boolean = true;
  showmenulist: boolean = false;
  showhideProfile: boolean = false;
  applicantid: any;
  getdata: any;
  datarelease: any = [];
  showApplicantmenu: boolean = false;
  showAdminMenuaccess: boolean = false;
  showCorporateMenuaccess: boolean = false;
  hideCorporatePage: boolean = false;
  appmenu: boolean;
  menuhides: boolean;
  showCertifiermenu: boolean = false;
  applicanticon: boolean = false;
  corporateicon: boolean = false;
  adminicon: boolean = false;
  mobilenumber: any;
  email: any;
  showApplicantAccount: boolean;
  email_id: any;
  usersource: any;
  showmobilenumber: boolean;
  isrelease: boolean;
  pkcorporateid: any;
  show_dashboard: boolean = true;


  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    public sessionService: SessionService,
    private mstapplicantmaster_service: mstapplicantmasterService,
    private userIdle: UserIdleService,
    private themeService: ThemeService,
    private userContextService: UserContextService,
    private botaskservice: botaskService,
    public dialog: DialogService,
    private sharedService: SharedService,
    private bousermasterservice: bousermasterService,
    private toastService: ToastService,
    private pageroute: Router, private mstcorporatemasterservice: mstcorporatemasterService
  ) {
    this.displayNotifications = false;
    this.userid = this.sessionService.getItem('userid');
    this.theme = this.sessionService.getItem("selected-theme");
    this.usersource = this.sessionService.getItem("usersource");
    this.applicantid = this.sessionService.getItem("applicantid");

    if (this.theme) {
      this.selectTheme(this.theme);
    }
  }
  openApplicant() {
    this.menuhide = false;
    this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("usersource")]);

  }
  openJobs() {
    this.menuhide = false;
    this.sharedService.currenturl = "home/boreportviewer/jobs";
    this.router.navigate(["home/boreportviewer/jobs"]);
  }
  openReference() {
    debugger
    this.menuhide = false;
    this.sharedService.currenturl = "home/boreportviewer/arrA";
    this.router.navigate(["home/boreportviewer/arrA"]);
  }
  openGallery() {
    this.menuhide = false;
    this.sharedService.currenturl = "home/gallery";
    this.router.navigate(["home/gallery"]);
  }
  ngOnInit() {

    this.showNotify = false;
    this.user = this.sessionService.getSession();

    this.bousermasterservice.get_bousermasters_ByEID(this.user.pkcol).then(res => {

      this.userData = res.bousermaster;
      console.log(this.userData)

      let jsonUser = JSON.parse(this.userData.userphoto);
      if (jsonUser.length > 0) this.userphoto = jsonUser[0].name;
    }).catch((err) => {
    });

    this.theme = this.sessionService.getItem('selected-theme');
    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });

    this.email = this.sessionService.getItem('email');
    this.email_id = this.sessionService.getItem('emailid');
    this.mobilenumber = this.sessionService.getItem('mobilenumber');
    if (this.sessionService.getItem('mobilenumber') == "" || this.sessionService.getItem('mobilenumber') == null) {
      this.showmobilenumber = false;
    } else {
      this.showmobilenumber = true;
    }

    this.username = this.sessionService.getItem('username');
    if (this.sessionService.getItem('role') == '1') {
      this.userrole = 'Admin';
      this.showAdminMenuaccess = true;
      this.showApplicantmenu = false;
      this.showCorporateMenuaccess = false;
      this.showApplicantAccount = false;
      this.applicanticon = false;
      this.adminicon = true;
      this.corporateicon = false;

    } else if (this.sessionService.getItem('role') == '2') {
      this.userrole = 'Applicant';
      this.showApplicantmenu = true;
      this.showAdminMenuaccess = false;
      this.showCorporateMenuaccess = false;
      this.showApplicantAccount = true;
      this.applicanticon = true;
      this.adminicon = false;
      this.corporateicon = false;

      if (localStorage.getItem('user_type') == "C") {
        this.showCertifiermenu = true;
      }
    } else if (this.sessionService.getItem('role') == '3') {
      this.userrole = 'Corporate';
      this.showCorporateMenuaccess = true;
      this.showApplicantmenu = false;
      this.showAdminMenuaccess = false;
      this.applicanticon = false;
      this.adminicon = false;
      this.showApplicantAccount = false;
      this.corporateicon = true;
    }
    if (this.sessionService.getItem('role') == '2') this.menuvisible = false;
    this.botaskservice.get_botasks_List(this.userid).then((res: any) => {
      this.notifications = res;
      for (let i = 0; i <= this.notifications.length; i++) {
        this.notifications[i]['taskid'] = this.notifications[i]?.value;
        this.notificationDelete.push(this.notifications[i]);
      }
    });

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.logout();
    });


    let result = this.router.routerState.snapshot.url.match("mstapplicantreferencerequestsaccepted")
    if (result[0] == "mstapplicantreferencerequestsaccepted") {
      this.showheader = false;
    } else {
      this.showheader = true;
    }

    let result1 = this.router.routerState.snapshot.url.match("newskillsearch");
    if (result1[0] == "newskillsearch") {
      this.hideCorporatePage = false;
    } else {
      this.hideCorporatePage = true;
    };

  };

  delteNotify(value) {
    this.botaskservice.deleteNotification(value).subscribe(((res) => {
      this.toastService.addSingle('Success', '', 'Notification Deleted');
      this.ngOnInit();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }), (error) => {
    })
  }


  logout() {
    this.toastService.addSingle("success", "", "Logout successfully.");
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.userContextService.logout();
    localStorage.clear();
    localStorage.removeItem('applicantid')
    localStorage.removeItem('pkcol')
    localStorage.removeItem('countrycode')
    localStorage.removeItem('role')
    localStorage.removeItem('userid')
    localStorage.removeItem('ng-prime-language')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('usersource')
    localStorage.removeItem('username')
    localStorage.removeItem("choosefileforprofile");
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['/login']);

  }
  getText(ret) {
    ret = String(ret).replace(new RegExp('&lt;', 'g'), '<');
    ret = String(ret).replace(new RegExp('&gt;', 'g'), '>');
    return ret;
  }

  showNotificationSidebar() {
    this.displayNotifications = true;
    this.showNotify = true;
    this.menuhides = false;
    this.menuhide = false;
    this.showhideProfile = false;
  }
  ShowTask(notification: any) {

    this.showNotificationSidebar();
  }
  toggleMenu() {
    this.toggleMenubar.emit();
  }
  showTaskDialog() {

    let add = true;
    this.dialog.open(lmstaskComponent,
      {
        data: { showview: false, save: true, ScreenType: 2 },
        header: 'Tasks'
      }
    ).onClose.subscribe((res: any) => {
    });
  }
  selectTheme(theme: string) {

    this.sessionService.setItem("selected-theme", theme);
    this.themeService.selectTheme(theme);
    this.theme = theme;
  }
  closeicon() {
    this.showmenulist = false;
  }
  showMenus() {
    this.showmenulist = !this.showmenulist;
    this.appmenu = true;
    this.showhideProfile = false;
    if (localStorage.getItem('user_type') == "C") {
      this.showCertifiermenu = true;
    } else {
      this.showCertifiermenu = false;
    }
  }
  showProfileDetails() {
    this.showhideProfile = !this.showhideProfile;
    this.showmenulist = false;
    this.menuhides = false;
    this.menuhide = false;
    this.displayNotifications = false;
  }
  showProfile() {
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  closePopup(data) {
    if (data == 'p') {
      this.showhideProfile = false
      this.showmenulist = false;
    } else {
      this.menuhide = false;
      this.showhideProfile = false;
      this.showmenulist = false;
    }
  }
  openpopup() {
    this.menuhide = true;
    this.displayNotifications = false;
    this.showNotify = false;
    this.showhideProfile = false;
  }

  openpopups() {
    this.menuhides = true;
    this.showhideProfile = false;

  }
  closePopups() {
    this.menuhides = false;
    this.showhideProfile = false;
  }

  gotoSkillSearch() {
    this.router.navigate(['/home/newskillsearch']);
  }


  //  sowmiya dropdown menu routing
  showSkills() {

    this.dialog.open(mstapplicantskilldetailgridComponent,
      {
        width: '100% !important',
        height: 'auto !important',
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    });
    this.menuhides = false;
  };


  showGeography() {
    this.dialog.open(mstapplicantgeographygrid,
      {
        width: '100% !important',
        height: 'auto !important',
        contentStyle: 'mobileView',
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };

  uploadmethod() {
    debugger
    this.dialog.open(mstresumeapplicantComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  };
  showcareer() {
    this.dialog.open(mstapplicantcareergridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
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

  edit_fullpagemstapplicantmasters() {

    let data = {
      updateProfile : "yes"
    }
    this.router.navigate(['home/personaldetails'])
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

  closeNotify() {
    this.showNotify = false;
  };

  corporate_data() {
    this.menuhide = false;

    this.mstcorporatemasterservice.getListBy_userid(0 + this.sessionService.getItem("userid")).then(res => {
      this.pkcorporateid = res[0].pkcol;
      this.router.navigate(['/home/mstcorporatemasters/mstcorporatemasters/edit/' + this.pkcorporateid])
    });

  };

  dashboard() {
    if (this.sessionService.getItem('role') == '2') {
      this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("usersource")]);
    }
    else {
      this.router.navigate(['/home/corporatedashboard']);
    }
  }

  showmyProfile() {
    var showmyproid = "showMyPro";
    localStorage.setItem('showprofile', showmyproid);

    this.pageroute.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem('usersource')], { queryParams: { show: this.show_dashboard } });
  }

  skillWizard() {
    this.router.navigate(['/home/personaldetails']);
  }

  releasemethod(e: any) {
    let obj = {
      "applicantid": this.applicantid,
      "ReleaseStatus": e
    };
    this.mstapplicantmaster_service.release_method(obj).subscribe(res => {

      if (res == "Released Successfully") {
        this.toastService.addSingle("success", "", "Successfully Released");
        this.isrelease = true
      }
      else {
        this.toastService.addSingle("success", "", "Your profile is successfully revoked");
        this.isrelease = false
      }

    })
  }

}
