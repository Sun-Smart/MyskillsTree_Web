import { boreportService } from './../../../service/boreport.service';
import { boreport } from './../../../model/boreport.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bodashboard} from './../../../model/bodashboard.model';
import { bodashboardService } from './../../../service/bodashboard.service';
//popups
//detail table services
import { boreportdetail } from './../../../model/boreportdetail.model';
//FK services
import { boreportdetailComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportdetail/boreportdetail.component';
import { boreportothertable } from './../../../model/boreportothertable.model';
//FK services
import { boreportothertableComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportothertable/boreportothertable.component';
import { boreportcolumn } from './../../../model/boreportcolumn.model';
//FK services
import { boreportcolumnComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportcolumn/boreportcolumn.component';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-boreport',
templateUrl: './boreport.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boreportComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
//formdata: any;//current form data
shortcuts: ShortcutInput[] = [];//keyboard keys
showsubmit: boolean = true;//button to show
showGoWorkFlow: boolean = false;
pkList:any;//stores values - used in search, prev, next
pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
pk_tblForm: FormGroup;//pk - autocomplete
pk_tbloptions: any;//pk - autocomplete
pk_tblformatter: any;//pk - autocomplete
toolbarvisible:boolean=true;
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulateboreports:boolean=false;
databoreportsreportcode3:any=[];
databoreportsreportmodule3:any=[];
databoreportsreporttype3:any=[];
databoreportsdatefiltertype3:any=[];
databoreportsgroupbyrelationship3:any=[];
databoreportsjointype3:any=[];
databoreportsreportoutputtype3:any=[];
databoreportsviewhtmltype3:any=[];
databoreportsworkflowhtmltype3:any=[];
databoreportsrecordtype3:any=[];
databoreportsdashboardid3:any=[];
bfilterPopulateboreportdetails:boolean=false;
bfilterPopulateboreportothertables:boolean=false;
databoreportcolumnsfiltertype3:any=[];
bfilterPopulateboreportcolumns:boolean=false;
@ViewChild('tblboreportdetailssource',{static:false}) tblboreportdetailssource: Ng2SmartTableComponent;
@ViewChild('tblboreportothertablessource',{static:false}) tblboreportothertablessource: Ng2SmartTableComponent;
@ViewChild('tblboreportcolumnssource',{static:false}) tblboreportcolumnssource: Ng2SmartTableComponent;
 boreportForm: FormGroup;
reportcodeList: boconfigvalue[];
reportmoduleList: boconfigvalue[];
reporttypeList: boconfigvalue[];
datefiltertypeList: boconfigvalue[];
groupbyrelationshipList: boconfigvalue[];
jointypeList: boconfigvalue[];
reportoutputtypeList: boconfigvalue[];
viewhtmltypeList: boconfigvalue[];
workflowhtmltypeList: boconfigvalue[];
recordtypeList: boconfigvalue[];
dashboardidList: bodashboard[];
dashboardidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
dashboardid_bodashboardsForm: FormGroup;//autocomplete
dashboardid_bodashboardsoptions:any;//autocomplete
dashboardid_bodashboardsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



boreportdetailsvisiblelist:any;
boreportdetailshidelist:any;
boreportothertablesvisiblelist:any;
boreportothertableshidelist:any;
boreportcolumnsvisiblelist:any;
boreportcolumnshidelist:any;

DeletedboreportdetailIDs: string="";
boreportdetailsID: string = "1";
boreportdetailsselectedindex:any;
DeletedboreportothertableIDs: string="";
boreportothertablesID: string = "2";
boreportothertablesselectedindex:any;
DeletedboreportcolumnIDs: string="";
boreportcolumnsID: string = "3";
boreportcolumnsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boreportservice: boreportService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bodashboardservice:bodashboardService,
private currentRoute: ActivatedRoute) { 
this.translate=this.sharedService.translate;
this.data = dynamicconfig;
this.pmenuid=sharedService.menuid;
this.pcurrenturl=sharedService.currenturl;
this.keyboard.add([
{
        key: 'cmd l',
    command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
    preventDefault: true
},
{
        key: 'cmd s',
    command: () => this.onSubmitData(false),
    preventDefault: true
},
{
        key: 'cmd f',
    command: () => this.resetForm(),
    preventDefault: true
}
]);
this.boreportForm  = this.fb.group({
reportid: [null],
reportcode: [null],
reportcodedesc: [null],
reportname: [null],
reportmodule: [null],
reportmoduledesc: [null],
reporttype: [null],
reporttypedesc: [null],
columns: [null],
sidefilter: [null],
sidefilters: [null],
maintablename: [null],
maintablealias: [null],
maintableidentityfield: [null],
pk: [null],
query: [null],
wherecondition: [null],
cardtype: [null],
html: [null],
calendar: [null],
kanbanview: [null],
kanbankey: [null],
datefilter: [null],
datefiltercolumnname: [null],
datefiltertype: [null],
datefiltertypedesc: [null],
groupby: [null],
groupbytext: [null],
groupby2: [null],
groupby2text: [null],
groupbyrelationship: [null],
groupbyrelationshipdesc: [null],
sortby1: [null],
sortby2: [null],
sortby3: [null],
parentid: [null],
parentdescription: [null],
detailtablename: [null],
detailtablealias: [null],
jointype: [null],
jointypedesc: [null],
detailtableidentityfield: [null],
detailtablefk: [null],
detailtableconcatenate: [null],
detailtableheader: [null],
detailtablefooter: [null],
detailtablequery: [null],
masterdetailwhere: [null],
numrows: [null],
reportoutputtype: [null],
reportoutputtypedesc: [null],
noheader: [null],
header: [null],
footer: [null],
headerquery: [null],
footerquery: [null],
headerquery1: [null],
footerquery1: [null],
headerquery2: [null],
footerquery2: [null],
headerquery3: [null],
footerquery3: [null],
headerquery4: [null],
footerquery4: [null],
headerquery5: [null],
footerquery5: [null],
header1: [null],
footer1: [null],
header2: [null],
footer2: [null],
header3: [null],
footer3: [null],
header4: [null],
footer4: [null],
header5: [null],
footer5: [null],
status: [null],
statusdesc: [null],
css: [null],
viewhtmltype: [null],
viewhtmltypedesc: [null],
viewhtml: [null],
viewcss: [null],
reporthtml: [null],
workflowhtmltype: [null],
workflowhtmltypedesc: [null],
workflowhtml: [null],
component: [null],
alternateview: [null],
recordtype: [null],
recordtypedesc: [null],
userfield: [null],
employeefield: [null],
userfiltertype: [null],
rolefield: [null],
dashboardid: [null],
dashboardiddesc: [null],
tableheader: [null],
reportjsondata: [null],
helptext: [null],
filters: [null],
filtercolumns: [null],
});
}

get f() { return this.boreportForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boreportForm.dirty && this.boreportForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields

//navigation buttons
first()
{
  if(this.pkList.length>0) this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
 if(this.pkList.length>0) this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.reportid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.reportid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.reportid && pkDetail) {
        this.PopulateScreen(pkDetail.pkcol);
    }
  }

// initialize
async ngOnInit() {
//session & theme
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');

debugger;
let boreportid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 //if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
this.viewhtml=this.sessionService.getViewHtml();
}
else if(this.data!=null && this.data.pkcol!=null)
{
this.pkcol=this.data.pkcol;
}
else
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('id');
this.showformtype  = this.currentRoute.snapshot.paramMap.get('showformtype');
}
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=boreportid;
//this.sharedService.alert(boreportid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetboreportdetailsTableConfig();
  setTimeout(() => {
  this.SetboreportdetailsTableddConfig();
  });

this.SetboreportothertablesTableConfig();
  setTimeout(() => {
  this.SetboreportothertablesTableddConfig();
  });

this.SetboreportcolumnsTableConfig();
  setTimeout(() => {
  this.SetboreportcolumnsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("reportcode").then(res => this.reportcodeList = res as boconfigvalue[]);
this.configservice.getList("reportmodule").then(res => this.reportmoduleList = res as boconfigvalue[]);
this.configservice.getList("reporttype").then(res => this.reporttypeList = res as boconfigvalue[]);
this.configservice.getList("datefiltertype").then(res => this.datefiltertypeList = res as boconfigvalue[]);
this.configservice.getList("groupbyrelationship").then(res => this.groupbyrelationshipList = res as boconfigvalue[]);
this.configservice.getList("jointype").then(res => this.jointypeList = res as boconfigvalue[]);
this.configservice.getList("reportoutputtype").then(res => this.reportoutputtypeList = res as boconfigvalue[]);
this.configservice.getList("viewhtmltype").then(res => this.viewhtmltypeList = res as boconfigvalue[]);
this.configservice.getList("workflowhtmltype").then(res => this.workflowhtmltypeList = res as boconfigvalue[]);
this.configservice.getList("recordtype").then(res => this.recordtypeList = res as boconfigvalue[]);
this.bodashboardservice.getbodashboardsList().then(res => 
{
this.dashboardidList = res as bodashboard[];
if(this.boreportservice.formData && this.boreportservice.formData.dashboardid){
this.dashboardidoptionsEvent.emit(this.dashboardidList);
this.boreportForm.patchValue({
    dashboardid: this.boreportservice.formData.dashboardid,
    dashboardiddesc: this.boreportservice.formData.dashboardiddesc,
});
}
{
let arrdashboardid = this.dashboardidList.filter(v => v.dashboardid == this.boreportForm.get('dashboardid').value);
let objdashboardid;
if (arrdashboardid.length > 0) objdashboardid = arrdashboardid[0];
if (objdashboardid)
{
}
}
}
).catch((err) => {console.log(err);});
this.dashboardid_bodashboardsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.dashboardidList.filter(v => v.dashboardname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.dashboardid_bodashboardsformatter = (result: any) => result.dashboardname;

//autocomplete
    this.boreportservice.getboreportsList().then(res => {
      this.pkList = res as boreport[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.reportname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.reportname;

//setting the flag that the screen is not touched 
this.boreportForm.markAsUntouched();
this.boreportForm.markAsPristine();
}
onSelecteddashboardid(dashboardidDetail: any) {
if (dashboardidDetail.dashboardid && dashboardidDetail) {
this.boreportForm.patchValue({
dashboardid: dashboardidDetail.dashboardid,
dashboardiddesc: dashboardidDetail.dashboardname,

});

}
}




resetForm() {
if (this.boreportForm != null)
this.boreportForm.reset();
this.boreportForm.patchValue({
});
setTimeout(() => {
this.boreportservice.boreportdetails=[];
this.boreportdetailsLoadTable();
this.boreportservice.boreportothertables=[];
this.boreportothertablesLoadTable();
this.boreportservice.boreportcolumns=[];
this.boreportcolumnsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let reportid = this.boreportForm.get('reportid').value;
        if(reportid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boreportservice.deleteboreport(reportid).then(res =>
                {
                this.resetForm();
                }
            ).catch((err) => {console.log(err);});
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.boreportForm.patchValue({
        reportid: null
    });
    if(this.boreportservice.formData.reportid!=null)this.boreportservice.formData.reportid=null;
for (let i=0;i<this.boreportservice.boreportdetails.length;i++) {
this.boreportservice.boreportdetails[i].reportdetailid=null;
}
for (let i=0;i<this.boreportservice.boreportothertables.length;i++) {
this.boreportservice.boreportothertables[i].othertableid=null;
}
for (let i=0;i<this.boreportservice.boreportcolumns.length;i++) {
this.boreportservice.boreportcolumns[i].reportcolumnid=null;
}
    }
    PopulateFromMainScreen(mainscreendata:any,bdisable:any)
    {
    if(mainscreendata!=null)
    {
      for (let key in mainscreendata) {
if(key!='visiblelist' && key!='hidelist' && key!='event'){
        
        let jsonstring="";
        let json=null;
let ctrltype=typeof (mainscreendata[key]);
if(false)
json="";
        else if(ctrltype=="string")
{
this.boreportForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boreportForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boreportForm.controls[key]!=undefined)this.boreportForm.controls[key].disable({onlySelf: true});
}
      }
      }
      }
    }
    }
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
if(this.maindata==undefined || this.maindata.save==true)
{
    this.onSubmitData(false);
}
else if(this.maindata!=null  && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
reportidonChange(evt:any){
let e=evt.value;
}
reportcodeonChange(evt:any){
let e=this.f.reportcode.value as any;
this.boreportForm.patchValue({reportcodedesc:evt.options[evt.options.selectedIndex].text});
}
reportnameonChange(evt:any){
let e=evt.value;
}
reportmoduleonChange(evt:any){
let e=this.f.reportmodule.value as any;
this.boreportForm.patchValue({reportmoduledesc:evt.options[evt.options.selectedIndex].text});
}
reporttypeonChange(evt:any){
let e=this.f.reporttype.value as any;
this.boreportForm.patchValue({reporttypedesc:evt.options[evt.options.selectedIndex].text});
}
columnsonChange(evt:any){
let e=evt.value;
}
sidefilteronChange(evt:any){
let e=evt.value;
}
sidefiltersonChange(evt:any){
let e=evt.value;
}
maintablenameonChange(evt:any){
let e=evt.value;
}
maintablealiasonChange(evt:any){
let e=evt.value;
}
maintableidentityfieldonChange(evt:any){
let e=evt.value;
}
pkonChange(evt:any){
let e=evt.value;
}
queryonChange(evt:any){
let e=evt.value;
}
whereconditiononChange(evt:any){
let e=evt.value;
}
cardtypeonChange(evt:any){
let e=evt.value;
}
htmlonChange(evt:any){
let e=evt.value;
}
calendaronChange(evt:any){
let e=evt.value;
}
kanbanviewonChange(evt:any){
let e=evt.value;
}
kanbankeyonChange(evt:any){
let e=evt.value;
}
datefilteronChange(evt:any){
let e=evt.value;
}
datefiltercolumnnameonChange(evt:any){
let e=evt.value;
}
datefiltertypeonChange(evt:any){
let e=this.f.datefiltertype.value as any;
this.boreportForm.patchValue({datefiltertypedesc:evt.options[evt.options.selectedIndex].text});
}
groupbyonChange(evt:any){
let e=evt.value;
}
groupbytextonChange(evt:any){
let e=evt.value;
}
groupby2onChange(evt:any){
let e=evt.value;
}
groupby2textonChange(evt:any){
let e=evt.value;
}
groupbyrelationshiponChange(evt:any){
let e=this.f.groupbyrelationship.value as any;
this.boreportForm.patchValue({groupbyrelationshipdesc:evt.options[evt.options.selectedIndex].text});
}
sortby1onChange(evt:any){
let e=evt.value;
}
sortby2onChange(evt:any){
let e=evt.value;
}
sortby3onChange(evt:any){
let e=evt.value;
}
parentidonChange(evt:any){
let e=evt.value;
}
parentdescriptiononChange(evt:any){
let e=evt.value;
}
detailtablenameonChange(evt:any){
let e=evt.value;
}
detailtablealiasonChange(evt:any){
let e=evt.value;
}
jointypeonChange(evt:any){
let e=this.f.jointype.value as any;
this.boreportForm.patchValue({jointypedesc:evt.options[evt.options.selectedIndex].text});
}
detailtableidentityfieldonChange(evt:any){
let e=evt.value;
}
detailtablefkonChange(evt:any){
let e=evt.value;
}
detailtableconcatenateonChange(evt:any){
let e=evt.value;
}
detailtableheaderonChange(evt:any){
let e=evt.value;
}
detailtablefooteronChange(evt:any){
let e=evt.value;
}
detailtablequeryonChange(evt:any){
let e=evt.value;
}
masterdetailwhereonChange(evt:any){
let e=evt.value;
}
numrowsonChange(evt:any){
let e=evt.value;
}
reportoutputtypeonChange(evt:any){
let e=this.f.reportoutputtype.value as any;
this.boreportForm.patchValue({reportoutputtypedesc:evt.options[evt.options.selectedIndex].text});
}
noheaderonChange(evt:any){
let e=evt.value;
}
headeronChange(evt:any){
let e=evt.value;
}
footeronChange(evt:any){
let e=evt.value;
}
headerqueryonChange(evt:any){
let e=evt.value;
}
footerqueryonChange(evt:any){
let e=evt.value;
}
headerquery1onChange(evt:any){
let e=evt.value;
}
footerquery1onChange(evt:any){
let e=evt.value;
}
headerquery2onChange(evt:any){
let e=evt.value;
}
footerquery2onChange(evt:any){
let e=evt.value;
}
headerquery3onChange(evt:any){
let e=evt.value;
}
footerquery3onChange(evt:any){
let e=evt.value;
}
headerquery4onChange(evt:any){
let e=evt.value;
}
footerquery4onChange(evt:any){
let e=evt.value;
}
headerquery5onChange(evt:any){
let e=evt.value;
}
footerquery5onChange(evt:any){
let e=evt.value;
}
header1onChange(evt:any){
let e=evt.value;
}
footer1onChange(evt:any){
let e=evt.value;
}
header2onChange(evt:any){
let e=evt.value;
}
footer2onChange(evt:any){
let e=evt.value;
}
header3onChange(evt:any){
let e=evt.value;
}
footer3onChange(evt:any){
let e=evt.value;
}
header4onChange(evt:any){
let e=evt.value;
}
footer4onChange(evt:any){
let e=evt.value;
}
header5onChange(evt:any){
let e=evt.value;
}
footer5onChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
cssonChange(evt:any){
let e=evt.value;
}
viewhtmltypeonChange(evt:any){
let e=this.f.viewhtmltype.value as any;
this.boreportForm.patchValue({viewhtmltypedesc:evt.options[evt.options.selectedIndex].text});
}
viewhtmlonChange(evt:any){
let e=evt.value;
}
viewcssonChange(evt:any){
let e=evt.value;
}
reporthtmlonChange(evt:any){
let e=evt.value;
}
workflowhtmltypeonChange(evt:any){
let e=this.f.workflowhtmltype.value as any;
this.boreportForm.patchValue({workflowhtmltypedesc:evt.options[evt.options.selectedIndex].text});
}
workflowhtmlonChange(evt:any){
let e=evt.value;
}
componentonChange(evt:any){
let e=evt.value;
}
alternateviewonChange(evt:any){
let e=evt.value;
}
recordtypeonChange(evt:any){
let e=this.f.recordtype.value as any;
this.boreportForm.patchValue({recordtypedesc:evt.options[evt.options.selectedIndex].text});
}
userfieldonChange(evt:any){
let e=evt.value;
}
employeefieldonChange(evt:any){
let e=evt.value;
}
userfiltertypeonChange(evt:any){
let e=evt.value;
}
rolefieldonChange(evt:any){
let e=evt.value;
}
dashboardidonChange(evt:any){
let e=evt.value;
}
tableheaderonChange(evt:any){
let e=evt.value;
}
reportjsondataonChange(evt:any){
let e=evt.value;
}
helptextonChange(evt:any){
let e=evt.value;
}
filtersonChange(evt:any){
let e=evt.value;
}
filtercolumnsonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.boreportservice.getboreportsByEID(pkcol).then(res => {

this.boreportservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boreport.reportid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boreport.reportid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boreportForm.patchValue({
reportid: res.boreport.reportid,
reportcode: res.boreport.reportcode,
reportcodedesc: res.boreport.reportcodedesc,
reportname: res.boreport.reportname,
reportmodule: res.boreport.reportmodule,
reportmoduledesc: res.boreport.reportmoduledesc,
reporttype: res.boreport.reporttype,
reporttypedesc: res.boreport.reporttypedesc,
columns: res.boreport.columns,
sidefilter: res.boreport.sidefilter,
sidefilters: res.boreport.sidefilters,
maintablename: res.boreport.maintablename,
maintablealias: res.boreport.maintablealias,
maintableidentityfield: res.boreport.maintableidentityfield,
pk: res.boreport.pk,
query: res.boreport.query,
wherecondition: res.boreport.wherecondition,
cardtype: res.boreport.cardtype,
html: res.boreport.html,
calendar: res.boreport.calendar,
kanbanview: res.boreport.kanbanview,
kanbankey: res.boreport.kanbankey,
datefilter: res.boreport.datefilter,
datefiltercolumnname: res.boreport.datefiltercolumnname,
datefiltertype: res.boreport.datefiltertype,
datefiltertypedesc: res.boreport.datefiltertypedesc,
groupby: res.boreport.groupby,
groupbytext: res.boreport.groupbytext,
groupby2: res.boreport.groupby2,
groupby2text: res.boreport.groupby2text,
groupbyrelationship: res.boreport.groupbyrelationship,
groupbyrelationshipdesc: res.boreport.groupbyrelationshipdesc,
sortby1: res.boreport.sortby1,
sortby2: res.boreport.sortby2,
sortby3: res.boreport.sortby3,
parentid: res.boreport.parentid,
parentdescription: res.boreport.parentdescription,
detailtablename: res.boreport.detailtablename,
detailtablealias: res.boreport.detailtablealias,
jointype: res.boreport.jointype,
jointypedesc: res.boreport.jointypedesc,
detailtableidentityfield: res.boreport.detailtableidentityfield,
detailtablefk: res.boreport.detailtablefk,
detailtableconcatenate: res.boreport.detailtableconcatenate,
detailtableheader: res.boreport.detailtableheader,
detailtablefooter: res.boreport.detailtablefooter,
detailtablequery: res.boreport.detailtablequery,
masterdetailwhere: res.boreport.masterdetailwhere,
numrows: res.boreport.numrows,
reportoutputtype: res.boreport.reportoutputtype,
reportoutputtypedesc: res.boreport.reportoutputtypedesc,
noheader: res.boreport.noheader,
header: res.boreport.header,
footer: res.boreport.footer,
headerquery: res.boreport.headerquery,
footerquery: res.boreport.footerquery,
headerquery1: res.boreport.headerquery1,
footerquery1: res.boreport.footerquery1,
headerquery2: res.boreport.headerquery2,
footerquery2: res.boreport.footerquery2,
headerquery3: res.boreport.headerquery3,
footerquery3: res.boreport.footerquery3,
headerquery4: res.boreport.headerquery4,
footerquery4: res.boreport.footerquery4,
headerquery5: res.boreport.headerquery5,
footerquery5: res.boreport.footerquery5,
header1: res.boreport.header1,
footer1: res.boreport.footer1,
header2: res.boreport.header2,
footer2: res.boreport.footer2,
header3: res.boreport.header3,
footer3: res.boreport.footer3,
header4: res.boreport.header4,
footer4: res.boreport.footer4,
header5: res.boreport.header5,
footer5: res.boreport.footer5,
status: res.boreport.status,
statusdesc: res.boreport.statusdesc,
css: res.boreport.css,
viewhtmltype: res.boreport.viewhtmltype,
viewhtmltypedesc: res.boreport.viewhtmltypedesc,
viewhtml: res.boreport.viewhtml,
viewcss: res.boreport.viewcss,
reporthtml: res.boreport.reporthtml,
workflowhtmltype: res.boreport.workflowhtmltype,
workflowhtmltypedesc: res.boreport.workflowhtmltypedesc,
workflowhtml: res.boreport.workflowhtml,
component: res.boreport.component,
alternateview: res.boreport.alternateview,
recordtype: res.boreport.recordtype,
recordtypedesc: res.boreport.recordtypedesc,
userfield: res.boreport.userfield,
employeefield: res.boreport.employeefield,
userfiltertype: res.boreport.userfiltertype,
rolefield: res.boreport.rolefield,
dashboardid: res.boreport.dashboardid,
dashboardiddesc: res.boreport.dashboardiddesc,
tableheader: res.boreport.tableheader,
reportjsondata: res.boreport.reportjsondata,
helptext: res.boreport.helptext,
filters: res.boreport.filters,
filtercolumns: res.boreport.filtercolumns,
});
this.boreportdetailsvisiblelist=res.boreportdetailsvisiblelist;
this.boreportothertablesvisiblelist=res.boreportothertablesvisiblelist;
this.boreportcolumnsvisiblelist=res.boreportcolumnsvisiblelist;
//Child Tables if any
this.boreportservice.boreportdetails = res.boreportdetails;
this.SetboreportdetailsTableConfig();
this.boreportdetailsLoadTable();
  setTimeout(() => {
  this.SetboreportdetailsTableddConfig();
  });
this.boreportservice.boreportothertables = res.boreportothertables;
this.SetboreportothertablesTableConfig();
this.boreportothertablesLoadTable();
  setTimeout(() => {
  this.SetboreportothertablesTableddConfig();
  });
this.boreportservice.boreportcolumns = res.boreportcolumns;
this.SetboreportcolumnsTableConfig();
this.boreportcolumnsLoadTable();
  setTimeout(() => {
  this.SetboreportcolumnsTableddConfig();
  });
}

validate()
{
let ret=true;
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.boreportForm.controls) {
    if (this.boreportForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boreportForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boreportForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boreportForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
this.dialogRef.close(obj);
setTimeout(() => {
//this.dialogRef.destroy();
},200);
}

//This has to come from bomenuactions & procedures
afteraction(mode:any)
{
    let formname="";
    let query="";
    if(mode=="new")
        this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if(mode=="refresh")
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
}

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.boreportForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boreportForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boreportForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boreportservice.formData=this.boreportForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boreportForm.controls[key] != null)
    {
        this.boreportservice.formData[key] = this.boreportForm.controls[key].value;
    }
}
}
}
this.boreportservice.formData.DeletedboreportdetailIDs = this.DeletedboreportdetailIDs;
this.boreportservice.formData.DeletedboreportothertableIDs = this.DeletedboreportothertableIDs;
this.boreportservice.formData.DeletedboreportcolumnIDs = this.DeletedboreportcolumnIDs;
console.log(this.boreportservice.formData);
this.boreportservice.formData=this.boreportForm.value;
this.boreportservice.saveOrUpdateboreports().subscribe(
async res => {
if (this.boreportdetailssource.data)
{
    for (let i = 0; i < this.boreportdetailssource.data.length; i++)
    {
        if (this.boreportdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boreportdetailssource.data[i].fileattachmentlist);
    }
}
if (this.boreportothertablessource.data)
{
    for (let i = 0; i < this.boreportothertablessource.data.length; i++)
    {
        if (this.boreportothertablessource.data[i].fileattachmentlist)await this.sharedService.upload(this.boreportothertablessource.data[i].fileattachmentlist);
    }
}
if (this.boreportcolumnssource.data)
{
    for (let i = 0; i < this.boreportcolumnssource.data.length; i++)
    {
        if (this.boreportcolumnssource.data[i].fileattachmentlist)await this.sharedService.upload(this.boreportcolumnssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boreport);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boreportservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boreport);
}
else
{
this.FillData(res);
}
}
this.boreportForm.markAsUntouched();
this.boreportForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdashboardid( dashboardid) {
/*let ScreenType='2';
this.dialog.open(bodashboardComponent, 
{
data: {dashboardid:this.boreportForm.get('dashboardid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditboreportdetail(event:any,reportdetailid:any, reportid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boreportdetailComponent, 
{
data:  {  showview:this.showview,save:false,event,reportdetailid, reportid,visiblelist:this.boreportdetailsvisiblelist,  hidelist:this.boreportdetailshidelist,ScreenType:2  },
header: 'boreportdetails'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boreportdetailssource.add(res);
this.boreportdetailssource.refresh();
}
else
{
this.boreportdetailssource.update(event.data, res);
}
}
});
}

onDeleteboreportdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboreportdetailIDs += childID + ",";
this.boreportservice.boreportdetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboreportothertable(event:any,othertableid:any, reportid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boreportothertableComponent, 
{
data:  {  showview:this.showview,save:false,event,othertableid, reportid,visiblelist:this.boreportothertablesvisiblelist,  hidelist:this.boreportothertableshidelist,ScreenType:2  },
header: 'boreportothertables'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boreportothertablessource.add(res);
this.boreportothertablessource.refresh();
}
else
{
this.boreportothertablessource.update(event.data, res);
}
}
});
}

onDeleteboreportothertable(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboreportothertableIDs += childID + ",";
this.boreportservice.boreportothertables.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditboreportcolumn(event:any,reportcolumnid:any, reportid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(boreportcolumnComponent, 
{
data:  {  showview:this.showview,save:false,event,reportcolumnid, reportid,visiblelist:this.boreportcolumnsvisiblelist,  hidelist:this.boreportcolumnshidelist,ScreenType:2  },
header: 'Columns'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.boreportcolumnssource.add(res);
this.boreportcolumnssource.refresh();
}
else
{
this.boreportcolumnssource.update(event.data, res);
}
}
});
}

onDeleteboreportcolumn(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedboreportcolumnIDs += childID + ",";
this.boreportservice.boreportcolumns.splice(i, 1);
//this.updateGrandTotal();
}
MakeAllHide()
{
    for(let i=0;i<this.boreportservice.boreportcolumns.length;i++)
    {
        this.boreportservice.boreportcolumns[i].hide=true;
    }
    
    this.onSubmitData(false);
}
PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes boreportdetails
boreportdetailssettings:any;
boreportdetailssource: any;

showboreportdetailsCheckbox()
{
debugger;
if(this.tblboreportdetailssource.settings['selectMode']== 'multi')this.tblboreportdetailssource.settings['selectMode']= 'single';
else
this.tblboreportdetailssource.settings['selectMode']= 'multi';
this.tblboreportdetailssource.initGrid();
}
deleteboreportdetailsAll()
{
this.tblboreportdetailssource.settings['selectMode'] = 'single';
}
showboreportdetailsFilter()
{
  setTimeout(() => {
  this.SetboreportdetailsTableddConfig();
  });
      if(this.tblboreportdetailssource.settings!=null)this.tblboreportdetailssource.settings['hideSubHeader'] =!this.tblboreportdetailssource.settings['hideSubHeader'];
this.tblboreportdetailssource.initGrid();
}
showboreportdetailsInActive()
{
}
enableboreportdetailsInActive()
{
}
async SetboreportdetailsTableddConfig()
{
if(!this.bfilterPopulateboreportdetails){
}
this.bfilterPopulateboreportdetails=true;
}
async boreportdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboreportdetailsTableConfig()
{
this.boreportdetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
tablename: {
title: 'Table Name',
type: '',
filter:true,
},
formula: {
title: 'Formula',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
separator: {
title: 'Separator',
type: '',
filter:true,
},
header: {
title: 'Header',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
footer: {
title: 'Footer',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
wherecondition: {
title: 'Where Condition',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
alias: {
title: 'Alias',
type: '',
filter:true,
},
},
};
}
boreportdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreportdetailsID)>=0)
{
this.boreportdetailssource=new LocalDataSource();
this.boreportdetailssource.load(this.boreportservice.boreportdetails as  any as LocalDataSource);
this.boreportdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boreportdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boreportservice.boreportdetails.length == 0)
{
    this.tblboreportdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new boreportdetail();
    this.boreportservice.boreportdetails.push(obj);
    this.boreportdetailssource.refresh();
    if ((this.boreportservice.boreportdetails.length / this.boreportdetailssource.getPaging().perPage).toFixed(0) + 1 != this.boreportdetailssource.getPaging().page)
    {
        this.boreportdetailssource.setPage((this.boreportservice.boreportdetails.length / this.boreportdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboreportdetailssource.grid.edit(this.tblboreportdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boreportdetailssource.data.indexOf(event.data);
this.onDeleteboreportdetail(event,event.data.reportdetailid,((this.boreportdetailssource.getPaging().page-1) *this.boreportdetailssource.getPaging().perPage)+index);
this.boreportdetailssource.refresh();
break;
}
}

*/
boreportdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboreportdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboreportdetail(event,event.data.reportdetailid,this.formid);
break;
case 'delete':
this.onDeleteboreportdetail(event,event.data.reportdetailid,((this.boreportdetailssource.getPaging().page-1) *this.boreportdetailssource.getPaging().perPage)+event.index);
this.boreportdetailssource.refresh();
break;
}
}
boreportdetailsonDelete(obj) {
let reportdetailid=obj.data.reportdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.boreportservice.deleteboreport(reportdetailid).then(res=>
this.boreportdetailsLoadTable()
);
}
}
boreportdetailsPaging(val)
{
debugger;
this.boreportdetailssource.setPaging(1, val, true);
}

handleboreportdetailsGridSelected(event:any) {
this.boreportdetailsselectedindex=this.boreportservice.boreportdetails.findIndex(i => i.reportdetailid === event.data.reportdetailid);
}
IsboreportdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreportdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boreportdetails
//start of Grid Codes boreportothertables
boreportothertablessettings:any;
boreportothertablessource: any;

showboreportothertablesCheckbox()
{
debugger;
if(this.tblboreportothertablessource.settings['selectMode']== 'multi')this.tblboreportothertablessource.settings['selectMode']= 'single';
else
this.tblboreportothertablessource.settings['selectMode']= 'multi';
this.tblboreportothertablessource.initGrid();
}
deleteboreportothertablesAll()
{
this.tblboreportothertablessource.settings['selectMode'] = 'single';
}
showboreportothertablesFilter()
{
  setTimeout(() => {
  this.SetboreportothertablesTableddConfig();
  });
      if(this.tblboreportothertablessource.settings!=null)this.tblboreportothertablessource.settings['hideSubHeader'] =!this.tblboreportothertablessource.settings['hideSubHeader'];
this.tblboreportothertablessource.initGrid();
}
showboreportothertablesInActive()
{
}
enableboreportothertablesInActive()
{
}
async SetboreportothertablesTableddConfig()
{
if(!this.bfilterPopulateboreportothertables){
}
this.bfilterPopulateboreportothertables=true;
}
async boreportothertablesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboreportothertablesTableConfig()
{
this.boreportothertablessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
tablename: {
title: 'Table Name',
type: '',
filter:true,
},
tablealias: {
title: 'Table Alias',
type: '',
filter:true,
},
jointype: {
title: 'Join Type',
type: '',
filter:true,
},
wherecondition: {
title: 'Where Condition',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
boreportothertablesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreportothertablesID)>=0)
{
this.boreportothertablessource=new LocalDataSource();
this.boreportothertablessource.load(this.boreportservice.boreportothertables as  any as LocalDataSource);
this.boreportothertablessource.setPaging(1, 20, true);
}
}

//external to inline
/*
boreportothertablesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boreportservice.boreportothertables.length == 0)
{
    this.tblboreportothertablessource.grid.createFormShown = true;
}
else
{
    let obj = new boreportothertable();
    this.boreportservice.boreportothertables.push(obj);
    this.boreportothertablessource.refresh();
    if ((this.boreportservice.boreportothertables.length / this.boreportothertablessource.getPaging().perPage).toFixed(0) + 1 != this.boreportothertablessource.getPaging().page)
    {
        this.boreportothertablessource.setPage((this.boreportservice.boreportothertables.length / this.boreportothertablessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboreportothertablessource.grid.edit(this.tblboreportothertablessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boreportothertablessource.data.indexOf(event.data);
this.onDeleteboreportothertable(event,event.data.othertableid,((this.boreportothertablessource.getPaging().page-1) *this.boreportothertablessource.getPaging().perPage)+index);
this.boreportothertablessource.refresh();
break;
}
}

*/
boreportothertablesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboreportothertable(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboreportothertable(event,event.data.othertableid,this.formid);
break;
case 'delete':
this.onDeleteboreportothertable(event,event.data.othertableid,((this.boreportothertablessource.getPaging().page-1) *this.boreportothertablessource.getPaging().perPage)+event.index);
this.boreportothertablessource.refresh();
break;
}
}
boreportothertablesonDelete(obj) {
let othertableid=obj.data.othertableid;
if (confirm('Are you sure to delete this record ?')) {
this.boreportservice.deleteboreport(othertableid).then(res=>
this.boreportothertablesLoadTable()
);
}
}
boreportothertablesPaging(val)
{
debugger;
this.boreportothertablessource.setPaging(1, val, true);
}

handleboreportothertablesGridSelected(event:any) {
this.boreportothertablesselectedindex=this.boreportservice.boreportothertables.findIndex(i => i.othertableid === event.data.othertableid);
}
IsboreportothertablesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreportothertablesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boreportothertables
//start of Grid Codes boreportcolumns
boreportcolumnssettings:any;
boreportcolumnssource: any;

showboreportcolumnsCheckbox()
{
debugger;
if(this.tblboreportcolumnssource.settings['selectMode']== 'multi')this.tblboreportcolumnssource.settings['selectMode']= 'single';
else
this.tblboreportcolumnssource.settings['selectMode']= 'multi';
this.tblboreportcolumnssource.initGrid();
}
deleteboreportcolumnsAll()
{
this.tblboreportcolumnssource.settings['selectMode'] = 'single';
}
showboreportcolumnsFilter()
{
  setTimeout(() => {
  this.SetboreportcolumnsTableddConfig();
  });
      if(this.tblboreportcolumnssource.settings!=null)this.tblboreportcolumnssource.settings['hideSubHeader'] =!this.tblboreportcolumnssource.settings['hideSubHeader'];
this.tblboreportcolumnssource.initGrid();
}
showboreportcolumnsInActive()
{
}
enableboreportcolumnsInActive()
{
}
async SetboreportcolumnsTableddConfig()
{
if(!this.bfilterPopulateboreportcolumns){

this.configservice.getList("filtertype").then(res=>
{
var datafiltertype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databoreportcolumnsfiltertype3.push(defaultobj);
for(let i=0; i<datafiltertype2.length; i++){
var obj= { value: datafiltertype2[i].configkey, title: datafiltertype2[i].configtext};
this.databoreportcolumnsfiltertype3.push(obj);
}
var clone = this.sharedService.clone(this.tblboreportcolumnssource.settings);
if(clone.columns['filtertype']!=undefined)clone.columns['filtertype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoreportcolumnsfiltertype3)), }, };
if(clone.columns['filtertype']!=undefined)clone.columns['filtertype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databoreportcolumnsfiltertype3)), }, };
this.tblboreportcolumnssource.settings =  clone;
this.tblboreportcolumnssource.initGrid();
});
}
this.bfilterPopulateboreportcolumns=true;
}
async boreportcolumnsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetboreportcolumnsTableConfig()
{
this.boreportcolumnssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
tablealias: {
title: 'Table Alias',
type: '',
filter:true,
},
field: {
title: 'Field',
type: '',
filter:true,
},
header: {
title: 'Header',
type: '',
filter:true,
},
columnalias: {
title: 'Column Alias',
type: '',
filter:true,
},
hide: {
title: 'Hide',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
derived: {
title: 'Derived',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
datatype: {
title: 'Datatype',
type: '',
filter:true,
},
fkfilter: {
title: 'F K Filter',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
filtertype: {
title: 'Filter Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databoreportcolumnsfiltertype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
width: {
title: 'Width',
type: 'number',
filter:true,
},
nofilter: {
title: 'No Filter',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
groupby: {
title: 'Group By',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
sum: {
title: 'Sum',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
count: {
title: 'Count',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
colhtml: {
title: 'Col H T M L',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
poptitle: {
title: 'Pop Title',
type: '',
filter:true,
},
link: {
title: 'Link',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
linkurl: {
title: 'Link U R L',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
service: {
title: 'Service',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
servicename: {
title: 'Service Name',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
sp: {
title: 'S P',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
spname: {
title: 'S P Name',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
this.sharedService.alert: {
title: 'this.sharedService.alert',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
caps: {
title: 'Caps',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
bold: {
title: 'Bold',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
italic: {
title: 'Italic',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
strikethrough: {
title: 'Strikethrough',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
bgcolor: {
title: 'B G Color',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
forecolor: {
title: 'Fore Color',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
conditionstyle: {
title: 'Condition Style',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
performancestatusvalues: {
title: 'Performance Status Values',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
notsortable: {
title: 'Not Sortable',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
sequence: {
title: 'Sequence',
type: 'number',
filter:true,
},
sumcondition: {
title: 'Sum Condition',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
countcondition: {
title: 'Count Condition',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
min: {
title: 'Min',
type: 'number',
filter:true,
},
max: {
title: 'Max',
type: 'number',
filter:true,
},
maxchars: {
title: 'Max Chars',
type: 'number',
filter:true,
},
helptext: {
title: 'Help Text',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
boreportcolumnsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreportcolumnsID)>=0)
{
this.boreportcolumnssource=new LocalDataSource();
this.boreportcolumnssource.load(this.boreportservice.boreportcolumns as  any as LocalDataSource);
this.boreportcolumnssource.setPaging(1, 20, true);
}
}

//external to inline
/*
boreportcolumnsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boreportservice.boreportcolumns.length == 0)
{
    this.tblboreportcolumnssource.grid.createFormShown = true;
}
else
{
    let obj = new boreportcolumn();
    this.boreportservice.boreportcolumns.push(obj);
    this.boreportcolumnssource.refresh();
    if ((this.boreportservice.boreportcolumns.length / this.boreportcolumnssource.getPaging().perPage).toFixed(0) + 1 != this.boreportcolumnssource.getPaging().page)
    {
        this.boreportcolumnssource.setPage((this.boreportservice.boreportcolumns.length / this.boreportcolumnssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblboreportcolumnssource.grid.edit(this.tblboreportcolumnssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.boreportcolumnssource.data.indexOf(event.data);
this.onDeleteboreportcolumn(event,event.data.reportcolumnid,((this.boreportcolumnssource.getPaging().page-1) *this.boreportcolumnssource.getPaging().perPage)+index);
this.boreportcolumnssource.refresh();
break;
}
}

*/
boreportcolumnsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditboreportcolumn(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditboreportcolumn(event,event.data.reportcolumnid,this.formid);
break;
case 'delete':
this.onDeleteboreportcolumn(event,event.data.reportcolumnid,((this.boreportcolumnssource.getPaging().page-1) *this.boreportcolumnssource.getPaging().perPage)+event.index);
this.boreportcolumnssource.refresh();
break;
}
}
boreportcolumnsonDelete(obj) {
let reportcolumnid=obj.data.reportcolumnid;
if (confirm('Are you sure to delete this record ?')) {
this.boreportservice.deleteboreport(reportcolumnid).then(res=>
this.boreportcolumnsLoadTable()
);
}
}
boreportcolumnsPaging(val)
{
debugger;
this.boreportcolumnssource.setPaging(1, val, true);
}

handleboreportcolumnsGridSelected(event:any) {
this.boreportcolumnsselectedindex=this.boreportservice.boreportcolumns.findIndex(i => i.reportcolumnid === event.data.reportcolumnid);
}

  async boreportcolumnsmoveUp() {
    this.boreportcolumnsmove(-1);
  }

  async boreportcolumnsmove(val) {
    let index=((this.boreportcolumnssource.getPaging().page - 1) * this.boreportcolumnssource.getPaging().perPage) + this.boreportcolumnsselectedindex;
    if (index >= 0) {
      
      var current = this.boreportservice.boreportcolumns[index];
      var tmp = this.boreportservice.boreportcolumns[index +val];
      this.boreportservice.boreportcolumns[index +val] = this.boreportservice.boreportcolumns[index];
      this.boreportservice.boreportcolumns[index] = tmp;
      this.boreportservice.boreportcolumns[index +val].sequence=index +val;
      this.boreportservice.boreportcolumns[index].sequence=index;
      this.boreportcolumnssource.refresh();
      this.boreportcolumnsselectedindex=this.boreportservice.boreportcolumns.findIndex(i => i.reportcolumnid === current.reportcolumnid);
      this.tblboreportcolumnssource.grid.getRows().forEach((row:any) => {
        if( current.reportcolumnid == row.data.reportcolumnid) {
          this.tblboreportcolumnssource.grid.selectRow(row);
          
        }
      });
    }
  }

  boreportcolumnsmoveDown() {
    return this.boreportcolumnsmove(1);
  }
IsboreportcolumnsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.boreportcolumnsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes boreportcolumns

}



