import { erpphysicalinventorymasterService } from './../../../service/erpphysicalinventorymaster.service';
import { erpphysicalinventorymaster } from './../../../model/erpphysicalinventorymaster.model';
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
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
//detail table services
import { erpphysicalinventorydetail } from './../../../model/erpphysicalinventorydetail.model';
import { erpphysicalinventorydetailComponent } from './../../../pages/forms/erpphysicalinventorydetail/erpphysicalinventorydetail.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
import { bolocation,IbolocationResponse } from '../../../../../../n-tire-bo-app/src/app/model/bolocation.model';
import { bolocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bolocation/bolocation.component';
import { bolocationService } from '../../../../../../n-tire-bo-app/src/app/service/bolocation.service';
import { erpbinlocationmaster,IerpbinlocationmasterResponse } from './../../../model/erpbinlocationmaster.model';
import { erpbinlocationmasterComponent } from './../../../pages/forms/erpbinlocationmaster/erpbinlocationmaster.component';
import { erpbinlocationmasterService } from './../../../service/erpbinlocationmaster.service';
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
selector: 'app-erpphysicalinventorymaster',
templateUrl: './erpphysicalinventorymaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpphysicalinventorymasterComponent implements OnInit {
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
bfilterPopulateerpphysicalinventorymasters:boolean=false;
dataerpphysicalinventorymastersbranchid3:any=[];
dataerpphysicalinventorymasterspiid3:any=[];
dataerpphysicalinventorydetailsitemid3:any=[];
dataerpphysicalinventorydetailslocationid3:any=[];
dataerpphysicalinventorydetailsbranchid3:any=[];
dataerpphysicalinventorydetailsmovelocation3:any=[];
dataerpphysicalinventorydetailsmovebin3:any=[];
dataerpphysicalinventorydetailsaction3:any=[];
dataerpphysicalinventorydetailsuom3:any=[];
dataerpphysicalinventorydetailspiid3:any=[];
dataerpphysicalinventorydetailsitemcondition3:any=[];
bfilterPopulateerpphysicalinventorydetails:boolean=false;
@ViewChild('tblerpphysicalinventorydetailssource',{static:false}) tblerpphysicalinventorydetailssource: Ng2SmartTableComponent;
 erpphysicalinventorymasterForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
piidList: erpphysicalinventorymaster[];
piidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
piid_erpphysicalinventorymastersForm: FormGroup;//autocomplete
piid_erpphysicalinventorymastersoptions:any;//autocomplete
piid_erpphysicalinventorymastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpphysicalinventorymastershowOption:boolean;
erpphysicalinventorydetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpphysicalinventorydetailsvisiblelist:any;
erpphysicalinventorydetailshidelist:any;

DeletederpphysicalinventorydetailIDs: string="";
erpphysicalinventorydetailsID: string = "1";
erpphysicalinventorydetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpphysicalinventorymasterservice: erpphysicalinventorymasterService,
private erpitemmasterservice: erpitemmasterService,
private bolocationservice: bolocationService,
private bobranchmasterservice: bobranchmasterService,
private erpbinlocationmasterservice: erpbinlocationmasterService,
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
this.erpphysicalinventorymasterForm  = this.fb.group({
pk:[null],
branchid: [null],
branchiddesc: [null],
piid: [null],
piiddesc: [null],
pireference: [null],
pidate: [null],
method: [null],
executedby: [null],
locationid: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpphysicalinventorymasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpphysicalinventorymasterForm.dirty && this.erpphysicalinventorymasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.piid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.piid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.piid && pkDetail) {
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
let erpphysicalinventorymasterid = null;

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
this.formid=erpphysicalinventorymasterid;
//this.sharedService.alert(erpphysicalinventorymasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpphysicalinventorydetailsTableConfig();
  setTimeout(() => {
  this.SeterpphysicalinventorydetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpphysicalinventorymasterservice.formData && this.erpphysicalinventorymasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpphysicalinventorymasterForm.patchValue({
    branchid: this.erpphysicalinventorymasterservice.formData.branchid,
    branchiddesc: this.erpphysicalinventorymasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpphysicalinventorymasterForm.get('branchid').value);
let objbranchid;
if (arrbranchid.length > 0) objbranchid = arrbranchid[0];
if (objbranchid)
{
}
}
}
).catch((err) => {console.log(err);});
this.branchid_bobranchmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.branchidList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.branchid_bobranchmastersformatter = (result: any) => result.branchname;
this.erpphysicalinventorymasterservice.geterpphysicalinventorymastersList().then(res => 
{
this.piidList = res as erpphysicalinventorymaster[];
if(this.erpphysicalinventorymasterservice.formData && this.erpphysicalinventorymasterservice.formData.piid){
this.piidoptionsEvent.emit(this.piidList);
this.erpphysicalinventorymasterForm.patchValue({
    piid: this.erpphysicalinventorymasterservice.formData.piid,
    piiddesc: this.erpphysicalinventorymasterservice.formData.piiddesc,
});
}
{
let arrpiid = this.piidList.filter(v => v.piid == this.erpphysicalinventorymasterForm.get('piid').value);
let objpiid;
if (arrpiid.length > 0) objpiid = arrpiid[0];
if (objpiid)
{
}
}
}
).catch((err) => {console.log(err);});
this.piid_erpphysicalinventorymastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.piidList.filter(v => v.pireference.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.piid_erpphysicalinventorymastersformatter = (result: any) => result.pireference;

//autocomplete
    this.erpphysicalinventorymasterservice.geterpphysicalinventorymastersList().then(res => {
      this.pkList = res as erpphysicalinventorymaster[];
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
this.erpphysicalinventorymasterForm.markAsUntouched();
this.erpphysicalinventorymasterForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpphysicalinventorymasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedpiid(piidDetail: any) {
if (piidDetail.piid && piidDetail) {
this.erpphysicalinventorymasterForm.patchValue({
piid: piidDetail.piid,
piiddesc: piidDetail.pireference,

});

}
}




resetForm() {
if (this.erpphysicalinventorymasterForm != null)
this.erpphysicalinventorymasterForm.reset();
this.erpphysicalinventorymasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
setTimeout(() => {
this.erpphysicalinventorymasterservice.erpphysicalinventorydetails=[];
this.erpphysicalinventorydetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let piid = this.erpphysicalinventorymasterForm.get('piid').value;
        if(piid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpphysicalinventorymasterservice.deleteerpphysicalinventorymaster(piid).then(res =>
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
    this.erpphysicalinventorymasterForm.patchValue({
        piid: null
    });
    if(this.erpphysicalinventorymasterservice.formData.piid!=null)this.erpphysicalinventorymasterservice.formData.piid=null;
for (let i=0;i<this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.length;i++) {
this.erpphysicalinventorymasterservice.erpphysicalinventorydetails[i].pidetailid=null;
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
        else if(key=="pidate")
this.erpphysicalinventorymasterForm.patchValue({"pidate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erpphysicalinventorymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpphysicalinventorymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpphysicalinventorymasterForm.controls[key]!=undefined)
{
this.erpphysicalinventorymasterForm.controls[key].disable({onlySelf: true});
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
piidonChange(evt:any){
let e=evt.value;
}
pireferenceonChange(evt:any){
let e=evt.value;
}
pidateonChange(evt:any){
let e=evt.value;
}
methodonChange(evt:any){
let e=evt.value;
}
executedbyonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpphysicalinventorymasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpphysicalinventorymasterservice.geterpphysicalinventorymastersByEID(pkcol).then(res => {

this.erpphysicalinventorymasterservice.formData=res.erpphysicalinventorymaster;
let formproperty=res.erpphysicalinventorymaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpphysicalinventorymaster.pkcol;
this.formid=res.erpphysicalinventorymaster.piid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpphysicalinventorymaster.piid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpphysicalinventorymasterForm.patchValue({
branchid: res.erpphysicalinventorymaster.branchid,
branchiddesc: res.erpphysicalinventorymaster.branchiddesc,
piid: res.erpphysicalinventorymaster.piid,
piiddesc: res.erpphysicalinventorymaster.piiddesc,
pireference: res.erpphysicalinventorymaster.pireference,
pidate: this.ngbDateParserFormatter.parse(res.erpphysicalinventorymaster.pidate),
method: res.erpphysicalinventorymaster.method,
executedby: res.erpphysicalinventorymaster.executedby,
locationid: res.erpphysicalinventorymaster.locationid,
status: res.erpphysicalinventorymaster.status,
statusdesc: res.erpphysicalinventorymaster.statusdesc,
});
this.erpphysicalinventorydetailsvisiblelist=res.erpphysicalinventorydetailsvisiblelist;
//Child Tables if any
this.erpphysicalinventorymasterservice.erpphysicalinventorydetails = res.erpphysicalinventorydetails;
this.SeterpphysicalinventorydetailsTableConfig();
this.erpphysicalinventorydetailsLoadTable();
  setTimeout(() => {
  this.SeterpphysicalinventorydetailsTableddConfig();
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
  for (let key in this.erpphysicalinventorymasterForm.controls) {
    if (this.erpphysicalinventorymasterForm.controls[key] != null) {
if(false)
{
if(this.erpphysicalinventorymasterservice.formData!=null && this.erpphysicalinventorymasterservice.formData[key]!=null  && this.erpphysicalinventorymasterservice.formData[key]!='[]' && this.erpphysicalinventorymasterservice.formData[key]!=undefined && this.erpphysicalinventorymasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpphysicalinventorymasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpphysicalinventorymasterservice.formData!=null && this.erpphysicalinventorymasterservice.formData[key]!=null   && this.erpphysicalinventorymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpphysicalinventorymasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpphysicalinventorymasterservice.formData!=null && this.erpphysicalinventorymasterservice.formData[key]!=null   && this.erpphysicalinventorymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpphysicalinventorymasterservice.formData[key]+"'><div class='progress__number'>"+this.erpphysicalinventorymasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpphysicalinventorymasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpphysicalinventorymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpphysicalinventorymasterForm.value;
obj.pidate=new Date(this.erpphysicalinventorymasterForm.get('pidate').value ? this.ngbDateParserFormatter.format(this.erpphysicalinventorymasterForm.get('pidate').value)+'  UTC' :null);
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

private erpphysicalinventorymastertoggleOption(){
this.erpphysicalinventorymastershowOption = this.erpphysicalinventorymastershowOption === true ? false : true;
}

private erpphysicalinventorydetailtoggleOption(){
this.erpphysicalinventorydetailshowOption = this.erpphysicalinventorydetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpphysicalinventorymasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpphysicalinventorymasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpphysicalinventorymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpphysicalinventorymasterservice.formData=this.erpphysicalinventorymasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpphysicalinventorymasterForm.controls[key] != null)
    {
        this.erpphysicalinventorymasterservice.formData[key] = this.erpphysicalinventorymasterForm.controls[key].value;
    }
}
}
}
this.erpphysicalinventorymasterservice.formData.pidate=new Date(this.erpphysicalinventorymasterForm.get('pidate').value ? this.ngbDateParserFormatter.format(this.erpphysicalinventorymasterForm.get('pidate').value)+'  UTC' :null);
this.erpphysicalinventorymasterservice.formData.DeletederpphysicalinventorydetailIDs = this.DeletederpphysicalinventorydetailIDs;
console.log(this.erpphysicalinventorymasterservice.formData);
this.erpphysicalinventorymasterservice.formData=this.erpphysicalinventorymasterForm.value;
this.erpphysicalinventorymasterservice.saveOrUpdateerpphysicalinventorymasters().subscribe(
async res => {
if (this.erpphysicalinventorydetailssource.data)
{
    for (let i = 0; i < this.erpphysicalinventorydetailssource.data.length; i++)
    {
        if (this.erpphysicalinventorydetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpphysicalinventorydetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpphysicalinventorymaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpphysicalinventorymasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpphysicalinventorymaster);
}
else
{
this.FillData(res);
}
}
this.erpphysicalinventorymasterForm.markAsUntouched();
this.erpphysicalinventorymasterForm.markAsPristine();
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
data: {branchid:this.erpphysicalinventorymasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditpiid( piid) {
/*let ScreenType='2';
this.dialog.open(erpphysicalinventorymasterComponent, 
{
data: {piid:this.erpphysicalinventorymasterForm.get('piid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpphysicalinventorydetail(event:any,pidetailid:any, piid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpphysicalinventorydetailComponent, 
{
data:  {  showview:false,save:false,event,pidetailid, piid,visiblelist:this.erpphysicalinventorydetailsvisiblelist,  hidelist:this.erpphysicalinventorydetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpphysicalinventorydetailssource.add(res);
this.erpphysicalinventorydetailssource.refresh();
}
else
{
this.erpphysicalinventorydetailssource.update(event.data, res);
}
}
});
}

onDeleteerpphysicalinventorydetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpphysicalinventorydetailIDs += childID + ",";
this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpphysicalinventorydetails
erpphysicalinventorydetailssettings:any;
erpphysicalinventorydetailssource: any;

showerpphysicalinventorydetailsCheckbox()
{
debugger;
if(this.tblerpphysicalinventorydetailssource.settings['selectMode']== 'multi')this.tblerpphysicalinventorydetailssource.settings['selectMode']= 'single';
else
this.tblerpphysicalinventorydetailssource.settings['selectMode']= 'multi';
this.tblerpphysicalinventorydetailssource.initGrid();
}
deleteerpphysicalinventorydetailsAll()
{
this.tblerpphysicalinventorydetailssource.settings['selectMode'] = 'single';
}
showerpphysicalinventorydetailsFilter()
{
  setTimeout(() => {
  this.SeterpphysicalinventorydetailsTableddConfig();
  });
      if(this.tblerpphysicalinventorydetailssource.settings!=null)this.tblerpphysicalinventorydetailssource.settings['hideSubHeader'] =!this.tblerpphysicalinventorydetailssource.settings['hideSubHeader'];
this.tblerpphysicalinventorydetailssource.initGrid();
}
showerpphysicalinventorydetailsInActive()
{
}
enableerpphysicalinventorydetailsInActive()
{
}
async SeterpphysicalinventorydetailsTableddConfig()
{
if(!this.bfilterPopulateerpphysicalinventorydetails){

this.configservice.getList("itemcondition").then(res=>
{
var dataitemcondition2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataerpphysicalinventorydetailsitemcondition3.push(defaultobj);
for(let i=0; i<dataitemcondition2.length; i++){
var obj= { value: dataitemcondition2[i].configkey, title: dataitemcondition2[i].configtext};
this.dataerpphysicalinventorydetailsitemcondition3.push(obj);
}
var clone = this.sharedService.clone(this.tblerpphysicalinventorydetailssource.settings);
if(clone.columns['itemcondition']!=undefined)clone.columns['itemcondition'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpphysicalinventorydetailsitemcondition3)), }, };
if(clone.columns['itemcondition']!=undefined)clone.columns['itemcondition'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataerpphysicalinventorydetailsitemcondition3)), }, };
this.tblerpphysicalinventorydetailssource.settings =  clone;
this.tblerpphysicalinventorydetailssource.initGrid();
});
}
this.bfilterPopulateerpphysicalinventorydetails=true;
}
async erpphysicalinventorydetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpphysicalinventorydetailsTableConfig()
{
this.erpphysicalinventorydetailssettings = {
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
locationid: {
title: 'Location',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
serialbatch: {
title: 'Serial Batch',
type: '',
filter:true,
},
binid: {
title: 'Bin',
type: 'number',
filter:true,
},
stockqty: {
title: 'Stock Qty',
type: '',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
itemcondition: {
title: 'Item Condition',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataerpphysicalinventorydetailsitemcondition3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
availableqty: {
title: 'Available Qty',
type: '',
filter:true,
},
difference: {
title: 'Difference',
type: '',
filter:true,
},
action: {
title: 'Action',
type: '',
filter:true,
},
movelocation: {
title: 'Move Location',
type: 'number',
filter:true,
},
movebin: {
title: 'Move Bin',
type: 'number',
filter:true,
},
remarks: {
title: 'Remarks',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
erpphysicalinventorydetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpphysicalinventorydetailsID)>=0)
{
this.erpphysicalinventorydetailssource=new LocalDataSource();
this.erpphysicalinventorydetailssource.load(this.erpphysicalinventorymasterservice.erpphysicalinventorydetails as  any as LocalDataSource);
this.erpphysicalinventorydetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpphysicalinventorydetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.length == 0)
{
    this.tblerpphysicalinventorydetailssource.grid.createFormShown = true;
}
else
{
    let obj = new erpphysicalinventorydetail();
    this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.push(obj);
    this.erpphysicalinventorydetailssource.refresh();
    if ((this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.length / this.erpphysicalinventorydetailssource.getPaging().perPage).toFixed(0) + 1 != this.erpphysicalinventorydetailssource.getPaging().page)
    {
        this.erpphysicalinventorydetailssource.setPage((this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.length / this.erpphysicalinventorydetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpphysicalinventorydetailssource.grid.edit(this.tblerpphysicalinventorydetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpphysicalinventorydetailssource.data.indexOf(event.data);
this.onDeleteerpphysicalinventorydetail(event,event.data.pidetailid,((this.erpphysicalinventorydetailssource.getPaging().page-1) *this.erpphysicalinventorydetailssource.getPaging().perPage)+index);
this.erpphysicalinventorydetailssource.refresh();
break;
}
}

*/
erpphysicalinventorydetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpphysicalinventorydetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpphysicalinventorydetail(event,event.data.pidetailid,this.formid);
break;
case 'delete':
this.onDeleteerpphysicalinventorydetail(event,event.data.pidetailid,((this.erpphysicalinventorydetailssource.getPaging().page-1) *this.erpphysicalinventorydetailssource.getPaging().perPage)+event.index);
this.erpphysicalinventorydetailssource.refresh();
break;
}
}
erpphysicalinventorydetailsonDelete(obj) {
let pidetailid=obj.data.pidetailid;
if (confirm('Are you sure to delete this record ?')) {
this.erpphysicalinventorymasterservice.deleteerpphysicalinventorymaster(pidetailid).then(res=>
this.erpphysicalinventorydetailsLoadTable()
);
}
}
erpphysicalinventorydetailsPaging(val)
{
debugger;
this.erpphysicalinventorydetailssource.setPaging(1, val, true);
}

handleerpphysicalinventorydetailsGridSelected(event:any) {
this.erpphysicalinventorydetailsselectedindex=this.erpphysicalinventorymasterservice.erpphysicalinventorydetails.findIndex(i => i.pidetailid === event.data.pidetailid);
}
IserpphysicalinventorydetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpphysicalinventorydetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpphysicalinventorydetails

}



