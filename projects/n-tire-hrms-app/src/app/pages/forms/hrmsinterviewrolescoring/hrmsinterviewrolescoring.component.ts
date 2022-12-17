import { hrmsinterviewrolescoringService } from './../../../service/hrmsinterviewrolescoring.service';
import { hrmsinterviewrolescoring } from './../../../model/hrmsinterviewrolescoring.model';
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
import { bouserrolemaster} from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
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
selector: 'app-hrmsinterviewrolescoring',
templateUrl: './hrmsinterviewrolescoring.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsinterviewrolescoringComponent implements OnInit {
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
bfilterPopulatehrmsinterviewrolescorings:boolean=false;
datahrmsinterviewrolescoringsuserroleid3:any=[];
datahrmsinterviewrolescoringsinterviewround3:any=[];
datahrmsinterviewrolescoringscriteria3:any=[];
 hrmsinterviewrolescoringForm: FormGroup;
userroleidList: bouserrolemaster[];
userroleidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userroleid_bouserrolemastersForm: FormGroup;//autocomplete
userroleid_bouserrolemastersoptions:any;//autocomplete
userroleid_bouserrolemastersformatter:any;//autocomplete
interviewroundList: boconfigvalue[];
criteriaList: bomasterdata[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsinterviewrolescoringshowOption:boolean;
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
private hrmsinterviewrolescoringservice: hrmsinterviewrolescoringService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bouserrolemasterservice:bouserrolemasterService,
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
this.hrmsinterviewrolescoringForm  = this.fb.group({
pk:[null],
userroleid: [null],
userroleiddesc: [null],
userrolescoringid: [null],
interviewround: [null],
interviewrounddesc: [null],
criteria: [null],
criteriadesc: [null],
weightage: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsinterviewrolescoringForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsinterviewrolescoringForm.dirty && this.hrmsinterviewrolescoringForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.userrolescoringid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.userrolescoringid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.userrolescoringid && pkDetail) {
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
let hrmsinterviewrolescoringid = null;

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
this.formid=hrmsinterviewrolescoringid;
//this.sharedService.alert(hrmsinterviewrolescoringid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bouserrolemasterservice.getbouserrolemastersList().then(res => 
{
this.userroleidList = res as bouserrolemaster[];
if(this.hrmsinterviewrolescoringservice.formData && this.hrmsinterviewrolescoringservice.formData.userroleid){
this.userroleidoptionsEvent.emit(this.userroleidList);
this.hrmsinterviewrolescoringForm.patchValue({
    userroleid: this.hrmsinterviewrolescoringservice.formData.userroleid,
    userroleiddesc: this.hrmsinterviewrolescoringservice.formData.userroleiddesc,
});
}
{
let arruserroleid = this.userroleidList.filter(v => v.userroleid == this.hrmsinterviewrolescoringForm.get('userroleid').value);
let objuserroleid;
if (arruserroleid.length > 0) objuserroleid = arruserroleid[0];
if (objuserroleid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userroleid_bouserrolemastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.userroleidList.filter(v => v.userrole.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userroleid_bouserrolemastersformatter = (result: any) => result.userrole;
this.configservice.getList("interviewround").then(res => this.interviewroundList = res as boconfigvalue[]);
this.bomasterdataservice.getList("mj5qo").then(res => {
this.criteriaList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsinterviewrolescoringservice.gethrmsinterviewrolescoringsList().then(res => {
      this.pkList = res as hrmsinterviewrolescoring[];
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
this.hrmsinterviewrolescoringForm.markAsUntouched();
this.hrmsinterviewrolescoringForm.markAsPristine();
}
onSelecteduserroleid(userroleidDetail: any) {
if (userroleidDetail.userroleid && userroleidDetail) {
this.hrmsinterviewrolescoringForm.patchValue({
userroleid: userroleidDetail.userroleid,
userroleiddesc: userroleidDetail.userrole,

});

}
}




resetForm() {
if (this.hrmsinterviewrolescoringForm != null)
this.hrmsinterviewrolescoringForm.reset();
this.hrmsinterviewrolescoringForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let userrolescoringid = this.hrmsinterviewrolescoringForm.get('userrolescoringid').value;
        if(userrolescoringid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsinterviewrolescoringservice.deletehrmsinterviewrolescoring(userrolescoringid).then(res =>
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
    this.hrmsinterviewrolescoringForm.patchValue({
        userrolescoringid: null
    });
    if(this.hrmsinterviewrolescoringservice.formData.userrolescoringid!=null)this.hrmsinterviewrolescoringservice.formData.userrolescoringid=null;
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
this.hrmsinterviewrolescoringForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsinterviewrolescoringForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsinterviewrolescoringForm.controls[key]!=undefined)
{
this.hrmsinterviewrolescoringForm.controls[key].disable({onlySelf: true});
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
userroleidonChange(evt:any){
let e=evt.value;
}
userrolescoringidonChange(evt:any){
let e=evt.value;
}
interviewroundonChange(evt:any){
let e=this.f.interviewround.value as any;
this.hrmsinterviewrolescoringForm.patchValue({interviewrounddesc:evt.options[evt.options.selectedIndex].text});
}
criteriaonChange(evt:any){
let e=evt.value;
this.hrmsinterviewrolescoringForm.patchValue({criteriadesc:evt.options[evt.options.selectedIndex].text});
}
weightageonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsinterviewrolescorings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsinterviewrolescoringservice.gethrmsinterviewrolescoringsByEID(pkcol).then(res => {

this.hrmsinterviewrolescoringservice.formData=res.hrmsinterviewrolescoring;
let formproperty=res.hrmsinterviewrolescoring.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsinterviewrolescoring.pkcol;
this.formid=res.hrmsinterviewrolescoring.userrolescoringid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsinterviewrolescoring.userrolescoringid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsinterviewrolescoringForm.patchValue({
userroleid: res.hrmsinterviewrolescoring.userroleid,
userroleiddesc: res.hrmsinterviewrolescoring.userroleiddesc,
userrolescoringid: res.hrmsinterviewrolescoring.userrolescoringid,
interviewround: res.hrmsinterviewrolescoring.interviewround,
interviewrounddesc: res.hrmsinterviewrolescoring.interviewrounddesc,
criteria: res.hrmsinterviewrolescoring.criteria,
criteriadesc: res.hrmsinterviewrolescoring.criteriadesc,
weightage: res.hrmsinterviewrolescoring.weightage,
status: res.hrmsinterviewrolescoring.status,
statusdesc: res.hrmsinterviewrolescoring.statusdesc,
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
  for (let key in this.hrmsinterviewrolescoringForm.controls) {
    if (this.hrmsinterviewrolescoringForm.controls[key] != null) {
if(false)
{
if(this.hrmsinterviewrolescoringservice.formData!=null && this.hrmsinterviewrolescoringservice.formData[key]!=null  && this.hrmsinterviewrolescoringservice.formData[key]!='[]' && this.hrmsinterviewrolescoringservice.formData[key]!=undefined && this.hrmsinterviewrolescoringservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsinterviewrolescoringservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsinterviewrolescoringservice.formData!=null && this.hrmsinterviewrolescoringservice.formData[key]!=null   && this.hrmsinterviewrolescoringservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsinterviewrolescoringservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsinterviewrolescoringservice.formData!=null && this.hrmsinterviewrolescoringservice.formData[key]!=null   && this.hrmsinterviewrolescoringservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsinterviewrolescoringservice.formData[key]+"'><div class='progress__number'>"+this.hrmsinterviewrolescoringservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsinterviewrolescoringForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsinterviewrolescoringForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsinterviewrolescoringForm.value;
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

private hrmsinterviewrolescoringtoggleOption(){
this.hrmsinterviewrolescoringshowOption = this.hrmsinterviewrolescoringshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsinterviewrolescoringForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsinterviewrolescoringForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsinterviewrolescoringForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsinterviewrolescoringservice.formData=this.hrmsinterviewrolescoringForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsinterviewrolescoringForm.controls[key] != null)
    {
        this.hrmsinterviewrolescoringservice.formData[key] = this.hrmsinterviewrolescoringForm.controls[key].value;
    }
}
}
}
console.log(this.hrmsinterviewrolescoringservice.formData);
this.hrmsinterviewrolescoringservice.formData=this.hrmsinterviewrolescoringForm.value;
this.hrmsinterviewrolescoringservice.saveOrUpdatehrmsinterviewrolescorings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinterviewrolescoring);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsinterviewrolescoringservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinterviewrolescoring);
}
else
{
this.FillData(res);
}
}
this.hrmsinterviewrolescoringForm.markAsUntouched();
this.hrmsinterviewrolescoringForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdituserroleid( userroleid) {
/*let ScreenType='2';
this.dialog.open(bouserrolemasterComponent, 
{
data: {userroleid:this.hrmsinterviewrolescoringForm.get('userroleid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcriteria( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsinterviewrolescoringForm.get('criteria').value, ScreenType:2 }
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



