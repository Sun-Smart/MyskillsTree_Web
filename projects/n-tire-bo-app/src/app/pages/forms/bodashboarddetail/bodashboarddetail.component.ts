import { bodashboarddetailService } from './../../../service/bodashboarddetail.service';
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
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
import { bomasterdatatype} from './../../../model/bomasterdatatype.model';
import { bomasterdatatypeService } from './../../../service/bomasterdatatype.service';
//popups
import { bomenumaster} from './../../../model/bomenumaster.model';
import { bomenumasterService } from './../../../service/bomenumaster.service';
//popups
//detail table services
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
selector: 'app-bodashboarddetail',
templateUrl: './bodashboarddetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bodashboarddetailComponent implements OnInit {
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
bfilterPopulatebodashboarddetails:boolean=false;
databodashboarddetailsdashboardid3:any=[];
databodashboarddetailscharttype3:any=[];
databodashboarddetailsparameter1type3:any=[];
databodashboarddetailsparameter1datetype3:any=[];
databodashboarddetailsparameter2type3:any=[];
databodashboarddetailsparameter2datetype3:any=[];
databodashboarddetailsparameter3type3:any=[];
databodashboarddetailsparameter3datetype3:any=[];
databodashboarddetailsmenuid3:any=[];
databodashboarddetailsreportid3:any=[];
 bodashboarddetailForm: FormGroup;
dashboardidList: bodashboard[];
dashboardidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
dashboardid_bodashboardsForm: FormGroup;//autocomplete
dashboardid_bodashboardsoptions:any;//autocomplete
dashboardid_bodashboardsformatter:any;//autocomplete
charttypeList: boconfigvalue[];
parameter1typeList: bomasterdatatype[];
parameter1datetypeList: boconfigvalue[];
parameter2typeList: bomasterdatatype[];
parameter2datetypeList: boconfigvalue[];
parameter3typeList: bomasterdatatype[];
parameter3datetypeList: boconfigvalue[];
menuidList: bomenumaster[];
menuidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
menuid_bomenumastersForm: FormGroup;//autocomplete
menuid_bomenumastersoptions:any;//autocomplete
menuid_bomenumastersformatter:any;//autocomplete
reportidList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bodashboarddetailservice: bodashboarddetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bodashboardservice:bodashboardService,
private bomasterdatatypeservice:bomasterdatatypeService,
private bomenumasterservice:bomenumasterService,
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
this.bodashboarddetailForm  = this.fb.group({pk:[null],dashboarddetailid: [null],
dashboardid: [null],
dashboardiddesc: [null],
dashboardname: [null],
title: [null],
row: [null],
col: [null],
charttype: [null],
charttypedesc: [null],
tablename: [null],
recordname: [null],
parameter: [null],
name: [null],
value: [null],
parameter1variable: [null],
parameter1type: [null],
parameter1typedesc: [null],
parameter1datetype: [null],
parameter1datetypedesc: [null],
parameter2variable: [null],
parameter2type: [null],
parameter2typedesc: [null],
parameter2datetype: [null],
parameter2datetypedesc: [null],
parameter3variable: [null],
parameter3type: [null],
parameter3typedesc: [null],
parameter3datetype: [null],
parameter3datetypedesc: [null],
backgroundcolor: [null],
hoverbackgroundcolor: [null],
bordercolor: [null],
menuid: [null],
menuiddesc: [null],
reportid: [null],
reportiddesc: [null],
helptext: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bodashboarddetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bodashboarddetailForm.dirty && this.bodashboarddetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.dashboarddetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.dashboarddetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.dashboarddetailid && pkDetail) {
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
let bodashboarddetailid = null;

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
this.formid=bodashboarddetailid;
//this.sharedService.alert(bodashboarddetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bodashboardservice.getbodashboardsList().then(res => 
{
this.dashboardidList = res as bodashboard[];
if(this.bodashboarddetailservice.formData && this.bodashboarddetailservice.formData.dashboardid){
this.dashboardidoptionsEvent.emit(this.dashboardidList);
this.bodashboarddetailForm.patchValue({
    dashboardid: this.bodashboarddetailservice.formData.dashboardid,
    dashboardiddesc: this.bodashboarddetailservice.formData.dashboardiddesc,
});
}
{
let arrdashboardid = this.dashboardidList.filter(v => v.dashboardid == this.bodashboarddetailForm.get('dashboardid').value);
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
this.configservice.getList("charttype").then(res => this.charttypeList = res as boconfigvalue[]);
this.bomasterdatatypeservice.getbomasterdatatypesList().then(res => 
{
this.parameter1typeList = res as bomasterdatatype[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("datefiltertype").then(res => this.parameter1datetypeList = res as boconfigvalue[]);
this.bomasterdatatypeservice.getbomasterdatatypesList().then(res => 
{
this.parameter2typeList = res as bomasterdatatype[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("datefiltertype").then(res => this.parameter2datetypeList = res as boconfigvalue[]);
this.bomasterdatatypeservice.getbomasterdatatypesList().then(res => 
{
this.parameter3typeList = res as bomasterdatatype[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("datefiltertype").then(res => this.parameter3datetypeList = res as boconfigvalue[]);
this.bomenumasterservice.getbomenumastersList().then(res => 
{
this.menuidList = res as bomenumaster[];
if(this.bodashboarddetailservice.formData && this.bodashboarddetailservice.formData.menuid){
this.menuidoptionsEvent.emit(this.menuidList);
this.bodashboarddetailForm.patchValue({
    menuid: this.bodashboarddetailservice.formData.menuid,
    menuiddesc: this.bodashboarddetailservice.formData.menuiddesc,
});
}
{
let arrmenuid = this.menuidList.filter(v => v.menuid == this.bodashboarddetailForm.get('menuid').value);
let objmenuid;
if (arrmenuid.length > 0) objmenuid = arrmenuid[0];
if (objmenuid)
{
}
}
}
).catch((err) => {console.log(err);});
this.menuid_bomenumastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.menuidList.filter(v => v.menudescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.menuid_bomenumastersformatter = (result: any) => result.menudescription;
this.configservice.getList("reportid").then(res => this.reportidList = res as boconfigvalue[]);

//autocomplete
    this.bodashboarddetailservice.getbodashboarddetailsList().then(res => {
      this.pkList = res as bodashboarddetail[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.bodashboarddetailForm.markAsUntouched();
this.bodashboarddetailForm.markAsPristine();
}
onSelecteddashboardid(dashboardidDetail: any) {
if (dashboardidDetail.dashboardid && dashboardidDetail) {
this.bodashboarddetailForm.patchValue({
dashboardid: dashboardidDetail.dashboardid,
dashboardiddesc: dashboardidDetail.dashboardname,

});

}
}

onSelectedmenuid(menuidDetail: any) {
if (menuidDetail.menuid && menuidDetail) {
this.bodashboarddetailForm.patchValue({
menuid: menuidDetail.menuid,
menuiddesc: menuidDetail.menudescription,

});

}
}




resetForm() {
if (this.bodashboarddetailForm != null)
this.bodashboarddetailForm.reset();
this.bodashboarddetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let dashboarddetailid = this.bodashboarddetailForm.get('dashboarddetailid').value;
        if(dashboarddetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bodashboarddetailservice.deletebodashboarddetail(dashboarddetailid).then(res =>
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
    this.bodashboarddetailForm.patchValue({
        dashboarddetailid: null
    });
    if(this.bodashboarddetailservice.formData.dashboarddetailid!=null)this.bodashboarddetailservice.formData.dashboarddetailid=null;
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
this.bodashboarddetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bodashboarddetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bodashboarddetailForm.controls[key]!=undefined)this.bodashboarddetailForm.controls[key].disable({onlySelf: true});
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
dashboarddetailidonChange(evt:any){
let e=evt.value;
}
dashboardidonChange(evt:any){
let e=evt.value;
}
dashboardnameonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
rowonChange(evt:any){
let e=evt.value;
}
colonChange(evt:any){
let e=evt.value;
}
charttypeonChange(evt:any){
let e=this.f.charttype.value as any;
this.bodashboarddetailForm.patchValue({charttypedesc:evt.options[evt.options.selectedIndex].text});
}
tablenameonChange(evt:any){
let e=evt.value;
}
recordnameonChange(evt:any){
let e=evt.value;
}
parameteronChange(evt:any){
let e=evt.value;
}
nameonChange(evt:any){
let e=evt.value;
}
valueonChange(evt:any){
let e=evt.value;
}
parameter1variableonChange(evt:any){
let e=evt.value;
}
parameter1typeonChange(evt:any){
let e=evt.value;
this.bodashboarddetailForm.patchValue({parameter1typedesc:evt.options[evt.options.selectedIndex].text});
}
parameter1datetypeonChange(evt:any){
let e=this.f.parameter1datetype.value as any;
this.bodashboarddetailForm.patchValue({parameter1datetypedesc:evt.options[evt.options.selectedIndex].text});
}
parameter2variableonChange(evt:any){
let e=evt.value;
}
parameter2typeonChange(evt:any){
let e=evt.value;
this.bodashboarddetailForm.patchValue({parameter2typedesc:evt.options[evt.options.selectedIndex].text});
}
parameter2datetypeonChange(evt:any){
let e=this.f.parameter2datetype.value as any;
this.bodashboarddetailForm.patchValue({parameter2datetypedesc:evt.options[evt.options.selectedIndex].text});
}
parameter3variableonChange(evt:any){
let e=evt.value;
}
parameter3typeonChange(evt:any){
let e=evt.value;
this.bodashboarddetailForm.patchValue({parameter3typedesc:evt.options[evt.options.selectedIndex].text});
}
parameter3datetypeonChange(evt:any){
let e=this.f.parameter3datetype.value as any;
this.bodashboarddetailForm.patchValue({parameter3datetypedesc:evt.options[evt.options.selectedIndex].text});
}
backgroundcoloronChange(evt:any){
let e=evt.value;
}
hoverbackgroundcoloronChange(evt:any){
let e=evt.value;
}
bordercoloronChange(evt:any){
let e=evt.value;
}
menuidonChange(evt:any){
let e=evt.value;
}
reportidonChange(evt:any){
let e=this.f.reportid.value as any;
this.bodashboarddetailForm.patchValue({reportiddesc:evt.options[evt.options.selectedIndex].text});
}
helptextonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.bodashboarddetailservice.getbodashboarddetailsByEID(pkcol).then(res => {

this.bodashboarddetailservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bodashboarddetail.dashboarddetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bodashboarddetail.dashboarddetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bodashboarddetailForm.patchValue({
dashboarddetailid: res.bodashboarddetail.dashboarddetailid,
dashboardid: res.bodashboarddetail.dashboardid,
dashboardiddesc: res.bodashboarddetail.dashboardiddesc,
dashboardname: res.bodashboarddetail.dashboardname,
title: res.bodashboarddetail.title,
row: res.bodashboarddetail.row,
col: res.bodashboarddetail.col,
charttype: res.bodashboarddetail.charttype,
charttypedesc: res.bodashboarddetail.charttypedesc,
tablename: res.bodashboarddetail.tablename,
recordname: res.bodashboarddetail.recordname,
parameter: res.bodashboarddetail.parameter,
name: res.bodashboarddetail.name,
value: res.bodashboarddetail.value,
parameter1variable: res.bodashboarddetail.parameter1variable,
parameter1type: res.bodashboarddetail.parameter1type,
parameter1typedesc: res.bodashboarddetail.parameter1typedesc,
parameter1datetype: res.bodashboarddetail.parameter1datetype,
parameter1datetypedesc: res.bodashboarddetail.parameter1datetypedesc,
parameter2variable: res.bodashboarddetail.parameter2variable,
parameter2type: res.bodashboarddetail.parameter2type,
parameter2typedesc: res.bodashboarddetail.parameter2typedesc,
parameter2datetype: res.bodashboarddetail.parameter2datetype,
parameter2datetypedesc: res.bodashboarddetail.parameter2datetypedesc,
parameter3variable: res.bodashboarddetail.parameter3variable,
parameter3type: res.bodashboarddetail.parameter3type,
parameter3typedesc: res.bodashboarddetail.parameter3typedesc,
parameter3datetype: res.bodashboarddetail.parameter3datetype,
parameter3datetypedesc: res.bodashboarddetail.parameter3datetypedesc,
backgroundcolor: res.bodashboarddetail.backgroundcolor,
hoverbackgroundcolor: res.bodashboarddetail.hoverbackgroundcolor,
bordercolor: res.bodashboarddetail.bordercolor,
menuid: res.bodashboarddetail.menuid,
menuiddesc: res.bodashboarddetail.menuiddesc,
reportid: res.bodashboarddetail.reportid,
reportiddesc: res.bodashboarddetail.reportiddesc,
helptext: res.bodashboarddetail.helptext,
status: res.bodashboarddetail.status,
statusdesc: res.bodashboarddetail.statusdesc,
});
//Child Tables if any
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
  for (let key in this.bodashboarddetailForm.controls) {
    if (this.bodashboarddetailForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bodashboarddetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bodashboarddetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bodashboarddetailForm.value;
console.log(obj);
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
Object.keys(this.bodashboarddetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bodashboarddetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bodashboarddetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bodashboarddetailservice.formData=this.bodashboarddetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bodashboarddetailForm.controls[key] != null)
    {
        this.bodashboarddetailservice.formData[key] = this.bodashboarddetailForm.controls[key].value;
    }
}
}
}
console.log(this.bodashboarddetailservice.formData);
this.bodashboarddetailservice.formData=this.bodashboarddetailForm.value;
this.bodashboarddetailservice.saveOrUpdatebodashboarddetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bodashboarddetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bodashboarddetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bodashboarddetail);
}
else
{
this.FillData(res);
}
}
this.bodashboarddetailForm.markAsUntouched();
this.bodashboarddetailForm.markAsPristine();
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
data: {dashboardid:this.bodashboarddetailForm.get('dashboardid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparameter1type( datatypeid) {
/*let ScreenType='2';
this.dialog.open(bomasterdatatypeComponent, 
{
data: {datatypeid:this.bodashboarddetailForm.get('parameter1type').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparameter2type( datatypeid) {
/*let ScreenType='2';
this.dialog.open(bomasterdatatypeComponent, 
{
data: {datatypeid:this.bodashboarddetailForm.get('parameter2type').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparameter3type( datatypeid) {
/*let ScreenType='2';
this.dialog.open(bomasterdatatypeComponent, 
{
data: {datatypeid:this.bodashboarddetailForm.get('parameter3type').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmenuid( menuid) {
/*let ScreenType='2';
this.dialog.open(bomenumasterComponent, 
{
data: {menuid:this.bodashboarddetailForm.get('menuid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



