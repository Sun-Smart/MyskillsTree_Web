

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { MstapplicantreferenceacceptedComponent } from './mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.component';
// import { ApplicantregisterComponent } from './applicantregister/applicantregister.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
// import { MstapplicantskilldetailsattachmentComponent } from './forms/mstapplicantskilldetailsattachment/mstapplicantskilldetailsattachment.component';
import { CertifierComponent } from './certifier/certifier.component';
import { MstLocationDetailsComponent } from './forms/mst-location-details/mst-location-details.component';
// import { RegisterComponent } from './register/register.component';
// import { NewskillsearchComponent } from './forms/newskillsearch/newskillsearch.component';

// import { BoSkillSearchComponent } from './forms/bo-skill-search/bo-skill-search.component';



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
        // MstapplicantskilldetailsattachmentComponent,
        CertifierComponent,
        MstLocationDetailsComponent,
        // ApplicantregisterComponent,
        // RegisterComponent,
        // NewskillsearchComponent,
        // BoSkillSearchComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {
}
