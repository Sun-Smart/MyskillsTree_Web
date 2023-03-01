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
        public sessionService: SessionService) {
        this.theme = "admin-theme";
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });

        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });
    }

    onActivate(event) {
        if (document.getElementById("contentArea") != null && document.getElementById("contentArea") != undefined) document.getElementById("contentArea1").scrollTop = 0;
        return;
    }

}
