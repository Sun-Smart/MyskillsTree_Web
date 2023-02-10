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

import * as jsonData from './bokbtopic.json';

import { bokbtopicComponent } from './bokbtopic.component';
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
        console.log('%c Toast bokbtopic ' + message_detail, 'background: #fff; color: red');
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
describe('bokbtopicComponent', () => {

    let component: bokbtopicComponent;
    let fixture: ComponentFixture<bokbtopicComponent>;
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
            declarations: [bokbtopicComponent],
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
            fixture = TestBed.createComponent(bokbtopicComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c bokbtopicComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c bokbtopic fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c bokbtopicComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c bokbtopic checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c bokbtopic kbid_List ' + component.kbid_List?.length + '', strCSS);
        console.log('%c bokbtopic contenttype_List ' + component.contenttype_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c bokbtopic jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  bokbtopic JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbtopicid) component.bokbtopic_Form.controls.kbtopicid.setValue((json as any)[0].kbtopicid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbid) component.bokbtopic_Form.controls.kbid.setValue((json as any)[0].kbid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].description) component.bokbtopic_Form.controls.description.setValue((json as any)[0].description);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sequence) component.bokbtopic_Form.controls.sequence.setValue((json as any)[0].sequence);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].contenttype) component.bokbtopic_Form.controls.contenttype.setValue((json as any)[0].contenttype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].contenttext) component.bokbtopic_Form.controls.contenttext.setValue((json as any)[0].contenttext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].contenturl) component.bokbtopic_Form.controls.contenturl.setValue((json as any)[0].contenturl);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.bokbtopic_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  bokbtopic Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  bokbtopic Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.bokbtopic.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  bokbtopic Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.bokbtopic_Form.controls.kbid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  bokbtopic -----------------------------------', strCSS);

    });

});
