import { prjreleaseService } from './../../../service/prjrelease.service';
import { prjrelease } from './../../../model/prjrelease.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
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
import { prjreleaseteamresponse } from './../../../model/prjreleaseteamresponse.model';
//FK services
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-prjrelease',
templateUrl: './prjrelease.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjreleaseComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
formdata: any;//current form data
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
ShowTableslist:string[]=null;
data:any;
data3:any=[];
bfilterPopulateprjreleases:boolean=false;
dataprjreleasescategory3:any=[];
dataprjreleasestype3:any=[];
dataprjreleasespriority3:any=[];
dataprjreleasescriticality3:any=[];
dataprjreleasesimpact3:any=[];
dataprjreleasesrisk3:any=[];
dataprjreleasesreleasestatus3:any=[];
dataprjreleaseteamresponseschecklistitem3:any=[];
dataprjreleaseteamresponsescurrentstatus3:any=[];
bfilterPopulateprjreleaseteamresponses:boolean=false;
@ViewChild('tblprjreleaseteamresponsessource',{static:false}) tblprjreleaseteamresponsessource: Ng2SmartTableComponent;
 prjreleaseForm: FormGroup;
categoryList: boconfigvalue[]=[];//dropdown
typeList: boconfigvalue[]=[];//dropdown
priorityList: boconfigvalue[]=[];//dropdown
criticalityList: boconfigvalue[]=[];//dropdown
impactList: boconfigvalue[]=[];//dropdown
riskList: boconfigvalue[]=[];//dropdown
releasestatusList: boconfigvalue[]=[];//dropdown
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



prjreleaseteamresponsesvisiblelist:any;
prjreleaseteamresponseshidelist:any;

DeletedprjreleaseteamresponseIDs: string="";
prjreleaseteamresponsesID: string = "1";
prjreleaseteamresponsesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private prjreleaseservice: prjreleaseService,
private fb: FormBuilder,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.prjreleaseForm  = this.fb.group({pk:[null],releaseid: [null],
projectid: [null],
requestor: [null],
category: [null],
categorydesc: [null],
type: [null],
typedesc: [null],
releaseby: [null],
audience: [null],
priority: [null],
prioritydesc: [null],
criticality: [null],
criticalitydesc: [null],
impact: [null],
impactdesc: [null],
risk: [null],
riskdesc: [null],
impacteditems: [null],
impactedservices: [null],
impactedproducts: [null],
estimatedstartdate: [null],
estimatedenddate: [null],
actualstartdate: [null],
actualenddate: [null],
title: [null],
description: [null],
releasestatus: [null],
releasestatusdesc: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjreleaseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjreleaseForm.dirty && this.prjreleaseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.releaseid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.releaseid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.releaseid && pkDetail) {
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
let prjreleaseid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
}
this.formid=prjreleaseid;
//this.sharedService.alert(prjreleaseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetprjreleaseteamresponsesTableConfig();
  setTimeout(() => {
  this.SetprjreleaseteamresponsesTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("releasecategory").then((res:any) => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("releasetype").then((res:any) => this.typeList = res as boconfigvalue[]);
this.configservice.getList("priority").then((res:any) => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("criticality").then((res:any) => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("impact").then((res:any) => this.impactList = res as boconfigvalue[]);
this.configservice.getList("risk").then((res:any) => this.riskList = res as boconfigvalue[]);
this.configservice.getList("releasestatus").then((res:any) => this.releasestatusList = res as boconfigvalue[]);

//autocomplete
    this.prjreleaseservice.getprjreleasesList().then((res:any) => {
      this.pkList = res as prjrelease[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.prjreleaseForm.markAsUntouched();
this.prjreleaseForm.markAsPristine();
}



resetForm() {
if (this.prjreleaseForm != null)
this.prjreleaseForm.reset();
this.prjreleaseForm.patchValue({
});
setTimeout(() => {
this.prjreleaseservice.prjreleaseteamresponses=[];
this.prjreleaseteamresponsesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let releaseid = this.prjreleaseForm.get('releaseid')!.value;
        if(releaseid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjreleaseservice.deleteprjrelease(releaseid).then((res:any) =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.prjreleaseForm.patchValue({
        releaseid: null
    });
    if(this.prjreleaseservice.formData.releaseid!=null)this.prjreleaseservice.formData.releaseid=null;
for (let i=0;i<this.prjreleaseservice.prjreleaseteamresponses.length;i++) {
this.prjreleaseservice.prjreleaseteamresponses[i].responseid=null;
}
    }
    PopulateFromMainScreen(mainscreendata,bdisable)
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
        else if(key=="estimatedstartdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="estimatedenddate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="actualstartdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="actualenddate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="notes")
        json='{"'+key+'": '+mainscreendata[key] +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.prjreleaseForm.controls[key]!=null)
{
this.prjreleaseForm.patchValue(json);
         if(bdisable)this.prjreleaseForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
categoryonChange(evt:any){
let e=this.f.category!.value as any;
this.prjreleaseForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
typeonChange(evt:any){
let e=this.f.type!.value as any;
this.prjreleaseForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority!.value as any;
this.prjreleaseForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality!.value as any;
this.prjreleaseForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
impactonChange(evt:any){
let e=this.f.impact!.value as any;
this.prjreleaseForm.patchValue({impactdesc:evt.options[evt.options.selectedIndex].text});
}
riskonChange(evt:any){
let e=this.f.risk!.value as any;
this.prjreleaseForm.patchValue({riskdesc:evt.options[evt.options.selectedIndex].text});
}
releasestatusonChange(evt:any){
let e=this.f.releasestatus!.value as any;
this.prjreleaseForm.patchValue({releasestatusdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){this.prjreleaseservice.getprjreleasesByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.prjrelease.releaseid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.prjrelease.releaseid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjreleaseForm.patchValue({
releaseid: res.prjrelease.releaseid,
projectid: res.prjrelease.projectid,
requestor: res.prjrelease.requestor,
category: res.prjrelease.category,
categorydesc: res.prjrelease.categorydesc,
type: res.prjrelease.type,
typedesc: res.prjrelease.typedesc,
releaseby: res.prjrelease.releaseby,
audience: res.prjrelease.audience,
priority: res.prjrelease.priority,
prioritydesc: res.prjrelease.prioritydesc,
criticality: res.prjrelease.criticality,
criticalitydesc: res.prjrelease.criticalitydesc,
impact: res.prjrelease.impact,
impactdesc: res.prjrelease.impactdesc,
risk: res.prjrelease.risk,
riskdesc: res.prjrelease.riskdesc,
impacteditems: res.prjrelease.impacteditems,
impactedservices: res.prjrelease.impactedservices,
impactedproducts: res.prjrelease.impactedproducts,
estimatedstartdate: this.ngbDateParserFormatter.parse(res.prjrelease.estimatedstartdate),
estimatedenddate: this.ngbDateParserFormatter.parse(res.prjrelease.estimatedenddate),
actualstartdate: this.ngbDateParserFormatter.parse(res.prjrelease.actualstartdate),
actualenddate: this.ngbDateParserFormatter.parse(res.prjrelease.actualenddate),
title: res.prjrelease.title,
description: res.prjrelease.description,
releasestatus: res.prjrelease.releasestatus,
releasestatusdesc: res.prjrelease.releasestatusdesc,
notes: JSON.parse(res.prjrelease.notes),
status: res.prjrelease.status,
statusdesc: res.prjrelease.statusdesc,
});
this.prjreleaseteamresponsesvisiblelist=res.prjreleaseteamresponsesvisiblelist;
//Child Tables if any
this.prjreleaseservice.prjreleaseteamresponses = res.prjreleaseteamresponse;
this.SetprjreleaseteamresponsesTableConfig();
this.prjreleaseteamresponsesLoadTable();
  setTimeout(() => {
  this.SetprjreleaseteamresponsesTableddConfig();
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
  for (let key in this.prjreleaseForm.controls) {
    if (this.prjreleaseForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjreleaseForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjreleaseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.prjreleaseForm!.value;
obj.estimatedstartdate=this.ngbDateParserFormatter.format(this.prjreleaseForm.get('estimatedstartdate')!.value);
obj.estimatedenddate=this.ngbDateParserFormatter.format(this.prjreleaseForm.get('estimatedenddate')!.value);
obj.actualstartdate=this.ngbDateParserFormatter.format(this.prjreleaseForm.get('actualstartdate')!.value);
obj.actualenddate=this.ngbDateParserFormatter.format(this.prjreleaseForm.get('actualenddate')!.value);
obj.notes=JSON.stringify(this.prjreleaseForm.get('notes')!.value);
console.log(obj);
this.dialogRef.close(obj);
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
Object.keys(this.prjreleaseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjreleaseForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjreleaseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjreleaseservice.formData=this.prjreleaseForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjreleaseForm.controls[key] != null)
    {
        this.prjreleaseservice.formData[key] = this.prjreleaseForm.controls[key]!.value;
    }
}
}
}
this.prjreleaseservice.formData.estimatedstartdate=new Date(this.ngbDateParserFormatter.format(this.prjreleaseForm.get('estimatedstartdate')!.value)+'  UTC');
this.prjreleaseservice.formData.estimatedenddate=new Date(this.ngbDateParserFormatter.format(this.prjreleaseForm.get('estimatedenddate')!.value)+'  UTC');
this.prjreleaseservice.formData.actualstartdate=new Date(this.ngbDateParserFormatter.format(this.prjreleaseForm.get('actualstartdate')!.value)+'  UTC');
this.prjreleaseservice.formData.actualenddate=new Date(this.ngbDateParserFormatter.format(this.prjreleaseForm.get('actualenddate')!.value)+'  UTC');
this.prjreleaseservice.formData.notes=JSON.stringify(this.prjreleaseForm.get('notes')!.value);
this.prjreleaseservice.formData.DeletedprjreleaseteamresponseIDs = this.DeletedprjreleaseteamresponseIDs;
console.log(this.prjreleaseservice.formData);
this.prjreleaseservice.saveOrUpdateprjreleases().subscribe(
async (res:any) => {
if (this.prjreleaseteamresponsessource.data)
{
    for (let i = 0; i < this.prjreleaseteamresponsessource.data.length; i++)
    {
        if (this.prjreleaseteamresponsessource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjreleaseteamresponsessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result!.value.prjrelease);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjreleaseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result!.value.prjrelease);
}
else
{
this.FillData((res as any).result!.value);
}
}
this.prjreleaseForm.markAsUntouched();
this.prjreleaseForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeleteprjreleaseteamresponse(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjreleaseteamresponseIDs += childID + ",";
this.prjreleaseservice.prjreleaseteamresponses.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes prjreleaseteamresponses
prjreleaseteamresponsessettings:any;
prjreleaseteamresponsessource: any;

showprjreleaseteamresponsesCheckbox()
{
debugger;
if(this.tblprjreleaseteamresponsessource.settings['selectMode']== 'multi')this.tblprjreleaseteamresponsessource.settings['selectMode']= 'single';
else
this.tblprjreleaseteamresponsessource.settings['selectMode']= 'multi';
this.tblprjreleaseteamresponsessource.initGrid();
}
deleteprjreleaseteamresponsesAll()
{
this.tblprjreleaseteamresponsessource.settings['selectMode'] = 'single';
}
showprjreleaseteamresponsesFilter()
{
  setTimeout(() => {
  this.SetprjreleaseteamresponsesTableddConfig();
  });
      if(this.tblprjreleaseteamresponsessource.settings!=null)this.tblprjreleaseteamresponsessource.settings['hideSubHeader'] =!this.tblprjreleaseteamresponsessource.settings['hideSubHeader'];
this.tblprjreleaseteamresponsessource.initGrid();
}
showprjreleaseteamresponsesInActive()
{
}
enableprjreleaseteamresponsesInActive()
{
}
async SetprjreleaseteamresponsesTableddConfig()
{
if(!this.bfilterPopulateprjreleaseteamresponses){

this.configservice.getList("releasechecklist").then(res=>
{
var datachecklistitem2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleaseteamresponseschecklistitem3.push(defaultobj);
for(let i=0; i<datachecklistitem2.length; i++){
var obj= { value: datachecklistitem2[i].configkey, title: datachecklistitem2[i].configtext};
this.dataprjreleaseteamresponseschecklistitem3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleaseteamresponsessource.settings);
if(clone.columns['checklistitem']!=undefined)clone.columns['checklistitem'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleaseteamresponseschecklistitem3)), }, };
if(clone.columns['checklistitem']!=undefined)clone.columns['checklistitem'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleaseteamresponseschecklistitem3)), }, };
this.tblprjreleaseteamresponsessource.settings =  clone;
this.tblprjreleaseteamresponsessource.initGrid();
});

this.configservice.getList("currentstatus").then(res=>
{
var datacurrentstatus2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjreleaseteamresponsescurrentstatus3.push(defaultobj);
for(let i=0; i<datacurrentstatus2.length; i++){
var obj= { value: datacurrentstatus2[i].configkey, title: datacurrentstatus2[i].configtext};
this.dataprjreleaseteamresponsescurrentstatus3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjreleaseteamresponsessource.settings);
if(clone.columns['currentstatus']!=undefined)clone.columns['currentstatus'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleaseteamresponsescurrentstatus3)), }, };
if(clone.columns['currentstatus']!=undefined)clone.columns['currentstatus'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjreleaseteamresponsescurrentstatus3)), }, };
this.tblprjreleaseteamresponsessource.settings =  clone;
this.tblprjreleaseteamresponsessource.initGrid();
});
}
this.bfilterPopulateprjreleaseteamresponses=true;
}
async prjreleaseteamresponsesbeforesave(event){
event.confirm.resolve(event.newData);



}
SetprjreleaseteamresponsesTableConfig()
{
this.prjreleaseteamresponsessettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
add: !this.showview,
edit: !this.showview, // true,
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
checklistitem: {
title: 'Checklist Item',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleaseteamresponseschecklistitem3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
currentstatus: {
title: 'Current Status',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjreleaseteamresponsescurrentstatus3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
assignedto: {
title: 'Assigned To',
type: '',
filter:true,
},
responses: {
title: 'Responses',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
prjreleaseteamresponsesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.prjreleaseteamresponsesID)>=0)
{
this.prjreleaseteamresponsessource=new LocalDataSource();
this.prjreleaseteamresponsessource.load(this.prjreleaseservice.prjreleaseteamresponses as  any as LocalDataSource);
this.prjreleaseteamresponsessource.setPaging(1, 20, true);
}
}
prjreleaseteamresponsesroute(event,action) {
switch ( action) {
case 'create':
if (this.prjreleaseservice.prjreleaseteamresponses.length == 0)
{
    this.tblprjreleaseteamresponsessource.grid.createFormShown = true;
}
else
{
    let obj = new prjreleaseteamresponse();
    this.prjreleaseservice.prjreleaseteamresponses.push(obj);
    this.prjreleaseteamresponsessource.refresh();
    if ((this.prjreleaseservice.prjreleaseteamresponses.length / this.prjreleaseteamresponsessource.getPaging().perPage).toFixed(0) + 1 != this.prjreleaseteamresponsessource.getPaging().page)
    {
        this.prjreleaseteamresponsessource.setPage((this.prjreleaseservice.prjreleaseteamresponses.length / this.prjreleaseteamresponsessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjreleaseteamresponsessource.grid.edit(this.tblprjreleaseteamresponsessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjreleaseteamresponsessource.data.indexOf(event.data);
this.onDeleteprjreleaseteamresponse(event,event.data.responseid,((this.prjreleaseteamresponsessource.getPaging().page-1) *this.prjreleaseteamresponsessource.getPaging().perPage)+index);
this.prjreleaseteamresponsessource.refresh();
break;
}
}
prjreleaseteamresponsesPaging(val)
{
debugger;
this.prjreleaseteamresponsessource.setPaging(1, val, true);
}

handleprjreleaseteamresponsesGridSelected(event) {
this.prjreleaseteamresponsesselectedindex=this.prjreleaseservice.prjreleaseteamresponses.findIndex(i => i.responseid === event.data.responseid);
}
IsprjreleaseteamresponsesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.prjreleaseteamresponsesID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes prjreleaseteamresponses

}



