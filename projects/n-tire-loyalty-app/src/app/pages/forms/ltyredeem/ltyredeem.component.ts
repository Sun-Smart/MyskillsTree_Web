import { ltyredeemService } from './../../../service/ltyredeem.service';
import { ltyredeem } from './../../../model/ltyredeem.model';
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
import { crmcustomermaster} from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
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
selector: 'app-ltyredeem',
templateUrl: './ltyredeem.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltyredeemComponent implements OnInit {
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
bfilterPopulateltyredeems:boolean=false;
dataltyredeemscustomerid3:any=[];
dataltyredeemsredeemtype3:any=[];
dataltyredeemsdeliverystatus3:any=[];
dataltyredeemsusagestatus3:any=[];
 ltyredeemForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
redeemtypeList: boconfigvalue[];
deliverystatusList: boconfigvalue[];
usagestatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
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
private ltyredeemservice: ltyredeemService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.ltyredeemForm  = this.fb.group({
pk:[null],
redeemid: [null],
redeemdate: [null],
customerid: [null],
customeriddesc: [null],
reference: [null],
rewardid: [null],
redeemtype: [null],
redeemtypedesc: [null],
quantity: [null],
redeemed: [null],
usagedate: [null],
deliverystatus: [null],
deliverystatusdesc: [null],
usagestatus: [null],
usagestatusdesc: [null],
sourcefield: [null],
sourcereference: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltyredeemForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltyredeemForm.dirty && this.ltyredeemForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.redeemid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.redeemid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.redeemid && pkDetail) {
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
let ltyredeemid = null;

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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=ltyredeemid;
//this.sharedService.alert(ltyredeemid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.crmcustomermasterservice.getcrmcustomermastersList().then(res => 
{
this.customeridList = res as crmcustomermaster[];
if(this.ltyredeemservice.formData && this.ltyredeemservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.ltyredeemForm.patchValue({
    customerid: this.ltyredeemservice.formData.customerid,
    customeriddesc: this.ltyredeemservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.ltyredeemForm.get('customerid').value);
let objcustomerid;
if (arrcustomerid.length > 0) objcustomerid = arrcustomerid[0];
if (objcustomerid)
{
}
}
}
).catch((err) => {console.log(err);});
this.customerid_crmcustomermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.customeridList.filter(v => v.lastname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.customerid_crmcustomermastersformatter = (result: any) => result.lastname;
this.configservice.getList("redeemtype").then(res => this.redeemtypeList = res as boconfigvalue[]);
this.configservice.getList("deliverystatus").then(res => this.deliverystatusList = res as boconfigvalue[]);
this.configservice.getList("usagestatus").then(res => this.usagestatusList = res as boconfigvalue[]);

//autocomplete
    this.ltyredeemservice.getltyredeemsList().then(res => {
      this.pkList = res as ltyredeem[];
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
this.ltyredeemForm.markAsUntouched();
this.ltyredeemForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.ltyredeemForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.ltyredeemForm != null)
this.ltyredeemForm.reset();
this.ltyredeemForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.ltyredeemForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let redeemid = this.ltyredeemForm.get('redeemid').value;
        if(redeemid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltyredeemservice.deleteltyredeem(redeemid).then(res =>
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
    this.ltyredeemForm.patchValue({
        redeemid: null
    });
    if(this.ltyredeemservice.formData.redeemid!=null)this.ltyredeemservice.formData.redeemid=null;
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
        else if(key=="redeemdate")
this.ltyredeemForm.patchValue({"redeemdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="usagedate")
this.ltyredeemForm.patchValue({"usagedate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.ltyredeemForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltyredeemForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltyredeemForm.controls[key]!=undefined)this.ltyredeemForm.controls[key].disable({onlySelf: true});
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
redeemidonChange(evt:any){
let e=evt.value;
}
redeemdateonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
rewardidonChange(evt:any){
let e=evt.value;
}
redeemtypeonChange(evt:any){
let e=this.f.redeemtype.value as any;
this.ltyredeemForm.patchValue({redeemtypedesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
redeemedonChange(evt:any){
let e=evt.value;
}
usagedateonChange(evt:any){
let e=evt.value;
}
deliverystatusonChange(evt:any){
let e=this.f.deliverystatus.value as any;
this.ltyredeemForm.patchValue({deliverystatusdesc:evt.options[evt.options.selectedIndex].text});
}
usagestatusonChange(evt:any){
let e=this.f.usagestatus.value as any;
this.ltyredeemForm.patchValue({usagestatusdesc:evt.options[evt.options.selectedIndex].text});
}
sourcefieldonChange(evt:any){
let e=evt.value;
}
sourcereferenceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltyredeemservice.getltyredeemsByEID(pkcol).then(res => {

this.ltyredeemservice.formData=res.ltyredeem;
let formproperty=res.ltyredeem.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltyredeem.pkcol;
this.formid=res.ltyredeem.redeemid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltyredeem.redeemid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltyredeemForm.patchValue({
redeemid: res.ltyredeem.redeemid,
redeemdate: this.ngbDateParserFormatter.parse(res.ltyredeem.redeemdate),
customerid: res.ltyredeem.customerid,
customeriddesc: res.ltyredeem.customeriddesc,
reference: res.ltyredeem.reference,
rewardid: res.ltyredeem.rewardid,
redeemtype: res.ltyredeem.redeemtype,
redeemtypedesc: res.ltyredeem.redeemtypedesc,
quantity: res.ltyredeem.quantity,
redeemed: res.ltyredeem.redeemed,
usagedate: this.ngbDateParserFormatter.parse(res.ltyredeem.usagedate),
deliverystatus: res.ltyredeem.deliverystatus,
deliverystatusdesc: res.ltyredeem.deliverystatusdesc,
usagestatus: res.ltyredeem.usagestatus,
usagestatusdesc: res.ltyredeem.usagestatusdesc,
sourcefield: res.ltyredeem.sourcefield,
sourcereference: res.ltyredeem.sourcereference,
status: res.ltyredeem.status,
statusdesc: res.ltyredeem.statusdesc,
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
  for (let key in this.ltyredeemForm.controls) {
    if (this.ltyredeemForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltyredeemForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltyredeemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltyredeemForm.value;
obj.redeemdate=new Date(this.ltyredeemForm.get('redeemdate').value ? this.ngbDateParserFormatter.format(this.ltyredeemForm.get('redeemdate').value)+'  UTC' :null);
obj.usagedate=new Date(this.ltyredeemForm.get('usagedate').value ? this.ngbDateParserFormatter.format(this.ltyredeemForm.get('usagedate').value)+'  UTC' :null);
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

async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.ltyredeemForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltyredeemForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltyredeemForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltyredeemservice.formData=this.ltyredeemForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltyredeemForm.controls[key] != null)
    {
        this.ltyredeemservice.formData[key] = this.ltyredeemForm.controls[key].value;
    }
}
}
}
this.ltyredeemservice.formData.redeemdate=new Date(this.ltyredeemForm.get('redeemdate').value ? this.ngbDateParserFormatter.format(this.ltyredeemForm.get('redeemdate').value)+'  UTC' :null);
this.ltyredeemservice.formData.usagedate=new Date(this.ltyredeemForm.get('usagedate').value ? this.ngbDateParserFormatter.format(this.ltyredeemForm.get('usagedate').value)+'  UTC' :null);
console.log(this.ltyredeemservice.formData);
this.ltyredeemservice.formData=this.ltyredeemForm.value;
this.ltyredeemservice.saveOrUpdateltyredeems().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltyredeem);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltyredeemservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltyredeem);
}
else
{
this.FillData(res);
}
}
this.ltyredeemForm.markAsUntouched();
this.ltyredeemForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcustomerid( customerid) {
/*let ScreenType='2';
this.dialog.open(crmcustomermasterComponent, 
{
data: {customerid:this.ltyredeemForm.get('customerid').value, ScreenType:2 }
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



