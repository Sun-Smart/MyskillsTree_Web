import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsRoutingModule, routedComponents, ENTRY_COMPONENTS } from './forms-routing.module';
//import { HeaderBreadcrumbComponent } from '../../pages/layout/header-breadcrumb/header-breadcrumb.component';
import { TableModule } from 'primeng/table';

//import { DataTableModule, InputTextareaModule, PanelModule, DropdownModule, SliderModule, MultiSelectModule, CheckboxModule, FileUploadModule, EditorModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';

import { CommonModule } from '@angular/common';
// components
//import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';



@NgModule({
    imports: [ReactiveFormsModule,
        FormsRoutingModule, CommonModule,
        //DataTableModule, InputTextareaModule, PanelModule, DropdownModule, TableModule, SliderModule, MultiSelectModule, CheckboxModule, TreeTableModule,
        //EditorModule, FileUploadModule
    ],
    declarations: [
        ...routedComponents,
        //HeaderBreadcrumbComponent,

        //FieldErrorDisplayComponent
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,


    ],
    // exports: [DynamicFormBuilderComponent],
})
export class FormsModule { }
