import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { LoaderService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/loader.service';
import { bomenumasterService } from '../../../../../../n-tire-bo-app/src/app/service/bomenumaster.service';
import { MenuItem } from '../../../../../../n-tire-bo-app/src/app/pages/core/models/menu-item.model';
import { Sidebar } from 'primeng/sidebar';
import { ApplicationStateService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/application-state.service';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/theme.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout1.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnInit {

    menuItems: any = [];
    menuloaded: boolean = false;
    isMenuVisible: boolean;
    layout: any = 1;
    isMobileResolution: boolean = false;
    theme: string;
    loggedIn:boolean=false;
    sessiondata:any;

    @ViewChild("menubar", { static: false }) menubar: Sidebar;



    constructor(private router: Router, private toastService: ToastService,
        private loaderService: LoaderService,
        private bomenumasterservice: bomenumasterService,
        private applicationStateService: ApplicationStateService,
        private sessionService: SessionService,
        private themeService: ThemeService,
        private sharedService: SharedService) {
        this.layout = this.sessionService.getItem("selected-layout");
        this.theme = "cupertino";
    }
    OpenPage(e) {
        // //debugger;
        if (e.item.routerLink != null && e.item.routerLink != "") {
            console.log("layout" + e.item.id);
            this.sharedService.menuid = e.item.id;
            this.sharedService.menucode = e.item.menucode;
            this.sharedService.currenturl = e.item.routerLink;
            this.router.navigate(["" + e.item.routerLink]);
        }

    }
    ngOnInit() {
        /*
        //debugger;
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
        debugger;
        this.themeService.theme.subscribe((val: string) => {
            //debugger;
            this.theme = val;
        });

    }

    async menuload() {
 
        this.menuItems = [
            {
                label:'Admin',
                icon:'pi pi-fw pi-file',
                items:[
                    {
                        label:'Masters',
                        icon:'pi pi-fw pi-plus',
                        items:[
                        {
                            label:'Users',
                            icon:'pi pi-fw pi-bookmark',
                            routerLink : "home/boreportviewer/e99kq",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Levels',
                            icon:'pi pi-fw pi-video',
                            routerLink : "home/boreportviewer/p4gkg",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'POS Stores',
                            icon:'pi pi-fw pi-bookmark',
                            routerLink : "home/boreportviewer/hrt5r",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Customer Lists',
                            icon:'pi pi-fw pi-video',
                            routerLink : "home/boreportviewer/LLS",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Customer Master',
                            icon:'pi pi-fw pi-bookmark',
                            routerLink : "home/boreportviewer/pofgf",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Merchants',
                            icon:'pi pi-fw pi-video',
                            routerLink : "home/boreportviewer/MTMS",
                            command : (e) => { this.OpenPage(e); }
                        },                         
                        {
                            label:'Product Master',
                            icon:'pi pi-fw pi-video',
                            routerLink : "home/boreportviewer/cdsx8",
                            command : (e) => { this.OpenPage(e); }
                        },    
                    
                        ]
                    },
                    {
                        label:'Coupon Patterns',
                        icon:'pi pi-fw pi-trash',
                        routerLink : "home/boreportviewer/LCT",
                        command : (e) => { this.OpenPage(e); }
                    },
                ]
            },
            {
                label:'Segments',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'Product Segments',
                        icon:'pi pi-fw pi-align-left',
                        routerLink : "home/boreportviewer/LTPS",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Reward Segments',
                        icon:'pi pi-fw pi-align-right',
                        routerLink : "home/boreportviewer/LTRS",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Customer Segments',
                        icon:'pi pi-fw pi-align-center',
                        routerLink : "home/boreportviewer/kn3mu",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Event Segments',
                        icon:'pi pi-fw pi-align-justify',
                        routerLink : "home/boreportviewer/LTES",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Transaction Segments',
                        icon:'pi pi-fw pi-align-justify',
                        routerLink : "home/boreportviewer/LTTS",
                        command : (e) => { this.OpenPage(e); }
                    },
                    {
                        label:'Merchant Segments',
                        icon:'pi pi-fw pi-align-justify',
                        routerLink : "home/boreportviewer/LTMS",
                        command : (e) => { this.OpenPage(e); }
                    },

                ]
            },
            {
                label:'Transactions',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Loyalty Campaigns',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink : "home/boreportviewer/saibs",
                        command : (e) => { this.OpenPage(e); }

                    },
                    {
                        label:'Point Transfers',
                        icon:'pi pi-fw pi-user-minus',
                        routerLink : "home/boreportviewer/vhmge",
                        command : (e) => { this.OpenPage(e); }

                    },
                    {
                        label:'Customer Transactions',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink : "home/boreportviewer/mbtc3",
                        command : (e) => { this.OpenPage(e); }

                    },
                    {
                        label:'Referrals',
                        icon:'pi pi-fw pi-user-minus',
                        routerLink : "home/boreportviewer/nymsb",
                        command : (e) => { this.OpenPage(e); }

                    },
                ]
            },
            {
                label:'Analytics',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'Reports',
                        icon:'pi pi-fw pi-pencil',
                        items:[
                        {
                            label:'Top Products',
                            icon:'pi pi-fw pi-calendar-plus',
                            routerLink : "home/boreportviewer/LYTP",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Top Merchants',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/LYTMT",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Loyalty Movements',
                            icon:'pi pi-fw pi-calendar-plus',
                            routerLink : "home/boreportviewer/LTCL",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Top Customers',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/LTCR",
                            command : (e) => { this.OpenPage(e); }
                        },
                        ]
                    },
                    {
                        label:'View',
                        icon:'pi pi-fw pi-calendar-times',
                        items:[
                        {
                            label:'Redeems',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/LRD",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Audit Trail',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/LTAT",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Dashboard',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/showdashboard/11",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Merchant Products',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/890",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Customer Lists',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/886",
                            command : (e) => { this.OpenPage(e); }
                        },
                        {
                            label:'Customer Rewards',
                            icon:'pi pi-fw pi-calendar-minus',
                            routerLink : "home/boreportviewer/888",
                            command : (e) => { this.OpenPage(e); }
                        }
                        ]
                    }
                ]
            },
            {
                label:'Logoff',
                icon:'pi pi-fw pi-power-off',
                routerLink : "home/boreportviewer/LTMS",
                command : (e) => { this.OpenPage(e); }
            }
        ];
        this.menuloaded = true;
        // //debugger;
    }

    async menuload1() {
        /*   
           await this.bomenumasterservice.getbomenumastersList().then(res => {
               console.log(this.menuItems);
               this.menuItems= this.convert(res);
           });
           */

        let res = await this.bomenumasterservice.getbousermenumasterList();
        debugger;
        if ((res as any).length == 0) {
            //this.sharedService.alert("Menu Access Not given");
            return;
        }
        let i = this.convert(res);
        this.menuItems = i;
        this.menuloaded = true;
        // //debugger;
    }
    ngAfterViewInit(): void {
        debugger;

        
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;
        //if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;

        this.loaderService.display(true);
        
        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();


        this.menuload();

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
        debugger;
        this.isMenuVisible = !this.isMenuVisible
    }


    convert(array) {
        //  //debugger;
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
                // map[parent].icon = 'pi pi-fw';  //
            }

            map[parent].items.push(obj);
        }
        // //debugger;
        return map['-'].items;

    }
    topFunction() {
        debugger;
        if(document.getElementById("contentArea")!=undefined)document.getElementById("contentArea1").scrollTop = 0;
        /*
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;

        //if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;
        if(!this.loggedIn)this.router.navigate(['/login']);
        */
    }

    selectTheme(theme: string) {
        //debugger;
        this.sessionService.setItem("selected-theme", theme);
        this.themeService.selectTheme(theme);
        this.theme = theme;
    }

}
