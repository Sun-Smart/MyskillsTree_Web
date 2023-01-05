import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
//import { User } from '../../core/models/user.model';
import { notification } from '../../core/models/notification.model';
import { UserIdleService } from 'angular-user-idle';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { UserContextService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
import { botaskService } from '../../../../../../n-tire-biz-app/src/app/service/botask.service';
import { DialogService } from 'primeng/dynamicDialog';

import { lmstask } from '../../../../../../n-tire-biz-app/src/app/model/lmstask.model';
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
  theme: string;
  _start: boolean;
  actionid: any;
  userid: any;
  notificationDelete: any = [];
  showheader: boolean = true;
  showmenulist: boolean = false;
  showhideProfile: boolean = false;
  applicantid: any;
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
  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    public sessionService: SessionService,
    private userIdle: UserIdleService,
    private themeService: ThemeService,
    private userContextService: UserContextService,
    private botaskservice: botaskService,
    public dialog: DialogService,
    private sharedService: SharedService,
    private bousermasterservice: bousermasterService,
    private toastService: ToastService,
    private pageroute: Router,
  ) {
    //debugger;

    this.displayNotifications = false;
    this.userid = this.sessionService.getItem('userid');
    this.theme = this.sessionService.getItem("selected-theme");
    this.applicantid = this.sessionService.getItem("applicantid");
    //this.theme ='cruze';
    if (this.theme) {
      this.selectTheme(this.theme);
    }
  }
  openApplicant() {
    debugger
    //
    //"home/boreportviewer/arrA"
    // this.sharedService.currenturl = 'home/bodashboardviewer/bodashboardviewer/';
    this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("usersource")]);
    // this.sharedService.currenturl = 'home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem("usersource");
    // this.router.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem("usersource")]);

  }
  openJobs() {
    this.sharedService.currenturl = "home/boreportviewer/jobs";
    this.router.navigate(["home/boreportviewer/jobs"]);
  }
  openReference() {
    debugger
    this.sharedService.currenturl = "home/boreportviewer/arrA";
    this.router.navigate(["home/boreportviewer/arrA"]);
  }
  openGallery() {
    this.sharedService.currenturl = "home/gallery";
    this.router.navigate(["home/gallery"]);
  }
  ngOnInit() {

    //debugger;
    this.showNotify = false;
    this.user = this.sessionService.getSession();

    this.bousermasterservice.get_bousermasters_ByEID(this.user.pkcol).then(res => {

      this.userData = res.bousermaster;
      console.log(this.userData)
      let jsonUser = JSON.parse(this.userData.userphoto);
      if (jsonUser.length > 0) this.userphoto = jsonUser[0].name;
    }).catch((err) => {
      //console.log(err);
    });

    this.theme = this.sessionService.getItem('selected-theme');
    this.themeService.theme.subscribe((val: string) => {
      //debugger;
      this.theme = val;
    });
    this.mobilenumber = this.sessionService.getItem('mobilenumber');
    this.email = this.sessionService.getItem('email');

    this.username = this.sessionService.getItem('username');
    if (this.sessionService.getItem('role') == '1') {
      this.userrole = 'Admin';
      this.showAdminMenuaccess = true;
      this.showApplicantmenu = false;
      this.showCorporateMenuaccess = false;

      this.applicanticon = false;
      this.adminicon = true;
      this.corporateicon = false;

    } else if (this.sessionService.getItem('role') == '2') {
      this.userrole = 'Applicant';
      this.showApplicantmenu = true;
      this.showAdminMenuaccess = false;
      this.showCorporateMenuaccess = false;

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
      this.corporateicon = true;
    }
    if (this.sessionService.getItem('role') == '2') this.menuvisible = false;
    /*
    for (var i = 1; i <= 5; i++) {
        var notificationObj = new notification("Message " + i, new Date(), null)
        this.notifications.push(notificationObj);
    }*/
    this.botaskservice.get_botasks_List(this.userid).then((res: any) => {
      debugger;
      this.notifications = res;
      for (let i = 0; i <= this.notifications.length; i++) {
        this.notifications[i]['taskid'] = this.notifications[i]?.value;
        this.notificationDelete.push(this.notifications[i]);
      }
    });

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
      //console.log(count)
    }
    );

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Session Timeout');
      this.logout();
    });

    /////////////

    this.items = [

      {
        label: 'Recents', icon: 'fa fa-fw fa-soccer-ball-o',
        items: [
          [
            {
              label: 'Procurement',
              items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
            },
            {
              label: 'Legal',
              items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
            },
          ],
          [
            {
              label: 'CRM',
              items: [{ label: 'Sports 3.1' }, { label: 'Sports 3.2' }]
            },
            {
              label: 'DMS',
              items: [{ label: 'Sports 4.1' }, { label: 'Sports 4.2' }]
            }
          ],
          [
            {
              label: 'Project Management',
              items: [{ label: 'Sports 5.1' }, { label: 'Sports 5.2' }]
            },
            {
              label: 'Property Management',
              items: [{ label: 'Sports 6.1' }, { label: 'Sports 6.2' }]
            }
          ]
        ]
      }
    ];


    ///////////


    let result = this.router.routerState.snapshot.url.match("mstapplicantreferencerequestsaccepted")
    // console.log(result[0]);
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
    }
  }
  delteNotify(value) {
    this.botaskservice.deleteNotification(value).subscribe(((res) => {
      this.toastService.addSingle('Success', '', 'Notification Deleted');
      this.ngOnInit();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }), (error) => {
      console.log(error);
    })
  }


  logout() {
    this.toastService.addSingle("success", "", "Logout successfully.");
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.userContextService.logout();
    // localStorage.clear();
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
    // ret = ret.replace(new RegExp('&lt;', 'g'),'<');
    // ret = ret.replace(new RegExp('&gt;', 'g'),'>');
    return ret;
  }

  showNotificationSidebar() {
    this.displayNotifications = true;
    this.showNotify = true;
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
    //debugger;

    this.sessionService.setItem("selected-theme", theme);
    this.themeService.selectTheme(theme);
    this.theme = theme;
    /*
    theme="luna-pink";
            var elem=document.getElementById('themeAsset') as HTMLLinkElement ;
            elem.href = 'node_modules/primeng/resources/themes/'+theme+'/theme.css';
           */
  }
  closeicon() {
    debugger
    // this.appmenu=false
    this.showmenulist = false;
    // this.showApplicantmenu = false;
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
    debugger
    if (data == 'p') {
      this.showhideProfile = false
      this.showmenulist = false;
    } else {
      this.menuhide = false;
      this.showhideProfile = false;
      this.showmenulist = false;
    }
    //  else{
    // this.menuhide=false
    // }
  }
  openpopup() {
    debugger
    this.menuhide = true
  }

  openpopups() {
    this.menuhides = true
  }
  closePopups() {
    this.menuhides = false;
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
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  uploadmethod() {
    debugger
    this.dialog.open(mstresumeapplicantComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
      this.pageroute.routeReuseStrategy.shouldReuseRoute = () => false;
    })
  }
  showcareer() {
    this.dialog.open(mstapplicantcareergridComponent, {
      width: '100% !important',
      height: 'auto !important',
      data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    }).onClose.subscribe(res => {
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
  edit_fullpagemstapplicantmasters() {
    debugger
    this.dialog.open(mstapplicantmastermainComponent,
      {
        data: { ScreenType: 2, applicantid: this.applicantid, save: true }
      }
    ).onClose.subscribe(res => {
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
  closeNotify() {
    this.showNotify = false;
  }
}
