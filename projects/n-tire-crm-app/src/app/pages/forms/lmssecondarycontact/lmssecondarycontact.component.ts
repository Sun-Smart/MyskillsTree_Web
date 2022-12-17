import { lmssecondarycontactService } from './../../../service/lmssecondarycontact.service';
import { lmssecondarycontact } from './../../../model/lmssecondarycontact.model';
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
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { lmsopportunity} from './../../../model/lmsopportunity.model';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
//popups
import { lmscorporatesecondarycontact} from './../../../model/lmscorporatesecondarycontact.model';
import { lmscorporatesecondarycontactService } from './../../../service/lmscorporatesecondarycontact.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
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
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-lmssecondarycontact',
templateUrl: './lmssecondarycontact.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmssecondarycontactComponent implements OnInit {
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
bfilterPopulatelmssecondarycontacts:boolean=false;
datalmssecondarycontactsbranchid3:any=[];
datalmssecondarycontactsopportunityid3:any=[];
datalmssecondarycontactssecondarycontactid3:any=[];
datalmssecondarycontactscampaignid3:any=[];
 lmssecondarycontactForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
secondarycontactidList: lmscorporatesecondarycontact[];
campaignidList: lmsproductmaster[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
lmssecondarycontactshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private lmssecondarycontactservice: lmssecondarycontactService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private lmsopportunityservice:lmsopportunityService,
private lmscorporatesecondarycontactservice:lmscorporatesecondarycontactService,
private lmsproductmasterservice:lmsproductmasterService,
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
this.lmssecondarycontactForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
leadid: [null],
opportunityid: [null],
opportunityiddesc: [null],
secondarycontactid: [null],
secondarycontactiddesc: [null],
campaignid: [null],
campaigniddesc: [null],
secondarycontact: [null, Validators.required],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmssecondarycontactForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmssecondarycontactForm.dirty && this.lmssecondarycontactForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.secondarycontactid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.secondarycontactid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.secondarycontactid && pkDetail) {
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
let lmssecondarycontactid = null;

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
this.formid=lmssecondarycontactid;
//this.sharedService.alert(lmssecondarycontactid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.lmssecondarycontactservice.formData && this.lmssecondarycontactservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.lmssecondarycontactForm.patchValue({
    branchid: this.lmssecondarycontactservice.formData.branchid,
    branchiddesc: this.lmssecondarycontactservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.lmssecondarycontactForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.lmsopportunityservice.getlmsopportunitiesList().then(res => 
{
this.opportunityidList = res as lmsopportunity[];
if(this.lmssecondarycontactservice.formData && this.lmssecondarycontactservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmssecondarycontactForm.patchValue({
    opportunityid: this.lmssecondarycontactservice.formData.opportunityid,
    opportunityiddesc: this.lmssecondarycontactservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmssecondarycontactForm.get('opportunityid').value);
let objopportunityid;
if (arropportunityid.length > 0) objopportunityid = arropportunityid[0];
if (objopportunityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.opportunityid_lmsopportunitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.opportunityidList.filter(v => v.requirementdetails.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.opportunityid_lmsopportunitiesformatter = (result: any) => result.requirementdetails;
this.lmscorporatesecondarycontactservice.getlmscorporatesecondarycontactsList().then(res => 
{
this.secondarycontactidList = res as lmscorporatesecondarycontact[];
}
).catch((err) => {console.log(err);});
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.campaignidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});

//autocomplete
    this.lmssecondarycontactservice.getlmssecondarycontactsList().then(res => {
      this.pkList = res as lmssecondarycontact[];
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
this.lmssecondarycontactForm.markAsUntouched();
this.lmssecondarycontactForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.lmssecondarycontactForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmssecondarycontactForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}




resetForm() {
if (this.lmssecondarycontactForm != null)
this.lmssecondarycontactForm.reset();
this.lmssecondarycontactForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let secondarycontactid = this.lmssecondarycontactForm.get('secondarycontactid').value;
        if(secondarycontactid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmssecondarycontactservice.deletelmssecondarycontact(secondarycontactid).then(res =>
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
    this.lmssecondarycontactForm.patchValue({
        secondarycontactid: null
    });
    if(this.lmssecondarycontactservice.formData.secondarycontactid!=null)this.lmssecondarycontactservice.formData.secondarycontactid=null;
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
this.lmssecondarycontactForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmssecondarycontactForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmssecondarycontactForm.controls[key]!=undefined)
{
this.lmssecondarycontactForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  )
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
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
branchidonChange(evt:any){
let e=evt.value;
}
leadidonChange(evt:any){
let e=evt.value;
}
opportunityidonChange(evt:any){
let e=evt.value;
}
secondarycontactidonChange(evt:any){
let e=evt.value;
this.lmssecondarycontactForm.patchValue({secondarycontactiddesc:evt.options[evt.options.selectedIndex].text});
}
campaignidonChange(evt:any){
let e=evt.value;
this.lmssecondarycontactForm.patchValue({campaigniddesc:evt.options[evt.options.selectedIndex].text});
}
secondarycontactonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlmssecondarycontacts() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmssecondarycontactservice.getlmssecondarycontactsByEID(pkcol).then(res => {

this.lmssecondarycontactservice.formData=res.lmssecondarycontact;
let formproperty=res.lmssecondarycontact.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmssecondarycontact.pkcol;
this.formid=res.lmssecondarycontact.secondarycontactid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmssecondarycontact.secondarycontactid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmssecondarycontactForm.patchValue({
branchid: res.lmssecondarycontact.branchid,
branchiddesc: res.lmssecondarycontact.branchiddesc,
leadid: res.lmssecondarycontact.leadid,
opportunityid: res.lmssecondarycontact.opportunityid,
opportunityiddesc: res.lmssecondarycontact.opportunityiddesc,
secondarycontactid: res.lmssecondarycontact.secondarycontactid,
secondarycontactiddesc: res.lmssecondarycontact.secondarycontactiddesc,
campaignid: res.lmssecondarycontact.campaignid,
campaigniddesc: res.lmssecondarycontact.campaigniddesc,
secondarycontact: res.lmssecondarycontact.secondarycontact,
status: res.lmssecondarycontact.status,
statusdesc: res.lmssecondarycontact.statusdesc,
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
  for (let key in this.lmssecondarycontactForm.controls) {
    if (this.lmssecondarycontactForm.controls[key] != null) {
if(false)
{
if(this.lmssecondarycontactservice.formData!=null && this.lmssecondarycontactservice.formData[key]!=null  && this.lmssecondarycontactservice.formData[key]!='[]' && this.lmssecondarycontactservice.formData[key]!=undefined && this.lmssecondarycontactservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmssecondarycontactservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmssecondarycontactservice.formData!=null && this.lmssecondarycontactservice.formData[key]!=null   && this.lmssecondarycontactservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmssecondarycontactservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmssecondarycontactservice.formData!=null && this.lmssecondarycontactservice.formData[key]!=null   && this.lmssecondarycontactservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmssecondarycontactservice.formData[key]+"'><div class='progress__number'>"+this.lmssecondarycontactservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmssecondarycontactForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmssecondarycontactForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmssecondarycontactForm.value;
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

private lmssecondarycontacttoggleOption(){
this.lmssecondarycontactshowOption = this.lmssecondarycontactshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmssecondarycontactForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmssecondarycontactForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmssecondarycontactForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmssecondarycontactservice.formData=this.lmssecondarycontactForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmssecondarycontactForm.controls[key] != null)
    {
        this.lmssecondarycontactservice.formData[key] = this.lmssecondarycontactForm.controls[key].value;
    }
}
}
}
console.log(this.lmssecondarycontactservice.formData);
this.lmssecondarycontactservice.formData=this.lmssecondarycontactForm.value;
this.lmssecondarycontactservice.saveOrUpdatelmssecondarycontacts().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmssecondarycontact);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmssecondarycontactservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmssecondarycontact);
}
else
{
this.FillData(res);
}
}
this.lmssecondarycontactForm.markAsUntouched();
this.lmssecondarycontactForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.lmssecondarycontactForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmssecondarycontactForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsecondarycontactid( secondarycontactid) {
/*let ScreenType='2';
this.dialog.open(lmscorporatesecondarycontactComponent, 
{
data: {secondarycontactid:this.lmssecondarycontactForm.get('secondarycontactid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcampaignid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmssecondarycontactForm.get('campaignid').value, ScreenType:2 }
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



