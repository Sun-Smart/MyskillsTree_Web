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
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
//,
//
export class LayoutComponent implements OnInit,AfterViewInit {//

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
        public sessionService: SessionService,
        private themeService: ThemeService,
        private sharedService: SharedService) {
        this.layout = this.sessionService.getItem("selected-layout");
        this.theme = "south-street";
        this.selectTheme(this.theme);
    }
    OpenPage(e:any) {
        debugger;
        if (e.item.routerLink != null && e.item.routerLink != "") {
            console.log("layout" + e.item.id);
            this.sharedService.menuid = e.item.id;
            this.sharedService.menucode = e.item.menucode;
            this.sharedService.currenturl = e.item.routerLink;
            this.router.navigate([ e.item.routerLink]);
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
        /*   
           await this.bomenumasterservice.getbomenumastersList().then((res:any) => {
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


        //this.menuload();

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
            obj.command = (e:any) => { this.OpenPage(e); };
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
