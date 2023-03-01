import { Injectable, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthGuard } from '../../../n-tire-biz-app/src/app/pages/core/gaurds/auth.gaurd';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxBarcodeModule } from 'ngx-barcode';
import { QueryBuilderModule } from "angular2-query-builder";
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { NgxCurrencyModule } from "ngx-currency";
import { TreeTableModule } from 'primeng/treetable';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from "primeng/autocomplete";

import { TreeModule } from 'primeng/tree';
import { FieldErrorDisplayComponent } from '../../../n-tire-biz-app/src/app/pages/forms/field-error-display/field-error-display.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
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
import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaginatorModule } from 'primeng/paginator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { workflowComponent } from '../../../n-tire-biz-app/src/app/custom/workflow/workflow.component';
import { actionComponent } from '../../../n-tire-biz-app/src/app/custom/actions/action.component';

import { ImgCompressorDirective } from '../../../n-tire-dms-app/src/app/service/img-compressor.directive';
import { LoaderService } from '../../../n-tire-biz-app/src/app/pages/core/services/loader.service';
import { RouteStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { ThemeService } from '../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { ApplicationStateService } from '../../../n-tire-biz-app/src/app/pages/core/services/application-state.service';
import { UserDataService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-data.service'
import { UserContextService } from '../../../n-tire-biz-app/src/app/pages/core/services/user-context.service';
import { DynamicFormBuilderComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/field-builder/field-builder.component';

import { CheckBoxComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/atoms/checkbox';
import { DropDownComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/atoms/dropdown';
import { FileComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/atoms/file';
import { RadioComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/atoms/radio';
import { TextBoxComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dynamic-form-builder/atoms/textbox';

import { InternationalPhoneModule } from 'ng4-intl-phone';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

import { WebcamModule } from 'ngx-webcam';
import { boganttComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bogantt/bogantt.component';
import { CalendarFormComponent } from '../../../n-tire-biz-app/src/app/pages/forms/calendarform/calendarform.component';
import { boworkflowdesignComponent } from '../../../n-tire-biz-app/src/app/pages/forms/boworkflowdesign/boworkflowdesign.component';
import { CalendarHeaderComponent } from '../../../n-tire-biz-app/src/app/custom/calendarview.component';
import { CalendarModule as CalendarAGModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BOReportViewerComponent } from '../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.component';
import { BODashboardViewerComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.component';
import { NewskillsearchComponent } from '../../../n-tire-biz-app/src/app/pages/forms/newskillsearch/newskillsearch.component';
import { AttachmentComponent } from '../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { opencommentComponent } from '../../../n-tire-biz-app/src/app/custom/opencomment.component';
import { openfileComponent } from '../../../n-tire-biz-app/src/app/custom/openfile.component';
import { useraccessComponent } from '../../../n-tire-biz-app/src/app/custom/useraccess.component';
import { appmultipleentryComponent } from '../../../n-tire-biz-app/src/app/custom/appmultipleentry.component';
import { stringlistComponent } from '../../../n-tire-biz-app/src/app/custom/stringlist.component';
import { durationComponent } from '../../../n-tire-biz-app/src/app/custom/duration.component';
import { addressComponent } from '../../../n-tire-biz-app/src/app/custom/address.component';
import { SmartTableDurationComponent, SmartTableDurationRenderComponent } from '../../../n-tire-biz-app/src/app/custom/smart-table-duration.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';

import { commentComponent } from '../../../n-tire-biz-app/src/app/custom/comment.component';

import { CommentboxComponent } from '../../../n-tire-biz-app/src/app/custom/comments/commentbox/commentbox.component';
import { CommentsComponent } from '../../../n-tire-biz-app/src/app/custom/comments/comments/comments.component';
import { ChildboxComponent } from '../../../n-tire-biz-app/src/app/custom/comments/childbox/childbox.component';
import { DatacontainerDirective } from '../../../n-tire-biz-app/src/app/custom/comments/comments/comments.component';

import { TimerComponent } from '../../../n-tire-biz-app/src/app/pages/timer/timer.component';

import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { PopupSelectComponent } from '../../../n-tire-biz-app/src/app/custom/popupselect.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { showdashboardComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bodashboardviewer/showdashboard.component';

import { FileUploadModule } from 'ng2-file-upload';

import { ReportViewerCtrlComponent } from '../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/reportviewerctrl.component';
import { SafePipe } from '../../../n-tire-biz-app/src/app/service/safe.pipe';
import { NgGanttEditorModule } from 'ng-gantt'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VgCoreModule } from 'ngx-videogular';

import { VgControlsModule } from 'ngx-videogular';
import { VgOverlayPlayModule } from 'ngx-videogular';
import { VgBufferingModule } from 'ngx-videogular';

import { SheetComponent } from '../../../n-tire-biz-app/src/app/custom/sheet/sheet.component';

import { BsDropdownModule } from 'ngx-bootstrap';

import { CorporateDashboardComponent } from '../../../n-tire-biz-app/src/app/pages/forms/corporate.component';
import { galleryComponent } from '../../../n-tire-biz-app/src/app/pages/forms/gallery.component';
import { ChartModule } from 'primeng/chart';
import { ChartsModule } from 'ng2-charts';
import { TagInputModule } from 'ngx-chips';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegisterComponent } from './pages/register/register.component';
import { SkillenhancerComponent } from './pages/skillenhancer/skillenhancer.component';
import { CertifierComponent } from './pages/certifier/certifier.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { VerifyscreenComponent } from './pages/verifyscreen/verifyscreen.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { bokbmasterComponent } from 'projects/n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';
import { bokbtopicComponent } from './pages/forms/bokbtopic/bokbtopic.component';
import { FaqComponent } from './pages/forms/faq/faq.component';
import { BonewbokbmasterComponent } from './pages/forms/bonewbokbmaster/bonewbokbmaster.component';
import { ForumComponent } from './pages/forms/forum/forum.component';
import { BonewtopicComponent } from './pages/forms/bonewtopic/bonewtopic.component';
import { MstCareerDetailsComponent } from './pages/forms/mst-career-details/mst-career-details.component';
import { MstCertificationsComponent } from './pages/forms/mst-certifications/mst-certifications.component';
import { MstEducationDetailsComponent } from './pages/forms/mst-education-details/mst-education-details.component';
import { MstLanguageDetailsComponent } from './pages/forms/mst-language-details/mst-language-details.component';
import { MstProjectDetailsComponent } from './pages/forms/mst-project-details/mst-project-details.component';
import { MstResumeComponent } from './pages/forms/mst-resume/mst-resume.component';
import { MstSkillDetsilsComponent } from './pages/forms/mst-skill-detsils/mst-skill-detsils.component';
import { MstSocialMediaComponent } from './pages/forms/mst-social-media/mst-social-media.component';
import { MstStartPagesComponent } from './pages/forms/mst-start-pages/mst-start-pages.component';
import {PickListModule} from 'primeng/picklist';
import {InputSwitchModule} from 'primeng/inputswitch';
import { MstLocationDetailsComponent } from './pages/forms/mst-location-details/mst-location-details.component';
import {BlockUIModule} from 'primeng/blockui';


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
@NgModule({

    exports: [
        TimerComponent,
        showdashboardComponent,
        BODashboardViewerComponent,
        NewskillsearchComponent,FaqComponent,BonewbokbmasterComponent,ForumComponent,
        BonewtopicComponent,
        MstCareerDetailsComponent,MstCertificationsComponent,MstEducationDetailsComponent,
        MstLanguageDetailsComponent,MstProjectDetailsComponent,MstResumeComponent,
        MstSkillDetsilsComponent,MstSocialMediaComponent,MstStartPagesComponent,MstLocationDetailsComponent,
        bokbmasterComponent,bokbtopicComponent,
        ReportViewerCtrlComponent,
        AttachmentComponent, PopupSelectComponent, useraccessComponent, addressComponent, durationComponent, commentComponent, appmultipleentryComponent,
        openfileComponent, opencommentComponent,
        stringlistComponent,
        NgGanttEditorModule,
        BOReportViewerComponent,
        CalendarHeaderComponent,
        SmartTableDurationComponent, SmartTableDurationRenderComponent,
        SmartTablepopupselectComponent,
        SmartTablepopupselectRenderComponent,
        CalendarFormComponent, boworkflowdesignComponent,
        boganttComponent,
        FormsModule, ReactiveFormsModule, AccordionModule, ProgressBarModule,
        NgbModule,
        CommonModule,
        Ng2SmartTableModule,
        PanelMenuModule,
        FileUploadModule,
        MenuModule,
        TreeTableModule,
        RatingModule,
        SelectButtonModule,AutoCompleteModule,
        TreeModule, CheckboxModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        MenubarModule,
        RadioButtonModule,
        MegaMenuModule,
        TableModule,
        MessageModule,
        CardModule,
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
        RouterModule,PickListModule,InputSwitchModule,BlockUIModule,
        SmartTableDatepickerRenderComponent,
        SmartTableDatepickerComponent,
        addressComponent, durationComponent,
        SmartTableDurationComponent, SmartTableDurationRenderComponent,
        workflowComponent, CorporateDashboardComponent, galleryComponent,
        actionComponent,
        NgxCurrencyModule,
        SliderModule,
        NgScrollbarModule,
        FieldErrorDisplayComponent,
        InternationalPhoneModule,
        TranslateModule,
        NgModule,
        WebcamModule,
        ColorPickerModule,
        NgxBarcodeModule,
        QueryBuilderModule, FileUploadModule,
        NgxDocViewerModule, PdfViewerModule,
        SafePipe,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        BsDropdownModule
    ],
    declarations: [
        TimerComponent,
        CommentboxComponent,
        CommentsComponent,
        ChildboxComponent,
        DatacontainerDirective,
        ImgCompressorDirective,
        showdashboardComponent,
        BODashboardViewerComponent,
        NewskillsearchComponent,FaqComponent,BonewbokbmasterComponent,ForumComponent,
        BonewtopicComponent,
        MstCareerDetailsComponent,MstCertificationsComponent,MstEducationDetailsComponent,
        MstLanguageDetailsComponent,MstProjectDetailsComponent,MstResumeComponent,
        MstSkillDetsilsComponent,MstSocialMediaComponent,MstStartPagesComponent,MstLocationDetailsComponent,
        bokbmasterComponent,bokbtopicComponent,
        RegisterComponent,
        SkillenhancerComponent,
        CertifierComponent,
        RegisterUserComponent,
        VerifyscreenComponent,
        ReportViewerCtrlComponent,
        PopupSelectComponent,

        AttachmentComponent, useraccessComponent, addressComponent, durationComponent, commentComponent, appmultipleentryComponent,
        openfileComponent, opencommentComponent,
        stringlistComponent,
        BOReportViewerComponent,
        CalendarHeaderComponent, CorporateDashboardComponent, galleryComponent,
        CalendarFormComponent, boworkflowdesignComponent,
        boganttComponent,
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
        SheetComponent,
        SafePipe
    ],

    providers: [
        DatePipe, AuthGuard, Pipe,
        LoaderService,
        RouteStateService,
        SessionService,
        ThemeService, ApplicationStateService, UserDataService, UserContextService,
        DynamicDialogRef, DynamicDialogConfig, DialogService
    ],

    imports: [
        NgGanttEditorModule,
        WebcamModule,
        ColorPickerModule,
        TagInputModule,
        FlatpickrModule.forRoot(),
        NgbModule,
        FormsModule, ReactiveFormsModule,
        MultiSelectModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        NgMultiSelectDropDownModule.forRoot(),
        InternationalPhoneModule,
        CommonModule,
        Ng2SmartTableModule,
        PanelMenuModule,
        FileUploadModule,
        MenuModule,
        TreeTableModule,Ng2SearchPipeModule,
        RatingModule, SelectButtonModule,AutoCompleteModule,
        TreeModule, AccordionModule, ProgressBarModule, CheckboxModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        MenubarModule,
        ChartModule,
        MegaMenuModule,
        RadioButtonModule,
        TableModule,
        MessageModule,
        CardModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        NgxBarcodeModule,
        QueryBuilderModule,
        NgApexchartsModule,
        NgxDatatableModule,
        TranslateModule,

        CalendarAGModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        Ng2SearchPipeModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule, PaginatorModule,
        MessagesModule, EditorModule,
        SliderModule, FileUploadModule,
        NgScrollbarModule,
        KeyboardShortcutsModule,
        NgxDocViewerModule,
        TranslateModule, PdfViewerModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        ChartsModule,
        BsDropdownModule.forRoot(),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        SmartTableDatepickerRenderComponent,
        SmartTableDatepickerComponent, SmartTableDurationComponent, SmartTableDurationRenderComponent,
        SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent, PopupSelectComponent,
        FieldErrorDisplayComponent, ChildboxComponent,
        TimerComponent
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
                DatePipe, AuthGuard,
                LoaderService,
                RouteStateService,
                SessionService,
                ThemeService, ApplicationStateService, UserDataService, UserContextService,
                DynamicDialogRef, DynamicDialogConfig, DialogService]
        };
    }
}
