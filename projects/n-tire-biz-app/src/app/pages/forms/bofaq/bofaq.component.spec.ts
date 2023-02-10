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

import * as jsonData from './bofaq.json';

import { bofaqComponent } from './bofaq.component';
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
        console.log('%c Toast bofaq ' + message_detail, 'background: #fff; color: red');
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
describe('bofaqComponent', () => {

    let component: bofaqComponent;
    let fixture: ComponentFixture<bofaqComponent>;
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
            declarations: [bofaqComponent],
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
            fixture = TestBed.createComponent(bofaqComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c bofaqComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c bofaq fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c bofaqComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c bofaq checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c bofaq sourcefield_List ' + component.sourcefield_List?.length + '', strCSS);
        console.log('%c bofaq categoryid_List ' + component.categoryid_List?.length + '', strCSS);
        console.log('%c bofaq subcategoryid_List ' + component.subcategoryid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c bofaq jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  bofaq JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].faqid) component.bofaq_Form.controls.faqid.setValue((json as any)[0].faqid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sourcefield) component.bofaq_Form.controls.sourcefield.setValue((json as any)[0].sourcefield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sourcereference) component.bofaq_Form.controls.sourcereference.setValue((json as any)[0].sourcereference);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].categoryid) component.bofaq_Form.controls.categoryid.setValue((json as any)[0].categoryid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].subcategoryid) component.bofaq_Form.controls.subcategoryid.setValue((json as any)[0].subcategoryid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].question) component.bofaq_Form.controls.question.setValue((json as any)[0].question);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].answer) component.bofaq_Form.controls.answer.setValue((json as any)[0].answer);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.bofaq_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  bofaq Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  bofaq Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.bofaq.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  bofaq Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.bofaq_Form.controls.sourcefield.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  bofaq -----------------------------------', strCSS);

    });

});
