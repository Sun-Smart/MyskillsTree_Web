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

import * as jsonData from './bokbmaster.json';

import { bokbmasterComponent } from './bokbmaster.component';
//import { bokbtopicComponent } from '../bokbtopic/bokbtopic.component';
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
        console.log('%c Toast bokbmaster ' + message_detail, 'background: #fff; color: red');
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
describe('bokbmasterComponent', () => {

    let component: bokbmasterComponent;
    let fixture: ComponentFixture<bokbmasterComponent>;
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

    let index_bokbtopic = 1;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [bokbmasterComponent],
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
            fixture = TestBed.createComponent(bokbmasterComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c bokbmasterComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c bokbmaster fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c bokbmasterComponent true', strCSS);
    });
    it('bokbtopic functionality', () => {

        console.log('%c ' + index_bokbtopic + ' bokbmaster bokbtopic dialog', strCSSheader);
        console.log('%c  ' + index_bokbtopic + '  bokbmaster bokbtopic+ clicking the add and edit button', strCSS);
        component.AddOrEdit_bokbtopic(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_bokbtopic + ' bokbmaster bokbtopic+ checking the existence of the bokbtopic dialog', strCSS);
        let obj = document.getElementsByTagName('app-bokbtopic') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_bokbtopic + ' bokbmaster bokbtopic obj ' + obj.length, strCSS);
        console.log('%c  ' + index_bokbtopic + ' bokbmaster bokbtopic pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_bokbtopic + ' bokbmaster bokbtopic clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-bokbtopic') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_bokbtopic + ' bokbmaster bokbtopic obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_bokbtopic + ' bokbmaster bokbtopic pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c bokbmaster checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c bokbmaster kbcategory_List ' + component.kbcategory_List?.length + '', strCSS);
        console.log('%c bokbmaster kbsubcategory_List ' + component.kbsubcategory_List?.length + '', strCSS);
        console.log('%c bokbmaster icon_List ' + component.icon_List?.length + '', strCSS);
        console.log('%c bokbmaster author_List ' + component.author_List?.length + '', strCSS);
        console.log('%c bokbmaster language_List ' + component.language_List?.length + '', strCSS);
        console.log('%c bokbmaster kbaccess_List ' + component.kbaccess_List?.length + '', strCSS);
        console.log('%c bokbmaster kbaccess_List ' + component.kbaccess_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c bokbmaster jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  bokbmaster JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbid) component.bokbmaster_Form.controls.kbid.setValue((json as any)[0].kbid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbcode) component.bokbmaster_Form.controls.kbcode.setValue((json as any)[0].kbcode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbsubject) component.bokbmaster_Form.controls.kbsubject.setValue((json as any)[0].kbsubject);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbcategory) component.bokbmaster_Form.controls.kbcategory.setValue((json as any)[0].kbcategory);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbsubcategory) component.bokbmaster_Form.controls.kbsubcategory.setValue((json as any)[0].kbsubcategory);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tags) component.bokbmaster_Form.controls.tags.setValue((json as any)[0].tags);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].icon) component.bokbmaster_Form.controls.icon.setValue((json as any)[0].icon);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].summary) component.bokbmaster_Form.controls.summary.setValue((json as any)[0].summary);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbdetails) component.bokbmaster_Form.controls.kbdetails.setValue((json as any)[0].kbdetails);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].markpublic) component.bokbmaster_Form.controls.markpublic.setValue((json as any)[0].markpublic);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].author) component.bokbmaster_Form.controls.author.setValue((json as any)[0].author);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].publisheddate) component.bokbmaster_Form.controls.publisheddate.setValue((json as any)[0].publisheddate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].expirationdate) component.bokbmaster_Form.controls.expirationdate.setValue((json as any)[0].expirationdate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].language) component.bokbmaster_Form.controls.language.setValue((json as any)[0].language);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].rating) component.bokbmaster_Form.controls.rating.setValue((json as any)[0].rating);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].comments) component.bokbmaster_Form.controls.comments.setValue((json as any)[0].comments);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kbaccess) component.bokbmaster_Form.controls.kbaccess.setValue((json as any)[0].kbaccess);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.bokbmaster_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.bokbmaster_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.bokbmaster_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  bokbmaster Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  bokbmaster Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.bokbmaster.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  bokbmaster Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.bokbmaster_Form.controls.kbcode.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  bokbmaster -----------------------------------', strCSS);

    });

});
