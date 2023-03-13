import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { LoaderService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/loader.service';
import { bomenumasterService } from '../../../../../../n-tire-biz-app/src/app/service/bomenumaster.service';
import { mstcorporatemasterService } from '../../../../../../n-tire-biz-app/src/app/service/mstcorporatemaster.service';
import { MenuItem } from '../../../../../../n-tire-biz-app/src/app/pages/core/models/menu-item.model';
import { Sidebar } from 'primeng/sidebar';
import { ApplicationStateService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/application-state.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnInit {

    menuItems: any = [];
    menuloaded: boolean = false;
    isMenuVisible: boolean;
    layout: any = 1;
    isMobileResolution: boolean = false;
    theme: string;
    loggedIn: boolean = false;
    sessiondata: any;
    menuhide = false;
    @ViewChild("menubar", { static: false }) menubar: Sidebar;



    constructor(private router: Router, private toastService: ToastService,
        private loaderService: LoaderService,
        private bomenumasterservice: bomenumasterService,
        private mstcorporatemasterservice: mstcorporatemasterService,
        private applicationStateService: ApplicationStateService,
        private sessionService: SessionService,
        private themeService: ThemeService,
        private sharedService: SharedService, private currentRoute: ActivatedRoute) {
        this.layout = this.sessionService.getItem("selected-layout");
        this.theme = this.sessionService.getItem("selected-theme");
    }
    OpenPage(e) {
        if (e.item.routerLink != null && e.item.routerLink != "") {
            console.log("layout" + e.item.id);
            this.sharedService.menuid = e.item.id;
            this.sharedService.menucode = e.item.menucode;
            this.sharedService.currenturl = e.item.routerLink;
            this.router.navigate(["" + e.item.routerLink]);
        }

    }
    ngOnInit() {
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });
    }


    async menuload() {
        let pkcorporateid;
        if (this.sessionService.getItem("role") == '1') {
            this.menuItems = [
                {

                    label: 'Masters',
                    icon: 'faicon-master',

                    items:
                        [
                            {
                                label: 'Company Master',
                                icon: 'icon-company',
                                routerLink: "home/boreportviewer/whwfe",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Master DataTypes',
                                icon: 'icon-masterdatatype',
                                routerLink: "home/boreportviewer/v2mgx",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Master Data',
                                icon: 'icon-masterdata',
                                routerLink: "home/boreportviewer/aj5qt",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Config Values',
                                icon: 'icon-configvalues',
                                routerLink: "home/boreportviewer/mfrqi",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'SubCategory Masters',
                                icon: 'icon-subcategorymasters',
                                routerLink: "home/boreportviewer/674",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Countries',
                                icon: 'icon-subcategorymasters',
                                routerLink: "home/boreportviewer/wc9rn",
                                command: (e) => { this.OpenPage(e); }
                            },

                            {
                                label: 'Segment Masters',
                                icon: 'icon-subcategorymasters',
                                routerLink: "home/boreportviewer/segmt",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Terms',
                                icon: 'icon-reports',
                                routerLink: "home/boreportviewer/terms",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                              label: 'KB Masters',
                              icon: 'icon-reports',
                              routerLink: "home/boreportviewer/y5q97",
                              command: (e) => { this.OpenPage(e); }
                          },
                            {
                              label: 'KB Topics',
                              icon: 'icon-reports',
                              routerLink: "home/boreportviewer/bokbt",
                              command: (e) => { this.OpenPage(e); }
                          },
                            {
                                label: 'User Master',
                                icon: 'icon-usermaster',
                                routerLink: "home/boreportviewer/e99kq",
                                command: (e) => { this.OpenPage(e); }
                            },

                            {
                                label: 'User Roles',
                                icon: 'icon-userroles',
                                routerLink: "home/boreportviewer/tnf39",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Templates',
                                icon: 'icon-templates',
                                routerLink: "home/boreportviewer/zkpxi",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Reports',
                                icon: 'icon-reports',
                                routerLink: "home/boreportviewer/zzhpb",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Dashboards',
                                icon: 'icon-settings',
                                routerLink: "home/boreportviewer/ybg3p",
                                command: (e) => { this.OpenPage(e); }
                            },

                        ]

                },
                {
                    label: 'Reports',
                    icon: 'faicon-skilldetails',
                    items:
                        [
                            {
                                label: 'Applicant Master',
                                icon: 'faicon-applicant',
                                routerLink: "home/boreportviewer/MAM",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Corporate Masters',
                                icon: 'icon-corporate',
                                routerLink: "home/boreportviewer/mcm",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'References',
                                icon: 'fasicon-references',
                                routerLink: "home/boreportviewer/arrA",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Opportunity Requirements',
                                icon: 'icon-applicantsearch',
                                routerLink: "home/boreportviewer/jobq",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Achievement Details',
                                icon: 'icon-achievement',
                                routerLink: "home/boreportviewer/aadl",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Career Details',
                                icon: 'icon-career',
                                routerLink: "home/boreportviewer/acdl",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Education Details',
                                icon: 'icon-education',
                                routerLink: "home/boreportviewer/aed",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Geography Preferences',
                                icon: 'icon-geography',
                                routerLink: "home/boreportviewer/agp",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Language Details',
                                icon: 'icon-languagedetails',
                                routerLink: "home/boreportviewer/ald",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Social Media Details',
                                icon: 'icon-socialmedia',
                                routerLink: "home/boreportviewer/ASMD",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Projects',
                                icon: 'icon-workreference',
                                routerLink: "home/boreportviewer/AWR",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Profile Access Details',
                                icon: 'icon-profileaccessdetails',
                                routerLink: "home/boreportviewer/psd",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Profile Completion Masters',
                                icon: 'icon-profilecompletionmasters',
                                routerLink: "home/boreportviewer/pcm",
                                command: (e) => { this.OpenPage(e); }
                            },
                        ]

                },

            ];
        }
        else if (this.sessionService.getItem("role") == '3') {

            await this.mstcorporatemasterservice.getListBy_userid(0 + this.sessionService.getItem("userid")).then(res => {
                pkcorporateid = res[0].pkcol;
            });
            this.menuItems = [
                {
                    label: 'Corporate',
                    icon: 'faicon-master',
                    items: [
                        {
                            label: 'Corporate Masters',
                            icon: 'icon-corporate',
                            routerLink: '/home/mstcorporatemasters/mstcorporatemasters/edit/' + pkcorporateid,
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Opportunity Requirements',
                            icon: 'icon-applicantsearch',
                            routerLink: "home/boreportviewer/jobqc",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Requested References',
                            icon: 'fasicon-references',
                            routerLink: "home/boreportviewer/arrA",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Skill Search',
                            icon: 'icon-skills',
                            routerLink: "newskillsearch",
                        }

                    ]
                },
                {
                    label: 'Reports',
                    icon: 'faicon-skilldetails',
                    items: [
                        {
                            label: 'Achievement Details',
                            icon: 'icon-achievement-details',
                            routerLink: "home/boreportviewer/aadl",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Career Details',
                            icon: 'icon-career-details',
                            routerLink: "home/boreportviewer/acdl",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Education Details',
                            icon: 'icon-education',
                            routerLink: "home/boreportviewer/aed",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Geography Preferences',
                            icon: 'icon-geography-references',
                            routerLink: "home/boreportviewer/agp",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Language Details',
                            icon: 'icon-languagedetails',
                            routerLink: "home/boreportviewer/ald",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Social Media Details',
                            icon: 'icon-socialmedia',
                            routerLink: "home/boreportviewer/ASMD",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Projects',
                            icon: 'icon-workreference',
                            routerLink: "home/boreportviewer/AWR",
                            command: (e) => { this.OpenPage(e); }
                        },
                    ]
                },
            ];
        }
        else if (this.sessionService.getItem("role") == '2') {
            this.menuItems = [
                {
                    label: 'Admin',
                    icon: 'faicon-master',
                    items: [
                        {
                            label: 'Applicant Master',
                            icon: 'faicon-applicant',
                            routerLink: 'home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem("usersource"),
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'References',
                            icon: 'fasicon-references',
                            routerLink: "home/boreportviewer/arrA",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Opportunity Statuses',
                            icon: 'icon-references',
                            routerLink: "home/boreportviewer/jobs",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Gallery',
                            icon: 'icon-applicantsearch',
                            routerLink: "home/gallery",
                            command: (e) => { this.OpenPage(e); }
                        },
                    ]
                }
            ];


        }

        this.menuloaded = true;

        //code added by dhana mar-17
        if (this.router.url == "/home") {
            if (this.sessionService.getItem("role") == '3' || this.sessionService.getItem("role") == '1') {
                this.router.navigate(['/home/corporatedashboard']);
            } else if (this.sessionService.getItem("role") == '2') {
                if (localStorage.getItem('user_type') != 'C') {
                    let pkcol = localStorage.getItem('pkcol');
                    this.router.navigate(['/home/bodashboardviewer/' + pkcol]);
                } else {
                    this.router.navigate(['home/boreportviewer/arrA']);
                }
            }
            else if (this.sessionService.getItem("role") == '1') {
                let pkcol = localStorage.getItem('pkcol');
                this.router.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + pkcol]);
            }
        }
    }

    async menuload1() {

        let res = await this.bomenumasterservice.get_bousermenumaster_List();
        if ((res as any).length == 0) {
            return;
        }
        let i = this.convert(res);
        this.menuItems = i;
        this.menuloaded = true;
    }
    ngAfterViewInit(): void {
        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != "") this.loggedIn = true;

        this.loaderService.display(true);

        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();

        if (this.router.url.indexOf("menu/hide") != -1) {
            this.menuhide = true;
        }

        if (!this.menuhide) this.menuload();

        if (this.isMobileResolution) {
            this.isMenuVisible = false;
        }
        else {
            this.isMenuVisible = true;
        }
        setTimeout(() => {
            this.loaderService.display(false);
        }, 1000);
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible
    }


    convert(array) {
        var map = {};
        for (var i = 0; i < array.length; i++) {
            var obj: MenuItem;
            obj = new MenuItem();
            obj.id = array[i].menuid;
            obj.menucode = array[i].menucode;
            obj.label = array[i].menudescription;
            obj.icon = array[i].iconname;
            let link = array[i].menuurl;


            obj.routerLink = link;
            obj.command = (e) => { this.OpenPage(e); };
            map[obj.id] = obj;


            var parent = array[i].parentid || '-';
            if (!map[parent]) {
                map[parent] = {
                    items: []
                };
            }
            if (map[parent].items == undefined || map[parent].items == null) {

                map[parent].items = [];
            }
            else {
            }

            map[parent].items.push(obj);
        }
        return map['-'].items;

    }
    topFunction() {
        if (document.getElementById("contentArea") != undefined) document.getElementById("contentArea1").scrollTop = 0;
    }

    selectTheme(theme: string) {
        this.sessionService.setItem("selected-theme", theme);
        this.themeService.selectTheme(theme);
        this.theme = theme;
    }

}
