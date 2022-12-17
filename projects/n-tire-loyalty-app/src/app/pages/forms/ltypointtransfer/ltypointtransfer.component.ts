import { ltypointtransferService } from './../../../service/ltypointtransfer.service';
import { ltypointtransfer } from './../../../model/ltypointtransfer.model';
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
selector: 'app-ltypointtransfer',
templateUrl: './ltypointtransfer.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltypointtransferComponent implements OnInit {
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
bfilterPopulateltypointtransfers:boolean=false;
dataltypointtransferscustomerid3:any=[];
dataltypointtransferstransfertype3:any=[];
dataltypointtransfersreason3:any=[];
dataltypointtransfersissuer3:any=[];
dataltypointtransferstransferstatus3:any=[];
 ltypointtransferForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
transfertypeList: boconfigvalue[];
reasonList: boconfigvalue[];
issuerList: bomasterdata[];
transferstatusList: boconfigvalue[];
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
private ltypointtransferservice: ltypointtransferService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.ltypointtransferForm  = this.fb.group({
pk:[null],
transferid: [null],
reference: [null],
customerid: [null],
customeriddesc: [null],
transfertype: [null],
transfertypedesc: [null],
value: [null],
reason: [null],
reasondesc: [null],
comment: [null],
issuer: [null],
issuerdesc: [null],
transferdate: [null],
transferstatus: [null],
transferstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltypointtransferForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltypointtransferForm.dirty && this.ltypointtransferForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.transferid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.transferid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.transferid && pkDetail) {
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
let ltypointtransferid = null;

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
this.formid=ltypointtransferid;
//this.sharedService.alert(ltypointtransferid);

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
if(this.ltypointtransferservice.formData && this.ltypointtransferservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.ltypointtransferForm.patchValue({
    customerid: this.ltypointtransferservice.formData.customerid,
    customeriddesc: this.ltypointtransferservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.ltypointtransferForm.get('customerid').value);
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
this.configservice.getList("pointtransfertype").then(res => this.transfertypeList = res as boconfigvalue[]);
this.configservice.getList("pointstransferreason").then(res => this.reasonList = res as boconfigvalue[]);
this.bomasterdataservice.getList("bk8hf").then(res => {
this.issuerList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("pointtransferstatus").then(res => this.transferstatusList = res as boconfigvalue[]);

//autocomplete
    this.ltypointtransferservice.getltypointtransfersList().then(res => {
      this.pkList = res as ltypointtransfer[];
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
this.ltypointtransferForm.markAsUntouched();
this.ltypointtransferForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.ltypointtransferForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}




resetForm() {
if (this.ltypointtransferForm != null)
this.ltypointtransferForm.reset();
this.ltypointtransferForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let transferid = this.ltypointtransferForm.get('transferid').value;
        if(transferid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltypointtransferservice.deleteltypointtransfer(transferid).then(res =>
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
    this.ltypointtransferForm.patchValue({
        transferid: null
    });
    if(this.ltypointtransferservice.formData.transferid!=null)this.ltypointtransferservice.formData.transferid=null;
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
        else if(key=="comment")
this.ltypointtransferForm.patchValue({"comment":  mainscreendata[key] } );
        else if(key=="transferdate")
this.ltypointtransferForm.patchValue({"transferdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.ltypointtransferForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltypointtransferForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltypointtransferForm.controls[key]!=undefined)this.ltypointtransferForm.controls[key].disable({onlySelf: true});
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
transferidonChange(evt:any){
let e=evt.value;
}
referenceonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
transfertypeonChange(evt:any){
let e=this.f.transfertype.value as any;
this.ltypointtransferForm.patchValue({transfertypedesc:evt.options[evt.options.selectedIndex].text});
}
valueonChange(evt:any){
let e=evt.value;
}
reasononChange(evt:any){
let e=this.f.reason.value as any;
this.ltypointtransferForm.patchValue({reasondesc:evt.options[evt.options.selectedIndex].text});
}
commentonChange(evt:any){
let e=evt.value;
}
issueronChange(evt:any){
let e=evt.value;
this.ltypointtransferForm.patchValue({issuerdesc:evt.options[evt.options.selectedIndex].text});
}
transferdateonChange(evt:any){
let e=evt.value;
}
transferstatusonChange(evt:any){
let e=this.f.transferstatus.value as any;
this.ltypointtransferForm.patchValue({transferstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltypointtransferservice.getltypointtransfersByEID(pkcol).then(res => {

this.ltypointtransferservice.formData=res.ltypointtransfer;
let formproperty=res.ltypointtransfer.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltypointtransfer.pkcol;
this.formid=res.ltypointtransfer.transferid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltypointtransfer.transferid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltypointtransferForm.patchValue({
transferid: res.ltypointtransfer.transferid,
reference: res.ltypointtransfer.reference,
customerid: res.ltypointtransfer.customerid,
customeriddesc: res.ltypointtransfer.customeriddesc,
transfertype: res.ltypointtransfer.transfertype,
transfertypedesc: res.ltypointtransfer.transfertypedesc,
value: res.ltypointtransfer.value,
reason: res.ltypointtransfer.reason,
reasondesc: res.ltypointtransfer.reasondesc,
comment: JSON.parse(res.ltypointtransfer.comment),
issuer: res.ltypointtransfer.issuer,
issuerdesc: res.ltypointtransfer.issuerdesc,
transferdate: this.ngbDateParserFormatter.parse(res.ltypointtransfer.transferdate),
transferstatus: res.ltypointtransfer.transferstatus,
transferstatusdesc: res.ltypointtransfer.transferstatusdesc,
status: res.ltypointtransfer.status,
statusdesc: res.ltypointtransfer.statusdesc,
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
  for (let key in this.ltypointtransferForm.controls) {
    if (this.ltypointtransferForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltypointtransferForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltypointtransferForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltypointtransferForm.value;
obj.comment=JSON.stringify(this.ltypointtransferForm.get('comment').value);
obj.transferdate=new Date(this.ltypointtransferForm.get('transferdate').value ? this.ngbDateParserFormatter.format(this.ltypointtransferForm.get('transferdate').value)+'  UTC' :null);
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
Object.keys(this.ltypointtransferForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltypointtransferForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltypointtransferForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltypointtransferservice.formData=this.ltypointtransferForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltypointtransferForm.controls[key] != null)
    {
        this.ltypointtransferservice.formData[key] = this.ltypointtransferForm.controls[key].value;
    }
}
}
}
this.ltypointtransferservice.formData.comment=JSON.stringify(this.ltypointtransferForm.get('comment').value);
this.ltypointtransferservice.formData.transferdate=new Date(this.ltypointtransferForm.get('transferdate').value ? this.ngbDateParserFormatter.format(this.ltypointtransferForm.get('transferdate').value)+'  UTC' :null);
console.log(this.ltypointtransferservice.formData);
this.ltypointtransferservice.formData=this.ltypointtransferForm.value;
this.ltypointtransferservice.saveOrUpdateltypointtransfers().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltypointtransfer);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltypointtransferservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltypointtransfer);
}
else
{
this.FillData(res);
}
}
this.ltypointtransferForm.markAsUntouched();
this.ltypointtransferForm.markAsPristine();
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
data: {customerid:this.ltypointtransferForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditissuer( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.ltypointtransferForm.get('issuer').value, ScreenType:2 }
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



