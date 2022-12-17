

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';



const PAGES_COMPONENTS = [

    PagesComponent,

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule

    ],
    declarations: [
        ...PAGES_COMPONENTS
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule {
}
