/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../n-tire-biz-app/src/app/pages/core/services/loader.service';
import { ThemeService } from '../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { SessionService } from '../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    title = 'My Skill Tree';
    showLoader: boolean;
    theme: string;
    loggedIn: boolean = false;
    sessiondata: any;

    constructor(private loaderService: LoaderService,
        private themeService: ThemeService,
        public sessionService: SessionService,
        translate: TranslateService, private router: Router) {
        this.theme = "admin-theme";


        /*
                // this language will be used as a fallback when a translation isn't found in the current language
                translate.setDefaultLang('hi');
                var language = this.sessionService.getItem("ng-prime-language");
                if (language != null && language.length > 0) {
                    // the lang to use, if the lang isn't available, it will use the current loader to get them
                    translate.use(language);
                } else {
                    this.sessionService.setItem("ng-prime-language", "en");
                }
                */
    }

    ngOnInit() {



        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });

        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        /*
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;

        if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;
        if(this.loggedIn)
            this.router.navigate(['/home']);
        else
            this.router.navigate(['/login']);
            */

    }

    onActivate(event) {
        // debugger;
        /*
        console.log(this.router);
        
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;

        if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;

        if(this.loggedIn)
            this.router.navigate(['/home']);
        else
            this.router.navigate(['/login']);
        */
        if (document.getElementById("contentArea") != null && document.getElementById("contentArea") != undefined) document.getElementById("contentArea1").scrollTop = 0;
        //document.querySelector('body').scrollTo(0,0);
        return;
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }

}
