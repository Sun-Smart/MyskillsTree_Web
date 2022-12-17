import { erplocationmasterService } from './../../../service/erplocationmaster.service';
import { erplocationmaster } from './../../../model/erplocationmaster.model';
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
import currencyToSymbolMap from 'currency-symbol-map/map'
//FK field services
import { bobranchlocation} from '../../../../../../n-tire-bo-app/src/app/model/bobranchlocation.model';
import { bobranchlocationComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component';
import { bobranchlocationService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchlocation.service';
//popups
import { bobranchmaster} from '../../../../../../n-tire-bo-app/src/app/model/bobranchmaster.model';
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
//popups
import { bocountry} from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.component';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
//popups
import { bostate} from '../../../../../../n-tire-bo-app/src/app/model/bostate.model';
import { bostateComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.component';
import { bostateService } from '../../../../../../n-tire-bo-app/src/app/service/bostate.service';
//popups
import { bocity} from '../../../../../../n-tire-bo-app/src/app/model/bocity.model';
import { bocityComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.component';
import { bocityService } from '../../../../../../n-tire-bo-app/src/app/service/bocity.service';
//popups
//detail table services
import { erpbinlocationmaster } from './../../../model/erpbinlocationmaster.model';
import { erpbinlocationmasterComponent } from './../../../pages/forms/erpbinlocationmaster/erpbinlocationmaster.component';
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
selector: 'app-erplocationmaster',
templateUrl: './erplocationmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erplocationmasterComponent implements OnInit {
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
currencyToSymbolMap1:any;
currencyToSymbolMap2:any;
data3:any=[];
bfilterPopulateerplocationmasters:boolean=false;
dataerplocationmasterslocationid3:any=[];
dataerplocationmastersbranchid3:any=[];
dataerplocationmasterslocationtype3:any=[];
dataerplocationmasterscountryid3:any=[];
dataerplocationmastersstateid3:any=[];
dataerplocationmasterscityid3:any=[];
dataerpbinlocationmasterslocationid3:any=[];
bfilterPopulateerpbinlocationmasters:boolean=false;
@ViewChild('tblerpbinlocationmasterssource',{static:false}) tblerpbinlocationmasterssource: Ng2SmartTableComponent;
 erplocationmasterForm: FormGroup;
locationidList: bobranchlocation[];
locationidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
locationid_bobranchlocationsForm: FormGroup;//autocomplete
locationid_bobranchlocationsoptions:any;//autocomplete
locationid_bobranchlocationsformatter:any;//autocomplete
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
locationtypeList: boconfigvalue[];
countryidList: bocountry[];
countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
countryid_bocountriesForm: FormGroup;//autocomplete
countryid_bocountriesoptions:any;//autocomplete
countryid_bocountriesformatter:any;//autocomplete
stateidList: bostate[];
stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
stateid_bostatesForm: FormGroup;//autocomplete
stateid_bostatesoptions:any;//autocomplete
stateid_bostatesformatter:any;//autocomplete
cityidList: bocity[];
cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
cityid_bocitiesForm: FormGroup;//autocomplete
cityid_bocitiesoptions:any;//autocomplete
cityid_bocitiesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erplocationmastershowOption:boolean;
erpbinlocationmastershowOption:boolean;
sessiondata:any;
sourcekey:any;



erpbinlocationmastersvisiblelist:any;
erpbinlocationmastershidelist:any;

DeletederpbinlocationmasterIDs: string="";
erpbinlocationmastersID: string = "1";
erpbinlocationmastersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erplocationmasterservice: erplocationmasterService,
private bobranchlocationservice: bobranchlocationService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
private bocountryservice:bocountryService,
private bostateservice:bostateService,
private bocityservice:bocityService,
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
this.erplocationmasterForm  = this.fb.group({
pk:[null],
locationid: [null],
locationiddesc: [null],
branchid: [null],
branchiddesc: [null],
locationcode: [null],
locationname: [null],
locationtype: [null],
locationtypedesc: [null],
areasqft: [null],
contactname: [null],
designation: [null],
mobile: [null],
email: [null],
address1: [null],
address2: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pin: [null],
latlong: [null],
restrictcurrency: [null],
restrictamount: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erplocationmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erplocationmasterForm.dirty && this.erplocationmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.locationid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.locationid && pkDetail) {
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

this.currencyToSymbolMap2=currencyToSymbolMap;
this.currencyToSymbolMap1=(Object.entries(currencyToSymbolMap));
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
let erplocationmasterid = null;

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
this.formid=erplocationmasterid;
//this.sharedService.alert(erplocationmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpbinlocationmastersTableConfig();
  setTimeout(() => {
  this.SeterpbinlocationmastersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bobranchlocationservice.getbobranchlocationsList().then(res => 
{
this.locationidList = res as bobranchlocation[];
if(this.erplocationmasterservice.formData && this.erplocationmasterservice.formData.locationid){
this.locationidoptionsEvent.emit(this.locationidList);
this.erplocationmasterForm.patchValue({
    locationid: this.erplocationmasterservice.formData.locationid,
    locationiddesc: this.erplocationmasterservice.formData.locationiddesc,
});
}
{
let arrlocationid = this.locationidList.filter(v => v.locationid == this.erplocationmasterForm.get('locationid').value);
let objlocationid;
if (arrlocationid.length > 0) objlocationid = arrlocationid[0];
if (objlocationid)
{
}
}
}
).catch((err) => {console.log(err);});
this.locationid_bobranchlocationsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.locationidList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.locationid_bobranchlocationsformatter = (result: any) => result.locationname;
this.bobranchmasterservice.getbobranchmastersList().then(res => 
{
this.branchidList = res as bobranchmaster[];
if(this.erplocationmasterservice.formData && this.erplocationmasterservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.erplocationmasterForm.patchValue({
    branchid: this.erplocationmasterservice.formData.branchid,
    branchiddesc: this.erplocationmasterservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.erplocationmasterForm.get('branchid').value);
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
this.configservice.getList("locationtype").then(res => this.locationtypeList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.erplocationmasterservice.formData && this.erplocationmasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.erplocationmasterForm.patchValue({
    countryid: this.erplocationmasterservice.formData.countryid,
    countryiddesc: this.erplocationmasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.erplocationmasterForm.get('countryid').value);
let objcountryid;
if (arrcountryid.length > 0) objcountryid = arrcountryid[0];
if (objcountryid)
{
}
}
}
).catch((err) => {console.log(err);});
this.countryid_bocountriesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.countryid_bocountriesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
if(this.erplocationmasterservice.formData && this.erplocationmasterservice.formData.stateid){this.erplocationmasterForm.patchValue({
    stateid: this.erplocationmasterservice.formData.stateid,
    stateiddesc: this.erplocationmasterservice.formData.stateiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.stateid_bostatesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.stateid_bostatesformatter = (result: any) => result.name;
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
if(this.erplocationmasterservice.formData && this.erplocationmasterservice.formData.cityid){this.erplocationmasterForm.patchValue({
    cityid: this.erplocationmasterservice.formData.cityid,
    cityiddesc: this.erplocationmasterservice.formData.cityiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.cityid_bocitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.cityid_bocitiesformatter = (result: any) => result.name;

//autocomplete
    this.erplocationmasterservice.geterplocationmastersList().then(res => {
      this.pkList = res as erplocationmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.locationname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.locationname;

//setting the flag that the screen is not touched 
this.erplocationmasterForm.markAsUntouched();
this.erplocationmasterForm.markAsPristine();
}
onSelectedlocationid(locationidDetail: any) {
if (locationidDetail.locationid && locationidDetail) {
this.erplocationmasterForm.patchValue({
locationid: locationidDetail.locationid,
locationiddesc: locationidDetail.locationname,

});

}
}

onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.erplocationmasterForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}

onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.erplocationmasterForm.patchValue({
countryid: countryidDetail.countryid,
countryiddesc: countryidDetail.name,

});
this.bostateservice.getListBycountryid(countryidDetail.countryid).then(res => {
 this.stateidList = res as bostate[]
}).catch((err) => {console.log(err);});

}
}

onSelectedstateid(stateidDetail: any) {
if (stateidDetail.stateid && stateidDetail) {
this.erplocationmasterForm.patchValue({
stateid: stateidDetail.stateid,
stateiddesc: stateidDetail.name,

});
this.bocityservice.getListBystateid(stateidDetail.stateid).then(res => {
 this.cityidList = res as bocity[]
}).catch((err) => {console.log(err);});

}
}

onSelectedcityid(cityidDetail: any) {
if (cityidDetail.cityid && cityidDetail) {
this.erplocationmasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




resetForm() {
if (this.erplocationmasterForm != null)
this.erplocationmasterForm.reset();
this.erplocationmasterForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
restrictcurrency: this.sessiondata.currency,
});
setTimeout(() => {
this.erplocationmasterservice.erpbinlocationmasters=[];
this.erpbinlocationmastersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let locationid = this.erplocationmasterForm.get('locationid').value;
        if(locationid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erplocationmasterservice.deleteerplocationmaster(locationid).then(res =>
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
    this.erplocationmasterForm.patchValue({
        locationid: null
    });
    if(this.erplocationmasterservice.formData.locationid!=null)this.erplocationmasterservice.formData.locationid=null;
for (let i=0;i<this.erplocationmasterservice.erpbinlocationmasters.length;i++) {
this.erplocationmasterservice.erpbinlocationmasters[i].binid=null;
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
        else if(ctrltype=="string")
{
this.erplocationmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erplocationmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erplocationmasterForm.controls[key]!=undefined)
{
this.erplocationmasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.erplocationmasterservice.formData.locationname!=null )
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
locationidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
locationcodeonChange(evt:any){
let e=evt.value;
}
locationnameonChange(evt:any){
let e=evt.value;
}
locationtypeonChange(evt:any){
let e=this.f.locationtype.value as any;
this.erplocationmasterForm.patchValue({locationtypedesc:evt.options[evt.options.selectedIndex].text});
}
areasqftonChange(evt:any){
let e=evt.value;
}
contactnameonChange(evt:any){
let e=evt.value;
}
designationonChange(evt:any){
let e=evt.value;
}
mobileonChange(evt:any){
let e=evt.value;
}
emailonChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
countryidonChange(evt:any){
let e=evt.value;
}
stateidonChange(evt:any){
let e=evt.value;
}
cityidonChange(evt:any){
let e=evt.value;
}
pinonChange(evt:any){
let e=evt.value;
}
latlongonChange(evt:any){
let e=evt.value;
}
restrictcurrencyonChange(evt:any){
let e=evt.value;
}
restrictamountonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerplocationmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erplocationmasterservice.geterplocationmastersByEID(pkcol).then(res => {

this.erplocationmasterservice.formData=res.erplocationmaster;
let formproperty=res.erplocationmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erplocationmaster.pkcol;
this.formid=res.erplocationmaster.locationid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erplocationmaster.locationid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erplocationmasterForm.patchValue({
locationid: res.erplocationmaster.locationid,
locationiddesc: res.erplocationmaster.locationiddesc,
branchid: res.erplocationmaster.branchid,
branchiddesc: res.erplocationmaster.branchiddesc,
locationcode: res.erplocationmaster.locationcode,
locationname: res.erplocationmaster.locationname,
locationtype: res.erplocationmaster.locationtype,
locationtypedesc: res.erplocationmaster.locationtypedesc,
areasqft: res.erplocationmaster.areasqft,
contactname: res.erplocationmaster.contactname,
designation: res.erplocationmaster.designation,
mobile: res.erplocationmaster.mobile,
email: res.erplocationmaster.email,
address1: res.erplocationmaster.address1,
address2: res.erplocationmaster.address2,
countryid: res.erplocationmaster.countryid,
countryiddesc: res.erplocationmaster.countryiddesc,
stateid: res.erplocationmaster.stateid,
stateiddesc: res.erplocationmaster.stateiddesc,
cityid: res.erplocationmaster.cityid,
cityiddesc: res.erplocationmaster.cityiddesc,
pin: res.erplocationmaster.pin,
latlong: res.erplocationmaster.latlong,
restrictcurrency: res.erplocationmaster.restrictcurrency,
restrictamount: res.erplocationmaster.restrictamount,
status: res.erplocationmaster.status,
statusdesc: res.erplocationmaster.statusdesc,
});
this.erpbinlocationmastersvisiblelist=res.erpbinlocationmastersvisiblelist;
setTimeout(() => {
if(this.f.countryid.value && this.f.countryid.value!="" && this.f.countryid.value!=null)this.bostateservice.getListBycountryid(this.f.countryid.value).then(res =>{
this.stateidList = res as bostate[];
}).catch((err) => {console.log(err);});
});
setTimeout(() => {
if(this.f.stateid.value && this.f.stateid.value!="" && this.f.stateid.value!=null)this.bocityservice.getListBystateid(this.f.stateid.value).then(res =>{
this.cityidList = res as bocity[];
}).catch((err) => {console.log(err);});
});
//Child Tables if any
this.erplocationmasterservice.erpbinlocationmasters = res.erpbinlocationmasters;
this.SeterpbinlocationmastersTableConfig();
this.erpbinlocationmastersLoadTable();
  setTimeout(() => {
  this.SeterpbinlocationmastersTableddConfig();
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
  for (let key in this.erplocationmasterForm.controls) {
    if (this.erplocationmasterForm.controls[key] != null) {
if(false)
{
if(this.erplocationmasterservice.formData!=null && this.erplocationmasterservice.formData[key]!=null  && this.erplocationmasterservice.formData[key]!='[]' && this.erplocationmasterservice.formData[key]!=undefined && this.erplocationmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erplocationmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erplocationmasterservice.formData!=null && this.erplocationmasterservice.formData[key]!=null   && this.erplocationmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erplocationmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erplocationmasterservice.formData!=null && this.erplocationmasterservice.formData[key]!=null   && this.erplocationmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erplocationmasterservice.formData[key]+"'><div class='progress__number'>"+this.erplocationmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erplocationmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erplocationmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erplocationmasterForm.value;
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

private erplocationmastertoggleOption(){
this.erplocationmastershowOption = this.erplocationmastershowOption === true ? false : true;
}

private erpbinlocationmastertoggleOption(){
this.erpbinlocationmastershowOption = this.erpbinlocationmastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erplocationmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erplocationmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erplocationmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erplocationmasterservice.formData=this.erplocationmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erplocationmasterForm.controls[key] != null)
    {
        this.erplocationmasterservice.formData[key] = this.erplocationmasterForm.controls[key].value;
    }
}
}
}
this.erplocationmasterservice.formData.DeletederpbinlocationmasterIDs = this.DeletederpbinlocationmasterIDs;
console.log(this.erplocationmasterservice.formData);
this.erplocationmasterservice.formData=this.erplocationmasterForm.value;
this.erplocationmasterservice.saveOrUpdateerplocationmasters().subscribe(
async res => {
if (this.erpbinlocationmasterssource.data)
{
    for (let i = 0; i < this.erpbinlocationmasterssource.data.length; i++)
    {
        if (this.erpbinlocationmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpbinlocationmasterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erplocationmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erplocationmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erplocationmaster);
}
else
{
this.FillData(res);
}
}
this.erplocationmasterForm.markAsUntouched();
this.erplocationmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditlocationid( locationid) {
/*let ScreenType='2';
this.dialog.open(bobranchlocationComponent, 
{
data: {locationid:this.erplocationmasterForm.get('locationid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditbranchid( branchid) {
/*let ScreenType='2';
this.dialog.open(bobranchmasterComponent, 
{
data: {branchid:this.erplocationmasterForm.get('branchid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.erplocationmasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.erplocationmasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.erplocationmasterForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpbinlocationmaster(event:any,binid:any, locationid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpbinlocationmasterComponent, 
{
data:  {  showview:false,save:false,event,binid, locationid,visiblelist:this.erpbinlocationmastersvisiblelist,  hidelist:this.erpbinlocationmastershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpbinlocationmasterssource.add(res);
this.erpbinlocationmasterssource.refresh();
}
else
{
this.erpbinlocationmasterssource.update(event.data, res);
}
}
});
}

onDeleteerpbinlocationmaster(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpbinlocationmasterIDs += childID + ",";
this.erplocationmasterservice.erpbinlocationmasters.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpbinlocationmasters
erpbinlocationmasterssettings:any;
erpbinlocationmasterssource: any;

showerpbinlocationmastersCheckbox()
{
debugger;
if(this.tblerpbinlocationmasterssource.settings['selectMode']== 'multi')this.tblerpbinlocationmasterssource.settings['selectMode']= 'single';
else
this.tblerpbinlocationmasterssource.settings['selectMode']= 'multi';
this.tblerpbinlocationmasterssource.initGrid();
}
deleteerpbinlocationmastersAll()
{
this.tblerpbinlocationmasterssource.settings['selectMode'] = 'single';
}
showerpbinlocationmastersFilter()
{
  setTimeout(() => {
  this.SeterpbinlocationmastersTableddConfig();
  });
      if(this.tblerpbinlocationmasterssource.settings!=null)this.tblerpbinlocationmasterssource.settings['hideSubHeader'] =!this.tblerpbinlocationmasterssource.settings['hideSubHeader'];
this.tblerpbinlocationmasterssource.initGrid();
}
showerpbinlocationmastersInActive()
{
}
enableerpbinlocationmastersInActive()
{
}
async SeterpbinlocationmastersTableddConfig()
{
if(!this.bfilterPopulateerpbinlocationmasters){
}
this.bfilterPopulateerpbinlocationmasters=true;
}
async erpbinlocationmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpbinlocationmastersTableConfig()
{
this.erpbinlocationmasterssettings = {
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
bincode: {
title: 'Bin Code',
type: '',
filter:true,
},
binname: {
title: 'Bin Name',
type: '',
filter:true,
},
},
};
}
erpbinlocationmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpbinlocationmastersID)>=0)
{
this.erpbinlocationmasterssource=new LocalDataSource();
this.erpbinlocationmasterssource.load(this.erplocationmasterservice.erpbinlocationmasters as  any as LocalDataSource);
this.erpbinlocationmasterssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpbinlocationmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erplocationmasterservice.erpbinlocationmasters.length == 0)
{
    this.tblerpbinlocationmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new erpbinlocationmaster();
    this.erplocationmasterservice.erpbinlocationmasters.push(obj);
    this.erpbinlocationmasterssource.refresh();
    if ((this.erplocationmasterservice.erpbinlocationmasters.length / this.erpbinlocationmasterssource.getPaging().perPage).toFixed(0) + 1 != this.erpbinlocationmasterssource.getPaging().page)
    {
        this.erpbinlocationmasterssource.setPage((this.erplocationmasterservice.erpbinlocationmasters.length / this.erpbinlocationmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpbinlocationmasterssource.grid.edit(this.tblerpbinlocationmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpbinlocationmasterssource.data.indexOf(event.data);
this.onDeleteerpbinlocationmaster(event,event.data.binid,((this.erpbinlocationmasterssource.getPaging().page-1) *this.erpbinlocationmasterssource.getPaging().perPage)+index);
this.erpbinlocationmasterssource.refresh();
break;
}
}

*/
erpbinlocationmastersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpbinlocationmaster(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpbinlocationmaster(event,event.data.binid,this.formid);
break;
case 'delete':
this.onDeleteerpbinlocationmaster(event,event.data.binid,((this.erpbinlocationmasterssource.getPaging().page-1) *this.erpbinlocationmasterssource.getPaging().perPage)+event.index);
this.erpbinlocationmasterssource.refresh();
break;
}
}
erpbinlocationmastersonDelete(obj) {
let binid=obj.data.binid;
if (confirm('Are you sure to delete this record ?')) {
this.erplocationmasterservice.deleteerplocationmaster(binid).then(res=>
this.erpbinlocationmastersLoadTable()
);
}
}
erpbinlocationmastersPaging(val)
{
debugger;
this.erpbinlocationmasterssource.setPaging(1, val, true);
}

handleerpbinlocationmastersGridSelected(event:any) {
this.erpbinlocationmastersselectedindex=this.erplocationmasterservice.erpbinlocationmasters.findIndex(i => i.binid === event.data.binid);
}
IserpbinlocationmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpbinlocationmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpbinlocationmasters

}



