import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//import { User } from '../../core/models/user.model';
import { notification } from '../../core/models/notification.model';
import { UserIdleService } from 'angular-user-idle';
import { ThemeService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
import { UserContextService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/user-context.service';
import { botaskService } from '../../../../../../n-tire-bo-app/src/app/service/botask.service';
import { DialogService } from 'primeng/dynamicDialog';

import { lmstask } from '../../../../../../n-tire-crm-app/src/app/model/lmstask.model';
import { lmstaskComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/lmstask/lmstask.component';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user: any;
    items: any[];

    displayNotifications: boolean;

    notifications: any = [];

    @Output() toggleMenubar: EventEmitter<any> = new EventEmitter();
    theme: string;
    _start: boolean;
    constructor(
        private router: Router,
        private routeStateService: RouteStateService,
        public sessionService: SessionService,
        private userIdle: UserIdleService,
        private themeService: ThemeService,
        private userContextService: UserContextService,
        private botaskservice: botaskService,
        public dialog: DialogService,
    ) {
        debugger;
        this.displayNotifications = false;

        this.theme = this.sessionService.getItem("selected-theme");
        //this.theme ='cruze';
        if (this.theme) {
            this.selectTheme(this.theme);
        }
    }

    ngOnInit() {
        //debugger;

        this.user = this.sessionService.getSession();
        this.theme=this.sessionService.getItem('selected-theme');


        /*
        for (var i = 1; i <= 5; i++) {
            var notificationObj = new notification("Message " + i, new Date(), null)
            this.notifications.push(notificationObj);
        }*/
        this.botaskservice.getbotasksList().then((res:any) => {
            this.notifications = res;
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

this.items =[

    {
                        label:'Recents', icon:'fa fa-fw fa-soccer-ball-o',
                        items:[
    [
    {
                                    label:'Procurement',
                                    items:[{label:'Sports 1.1'},{label:'Sports 1.2'}]
    },
    {
                                    label:'Legal',
                                    items:[{label:'Sports 2.1'},{label:'Sports 2.2'}]
    },
    ],
    [
    {
                                    label:'CRM',
                                    items:[{label:'Sports 3.1'},{label:'Sports 3.2'}]
    },
    {
                                    label:'DMS',
                                    items:[{label:'Sports 4.1'},{label:'Sports 4.2'}]
    }
    ],
    [
    {
                                    label:'Project Management',
                                    items:[{label:'Sports 5.1'},{label:'Sports 5.2'}]
    },
    {
                                    label:'Property Management',
                                    items:[{label:'Sports 6.1'},{label:'Sports 6.2'}]
    }
    ]
    ]
    }
    ];


///////////
    }

    logout() {
        this.userIdle.stopWatching();
        this.routeStateService.removeAll();
        this.userContextService.logout();
        this.sessionService.removeItem('active-menu');
        this.router.navigate(['/login']);
    }

    showNotificationSidebar() {
        this.displayNotifications = true;
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
        ).onClose.subscribe((res:any) => {
        });
    }
    selectTheme(theme: string) {
        debugger;
        
        this.sessionService.setItem("selected-theme", theme);
        this.themeService.selectTheme(theme);
        this.theme = theme;
/*
theme="luna-pink";
        var elem=document.getElementById('themeAsset') as HTMLLinkElement ;
        elem.href = 'node_modules/primeng/resources/themes/'+theme+'/theme.css';
       */ 
    }

}
