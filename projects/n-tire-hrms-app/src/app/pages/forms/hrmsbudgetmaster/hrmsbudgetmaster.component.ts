import { hrmsbudgetmasterService } from './../../../service/hrmsbudgetmaster.service';
import { hrmsbudgetmaster } from './../../../model/hrmsbudgetmaster.model';
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
import { bofinancialyear} from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
//detail table services
import { hrmsbudgetdetail } from './../../../model/hrmsbudgetdetail.model';
import { hrmsbudgetdetailComponent } from './../../../pages/forms/hrmsbudgetdetail/hrmsbudgetdetail.component';
//FK services
import { bouserrolemaster,IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
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
selector: 'app-hrmsbudgetmaster',
templateUrl: './hrmsbudgetmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsbudgetmasterComponent implements OnInit {
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
bfilterPopulatehrmsbudgetmasters:boolean=false;
datahrmsbudgetmastersbranchid3:any=[];
datahrmsbudgetmastersfinyear3:any=[];
datahrmsbudgetmastersdepartment3:any=[];
datahrmsbudgetdetailsbranchid3:any=[];
datahrmsbudgetdetailsroleid3:any=[];
bfilterPopulatehrmsbudgetdetails:boolean=false;
@ViewChild('tblhrmsbudgetdetailssource',{static:false}) tblhrmsbudgetdetailssource: Ng2SmartTableComponent;
 hrmsbudgetmasterForm: FormGroup;
branchidList: bobranchmaster[];
finyearList: bofinancialyear[];
departmentList: bomasterdata[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsbudgetmastershowOption:boolean;
hrmsbudgetdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsbudgetdetailsvisiblelist:any;
hrmsbudgetdetailshidelist:any;

DeletedhrmsbudgetdetailIDs: string="";
hrmsbudgetdetailsID: string = "1";
hrmsbudgetdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsbudgetmasterservice: hrmsbudgetmasterService,
private bobranchmasterservice: bobranchmasterService,
private bouserrolemasterservice: bouserrolemasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bofinancialyearservice:bofinancialyearService,
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
this.hrmsbudgetmasterForm  = this.fb.group({
pk:[null],
budgetid: [null],
branchid: [null],
branchiddesc: [null],
finyear: [null],
finyeardesc: [null],
revisionno: [null],
budgetcode: [null],
budgetcreatedon: [null],
department: [null],
departmentdesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsbudgetmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsbudgetmasterForm.dirty && this.hrmsbudgetmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.budgetid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.budgetid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.budgetid && pkDetail) {
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
let hrmsbudgetmasterid = null;

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
this.formid=hrmsbudgetmasterid;
//this.sharedService.alert(hrmsbudgetmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsbudgetdetailsTableConfig();
  setTimeout(() => {
  this.SethrmsbudgetdetailsTableddConfig();
  });

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
}
).catch((err) => {console.log(err);});
this.bofinancialyearservice.getbofinancialyearsList().then(res => 
{
this.finyearList = res as bofinancialyear[];
}
).catch((err) => {console.log(err);});
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.hrmsbudgetmasterservice.gethrmsbudgetmastersList().then(res => {
      this.pkList = res as hrmsbudgetmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.budgetcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.budgetcode;

//setting the flag that the screen is not touched 
this.hrmsbudgetmasterForm.markAsUntouched();
this.hrmsbudgetmasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsbudgetmasterForm != null)
this.hrmsbudgetmasterForm.reset();
this.hrmsbudgetmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
finyear: this.sessiondata.finyearid,
});
setTimeout(() => {
this.hrmsbudgetmasterservice.hrmsbudgetdetails=[];
this.hrmsbudgetdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let budgetid = this.hrmsbudgetmasterForm.get('budgetid').value;
        if(budgetid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsbudgetmasterservice.deletehrmsbudgetmaster(budgetid).then(res =>
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
    this.hrmsbudgetmasterForm.patchValue({
        budgetid: null
    });
    if(this.hrmsbudgetmasterservice.formData.budgetid!=null)this.hrmsbudgetmasterservice.formData.budgetid=null;
for (let i=0;i<this.hrmsbudgetmasterservice.hrmsbudgetdetails.length;i++) {
this.hrmsbudgetmasterservice.hrmsbudgetdetails[i].detailid=null;
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
        else if(key=="budgetcreatedon")
this.hrmsbudgetmasterForm.patchValue({"budgetcreatedon":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsbudgetmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsbudgetmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsbudgetmasterForm.controls[key]!=undefined)
{
this.hrmsbudgetmasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.hrmsbudgetmasterservice.formData.budgetcode!=null )
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
budgetidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
this.hrmsbudgetmasterForm.patchValue({branchiddesc:evt.options[evt.options.selectedIndex].text});
}
finyearonChange(evt:any){
let e=evt.value;
this.hrmsbudgetmasterForm.patchValue({finyeardesc:evt.options[evt.options.selectedIndex].text});
}
revisionnoonChange(evt:any){
let e=evt.value;
}
budgetcodeonChange(evt:any){
let e=evt.value;
}
budgetcreatedononChange(evt:any){
let e=evt.value;
}
departmentonChange(evt:any){
let e=evt.value;
this.hrmsbudgetmasterForm.patchValue({departmentdesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmsbudgetmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsbudgetmasterservice.gethrmsbudgetmastersByEID(pkcol).then(res => {

this.hrmsbudgetmasterservice.formData=res.hrmsbudgetmaster;
let formproperty=res.hrmsbudgetmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsbudgetmaster.pkcol;
this.formid=res.hrmsbudgetmaster.budgetid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsbudgetmaster.budgetid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsbudgetmasterForm.patchValue({
budgetid: res.hrmsbudgetmaster.budgetid,
branchid: res.hrmsbudgetmaster.branchid,
branchiddesc: res.hrmsbudgetmaster.branchiddesc,
finyear: res.hrmsbudgetmaster.finyear,
finyeardesc: res.hrmsbudgetmaster.finyeardesc,
revisionno: res.hrmsbudgetmaster.revisionno,
budgetcode: res.hrmsbudgetmaster.budgetcode,
budgetcreatedon: this.ngbDateParserFormatter.parse(res.hrmsbudgetmaster.budgetcreatedon),
department: res.hrmsbudgetmaster.department,
departmentdesc: res.hrmsbudgetmaster.departmentdesc,
remarks: res.hrmsbudgetmaster.remarks,
status: res.hrmsbudgetmaster.status,
statusdesc: res.hrmsbudgetmaster.statusdesc,
});
this.hrmsbudgetdetailsvisiblelist=res.hrmsbudgetdetailsvisiblelist;
//Child Tables if any
this.hrmsbudgetmasterservice.hrmsbudgetdetails = res.hrmsbudgetdetails;
this.SethrmsbudgetdetailsTableConfig();
this.hrmsbudgetdetailsLoadTable();
  setTimeout(() => {
  this.SethrmsbudgetdetailsTableddConfig();
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
  for (let key in this.hrmsbudgetmasterForm.controls) {
    if (this.hrmsbudgetmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsbudgetmasterservice.formData!=null && this.hrmsbudgetmasterservice.formData[key]!=null  && this.hrmsbudgetmasterservice.formData[key]!='[]' && this.hrmsbudgetmasterservice.formData[key]!=undefined && this.hrmsbudgetmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsbudgetmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsbudgetmasterservice.formData!=null && this.hrmsbudgetmasterservice.formData[key]!=null   && this.hrmsbudgetmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsbudgetmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsbudgetmasterservice.formData!=null && this.hrmsbudgetmasterservice.formData[key]!=null   && this.hrmsbudgetmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsbudgetmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsbudgetmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsbudgetmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsbudgetmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsbudgetmasterForm.value;
obj.budgetcreatedon=new Date(this.hrmsbudgetmasterForm.get('budgetcreatedon').value ? this.ngbDateParserFormatter.format(this.hrmsbudgetmasterForm.get('budgetcreatedon').value)+'  UTC' :null);
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

private hrmsbudgetmastertoggleOption(){
this.hrmsbudgetmastershowOption = this.hrmsbudgetmastershowOption === true ? false : true;
}

private hrmsbudgetdetailtoggleOption(){
this.hrmsbudgetdetailshowOption = this.hrmsbudgetdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsbudgetmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsbudgetmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsbudgetmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsbudgetmasterservice.formData=this.hrmsbudgetmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsbudgetmasterForm.controls[key] != null)
    {
        this.hrmsbudgetmasterservice.formData[key] = this.hrmsbudgetmasterForm.controls[key].value;
    }
}
}
}
this.hrmsbudgetmasterservice.formData.budgetcreatedon=new Date(this.hrmsbudgetmasterForm.get('budgetcreatedon').value ? this.ngbDateParserFormatter.format(this.hrmsbudgetmasterForm.get('budgetcreatedon').value)+'  UTC' :null);
this.hrmsbudgetmasterservice.formData.DeletedhrmsbudgetdetailIDs = this.DeletedhrmsbudgetdetailIDs;
console.log(this.hrmsbudgetmasterservice.formData);
this.hrmsbudgetmasterservice.formData=this.hrmsbudgetmasterForm.value;
this.hrmsbudgetmasterservice.saveOrUpdatehrmsbudgetmasters().subscribe(
async res => {
if (this.hrmsbudgetdetailssource.data)
{
    for (let i = 0; i < this.hrmsbudgetdetailssource.data.length; i++)
    {
        if (this.hrmsbudgetdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsbudgetdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsbudgetmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsbudgetmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsbudgetmaster);
}
else
{
this.FillData(res);
}
}
this.hrmsbudgetmasterForm.markAsUntouched();
this.hrmsbudgetmasterForm.markAsPristine();
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
data: {branchid:this.hrmsbudgetmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfinyear( finyearid) {
/*let ScreenType='2';
this.dialog.open(bofinancialyearComponent, 
{
data: {finyearid:this.hrmsbudgetmasterForm.get('finyear').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartment( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmsbudgetmasterForm.get('department').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmsbudgetdetail(event:any,detailid:any, budgetid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsbudgetdetailComponent, 
{
data:  {  showview:false,save:false,event,detailid, budgetid,visiblelist:this.hrmsbudgetdetailsvisiblelist,  hidelist:this.hrmsbudgetdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsbudgetdetailssource.add(res);
this.hrmsbudgetdetailssource.refresh();
}
else
{
this.hrmsbudgetdetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsbudgetdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsbudgetdetailIDs += childID + ",";
this.hrmsbudgetmasterservice.hrmsbudgetdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsbudgetdetails
hrmsbudgetdetailssettings:any;
hrmsbudgetdetailssource: any;

showhrmsbudgetdetailsCheckbox()
{
debugger;
if(this.tblhrmsbudgetdetailssource.settings['selectMode']== 'multi')this.tblhrmsbudgetdetailssource.settings['selectMode']= 'single';
else
this.tblhrmsbudgetdetailssource.settings['selectMode']= 'multi';
this.tblhrmsbudgetdetailssource.initGrid();
}
deletehrmsbudgetdetailsAll()
{
this.tblhrmsbudgetdetailssource.settings['selectMode'] = 'single';
}
showhrmsbudgetdetailsFilter()
{
  setTimeout(() => {
  this.SethrmsbudgetdetailsTableddConfig();
  });
      if(this.tblhrmsbudgetdetailssource.settings!=null)this.tblhrmsbudgetdetailssource.settings['hideSubHeader'] =!this.tblhrmsbudgetdetailssource.settings['hideSubHeader'];
this.tblhrmsbudgetdetailssource.initGrid();
}
showhrmsbudgetdetailsInActive()
{
}
enablehrmsbudgetdetailsInActive()
{
}
async SethrmsbudgetdetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsbudgetdetails){

this.bobranchmasterservice.getbobranchmastersList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsbudgetdetailsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.datahrmsbudgetdetailsbranchid3.push(obj);
}
if((this.tblhrmsbudgetdetailssource.settings as any).columns['branchid'])
{
(this.tblhrmsbudgetdetailssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsbudgetdetailsbranchid3));
this.tblhrmsbudgetdetailssource.initGrid();
}
});

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsbudgetdetailsroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsbudgetdetailsroleid3.push(obj);
}
if((this.tblhrmsbudgetdetailssource.settings as any).columns['roleid'])
{
(this.tblhrmsbudgetdetailssource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsbudgetdetailsroleid3));
this.tblhrmsbudgetdetailssource.initGrid();
}
});
}
this.bfilterPopulatehrmsbudgetdetails=true;
}
async hrmsbudgetdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsbudgetdetailsTableConfig()
{
this.hrmsbudgetdetailssettings = {
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsbudgetdetailsbranchid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsbudgetdetailsroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
m1: {
title: 'M1',
type: 'number',
filter:true,
},
m2: {
title: 'M2',
type: 'number',
filter:true,
},
m3: {
title: 'M3',
type: 'number',
filter:true,
},
m4: {
title: 'M4',
type: 'number',
filter:true,
},
m5: {
title: 'M5',
type: 'number',
filter:true,
},
m6: {
title: 'M6',
type: 'number',
filter:true,
},
m7: {
title: 'M7',
type: 'number',
filter:true,
},
m8: {
title: 'M8',
type: 'number',
filter:true,
},
m9: {
title: 'M9',
type: 'number',
filter:true,
},
m10: {
title: 'M10',
type: 'number',
filter:true,
},
m11: {
title: 'M11',
type: 'number',
filter:true,
},
m12: {
title: 'M12',
type: 'number',
filter:true,
},
},
};
}
hrmsbudgetdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsbudgetdetailsID)>=0)
{
this.hrmsbudgetdetailssource=new LocalDataSource();
this.hrmsbudgetdetailssource.load(this.hrmsbudgetmasterservice.hrmsbudgetdetails as  any as LocalDataSource);
this.hrmsbudgetdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsbudgetdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsbudgetmasterservice.hrmsbudgetdetails.length == 0)
{
    this.tblhrmsbudgetdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsbudgetdetail();
    this.hrmsbudgetmasterservice.hrmsbudgetdetails.push(obj);
    this.hrmsbudgetdetailssource.refresh();
    if ((this.hrmsbudgetmasterservice.hrmsbudgetdetails.length / this.hrmsbudgetdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsbudgetdetailssource.getPaging().page)
    {
        this.hrmsbudgetdetailssource.setPage((this.hrmsbudgetmasterservice.hrmsbudgetdetails.length / this.hrmsbudgetdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsbudgetdetailssource.grid.edit(this.tblhrmsbudgetdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsbudgetdetailssource.data.indexOf(event.data);
this.onDeletehrmsbudgetdetail(event,event.data.detailid,((this.hrmsbudgetdetailssource.getPaging().page-1) *this.hrmsbudgetdetailssource.getPaging().perPage)+index);
this.hrmsbudgetdetailssource.refresh();
break;
}
}

*/
hrmsbudgetdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsbudgetdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsbudgetdetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeletehrmsbudgetdetail(event,event.data.detailid,((this.hrmsbudgetdetailssource.getPaging().page-1) *this.hrmsbudgetdetailssource.getPaging().perPage)+event.index);
this.hrmsbudgetdetailssource.refresh();
break;
}
}
hrmsbudgetdetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsbudgetmasterservice.deletehrmsbudgetmaster(detailid).then(res=>
this.hrmsbudgetdetailsLoadTable()
);
}
}
hrmsbudgetdetailsPaging(val)
{
debugger;
this.hrmsbudgetdetailssource.setPaging(1, val, true);
}

handlehrmsbudgetdetailsGridSelected(event:any) {
this.hrmsbudgetdetailsselectedindex=this.hrmsbudgetmasterservice.hrmsbudgetdetails.findIndex(i => i.detailid === event.data.detailid);
}
IshrmsbudgetdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsbudgetdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsbudgetdetails

}



