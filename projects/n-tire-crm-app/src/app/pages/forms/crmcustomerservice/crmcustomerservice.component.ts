import { crmcustomerserviceService } from './../../../service/crmcustomerservice.service';
import { crmcustomerservice } from './../../../model/crmcustomerservice.model';
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
import { crmcustomermaster} from './../../../model/crmcustomermaster.model';
import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { crmcustomerservicedetail } from './../../../model/crmcustomerservicedetail.model';
import { crmcustomerservicedetailComponent } from './../../../pages/forms/crmcustomerservicedetail/crmcustomerservicedetail.component';
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
selector: 'app-crmcustomerservice',
templateUrl: './crmcustomerservice.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class crmcustomerserviceComponent implements OnInit {
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
bfilterPopulatecrmcustomerservices:boolean=false;
datacrmcustomerservicescustomerid3:any=[];
datacrmcustomerservicesservicetype3:any=[];
datacrmcustomerservicesuserid3:any=[];
bfilterPopulatecrmcustomerservicedetails:boolean=false;
@ViewChild('tblcrmcustomerservicedetailssource',{static:false}) tblcrmcustomerservicedetailssource: Ng2SmartTableComponent;
 crmcustomerserviceForm: FormGroup;
customeridList: crmcustomermaster[];
customeridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
customerid_crmcustomermastersForm: FormGroup;//autocomplete
customerid_crmcustomermastersoptions:any;//autocomplete
customerid_crmcustomermastersformatter:any;//autocomplete
servicetypeList: boconfigvalue[];
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
crmcustomerserviceshowOption:boolean;
crmcustomerservicedetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



crmcustomerservicedetailsvisiblelist:any;
crmcustomerservicedetailshidelist:any;

DeletedcrmcustomerservicedetailIDs: string="";
crmcustomerservicedetailsID: string = "1";
crmcustomerservicedetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private crmcustomerserviceservice: crmcustomerserviceService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private crmcustomermasterservice:crmcustomermasterService,
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
this.crmcustomerserviceForm  = this.fb.group({
pk:[null],
serviceid: [null],
currentdate: [null],
currenttime: [null],
customerid: [null],
customeriddesc: [null],
servicetype: [null],
servicetypedesc: [null],
userid: [null],
useriddesc: [null],
notes: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.crmcustomerserviceForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.crmcustomerserviceForm.dirty && this.crmcustomerserviceForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.serviceid && pkDetail) {
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
let crmcustomerserviceid = null;

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
this.formid=crmcustomerserviceid;
//this.sharedService.alert(crmcustomerserviceid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetcrmcustomerservicedetailsTableConfig();
  setTimeout(() => {
  this.SetcrmcustomerservicedetailsTableddConfig();
  });

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
if(this.crmcustomerserviceservice.formData && this.crmcustomerserviceservice.formData.customerid){
this.customeridoptionsEvent.emit(this.customeridList);
this.crmcustomerserviceForm.patchValue({
    customerid: this.crmcustomerserviceservice.formData.customerid,
    customeriddesc: this.crmcustomerserviceservice.formData.customeriddesc,
});
}
{
let arrcustomerid = this.customeridList.filter(v => v.customerid == this.crmcustomerserviceForm.get('customerid').value);
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
this.configservice.getList("customerservicetype").then(res => this.servicetypeList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.crmcustomerserviceservice.formData && this.crmcustomerserviceservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.crmcustomerserviceForm.patchValue({
    userid: this.crmcustomerserviceservice.formData.userid,
    useriddesc: this.crmcustomerserviceservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.crmcustomerserviceForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.crmcustomerserviceservice.getcrmcustomerservicesList().then(res => {
      this.pkList = res as crmcustomerservice[];
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
this.crmcustomerserviceForm.markAsUntouched();
this.crmcustomerserviceForm.markAsPristine();
}
onSelectedcustomerid(customeridDetail: any) {
if (customeridDetail.customerid && customeridDetail) {
this.crmcustomerserviceForm.patchValue({
customerid: customeridDetail.customerid,
customeriddesc: customeridDetail.lastname,

});

}
}

onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.crmcustomerserviceForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.crmcustomerserviceForm != null)
this.crmcustomerserviceForm.reset();
this.crmcustomerserviceForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
setTimeout(() => {
this.crmcustomerserviceservice.crmcustomerservicedetails=[];
this.crmcustomerservicedetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let serviceid = this.crmcustomerserviceForm.get('serviceid').value;
        if(serviceid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomerserviceservice.deletecrmcustomerservice(serviceid).then(res =>
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
    this.crmcustomerserviceForm.patchValue({
        serviceid: null
    });
    if(this.crmcustomerserviceservice.formData.serviceid!=null)this.crmcustomerserviceservice.formData.serviceid=null;
for (let i=0;i<this.crmcustomerserviceservice.crmcustomerservicedetails.length;i++) {
this.crmcustomerserviceservice.crmcustomerservicedetails[i].detailid=null;
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
        else if(key=="currentdate")
this.crmcustomerserviceForm.patchValue({"currentdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="currenttime")
this.crmcustomerserviceForm.patchValue({"currenttime":new Time(mainscreendata[key]) });
        else if(key=="notes")
this.crmcustomerserviceForm.patchValue({"notes":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.crmcustomerserviceForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.crmcustomerserviceForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.crmcustomerserviceForm.controls[key]!=undefined)
{
this.crmcustomerserviceForm.controls[key].disable({onlySelf: true});
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
serviceidonChange(evt:any){
let e=evt.value;
}
currentdateonChange(evt:any){
let e=evt.value;
}
currenttimeonChange(evt:any){
let e=evt.value;
}
customeridonChange(evt:any){
let e=evt.value;
}
servicetypeonChange(evt:any){
let e=this.f.servicetype.value as any;
this.crmcustomerserviceForm.patchValue({servicetypedesc:evt.options[evt.options.selectedIndex].text});
}
useridonChange(evt:any){
let e=evt.value;
}
notesonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editcrmcustomerservices() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.crmcustomerserviceservice.getcrmcustomerservicesByEID(pkcol).then(res => {

this.crmcustomerserviceservice.formData=res.crmcustomerservice;
let formproperty=res.crmcustomerservice.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.crmcustomerservice.pkcol;
this.formid=res.crmcustomerservice.serviceid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.crmcustomerservice.serviceid;
var currenttimeTime=new Time( res.crmcustomerservice.currenttime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.crmcustomerserviceForm.patchValue({
serviceid: res.crmcustomerservice.serviceid,
currentdate: this.ngbDateParserFormatter.parse(res.crmcustomerservice.currentdate),
currenttime: currenttimeTime,
customerid: res.crmcustomerservice.customerid,
customeriddesc: res.crmcustomerservice.customeriddesc,
servicetype: res.crmcustomerservice.servicetype,
servicetypedesc: res.crmcustomerservice.servicetypedesc,
userid: res.crmcustomerservice.userid,
useriddesc: res.crmcustomerservice.useriddesc,
notes: JSON.parse(res.crmcustomerservice.notes),
status: res.crmcustomerservice.status,
statusdesc: res.crmcustomerservice.statusdesc,
});
this.crmcustomerservicedetailsvisiblelist=res.crmcustomerservicedetailsvisiblelist;
//Child Tables if any
this.crmcustomerserviceservice.crmcustomerservicedetails = res.crmcustomerservicedetails;
this.SetcrmcustomerservicedetailsTableConfig();
this.crmcustomerservicedetailsLoadTable();
  setTimeout(() => {
  this.SetcrmcustomerservicedetailsTableddConfig();
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
  for (let key in this.crmcustomerserviceForm.controls) {
    if (this.crmcustomerserviceForm.controls[key] != null) {
if(false)
{
if(this.crmcustomerserviceservice.formData!=null && this.crmcustomerserviceservice.formData[key]!=null  && this.crmcustomerserviceservice.formData[key]!='[]' && this.crmcustomerserviceservice.formData[key]!=undefined && this.crmcustomerserviceservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.crmcustomerserviceservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.crmcustomerserviceservice.formData!=null && this.crmcustomerserviceservice.formData[key]!=null   && this.crmcustomerserviceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.crmcustomerserviceservice.formData[key]+"></div>");
}
else if(false)
{
if(this.crmcustomerserviceservice.formData!=null && this.crmcustomerserviceservice.formData[key]!=null   && this.crmcustomerserviceservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.crmcustomerserviceservice.formData[key]+"'><div class='progress__number'>"+this.crmcustomerserviceservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.crmcustomerserviceForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.crmcustomerserviceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.crmcustomerserviceForm.value;
obj.currentdate=new Date(this.crmcustomerserviceForm.get('currentdate').value ? this.ngbDateParserFormatter.format(this.crmcustomerserviceForm.get('currentdate').value)+'  UTC' :null);
obj.currenttime=(this.crmcustomerserviceForm.get('currenttime').value==null?0:this.crmcustomerserviceForm.get('currenttime').value.hour)+':'+(this.crmcustomerserviceForm.get('currenttime').value==null?0:this.crmcustomerserviceForm.get('currenttime').value.minute+":00");
obj.notes=JSON.stringify(this.crmcustomerserviceForm.get('notes').value);
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

private crmcustomerservicetoggleOption(){
this.crmcustomerserviceshowOption = this.crmcustomerserviceshowOption === true ? false : true;
}

private crmcustomerservicedetailtoggleOption(){
this.crmcustomerservicedetailshowOption = this.crmcustomerservicedetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.crmcustomerserviceForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.crmcustomerserviceForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.crmcustomerserviceForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.crmcustomerserviceservice.formData=this.crmcustomerserviceForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.crmcustomerserviceForm.controls[key] != null)
    {
        this.crmcustomerserviceservice.formData[key] = this.crmcustomerserviceForm.controls[key].value;
    }
}
}
}
this.crmcustomerserviceservice.formData.currentdate=new Date(this.crmcustomerserviceForm.get('currentdate').value ? this.ngbDateParserFormatter.format(this.crmcustomerserviceForm.get('currentdate').value)+'  UTC' :null);
this.crmcustomerserviceservice.formData.currenttime=(this.crmcustomerserviceForm.get('currenttime').value==null?0:this.crmcustomerserviceForm.get('currenttime').value.hour)+':'+(this.crmcustomerserviceForm.get('currenttime').value==null?0:this.crmcustomerserviceForm.get('currenttime').value.minute+":00");
this.crmcustomerserviceservice.formData.notes=JSON.stringify(this.crmcustomerserviceForm.get('notes').value);
this.crmcustomerserviceservice.formData.DeletedcrmcustomerservicedetailIDs = this.DeletedcrmcustomerservicedetailIDs;
console.log(this.crmcustomerserviceservice.formData);
this.crmcustomerserviceservice.formData=this.crmcustomerserviceForm.value;
this.crmcustomerserviceservice.saveOrUpdatecrmcustomerservices().subscribe(
async res => {
if (this.crmcustomerservicedetailssource.data)
{
    for (let i = 0; i < this.crmcustomerservicedetailssource.data.length; i++)
    {
        if (this.crmcustomerservicedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.crmcustomerservicedetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomerservice);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.crmcustomerserviceservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).crmcustomerservice);
}
else
{
this.FillData(res);
}
}
this.crmcustomerserviceForm.markAsUntouched();
this.crmcustomerserviceForm.markAsPristine();
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
data: {customerid:this.crmcustomerserviceForm.get('customerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.crmcustomerserviceForm.get('userid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcrmcustomerservicedetail(event:any,detailid:any, serviceid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(crmcustomerservicedetailComponent, 
{
data:  {  showview:false,save:false,event,detailid, serviceid,visiblelist:this.crmcustomerservicedetailsvisiblelist,  hidelist:this.crmcustomerservicedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.crmcustomerservicedetailssource.add(res);
this.crmcustomerservicedetailssource.refresh();
}
else
{
this.crmcustomerservicedetailssource.update(event.data, res);
}
}
});
}

onDeletecrmcustomerservicedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedcrmcustomerservicedetailIDs += childID + ",";
this.crmcustomerserviceservice.crmcustomerservicedetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes crmcustomerservicedetails
crmcustomerservicedetailssettings:any;
crmcustomerservicedetailssource: any;

showcrmcustomerservicedetailsCheckbox()
{
debugger;
if(this.tblcrmcustomerservicedetailssource.settings['selectMode']== 'multi')this.tblcrmcustomerservicedetailssource.settings['selectMode']= 'single';
else
this.tblcrmcustomerservicedetailssource.settings['selectMode']= 'multi';
this.tblcrmcustomerservicedetailssource.initGrid();
}
deletecrmcustomerservicedetailsAll()
{
this.tblcrmcustomerservicedetailssource.settings['selectMode'] = 'single';
}
showcrmcustomerservicedetailsFilter()
{
  setTimeout(() => {
  this.SetcrmcustomerservicedetailsTableddConfig();
  });
      if(this.tblcrmcustomerservicedetailssource.settings!=null)this.tblcrmcustomerservicedetailssource.settings['hideSubHeader'] =!this.tblcrmcustomerservicedetailssource.settings['hideSubHeader'];
this.tblcrmcustomerservicedetailssource.initGrid();
}
showcrmcustomerservicedetailsInActive()
{
}
enablecrmcustomerservicedetailsInActive()
{
}
async SetcrmcustomerservicedetailsTableddConfig()
{
if(!this.bfilterPopulatecrmcustomerservicedetails){
}
this.bfilterPopulatecrmcustomerservicedetails=true;
}
async crmcustomerservicedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetcrmcustomerservicedetailsTableConfig()
{
this.crmcustomerservicedetailssettings = {
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
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
},
};
}
crmcustomerservicedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomerservicedetailsID)>=0)
{
this.crmcustomerservicedetailssource=new LocalDataSource();
this.crmcustomerservicedetailssource.load(this.crmcustomerserviceservice.crmcustomerservicedetails as  any as LocalDataSource);
this.crmcustomerservicedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
crmcustomerservicedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.crmcustomerserviceservice.crmcustomerservicedetails.length == 0)
{
    this.tblcrmcustomerservicedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new crmcustomerservicedetail();
    this.crmcustomerserviceservice.crmcustomerservicedetails.push(obj);
    this.crmcustomerservicedetailssource.refresh();
    if ((this.crmcustomerserviceservice.crmcustomerservicedetails.length / this.crmcustomerservicedetailssource.getPaging().perPage).toFixed(0) + 1 != this.crmcustomerservicedetailssource.getPaging().page)
    {
        this.crmcustomerservicedetailssource.setPage((this.crmcustomerserviceservice.crmcustomerservicedetails.length / this.crmcustomerservicedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblcrmcustomerservicedetailssource.grid.edit(this.tblcrmcustomerservicedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.crmcustomerservicedetailssource.data.indexOf(event.data);
this.onDeletecrmcustomerservicedetail(event,event.data.detailid,((this.crmcustomerservicedetailssource.getPaging().page-1) *this.crmcustomerservicedetailssource.getPaging().perPage)+index);
this.crmcustomerservicedetailssource.refresh();
break;
}
}

*/
crmcustomerservicedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditcrmcustomerservicedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditcrmcustomerservicedetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeletecrmcustomerservicedetail(event,event.data.detailid,((this.crmcustomerservicedetailssource.getPaging().page-1) *this.crmcustomerservicedetailssource.getPaging().perPage)+event.index);
this.crmcustomerservicedetailssource.refresh();
break;
}
}
crmcustomerservicedetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.crmcustomerserviceservice.deletecrmcustomerservice(detailid).then(res=>
this.crmcustomerservicedetailsLoadTable()
);
}
}
crmcustomerservicedetailsPaging(val)
{
debugger;
this.crmcustomerservicedetailssource.setPaging(1, val, true);
}

handlecrmcustomerservicedetailsGridSelected(event:any) {
this.crmcustomerservicedetailsselectedindex=this.crmcustomerserviceservice.crmcustomerservicedetails.findIndex(i => i.detailid === event.data.detailid);
}
IscrmcustomerservicedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.crmcustomerservicedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes crmcustomerservicedetails

}



