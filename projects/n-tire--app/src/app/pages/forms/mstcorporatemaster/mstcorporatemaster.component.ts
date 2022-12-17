import { mstcorporatemasterService } from './../../../service/mstcorporatemaster.service';
import { mstcorporatemaster } from './../../../model/mstcorporatemaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

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
import { mstcorporatelocation } from '../../../../../../n-tire--app/src/app/model/mstcorporatelocation.model';
import { mstcorporatelocationComponent } from '../../../../../../n-tire--app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component';
//FK services
import { mstjobrequirement } from '../../../../../../n-tire--app/src/app/model/mstjobrequirement.model';
import { mstjobrequirementComponent } from '../../../../../../n-tire--app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component';
//FK services
import { mstjobstatus } from '../../../../../../n-tire--app/src/app/model/mstjobstatus.model';
import { mstjobstatusComponent } from '../../../../../../n-tire--app/src/app/pages/forms/mstjobstatus/mstjobstatus.component';
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
import {AppConstants} from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {createWorker, RecognizeResult} from 'tesseract.js';
import {AttachmentComponent} from '../../../../../../n-tire-bo-app/src/app/custom/attachment/attachment.component';

@Component({
selector: 'app-mstcorporatemaster',
templateUrl: './mstcorporatemaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class mstcorporatemasterComponent implements OnInit {
hidelist:any=[];
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
bfilterPopulatemstcorporatemasters:boolean=false;
bfilterPopulatemstcorporatelocations:boolean=false;
bfilterPopulatemstjobrequirements:boolean=false;
bfilterPopulatemstjobstatuses:boolean=false;
@ViewChild('tblmstcorporatelocationssource',{static:false}) tblmstcorporatelocationssource: Ng2SmartTableComponent;
@ViewChild('tblmstjobrequirementssource',{static:false}) tblmstjobrequirementssource: Ng2SmartTableComponent;
@ViewChild('tblmstjobstatusessource',{static:false}) tblmstjobstatusessource: Ng2SmartTableComponent;
 mstcorporatemasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
readonly AttachmentURL = AppConstants.AttachmentURL;
@ViewChild('kycupload',{static:false}) kycupload: AttachmentComponent;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;



mstcorporatelocationsvisiblelist:any;
mstcorporatelocationshidelist:any;
mstjobrequirementsvisiblelist:any;
mstjobrequirementshidelist:any;
mstjobstatusesvisiblelist:any;
mstjobstatuseshidelist:any;

DeletedmstcorporatelocationIDs: string="";
mstcorporatelocationsID: string = "1";
mstcorporatelocationsselectedindex:any;
DeletedmstjobrequirementIDs: string="";
mstjobrequirementsID: string = "2";
mstjobrequirementsselectedindex:any;
DeletedmstjobstatusIDs: string="";
mstjobstatusesID: string = "3";
mstjobstatusesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private mstcorporatemasterservice: mstcorporatemasterService,
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
this.mstcorporatemasterForm  = this.fb.group({
pk:[null],
corporateid: [null],
companyname: [null],
tlnumber: [null],
taxregistrationnumber: [null],
licensevalidto: [null],
kycupload: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.mstcorporatemasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.mstcorporatemasterForm.dirty && this.mstcorporatemasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.corporateid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.corporateid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.corporateid && pkDetail) {
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
this.viewhtml=this.sessionService.getViewHtml();

debugger;
let mstcorporatemasterid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
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
this.formid=mstcorporatemasterid;
//this.sharedService.alert(mstcorporatemasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetmstcorporatelocationsTableConfig();
  setTimeout(() => {
  this.SetmstcorporatelocationsTableddConfig();
  });

this.SetmstjobrequirementsTableConfig();
  setTimeout(() => {
  this.SetmstjobrequirementsTableddConfig();
  });

this.SetmstjobstatusesTableConfig();
  setTimeout(() => {
  this.SetmstjobstatusesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.mstcorporatemasterservice.getmstcorporatemastersList().then(res => {
      this.pkList = res as mstcorporatemaster[];
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
this.mstcorporatemasterForm.markAsUntouched();
this.mstcorporatemasterForm.markAsPristine();
}



  getkycupload() {
    debugger;
    if (this.kycupload.getattachmentlist().length > 0) {
      let file = this.kycupload.getattachmentlist()[0];
      this.sharedService.geturl(file.filekey, file.type);
      }
    }
resetForm() {
if (this.mstcorporatemasterForm != null)
this.mstcorporatemasterForm.reset();
this.mstcorporatemasterForm.patchValue({
});
setTimeout(() => {
this.mstcorporatemasterservice.mstcorporatelocations=[];
this.mstcorporatelocationsLoadTable();
this.mstcorporatemasterservice.mstjobrequirements=[];
this.mstjobrequirementsLoadTable();
this.mstcorporatemasterservice.mstjobstatuses=[];
this.mstjobstatusesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let corporateid = this.mstcorporatemasterForm.get('corporateid').value;
        if(corporateid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemasterservice.deletemstcorporatemaster(corporateid).then(res =>
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
    this.mstcorporatemasterForm.patchValue({
        corporateid: null
    });
    if(this.mstcorporatemasterservice.formData.corporateid!=null)this.mstcorporatemasterservice.formData.corporateid=null;
for (let i=0;i<this.mstcorporatemasterservice.mstcorporatelocations.length;i++) {
this.mstcorporatemasterservice.mstcorporatelocations[i].locationid=null;
}
for (let i=0;i<this.mstcorporatemasterservice.mstjobrequirements.length;i++) {
this.mstcorporatemasterservice.mstjobrequirements[i].jobid=null;
}
for (let i=0;i<this.mstcorporatemasterservice.mstjobstatuses.length;i++) {
this.mstcorporatemasterservice.mstjobstatuses[i].viewid=null;
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
        else if(key=="licensevalidto")
this.mstcorporatemasterForm.patchValue({"licensevalidto":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.mstcorporatemasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.mstcorporatemasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.mstcorporatemasterForm.controls[key]!=undefined)
{
this.mstcorporatemasterForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
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

editmstcorporatemasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.mstcorporatemasterservice.getmstcorporatemastersByEID(pkcol).then(res => {

this.mstcorporatemasterservice.formData=res.mstcorporatemaster;
let formproperty=res.mstcorporatemaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.mstcorporatemaster.pkcol;
this.formid=res.mstcorporatemaster.corporateid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.mstcorporatemaster.corporateid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.mstcorporatemasterForm.patchValue({
corporateid: res.mstcorporatemaster.corporateid,
companyname: res.mstcorporatemaster.companyname,
tlnumber: res.mstcorporatemaster.tlnumber,
taxregistrationnumber: res.mstcorporatemaster.taxregistrationnumber,
licensevalidto: this.ngbDateParserFormatter.parse(res.mstcorporatemaster.licensevalidto),
kycupload: JSON.parse(res.mstcorporatemaster.kycupload),
status: res.mstcorporatemaster.status,
statusdesc: res.mstcorporatemaster.statusdesc,
});
this.mstcorporatelocationsvisiblelist=res.mstcorporatelocationsvisiblelist;
this.mstjobrequirementsvisiblelist=res.mstjobrequirementsvisiblelist;
this.mstjobstatusesvisiblelist=res.mstjobstatusesvisiblelist;
if(this.mstcorporatemasterForm.get('kycupload').value!=null && this.mstcorporatemasterForm.get('kycupload').value!="" && this.kycupload!=null && this.kycupload!=undefined)this.kycupload.setattachmentlist(this.mstcorporatemasterForm.get('kycupload').value);
//Child Tables if any
this.mstcorporatemasterservice.mstcorporatelocations = res.mstcorporatelocations;
this.SetmstcorporatelocationsTableConfig();
this.mstcorporatelocationsLoadTable();
  setTimeout(() => {
  this.SetmstcorporatelocationsTableddConfig();
  });
this.mstcorporatemasterservice.mstjobrequirements = res.mstjobrequirements;
this.SetmstjobrequirementsTableConfig();
this.mstjobrequirementsLoadTable();
  setTimeout(() => {
  this.SetmstjobrequirementsTableddConfig();
  });
this.mstcorporatemasterservice.mstjobstatuses = res.mstjobstatuses;
this.SetmstjobstatusesTableConfig();
this.mstjobstatusesLoadTable();
  setTimeout(() => {
  this.SetmstjobstatusesTableddConfig();
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
  for (let key in this.mstcorporatemasterForm.controls) {
    if (this.mstcorporatemasterForm.controls[key] != null) {
if( key=="kycupload")
{
if(this.mstcorporatemasterservice.formData!=null && this.mstcorporatemasterservice.formData[key]!=null  && this.mstcorporatemasterservice.formData[key]!='[]' && this.mstcorporatemasterservice.formData[key]!=undefined && this.mstcorporatemasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.mstcorporatemasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.mstcorporatemasterservice.formData!=null && this.mstcorporatemasterservice.formData[key]!=null   && this.mstcorporatemasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.mstcorporatemasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.mstcorporatemasterservice.formData!=null && this.mstcorporatemasterservice.formData[key]!=null   && this.mstcorporatemasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.mstcorporatemasterservice.formData[key]+"'><div class='progress__number'>"+this.mstcorporatemasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.mstcorporatemasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.mstcorporatemasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.mstcorporatemasterForm.value;
obj.licensevalidto=new Date(this.mstcorporatemasterForm.get('licensevalidto').value ? this.ngbDateParserFormatter.format(this.mstcorporatemasterForm.get('licensevalidto').value)+'  UTC' :null);
obj.kycupload=JSON.stringify(this.kycupload.getattachmentlist());
console.log(obj);
await this.sharedService.upload(this.kycupload.getAllFiles());
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
Object.keys(this.mstcorporatemasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.mstcorporatemasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.mstcorporatemasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.mstcorporatemasterservice.formData=this.mstcorporatemasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.mstcorporatemasterForm.controls[key] != null)
    {
        this.mstcorporatemasterservice.formData[key] = this.mstcorporatemasterForm.controls[key].value;
    }
}
}
}
this.mstcorporatemasterservice.formData.licensevalidto=new Date(this.mstcorporatemasterForm.get('licensevalidto').value ? this.ngbDateParserFormatter.format(this.mstcorporatemasterForm.get('licensevalidto').value)+'  UTC' :null);
this.mstcorporatemasterservice.formData.kycupload=this.mstcorporatemasterForm.get('kycupload').value;
this.mstcorporatemasterservice.formData.DeletedmstcorporatelocationIDs = this.DeletedmstcorporatelocationIDs;
this.mstcorporatemasterservice.formData.DeletedmstjobrequirementIDs = this.DeletedmstjobrequirementIDs;
this.mstcorporatemasterservice.formData.DeletedmstjobstatusIDs = this.DeletedmstjobstatusIDs;
this.mstcorporatemasterservice.formData.kycupload=JSON.stringify(this.kycupload.getattachmentlist());
console.log(this.mstcorporatemasterservice.formData);
this.mstcorporatemasterservice.formData=this.mstcorporatemasterForm.value;
this.mstcorporatemasterservice.saveOrUpdatemstcorporatemasters().subscribe(
async res => {
await this.sharedService.upload(this.kycupload.getAllFiles());
if (this.mstcorporatelocationssource.data)
{
    for (let i = 0; i < this.mstcorporatelocationssource.data.length; i++)
    {
        if (this.mstcorporatelocationssource.data[i].fileattachmentlist)await this.sharedService.upload(this.mstcorporatelocationssource.data[i].fileattachmentlist);
    }
}
if (this.mstjobrequirementssource.data)
{
    for (let i = 0; i < this.mstjobrequirementssource.data.length; i++)
    {
        if (this.mstjobrequirementssource.data[i].fileattachmentlist)await this.sharedService.upload(this.mstjobrequirementssource.data[i].fileattachmentlist);
    }
}
if (this.mstjobstatusessource.data)
{
    for (let i = 0; i < this.mstjobstatusessource.data.length; i++)
    {
        if (this.mstjobstatusessource.data[i].fileattachmentlist)await this.sharedService.upload(this.mstjobstatusessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.mstcorporatemaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.mstcorporatemasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.mstcorporatemaster);
}
else
{
this.FillData(res);
}
}
this.mstcorporatemasterForm.markAsUntouched();
this.mstcorporatemasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmstcorporatelocation(event:any,locationid:any, corporateid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(mstcorporatelocationComponent, 
{
data:  {  showview:false,save:false,event,locationid, corporateid,visiblelist:this.mstcorporatelocationsvisiblelist,  hidelist:this.mstcorporatelocationshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.mstcorporatelocationssource.add(res);
this.mstcorporatelocationssource.refresh();
}
else
{
this.mstcorporatelocationssource.update(event.data, res);
}
}
});
}

onDeletemstcorporatelocation(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedmstcorporatelocationIDs += childID + ",";
this.mstcorporatemasterservice.mstcorporatelocations.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditmstjobrequirement(event:any,jobid:any, corporateid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(mstjobrequirementComponent, 
{
data:  {  showview:false,save:false,event,jobid, corporateid,visiblelist:this.mstjobrequirementsvisiblelist,  hidelist:this.mstjobrequirementshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.mstjobrequirementssource.add(res);
this.mstjobrequirementssource.refresh();
}
else
{
this.mstjobrequirementssource.update(event.data, res);
}
}
});
}

onDeletemstjobrequirement(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedmstjobrequirementIDs += childID + ",";
this.mstcorporatemasterservice.mstjobrequirements.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditmstjobstatus(event:any,viewid:any, corporateid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(mstjobstatusComponent, 
{
data:  {  showview:false,save:false,event,viewid, corporateid,visiblelist:this.mstjobstatusesvisiblelist,  hidelist:this.mstjobstatuseshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.mstjobstatusessource.add(res);
this.mstjobstatusessource.refresh();
}
else
{
this.mstjobstatusessource.update(event.data, res);
}
}
});
}

onDeletemstjobstatus(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedmstjobstatusIDs += childID + ",";
this.mstcorporatemasterservice.mstjobstatuses.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes mstcorporatelocations
mstcorporatelocationssettings:any;
mstcorporatelocationssource: any;

showmstcorporatelocationsCheckbox()
{
debugger;
if(this.tblmstcorporatelocationssource.settings['selectMode']== 'multi')this.tblmstcorporatelocationssource.settings['selectMode']= 'single';
else
this.tblmstcorporatelocationssource.settings['selectMode']= 'multi';
this.tblmstcorporatelocationssource.initGrid();
}
deletemstcorporatelocationsAll()
{
this.tblmstcorporatelocationssource.settings['selectMode'] = 'single';
}
showmstcorporatelocationsFilter()
{
  setTimeout(() => {
  this.SetmstcorporatelocationsTableddConfig();
  });
      if(this.tblmstcorporatelocationssource.settings!=null)this.tblmstcorporatelocationssource.settings['hideSubHeader'] =!this.tblmstcorporatelocationssource.settings['hideSubHeader'];
this.tblmstcorporatelocationssource.initGrid();
}
showmstcorporatelocationsInActive()
{
}
enablemstcorporatelocationsInActive()
{
}
async SetmstcorporatelocationsTableddConfig()
{
if(!this.bfilterPopulatemstcorporatelocations){
}
this.bfilterPopulatemstcorporatelocations=true;
}
async mstcorporatelocationsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetmstcorporatelocationsTableConfig()
{
this.mstcorporatelocationssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
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
branchid: {
title: 'Branch',
type: 'number',
filter:true,
},
countryid: {
title: 'Country',
type: 'number',
filter:true,
},
stateid: {
title: 'State',
type: 'number',
filter:true,
},
cityid: {
title: 'City',
type: 'number',
filter:true,
},
address1: {
title: 'Address1',
type: '',
filter:true,
},
address2: {
title: 'Address2',
type: '',
filter:true,
},
pincode: {
title: 'Pin Code',
type: '',
filter:true,
},
contactperson: {
title: 'Contact Person',
type: '',
filter:true,
},
designation: {
title: 'Designation',
type: '',
filter:true,
},
emailid: {
title: 'Email',
type: '',
filter:true,
},
mobile: {
title: 'Mobile',
type: '',
filter:true,
},
},
};
}
mstcorporatelocationsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.mstcorporatelocationsID)>=0)
{
this.mstcorporatelocationssource=new LocalDataSource();
this.mstcorporatelocationssource.load(this.mstcorporatemasterservice.mstcorporatelocations as  any as LocalDataSource);
this.mstcorporatelocationssource.setPaging(1, 20, true);
}
}

//external to inline
/*
mstcorporatelocationsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.mstcorporatemasterservice.mstcorporatelocations.length == 0)
{
    this.tblmstcorporatelocationssource.grid.createFormShown = true;
}
else
{
    let obj = new mstcorporatelocation();
    this.mstcorporatemasterservice.mstcorporatelocations.push(obj);
    this.mstcorporatelocationssource.refresh();
    if ((this.mstcorporatemasterservice.mstcorporatelocations.length / this.mstcorporatelocationssource.getPaging().perPage).toFixed(0) + 1 != this.mstcorporatelocationssource.getPaging().page)
    {
        this.mstcorporatelocationssource.setPage((this.mstcorporatemasterservice.mstcorporatelocations.length / this.mstcorporatelocationssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblmstcorporatelocationssource.grid.edit(this.tblmstcorporatelocationssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.mstcorporatelocationssource.data.indexOf(event.data);
this.onDeletemstcorporatelocation(event,event.data.locationid,((this.mstcorporatelocationssource.getPaging().page-1) *this.mstcorporatelocationssource.getPaging().perPage)+index);
this.mstcorporatelocationssource.refresh();
break;
}
}

*/
mstcorporatelocationsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditmstcorporatelocation(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditmstcorporatelocation(event,event.data.locationid,this.formid);
break;
case 'delete':
this.onDeletemstcorporatelocation(event,event.data.locationid,((this.mstcorporatelocationssource.getPaging().page-1) *this.mstcorporatelocationssource.getPaging().perPage)+event.index);
this.mstcorporatelocationssource.refresh();
break;
}
}
mstcorporatelocationsonDelete(obj) {
let locationid=obj.data.locationid;
if (confirm('Are you sure to delete this record ?')) {
this.mstcorporatemasterservice.deletemstcorporatemaster(locationid).then(res=>
this.mstcorporatelocationsLoadTable()
);
}
}
mstcorporatelocationsPaging(val)
{
debugger;
this.mstcorporatelocationssource.setPaging(1, val, true);
}

handlemstcorporatelocationsGridSelected(event:any) {
this.mstcorporatelocationsselectedindex=this.mstcorporatemasterservice.mstcorporatelocations.findIndex(i => i.locationid === event.data.locationid);
}
IsmstcorporatelocationsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.mstcorporatelocationsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes mstcorporatelocations
//start of Grid Codes mstjobrequirements
mstjobrequirementssettings:any;
mstjobrequirementssource: any;

showmstjobrequirementsCheckbox()
{
debugger;
if(this.tblmstjobrequirementssource.settings['selectMode']== 'multi')this.tblmstjobrequirementssource.settings['selectMode']= 'single';
else
this.tblmstjobrequirementssource.settings['selectMode']= 'multi';
this.tblmstjobrequirementssource.initGrid();
}
deletemstjobrequirementsAll()
{
this.tblmstjobrequirementssource.settings['selectMode'] = 'single';
}
showmstjobrequirementsFilter()
{
  setTimeout(() => {
  this.SetmstjobrequirementsTableddConfig();
  });
      if(this.tblmstjobrequirementssource.settings!=null)this.tblmstjobrequirementssource.settings['hideSubHeader'] =!this.tblmstjobrequirementssource.settings['hideSubHeader'];
this.tblmstjobrequirementssource.initGrid();
}
showmstjobrequirementsInActive()
{
}
enablemstjobrequirementsInActive()
{
}
async SetmstjobrequirementsTableddConfig()
{
if(!this.bfilterPopulatemstjobrequirements){
}
this.bfilterPopulatemstjobrequirements=true;
}
async mstjobrequirementsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetmstjobrequirementsTableConfig()
{
this.mstjobrequirementssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
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
jobdescription: {
title: 'Job Description',
type: '',
filter:true,
},
jobrequirement: {
title: 'Job Requirement',
type: '',
filter:true,
},
numberofpositions: {
title: 'Number Of Positions',
type: 'number',
filter:true,
},
tobefilledbefore: {
title: 'To Be Filled Before',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
experiencefrom: {
title: 'Experience From',
type: 'number',
filter:true,
},
experienceto: {
title: 'Experience To',
type: 'number',
filter:true,
},
locations: {
title: 'Locations',
type: '',
filter:true,
},
skills: {
title: 'Skills',
type: '',
filter:true,
},
education: {
title: 'Education',
type: '',
filter:true,
},
language: {
title: 'Language',
type: '',
filter:true,
},
referenceavailability: {
title: 'Reference Availability',
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
referencevalidation: {
title: 'Reference Validation',
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
},
};
}
mstjobrequirementsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.mstjobrequirementsID)>=0)
{
this.mstjobrequirementssource=new LocalDataSource();
this.mstjobrequirementssource.load(this.mstcorporatemasterservice.mstjobrequirements as  any as LocalDataSource);
this.mstjobrequirementssource.setPaging(1, 20, true);
}
}

//external to inline
/*
mstjobrequirementsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.mstcorporatemasterservice.mstjobrequirements.length == 0)
{
    this.tblmstjobrequirementssource.grid.createFormShown = true;
}
else
{
    let obj = new mstjobrequirement();
    this.mstcorporatemasterservice.mstjobrequirements.push(obj);
    this.mstjobrequirementssource.refresh();
    if ((this.mstcorporatemasterservice.mstjobrequirements.length / this.mstjobrequirementssource.getPaging().perPage).toFixed(0) + 1 != this.mstjobrequirementssource.getPaging().page)
    {
        this.mstjobrequirementssource.setPage((this.mstcorporatemasterservice.mstjobrequirements.length / this.mstjobrequirementssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblmstjobrequirementssource.grid.edit(this.tblmstjobrequirementssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.mstjobrequirementssource.data.indexOf(event.data);
this.onDeletemstjobrequirement(event,event.data.jobid,((this.mstjobrequirementssource.getPaging().page-1) *this.mstjobrequirementssource.getPaging().perPage)+index);
this.mstjobrequirementssource.refresh();
break;
}
}

*/
mstjobrequirementsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditmstjobrequirement(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditmstjobrequirement(event,event.data.jobid,this.formid);
break;
case 'delete':
this.onDeletemstjobrequirement(event,event.data.jobid,((this.mstjobrequirementssource.getPaging().page-1) *this.mstjobrequirementssource.getPaging().perPage)+event.index);
this.mstjobrequirementssource.refresh();
break;
}
}
mstjobrequirementsonDelete(obj) {
let jobid=obj.data.jobid;
if (confirm('Are you sure to delete this record ?')) {
this.mstcorporatemasterservice.deletemstcorporatemaster(jobid).then(res=>
this.mstjobrequirementsLoadTable()
);
}
}
mstjobrequirementsPaging(val)
{
debugger;
this.mstjobrequirementssource.setPaging(1, val, true);
}

handlemstjobrequirementsGridSelected(event:any) {
this.mstjobrequirementsselectedindex=this.mstcorporatemasterservice.mstjobrequirements.findIndex(i => i.jobid === event.data.jobid);
}
IsmstjobrequirementsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.mstjobrequirementsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes mstjobrequirements
//start of Grid Codes mstjobstatuses
mstjobstatusessettings:any;
mstjobstatusessource: any;

showmstjobstatusesCheckbox()
{
debugger;
if(this.tblmstjobstatusessource.settings['selectMode']== 'multi')this.tblmstjobstatusessource.settings['selectMode']= 'single';
else
this.tblmstjobstatusessource.settings['selectMode']= 'multi';
this.tblmstjobstatusessource.initGrid();
}
deletemstjobstatusesAll()
{
this.tblmstjobstatusessource.settings['selectMode'] = 'single';
}
showmstjobstatusesFilter()
{
  setTimeout(() => {
  this.SetmstjobstatusesTableddConfig();
  });
      if(this.tblmstjobstatusessource.settings!=null)this.tblmstjobstatusessource.settings['hideSubHeader'] =!this.tblmstjobstatusessource.settings['hideSubHeader'];
this.tblmstjobstatusessource.initGrid();
}
showmstjobstatusesInActive()
{
}
enablemstjobstatusesInActive()
{
}
async SetmstjobstatusesTableddConfig()
{
if(!this.bfilterPopulatemstjobstatuses){
}
this.bfilterPopulatemstjobstatuses=true;
}
async mstjobstatusesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetmstjobstatusesTableConfig()
{
this.mstjobstatusessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
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
applicantid: {
title: 'Applicant',
type: 'number',
filter:true,
},
viewdatetime: {
title: 'View Date Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
intereststatus: {
title: 'Interest Status',
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
messages: {
title: 'Messages',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
jobid: {
title: 'Job',
type: 'number',
filter:true,
},
hiringstatus: {
title: 'Hiring Status',
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
ctcoffered: {
title: 'C T C Offered',
type: '',
filter:true,
},
},
};
}
mstjobstatusesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.mstjobstatusesID)>=0)
{
this.mstjobstatusessource=new LocalDataSource();
this.mstjobstatusessource.load(this.mstcorporatemasterservice.mstjobstatuses as  any as LocalDataSource);
this.mstjobstatusessource.setPaging(1, 20, true);
}
}

//external to inline
/*
mstjobstatusesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.mstcorporatemasterservice.mstjobstatuses.length == 0)
{
    this.tblmstjobstatusessource.grid.createFormShown = true;
}
else
{
    let obj = new mstjobstatus();
    this.mstcorporatemasterservice.mstjobstatuses.push(obj);
    this.mstjobstatusessource.refresh();
    if ((this.mstcorporatemasterservice.mstjobstatuses.length / this.mstjobstatusessource.getPaging().perPage).toFixed(0) + 1 != this.mstjobstatusessource.getPaging().page)
    {
        this.mstjobstatusessource.setPage((this.mstcorporatemasterservice.mstjobstatuses.length / this.mstjobstatusessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblmstjobstatusessource.grid.edit(this.tblmstjobstatusessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.mstjobstatusessource.data.indexOf(event.data);
this.onDeletemstjobstatus(event,event.data.viewid,((this.mstjobstatusessource.getPaging().page-1) *this.mstjobstatusessource.getPaging().perPage)+index);
this.mstjobstatusessource.refresh();
break;
}
}

*/
mstjobstatusesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditmstjobstatus(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditmstjobstatus(event,event.data.viewid,this.formid);
break;
case 'delete':
this.onDeletemstjobstatus(event,event.data.viewid,((this.mstjobstatusessource.getPaging().page-1) *this.mstjobstatusessource.getPaging().perPage)+event.index);
this.mstjobstatusessource.refresh();
break;
}
}
mstjobstatusesonDelete(obj) {
let viewid=obj.data.viewid;
if (confirm('Are you sure to delete this record ?')) {
this.mstcorporatemasterservice.deletemstcorporatemaster(viewid).then(res=>
this.mstjobstatusesLoadTable()
);
}
}
mstjobstatusesPaging(val)
{
debugger;
this.mstjobstatusessource.setPaging(1, val, true);
}

handlemstjobstatusesGridSelected(event:any) {
this.mstjobstatusesselectedindex=this.mstcorporatemasterservice.mstjobstatuses.findIndex(i => i.viewid === event.data.viewid);
}
IsmstjobstatusesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.mstjobstatusesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes mstjobstatuses

}



