import { erptendersuppliercomplianceresponseService } from './../../../service/erptendersuppliercomplianceresponse.service';
import { erptendersuppliercomplianceresponse } from './../../../model/erptendersuppliercomplianceresponse.model';
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
import { erptendersupplierresponse} from './../../../model/erptendersupplierresponse.model';
import { erptendersupplierresponseComponent } from './../../../pages/forms/erptendersupplierresponse/erptendersupplierresponse.component';
import { erptendersupplierresponseService } from './../../../service/erptendersupplierresponse.service';
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
selector: 'app-erptendersuppliercomplianceresponse',
templateUrl: './erptendersuppliercomplianceresponse.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erptendersuppliercomplianceresponseComponent implements OnInit {
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
bfilterPopulateerptendersuppliercomplianceresponses:boolean=false;
dataerptendersuppliercomplianceresponsescompliancetype3:any=[];
dataerptendersuppliercomplianceresponsesresponseid3:any=[];
 erptendersuppliercomplianceresponseForm: FormGroup;
compliancetypeList: boconfigvalue[];
responseidList: erptendersupplierresponse[];
responseidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
responseid_erptendersupplierresponsesForm: FormGroup;//autocomplete
responseid_erptendersupplierresponsesoptions:any;//autocomplete
responseid_erptendersupplierresponsesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erptendersuppliercomplianceresponseshowOption:boolean;
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
private erptendersuppliercomplianceresponseservice: erptendersuppliercomplianceresponseService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erptendersupplierresponseservice:erptendersupplierresponseService,
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
this.erptendersuppliercomplianceresponseForm  = this.fb.group({
pk:[null],
complianceid: [null],
tenderid: [null],
compliancetype: [null],
compliancetypedesc: [null],
details: [null],
responseid: [null],
responseiddesc: [null],
complied: [null],
remarks: [null],
sequence: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erptendersuppliercomplianceresponseForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erptendersuppliercomplianceresponseForm.dirty && this.erptendersuppliercomplianceresponseForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.complianceid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.complianceid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.complianceid && pkDetail) {
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
let erptendersuppliercomplianceresponseid = null;

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
this.formid=erptendersuppliercomplianceresponseid;
//this.sharedService.alert(erptendersuppliercomplianceresponseid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("compliancetype").then(res => this.compliancetypeList = res as boconfigvalue[]);
this.erptendersupplierresponseservice.geterptendersupplierresponsesList().then(res => 
{
this.responseidList = res as erptendersupplierresponse[];
if(this.erptendersuppliercomplianceresponseservice.formData && this.erptendersuppliercomplianceresponseservice.formData.responseid){
this.responseidoptionsEvent.emit(this.responseidList);
this.erptendersuppliercomplianceresponseForm.patchValue({
    responseid: this.erptendersuppliercomplianceresponseservice.formData.responseid,
    responseiddesc: this.erptendersuppliercomplianceresponseservice.formData.responseiddesc,
});
}
{
let arrresponseid = this.responseidList.filter(v => v.responseid == this.erptendersuppliercomplianceresponseForm.get('responseid').value);
let objresponseid;
if (arrresponseid.length > 0) objresponseid = arrresponseid[0];
if (objresponseid)
{
}
}
}
).catch((err) => {console.log(err);});
this.responseid_erptendersupplierresponsesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.responseidList.filter(v => v.supplierreference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.responseid_erptendersupplierresponsesformatter = (result: any) => result.supplierreference;

//autocomplete
    this.erptendersuppliercomplianceresponseservice.geterptendersuppliercomplianceresponsesList().then(res => {
      this.pkList = res as erptendersuppliercomplianceresponse[];
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
this.erptendersuppliercomplianceresponseForm.markAsUntouched();
this.erptendersuppliercomplianceresponseForm.markAsPristine();
}
onSelectedresponseid(responseidDetail: any) {
if (responseidDetail.responseid && responseidDetail) {
this.erptendersuppliercomplianceresponseForm.patchValue({
responseid: responseidDetail.responseid,
responseiddesc: responseidDetail.supplierreference,

});

}
}




resetForm() {
if (this.erptendersuppliercomplianceresponseForm != null)
this.erptendersuppliercomplianceresponseForm.reset();
this.erptendersuppliercomplianceresponseForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let complianceid = this.erptendersuppliercomplianceresponseForm.get('complianceid').value;
        if(complianceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erptendersuppliercomplianceresponseservice.deleteerptendersuppliercomplianceresponse(complianceid).then(res =>
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
    this.erptendersuppliercomplianceresponseForm.patchValue({
        complianceid: null
    });
    if(this.erptendersuppliercomplianceresponseservice.formData.complianceid!=null)this.erptendersuppliercomplianceresponseservice.formData.complianceid=null;
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
this.erptendersuppliercomplianceresponseForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erptendersuppliercomplianceresponseForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erptendersuppliercomplianceresponseForm.controls[key]!=undefined)
{
this.erptendersuppliercomplianceresponseForm.controls[key].disable({onlySelf: true});
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
complianceidonChange(evt:any){
let e=evt.value;
}
tenderidonChange(evt:any){
let e=evt.value;
}
compliancetypeonChange(evt:any){
let e=this.f.compliancetype.value as any;
this.erptendersuppliercomplianceresponseForm.patchValue({compliancetypedesc:evt.options[evt.options.selectedIndex].text});
}
detailsonChange(evt:any){
let e=evt.value;
}
responseidonChange(evt:any){
let e=evt.value;
}
compliedonChange(evt:any){
let e=evt.value;
}
remarksonChange(evt:any){
let e=evt.value;
}
sequenceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerptendersuppliercomplianceresponses() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erptendersuppliercomplianceresponseservice.geterptendersuppliercomplianceresponsesByEID(pkcol).then(res => {

this.erptendersuppliercomplianceresponseservice.formData=res.erptendersuppliercomplianceresponse;
let formproperty=res.erptendersuppliercomplianceresponse.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erptendersuppliercomplianceresponse.pkcol;
this.formid=res.erptendersuppliercomplianceresponse.complianceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erptendersuppliercomplianceresponse.complianceid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erptendersuppliercomplianceresponseForm.patchValue({
complianceid: res.erptendersuppliercomplianceresponse.complianceid,
tenderid: res.erptendersuppliercomplianceresponse.tenderid,
compliancetype: res.erptendersuppliercomplianceresponse.compliancetype,
compliancetypedesc: res.erptendersuppliercomplianceresponse.compliancetypedesc,
details: res.erptendersuppliercomplianceresponse.details,
responseid: res.erptendersuppliercomplianceresponse.responseid,
responseiddesc: res.erptendersuppliercomplianceresponse.responseiddesc,
complied: res.erptendersuppliercomplianceresponse.complied,
remarks: res.erptendersuppliercomplianceresponse.remarks,
sequence: res.erptendersuppliercomplianceresponse.sequence,
status: res.erptendersuppliercomplianceresponse.status,
statusdesc: res.erptendersuppliercomplianceresponse.statusdesc,
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
  for (let key in this.erptendersuppliercomplianceresponseForm.controls) {
    if (this.erptendersuppliercomplianceresponseForm.controls[key] != null) {
if(false)
{
if(this.erptendersuppliercomplianceresponseservice.formData!=null && this.erptendersuppliercomplianceresponseservice.formData[key]!=null  && this.erptendersuppliercomplianceresponseservice.formData[key]!='[]' && this.erptendersuppliercomplianceresponseservice.formData[key]!=undefined && this.erptendersuppliercomplianceresponseservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erptendersuppliercomplianceresponseservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erptendersuppliercomplianceresponseservice.formData!=null && this.erptendersuppliercomplianceresponseservice.formData[key]!=null   && this.erptendersuppliercomplianceresponseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erptendersuppliercomplianceresponseservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erptendersuppliercomplianceresponseservice.formData!=null && this.erptendersuppliercomplianceresponseservice.formData[key]!=null   && this.erptendersuppliercomplianceresponseservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erptendersuppliercomplianceresponseservice.formData[key]+"'><div class='progress__number'>"+this.erptendersuppliercomplianceresponseservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erptendersuppliercomplianceresponseForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erptendersuppliercomplianceresponseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erptendersuppliercomplianceresponseForm.value;
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

private erptendersuppliercomplianceresponsetoggleOption(){
this.erptendersuppliercomplianceresponseshowOption = this.erptendersuppliercomplianceresponseshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erptendersuppliercomplianceresponseForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erptendersuppliercomplianceresponseForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erptendersuppliercomplianceresponseForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erptendersuppliercomplianceresponseservice.formData=this.erptendersuppliercomplianceresponseForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erptendersuppliercomplianceresponseForm.controls[key] != null)
    {
        this.erptendersuppliercomplianceresponseservice.formData[key] = this.erptendersuppliercomplianceresponseForm.controls[key].value;
    }
}
}
}
console.log(this.erptendersuppliercomplianceresponseservice.formData);
this.erptendersuppliercomplianceresponseservice.formData=this.erptendersuppliercomplianceresponseForm.value;
this.erptendersuppliercomplianceresponseservice.saveOrUpdateerptendersuppliercomplianceresponses().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptendersuppliercomplianceresponse);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erptendersuppliercomplianceresponseservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erptendersuppliercomplianceresponse);
}
else
{
this.FillData(res);
}
}
this.erptendersuppliercomplianceresponseForm.markAsUntouched();
this.erptendersuppliercomplianceresponseForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditresponseid( responseid) {
/*let ScreenType='2';
this.dialog.open(erptendersupplierresponseComponent, 
{
data: {responseid:this.erptendersuppliercomplianceresponseForm.get('responseid').value, ScreenType:2 }
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



