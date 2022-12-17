import { legalcourtmasterService } from './../../../service/legalcourtmaster.service';
import { legalcourtmaster } from './../../../model/legalcourtmaster.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
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
import { legalcourtbranchmaster } from './../../../model/legalcourtbranchmaster.model';
import { legalcourtbranchmasterComponent } from './../../../pages/forms/legalcourtbranchmaster/legalcourtbranchmaster.component';
//FK services
import { bobranchmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from '../../../../../../n-tire-bo-app/src/app/service/bobranchmaster.service';
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
selector: 'app-legalcourtmaster',
templateUrl: './legalcourtmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class legalcourtmasterComponent implements OnInit {
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
bfilterPopulatelegalcourtmasters:boolean=false;
datalegalcourtmasterscourtcategory3:any=[];
datalegalcourtmastersdistrict3:any=[];
datalegalcourtmasterscountryid3:any=[];
datalegalcourtmastersstateid3:any=[];
datalegalcourtmasterscityid3:any=[];
bfilterPopulatelegalcourtbranchmasters:boolean=false;
@ViewChild('tbllegalcourtbranchmasterssource',{static:false}) tbllegalcourtbranchmasterssource: Ng2SmartTableComponent;
 legalcourtmasterForm: FormGroup;
courtcategoryList: bomasterdata[];
districtList: boconfigvalue[];
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
legalcourtmastershowOption:boolean;
legalcourtbranchmastershowOption:boolean;
sessiondata:any;
sourcekey:any;



legalcourtbranchmastersvisiblelist:any;
legalcourtbranchmastershidelist:any;

DeletedlegalcourtbranchmasterIDs: string="";
legalcourtbranchmastersID: string = "1";
legalcourtbranchmastersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private legalcourtmasterservice: legalcourtmasterService,
private bobranchmasterservice: bobranchmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
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
this.legalcourtmasterForm  = this.fb.group({
pk:[null],
courtid: [null],
courtcategory: [null],
courtcategorydesc: [null],
courtname: [null, Validators.required],
lawyers: [null],
benches: [null],
address1: [null],
address2: [null],
district: [null],
districtdesc: [null],
countryid: [null],
countryiddesc: [null],
stateid: [null],
stateiddesc: [null],
cityid: [null],
cityiddesc: [null],
pin: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.legalcourtmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.legalcourtmasterForm.dirty && this.legalcourtmasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields
courtnameexists(e:any)
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.courtname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
  
  if(pos>=0 && this.pkList[pos].courtid.toString()!=this.formid.toString()) 
  {
    if(confirm("This Court Name value exists in the database.Do you want to display the record ? "))
    {
      this.PopulateScreen(this.pkList[pos].pkcol);
      return true;
    }
    else
    {
      e.stopPropagation();
      e.preventDefault();
      e.target.focus();
      e.target.markAsDirty();
      return false;
    }
  }
  return true;
}

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
  let pos = this.pkList.map(function(e:any) { return e.courtid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.courtid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.courtid && pkDetail) {
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
let legalcourtmasterid = null;

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
this.formid=legalcourtmasterid;
//this.sharedService.alert(legalcourtmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetlegalcourtbranchmastersTableConfig();
  setTimeout(() => {
  this.SetlegalcourtbranchmastersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("jjowt").then(res => {
this.courtcategoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("district").then(res => this.districtList = res as boconfigvalue[]);
this.bocountryservice.getbocountriesList().then(res => 
{
this.countryidList = res as bocountry[];
if(this.legalcourtmasterservice.formData && this.legalcourtmasterservice.formData.countryid){
this.countryidoptionsEvent.emit(this.countryidList);
this.legalcourtmasterForm.patchValue({
    countryid: this.legalcourtmasterservice.formData.countryid,
    countryiddesc: this.legalcourtmasterservice.formData.countryiddesc,
});
}
{
let arrcountryid = this.countryidList.filter(v => v.countryid == this.legalcourtmasterForm.get('countryid').value);
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
if(this.legalcourtmasterservice.formData && this.legalcourtmasterservice.formData.stateid){this.legalcourtmasterForm.patchValue({
    stateid: this.legalcourtmasterservice.formData.stateid,
    stateiddesc: this.legalcourtmasterservice.formData.stateiddesc,
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
if(this.legalcourtmasterservice.formData && this.legalcourtmasterservice.formData.cityid){this.legalcourtmasterForm.patchValue({
    cityid: this.legalcourtmasterservice.formData.cityid,
    cityiddesc: this.legalcourtmasterservice.formData.cityiddesc,
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
    this.legalcourtmasterservice.getlegalcourtmastersList().then(res => {
      this.pkList = res as legalcourtmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.courtname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.courtname;

//setting the flag that the screen is not touched 
this.legalcourtmasterForm.markAsUntouched();
this.legalcourtmasterForm.markAsPristine();
}
onSelectedcountryid(countryidDetail: any) {
if (countryidDetail.countryid && countryidDetail) {
this.legalcourtmasterForm.patchValue({
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
this.legalcourtmasterForm.patchValue({
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
this.legalcourtmasterForm.patchValue({
cityid: cityidDetail.cityid,
cityiddesc: cityidDetail.name,

});

}
}




resetForm() {
if (this.legalcourtmasterForm != null)
this.legalcourtmasterForm.reset();
this.legalcourtmasterForm.patchValue({
});
setTimeout(() => {
this.legalcourtmasterservice.legalcourtbranchmasters=[];
this.legalcourtmasterservice.Insertlegalcourtbranchmasters=[];
this.legalcourtbranchmastersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let courtid = this.legalcourtmasterForm.get('courtid').value;
        if(courtid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.legalcourtmasterservice.deletelegalcourtmaster(courtid).then(res =>
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
    this.legalcourtmasterForm.patchValue({
        courtid: null
    });
    if(this.legalcourtmasterservice.formData.courtid!=null)this.legalcourtmasterservice.formData.courtid=null;
for (let i=0;i<this.legalcourtmasterservice.legalcourtbranchmasters.length;i++) {
this.legalcourtmasterservice.legalcourtbranchmasters[i].courtbranchid=null;
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
this.legalcourtmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.legalcourtmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.legalcourtmasterForm.controls[key]!=undefined)
{
this.legalcourtmasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalcourtmasterservice.formData.courtname!=null )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  || this.legalcourtmasterservice.formData.courtname!=null )
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
courtidonChange(evt:any){
let e=evt.value;
}
courtcategoryonChange(evt:any){
let e=evt.value;
this.legalcourtmasterForm.patchValue({courtcategorydesc:evt.options[evt.options.selectedIndex].text});
}
courtnameonChange(evt:any){
let e=evt.value;
}
lawyersonChange(evt:any){
let e=evt.value;
}
benchesonChange(evt:any){
let e=evt.value;
}
address1onChange(evt:any){
let e=evt.value;
}
address2onChange(evt:any){
let e=evt.value;
}
districtonChange(evt:any){
let e=this.f.district.value as any;
this.legalcourtmasterForm.patchValue({districtdesc:evt.options[evt.options.selectedIndex].text});
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
statusonChange(evt:any){
let e=evt.value;
}

editlegalcourtmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.legalcourtmasterservice.getlegalcourtmastersByEID(pkcol).then(res => {

this.legalcourtmasterservice.formData=res.legalcourtmaster;
let formproperty=res.legalcourtmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.legalcourtmaster.pkcol;
this.formid=res.legalcourtmaster.courtid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.legalcourtmasterservice.formData=res.legalcourtmaster;
this.formid=res.legalcourtmaster.courtid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.legalcourtmasterForm.patchValue({
courtid: res.legalcourtmaster.courtid,
courtcategory: res.legalcourtmaster.courtcategory,
courtcategorydesc: res.legalcourtmaster.courtcategorydesc,
courtname: res.legalcourtmaster.courtname,
lawyers: res.legalcourtmaster.lawyers,
benches: res.legalcourtmaster.benches,
address1: res.legalcourtmaster.address1,
address2: res.legalcourtmaster.address2,
district: res.legalcourtmaster.district,
districtdesc: res.legalcourtmaster.districtdesc,
countryid: res.legalcourtmaster.countryid,
countryiddesc: res.legalcourtmaster.countryiddesc,
stateid: res.legalcourtmaster.stateid,
stateiddesc: res.legalcourtmaster.stateiddesc,
cityid: res.legalcourtmaster.cityid,
cityiddesc: res.legalcourtmaster.cityiddesc,
pin: res.legalcourtmaster.pin,
status: res.legalcourtmaster.status,
statusdesc: res.legalcourtmaster.statusdesc,
});
this.legalcourtbranchmastersvisiblelist=res.legalcourtbranchmastersvisiblelist;
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
this.legalcourtmasterservice.legalcourtbranchmasters = res.legalcourtbranchmasters;
this.SetlegalcourtbranchmastersTableConfig();
this.legalcourtbranchmastersLoadTable();
  setTimeout(() => {
  this.SetlegalcourtbranchmastersTableddConfig();
  });
this.legalcourtmasterservice.Insertlegalcourtbranchmasters=[];
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
  for (let key in this.legalcourtmasterForm.controls) {
    if (this.legalcourtmasterForm.controls[key] != null) {
if(false)
{
if(this.legalcourtmasterservice.formData!=null && this.legalcourtmasterservice.formData[key]!=null  && this.legalcourtmasterservice.formData[key]!='[]' && this.legalcourtmasterservice.formData[key]!=undefined && this.legalcourtmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.legalcourtmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.legalcourtmasterservice.formData!=null && this.legalcourtmasterservice.formData[key]!=null   && this.legalcourtmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.legalcourtmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.legalcourtmasterservice.formData!=null && this.legalcourtmasterservice.formData[key]!=null   && this.legalcourtmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.legalcourtmasterservice.formData[key]+"'><div class='progress__number'>"+this.legalcourtmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.legalcourtmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.legalcourtmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.legalcourtmasterForm.value;
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

private legalcourtmastertoggleOption(){
this.legalcourtmastershowOption = this.legalcourtmastershowOption === true ? false : true;
}

private legalcourtbranchmastertoggleOption(){
this.legalcourtbranchmastershowOption = this.legalcourtbranchmastershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.legalcourtmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.legalcourtmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.legalcourtmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.legalcourtmasterservice.formData=this.legalcourtmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.legalcourtmasterForm.controls[key] != null)
    {
        this.legalcourtmasterservice.formData[key] = this.legalcourtmasterForm.controls[key].value;
    }
}
}
}
this.legalcourtmasterservice.formData.DeletedlegalcourtbranchmasterIDs = this.DeletedlegalcourtbranchmasterIDs;
console.log(this.legalcourtmasterservice.formData);
this.legalcourtmasterservice.formData=this.legalcourtmasterForm.value;
this.legalcourtmasterservice.saveOrUpdatelegalcourtmasters().subscribe(
async res => {
if (this.legalcourtbranchmasterssource.data)
{
    for (let i = 0; i < this.legalcourtbranchmasterssource.data.length; i++)
    {
        if (this.legalcourtbranchmasterssource.data[i].fileattachmentlist)await this.sharedService.upload(this.legalcourtbranchmasterssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcourtmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.legalcourtmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).legalcourtmaster);
}
else
{
this.FillData(res);
}
}
this.legalcourtmasterForm.markAsUntouched();
this.legalcourtmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcourtcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.legalcourtmasterForm.get('courtcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcountryid( countryid) {
/*let ScreenType='2';
this.dialog.open(bocountryComponent, 
{
data: {countryid:this.legalcourtmasterForm.get('countryid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditstateid( stateid) {
/*let ScreenType='2';
this.dialog.open(bostateComponent, 
{
data: {stateid:this.legalcourtmasterForm.get('stateid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcityid( cityid) {
/*let ScreenType='2';
this.dialog.open(bocityComponent, 
{
data: {cityid:this.legalcourtmasterForm.get('cityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes legalcourtbranchmasters
onCustomlegalcourtbranchmastersAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(bobranchmasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
legalcourtbranchmasterssettings:any;
legalcourtbranchmasterssource: any;

showlegalcourtbranchmastersCheckbox()
{
debugger;
if(this.tbllegalcourtbranchmasterssource.settings['selectMode']== 'multi')this.tbllegalcourtbranchmasterssource.settings['selectMode']= 'single';
else
this.tbllegalcourtbranchmasterssource.settings['selectMode']= 'multi';
this.tbllegalcourtbranchmasterssource.initGrid();
}
deletelegalcourtbranchmastersAll()
{
this.tbllegalcourtbranchmasterssource.settings['selectMode'] = 'single';
}
showlegalcourtbranchmastersFilter()
{
  setTimeout(() => {
  this.SetlegalcourtbranchmastersTableddConfig();
  });
      if(this.tbllegalcourtbranchmasterssource.settings!=null)this.tbllegalcourtbranchmasterssource.settings['hideSubHeader'] =!this.tbllegalcourtbranchmasterssource.settings['hideSubHeader'];
this.tbllegalcourtbranchmasterssource.initGrid();
}
showlegalcourtbranchmastersInActive()
{
}
enablelegalcourtbranchmastersInActive()
{
}
async SetlegalcourtbranchmastersTableddConfig()
{
if(!this.bfilterPopulatelegalcourtbranchmasters){
}
this.bfilterPopulatelegalcourtbranchmasters=true;
}
async legalcourtbranchmastersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetlegalcourtbranchmastersTableConfig()
{
this.legalcourtbranchmasterssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
courtbranchid: {
title: 'Court Branch',
type: '',
},
branchid: {
title: 'Branch',
type: '',
},
branchcode: {
title: 'Branchcode',
type: '',
},
branchname: {
title: 'Branchname',
type: '',
},
address1: {
title: 'Address1',
type: '',
},
},
};
}
legalcourtbranchmastersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcourtbranchmastersID)>=0)
{
this.legalcourtbranchmasterssource=new LocalDataSource();
this.legalcourtbranchmasterssource.load(this.legalcourtmasterservice.legalcourtbranchmasters as  any as LocalDataSource);
setTimeout(() => { 
if(this.tbllegalcourtbranchmasterssource!=null)
{this.tbllegalcourtbranchmasterssource.grid.getRows().forEach((row:any) => {
if(row.data.courtbranchid!=null && row.data.courtbranchid!="")
{
this.legalcourtmasterservice.Insertlegalcourtbranchmasters.push(row.data);
this.tbllegalcourtbranchmasterssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
legalcourtbranchmastersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.legalcourtmasterservice.legalcourtbranchmasters.length == 0)
{
    this.tbllegalcourtbranchmasterssource.grid.createFormShown = true;
}
else
{
    let obj = new legalcourtbranchmaster();
    this.legalcourtmasterservice.legalcourtbranchmasters.push(obj);
    this.legalcourtbranchmasterssource.refresh();
    if ((this.legalcourtmasterservice.legalcourtbranchmasters.length / this.legalcourtbranchmasterssource.getPaging().perPage).toFixed(0) + 1 != this.legalcourtbranchmasterssource.getPaging().page)
    {
        this.legalcourtbranchmasterssource.setPage((this.legalcourtmasterservice.legalcourtbranchmasters.length / this.legalcourtbranchmasterssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbllegalcourtbranchmasterssource.grid.edit(this.tbllegalcourtbranchmasterssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.legalcourtbranchmasterssource.data.indexOf(event.data);
this.onDeletelegalcourtbranchmaster(event,event.data.courtbranchid,((this.legalcourtbranchmasterssource.getPaging().page-1) *this.legalcourtbranchmasterssource.getPaging().perPage)+index);
this.legalcourtbranchmasterssource.refresh();
break;
}
}

*/
legalcourtbranchmastersPaging(val)
{
debugger;
this.legalcourtbranchmasterssource.setPaging(1, val, true);
}

handlelegalcourtbranchmastersGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.courtbranchid==null || event.data.courtbranchid=="")
{
var obj={courtid:this.formid,branchid:event.data.branchid}
this.legalcourtmasterservice.Insertlegalcourtbranchmasters.push(obj as any);
}
else
{
var deletedids=this.DeletedlegalcourtbranchmasterIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.courtbranchid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.courtbranchid!=null && event.data.courtbranchid!="")this.DeletedlegalcourtbranchmasterIDs += event.data.courtbranchid + ","; 
}
}
IslegalcourtbranchmastersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.legalcourtbranchmastersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes legalcourtbranchmasters

}



