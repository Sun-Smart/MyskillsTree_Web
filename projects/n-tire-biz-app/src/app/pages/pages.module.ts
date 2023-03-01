import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MstapplicantreferenceacceptedComponent } from './mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CertifierComponent } from './certifier/certifier.component';
import { MstLocationDetailsComponent } from './forms/mst-location-details/mst-location-details.component';

const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        NgModule

    ],
    declarations: [
        ...PAGES_COMPONENTS,
        MstapplicantreferenceacceptedComponent,
        ForgotpasswordComponent,
        CertifierComponent,
        MstLocationDetailsComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {
}
