import { hrmstamssettingService } from './../../../service/hrmstamssetting.service';
import { hrmstamssetting } from './../../../model/hrmstamssetting.model';
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
selector: 'app-hrmstamssetting',
templateUrl: './hrmstamssetting.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmstamssettingComponent implements OnInit {
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
bfilterPopulatehrmstamssettings:boolean=false;
datahrmstamssettingsbranchid3:any=[];
datahrmstamssettingsyearstart3:any=[];
datahrmstamssettingsyearend3:any=[];
datahrmstamssettingslatelogic3:any=[];
 hrmstamssettingForm: FormGroup;
branchidList: bobranchmaster[];
branchidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
branchid_bobranchmastersForm: FormGroup;//autocomplete
branchid_bobranchmastersoptions:any;//autocomplete
branchid_bobranchmastersformatter:any;//autocomplete
yearstartList: boconfigvalue[];
yearendList: boconfigvalue[];
latelogicList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmstamssettingshowOption:boolean;
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
private hrmstamssettingservice: hrmstamssettingService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bobranchmasterservice:bobranchmasterService,
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
this.hrmstamssettingForm  = this.fb.group({
pk:[null],
tamsid: [null],
branchid: [null],
branchiddesc: [null],
yearstart: [null],
yearstartdesc: [null],
yearend: [null],
yearenddesc: [null],
exitreader: [null],
entrybiometric: [null],
exitbiometric: [null],
halfdayhours: [null],
fulldayhours: [null],
starttime: [null],
endtime: [null],
lunchfrom: [null],
lunchto: [null],
gracein: [null],
graceout: [null],
permissiblelateinmonth: [null],
permissionduration: [null],
permissionbyapproval: [null],
latelogic: [null],
latelogicdesc: [null],
latecostpermin: [null],
lateexitwaiver: [null],
numberofpermissions: [null],
otduringworkingdays: [null],
otduringholidays: [null],
otbyapproval: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmstamssettingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmstamssettingForm.dirty && this.hrmstamssettingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.tamsid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.tamsid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.tamsid && pkDetail) {
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
let hrmstamssettingid = null;

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
this.formid=hrmstamssettingid;
//this.sharedService.alert(hrmstamssettingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
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
if(this.hrmstamssettingservice.formData && this.hrmstamssettingservice.formData.branchid){
this.branchidoptionsEvent.emit(this.branchidList);
this.hrmstamssettingForm.patchValue({
    branchid: this.hrmstamssettingservice.formData.branchid,
    branchiddesc: this.hrmstamssettingservice.formData.branchiddesc,
});
}
{
let arrbranchid = this.branchidList.filter(v => v.branchid == this.hrmstamssettingForm.get('branchid').value);
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
this.configservice.getList("month").then(res => this.yearstartList = res as boconfigvalue[]);
this.configservice.getList("month").then(res => this.yearendList = res as boconfigvalue[]);
this.configservice.getList("latelogic").then(res => this.latelogicList = res as boconfigvalue[]);

//autocomplete
    this.hrmstamssettingservice.gethrmstamssettingsList().then(res => {
      this.pkList = res as hrmstamssetting[];
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
this.hrmstamssettingForm.markAsUntouched();
this.hrmstamssettingForm.markAsPristine();
}
onSelectedbranchid(branchidDetail: any) {
if (branchidDetail.branchid && branchidDetail) {
this.hrmstamssettingForm.patchValue({
branchid: branchidDetail.branchid,
branchiddesc: branchidDetail.branchname,

});

}
}




resetForm() {
if (this.hrmstamssettingForm != null)
this.hrmstamssettingForm.reset();
this.hrmstamssettingForm.patchValue({
branchid: this.sessiondata.branchid,
branchiddesc: this.sessiondata.branchiddesc,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let tamsid = this.hrmstamssettingForm.get('tamsid').value;
        if(tamsid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmstamssettingservice.deletehrmstamssetting(tamsid).then(res =>
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
    this.hrmstamssettingForm.patchValue({
        tamsid: null
    });
    if(this.hrmstamssettingservice.formData.tamsid!=null)this.hrmstamssettingservice.formData.tamsid=null;
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
        else if(key=="entrybiometric")
this.hrmstamssettingForm.patchValue({"entrybiometric":new Time(mainscreendata[key]) });
        else if(key=="exitbiometric")
this.hrmstamssettingForm.patchValue({"exitbiometric":new Time(mainscreendata[key]) });
        else if(key=="halfdayhours")
this.hrmstamssettingForm.patchValue({"halfdayhours":new Time(mainscreendata[key]) });
        else if(key=="fulldayhours")
this.hrmstamssettingForm.patchValue({"fulldayhours":new Time(mainscreendata[key]) });
        else if(key=="starttime")
this.hrmstamssettingForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="endtime")
this.hrmstamssettingForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(key=="lunchfrom")
this.hrmstamssettingForm.patchValue({"lunchfrom":new Time(mainscreendata[key]) });
        else if(key=="lunchto")
this.hrmstamssettingForm.patchValue({"lunchto":new Time(mainscreendata[key]) });
        else if(key=="gracein")
this.hrmstamssettingForm.patchValue({"gracein":new Time(mainscreendata[key]) });
        else if(key=="graceout")
this.hrmstamssettingForm.patchValue({"graceout":new Time(mainscreendata[key]) });
        else if(key=="permissionduration")
this.hrmstamssettingForm.patchValue({"permissionduration":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmstamssettingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmstamssettingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmstamssettingForm.controls[key]!=undefined)
{
this.hrmstamssettingForm.controls[key].disable({onlySelf: true});
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
tamsidonChange(evt:any){
let e=evt.value;
}
branchidonChange(evt:any){
let e=evt.value;
}
yearstartonChange(evt:any){
let e=this.f.yearstart.value as any;
this.hrmstamssettingForm.patchValue({yearstartdesc:evt.options[evt.options.selectedIndex].text});
}
yearendonChange(evt:any){
let e=this.f.yearend.value as any;
this.hrmstamssettingForm.patchValue({yearenddesc:evt.options[evt.options.selectedIndex].text});
}
exitreaderonChange(evt:any){
let e=evt.value;
}
entrybiometriconChange(evt:any){
let e=evt.value;
}
exitbiometriconChange(evt:any){
let e=evt.value;
}
halfdayhoursonChange(evt:any){
let e=evt.value;
}
fulldayhoursonChange(evt:any){
let e=evt.value;
}
starttimeonChange(evt:any){
let e=evt.value;
}
endtimeonChange(evt:any){
let e=evt.value;
}
lunchfromonChange(evt:any){
let e=evt.value;
}
lunchtoonChange(evt:any){
let e=evt.value;
}
graceinonChange(evt:any){
let e=evt.value;
}
graceoutonChange(evt:any){
let e=evt.value;
}
permissiblelateinmonthonChange(evt:any){
let e=evt.value;
}
permissiondurationonChange(evt:any){
let e=evt.value;
}
permissionbyapprovalonChange(evt:any){
let e=evt.value;
}
latelogiconChange(evt:any){
let e=this.f.latelogic.value as any;
this.hrmstamssettingForm.patchValue({latelogicdesc:evt.options[evt.options.selectedIndex].text});
}
latecostperminonChange(evt:any){
let e=evt.value;
}
lateexitwaiveronChange(evt:any){
let e=evt.value;
}
numberofpermissionsonChange(evt:any){
let e=evt.value;
}
otduringworkingdaysonChange(evt:any){
let e=evt.value;
}
otduringholidaysonChange(evt:any){
let e=evt.value;
}
otbyapprovalonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

edithrmstamssettings() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmstamssettingservice.gethrmstamssettingsByEID(pkcol).then(res => {

this.hrmstamssettingservice.formData=res.hrmstamssetting;
let formproperty=res.hrmstamssetting.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmstamssetting.pkcol;
this.formid=res.hrmstamssetting.tamsid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmstamssetting.tamsid;
var entrybiometricTime=new Time( res.hrmstamssetting.entrybiometric);
var exitbiometricTime=new Time( res.hrmstamssetting.exitbiometric);
var halfdayhoursTime=new Time( res.hrmstamssetting.halfdayhours);
var fulldayhoursTime=new Time( res.hrmstamssetting.fulldayhours);
var starttimeTime=new Time( res.hrmstamssetting.starttime);
var endtimeTime=new Time( res.hrmstamssetting.endtime);
var lunchfromTime=new Time( res.hrmstamssetting.lunchfrom);
var lunchtoTime=new Time( res.hrmstamssetting.lunchto);
var graceinTime=new Time( res.hrmstamssetting.gracein);
var graceoutTime=new Time( res.hrmstamssetting.graceout);
var permissiondurationTime=new Time( res.hrmstamssetting.permissionduration);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmstamssettingForm.patchValue({
tamsid: res.hrmstamssetting.tamsid,
branchid: res.hrmstamssetting.branchid,
branchiddesc: res.hrmstamssetting.branchiddesc,
yearstart: res.hrmstamssetting.yearstart,
yearstartdesc: res.hrmstamssetting.yearstartdesc,
yearend: res.hrmstamssetting.yearend,
yearenddesc: res.hrmstamssetting.yearenddesc,
exitreader: res.hrmstamssetting.exitreader,
entrybiometric: entrybiometricTime,
exitbiometric: exitbiometricTime,
halfdayhours: halfdayhoursTime,
fulldayhours: fulldayhoursTime,
starttime: starttimeTime,
endtime: endtimeTime,
lunchfrom: lunchfromTime,
lunchto: lunchtoTime,
gracein: graceinTime,
graceout: graceoutTime,
permissiblelateinmonth: res.hrmstamssetting.permissiblelateinmonth,
permissionduration: permissiondurationTime,
permissionbyapproval: res.hrmstamssetting.permissionbyapproval,
latelogic: res.hrmstamssetting.latelogic,
latelogicdesc: res.hrmstamssetting.latelogicdesc,
latecostpermin: res.hrmstamssetting.latecostpermin,
lateexitwaiver: res.hrmstamssetting.lateexitwaiver,
numberofpermissions: res.hrmstamssetting.numberofpermissions,
otduringworkingdays: res.hrmstamssetting.otduringworkingdays,
otduringholidays: res.hrmstamssetting.otduringholidays,
otbyapproval: res.hrmstamssetting.otbyapproval,
status: res.hrmstamssetting.status,
statusdesc: res.hrmstamssetting.statusdesc,
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
  for (let key in this.hrmstamssettingForm.controls) {
    if (this.hrmstamssettingForm.controls[key] != null) {
if(false)
{
if(this.hrmstamssettingservice.formData!=null && this.hrmstamssettingservice.formData[key]!=null  && this.hrmstamssettingservice.formData[key]!='[]' && this.hrmstamssettingservice.formData[key]!=undefined && this.hrmstamssettingservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmstamssettingservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmstamssettingservice.formData!=null && this.hrmstamssettingservice.formData[key]!=null   && this.hrmstamssettingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmstamssettingservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmstamssettingservice.formData!=null && this.hrmstamssettingservice.formData[key]!=null   && this.hrmstamssettingservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmstamssettingservice.formData[key]+"'><div class='progress__number'>"+this.hrmstamssettingservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmstamssettingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmstamssettingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmstamssettingForm.value;
obj.entrybiometric=(this.hrmstamssettingForm.get('entrybiometric').value==null?0:this.hrmstamssettingForm.get('entrybiometric').value.hour)+':'+(this.hrmstamssettingForm.get('entrybiometric').value==null?0:this.hrmstamssettingForm.get('entrybiometric').value.minute+":00");
obj.exitbiometric=(this.hrmstamssettingForm.get('exitbiometric').value==null?0:this.hrmstamssettingForm.get('exitbiometric').value.hour)+':'+(this.hrmstamssettingForm.get('exitbiometric').value==null?0:this.hrmstamssettingForm.get('exitbiometric').value.minute+":00");
obj.halfdayhours=(this.hrmstamssettingForm.get('halfdayhours').value==null?0:this.hrmstamssettingForm.get('halfdayhours').value.hour)+':'+(this.hrmstamssettingForm.get('halfdayhours').value==null?0:this.hrmstamssettingForm.get('halfdayhours').value.minute+":00");
obj.fulldayhours=(this.hrmstamssettingForm.get('fulldayhours').value==null?0:this.hrmstamssettingForm.get('fulldayhours').value.hour)+':'+(this.hrmstamssettingForm.get('fulldayhours').value==null?0:this.hrmstamssettingForm.get('fulldayhours').value.minute+":00");
obj.starttime=(this.hrmstamssettingForm.get('starttime').value==null?0:this.hrmstamssettingForm.get('starttime').value.hour)+':'+(this.hrmstamssettingForm.get('starttime').value==null?0:this.hrmstamssettingForm.get('starttime').value.minute+":00");
obj.endtime=(this.hrmstamssettingForm.get('endtime').value==null?0:this.hrmstamssettingForm.get('endtime').value.hour)+':'+(this.hrmstamssettingForm.get('endtime').value==null?0:this.hrmstamssettingForm.get('endtime').value.minute+":00");
obj.lunchfrom=(this.hrmstamssettingForm.get('lunchfrom').value==null?0:this.hrmstamssettingForm.get('lunchfrom').value.hour)+':'+(this.hrmstamssettingForm.get('lunchfrom').value==null?0:this.hrmstamssettingForm.get('lunchfrom').value.minute+":00");
obj.lunchto=(this.hrmstamssettingForm.get('lunchto').value==null?0:this.hrmstamssettingForm.get('lunchto').value.hour)+':'+(this.hrmstamssettingForm.get('lunchto').value==null?0:this.hrmstamssettingForm.get('lunchto').value.minute+":00");
obj.gracein=(this.hrmstamssettingForm.get('gracein').value==null?0:this.hrmstamssettingForm.get('gracein').value.hour)+':'+(this.hrmstamssettingForm.get('gracein').value==null?0:this.hrmstamssettingForm.get('gracein').value.minute+":00");
obj.graceout=(this.hrmstamssettingForm.get('graceout').value==null?0:this.hrmstamssettingForm.get('graceout').value.hour)+':'+(this.hrmstamssettingForm.get('graceout').value==null?0:this.hrmstamssettingForm.get('graceout').value.minute+":00");
obj.permissionduration=(this.hrmstamssettingForm.get('permissionduration').value==null?0:this.hrmstamssettingForm.get('permissionduration').value.hour)+':'+(this.hrmstamssettingForm.get('permissionduration').value==null?0:this.hrmstamssettingForm.get('permissionduration').value.minute+":00");
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

private hrmstamssettingtoggleOption(){
this.hrmstamssettingshowOption = this.hrmstamssettingshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmstamssettingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmstamssettingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmstamssettingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmstamssettingservice.formData=this.hrmstamssettingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmstamssettingForm.controls[key] != null)
    {
        this.hrmstamssettingservice.formData[key] = this.hrmstamssettingForm.controls[key].value;
    }
}
}
}
this.hrmstamssettingservice.formData.entrybiometric=(this.hrmstamssettingForm.get('entrybiometric').value==null?0:this.hrmstamssettingForm.get('entrybiometric').value.hour)+':'+(this.hrmstamssettingForm.get('entrybiometric').value==null?0:this.hrmstamssettingForm.get('entrybiometric').value.minute+":00");
this.hrmstamssettingservice.formData.exitbiometric=(this.hrmstamssettingForm.get('exitbiometric').value==null?0:this.hrmstamssettingForm.get('exitbiometric').value.hour)+':'+(this.hrmstamssettingForm.get('exitbiometric').value==null?0:this.hrmstamssettingForm.get('exitbiometric').value.minute+":00");
this.hrmstamssettingservice.formData.halfdayhours=(this.hrmstamssettingForm.get('halfdayhours').value==null?0:this.hrmstamssettingForm.get('halfdayhours').value.hour)+':'+(this.hrmstamssettingForm.get('halfdayhours').value==null?0:this.hrmstamssettingForm.get('halfdayhours').value.minute+":00");
this.hrmstamssettingservice.formData.fulldayhours=(this.hrmstamssettingForm.get('fulldayhours').value==null?0:this.hrmstamssettingForm.get('fulldayhours').value.hour)+':'+(this.hrmstamssettingForm.get('fulldayhours').value==null?0:this.hrmstamssettingForm.get('fulldayhours').value.minute+":00");
this.hrmstamssettingservice.formData.starttime=(this.hrmstamssettingForm.get('starttime').value==null?0:this.hrmstamssettingForm.get('starttime').value.hour)+':'+(this.hrmstamssettingForm.get('starttime').value==null?0:this.hrmstamssettingForm.get('starttime').value.minute+":00");
this.hrmstamssettingservice.formData.endtime=(this.hrmstamssettingForm.get('endtime').value==null?0:this.hrmstamssettingForm.get('endtime').value.hour)+':'+(this.hrmstamssettingForm.get('endtime').value==null?0:this.hrmstamssettingForm.get('endtime').value.minute+":00");
this.hrmstamssettingservice.formData.lunchfrom=(this.hrmstamssettingForm.get('lunchfrom').value==null?0:this.hrmstamssettingForm.get('lunchfrom').value.hour)+':'+(this.hrmstamssettingForm.get('lunchfrom').value==null?0:this.hrmstamssettingForm.get('lunchfrom').value.minute+":00");
this.hrmstamssettingservice.formData.lunchto=(this.hrmstamssettingForm.get('lunchto').value==null?0:this.hrmstamssettingForm.get('lunchto').value.hour)+':'+(this.hrmstamssettingForm.get('lunchto').value==null?0:this.hrmstamssettingForm.get('lunchto').value.minute+":00");
this.hrmstamssettingservice.formData.gracein=(this.hrmstamssettingForm.get('gracein').value==null?0:this.hrmstamssettingForm.get('gracein').value.hour)+':'+(this.hrmstamssettingForm.get('gracein').value==null?0:this.hrmstamssettingForm.get('gracein').value.minute+":00");
this.hrmstamssettingservice.formData.graceout=(this.hrmstamssettingForm.get('graceout').value==null?0:this.hrmstamssettingForm.get('graceout').value.hour)+':'+(this.hrmstamssettingForm.get('graceout').value==null?0:this.hrmstamssettingForm.get('graceout').value.minute+":00");
this.hrmstamssettingservice.formData.permissionduration=(this.hrmstamssettingForm.get('permissionduration').value==null?0:this.hrmstamssettingForm.get('permissionduration').value.hour)+':'+(this.hrmstamssettingForm.get('permissionduration').value==null?0:this.hrmstamssettingForm.get('permissionduration').value.minute+":00");
console.log(this.hrmstamssettingservice.formData);
this.hrmstamssettingservice.formData=this.hrmstamssettingForm.value;
this.hrmstamssettingservice.saveOrUpdatehrmstamssettings().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmstamssetting);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmstamssettingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmstamssetting);
}
else
{
this.FillData(res);
}
}
this.hrmstamssettingForm.markAsUntouched();
this.hrmstamssettingForm.markAsPristine();
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
data: {branchid:this.hrmstamssettingForm.get('branchid').value, ScreenType:2 }
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



