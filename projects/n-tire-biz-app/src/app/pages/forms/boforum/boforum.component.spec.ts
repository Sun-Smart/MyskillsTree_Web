//import 'zone.js/dist/zone-testing';
//import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { waitForAsync } from '@angular/core/testing';

import { async, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
//import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateMockModule } from '@hetznercloud/ngx-translate-mock';
import { RouterTestingModule } from '@angular/router/testing';


import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

import { AppModule } from '../../../app.module';
import { NgPrimeModule } from '../../../app.layout.module';

import * as jsonData from './boforum.json';

import { boforumComponent } from './boforum.component';
import { AuthService } from '../../../../../../n-tire-bo-app/src/app/auth/auth.service';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { UserContextService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/user-context.service';
import { MessageService } from 'primeng/api';
import { setupMaster } from 'cluster';

class MockMessageService extends MessageService {

    messages: any[] = [];
    add(message: any) {
        this.messages.push(message);
        let message_detail = message.summary + ' : ' + message.detail;
        console.log('%c Toast boforum ' + message_detail, 'background: #fff; color: red');
    }
    get() {
        return (this.messages.length == 0) ? '' : this.messages[this.messages.length - 1].detail;
    }
}
/*
export function async(specFunc) {
  return (done) => {
      specFunc().then(() => {
          done();
      }).catch((error) => {
          done.fail(error);
      });
  };
}
*/
describe('boforumComponent', () => {

    let component: boforumComponent;
    let fixture: ComponentFixture<boforumComponent>;
    let element;

    let AuthServiceSpy: SpyObj<AuthService>;

    let UserContextServiceSpy: SpyObj<UserContextService>;
    let MessageServiceSpy: SpyObj<MessageService>;
    let _MockMessageService: MockMessageService = new MockMessageService();
    let token = "";
    let lastmessage = ''
    //let log=''
    let strCSSheader = 'background: #222; color: #bada55';
    let strCSS = 'background: #fff;color: #3778c2';

    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [boforumComponent],
            providers: [SharedService,
                { provide: AuthService, useValue: AuthServiceSpy }, { provide: MessageService, useValue: _MockMessageService }, { provide: UserContextService, useValue: UserContextServiceSpy },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
        token = TestBed.get(SharedService).token;
        AuthServiceSpy.getToken.and.returnValue(token);

        spyOn(window, 'confirm').and.returnValue(true);
        if (component == undefined) {
            if (token == "") {
                token = TestBed.get(SharedService).token;
                AuthServiceSpy.getToken.and.returnValue(token);
            }
            fixture = TestBed.createComponent(boforumComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boforumComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boforum fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boforumComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c boforum checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boforum forumtype_List ' + component.forumtype_List?.length + '', strCSS);
        console.log('%c boforum forumaccess_List ' + component.forumaccess_List?.length + '', strCSS);
        console.log('%c boforum forumaccess_List ' + component.forumaccess_List?.length + '', strCSS);
        console.log('%c boforum forumstatus_List ' + component.forumstatus_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boforum jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boforum JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].forumid) component.boforum_Form.controls.forumid.setValue((json as any)[0].forumid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].title) component.boforum_Form.controls.title.setValue((json as any)[0].title);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].description) component.boforum_Form.controls.description.setValue((json as any)[0].description);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].forumtype) component.boforum_Form.controls.forumtype.setValue((json as any)[0].forumtype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].comments) component.boforum_Form.controls.comments.setValue((json as any)[0].comments);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].forumaccess) component.boforum_Form.controls.forumaccess.setValue((json as any)[0].forumaccess);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].forumstatus) component.boforum_Form.controls.forumstatus.setValue((json as any)[0].forumstatus);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.boforum_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.boforum_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boforum_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  boforum Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boforum Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boforum.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boforum Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boforum_Form.controls.title.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boforum -----------------------------------', strCSS);

    });

});
