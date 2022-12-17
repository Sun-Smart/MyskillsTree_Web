import { erpqcmasterService } from './../../../service/erpqcmaster.service';
import { erpqcmaster } from './../../../model/erpqcmaster.model';
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
import { erpgoodsreceiptmaster} from './../../../model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptmasterComponent } from './../../../pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.component';
import { erpgoodsreceiptmasterService } from './../../../service/erpgoodsreceiptmaster.service';
//popups
//detail table services
import { erpqcdetail } from './../../../model/erpqcdetail.model';
import { erpqcdetailComponent } from './../../../pages/forms/erpqcdetail/erpqcdetail.component';
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

@Component({
selector: 'app-erpqcmaster',
templateUrl: './erpqcmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpqcmasterComponent implements OnInit {
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
bfilterPopulateerpqcmasters:boolean=false;
dataerpqcmastersgrnid3:any=[];
dataerpqcmastersqcid3:any=[];
dataerpqcdetailsqcid3:any=[];
dataerpqcdetailsgrnid3:any=[];
bfilterPopulateerpqcdetails:boolean=false;
@ViewChild('tblerpqcdetailssource',{static:false}) tblerpqcdetailssource: Ng2SmartTableComponent;
 erpqcmasterForm: FormGroup;
grnidList: erpgoodsreceiptmaster[];
grnidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
grnid_erpgoodsreceiptmastersForm: FormGroup;//autocomplete
grnid_erpgoodsreceiptmastersoptions:any;//autocomplete
grnid_erpgoodsreceiptmastersformatter:any;//autocomplete
qcidList: erpqcmaster[];
qcidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
qcid_erpqcmastersForm: FormGroup;//autocomplete
qcid_erpqcmastersoptions:any;//autocomplete
qcid_erpqcmastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpqcmastershowOption:boolean;
erpqcdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpqcdetailsvisiblelist:any;
erpqcdetailshidelist:any;

DeletederpqcdetailIDs: string="";
erpqcdetailsID: string = "1";
erpqcdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpqcmasterservice: erpqcmasterService,
private erpgoodsreceiptmasterservice: erpgoodsreceiptmasterService,
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
this.erpqcmasterForm  = this.fb.group({
pk:[null],
branchid: [null],
grnid: [null],
grniddesc: [null],
grnnumber: [null],
qcid: [null],
qciddesc: [null],
qcref: [null],
qcdate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpqcmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpqcmasterForm.dirty && this.erpqcmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.qcid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.qcid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.qcid && pkDetail) {
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
let erpqcmasterid = null;

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
this.formid=erpqcmasterid;
//this.sharedService.alert(erpqcmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpqcdetailsTableConfig();
  setTimeout(() => {
  this.SeterpqcdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpgoodsreceiptmasterservice.geterpgoodsreceiptmastersList().then(res => 
{
this.grnidList = res as erpgoodsreceiptmaster[];
if(this.erpqcmasterservice.formData && this.erpqcmasterservice.formData.grnid){
this.grnidoptionsEvent.emit(this.grnidList);
this.erpqcmasterForm.patchValue({
    grnid: this.erpqcmasterservice.formData.grnid,
    grniddesc: this.erpqcmasterservice.formData.grniddesc,
});
}
{
let arrgrnid = this.grnidList.filter(v => v.grnid == this.erpqcmasterForm.get('grnid').value);
let objgrnid;
if (arrgrnid.length > 0) objgrnid = arrgrnid[0];
if (objgrnid)
{
}
}
}
).catch((err) => {console.log(err);});
this.grnid_erpgoodsreceiptmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.grnidList.filter(v => v.grnnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.grnid_erpgoodsreceiptmastersformatter = (result: any) => result.grnnumber;
this.erpqcmasterservice.geterpqcmastersList().then(res => 
{
this.qcidList = res as erpqcmaster[];
if(this.erpqcmasterservice.formData && this.erpqcmasterservice.formData.qcid){
this.qcidoptionsEvent.emit(this.qcidList);
this.erpqcmasterForm.patchValue({
    qcid: this.erpqcmasterservice.formData.qcid,
    qciddesc: this.erpqcmasterservice.formData.qciddesc,
});
}
{
let arrqcid = this.qcidList.filter(v => v.qcid == this.erpqcmasterForm.get('qcid').value);
let objqcid;
if (arrqcid.length > 0) objqcid = arrqcid[0];
if (objqcid)
{
}
}
}
).catch((err) => {console.log(err);});
this.qcid_erpqcmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.qcidList.filter(v => v.qcref.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.qcid_erpqcmastersformatter = (result: any) => result.qcref;

//autocomplete
    this.erpqcmasterservice.geterpqcmastersList().then(res => {
      this.pkList = res as erpqcmaster[];
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
this.erpqcmasterForm.markAsUntouched();
this.erpqcmasterForm.markAsPristine();
}
onSelectedgrnid(grnidDetail: any) {
if (grnidDetail.grnid && grnidDetail) {
this.erpqcmasterForm.patchValue({
grnid: grnidDetail.grnid,
grniddesc: grnidDetail.grnnumber,

});

}
}

onSelectedqcid(qcidDetail: any) {
if (qcidDetail.qcid && qcidDetail) {
this.erpqcmasterForm.patchValue({
qcid: qcidDetail.qcid,
qciddesc: qcidDetail.qcref,

});

}
}




resetForm() {
if (this.erpqcmasterForm != null)
this.erpqcmasterForm.reset();
this.erpqcmasterForm.patchValue({
});
setTimeout(() => {
this.erpqcmasterservice.erpqcdetails=[];
this.erpqcdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let qcid = this.erpqcmasterForm.get('qcid').value;
        if(qcid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpqcmasterservice.deleteerpqcmaster(qcid).then(res =>
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
    this.erpqcmasterForm.patchValue({
        qcid: null
    });
    if(this.erpqcmasterservice.formData.qcid!=null)this.erpqcmasterservice.formData.qcid=null;
for (let i=0;i<this.erpqcmasterservice.erpqcdetails.length;i++) {
this.erpqcmasterservice.erpqcdetails[i].qcdetailid=null;
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
        else if(key=="qcdate")
this.erpqcmasterForm.patchValue({"qcdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpqcmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpqcmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpqcmasterForm.controls[key]!=undefined)
{
this.erpqcmasterForm.controls[key].disable({onlySelf: true});
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
grnidonChange(evt:any){
let e=evt.value;
}
grnnumberonChange(evt:any){
let e=evt.value;
}
qcidonChange(evt:any){
let e=evt.value;
}
qcrefonChange(evt:any){
let e=evt.value;
}
qcdateonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpqcmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpqcmasterservice.geterpqcmastersByEID(pkcol).then(res => {

this.erpqcmasterservice.formData=res.erpqcmaster;
let formproperty=res.erpqcmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpqcmaster.pkcol;
this.formid=res.erpqcmaster.qcid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpqcmaster.qcid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpqcmasterForm.patchValue({
branchid: res.erpqcmaster.branchid,
grnid: res.erpqcmaster.grnid,
grniddesc: res.erpqcmaster.grniddesc,
grnnumber: res.erpqcmaster.grnnumber,
qcid: res.erpqcmaster.qcid,
qciddesc: res.erpqcmaster.qciddesc,
qcref: res.erpqcmaster.qcref,
qcdate: this.ngbDateParserFormatter.parse(res.erpqcmaster.qcdate),
status: res.erpqcmaster.status,
statusdesc: res.erpqcmaster.statusdesc,
});
this.erpqcdetailsvisiblelist=res.erpqcdetailsvisiblelist;
//Child Tables if any
this.erpqcmasterservice.erpqcdetails = res.erpqcdetails;
this.SeterpqcdetailsTableConfig();
this.erpqcdetailsLoadTable();
  setTimeout(() => {
  this.SeterpqcdetailsTableddConfig();
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
  for (let key in this.erpqcmasterForm.controls) {
    if (this.erpqcmasterForm.controls[key] != null) {
if(false)
{
if(this.erpqcmasterservice.formData!=null && this.erpqcmasterservice.formData[key]!=null  && this.erpqcmasterservice.formData[key]!='[]' && this.erpqcmasterservice.formData[key]!=undefined && this.erpqcmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpqcmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpqcmasterservice.formData!=null && this.erpqcmasterservice.formData[key]!=null   && this.erpqcmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpqcmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpqcmasterservice.formData!=null && this.erpqcmasterservice.formData[key]!=null   && this.erpqcmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpqcmasterservice.formData[key]+"'><div class='progress__number'>"+this.erpqcmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpqcmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpqcmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpqcmasterForm.value;
obj.qcdate=new Date(this.erpqcmasterForm.get('qcdate').value ? this.ngbDateParserFormatter.format(this.erpqcmasterForm.get('qcdate').value)+'  UTC' :null);
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

private erpqcmastertoggleOption(){
this.erpqcmastershowOption = this.erpqcmastershowOption === true ? false : true;
}

private erpqcdetailtoggleOption(){
this.erpqcdetailshowOption = this.erpqcdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpqcmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpqcmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpqcmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpqcmasterservice.formData=this.erpqcmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpqcmasterForm.controls[key] != null)
    {
        this.erpqcmasterservice.formData[key] = this.erpqcmasterForm.controls[key].value;
    }
}
}
}
this.erpqcmasterservice.formData.qcdate=new Date(this.erpqcmasterForm.get('qcdate').value ? this.ngbDateParserFormatter.format(this.erpqcmasterForm.get('qcdate').value)+'  UTC' :null);
this.erpqcmasterservice.formData.DeletederpqcdetailIDs = this.DeletederpqcdetailIDs;
console.log(this.erpqcmasterservice.formData);
this.erpqcmasterservice.formData=this.erpqcmasterForm.value;
this.erpqcmasterservice.saveOrUpdateerpqcmasters().subscribe(
async res => {
if (this.erpqcdetailssource.data)
{
    for (let i = 0; i < this.erpqcdetailssource.data.length; i++)
    {
        if (this.erpqcdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpqcdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpqcmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpqcmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpqcmaster);
}
else
{
this.FillData(res);
}
}
this.erpqcmasterForm.markAsUntouched();
this.erpqcmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditgrnid( grnid) {
/*let ScreenType='2';
this.dialog.open(erpgoodsreceiptmasterComponent, 
{
data: {grnid:this.erpqcmasterForm.get('grnid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditqcid( qcid) {
/*let ScreenType='2';
this.dialog.open(erpqcmasterComponent, 
{
data: {qcid:this.erpqcmasterForm.get('qcid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpqcdetail(event:any,qcdetailid:any, qcid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpqcdetailComponent, 
{
data:  {  showview:false,save:false,event,qcdetailid, qcid,visiblelist:this.erpqcdetailsvisiblelist,  hidelist:this.erpqcdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpqcdetailssource.add(res);
this.erpqcdetailssource.refresh();
}
else
{
this.erpqcdetailssource.update(event.data, res);
}
}
});
}

onDeleteerpqcdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpqcdetailIDs += childID + ",";
this.erpqcmasterservice.erpqcdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpqcdetails
erpqcdetailssettings:any;
erpqcdetailssource: any;

showerpqcdetailsCheckbox()
{
debugger;
if(this.tblerpqcdetailssource.settings['selectMode']== 'multi')this.tblerpqcdetailssource.settings['selectMode']= 'single';
else
this.tblerpqcdetailssource.settings['selectMode']= 'multi';
this.tblerpqcdetailssource.initGrid();
}
deleteerpqcdetailsAll()
{
this.tblerpqcdetailssource.settings['selectMode'] = 'single';
}
showerpqcdetailsFilter()
{
  setTimeout(() => {
  this.SeterpqcdetailsTableddConfig();
  });
      if(this.tblerpqcdetailssource.settings!=null)this.tblerpqcdetailssource.settings['hideSubHeader'] =!this.tblerpqcdetailssource.settings['hideSubHeader'];
this.tblerpqcdetailssource.initGrid();
}
showerpqcdetailsInActive()
{
}
enableerpqcdetailsInActive()
{
}
async SeterpqcdetailsTableddConfig()
{
if(!this.bfilterPopulateerpqcdetails){
}
this.bfilterPopulateerpqcdetails=true;
}
async erpqcdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpqcdetailsTableConfig()
{
this.erpqcdetailssettings = {
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
grnid: {
title: 'G R N',
type: 'number',
filter:true,
},
grnnumber: {
title: 'G R N Number',
type: 'number',
filter:true,
},
grndetailsid: {
title: 'G R N Details',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: 'number',
filter:true,
},
currentdelivery: {
title: 'Current Delivery',
type: '',
filter:true,
},
qccleared: {
title: 'Q C Cleared',
type: '',
filter:true,
},
qcfailed: {
title: 'Q C Failed',
type: '',
filter:true,
},
},
};
}
erpqcdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpqcdetailsID)>=0)
{
this.erpqcdetailssource=new LocalDataSource();
this.erpqcdetailssource.load(this.erpqcmasterservice.erpqcdetails as  any as LocalDataSource);
this.erpqcdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpqcdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpqcmasterservice.erpqcdetails.length == 0)
{
    this.tblerpqcdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpqcdetail();
    this.erpqcmasterservice.erpqcdetails.push(obj);
    this.erpqcdetailssource.refresh();
    if ((this.erpqcmasterservice.erpqcdetails.length / this.erpqcdetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpqcdetailssource.getPaging().page)
    {
        this.erpqcdetailssource.setPage((this.erpqcmasterservice.erpqcdetails.length / this.erpqcdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpqcdetailssource.grid.edit(this.tblerpqcdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpqcdetailssource.data.indexOf(event.data);
this.onDeleteerpqcdetail(event,event.data.qcdetailid,((this.erpqcdetailssource.getPaging().page-1) *this.erpqcdetailssource.getPaging().perPage)+index);
this.erpqcdetailssource.refresh();
break;
}
}

*/
erpqcdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpqcdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpqcdetail(event,event.data.qcdetailid,this.formid);
break;
case 'delete':
this.onDeleteerpqcdetail(event,event.data.qcdetailid,((this.erpqcdetailssource.getPaging().page-1) *this.erpqcdetailssource.getPaging().perPage)+event.index);
this.erpqcdetailssource.refresh();
break;
}
}
erpqcdetailsonDelete(obj) {
let qcdetailid=obj.data.qcdetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpqcmasterservice.deleteerpqcmaster(qcdetailid).then(res=>
this.erpqcdetailsLoadTable()
);
}
}
erpqcdetailsPaging(val)
{
debugger;
this.erpqcdetailssource.setPaging(1, val, true);
}

handleerpqcdetailsGridSelected(event:any) {
this.erpqcdetailsselectedindex=this.erpqcmasterservice.erpqcdetails.findIndex(i => i.qcdetailid === event.data.qcdetailid);
}
IserpqcdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpqcdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpqcdetails

}



