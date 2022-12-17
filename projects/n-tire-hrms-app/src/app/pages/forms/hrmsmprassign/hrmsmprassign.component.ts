import { hrmsmprassignService } from './../../../service/hrmsmprassign.service';
import { hrmsmprassign } from './../../../model/hrmsmprassign.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
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
selector: 'app-hrmsmprassign',
templateUrl: './hrmsmprassign.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsmprassignComponent implements OnInit {
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
bfilterPopulatehrmsmprassigns:boolean=false;
datahrmsmprassignsassignedowner3:any=[];
 hrmsmprassignForm: FormGroup;
assignedownerList: bousermaster[];
assignedowneroptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
assignedowner_bousermastersForm: FormGroup;//autocomplete
assignedowner_bousermastersoptions:any;//autocomplete
assignedowner_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsmprassignshowOption:boolean;
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
private hrmsmprassignservice: hrmsmprassignService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.hrmsmprassignForm  = this.fb.group({
pk:[null],
mprid: [null],
assignid: [null],
assignedowner: [null],
assignedownerdesc: [null],
assignedquantity: [null],
offered1: [null],
joined1: [null],
startdate1: [null],
completiondate1: [null],
offered2: [null],
joined2: [null],
startdate2: [null],
completiondate2: [null],
offered3: [null],
joined3: [null],
startdate3: [null],
completiondate3: [null],
offered4: [null],
joined4: [null],
startdate4: [null],
completiondate4: [null],
offered5: [null],
joined5: [null],
startdate5: [null],
completiondate5: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsmprassignForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsmprassignForm.dirty && this.hrmsmprassignForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.assignid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.assignid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.assignid && pkDetail) {
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
let hrmsmprassignid = null;

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
this.formid=hrmsmprassignid;
//this.sharedService.alert(hrmsmprassignid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.assignedownerList = res as bousermaster[];
if(this.hrmsmprassignservice.formData && this.hrmsmprassignservice.formData.assignedowner){
this.assignedowneroptionsEvent.emit(this.assignedownerList);
this.hrmsmprassignForm.patchValue({
    assignedowner: this.hrmsmprassignservice.formData.assignedowner,
    assignedownerdesc: this.hrmsmprassignservice.formData.assignedownerdesc,
});
}
{
let arrassignedowner = this.assignedownerList.filter(v => v.userid == this.hrmsmprassignForm.get('assignedowner').value);
let objassignedowner;
if (arrassignedowner.length > 0) objassignedowner = arrassignedowner[0];
if (objassignedowner)
{
}
}
}
).catch((err) => {console.log(err);});
this.assignedowner_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.assignedownerList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.assignedowner_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.hrmsmprassignservice.gethrmsmprassignsList().then(res => {
      this.pkList = res as hrmsmprassign[];
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
this.hrmsmprassignForm.markAsUntouched();
this.hrmsmprassignForm.markAsPristine();
}
onSelectedassignedowner(assignedownerDetail: any) {
if (assignedownerDetail.userid && assignedownerDetail) {
this.hrmsmprassignForm.patchValue({
assignedowner: assignedownerDetail.userid,
assignedownerdesc: assignedownerDetail.username,

});

}
}




resetForm() {
if (this.hrmsmprassignForm != null)
this.hrmsmprassignForm.reset();
this.hrmsmprassignForm.patchValue({
assignedowner: this.sessiondata.userid,
assignedownerdesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let assignid = this.hrmsmprassignForm.get('assignid').value;
        if(assignid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsmprassignservice.deletehrmsmprassign(assignid).then(res =>
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
    this.hrmsmprassignForm.patchValue({
        assignid: null
    });
    if(this.hrmsmprassignservice.formData.assignid!=null)this.hrmsmprassignservice.formData.assignid=null;
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
        else if(key=="startdate1")
this.hrmsmprassignForm.patchValue({"startdate1":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completiondate1")
this.hrmsmprassignForm.patchValue({"completiondate1":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate2")
this.hrmsmprassignForm.patchValue({"startdate2":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completiondate2")
this.hrmsmprassignForm.patchValue({"completiondate2":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate3")
this.hrmsmprassignForm.patchValue({"startdate3":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completiondate3")
this.hrmsmprassignForm.patchValue({"completiondate3":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate4")
this.hrmsmprassignForm.patchValue({"startdate4":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completiondate4")
this.hrmsmprassignForm.patchValue({"completiondate4":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="startdate5")
this.hrmsmprassignForm.patchValue({"startdate5":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="completiondate5")
this.hrmsmprassignForm.patchValue({"completiondate5":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsmprassignForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsmprassignForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsmprassignForm.controls[key]!=undefined)
{
this.hrmsmprassignForm.controls[key].disable({onlySelf: true});
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
mpridonChange(evt:any){
let e=evt.value;
}
assignidonChange(evt:any){
let e=evt.value;
}
assignedowneronChange(evt:any){
let e=evt.value;
}
assignedquantityonChange(evt:any){
let e=evt.value;
}
offered1onChange(evt:any){
let e=evt.value;
}
joined1onChange(evt:any){
let e=evt.value;
}
startdate1onChange(evt:any){
let e=evt.value;
}
completiondate1onChange(evt:any){
let e=evt.value;
}
offered2onChange(evt:any){
let e=evt.value;
}
joined2onChange(evt:any){
let e=evt.value;
}
startdate2onChange(evt:any){
let e=evt.value;
}
completiondate2onChange(evt:any){
let e=evt.value;
}
offered3onChange(evt:any){
let e=evt.value;
}
joined3onChange(evt:any){
let e=evt.value;
}
startdate3onChange(evt:any){
let e=evt.value;
}
completiondate3onChange(evt:any){
let e=evt.value;
}
offered4onChange(evt:any){
let e=evt.value;
}
joined4onChange(evt:any){
let e=evt.value;
}
startdate4onChange(evt:any){
let e=evt.value;
}
completiondate4onChange(evt:any){
let e=evt.value;
}
offered5onChange(evt:any){
let e=evt.value;
}
joined5onChange(evt:any){
let e=evt.value;
}
startdate5onChange(evt:any){
let e=evt.value;
}
completiondate5onChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsmprassigns() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsmprassignservice.gethrmsmprassignsByEID(pkcol).then(res => {

this.hrmsmprassignservice.formData=res.hrmsmprassign;
let formproperty=res.hrmsmprassign.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsmprassign.pkcol;
this.formid=res.hrmsmprassign.assignid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsmprassign.assignid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsmprassignForm.patchValue({
mprid: res.hrmsmprassign.mprid,
assignid: res.hrmsmprassign.assignid,
assignedowner: res.hrmsmprassign.assignedowner,
assignedownerdesc: res.hrmsmprassign.assignedownerdesc,
assignedquantity: res.hrmsmprassign.assignedquantity,
offered1: res.hrmsmprassign.offered1,
joined1: res.hrmsmprassign.joined1,
startdate1: this.ngbDateParserFormatter.parse(res.hrmsmprassign.startdate1),
completiondate1: this.ngbDateParserFormatter.parse(res.hrmsmprassign.completiondate1),
offered2: res.hrmsmprassign.offered2,
joined2: res.hrmsmprassign.joined2,
startdate2: this.ngbDateParserFormatter.parse(res.hrmsmprassign.startdate2),
completiondate2: this.ngbDateParserFormatter.parse(res.hrmsmprassign.completiondate2),
offered3: res.hrmsmprassign.offered3,
joined3: res.hrmsmprassign.joined3,
startdate3: this.ngbDateParserFormatter.parse(res.hrmsmprassign.startdate3),
completiondate3: this.ngbDateParserFormatter.parse(res.hrmsmprassign.completiondate3),
offered4: res.hrmsmprassign.offered4,
joined4: res.hrmsmprassign.joined4,
startdate4: this.ngbDateParserFormatter.parse(res.hrmsmprassign.startdate4),
completiondate4: this.ngbDateParserFormatter.parse(res.hrmsmprassign.completiondate4),
offered5: res.hrmsmprassign.offered5,
joined5: res.hrmsmprassign.joined5,
startdate5: this.ngbDateParserFormatter.parse(res.hrmsmprassign.startdate5),
completiondate5: this.ngbDateParserFormatter.parse(res.hrmsmprassign.completiondate5),
status: res.hrmsmprassign.status,
statusdesc: res.hrmsmprassign.statusdesc,
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
  for (let key in this.hrmsmprassignForm.controls) {
    if (this.hrmsmprassignForm.controls[key] != null) {
if(false)
{
if(this.hrmsmprassignservice.formData!=null && this.hrmsmprassignservice.formData[key]!=null  && this.hrmsmprassignservice.formData[key]!='[]' && this.hrmsmprassignservice.formData[key]!=undefined && this.hrmsmprassignservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsmprassignservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsmprassignservice.formData!=null && this.hrmsmprassignservice.formData[key]!=null   && this.hrmsmprassignservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsmprassignservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsmprassignservice.formData!=null && this.hrmsmprassignservice.formData[key]!=null   && this.hrmsmprassignservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsmprassignservice.formData[key]+"'><div class='progress__number'>"+this.hrmsmprassignservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsmprassignForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsmprassignForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsmprassignForm.value;
obj.startdate1=new Date(this.hrmsmprassignForm.get('startdate1').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate1').value)+'  UTC' :null);
obj.completiondate1=new Date(this.hrmsmprassignForm.get('completiondate1').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate1').value)+'  UTC' :null);
obj.startdate2=new Date(this.hrmsmprassignForm.get('startdate2').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate2').value)+'  UTC' :null);
obj.completiondate2=new Date(this.hrmsmprassignForm.get('completiondate2').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate2').value)+'  UTC' :null);
obj.startdate3=new Date(this.hrmsmprassignForm.get('startdate3').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate3').value)+'  UTC' :null);
obj.completiondate3=new Date(this.hrmsmprassignForm.get('completiondate3').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate3').value)+'  UTC' :null);
obj.startdate4=new Date(this.hrmsmprassignForm.get('startdate4').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate4').value)+'  UTC' :null);
obj.completiondate4=new Date(this.hrmsmprassignForm.get('completiondate4').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate4').value)+'  UTC' :null);
obj.startdate5=new Date(this.hrmsmprassignForm.get('startdate5').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate5').value)+'  UTC' :null);
obj.completiondate5=new Date(this.hrmsmprassignForm.get('completiondate5').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate5').value)+'  UTC' :null);
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

private hrmsmprassigntoggleOption(){
this.hrmsmprassignshowOption = this.hrmsmprassignshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsmprassignForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsmprassignForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsmprassignForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsmprassignservice.formData=this.hrmsmprassignForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsmprassignForm.controls[key] != null)
    {
        this.hrmsmprassignservice.formData[key] = this.hrmsmprassignForm.controls[key].value;
    }
}
}
}
this.hrmsmprassignservice.formData.startdate1=new Date(this.hrmsmprassignForm.get('startdate1').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate1').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.completiondate1=new Date(this.hrmsmprassignForm.get('completiondate1').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate1').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.startdate2=new Date(this.hrmsmprassignForm.get('startdate2').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate2').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.completiondate2=new Date(this.hrmsmprassignForm.get('completiondate2').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate2').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.startdate3=new Date(this.hrmsmprassignForm.get('startdate3').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate3').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.completiondate3=new Date(this.hrmsmprassignForm.get('completiondate3').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate3').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.startdate4=new Date(this.hrmsmprassignForm.get('startdate4').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate4').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.completiondate4=new Date(this.hrmsmprassignForm.get('completiondate4').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate4').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.startdate5=new Date(this.hrmsmprassignForm.get('startdate5').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('startdate5').value)+'  UTC' :null);
this.hrmsmprassignservice.formData.completiondate5=new Date(this.hrmsmprassignForm.get('completiondate5').value ? this.ngbDateParserFormatter.format(this.hrmsmprassignForm.get('completiondate5').value)+'  UTC' :null);
console.log(this.hrmsmprassignservice.formData);
this.hrmsmprassignservice.formData=this.hrmsmprassignForm.value;
this.hrmsmprassignservice.saveOrUpdatehrmsmprassigns().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsmprassign);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsmprassignservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsmprassign);
}
else
{
this.FillData(res);
}
}
this.hrmsmprassignForm.markAsUntouched();
this.hrmsmprassignForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditassignedowner( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.hrmsmprassignForm.get('assignedowner').value, ScreenType:2 }
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



