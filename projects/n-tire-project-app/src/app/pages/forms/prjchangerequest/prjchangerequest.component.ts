import { prjchangerequestService } from './../../../service/prjchangerequest.service';
import { prjchangerequest } from './../../../model/prjchangerequest.model';
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
import { prjchangerequestimpact } from './../../../model/prjchangerequestimpact.model';
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
selector: 'app-prjchangerequest',
templateUrl: './prjchangerequest.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class prjchangerequestComponent implements OnInit {
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
bfilterPopulateprjchangerequests:boolean=false;
dataprjchangerequestschangetype3:any=[];
dataprjchangerequestspriority3:any=[];
dataprjchangerequestscriticality3:any=[];
dataprjchangerequestsimpact3:any=[];
dataprjchangerequestsstage3:any=[];
dataprjchangerequestsrisk3:any=[];
dataprjchangerequestimpactsimpactarea3:any=[];
dataprjchangerequestimpactsimpactlevel3:any=[];
bfilterPopulateprjchangerequestimpacts:boolean=false;
@ViewChild('tblprjchangerequestimpactssource',{static:false}) tblprjchangerequestimpactssource: Ng2SmartTableComponent;
 prjchangerequestForm: FormGroup;
changetypeList: boconfigvalue[]=[];//dropdown
priorityList: boconfigvalue[]=[];//dropdown
criticalityList: boconfigvalue[]=[];//dropdown
impactList: boconfigvalue[]=[];//dropdown
stageList: boconfigvalue[]=[];//dropdown
riskList: boconfigvalue[]=[];//dropdown
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



prjchangerequestimpactsvisiblelist:any;
prjchangerequestimpactshidelist:any;

DeletedprjchangerequestimpactIDs: string="";
prjchangerequestimpactsID: string = "1";
prjchangerequestimpactsselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private prjchangerequestservice: prjchangerequestService,
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
this.prjchangerequestForm  = this.fb.group({pk:[null],changeid: [null],
reference: [null],
requestdate: [null],
projectid: [null],
requestor: [null],
changetype: [null],
changetypedesc: [null],
reason: [null],
priority: [null],
prioritydesc: [null],
products: [null],
services: [null],
subject: [null],
details: [null],
expectedresult: [null],
workdetails: [null],
assignto: [null],
manager: [null],
retrospective: [null],
criticality: [null],
criticalitydesc: [null],
impact: [null],
impactdesc: [null],
stage: [null],
stagedesc: [null],
risk: [null],
riskdesc: [null],
impacteditems: [null],
impactedservices: [null],
impactedproducts: [null],
estimatedduration: [null],
estimatedcost: [null],
actualduration: [null],
actualcost: [null],
verifiedby: [null],
verifieddate: [null],
verifiernotes: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.prjchangerequestForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.prjchangerequestForm.dirty && this.prjchangerequestForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.changeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.changeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.changeid && pkDetail) {
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
let prjchangerequestid = null;

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
this.formid=prjchangerequestid;
//this.sharedService.alert(prjchangerequestid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetprjchangerequestimpactsTableConfig();
  setTimeout(() => {
  this.SetprjchangerequestimpactsTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("changetype").then((res:any) => this.changetypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then((res:any) => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("criticality").then((res:any) => this.criticalityList = res as boconfigvalue[]);
this.configservice.getList("impact").then((res:any) => this.impactList = res as boconfigvalue[]);
this.configservice.getList("stage").then((res:any) => this.stageList = res as boconfigvalue[]);
this.configservice.getList("risk").then((res:any) => this.riskList = res as boconfigvalue[]);

//autocomplete
    this.prjchangerequestservice.getprjchangerequestsList().then((res:any) => {
      this.pkList = res as prjchangerequest[];
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
this.prjchangerequestForm.markAsUntouched();
this.prjchangerequestForm.markAsPristine();
}



resetForm() {
if (this.prjchangerequestForm != null)
this.prjchangerequestForm.reset();
this.prjchangerequestForm.patchValue({
});
setTimeout(() => {
this.prjchangerequestservice.prjchangerequestimpacts=[];
this.prjchangerequestimpactsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let changeid = this.prjchangerequestForm.get('changeid')!.value;
        if(changeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.prjchangerequestservice.deleteprjchangerequest(changeid).then((res:any) =>
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
    this.prjchangerequestForm.patchValue({
        changeid: null
    });
    if(this.prjchangerequestservice.formData.changeid!=null)this.prjchangerequestservice.formData.changeid=null;
for (let i=0;i<this.prjchangerequestservice.prjchangerequestimpacts.length;i++) {
this.prjchangerequestservice.prjchangerequestimpacts[i].detailid=null;
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
        else if(key=="requestdate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="verifieddate")
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
        if(this.prjchangerequestForm.controls[key]!=null)
{
this.prjchangerequestForm.patchValue(json);
         if(bdisable)this.prjchangerequestForm.controls[key].disable({onlySelf: true});
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
changetypeonChange(evt:any){
let e=this.f.changetype!.value as any;
this.prjchangerequestForm.patchValue({changetypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority!.value as any;
this.prjchangerequestForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
criticalityonChange(evt:any){
let e=this.f.criticality!.value as any;
this.prjchangerequestForm.patchValue({criticalitydesc:evt.options[evt.options.selectedIndex].text});
}
impactonChange(evt:any){
let e=this.f.impact!.value as any;
this.prjchangerequestForm.patchValue({impactdesc:evt.options[evt.options.selectedIndex].text});
}
stageonChange(evt:any){
let e=this.f.stage!.value as any;
this.prjchangerequestForm.patchValue({stagedesc:evt.options[evt.options.selectedIndex].text});
}
riskonChange(evt:any){
let e=this.f.risk!.value as any;
this.prjchangerequestForm.patchValue({riskdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){this.prjchangerequestservice.getprjchangerequestsByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.prjchangerequest.changeid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.prjchangerequest.changeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.prjchangerequestForm.patchValue({
changeid: res.prjchangerequest.changeid,
reference: res.prjchangerequest.reference,
requestdate: this.ngbDateParserFormatter.parse(res.prjchangerequest.requestdate),
projectid: res.prjchangerequest.projectid,
requestor: res.prjchangerequest.requestor,
changetype: res.prjchangerequest.changetype,
changetypedesc: res.prjchangerequest.changetypedesc,
reason: res.prjchangerequest.reason,
priority: res.prjchangerequest.priority,
prioritydesc: res.prjchangerequest.prioritydesc,
products: res.prjchangerequest.products,
services: res.prjchangerequest.services,
subject: res.prjchangerequest.subject,
details: res.prjchangerequest.details,
expectedresult: res.prjchangerequest.expectedresult,
workdetails: res.prjchangerequest.workdetails,
assignto: res.prjchangerequest.assignto,
manager: res.prjchangerequest.manager,
retrospective: res.prjchangerequest.retrospective,
criticality: res.prjchangerequest.criticality,
criticalitydesc: res.prjchangerequest.criticalitydesc,
impact: res.prjchangerequest.impact,
impactdesc: res.prjchangerequest.impactdesc,
stage: res.prjchangerequest.stage,
stagedesc: res.prjchangerequest.stagedesc,
risk: res.prjchangerequest.risk,
riskdesc: res.prjchangerequest.riskdesc,
impacteditems: res.prjchangerequest.impacteditems,
impactedservices: res.prjchangerequest.impactedservices,
impactedproducts: res.prjchangerequest.impactedproducts,
estimatedduration: res.prjchangerequest.estimatedduration,
estimatedcost: res.prjchangerequest.estimatedcost,
actualduration: res.prjchangerequest.actualduration,
actualcost: res.prjchangerequest.actualcost,
verifiedby: res.prjchangerequest.verifiedby,
verifieddate: this.ngbDateParserFormatter.parse(res.prjchangerequest.verifieddate),
verifiernotes: res.prjchangerequest.verifiernotes,
notes: JSON.parse(res.prjchangerequest.notes),
status: res.prjchangerequest.status,
statusdesc: res.prjchangerequest.statusdesc,
});
this.prjchangerequestimpactsvisiblelist=res.prjchangerequestimpactsvisiblelist;
//Child Tables if any
this.prjchangerequestservice.prjchangerequestimpacts = res.prjchangerequestimpact;
this.SetprjchangerequestimpactsTableConfig();
this.prjchangerequestimpactsLoadTable();
  setTimeout(() => {
  this.SetprjchangerequestimpactsTableddConfig();
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
  for (let key in this.prjchangerequestForm.controls) {
    if (this.prjchangerequestForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.prjchangerequestForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.prjchangerequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.prjchangerequestForm!.value;
obj.requestdate=this.ngbDateParserFormatter.format(this.prjchangerequestForm.get('requestdate')!.value);
obj.verifieddate=this.ngbDateParserFormatter.format(this.prjchangerequestForm.get('verifieddate')!.value);
obj.notes=JSON.stringify(this.prjchangerequestForm.get('notes')!.value);
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
Object.keys(this.prjchangerequestForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.prjchangerequestForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.prjchangerequestForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.prjchangerequestservice.formData=this.prjchangerequestForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.prjchangerequestForm.controls[key] != null)
    {
        this.prjchangerequestservice.formData[key] = this.prjchangerequestForm.controls[key]!.value;
    }
}
}
}
this.prjchangerequestservice.formData.requestdate=new Date(this.ngbDateParserFormatter.format(this.prjchangerequestForm.get('requestdate')!.value)+'  UTC');
this.prjchangerequestservice.formData.verifieddate=new Date(this.ngbDateParserFormatter.format(this.prjchangerequestForm.get('verifieddate')!.value)+'  UTC');
this.prjchangerequestservice.formData.notes=JSON.stringify(this.prjchangerequestForm.get('notes')!.value);
this.prjchangerequestservice.formData.DeletedprjchangerequestimpactIDs = this.DeletedprjchangerequestimpactIDs;
console.log(this.prjchangerequestservice.formData);
this.prjchangerequestservice.saveOrUpdateprjchangerequests().subscribe(
async (res:any) => {
if (this.prjchangerequestimpactssource.data)
{
    for (let i = 0; i < this.prjchangerequestimpactssource.data.length; i++)
    {
        if (this.prjchangerequestimpactssource.data[i].fileattachmentlist)await this.sharedService.upload(this.prjchangerequestimpactssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result!.value.prjchangerequest);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.prjchangerequestservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result!.value.prjchangerequest);
}
else
{
this.FillData((res as any).result!.value);
}
}
this.prjchangerequestForm.markAsUntouched();
this.prjchangerequestForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeleteprjchangerequestimpact(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedprjchangerequestimpactIDs += childID + ",";
this.prjchangerequestservice.prjchangerequestimpacts.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes prjchangerequestimpacts
prjchangerequestimpactssettings:any;
prjchangerequestimpactssource: any;

showprjchangerequestimpactsCheckbox()
{
debugger;
if(this.tblprjchangerequestimpactssource.settings['selectMode']== 'multi')this.tblprjchangerequestimpactssource.settings['selectMode']= 'single';
else
this.tblprjchangerequestimpactssource.settings['selectMode']= 'multi';
this.tblprjchangerequestimpactssource.initGrid();
}
deleteprjchangerequestimpactsAll()
{
this.tblprjchangerequestimpactssource.settings['selectMode'] = 'single';
}
showprjchangerequestimpactsFilter()
{
  setTimeout(() => {
  this.SetprjchangerequestimpactsTableddConfig();
  });
      if(this.tblprjchangerequestimpactssource.settings!=null)this.tblprjchangerequestimpactssource.settings['hideSubHeader'] =!this.tblprjchangerequestimpactssource.settings['hideSubHeader'];
this.tblprjchangerequestimpactssource.initGrid();
}
showprjchangerequestimpactsInActive()
{
}
enableprjchangerequestimpactsInActive()
{
}
async SetprjchangerequestimpactsTableddConfig()
{
if(!this.bfilterPopulateprjchangerequestimpacts){

this.configservice.getList("impactarea").then(res=>
{
var dataimpactarea2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestimpactsimpactarea3.push(defaultobj);
for(let i=0; i<dataimpactarea2.length; i++){
var obj= { value: dataimpactarea2[i].configkey, title: dataimpactarea2[i].configtext};
this.dataprjchangerequestimpactsimpactarea3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestimpactssource.settings);
if(clone.columns['impactarea']!=undefined)clone.columns['impactarea'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestimpactsimpactarea3)), }, };
if(clone.columns['impactarea']!=undefined)clone.columns['impactarea'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestimpactsimpactarea3)), }, };
this.tblprjchangerequestimpactssource.settings =  clone;
this.tblprjchangerequestimpactssource.initGrid();
});

this.configservice.getList("impactlevel").then(res=>
{
var dataimpactlevel2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataprjchangerequestimpactsimpactlevel3.push(defaultobj);
for(let i=0; i<dataimpactlevel2.length; i++){
var obj= { value: dataimpactlevel2[i].configkey, title: dataimpactlevel2[i].configtext};
this.dataprjchangerequestimpactsimpactlevel3.push(obj);
}
var clone = this.sharedService.clone(this.tblprjchangerequestimpactssource.settings);
if(clone.columns['impactlevel']!=undefined)clone.columns['impactlevel'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestimpactsimpactlevel3)), }, };
if(clone.columns['impactlevel']!=undefined)clone.columns['impactlevel'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataprjchangerequestimpactsimpactlevel3)), }, };
this.tblprjchangerequestimpactssource.settings =  clone;
this.tblprjchangerequestimpactssource.initGrid();
});
}
this.bfilterPopulateprjchangerequestimpacts=true;
}
async prjchangerequestimpactsbeforesave(event){
event.confirm.resolve(event.newData);



}
SetprjchangerequestimpactsTableConfig()
{
this.prjchangerequestimpactssettings = {
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
impactarea: {
title: 'Impact Area',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestimpactsimpactarea3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
description: {
title: 'Description',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
impactlevel: {
title: 'Impact Level',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataprjchangerequestimpactsimpactlevel3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
prjchangerequestimpactsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.prjchangerequestimpactsID)>=0)
{
this.prjchangerequestimpactssource=new LocalDataSource();
this.prjchangerequestimpactssource.load(this.prjchangerequestservice.prjchangerequestimpacts as  any as LocalDataSource);
this.prjchangerequestimpactssource.setPaging(1, 20, true);
}
}
prjchangerequestimpactsroute(event,action) {
switch ( action) {
case 'create':
if (this.prjchangerequestservice.prjchangerequestimpacts.length == 0)
{
    this.tblprjchangerequestimpactssource.grid.createFormShown = true;
}
else
{
    let obj = new prjchangerequestimpact();
    this.prjchangerequestservice.prjchangerequestimpacts.push(obj);
    this.prjchangerequestimpactssource.refresh();
    if ((this.prjchangerequestservice.prjchangerequestimpacts.length / this.prjchangerequestimpactssource.getPaging().perPage).toFixed(0) + 1 != this.prjchangerequestimpactssource.getPaging().page)
    {
        this.prjchangerequestimpactssource.setPage((this.prjchangerequestservice.prjchangerequestimpacts.length / this.prjchangerequestimpactssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblprjchangerequestimpactssource.grid.edit(this.tblprjchangerequestimpactssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.prjchangerequestimpactssource.data.indexOf(event.data);
this.onDeleteprjchangerequestimpact(event,event.data.detailid,((this.prjchangerequestimpactssource.getPaging().page-1) *this.prjchangerequestimpactssource.getPaging().perPage)+index);
this.prjchangerequestimpactssource.refresh();
break;
}
}
prjchangerequestimpactsPaging(val)
{
debugger;
this.prjchangerequestimpactssource.setPaging(1, val, true);
}

handleprjchangerequestimpactsGridSelected(event) {
this.prjchangerequestimpactsselectedindex=this.prjchangerequestservice.prjchangerequestimpacts.findIndex(i => i.detailid === event.data.detailid);
}
IsprjchangerequestimpactsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.prjchangerequestimpactsID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes prjchangerequestimpacts

}



