import { erpphysicalinventorydetailService } from './../../../service/erpphysicalinventorydetail.service';
import { erpphysicalinventorydetail } from './../../../model/erpphysicalinventorydetail.model';
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
import { erpphysicalinventorymaster} from './../../../model/erpphysicalinventorymaster.model';
import { erpphysicalinventorymasterComponent } from './../../../pages/forms/erpphysicalinventorymaster/erpphysicalinventorymaster.component';
import { erpphysicalinventorymasterService } from './../../../service/erpphysicalinventorymaster.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bolocation} from '../../../../../../n-tire-bo-app/src/app/model/bolocation.model';
import { bolocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bolocation/bolocation.component';
import { bolocationService } from '../../../../../../n-tire-bo-app/src/app/service/bolocation.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { erpbinlocationmaster} from './../../../model/erpbinlocationmaster.model';
import { erpbinlocationmasterComponent } from './../../../pages/forms/erpbinlocationmaster/erpbinlocationmaster.component';
import { erpbinlocationmasterService } from './../../../service/erpbinlocationmaster.service';
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
selector: 'app-erpphysicalinventorydetail',
templateUrl: './erpphysicalinventorydetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpphysicalinventorydetailComponent implements OnInit {
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
bfilterPopulateerpphysicalinventorydetails:boolean=false;
dataerpphysicalinventorydetailspiid3:any=[];
dataerpphysicalinventorydetailsbranchid3:any=[];
dataerpphysicalinventorydetailslocationid3:any=[];
dataerpphysicalinventorydetailsitemid3:any=[];
dataerpphysicalinventorydetailsuom3:any=[];
dataerpphysicalinventorydetailsitemcondition3:any=[];
dataerpphysicalinventorydetailsaction3:any=[];
dataerpphysicalinventorydetailsmovelocation3:any=[];
dataerpphysicalinventorydetailsmovebin3:any=[];
 erpphysicalinventorydetailForm: FormGroup;
piidList: erpphysicalinventorymaster[];
piidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
piid_erpphysicalinventorymastersForm: FormGroup;//autocomplete
piid_erpphysicalinventorymastersoptions:any;//autocomplete
piid_erpphysicalinventorymastersformatter:any;//autocomplete
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
locationidList: bolocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bolocationsForm: FormGroup;//autocomplete
locationid_bolocationsoptions:any;//autocomplete
locationid_bolocationsformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
itemconditionList: boconfigvalue[];
actionList: boconfigvalue[];
movelocationList: bolocation[];
movelocationoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
movelocation_bolocationsForm: FormGroup;//autocomplete
movelocation_bolocationsoptions:any;//autocomplete
movelocation_bolocationsformatter:any;//autocomplete
movebinList: erpbinlocationmaster[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpphysicalinventorydetailshowOption:boolean;
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
private erpphysicalinventorydetailservice: erpphysicalinventorydetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpphysicalinventorymasterservice:erpphysicalinventorymasterService,
private bobranchmasterservice:bobranchmasterService,
private bolocationservice:bolocationService,
private erpitemmasterservice:erpitemmasterService,
private erpbinlocationmasterservice:erpbinlocationmasterService,
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
this.erpphysicalinventorydetailForm  = this.fb.group({
pk:[null],
pidetailid: [null],
piid: [null],
piiddesc: [null],
branchid: [null],
branchiddesc: [null],
locationid: [null],
locationiddesc: [null],
itemid: [null],
itemiddesc: [null],
serialbatch: [null],
binid: [null],
stockqty: [null],
uom: [null],
uomdesc: [null],
itemcondition: [null],
itemconditiondesc: [null],
availableqty: [null],
difference: [null],
action: [null],
actiondesc: [null],
movelocation: [null],
movelocationdesc: [null],
movebin: [null],
movebindesc: [null],
remarks: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpphysicalinventorydetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpphysicalinventorydetailForm.dirty && this.erpphysicalinventorydetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.pidetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.pidetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.pidetailid && pkDetail) {
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
let erpphysicalinventorydetailid = null;

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
this.formid=erpphysicalinventorydetailid;
//this.sharedService.alert(erpphysicalinventorydetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpphysicalinventorymasterservice.geterpphysicalinventorymastersList().then(res => 
{
this.piidList = res as erpphysicalinventorymaster[];
if(this.erpphysicalinventorydetailservice.formData && this.erpphysicalinventorydetailservice.formData.piid){
this.piidoptionsEvent.emit(this.piidList);
this.erpphysicalinventorydetailForm.patchValue({
    piid: this.erpphysicalinventorydetailservice.formData.piid,
    piiddesc: this.erpphysicalinventorydetailservice.formData.piiddesc,
});
}
{
let arrpiid = this.piidList.filter(v => v.piid == this.erpphysicalinventorydetailForm.get('piid').value);
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
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erpphysicalinventorydetailservice.formData && this.erpphysicalinventorydetailservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erpphysicalinventorydetailForm.patchValue({
    branchid: this.erpphysicalinventorydetailservice.formData.branchid,
    branchiddesc: this.erpphysicalinventorydetailservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erpphysicalinventorydetailForm.get('branchid').value);
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
this.bolocationservice.getbolocationsList().then(res => 
{
this.locationidList = res as bolocation[];
if(this.erpphysicalinventorydetailservice.formData && this.erpphysicalinventorydetailservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.erpphysicalinventorydetailForm.patchValue({
    locationid: this.erpphysicalinventorydetailservice.formData.locationid,
    locationiddesc: this.erpphysicalinventorydetailservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.erpphysicalinventorydetailForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bolocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bolocationsformatter = (result: any) => result.name;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpphysicalinventorydetailservice.formData && this.erpphysicalinventorydetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpphysicalinventorydetailForm.patchValue({
    itemid: this.erpphysicalinventorydetailservice.formData.itemid,
    itemiddesc: this.erpphysicalinventorydetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpphysicalinventorydetailForm.get('itemid').value);
let objitemid;
if (arritemid.length > 0) objitemid = arritemid[0];
if (objitemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemshortname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemshortname;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.configservice.getList("itemcondition").then(res => this.itemconditionList = res as boconfigvalue[]);
this.configservice.getList("erpphysicalinventorydetail").then(res => this.actionList = res as boconfigvalue[]);
this.bolocationservice.getbolocationsList().then(res => 
{
this.movelocationList = res as bolocation[];
if(this.erpphysicalinventorydetailservice.formData && this.erpphysicalinventorydetailservice.formData.movelocation){
this.movelocationoptionsEvent.emit(this.movelocationList);
this.erpphysicalinventorydetailForm.patchValue({
    movelocation: this.erpphysicalinventorydetailservice.formData.movelocation,
    movelocationdesc: this.erpphysicalinventorydetailservice.formData.movelocationdesc,
});
}
{
let arrmovelocation = this.movelocationList.filter(v => v.locationid == this.erpphysicalinventorydetailForm.get('movelocation').value);
let objmovelocation;
if (arrmovelocation.length > 0) objmovelocation = arrmovelocation[0];
if (objmovelocation)
{
}
}
}
).catch((err) => {console.log(err);});
this.movelocation_bolocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.movelocationList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.movelocation_bolocationsformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.movelocation.value && this.f.movelocation.value!="" && this.f.movelocation.value!=null)this.erpbinlocationmasterservice.getListBylocationid(this.f.movelocation.value).then(res =>{
this.movebinList = res as erpbinlocationmaster[];
if(this.erpphysicalinventorydetailservice.formData && this.erpphysicalinventorydetailservice.formData.movebin){this.erpphysicalinventorydetailForm.patchValue({
    movebin: this.erpphysicalinventorydetailservice.formData.movebin,
    movebindesc: this.erpphysicalinventorydetailservice.formData.movebindesc,
});
}
}).catch((err) => {console.log(err);});
});

//autocomplete
    this.erpphysicalinventorydetailservice.geterpphysicalinventorydetailsList().then(res => {
      this.pkList = res as erpphysicalinventorydetail[];
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
this.erpphysicalinventorydetailForm.markAsUntouched();
this.erpphysicalinventorydetailForm.markAsPristine();
}
onSelectedpiid(piidDetail: any) {
if (piidDetail.piid && piidDetail) {
this.erpphysicalinventorydetailForm.patchValue({
piid: piidDetail.piid,
piiddesc: piidDetail.pireference,

});

}
}

onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erpphysicalinventorydetailForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.erpphysicalinventorydetailForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.name,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpphysicalinventorydetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemshortname,

});

}
}

onSelectedmovelocation(movelocationDetail: any) {
if (movelocationDetail.locationid && movelocationDetail) {
this.erpphysicalinventorydetailForm.patchValue({
movelocation: movelocationDetail.locationid,
movelocationdesc: movelocationDetail.name,

});
this.erpbinlocationmasterservice.getListBylocationid(movelocationDetail.locationid).then(res => {
 this.movebinList = res as erpbinlocationmaster[]
}).catch((err) => {console.log(err);});

}
}




resetForm() {
if (this.erpphysicalinventorydetailForm != null)
this.erpphysicalinventorydetailForm.reset();
this.erpphysicalinventorydetailForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let pidetailid = this.erpphysicalinventorydetailForm.get('pidetailid').value;
        if(pidetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpphysicalinventorydetailservice.deleteerpphysicalinventorydetail(pidetailid).then(res =>
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
    this.erpphysicalinventorydetailForm.patchValue({
        pidetailid: null
    });
    if(this.erpphysicalinventorydetailservice.formData.pidetailid!=null)this.erpphysicalinventorydetailservice.formData.pidetailid=null;
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
this.erpphysicalinventorydetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpphysicalinventorydetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpphysicalinventorydetailForm.controls[key]!=undefined)
{
this.erpphysicalinventorydetailForm.controls[key].disable({onlySelf: true});
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
pidetailidonChange(evt:any){
let e=evt.value;
}
piidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
locationidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
serialbatchonChange(evt:any){
let e=evt.value;
}
binidonChange(evt:any){
let e=evt.value;
}
stockqtyonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpphysicalinventorydetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
itemconditiononChange(evt:any){
let e=this.f.itemcondition.value as any;
this.erpphysicalinventorydetailForm.patchValue({itemconditiondesc:evt.options[evt.options.selectedIndex].text});
}
availableqtyonChange(evt:any){
let e=evt.value;
}
differenceonChange(evt:any){
let e=evt.value;
}
actiononChange(evt:any){
let e=this.f.action.value as any;
this.erpphysicalinventorydetailForm.patchValue({actiondesc:evt.options[evt.options.selectedIndex].text});
}
movelocationonChange(evt:any){
let e=evt.value;
}
movebinonChange(evt:any){
let e=evt.value;
this.erpphysicalinventorydetailForm.patchValue({movebindesc:evt.options[evt.options.selectedIndex].text});
}
remarksonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpphysicalinventorydetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpphysicalinventorydetailservice.geterpphysicalinventorydetailsByEID(pkcol).then(res => {

this.erpphysicalinventorydetailservice.formData=res.erpphysicalinventorydetail;
let formproperty=res.erpphysicalinventorydetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpphysicalinventorydetail.pkcol;
this.formid=res.erpphysicalinventorydetail.pidetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpphysicalinventorydetail.pidetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpphysicalinventorydetailForm.patchValue({
pidetailid: res.erpphysicalinventorydetail.pidetailid,
piid: res.erpphysicalinventorydetail.piid,
piiddesc: res.erpphysicalinventorydetail.piiddesc,
branchid: res.erpphysicalinventorydetail.branchid,
branchiddesc: res.erpphysicalinventorydetail.branchiddesc,
locationid: res.erpphysicalinventorydetail.locationid,
locationiddesc: res.erpphysicalinventorydetail.locationiddesc,
itemid: res.erpphysicalinventorydetail.itemid,
itemiddesc: res.erpphysicalinventorydetail.itemiddesc,
serialbatch: res.erpphysicalinventorydetail.serialbatch,
binid: res.erpphysicalinventorydetail.binid,
stockqty: res.erpphysicalinventorydetail.stockqty,
uom: res.erpphysicalinventorydetail.uom,
uomdesc: res.erpphysicalinventorydetail.uomdesc,
itemcondition: res.erpphysicalinventorydetail.itemcondition,
itemconditiondesc: res.erpphysicalinventorydetail.itemconditiondesc,
availableqty: res.erpphysicalinventorydetail.availableqty,
difference: res.erpphysicalinventorydetail.difference,
action: res.erpphysicalinventorydetail.action,
actiondesc: res.erpphysicalinventorydetail.actiondesc,
movelocation: res.erpphysicalinventorydetail.movelocation,
movelocationdesc: res.erpphysicalinventorydetail.movelocationdesc,
movebin: res.erpphysicalinventorydetail.movebin,
movebindesc: res.erpphysicalinventorydetail.movebindesc,
remarks: res.erpphysicalinventorydetail.remarks,
status: res.erpphysicalinventorydetail.status,
statusdesc: res.erpphysicalinventorydetail.statusdesc,
});
setTimeout(() => {
if(this.f.movelocation.value && this.f.movelocation.value!="" && this.f.movelocation.value!=null)this.erpbinlocationmasterservice.getListBylocationid(this.f.movelocation.value).then(res =>{
this.movebinList = res as erpbinlocationmaster[];
}).catch((err) => {console.log(err);});
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
  for (let key in this.erpphysicalinventorydetailForm.controls) {
    if (this.erpphysicalinventorydetailForm.controls[key] != null) {
if(false)
{
if(this.erpphysicalinventorydetailservice.formData!=null && this.erpphysicalinventorydetailservice.formData[key]!=null  && this.erpphysicalinventorydetailservice.formData[key]!='[]' && this.erpphysicalinventorydetailservice.formData[key]!=undefined && this.erpphysicalinventorydetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpphysicalinventorydetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpphysicalinventorydetailservice.formData!=null && this.erpphysicalinventorydetailservice.formData[key]!=null   && this.erpphysicalinventorydetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpphysicalinventorydetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpphysicalinventorydetailservice.formData!=null && this.erpphysicalinventorydetailservice.formData[key]!=null   && this.erpphysicalinventorydetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpphysicalinventorydetailservice.formData[key]+"'><div class='progress__number'>"+this.erpphysicalinventorydetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpphysicalinventorydetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpphysicalinventorydetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpphysicalinventorydetailForm.value;
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

private erpphysicalinventorydetailtoggleOption(){
this.erpphysicalinventorydetailshowOption = this.erpphysicalinventorydetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpphysicalinventorydetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpphysicalinventorydetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpphysicalinventorydetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpphysicalinventorydetailservice.formData=this.erpphysicalinventorydetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpphysicalinventorydetailForm.controls[key] != null)
    {
        this.erpphysicalinventorydetailservice.formData[key] = this.erpphysicalinventorydetailForm.controls[key].value;
    }
}
}
}
console.log(this.erpphysicalinventorydetailservice.formData);
this.erpphysicalinventorydetailservice.formData=this.erpphysicalinventorydetailForm.value;
this.erpphysicalinventorydetailservice.saveOrUpdateerpphysicalinventorydetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpphysicalinventorydetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpphysicalinventorydetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpphysicalinventorydetail);
}
else
{
this.FillData(res);
}
}
this.erpphysicalinventorydetailForm.markAsUntouched();
this.erpphysicalinventorydetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpiid( piid) {
/*let ScreenType='2';
this.dialog.open(erpphysicalinventorymasterComponent, 
{
data: {piid:this.erpphysicalinventorydetailForm.get('piid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erpphysicalinventorydetailForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bolocationComponent, 
{
data: {locationid:this.erpphysicalinventorydetailForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpphysicalinventorydetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmovelocation( locationid) {
/*let ScreenType='2';
this.dialog.open(bolocationComponent, 
{
data: {locationid:this.erpphysicalinventorydetailForm.get('movelocation').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditmovebin( binid) {
/*let ScreenType='2';
this.dialog.open(erpbinlocationmasterComponent, 
{
data: {binid:this.erpphysicalinventorydetailForm.get('movebin').value, ScreenType:2 }
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



