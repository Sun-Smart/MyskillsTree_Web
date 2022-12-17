import { automasterService } from './../../../service/automaster.service';
import { automaster } from './../../../model/automaster.model';
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
//detail table services
import { autodetail } from './../../../model/autodetail.model';
//FK services
import { autodetailComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/autodetail/autodetail.component';
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
selector: 'app-automaster',
templateUrl: './automaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class automasterComponent implements OnInit {
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
bfilterPopulateautomasters:boolean=false;
dataautomastersentrytype3:any=[];
dataautomastersparentid3:any=[];
bfilterPopulateautodetails:boolean=false;
@ViewChild('tblautodetailssource',{static:false}) tblautodetailssource: Ng2SmartTableComponent;
 automasterForm: FormGroup;
entrytypeList: boconfigvalue[];
parentidList: automaster[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



autodetailsvisiblelist:any;
autodetailshidelist:any;

DeletedautodetailIDs: string="";
autodetailsID: string = "1";
autodetailsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private automasterservice: automasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.automasterForm  = this.fb.group({
masterid: [null],
tablename: [null],
title: [null],
tableabbr: [null],
mainscreen: [null],
showheader: [null],
entrytype: [null],
entrytypedesc: [null],
parentid: [null],
parentiddesc: [null],
fk_parent: [null],
ordering: [null],
tablerecord: [null],
pk: [null],
description: [null],
initialstatus: [null],
attachments: [null],
customfields: [null],
parent: [null],
accessrights: [null],
saveas: [null],
listorder: [null],
sequence: [null],
notab: [null],
placeholder: [null],
fromtablename: [null],
fromtablerecord: [null],
fromtablecolumn: [null],
fromtablefkcolumn: [null],
fromtablecolumns: [null],
fromtablemapping: [null],
fromtablealias: [null],
default1: [null],
default2: [null],
default3: [null],
default4: [null],
default5: [null],
singlerecord: [null],
showinsertconfirmmessage: [null],
showupdateconfirmmessage: [null],
showdeleteconfirmmessage: [null],
insertconfirmmessage: [null],
updateconfirmmessage: [null],
deleteconfirmmessage: [null],
service1: [null],
service1query: [null],
service2: [null],
service2query: [null],
service3: [null],
service3query: [null],
contexttables1: [null],
contexttables2: [null],
contexttables3: [null],
contexttables4: [null],
contexttables5: [null],
workflow: [null],
callfunction1: [null],
callfunction2: [null],
callfunction3: [null],
callfunction4: [null],
callfunction5: [null],
labelicon: [null],
usedindropdown: [null],
tabicons: [null],
textareaconfig: [null],
savename: [null],
onlyview: [null],
mustgreater: [null],
mustvisible: [null],
musthide: [null],
mustenable: [null],
mustdisable: [null],
tabs: [null],
tabstart: [null],
sections: [null],
reports: [null],
queryparameters: [null],
servicebytable: [null],
insertmode: [null],
updatemode: [null],
validation1: [null],
validation2: [null],
validation3: [null],
validation4: [null],
validation5: [null],
derived1: [null],
api1: [null],
api2: [null],
api3: [null],
api4: [null],
api5: [null],
html: [null],
detailtableedittype: [null],
customfieldcondition: [null],
status: [null],
statusdesc: [null],
nonew: [null],
noedit: [null],
nodelete: [null],
sendemail: [null],
touser: [null],
nonewrolebased: [null],
noeditrolebased: [null],
nodeleterolebased: [null],
hidesectionrolebased: [null],
readonlysectionrolebased: [null],
sourcefield: [null],
emailtemplate: [null],
customheadername: [null],
attachmentheadername: [null],
valuepreparefunction: [null],
});
}

get f() { return this.automasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.automasterForm.dirty && this.automasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.masterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.masterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.masterid && pkDetail) {
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
let automasterid = null;

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
this.formid=automasterid;
//this.sharedService.alert(automasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetautodetailsTableConfig();
  setTimeout(() => {
  this.SetautodetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("autoentrytype").then(res => this.entrytypeList = res as boconfigvalue[]);
this.automasterservice.getautomastersList().then(res => 
{
this.parentidList = res as automaster[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.automasterservice.getautomastersList().then(res => {
      this.pkList = res as automaster[];
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
this.automasterForm.markAsUntouched();
this.automasterForm.markAsPristine();
}



resetForm() {
if (this.automasterForm != null)
this.automasterForm.reset();
this.automasterForm.patchValue({
});
setTimeout(() => {
this.automasterservice.autodetails=[];
this.autodetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let masterid = this.automasterForm.get('masterid').value;
        if(masterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.automasterservice.deleteautomaster(masterid).then(res =>
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
    this.automasterForm.patchValue({
        masterid: null
    });
    if(this.automasterservice.formData.masterid!=null)this.automasterservice.formData.masterid=null;
for (let i=0;i<this.automasterservice.autodetails.length;i++) {
this.automasterservice.autodetails[i].detailid=null;
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
this.automasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.automasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.automasterForm.controls[key]!=undefined)this.automasterForm.controls[key].disable({onlySelf: true});
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
masteridonChange(evt:any){
let e=evt.value;
}
tablenameonChange(evt:any){
let e=evt.value;
}
titleonChange(evt:any){
let e=evt.value;
}
tableabbronChange(evt:any){
let e=evt.value;
}
mainscreenonChange(evt:any){
let e=evt.value;
}
entrytypeonChange(evt:any){
let e=this.f.entrytype.value as any;
this.automasterForm.patchValue({entrytypedesc:evt.options[evt.options.selectedIndex].text});
}
parentidonChange(evt:any){
let e=evt.value;
this.automasterForm.patchValue({parentiddesc:evt.options[evt.options.selectedIndex].text});
}
fk_parentonChange(evt:any){
let e=evt.value;
}
orderingonChange(evt:any){
let e=evt.value;
}
tablerecordonChange(evt:any){
let e=evt.value;
}
pkonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
initialstatusonChange(evt:any){
let e=evt.value;
}
attachmentsonChange(evt:any){
let e=evt.value;
}
customfieldsonChange(evt:any){
let e=evt.value;
}
parentonChange(evt:any){
let e=evt.value;
}
accessrightsonChange(evt:any){
let e=evt.value;
}
saveasonChange(evt:any){
let e=evt.value;
}
listorderonChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
notabonChange(evt:any){
let e=evt.value;
}
placeholderonChange(evt:any){
let e=evt.value;
}
fromtablenameonChange(evt:any){
let e=evt.value;
}
fromtablerecordonChange(evt:any){
let e=evt.value;
}
fromtablecolumnonChange(evt:any){
let e=evt.value;
}
fromtablefkcolumnonChange(evt:any){
let e=evt.value;
}
fromtablecolumnsonChange(evt:any){
let e=evt.value;
}
fromtablemappingonChange(evt:any){
let e=evt.value;
}
fromtablealiasonChange(evt:any){
let e=evt.value;
}
default1onChange(evt:any){
let e=evt.value;
}
default2onChange(evt:any){
let e=evt.value;
}
default3onChange(evt:any){
let e=evt.value;
}
default4onChange(evt:any){
let e=evt.value;
}
default5onChange(evt:any){
let e=evt.value;
}
singlerecordonChange(evt:any){
let e=evt.value;
}
showinsertconfirmmessageonChange(evt:any){
let e=evt.value;
}
showupdateconfirmmessageonChange(evt:any){
let e=evt.value;
}
showdeleteconfirmmessageonChange(evt:any){
let e=evt.value;
}
insertconfirmmessageonChange(evt:any){
let e=evt.value;
}
updateconfirmmessageonChange(evt:any){
let e=evt.value;
}
deleteconfirmmessageonChange(evt:any){
let e=evt.value;
}
service1onChange(evt:any){
let e=evt.value;
}
service1queryonChange(evt:any){
let e=evt.value;
}
service2onChange(evt:any){
let e=evt.value;
}
service2queryonChange(evt:any){
let e=evt.value;
}
service3onChange(evt:any){
let e=evt.value;
}
service3queryonChange(evt:any){
let e=evt.value;
}
contexttables1onChange(evt:any){
let e=evt.value;
}
contexttables2onChange(evt:any){
let e=evt.value;
}
contexttables3onChange(evt:any){
let e=evt.value;
}
contexttables4onChange(evt:any){
let e=evt.value;
}
contexttables5onChange(evt:any){
let e=evt.value;
}
workflowonChange(evt:any){
let e=evt.value;
}
callfunction1onChange(evt:any){
let e=evt.value;
}
callfunction2onChange(evt:any){
let e=evt.value;
}
callfunction3onChange(evt:any){
let e=evt.value;
}
callfunction4onChange(evt:any){
let e=evt.value;
}
callfunction5onChange(evt:any){
let e=evt.value;
}
labelicononChange(evt:any){
let e=evt.value;
}
usedindropdownonChange(evt:any){
let e=evt.value;
}
tabiconsonChange(evt:any){
let e=evt.value;
}
textareaconfigonChange(evt:any){
let e=evt.value;
}
savenameonChange(evt:any){
let e=evt.value;
}
onlyviewonChange(evt:any){
let e=evt.value;
}
mustgreateronChange(evt:any){
let e=evt.value;
}
mustvisibleonChange(evt:any){
let e=evt.value;
}
musthideonChange(evt:any){
let e=evt.value;
}
mustenableonChange(evt:any){
let e=evt.value;
}
mustdisableonChange(evt:any){
let e=evt.value;
}
tabsonChange(evt:any){
let e=evt.value;
}
tabstartonChange(evt:any){
let e=evt.value;
}
sectionsonChange(evt:any){
let e=evt.value;
}
reportsonChange(evt:any){
let e=evt.value;
}
queryparametersonChange(evt:any){
let e=evt.value;
}
servicebytableonChange(evt:any){
let e=evt.value;
}
insertmodeonChange(evt:any){
let e=evt.value;
}
updatemodeonChange(evt:any){
let e=evt.value;
}
validation1onChange(evt:any){
let e=evt.value;
}
validation2onChange(evt:any){
let e=evt.value;
}
validation3onChange(evt:any){
let e=evt.value;
}
validation4onChange(evt:any){
let e=evt.value;
}
validation5onChange(evt:any){
let e=evt.value;
}
derived1onChange(evt:any){
let e=evt.value;
}
api1onChange(evt:any){
let e=evt.value;
}
api2onChange(evt:any){
let e=evt.value;
}
api3onChange(evt:any){
let e=evt.value;
}
api4onChange(evt:any){
let e=evt.value;
}
api5onChange(evt:any){
let e=evt.value;
}
htmlonChange(evt:any){
let e=evt.value;
}
detailtableedittypeonChange(evt:any){
let e=evt.value;
}
customfieldconditiononChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}
nonewonChange(evt:any){
let e=evt.value;
}
noeditonChange(evt:any){
let e=evt.value;
}
nodeleteonChange(evt:any){
let e=evt.value;
}
sendemailonChange(evt:any){
let e=evt.value;
}
touseronChange(evt:any){
let e=evt.value;
}
nonewrolebasedonChange(evt:any){
let e=evt.value;
}
noeditrolebasedonChange(evt:any){
let e=evt.value;
}
nodeleterolebasedonChange(evt:any){
let e=evt.value;
}
hidesectionrolebasedonChange(evt:any){
let e=evt.value;
}
readonlysectionrolebasedonChange(evt:any){
let e=evt.value;
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
emailtemplateonChange(evt:any){
let e=evt.value;
}
customheadernameonChange(evt:any){
let e=evt.value;
}
attachmentheadernameonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.automasterservice.getautomastersByEID(pkcol).then(res => {

this.automasterservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.automaster.masterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.automaster.masterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.automasterForm.patchValue({
masterid: res.automaster.masterid,
tablename: res.automaster.tablename,
title: res.automaster.title,
tableabbr: res.automaster.tableabbr,
mainscreen: res.automaster.mainscreen,
showheader: res.automaster.showheader,
entrytype: res.automaster.entrytype,
entrytypedesc: res.automaster.entrytypedesc,
parentid: res.automaster.parentid,
parentiddesc: res.automaster.parentiddesc,
fk_parent: res.automaster.fk_parent,
ordering: res.automaster.ordering,
tablerecord: res.automaster.tablerecord,
pk: res.automaster.pk,
description: res.automaster.description,
initialstatus: res.automaster.initialstatus,
attachments: res.automaster.attachments,
customfields: res.automaster.customfields,
parent: res.automaster.parent,
accessrights: res.automaster.accessrights,
saveas: res.automaster.saveas,
listorder: res.automaster.listorder,
sequence: res.automaster.sequence,
notab: res.automaster.notab,
placeholder: res.automaster.placeholder,
fromtablename: res.automaster.fromtablename,
fromtablerecord: res.automaster.fromtablerecord,
fromtablecolumn: res.automaster.fromtablecolumn,
fromtablefkcolumn: res.automaster.fromtablefkcolumn,
fromtablecolumns: res.automaster.fromtablecolumns,
fromtablemapping: res.automaster.fromtablemapping,
fromtablealias: res.automaster.fromtablealias,
default1: res.automaster.default1,
default2: res.automaster.default2,
default3: res.automaster.default3,
default4: res.automaster.default4,
default5: res.automaster.default5,
singlerecord: res.automaster.singlerecord,
showinsertconfirmmessage: res.automaster.showinsertconfirmmessage,
showupdateconfirmmessage: res.automaster.showupdateconfirmmessage,
showdeleteconfirmmessage: res.automaster.showdeleteconfirmmessage,
insertconfirmmessage: res.automaster.insertconfirmmessage,
updateconfirmmessage: res.automaster.updateconfirmmessage,
deleteconfirmmessage: res.automaster.deleteconfirmmessage,
service1: res.automaster.service1,
service1query: res.automaster.service1query,
service2: res.automaster.service2,
service2query: res.automaster.service2query,
service3: res.automaster.service3,
service3query: res.automaster.service3query,
contexttables1: res.automaster.contexttables1,
contexttables2: res.automaster.contexttables2,
contexttables3: res.automaster.contexttables3,
contexttables4: res.automaster.contexttables4,
contexttables5: res.automaster.contexttables5,
workflow: res.automaster.workflow,
callfunction1: res.automaster.callfunction1,
callfunction2: res.automaster.callfunction2,
callfunction3: res.automaster.callfunction3,
callfunction4: res.automaster.callfunction4,
callfunction5: res.automaster.callfunction5,
labelicon: res.automaster.labelicon,
usedindropdown: res.automaster.usedindropdown,
tabicons: res.automaster.tabicons,
textareaconfig: res.automaster.textareaconfig,
savename: res.automaster.savename,
onlyview: res.automaster.onlyview,
mustgreater: res.automaster.mustgreater,
mustvisible: res.automaster.mustvisible,
musthide: res.automaster.musthide,
mustenable: res.automaster.mustenable,
mustdisable: res.automaster.mustdisable,
tabs: res.automaster.tabs,
tabstart: res.automaster.tabstart,
sections: res.automaster.sections,
reports: res.automaster.reports,
queryparameters: res.automaster.queryparameters,
servicebytable: res.automaster.servicebytable,
insertmode: res.automaster.insertmode,
updatemode: res.automaster.updatemode,
validation1: res.automaster.validation1,
validation2: res.automaster.validation2,
validation3: res.automaster.validation3,
validation4: res.automaster.validation4,
validation5: res.automaster.validation5,
derived1: res.automaster.derived1,
api1: res.automaster.api1,
api2: res.automaster.api2,
api3: res.automaster.api3,
api4: res.automaster.api4,
api5: res.automaster.api5,
html: res.automaster.html,
detailtableedittype: res.automaster.detailtableedittype,
customfieldcondition: res.automaster.customfieldcondition,
status: res.automaster.status,
statusdesc: res.automaster.statusdesc,
nonew: res.automaster.nonew,
noedit: res.automaster.noedit,
nodelete: res.automaster.nodelete,
sendemail: res.automaster.sendemail,
touser: res.automaster.touser,
nonewrolebased: res.automaster.nonewrolebased,
noeditrolebased: res.automaster.noeditrolebased,
nodeleterolebased: res.automaster.nodeleterolebased,
hidesectionrolebased: res.automaster.hidesectionrolebased,
readonlysectionrolebased: res.automaster.readonlysectionrolebased,
sourcefield: res.automaster.sourcefield,
emailtemplate: res.automaster.emailtemplate,
customheadername: res.automaster.customheadername,
attachmentheadername: res.automaster.attachmentheadername,
valuepreparefunction: res.automaster.valuepreparefunction,
});
this.autodetailsvisiblelist=res.autodetailsvisiblelist;
//Child Tables if any
this.automasterservice.autodetails = res.autodetails;
this.SetautodetailsTableConfig();
this.autodetailsLoadTable();
  setTimeout(() => {
  this.SetautodetailsTableddConfig();
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
  for (let key in this.automasterForm.controls) {
    if (this.automasterForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.automasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.automasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.automasterForm.value;
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
Object.keys(this.automasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.automasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.automasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.automasterservice.formData=this.automasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.automasterForm.controls[key] != null)
    {
        this.automasterservice.formData[key] = this.automasterForm.controls[key].value;
    }
}
}
}
this.automasterservice.formData.DeletedautodetailIDs = this.DeletedautodetailIDs;
console.log(this.automasterservice.formData);
this.automasterservice.formData=this.automasterForm.value;
this.automasterservice.saveOrUpdateautomasters().subscribe(
async res => {
if (this.autodetailssource.data)
{
    for (let i = 0; i < this.autodetailssource.data.length; i++)
    {
        if (this.autodetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.autodetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.automaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.automasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.automaster);
}
else
{
this.FillData(res);
}
}
this.automasterForm.markAsUntouched();
this.automasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditparentid( masterid) {
/*let ScreenType='2';
this.dialog.open(automasterComponent, 
{
data: {masterid:this.automasterForm.get('parentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditautodetail(event:any,detailid:any, masterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(autodetailComponent, 
{
data:  {  showview:this.showview,save:false,event,detailid, masterid,visiblelist:this.autodetailsvisiblelist,  hidelist:this.autodetailshidelist,ScreenType:2  },
header: 'autodetails'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.autodetailssource.add(res);
this.autodetailssource.refresh();
}
else
{
this.autodetailssource.update(event.data, res);
}
}
});
}

onDeleteautodetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedautodetailIDs += childID + ",";
this.automasterservice.autodetails.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes autodetails
autodetailssettings:any;
autodetailssource: any;

showautodetailsCheckbox()
{
debugger;
if(this.tblautodetailssource.settings['selectMode']== 'multi')this.tblautodetailssource.settings['selectMode']= 'single';
else
this.tblautodetailssource.settings['selectMode']= 'multi';
this.tblautodetailssource.initGrid();
}
deleteautodetailsAll()
{
this.tblautodetailssource.settings['selectMode'] = 'single';
}
showautodetailsFilter()
{
  setTimeout(() => {
  this.SetautodetailsTableddConfig();
  });
      if(this.tblautodetailssource.settings!=null)this.tblautodetailssource.settings['hideSubHeader'] =!this.tblautodetailssource.settings['hideSubHeader'];
this.tblautodetailssource.initGrid();
}
showautodetailsInActive()
{
}
enableautodetailsInActive()
{
}
async SetautodetailsTableddConfig()
{
if(!this.bfilterPopulateautodetails){
}
this.bfilterPopulateautodetails=true;
}
async autodetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetautodetailsTableConfig()
{
this.autodetailssettings = {
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
columnname: {
title: 'Column Name',
type: '',
filter:true,
},
title: {
title: 'Title',
type: '',
filter:true,
},
placeholder: {
title: 'Place Holder',
type: '',
filter:true,
},
fk_fd: {
title: 'F K_ F D',
type: '',
filter:true,
},
list: {
title: 'List',
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
pk: {
title: 'P K',
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
defaults: {
title: 'D E F A U L T S',
type: '',
filter:true,
},
uniques: {
title: 'U N I Q U E S',
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
required: {
title: 'R E Q U I R E D',
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
readmode: {
title: 'Read Mode',
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
datatype: {
title: 'Data Type',
type: '',
filter:true,
},
multilist: {
title: 'Multilist',
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
othercolsinfunctions: {
title: 'Other Cols In Functions',
type: '',
filter:true,
},
visible: {
title: 'Visible',
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
functions: {
title: 'F U N C T I O N S',
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
copyfrommaster: {
title: 'C O P Y F R O M M A S T E R',
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
negative: {
title: 'Negative',
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
decimalplaces: {
title: 'Decimal Places',
type: 'number',
filter:true,
},
hyperlinktable: {
title: 'Hyperlink Table',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
dateparameter: {
title: 'Date Parameter',
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
labeldropdown: {
title: 'Label Drop Down',
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
duplicatecheck: {
title: 'Duplicate Check',
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
serialkey: {
title: 'Serial Key',
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
customformfield: {
title: 'Custom Form Field',
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
fk_fd_record: {
title: 'F K_ F D_ Record',
type: '',
filter:true,
},
fk_fd_alias: {
title: 'F K_ F D_ Alias',
type: '',
filter:true,
},
fk_fd_key: {
title: 'F K_ F D_ Key',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
fk_fd_description: {
title: 'F K_ F D_ Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
fk_fd_condition: {
title: 'F K_ F D_ Condition',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
fk_fd_option: {
title: 'F K_ F D_ Option',
type: '',
filter:true,
},
fk_fd_mappings: {
title: 'F K_ F D_ Mappings',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
dependantsourcecolumn: {
title: 'Dependant Source Column',
type: '',
filter:true,
},
dependantdestinationcolumn: {
title: 'Dependant Destination Column',
type: '',
filter:true,
},
fillroute: {
title: 'Fill Route',
type: '',
filter:true,
},
fillfunction: {
title: 'Fill Function',
type: '',
filter:true,
},
afterselectfunction: {
title: 'After Select Function',
type: '',
filter:true,
},
derived_outputtype: {
title: 'Derived_ Output Type',
type: '',
filter:true,
},
derived_expression: {
title: 'Derived_ Expression',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
derived_dependantcolumns: {
title: 'Derived_ Dependant Columns',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
derived_columntoexecute: {
title: 'Derived_ Column To Execute',
type: '',
filter:true,
},
derived_expressiontoexecute: {
title: 'Derived_ Expression To Execute',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
derived_functiontocall: {
title: 'Derived_ Function To Call',
type: '',
filter:true,
},
parameter: {
title: 'Parameter',
type: '',
filter:true,
},
parentchild: {
title: 'Parent Child',
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
reportid: {
title: 'Report',
type: '',
filter:true,
},
},
};
}
autodetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.autodetailsID)>=0)
{
this.autodetailssource=new LocalDataSource();
this.autodetailssource.load(this.automasterservice.autodetails as  any as LocalDataSource);
this.autodetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
autodetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.automasterservice.autodetails.length == 0)
{
    this.tblautodetailssource.grid.createFormShown = true;
}
else
{
    let obj = new autodetail();
    this.automasterservice.autodetails.push(obj);
    this.autodetailssource.refresh();
    if ((this.automasterservice.autodetails.length / this.autodetailssource.getPaging().perPage).toFixed(0) + 1 != this.autodetailssource.getPaging().page)
    {
        this.autodetailssource.setPage((this.automasterservice.autodetails.length / this.autodetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblautodetailssource.grid.edit(this.tblautodetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.autodetailssource.data.indexOf(event.data);
this.onDeleteautodetail(event,event.data.detailid,((this.autodetailssource.getPaging().page-1) *this.autodetailssource.getPaging().perPage)+index);
this.autodetailssource.refresh();
break;
}
}

*/
autodetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditautodetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditautodetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeleteautodetail(event,event.data.detailid,((this.autodetailssource.getPaging().page-1) *this.autodetailssource.getPaging().perPage)+event.index);
this.autodetailssource.refresh();
break;
}
}
autodetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.automasterservice.deleteautomaster(detailid).then(res=>
this.autodetailsLoadTable()
);
}
}
autodetailsPaging(val)
{
debugger;
this.autodetailssource.setPaging(1, val, true);
}

handleautodetailsGridSelected(event:any) {
this.autodetailsselectedindex=this.automasterservice.autodetails.findIndex(i => i.detailid === event.data.detailid);
}
IsautodetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.autodetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes autodetails

}



