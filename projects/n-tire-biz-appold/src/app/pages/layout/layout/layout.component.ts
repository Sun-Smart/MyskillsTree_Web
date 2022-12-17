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
        //this.theme = "omega";
        //this.sessionService.setItem("selected-theme", this.theme);


        this.theme = this.sessionService.getItem("selected-theme");
        //this.theme ='cruze';
        /*
        if (this.theme) {
            this.selectTheme(this.theme);
        }
        */
    }
    OpenPage(e) {
        //debugger;
        if (e.item.routerLink != null && e.item.routerLink != "") {
            console.log("layout" + e.item.id);
            this.sharedService.menuid = e.item.id;
            this.sharedService.menucode = e.item.menucode;
            this.sharedService.currenturl = e.item.routerLink;
            this.router.navigate(["" + e.item.routerLink]);
        }

    }
    ngOnInit() {
        debugger;
        /*
        ////debugger;
        this.loaderService.display(true);
        this.toastService.addSingle("success", "", "Login successfully.");
        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();


        this.menuload();

        if (this.isMobileResolution) {
            this.isMenuVisible = false;
        }
        else {
            this.isMenuVisible = true;
        }
*/
        //debugger;

        this.themeService.theme.subscribe((val: string) => {
            //debugger;
            this.theme = val;
        });


    }


    async menuload() {
        //debugger;
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
                                label: 'Menu Master',
                                icon: 'icon-menu',
                                routerLink: "home/boreportviewer/urtra",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Menu Actions',
                                icon: 'icon-actions',
                                routerLink: "home/boreportviewer/mnact",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Financial Years',
                                icon: 'icon-financialyears',
                                routerLink: "home/boreportviewer/661",
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
                    label: 'Skill Tree',
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
                                label: 'Job Requirements',
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
                                label: 'Reference Details',
                                icon: 'icon-referencedetails',
                                routerLink: "home/boreportviewer/mrdl",
                                command: (e) => { this.OpenPage(e); }
                            },
                            // {
                            //     label: 'Reference Requests',
                            //     icon: 'icon-referencerequests',
                            //     routerLink: "home/boreportviewer/arr",
                            //     command: (e) => { this.OpenPage(e); }
                            // },
                            {
                                label: 'Skill Details',
                                icon: 'icon-skilldetails',
                                routerLink: "home/boreportviewer/sdt",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Social Media Details',
                                icon: 'icon-socialmedia',
                                routerLink: "home/boreportviewer/ASMD",
                                command: (e) => { this.OpenPage(e); }
                            },
                            {
                                label: 'Work References',
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
                {
                    label: 'CRM',
                    icon: 'faicon-crm',
                    items:
                        [
                            {
                                label: 'Lead Management',
                                icon: 'faicon-fw icon-plus',
                                items: [

                                    {
                                        label: 'Leads',
                                        icon: 'faicon-fw icon-bookmark',
                                        routerLink: "home/boreportviewer/udfvf",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'New Lead',
                                        icon: 'faicon-fw icon-bookmark',
                                        routerLink: "home/lmsmasters/lmsmasters",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'Opportunities',
                                        icon: 'faicon-fw icon-bookmark',
                                        routerLink: "home/boreportviewer/vm3i3",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'Activities',
                                        icon: 'faicon-fw icon-video',
                                        routerLink: "home/boreportviewer/ie7uk",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'Tasks',
                                        icon: 'faicon-fw icon-bookmark',
                                        routerLink: "home/boreportviewer/v8aoq",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'Expense',
                                        icon: 'icon-expense',
                                        routerLink: "home/boreportviewer/BOEXP",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'Opportunity Board',
                                        icon: 'faicon-fw icon-bookmark',
                                        routerLink: "home/boreportviewer/d4dv4",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    {
                                        label: 'Task Board',
                                        icon: 'faicon-fw icon-video',
                                        routerLink: "home/boreportviewer/zfr5u",
                                        command: (e) => { this.OpenPage(e); }
                                    },
                                    // {
                                    //     label: 'Dashboard',
                                    //     icon: 'icon-dashboard',
                                    //     routerLink: "home/showdashboard/9",
                                    //     command: (e) => { this.OpenPage(e); }
                                    // },

                                    {
                                        label: 'Calendar',
                                        icon: 'icon-calendar',
                                        routerLink: "home/calendar/ytvq3",
                                        command: (e) => { this.OpenPage(e); }
                                    },



                                ]
                            },
                            {
                                label: 'Help Desk',
                                icon: 'faicon-fw icon-user-minus',
                                routerLink: "home/boreportviewer/ipad7",
                                command: (e) => { this.OpenPage(e); }

                            },

                        ]

                },
                {
                    label: 'Analytics',
                    icon: 'faicon-analytics',
                    items:
                        [
                            // {
                            //     label: 'Dashboard',
                            //     icon: 'faicon-fw icon-user-minus',
                            //     routerLink: "home/showdashboard/14",
                            //     command: (e) => { this.OpenPage(e); }

                            // },
                        ]

                }
            ];
        }
        else if (this.sessionService.getItem("role") == '3') {

            await this.mstcorporatemasterservice.getListBy_userid(0 + this.sessionService.getItem("userid")).then(res => {
                pkcorporateid = res[0].pkcol;
            });
            this.menuItems = [
                {
                    label: 'Admin',
                    icon: 'faicon-master',
                    items: [
                        // {
                        //     label: 'Master',
                        //     icon: 'faicon-master1',
                        //     routerLink: '/home/bocompanyregistrations/bocompanyregistrations/usersource/' + this.sessionService.getItem("usersource"),
                        //     command: (e) => { this.OpenPage(e); }
                        // },
                        /*{
                            label: 'Settings',
                            icon: 'faicon-fw icon-trash',
                            routerLink: "home/boreportviewer/LCT",
                            command: (e) => { this.OpenPage(e); }
                        },*/
                        {
                            label: 'Corporate Masters',
                            icon: 'icon-corporate',
                            routerLink: '/home/mstcorporatemasters/mstcorporatemasters/edit/' + pkcorporateid,
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Skill Search',
                            icon: 'icon-skills',
                            routerLink: "home/boreportviewer/mstsr",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Job Requirements',
                            icon: 'icon-applicantsearch',
                            routerLink: "home/boreportviewer/jobqc",
                            command: (e) => { this.OpenPage(e); }
                        },
                    ]
                },
                {
                    label: 'Skill Tree',
                    icon: 'faicon-skilldetails',
                    items: [
                        {
                            label: 'Application Master',
                            icon: 'icon-applicant-master',
                            routerLink: "home/boreportviewer/MAM",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'References',
                            icon: 'fasicon-references',
                            routerLink: "home/boreportviewer/arrA",
                            command: (e) => { this.OpenPage(e); }
                        },
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
                            label: 'Reference Details',
                            icon: 'icon-referencedetails',
                            routerLink: "home/boreportviewer/mrdl",
                            command: (e) => { this.OpenPage(e); }
                        },
                        // {
                        //     label: 'Reference Requests',
                        //     icon: 'icon-referencerequests',
                        //     routerLink: "home/boreportviewer/arrA",
                        //     command: (e) => { this.OpenPage(e); }
                        // },
                        {
                            label: 'Skill Details',
                            icon: 'icon-skilldetails',
                            routerLink: "home/boreportviewer/sdt",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Social Media Details',
                            icon: 'icon-socialmedia',
                            routerLink: "home/boreportviewer/ASMD",
                            command: (e) => { this.OpenPage(e); }
                        },
                        {
                            label: 'Work References',
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
                {
                    label: 'Transactions',
                    icon: 'faicon-fw icon-user',
                    items: [

                    ]
                },
                {
                    label: 'Analytics',
                    icon: 'faicon-analytics',
                    items: [

                    ]
                }
            ];
        }
        else if (this.sessionService.getItem("role") == '2') {
            // let url='/home/mstapplicantmasters/mstapplicantmasters/usersource/'+this.sessionService.getItem("usersource");
            // this.router.navigate([url]);

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
                            label: 'Job Statuses',
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

            /*
        this.menuItems = [

            {
                label:'Skill Tree',
                icon: 'faicon-fw icon-pencil',
                items:[
                    {
                        label:'Application Master',
                        icon: 'faicon-fw icon-align-left',
                        routerLink : "home/boreportviewer/MAM",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Achievement Details',
                        icon: 'faicon-fw icon-align-right',
                        routerLink : "home/boreportviewer/aadl",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Career Details',
                        icon: 'faicon-fw icon-align-center',
                        routerLink : "home/boreportviewer/acdl",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Education Details',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/aed",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Geography Preferences',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/agp",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Language Details',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/ald",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Reference Details',
                        icon: 'faicon-fw icon-align-center',
                        routerLink : "home/boreportviewer/mrdl",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Reference Requests',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/arr",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Skill Details',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/sdt",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Social Media Details',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/ASMD",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Work References',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/AWR",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Profile Access Details',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/psd",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Profile Completion Masters',
                        icon: 'faicon-fw icon-align-justify',
                        routerLink : "home/boreportviewer/pcm",
                        command : (e) => { this.OpenPage(e); }
                    },
                ]
            },
            {
                label:'Transactions',
                icon: 'faicon-fw icon-user',
                items:[
                    {
                        label:'Loyalty Campaigns',
                        icon: 'faicon-fw icon-user-plus',
                        routerLink : "home/boreportviewer/saibs",
                        command : (e) => { this.OpenPage(e); }

                    },
                    {
                        label:'Point Transfers',
                        icon: 'faicon-fw icon-user-minus',
                        routerLink : "home/boreportviewer/vhmge",
                        command : (e) => { this.OpenPage(e); }

                    },
                    {
                        label:'Customer Transactions',
                        icon: 'faicon-fw icon-user-plus',
                        routerLink : "home/boreportviewer/mbtc3",
                        command : (e) => { this.OpenPage(e); }

                    },
                    {
                        label:'Referrals',
                        icon: 'faicon-fw icon-user-minus',
                        routerLink : "home/boreportviewer/nymsb",
                        command : (e) => { this.OpenPage(e); }

                    },
                ]
            },
            {
                label:'Analytics',
                icon: 'faicon-fw icon-calendar',
                items:[
                    {
                        label:'Reports',
                        icon: 'faicon-fw icon-pencil',
                        items:[
                        {
                            label:'Top Products',
                            icon: 'faicon-fw icon-calendar-plus',
                            routerLink : "home/boreportviewer/LYTP",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Top Merchants',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/LYTMT",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Loyalty Movements',
                            icon: 'faicon-fw icon-calendar-plus',
                            routerLink : "home/boreportviewer/LTCL",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Top Customers',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/LTCR",
                            command : (e) => { this.OpenPage(e); }
                        },
                        ]
                    },
                    {
                        label:'View',
                        icon: 'faicon-fw icon-calendar-times',
                        items:[
                        {
                            label:'Redeems',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/LRD",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Audit Trail',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/LTAT",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Dashboard',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/showdashboard/11",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Merchant Products',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/890",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Customer Lists',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/886",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Customer Rewards',
                            icon: 'faicon-fw icon-calendar-minus',
                            routerLink : "home/boreportviewer/888",
                            command : (e) => { this.OpenPage(e); }
                        }
                        ]
                    }
                ]
            },
            {
                label:'Logoff',
                icon: 'faicon-fw icon-power-off',
                routerLink : "home/boreportviewer/LTMS",
                command : (e) => { this.OpenPage(e); }
            }
        ];
        */
        }
        console.log(this.menuItems);


        let menuItems = [
            {
                label: 'Users 5 Columns', icon: 'faicon-fw icon-users',
                items: [
                    [
                        {
                            label: 'User 1',
                            items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
                        },
                        {
                            label: 'User 2',
                            items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
                        },
                    ],
                    [
                        {
                            label: 'User 3',
                            items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
                        },
                        {
                            label: 'User 4',
                            items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 5',
                            items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
                        },
                        {
                            label: 'User 6',
                            items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 7',
                            items: [{ label: 'User 7.1' }, { label: 'User 7.2' }]
                        },
                        {
                            label: 'User 8',
                            items: [{ label: 'User 8.1' }, { label: 'User 8.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 9',
                            items: [{ label: 'User 9.1' }, { label: 'User 9.2' }]
                        },
                        {
                            label: 'User 10',
                            items: [{ label: 'User 10.1' }, { label: 'User 10.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Users 4 Columns', icon: 'faicon-fw icon-users',
                items: [
                    [
                        {
                            label: 'User 1',
                            items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
                        },
                        {
                            label: 'User 2',
                            items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
                        },
                    ],
                    [
                        {
                            label: 'User 3',
                            items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
                        },
                        {
                            label: 'User 4',
                            items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 5',
                            items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
                        },
                        {
                            label: 'User 6',
                            items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 7',
                            items: [{ label: 'User 7.1' }, { label: 'User 7.2' }]
                        },
                        {
                            label: 'User 8',
                            items: [{ label: 'User 8.1' }, { label: 'User 8.2' }]
                        }
                    ]
                ]
            }
        ];
        this.menuloaded = true;
        //debugger;

//code added by dhana mar-17
        if (this.router.url == "/home") {
            if (this.sessionService.getItem("role") == '3' || this.sessionService.getItem("role") == '1'){
                this.router.navigate(['/home/corporatedashboard']);
            }else if (this.sessionService.getItem("role") == '2') {
                let pkcol = localStorage.getItem('pkcol');
                // this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("applicantid")]);
                this.router.navigate(['/home/bodashboardviewer/' + pkcol]);
            }
            else if (this.sessionService.getItem("role") == '1') {
                let pkcol = localStorage.getItem('pkcol');
                // this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("applicantid")]);
                // this.router.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem("usersource")]);
                this.router.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + pkcol]);
            }
        }

        // if (this.router.url == "/home") {
        //     if (this.sessionService.getItem("role") == '3')
        //         this.router.navigate(['/home/corporatedashboard']);
        //     else if (this.sessionService.getItem("role") == '2')
        //         this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("applicantid")]);
        //     else if(this.sessionService.getItem("role") == '1'){
        //         let pkcol = localStorage.getItem('pkcol');
        //     // this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("applicantid")]);
        //     this.router.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem("usersource")]);
        //     }
        // }


        /*
        if ((this.sessionService.getItem("role") == '3') || (this.sessionService.getItem("role") == '1'))
        this.router.navigate(['/home/corporatedashboard']);
        else if (this.sessionService.getItem("role") == '2')
        this.router.navigate(['home/mstapplicantmasters/mstapplicantmasters/usersource/' + this.sessionService.getItem("usersource")]);
        */

        // ////debugger;
    }

    async menuload1() {
        /*
           await this.bomenumasterservice.getbomenumastersList().then(res => {
               console.log(this.menuItems);
               this.menuItems= this.convert(res);
           });
           */

        let res = await this.bomenumasterservice.get_bousermenumaster_List();
        //debugger;
        if ((res as any).length == 0) {
            //this.sharedService.alert("Menu Access Not given");
            return;
        }
        let i = this.convert(res);
        this.menuItems = i;
        this.menuloaded = true;
        // ////debugger;
    }
    ngAfterViewInit(): void {
        //debugger;


        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != "") this.loggedIn = true;
        //if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;

        this.loaderService.display(true);

        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();

        if (this.router.url.indexOf("menu/hide") != -1) {
            this.menuhide = true;
            ////this.viewhtml=this.sessionService.getViewHtml();
        }

        /*
         if ( this.currentRoute.snapshot.paramMap.get('menuhide') != null)
         {
             this.menuhide=true;
         }
         */
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
        //debugger;
        this.isMenuVisible = !this.isMenuVisible
    }


    convert(array) {
        //  ////debugger;
        var map = {};
        for (var i = 0; i < array.length; i++) {
            var obj: MenuItem;
            obj = new MenuItem();
            obj.id = array[i].menuid;
            obj.menucode = array[i].menucode;
            obj.label = array[i].menudescription;
            //'<img src="http://localhost:5002/MyResources/workflow.webp"></img>'
            //obj.icon=array[i].menudescription.toLowerCase().replace(/ /g, '');
            //obj.escape= false;
            obj.icon = array[i].iconname;
            let link = array[i].menuurl;


            obj.routerLink = link;
            obj.command = (e) => { this.OpenPage(e); };
            //  obj.IsChildVisible=true;
            // obj.expanded = true;
            // obj.children = [];
            // obj.IsChildVisible=false;
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
                // map[parent].icon = 'pi icon-fw';  //
            }

            map[parent].items.push(obj);
        }
        // ////debugger;
        return map['-'].items;

    }
    topFunction() {
        //debugger;
        if (document.getElementById("contentArea") != undefined) document.getElementById("contentArea1").scrollTop = 0;
        /*
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;

        //if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;
        if(!this.loggedIn)this.router.navigate(['/login']);
        */
    }

    selectTheme(theme: string) {
        ////debugger;
        this.sessionService.setItem("selected-theme", theme);
        this.themeService.selectTheme(theme);
        this.theme = theme;
    }

}
