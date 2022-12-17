import { hrmsinterviewscoringService } from './../../../service/hrmsinterviewscoring.service';
import { hrmsinterviewscoring } from './../../../model/hrmsinterviewscoring.model';
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
import { hrmsinterviewschedule} from './../../../model/hrmsinterviewschedule.model';
import { hrmsinterviewscheduleService } from './../../../service/hrmsinterviewschedule.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
selector: 'app-hrmsinterviewscoring',
templateUrl: './hrmsinterviewscoring.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsinterviewscoringComponent implements OnInit {
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
bfilterPopulatehrmsinterviewscorings:boolean=false;
datahrmsinterviewscoringsinterviewid3:any=[];
datahrmsinterviewscoringsinterviewround3:any=[];
datahrmsinterviewscoringscriteria3:any=[];
 hrmsinterviewscoringForm: FormGroup;
interviewidList: hrmsinterviewschedule[];
interviewidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
interviewid_hrmsinterviewschedulesForm: FormGroup;//autocomplete
interviewid_hrmsinterviewschedulesoptions:any;//autocomplete
interviewid_hrmsinterviewschedulesformatter:any;//autocomplete
interviewroundList: boconfigvalue[];
criteriaList: bomasterdata[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsinterviewscoringshowOption:boolean;
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
private hrmsinterviewscoringservice: hrmsinterviewscoringService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private hrmsinterviewscheduleservice:hrmsinterviewscheduleService,
private bomasterdataservice:bomasterdataService,
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
this.hrmsinterviewscoringForm  = this.fb.group({
pk:[null],
interviewid: [null],
interviewiddesc: [null],
scoringid: [null],
interviewround: [null],
interviewrounddesc: [null],
criteria: [null],
criteriadesc: [null],
rating: [null],
weightage: [null],
score: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsinterviewscoringForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsinterviewscoringForm.dirty && this.hrmsinterviewscoringForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.scoringid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.scoringid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.scoringid && pkDetail) {
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
let hrmsinterviewscoringid = null;

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
this.formid=hrmsinterviewscoringid;
//this.sharedService.alert(hrmsinterviewscoringid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.hrmsinterviewscheduleservice.gethrmsinterviewschedulesList().then(res => 
{
this.interviewidList = res as hrmsinterviewschedule[];
if(this.hrmsinterviewscoringservice.formData && this.hrmsinterviewscoringservice.formData.interviewid){
this.interviewidoptionsEvent.emit(this.interviewidList);
this.hrmsinterviewscoringForm.patchValue({
    interviewid: this.hrmsinterviewscoringservice.formData.interviewid,
    interviewiddesc: this.hrmsinterviewscoringservice.formData.interviewiddesc,
});
}
{
let arrinterviewid = this.interviewidList.filter(v => v.interviewid == this.hrmsinterviewscoringForm.get('interviewid').value);
let objinterviewid;
if (arrinterviewid.length > 0) objinterviewid = arrinterviewid[0];
if (objinterviewid)
{
}
}
}
).catch((err) => {console.log(err);});
this.interviewid_hrmsinterviewschedulesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.interviewidList.filter(v => v.interviewreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.interviewid_hrmsinterviewschedulesformatter = (result: any) => result.interviewreference;
this.configservice.getList("interviewround").then(res => this.interviewroundList = res as boconfigvalue[]);
this.bomasterdataservice.getList("mj5qo").then(res => {
this.criteriaList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsinterviewscoringservice.gethrmsinterviewscoringsList().then(res => {
      this.pkList = res as hrmsinterviewscoring[];
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
this.hrmsinterviewscoringForm.markAsUntouched();
this.hrmsinterviewscoringForm.markAsPristine();
}
onSelectedinterviewid(interviewidDetail: any) {
if (interviewidDetail.interviewid && interviewidDetail) {
this.hrmsinterviewscoringForm.patchValue({
interviewid: interviewidDetail.interviewid,
interviewiddesc: interviewidDetail.interviewreference,

});

}
}




resetForm() {
if (this.hrmsinterviewscoringForm != null)
this.hrmsinterviewscoringForm.reset();
this.hrmsinterviewscoringForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let scoringid = this.hrmsinterviewscoringForm.get('scoringid').value;
        if(scoringid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsinterviewscoringservice.deletehrmsinterviewscoring(scoringid).then(res =>
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
    this.hrmsinterviewscoringForm.patchValue({
        scoringid: null
    });
    if(this.hrmsinterviewscoringservice.formData.scoringid!=null)this.hrmsinterviewscoringservice.formData.scoringid=null;
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
this.hrmsinterviewscoringForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsinterviewscoringForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsinterviewscoringForm.controls[key]!=undefined)
{
this.hrmsinterviewscoringForm.controls[key].disable({onlySelf: true});
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
interviewidonChange(evt:any){
let e=evt.value;
}
scoringidonChange(evt:any){
let e=evt.value;
}
interviewroundonChange(evt:any){
let e=this.f.interviewround.value as any;
this.hrmsinterviewscoringForm.patchValue({interviewrounddesc:evt.options[evt.options.selectedIndex].text});
}
criteriaonChange(evt:any){
let e=evt.value;
this.hrmsinterviewscoringForm.patchValue({criteriadesc:evt.options[evt.options.selectedIndex].text});
}
ratingonChange(evt:any){
let e=evt.value;
}
weightageonChange(evt:any){
let e=evt.value;
}
scoreonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsinterviewscorings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsinterviewscoringservice.gethrmsinterviewscoringsByEID(pkcol).then(res => {

this.hrmsinterviewscoringservice.formData=res.hrmsinterviewscoring;
let formproperty=res.hrmsinterviewscoring.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsinterviewscoring.pkcol;
this.formid=res.hrmsinterviewscoring.scoringid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsinterviewscoring.scoringid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsinterviewscoringForm.patchValue({
interviewid: res.hrmsinterviewscoring.interviewid,
interviewiddesc: res.hrmsinterviewscoring.interviewiddesc,
scoringid: res.hrmsinterviewscoring.scoringid,
interviewround: res.hrmsinterviewscoring.interviewround,
interviewrounddesc: res.hrmsinterviewscoring.interviewrounddesc,
criteria: res.hrmsinterviewscoring.criteria,
criteriadesc: res.hrmsinterviewscoring.criteriadesc,
rating: res.hrmsinterviewscoring.rating,
weightage: res.hrmsinterviewscoring.weightage,
score: res.hrmsinterviewscoring.score,
notes: res.hrmsinterviewscoring.notes,
status: res.hrmsinterviewscoring.status,
statusdesc: res.hrmsinterviewscoring.statusdesc,
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
  for (let key in this.hrmsinterviewscoringForm.controls) {
    if (this.hrmsinterviewscoringForm.controls[key] != null) {
if(false)
{
if(this.hrmsinterviewscoringservice.formData!=null && this.hrmsinterviewscoringservice.formData[key]!=null  && this.hrmsinterviewscoringservice.formData[key]!='[]' && this.hrmsinterviewscoringservice.formData[key]!=undefined && this.hrmsinterviewscoringservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsinterviewscoringservice.formData[key])[0]["name"]);
}
else if( key=="rating")
{
if(this.hrmsinterviewscoringservice.formData!=null && this.hrmsinterviewscoringservice.formData[key]!=null   && this.hrmsinterviewscoringservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsinterviewscoringservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsinterviewscoringservice.formData!=null && this.hrmsinterviewscoringservice.formData[key]!=null   && this.hrmsinterviewscoringservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsinterviewscoringservice.formData[key]+"'><div class='progress__number'>"+this.hrmsinterviewscoringservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsinterviewscoringForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsinterviewscoringForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsinterviewscoringForm.value;
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

private hrmsinterviewscoringtoggleOption(){
this.hrmsinterviewscoringshowOption = this.hrmsinterviewscoringshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsinterviewscoringForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsinterviewscoringForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsinterviewscoringForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsinterviewscoringservice.formData=this.hrmsinterviewscoringForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsinterviewscoringForm.controls[key] != null)
    {
        this.hrmsinterviewscoringservice.formData[key] = this.hrmsinterviewscoringForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsinterviewscoringservice.formData);
this.hrmsinterviewscoringservice.formData=this.hrmsinterviewscoringForm.value;
this.hrmsinterviewscoringservice.saveOrUpdatehrmsinterviewscorings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinterviewscoring);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsinterviewscoringservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinterviewscoring);
}
else
{
this.FillData(res);
}
}
this.hrmsinterviewscoringForm.markAsUntouched();
this.hrmsinterviewscoringForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditinterviewid( interviewid) {
/*let ScreenType='2';
this.dialog.open(hrmsinterviewscheduleComponent, 
{
data: {interviewid:this.hrmsinterviewscoringForm.get('interviewid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcriteria( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsinterviewscoringForm.get('criteria').value, ScreenType:2 }
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



