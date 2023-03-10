import { Injectable, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthGuard } from '../../../n-tire-bo-app/src/app/pages/core/gaurds/auth.gaurd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbDate, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgxBarcodeModule } from 'ngx-barcode';
//import { mammoth } from "mammoth";
import { QueryBuilderModule } from "angular2-query-builder";

import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxCurrencyModule } from "ngx-currency";
//import { SharedService } from '../../../n-tire-bo-app/src/app/service/shared.service';
import { TreeTableModule } from 'primeng/treetable';
import { RatingModule } from 'primeng/rating';
import {SelectButtonModule} from 'primeng/selectbutton';
import { TreeModule } from 'primeng/tree';
import { FieldErrorDisplayComponent } from '../../../n-tire-bo-app/src/app/pages/forms/field-error-display/field-error-display.component';

import { TreeNode } from 'primeng/api';
import { MenuItem } from 'primeng/api'
//import { MessageService } from 'primeng/api';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
//import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicDialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';;
//import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaginatorModule } from 'primeng/paginator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
//import { ResponsiveScrollModule } from 'p-table-responsive-scroll';
import { workflowComponent } from '../../../n-tire-bo-app/src/app/custom/workflow/workflow.component';
import { actionComponent } from '../../../n-tire-bo-app/src/app/custom/actions/action.component';

import {ImgCompressorDirective} from '../../../n-tire-dms-app/src/app/service/img-compressor.directive';
import { LoaderService } from '../../../n-tire-bo-app/src/app/pages/core/services/loader.service';
import { ToastService } from '../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { RouteStateService } from '../../../n-tire-bo-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { ThemeService } from '../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
import { ApplicationStateService } from '../../../n-tire-bo-app/src/app/pages/core/services/application-state.service';
import { UserDataService } from '../../../n-tire-bo-app/src/app/pages/core/services/user-data.service'
import { UserContextService } from '../../../n-tire-bo-app/src/app/pages/core/services/user-context.service';
import { DynamicFormBuilderComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/field-builder/field-builder.component';

import { CheckBoxComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/atoms/checkbox';
import { DropDownComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/atoms/dropdown';
import { FileComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/atoms/file';
import { RadioComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/atoms/radio';
import { TextBoxComponent } from '../../../n-tire-bo-app/src/app/pages/forms/dynamic-form-builder/atoms/textbox';

//import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { InternationalPhoneModule } from 'ng4-intl-phone';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

//import { crmtatconfigurationComponent } from '../../../n-tire-bo-app/src/app/pages/forms/crmtatconfiguration/crmtatconfiguration.component';
import { WebcamModule } from 'ngx-webcam';
import { boganttComponent } from '../../../n-tire-bo-app/src/app/pages/forms/bogantt/bogantt.component';
import { CalendarFormComponent } from '../../../n-tire-bo-app/src/app/pages/forms/calendarform/calendarform.component';
import { boworkflowdesignComponent } from '../../../n-tire-bo-app/src/app/pages/forms/boworkflowdesign/boworkflowdesign.component';
import { CalendarHeaderComponent } from '../../../n-tire-bo-app/src/app/custom/calendarview.component';
import { CalendarModule as CalendarAGModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
//import { boreportviewerModule } from '../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { BOReportViewerComponent } from '../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.component';
import { BODashboardViewerComponent } from '../../../n-tire-dashboards-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.component';
import { AttachmentComponent } from '../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

import { useraccessComponent } from '../../../n-tire-bo-app/src/app/custom/useraccess.component';
import { appmultipleentryComponent } from '../../../n-tire-bo-app/src/app/custom/appmultipleentry.component';
import { stringlistComponent } from '../../../n-tire-bo-app/src/app/custom/stringlist.component';
import { durationComponent } from '../../../n-tire-bo-app/src/app/custom/duration.component';
import { addressComponent } from '../../../n-tire-bo-app/src/app/custom/address.component';
import { SmartTableDurationComponent, SmartTableDurationRenderComponent } from '../../../n-tire-bo-app/src/app/custom/smart-table-duration.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import { commentComponent } from '../../../n-tire-bo-app/src/app/custom/comment.component';

import { CommentboxComponent } from '../../../n-tire-bo-app/src/app/custom/comments/commentbox/commentbox.component';
import { CommentsComponent } from '../../../n-tire-bo-app/src/app/custom/comments/comments/comments.component';
import { ChildboxComponent } from '../../../n-tire-bo-app/src/app/custom/comments/childbox/childbox.component';
import { DatacontainerDirective } from '../../../n-tire-bo-app/src/app/custom/comments/comments/comments.component';


//import { lmstaskComponent }   from '../../../n-tire-bo-app/src/app/pages/forms/lmstask/lmstask.component';
import { TimerComponent } from '../../../n-tire-bo-app/src/app/pages/timer/timer.component';

import {NgxDocViewerModule} from 'ngx-doc-viewer';

import { PopupSelectComponent } from '../../../n-tire-bo-app/src/app/custom/popupselect.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { showdashboardComponent } from '../../../n-tire-dashboards-app/src/app/pages/forms/bodashboardviewer/showdashboard.component';

import {FileUploadModule} from 'ng2-file-upload';

import { ReportViewerCtrlComponent } from '../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/reportviewerctrl.component';
import { TooltipModule } from 'primeng/tooltip';
import { SafePipe } from '../../../n-tire-bo-app/src/app/service/safe.pipe';
import { NgGanttEditorModule } from 'ng-gantt'
import { JSGantt } from 'jsgantt-improved';
//import { Papa } from 'ngx-papaparse';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageViewerModule } from 'ng2-image-viewer';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

import { VgCoreModule } from 'ngx-videogular';


import { VgControlsModule } from 'ngx-videogular';
import { VgOverlayPlayModule } from 'ngx-videogular';
import { VgBufferingModule } from 'ngx-videogular';

//import { SheetComponent } from '../../../n-tire-bo-app/src/app/custom/sheet/sheet.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ",",
    nullable: true
};





export const ENTRY_COMPONENTS = [

];


export const routedComponents = [

];



const config: ExtraOptions = {
    useHash: true,
};
/*
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
*/
@NgModule({

    exports: [
        //Papa,
        //lmstaskComponent,
        TimerComponent,
        showdashboardComponent,
        BODashboardViewerComponent,
        ReportViewerCtrlComponent,
        AttachmentComponent, PopupSelectComponent, useraccessComponent, addressComponent, durationComponent, commentComponent, appmultipleentryComponent,
        stringlistComponent,
        NgGanttEditorModule,
        BOReportViewerComponent,
        //boreportviewerModule,
        CalendarHeaderComponent,
        SmartTableDurationComponent, SmartTableDurationRenderComponent,
        SmartTablepopupselectComponent,
        SmartTablepopupselectRenderComponent,
        CalendarFormComponent, boworkflowdesignComponent,
        boganttComponent,
        FormsModule, ReactiveFormsModule, AccordionModule,
        NgbModule,
        CommonModule,
        Ng2SmartTableModule,
        PanelMenuModule,
        FileUploadModule,
        MenuModule,
        TreeTableModule,
        RatingModule,
        SelectButtonModule,
        TreeModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        RadioButtonModule,
        //ToastModule,
        MegaMenuModule,
        TableModule,
        //ResponsiveScrollModule,
        MessageModule,
        CardModule,
        ChartModule,
        MultiSelectModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule, PaginatorModule,
        MessagesModule, EditorModule,
        DynamicFormBuilderComponent,
        CheckBoxComponent, DropDownComponent, FileComponent, RadioComponent, TextBoxComponent,
        FieldBuilderComponent,
        RouterModule,
        //NgxIntlTelInputModule,
        SmartTableDatepickerRenderComponent,
        SmartTableDatepickerComponent,
        addressComponent, durationComponent,
        SmartTableDurationComponent, SmartTableDurationRenderComponent,
        //SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent,
        workflowComponent,
        actionComponent,
        NgxCurrencyModule,
        SliderModule,
        NgScrollbarModule,
        FieldErrorDisplayComponent,
        //InternationalPhoneNumberModule,
        InternationalPhoneModule,
        TranslateModule, //crmtatconfigurationComponent,
        WebcamModule,
        TagInputModule, ColorPickerModule,
        NgxBarcodeModule,
        QueryBuilderModule,FileUploadModule,
        NgxDocViewerModule,PdfViewerModule,ImageViewerModule,SafePipe,
        VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    //SheetComponent 
    ],
    declarations: [
        //lmstaskComponent,
        TimerComponent,
        CommentboxComponent,
        CommentsComponent,
        ChildboxComponent,
        DatacontainerDirective,
        ImgCompressorDirective,
        showdashboardComponent,
        BODashboardViewerComponent,
        ReportViewerCtrlComponent,
        PopupSelectComponent,

        AttachmentComponent, useraccessComponent, addressComponent, durationComponent, commentComponent, appmultipleentryComponent,
        stringlistComponent,
        BOReportViewerComponent,
        CalendarHeaderComponent,
        CalendarFormComponent, boworkflowdesignComponent,
        boganttComponent,
        //...routedComponents,
        SmartTableDatepickerRenderComponent,
        SmartTableDatepickerComponent,
        SmartTableDurationComponent, SmartTableDurationRenderComponent,
        SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent,
        actionComponent,
        workflowComponent,
        FieldErrorDisplayComponent,
        DynamicFormBuilderComponent,
        CheckBoxComponent, DropDownComponent, FileComponent, RadioComponent, TextBoxComponent,
        FieldBuilderComponent,
        //crmtatconfigurationComponent, SheetComponent ,
        SafePipe
    ],

    providers: [
        //MessageService,
        DatePipe, AuthGuard,Pipe,
        LoaderService,
        //ToastService, 
        RouteStateService,
        SessionService,
        ThemeService, ApplicationStateService, UserDataService, UserContextService,
        DynamicDialogRef, DynamicDialogConfig, DialogService
        //SharedService
    ],

    imports: [
        NgGanttEditorModule,
        //Papa,
        WebcamModule,
        ColorPickerModule,
        //boreportviewerModule,
        TagInputModule,
        FlatpickrModule.forRoot(),
        NgbModule.forRoot(),
        FormsModule, ReactiveFormsModule,
        MultiSelectModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        //NgxIntlTelInputModule,
        InternationalPhoneModule,
        CommonModule,
        Ng2SmartTableModule,
        PanelMenuModule,
        FileUploadModule,
        MenuModule,
        TreeTableModule,
        RatingModule,SelectButtonModule,
        TreeModule, AccordionModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        //ToastModule,
        MegaMenuModule,
        RadioButtonModule,
        TableModule,
        //ResponsiveScrollModule,
        MessageModule,
        CardModule,
        ChartModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        NgxBarcodeModule,
        QueryBuilderModule,
        CalendarAGModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),

        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule, PaginatorModule,
        MessagesModule, EditorModule,
        SliderModule,FileUploadModule,
        NgScrollbarModule,
        KeyboardShortcutsModule,
        NgxDocViewerModule,
        TranslateModule,PdfViewerModule,ImageViewerModule,VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
        /*
        .forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        */
        //DynamicFormBuilderModule,
        //InternationalPhoneNumberModule,
        //BsDropdownModule.forRoot(),
        //NgxIntlTelInputModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        //...ENTRY_COMPONENTS,
        SmartTableDatepickerRenderComponent,
        SmartTableDatepickerComponent, SmartTableDurationComponent, SmartTableDurationRenderComponent,
        SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent, PopupSelectComponent,

        FieldErrorDisplayComponent, ChildboxComponent,
        //lmstaskComponent,
        TimerComponent
        //crmtatconfigurationComponent
    ],

})

@Injectable({
    providedIn: 'root',
})


export class NgCommonModule {
    static forRoot(): ModuleWithProviders<NgCommonModule> {
        return {
            ngModule: NgCommonModule,
            providers: [
                //  MessageService,
                DatePipe, AuthGuard,
                LoaderService,
                // ToastService,
                RouteStateService,
                SessionService,
                ThemeService, ApplicationStateService, UserDataService, UserContextService,
                DynamicDialogRef, DynamicDialogConfig, DialogService]
        };
    }
}
/*
export { LoaderService } from '../../../n-tire-bo-app/src/app/pages/core/services/loader.service';
export { ToastService } from '../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
export { RouteStateService } from '../../../n-tire-bo-app/src/app/pages/core/services/route-state.service';
export { SessionService } from '../../../n-tire-bo-app/src/app/pages/core/services/session.service';
export { ThemeService } from '../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
export { ApplicationStateService } from '../../../n-tire-bo-app/src/app/pages/core/services/application-state.service';
export { UserDataService } from '../../../n-tire-bo-app/src/app/pages/core/services/user-data.service'
export { UserContextService } from '../../../n-tire-bo-app/src/app/pages/core/services/user-context.service';
export { MessageService } from 'primeng/dynamicDialog';
*/