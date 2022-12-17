import { legalcaselawyerService } from './../../../service/legalcaselawyer.service';
import { legalcaselawyer } from './../../../model/legalcaselawyer.model';
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
import { legallawyermaster} from './../../../model/legallawyermaster.model';
import { legallawyermasterComponent } from './../../../pages/forms/legallawyermaster/legallawyermaster.component';
import { legallawyermasterService } from './../../../service/legallawyermaster.service';
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
selector: 'app-legalcaselawyer',
templateUrl: './legalcaselawyer.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcaselawyerComponent implements OnInit {
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
bfilterPopulatelegalcaselawyers:boolean=false;
datalegalcaselawyerslawyerid3:any=[];
datalegalcaselawyerslawyertype3:any=[];
 legalcaselawyerForm: FormGroup;
lawyeridList: legallawyermaster[];
lawyertypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
legalcaselawyershowOption:boolean;
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
private legalcaselawyerservice: legalcaselawyerService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private legallawyermasterservice:legallawyermasterService,
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
this.legalcaselawyerForm  = this.fb.group({
pk:[null],
caselawyerid: [null],
caseid: [null],
lawyerid: [null, Validators.required],
lawyeriddesc: [null],
lawyertype: [null],
lawyertypedesc: [null],
fromdate: [null],
todate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcaselawyerForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcaselawyerForm.dirty && this.legalcaselawyerForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.caselawyerid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.caselawyerid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.caselawyerid && pkDetail) {
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
let legalcaselawyerid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=legalcaselawyerid;
//this.sharedService.alert(legalcaselawyerid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.legallawyermasterservice.getlegallawyermastersList().then(res => 
{
this.lawyeridList = res as legallawyermaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("lawyertype").then(res => this.lawyertypeList = res as boconfigvalue[]);

//autocomplete
    this.legalcaselawyerservice.getlegalcaselawyersList().then(res => {
      this.pkList = res as legalcaselawyer[];
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
this.legalcaselawyerForm.markAsUntouched();
this.legalcaselawyerForm.markAsPristine();
}



resetForm() {
if (this.legalcaselawyerForm != null)
this.legalcaselawyerForm.reset();
this.legalcaselawyerForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let caselawyerid = this.legalcaselawyerForm.get('caselawyerid').value;
        if(caselawyerid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcaselawyerservice.deletelegalcaselawyer(caselawyerid).then(res =>
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
    this.legalcaselawyerForm.patchValue({
        caselawyerid: null
    });
    if(this.legalcaselawyerservice.formData.caselawyerid!=null)this.legalcaselawyerservice.formData.caselawyerid=null;
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
        else if(key=="fromdate")
this.legalcaselawyerForm.patchValue({"fromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="todate")
this.legalcaselawyerForm.patchValue({"todate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.legalcaselawyerForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcaselawyerForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcaselawyerForm.controls[key]!=undefined)
{
this.legalcaselawyerForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
caselawyeridonChange(evt:any){
let e=evt.value;
}
caseidonChange(evt:any){
let e=evt.value;
}
lawyeridonChange(evt:any){
let e=evt.value;
this.legalcaselawyerForm.patchValue({lawyeriddesc:evt.options[evt.options.selectedIndex].text});
}
lawyertypeonChange(evt:any){
let e=this.f.lawyertype.value as any;
this.legalcaselawyerForm.patchValue({lawyertypedesc:evt.options[evt.options.selectedIndex].text});
}
fromdateonChange(evt:any){
let e=evt.value;
}
todateonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlegalcaselawyers() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcaselawyerservice.getlegalcaselawyersByEID(pkcol).then(res => {

this.legalcaselawyerservice.formData=res.legalcaselawyer;
let formproperty=res.legalcaselawyer.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcaselawyer.pkcol;
this.formid=res.legalcaselawyer.caselawyerid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcaselawyerservice.formData=res.legalcaselawyer;
this.formid=res.legalcaselawyer.caselawyerid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcaselawyerForm.patchValue({
caselawyerid: res.legalcaselawyer.caselawyerid,
caseid: res.legalcaselawyer.caseid,
lawyerid: res.legalcaselawyer.lawyerid,
lawyeriddesc: res.legalcaselawyer.lawyeriddesc,
lawyertype: res.legalcaselawyer.lawyertype,
lawyertypedesc: res.legalcaselawyer.lawyertypedesc,
fromdate: this.ngbDateParserFormatter.parse(res.legalcaselawyer.fromdate),
todate: this.ngbDateParserFormatter.parse(res.legalcaselawyer.todate),
status: res.legalcaselawyer.status,
statusdesc: res.legalcaselawyer.statusdesc,
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
  for (let key in this.legalcaselawyerForm.controls) {
    if (this.legalcaselawyerForm.controls[key] != null) {
if(false)
{
if(this.legalcaselawyerservice.formData!=null && this.legalcaselawyerservice.formData[key]!=null  && this.legalcaselawyerservice.formData[key]!='[]' && this.legalcaselawyerservice.formData[key]!=undefined && this.legalcaselawyerservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcaselawyerservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcaselawyerservice.formData!=null && this.legalcaselawyerservice.formData[key]!=null   && this.legalcaselawyerservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcaselawyerservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcaselawyerservice.formData!=null && this.legalcaselawyerservice.formData[key]!=null   && this.legalcaselawyerservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcaselawyerservice.formData[key]+"'><div class='progress__number'>"+this.legalcaselawyerservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcaselawyerForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcaselawyerForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcaselawyerForm.value;
obj.fromdate=new Date(this.legalcaselawyerForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.legalcaselawyerForm.get('fromdate').value)+'  UTC' :null);
obj.todate=new Date(this.legalcaselawyerForm.get('todate').value ? this.ngbDateParserFormatter.format(this.legalcaselawyerForm.get('todate').value)+'  UTC' :null);
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

private legalcaselawyertoggleOption(){
this.legalcaselawyershowOption = this.legalcaselawyershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcaselawyerForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcaselawyerForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcaselawyerForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcaselawyerservice.formData=this.legalcaselawyerForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcaselawyerForm.controls[key] != null)
    {
        this.legalcaselawyerservice.formData[key] = this.legalcaselawyerForm.controls[key].value;
    }
}
}
}
this.legalcaselawyerservice.formData.fromdate=new Date(this.legalcaselawyerForm.get('fromdate').value ? this.ngbDateParserFormatter.format(this.legalcaselawyerForm.get('fromdate').value)+'  UTC' :null);
this.legalcaselawyerservice.formData.todate=new Date(this.legalcaselawyerForm.get('todate').value ? this.ngbDateParserFormatter.format(this.legalcaselawyerForm.get('todate').value)+'  UTC' :null);
console.log(this.legalcaselawyerservice.formData);
this.legalcaselawyerservice.formData=this.legalcaselawyerForm.value;
this.legalcaselawyerservice.saveOrUpdatelegalcaselawyers().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcaselawyer);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcaselawyerservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcaselawyer);
}
else
{
this.FillData(res);
}
}
this.legalcaselawyerForm.markAsUntouched();
this.legalcaselawyerForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlawyerid( lawyerid) {
/*let ScreenType='2';
this.dialog.open(legallawyermasterComponent, 
{
data: {lawyerid:this.legalcaselawyerForm.get('lawyerid').value, ScreenType:2 }
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



