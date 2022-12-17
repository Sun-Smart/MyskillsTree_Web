import { hrmstrainingmasterService } from './../../../service/hrmstrainingmaster.service';
import { hrmstrainingmaster } from './../../../model/hrmstrainingmaster.model';
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
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
//detail table services
import { hrmstrainingattendance } from './../../../model/hrmstrainingattendance.model';
import { hrmstrainingattendanceComponent } from './../../../pages/forms/hrmstrainingattendance/hrmstrainingattendance.component';
//FK services
import { hrmstraining,IhrmstrainingResponse } from './../../../model/hrmstraining.model';
import { hrmstrainingComponent } from './../../../pages/forms/hrmstraining/hrmstraining.component';
import { hrmstrainingService } from './../../../service/hrmstraining.service';
import { hrmstrainingfeedbacktrainee } from './../../../model/hrmstrainingfeedbacktrainee.model';
import { hrmstrainingfeedbacktraineeComponent } from './../../../pages/forms/hrmstrainingfeedbacktrainee/hrmstrainingfeedbacktrainee.component';
//FK services
import { hrmstrainingfeedbacktrainer } from './../../../model/hrmstrainingfeedbacktrainer.model';
import { hrmstrainingfeedbacktrainerComponent } from './../../../pages/forms/hrmstrainingfeedbacktrainer/hrmstrainingfeedbacktrainer.component';
//FK services
import { hrmstrainingparticipant } from './../../../model/hrmstrainingparticipant.model';
import { hrmstrainingparticipantComponent } from './../../../pages/forms/hrmstrainingparticipant/hrmstrainingparticipant.component';
//FK services
import { hrmstrainingschedule } from './../../../model/hrmstrainingschedule.model';
import { hrmstrainingscheduleComponent } from './../../../pages/forms/hrmstrainingschedule/hrmstrainingschedule.component';
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
selector: 'app-hrmstrainingmaster',
templateUrl: './hrmstrainingmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmstrainingmasterComponent implements OnInit {
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
bfilterPopulatehrmstrainingmasters:boolean=false;
datahrmstrainingmasterstrainingmode3:any=[];
datahrmstrainingmasterscategory3:any=[];
datahrmstrainingattendancestrainingid3:any=[];
bfilterPopulatehrmstrainingattendances:boolean=false;
datahrmstrainingfeedbacktraineestrainingid3:any=[];
bfilterPopulatehrmstrainingfeedbacktrainees:boolean=false;
datahrmstrainingfeedbacktrainerstrainingid3:any=[];
bfilterPopulatehrmstrainingfeedbacktrainers:boolean=false;
datahrmstrainingparticipantstrainingid3:any=[];
bfilterPopulatehrmstrainingparticipants:boolean=false;
datahrmstrainingschedulestrainingid3:any=[];
bfilterPopulatehrmstrainingschedules:boolean=false;
@ViewChild('tblhrmstrainingattendancessource',{static:false}) tblhrmstrainingattendancessource: Ng2SmartTableComponent;
@ViewChild('tblhrmstrainingfeedbacktraineessource',{static:false}) tblhrmstrainingfeedbacktraineessource: Ng2SmartTableComponent;
@ViewChild('tblhrmstrainingfeedbacktrainerssource',{static:false}) tblhrmstrainingfeedbacktrainerssource: Ng2SmartTableComponent;
@ViewChild('tblhrmstrainingparticipantssource',{static:false}) tblhrmstrainingparticipantssource: Ng2SmartTableComponent;
@ViewChild('tblhrmstrainingschedulessource',{static:false}) tblhrmstrainingschedulessource: Ng2SmartTableComponent;
 hrmstrainingmasterForm: FormGroup;
trainingmodeList: boconfigvalue[];
categoryList: bomasterdata[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmstrainingmastershowOption:boolean;
hrmstrainingattendanceshowOption:boolean;
hrmstrainingfeedbacktraineeshowOption:boolean;
hrmstrainingfeedbacktrainershowOption:boolean;
hrmstrainingparticipantshowOption:boolean;
hrmstrainingscheduleshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmstrainingattendancesvisiblelist:any;
hrmstrainingattendanceshidelist:any;
hrmstrainingfeedbacktraineesvisiblelist:any;
hrmstrainingfeedbacktraineeshidelist:any;
hrmstrainingfeedbacktrainersvisiblelist:any;
hrmstrainingfeedbacktrainershidelist:any;
hrmstrainingparticipantsvisiblelist:any;
hrmstrainingparticipantshidelist:any;
hrmstrainingschedulesvisiblelist:any;
hrmstrainingscheduleshidelist:any;

DeletedhrmstrainingattendanceIDs: string="";
hrmstrainingattendancesID: string = "1";
hrmstrainingattendancesselectedindex:any;
DeletedhrmstrainingfeedbacktraineeIDs: string="";
hrmstrainingfeedbacktraineesID: string = "2";
hrmstrainingfeedbacktraineesselectedindex:any;
DeletedhrmstrainingfeedbacktrainerIDs: string="";
hrmstrainingfeedbacktrainersID: string = "3";
hrmstrainingfeedbacktrainersselectedindex:any;
DeletedhrmstrainingparticipantIDs: string="";
hrmstrainingparticipantsID: string = "4";
hrmstrainingparticipantsselectedindex:any;
DeletedhrmstrainingscheduleIDs: string="";
hrmstrainingschedulesID: string = "5";
hrmstrainingschedulesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmstrainingmasterservice: hrmstrainingmasterService,
private hrmstrainingservice: hrmstrainingService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
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
this.hrmstrainingmasterForm  = this.fb.group({
pk:[null],
trainingmasterid: [null],
topic: [null],
trainingmode: [null],
trainingmodedesc: [null],
copyfrom: [null],
category: [null],
categorydesc: [null],
startdate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmstrainingmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmstrainingmasterForm.dirty && this.hrmstrainingmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.trainingmasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.trainingmasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.trainingmasterid && pkDetail) {
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
let hrmstrainingmasterid = null;

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
this.formid=hrmstrainingmasterid;
//this.sharedService.alert(hrmstrainingmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmstrainingattendancesTableConfig();
  setTimeout(() => {
  this.SethrmstrainingattendancesTableddConfig();
  });

this.SethrmstrainingfeedbacktraineesTableConfig();
  setTimeout(() => {
  this.SethrmstrainingfeedbacktraineesTableddConfig();
  });

this.SethrmstrainingfeedbacktrainersTableConfig();
  setTimeout(() => {
  this.SethrmstrainingfeedbacktrainersTableddConfig();
  });

this.SethrmstrainingparticipantsTableConfig();
  setTimeout(() => {
  this.SethrmstrainingparticipantsTableddConfig();
  });

this.SethrmstrainingschedulesTableConfig();
  setTimeout(() => {
  this.SethrmstrainingschedulesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("trainingmode").then(res => this.trainingmodeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("").then(res => {
this.categoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});

//autocomplete
    this.hrmstrainingmasterservice.gethrmstrainingmastersList().then(res => {
      this.pkList = res as hrmstrainingmaster[];
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
this.hrmstrainingmasterForm.markAsUntouched();
this.hrmstrainingmasterForm.markAsPristine();
}



resetForm() {
if (this.hrmstrainingmasterForm != null)
this.hrmstrainingmasterForm.reset();
this.hrmstrainingmasterForm.patchValue({
});
setTimeout(() => {
this.hrmstrainingmasterservice.hrmstrainingattendances=[];
this.hrmstrainingattendancesLoadTable();
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees=[];
this.hrmstrainingfeedbacktraineesLoadTable();
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers=[];
this.hrmstrainingfeedbacktrainersLoadTable();
this.hrmstrainingmasterservice.hrmstrainingparticipants=[];
this.hrmstrainingparticipantsLoadTable();
this.hrmstrainingmasterservice.hrmstrainingschedules=[];
this.hrmstrainingschedulesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let trainingmasterid = this.hrmstrainingmasterForm.get('trainingmasterid').value;
        if(trainingmasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmstrainingmasterservice.deletehrmstrainingmaster(trainingmasterid).then(res =>
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
    this.hrmstrainingmasterForm.patchValue({
        trainingmasterid: null
    });
    if(this.hrmstrainingmasterservice.formData.trainingmasterid!=null)this.hrmstrainingmasterservice.formData.trainingmasterid=null;
for (let i=0;i<this.hrmstrainingmasterservice.hrmstrainingattendances.length;i++) {
this.hrmstrainingmasterservice.hrmstrainingattendances[i].attendanceid=null;
}
for (let i=0;i<this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.length;i++) {
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees[i].traineefeedbackid=null;
}
for (let i=0;i<this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.length;i++) {
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers[i].trainerfeedbackid=null;
}
for (let i=0;i<this.hrmstrainingmasterservice.hrmstrainingparticipants.length;i++) {
this.hrmstrainingmasterservice.hrmstrainingparticipants[i].participantid=null;
}
for (let i=0;i<this.hrmstrainingmasterservice.hrmstrainingschedules.length;i++) {
this.hrmstrainingmasterservice.hrmstrainingschedules[i].scheduleid=null;
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
        else if(key=="startdate")
this.hrmstrainingmasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmstrainingmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmstrainingmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmstrainingmasterForm.controls[key]!=undefined)
{
this.hrmstrainingmasterForm.controls[key].disable({onlySelf: true});
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
trainingmodeonChange(evt:any){
let e=this.f.trainingmode.value as any;
this.hrmstrainingmasterForm.patchValue({trainingmodedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=evt.value;
this.hrmstrainingmasterForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}

edithrmstrainingmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmstrainingmasterservice.gethrmstrainingmastersByEID(pkcol).then(res => {

this.hrmstrainingmasterservice.formData=res.hrmstrainingmaster;
let formproperty=res.hrmstrainingmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmstrainingmaster.pkcol;
this.formid=res.hrmstrainingmaster.trainingmasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmstrainingmaster.trainingmasterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmstrainingmasterForm.patchValue({
trainingmasterid: res.hrmstrainingmaster.trainingmasterid,
topic: res.hrmstrainingmaster.topic,
trainingmode: res.hrmstrainingmaster.trainingmode,
trainingmodedesc: res.hrmstrainingmaster.trainingmodedesc,
copyfrom: res.hrmstrainingmaster.copyfrom,
category: res.hrmstrainingmaster.category,
categorydesc: res.hrmstrainingmaster.categorydesc,
startdate: this.ngbDateParserFormatter.parse(res.hrmstrainingmaster.startdate),
status: res.hrmstrainingmaster.status,
statusdesc: res.hrmstrainingmaster.statusdesc,
});
this.hrmstrainingattendancesvisiblelist=res.hrmstrainingattendancesvisiblelist;
this.hrmstrainingfeedbacktraineesvisiblelist=res.hrmstrainingfeedbacktraineesvisiblelist;
this.hrmstrainingfeedbacktrainersvisiblelist=res.hrmstrainingfeedbacktrainersvisiblelist;
this.hrmstrainingparticipantsvisiblelist=res.hrmstrainingparticipantsvisiblelist;
this.hrmstrainingschedulesvisiblelist=res.hrmstrainingschedulesvisiblelist;
//Child Tables if any
this.hrmstrainingmasterservice.hrmstrainingattendances = res.hrmstrainingattendances;
this.SethrmstrainingattendancesTableConfig();
this.hrmstrainingattendancesLoadTable();
  setTimeout(() => {
  this.SethrmstrainingattendancesTableddConfig();
  });
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees = res.hrmstrainingfeedbacktrainees;
this.SethrmstrainingfeedbacktraineesTableConfig();
this.hrmstrainingfeedbacktraineesLoadTable();
  setTimeout(() => {
  this.SethrmstrainingfeedbacktraineesTableddConfig();
  });
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers = res.hrmstrainingfeedbacktrainers;
this.SethrmstrainingfeedbacktrainersTableConfig();
this.hrmstrainingfeedbacktrainersLoadTable();
  setTimeout(() => {
  this.SethrmstrainingfeedbacktrainersTableddConfig();
  });
this.hrmstrainingmasterservice.hrmstrainingparticipants = res.hrmstrainingparticipants;
this.SethrmstrainingparticipantsTableConfig();
this.hrmstrainingparticipantsLoadTable();
  setTimeout(() => {
  this.SethrmstrainingparticipantsTableddConfig();
  });
this.hrmstrainingmasterservice.hrmstrainingschedules = res.hrmstrainingschedules;
this.SethrmstrainingschedulesTableConfig();
this.hrmstrainingschedulesLoadTable();
  setTimeout(() => {
  this.SethrmstrainingschedulesTableddConfig();
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
  for (let key in this.hrmstrainingmasterForm.controls) {
    if (this.hrmstrainingmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmstrainingmasterservice.formData!=null && this.hrmstrainingmasterservice.formData[key]!=null  && this.hrmstrainingmasterservice.formData[key]!='[]' && this.hrmstrainingmasterservice.formData[key]!=undefined && this.hrmstrainingmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmstrainingmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmstrainingmasterservice.formData!=null && this.hrmstrainingmasterservice.formData[key]!=null   && this.hrmstrainingmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmstrainingmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmstrainingmasterservice.formData!=null && this.hrmstrainingmasterservice.formData[key]!=null   && this.hrmstrainingmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmstrainingmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmstrainingmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmstrainingmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmstrainingmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmstrainingmasterForm.value;
obj.startdate=new Date(this.hrmstrainingmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hrmstrainingmasterForm.get('startdate').value)+'  UTC' :null);
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

private hrmstrainingmastertoggleOption(){
this.hrmstrainingmastershowOption = this.hrmstrainingmastershowOption === true ? false : true;
}

private hrmstrainingattendancetoggleOption(){
this.hrmstrainingattendanceshowOption = this.hrmstrainingattendanceshowOption === true ? false : true;
}

private hrmstrainingfeedbacktraineetoggleOption(){
this.hrmstrainingfeedbacktraineeshowOption = this.hrmstrainingfeedbacktraineeshowOption === true ? false : true;
}

private hrmstrainingfeedbacktrainertoggleOption(){
this.hrmstrainingfeedbacktrainershowOption = this.hrmstrainingfeedbacktrainershowOption === true ? false : true;
}

private hrmstrainingparticipanttoggleOption(){
this.hrmstrainingparticipantshowOption = this.hrmstrainingparticipantshowOption === true ? false : true;
}

private hrmstrainingscheduletoggleOption(){
this.hrmstrainingscheduleshowOption = this.hrmstrainingscheduleshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmstrainingmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmstrainingmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmstrainingmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmstrainingmasterservice.formData=this.hrmstrainingmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmstrainingmasterForm.controls[key] != null)
    {
        this.hrmstrainingmasterservice.formData[key] = this.hrmstrainingmasterForm.controls[key].value;
    }
}
}
}
this.hrmstrainingmasterservice.formData.startdate=new Date(this.hrmstrainingmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hrmstrainingmasterForm.get('startdate').value)+'  UTC' :null);
this.hrmstrainingmasterservice.formData.DeletedhrmstrainingattendanceIDs = this.DeletedhrmstrainingattendanceIDs;
this.hrmstrainingmasterservice.formData.DeletedhrmstrainingfeedbacktraineeIDs = this.DeletedhrmstrainingfeedbacktraineeIDs;
this.hrmstrainingmasterservice.formData.DeletedhrmstrainingfeedbacktrainerIDs = this.DeletedhrmstrainingfeedbacktrainerIDs;
this.hrmstrainingmasterservice.formData.DeletedhrmstrainingparticipantIDs = this.DeletedhrmstrainingparticipantIDs;
this.hrmstrainingmasterservice.formData.DeletedhrmstrainingscheduleIDs = this.DeletedhrmstrainingscheduleIDs;
console.log(this.hrmstrainingmasterservice.formData);
this.hrmstrainingmasterservice.formData=this.hrmstrainingmasterForm.value;
this.hrmstrainingmasterservice.saveOrUpdatehrmstrainingmasters().subscribe(
async res => {
if (this.hrmstrainingattendancessource.data)
{
    for (let i = 0; i < this.hrmstrainingattendancessource.data.length; i++)
    {
        if (this.hrmstrainingattendancessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmstrainingattendancessource.data[i].fileattachmentlist);
    }
}
if (this.hrmstrainingfeedbacktraineessource.data)
{
    for (let i = 0; i < this.hrmstrainingfeedbacktraineessource.data.length; i++)
    {
        if (this.hrmstrainingfeedbacktraineessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmstrainingfeedbacktraineessource.data[i].fileattachmentlist);
    }
}
if (this.hrmstrainingfeedbacktrainerssource.data)
{
    for (let i = 0; i < this.hrmstrainingfeedbacktrainerssource.data.length; i++)
    {
        if (this.hrmstrainingfeedbacktrainerssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmstrainingfeedbacktrainerssource.data[i].fileattachmentlist);
    }
}
if (this.hrmstrainingparticipantssource.data)
{
    for (let i = 0; i < this.hrmstrainingparticipantssource.data.length; i++)
    {
        if (this.hrmstrainingparticipantssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmstrainingparticipantssource.data[i].fileattachmentlist);
    }
}
if (this.hrmstrainingschedulessource.data)
{
    for (let i = 0; i < this.hrmstrainingschedulessource.data.length; i++)
    {
        if (this.hrmstrainingschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmstrainingschedulessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmstrainingmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmstrainingmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmstrainingmaster);
}
else
{
this.FillData(res);
}
}
this.hrmstrainingmasterForm.markAsUntouched();
this.hrmstrainingmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.hrmstrainingmasterForm.get('category').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdithrmstrainingattendance(event:any,attendanceid:any, trainingmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmstrainingattendanceComponent, 
{
data:  {  showview:false,save:false,event,attendanceid, trainingmasterid,visiblelist:this.hrmstrainingattendancesvisiblelist,  hidelist:this.hrmstrainingattendanceshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmstrainingattendancessource.add(res);
this.hrmstrainingattendancessource.refresh();
}
else
{
this.hrmstrainingattendancessource.update(event.data, res);
}
}
});
}

onDeletehrmstrainingattendance(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmstrainingattendanceIDs += childID + ",";
this.hrmstrainingmasterservice.hrmstrainingattendances.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmstrainingfeedbacktrainee(event:any,traineefeedbackid:any, trainingmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmstrainingfeedbacktraineeComponent, 
{
data:  {  showview:false,save:false,event,traineefeedbackid, trainingmasterid,visiblelist:this.hrmstrainingfeedbacktraineesvisiblelist,  hidelist:this.hrmstrainingfeedbacktraineeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmstrainingfeedbacktraineessource.add(res);
this.hrmstrainingfeedbacktraineessource.refresh();
}
else
{
this.hrmstrainingfeedbacktraineessource.update(event.data, res);
}
}
});
}

onDeletehrmstrainingfeedbacktrainee(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmstrainingfeedbacktraineeIDs += childID + ",";
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmstrainingfeedbacktrainer(event:any,trainerfeedbackid:any, trainingmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmstrainingfeedbacktrainerComponent, 
{
data:  {  showview:false,save:false,event,trainerfeedbackid, trainingmasterid,visiblelist:this.hrmstrainingfeedbacktrainersvisiblelist,  hidelist:this.hrmstrainingfeedbacktrainershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmstrainingfeedbacktrainerssource.add(res);
this.hrmstrainingfeedbacktrainerssource.refresh();
}
else
{
this.hrmstrainingfeedbacktrainerssource.update(event.data, res);
}
}
});
}

onDeletehrmstrainingfeedbacktrainer(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmstrainingfeedbacktrainerIDs += childID + ",";
this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmstrainingparticipant(event:any,participantid:any, trainingmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmstrainingparticipantComponent, 
{
data:  {  showview:false,save:false,event,participantid, trainingmasterid,visiblelist:this.hrmstrainingparticipantsvisiblelist,  hidelist:this.hrmstrainingparticipantshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmstrainingparticipantssource.add(res);
this.hrmstrainingparticipantssource.refresh();
}
else
{
this.hrmstrainingparticipantssource.update(event.data, res);
}
}
});
}

onDeletehrmstrainingparticipant(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmstrainingparticipantIDs += childID + ",";
this.hrmstrainingmasterservice.hrmstrainingparticipants.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmstrainingschedule(event:any,scheduleid:any, trainingmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmstrainingscheduleComponent, 
{
data:  {  showview:false,save:false,event,scheduleid, trainingmasterid,visiblelist:this.hrmstrainingschedulesvisiblelist,  hidelist:this.hrmstrainingscheduleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmstrainingschedulessource.add(res);
this.hrmstrainingschedulessource.refresh();
}
else
{
this.hrmstrainingschedulessource.update(event.data, res);
}
}
});
}

onDeletehrmstrainingschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmstrainingscheduleIDs += childID + ",";
this.hrmstrainingmasterservice.hrmstrainingschedules.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmstrainingattendances
hrmstrainingattendancessettings:any;
hrmstrainingattendancessource: any;

showhrmstrainingattendancesCheckbox()
{
debugger;
if(this.tblhrmstrainingattendancessource.settings['selectMode']== 'multi')this.tblhrmstrainingattendancessource.settings['selectMode']= 'single';
else
this.tblhrmstrainingattendancessource.settings['selectMode']= 'multi';
this.tblhrmstrainingattendancessource.initGrid();
}
deletehrmstrainingattendancesAll()
{
this.tblhrmstrainingattendancessource.settings['selectMode'] = 'single';
}
showhrmstrainingattendancesFilter()
{
  setTimeout(() => {
  this.SethrmstrainingattendancesTableddConfig();
  });
      if(this.tblhrmstrainingattendancessource.settings!=null)this.tblhrmstrainingattendancessource.settings['hideSubHeader'] =!this.tblhrmstrainingattendancessource.settings['hideSubHeader'];
this.tblhrmstrainingattendancessource.initGrid();
}
showhrmstrainingattendancesInActive()
{
}
enablehrmstrainingattendancesInActive()
{
}
async SethrmstrainingattendancesTableddConfig()
{
if(!this.bfilterPopulatehrmstrainingattendances){

this.hrmstrainingservice.gethrmstrainingsList().then(res=>
{
var datatrainingid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmstrainingattendancestrainingid3.push(defaultobj);
for(let i=0; i<datatrainingid2.length; i++){
var obj= { value: datatrainingid2[i].trainingid, title:datatrainingid2[i].trainingtitle};
this.datahrmstrainingattendancestrainingid3.push(obj);
}
if((this.tblhrmstrainingattendancessource.settings as any).columns['trainingid'])
{
(this.tblhrmstrainingattendancessource.settings as any).columns['trainingid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmstrainingattendancestrainingid3));
this.tblhrmstrainingattendancessource.initGrid();
}
});
}
this.bfilterPopulatehrmstrainingattendances=true;
}
async hrmstrainingattendancesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmstrainingattendancesTableConfig()
{
this.hrmstrainingattendancessettings = {
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
scheduleid: {
title: 'Schedule',
type: 'number',
filter:true,
},
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
attendancedate: {
title: 'Attendance Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
present: {
title: 'Present',
type: 'boolean',
editor: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
filter: {
type: 'checkbox',
config: {
true: 'true',
false: 'false',
resetText: 'clear',
},
},
},
},
};
}
hrmstrainingattendancesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingattendancesID)>=0)
{
this.hrmstrainingattendancessource=new LocalDataSource();
this.hrmstrainingattendancessource.load(this.hrmstrainingmasterservice.hrmstrainingattendances as  any as LocalDataSource);
this.hrmstrainingattendancessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmstrainingattendancesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmstrainingmasterservice.hrmstrainingattendances.length == 0)
{
    this.tblhrmstrainingattendancessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmstrainingattendance();
    this.hrmstrainingmasterservice.hrmstrainingattendances.push(obj);
    this.hrmstrainingattendancessource.refresh();
    if ((this.hrmstrainingmasterservice.hrmstrainingattendances.length / this.hrmstrainingattendancessource.getPaging().perPage).toFixed(0) + 1 != this.hrmstrainingattendancessource.getPaging().page)
    {
        this.hrmstrainingattendancessource.setPage((this.hrmstrainingmasterservice.hrmstrainingattendances.length / this.hrmstrainingattendancessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmstrainingattendancessource.grid.edit(this.tblhrmstrainingattendancessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmstrainingattendancessource.data.indexOf(event.data);
this.onDeletehrmstrainingattendance(event,event.data.attendanceid,((this.hrmstrainingattendancessource.getPaging().page-1) *this.hrmstrainingattendancessource.getPaging().perPage)+index);
this.hrmstrainingattendancessource.refresh();
break;
}
}

*/
hrmstrainingattendancesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmstrainingattendance(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmstrainingattendance(event,event.data.attendanceid,this.formid);
break;
case 'delete':
this.onDeletehrmstrainingattendance(event,event.data.attendanceid,((this.hrmstrainingattendancessource.getPaging().page-1) *this.hrmstrainingattendancessource.getPaging().perPage)+event.index);
this.hrmstrainingattendancessource.refresh();
break;
}
}
hrmstrainingattendancesonDelete(obj) {
let attendanceid=obj.data.attendanceid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmstrainingmasterservice.deletehrmstrainingmaster(attendanceid).then(res=>
this.hrmstrainingattendancesLoadTable()
);
}
}
hrmstrainingattendancesPaging(val)
{
debugger;
this.hrmstrainingattendancessource.setPaging(1, val, true);
}

handlehrmstrainingattendancesGridSelected(event:any) {
this.hrmstrainingattendancesselectedindex=this.hrmstrainingmasterservice.hrmstrainingattendances.findIndex(i => i.attendanceid === event.data.attendanceid);
}
IshrmstrainingattendancesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingattendancesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmstrainingattendances
//start of Grid Codes hrmstrainingfeedbacktrainees
hrmstrainingfeedbacktraineessettings:any;
hrmstrainingfeedbacktraineessource: any;

showhrmstrainingfeedbacktraineesCheckbox()
{
debugger;
if(this.tblhrmstrainingfeedbacktraineessource.settings['selectMode']== 'multi')this.tblhrmstrainingfeedbacktraineessource.settings['selectMode']= 'single';
else
this.tblhrmstrainingfeedbacktraineessource.settings['selectMode']= 'multi';
this.tblhrmstrainingfeedbacktraineessource.initGrid();
}
deletehrmstrainingfeedbacktraineesAll()
{
this.tblhrmstrainingfeedbacktraineessource.settings['selectMode'] = 'single';
}
showhrmstrainingfeedbacktraineesFilter()
{
  setTimeout(() => {
  this.SethrmstrainingfeedbacktraineesTableddConfig();
  });
      if(this.tblhrmstrainingfeedbacktraineessource.settings!=null)this.tblhrmstrainingfeedbacktraineessource.settings['hideSubHeader'] =!this.tblhrmstrainingfeedbacktraineessource.settings['hideSubHeader'];
this.tblhrmstrainingfeedbacktraineessource.initGrid();
}
showhrmstrainingfeedbacktraineesInActive()
{
}
enablehrmstrainingfeedbacktraineesInActive()
{
}
async SethrmstrainingfeedbacktraineesTableddConfig()
{
if(!this.bfilterPopulatehrmstrainingfeedbacktrainees){

this.hrmstrainingservice.gethrmstrainingsList().then(res=>
{
var datatrainingid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmstrainingfeedbacktraineestrainingid3.push(defaultobj);
for(let i=0; i<datatrainingid2.length; i++){
var obj= { value: datatrainingid2[i].trainingid, title:datatrainingid2[i].trainingtitle};
this.datahrmstrainingfeedbacktraineestrainingid3.push(obj);
}
if((this.tblhrmstrainingfeedbacktraineessource.settings as any).columns['trainingid'])
{
(this.tblhrmstrainingfeedbacktraineessource.settings as any).columns['trainingid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmstrainingfeedbacktraineestrainingid3));
this.tblhrmstrainingfeedbacktraineessource.initGrid();
}
});
}
this.bfilterPopulatehrmstrainingfeedbacktrainees=true;
}
async hrmstrainingfeedbacktraineesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmstrainingfeedbacktraineesTableConfig()
{
this.hrmstrainingfeedbacktraineessettings = {
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
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
trainerid: {
title: 'Trainer',
type: 'number',
filter:true,
},
qmid: {
title: 'Q M',
type: 'number',
filter:true,
},
answer: {
title: 'Answer',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
},
};
}
hrmstrainingfeedbacktraineesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingfeedbacktraineesID)>=0)
{
this.hrmstrainingfeedbacktraineessource=new LocalDataSource();
this.hrmstrainingfeedbacktraineessource.load(this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees as  any as LocalDataSource);
this.hrmstrainingfeedbacktraineessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmstrainingfeedbacktraineesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.length == 0)
{
    this.tblhrmstrainingfeedbacktraineessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmstrainingfeedbacktrainee();
    this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.push(obj);
    this.hrmstrainingfeedbacktraineessource.refresh();
    if ((this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.length / this.hrmstrainingfeedbacktraineessource.getPaging().perPage).toFixed(0) + 1 != this.hrmstrainingfeedbacktraineessource.getPaging().page)
    {
        this.hrmstrainingfeedbacktraineessource.setPage((this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.length / this.hrmstrainingfeedbacktraineessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmstrainingfeedbacktraineessource.grid.edit(this.tblhrmstrainingfeedbacktraineessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmstrainingfeedbacktraineessource.data.indexOf(event.data);
this.onDeletehrmstrainingfeedbacktrainee(event,event.data.traineefeedbackid,((this.hrmstrainingfeedbacktraineessource.getPaging().page-1) *this.hrmstrainingfeedbacktraineessource.getPaging().perPage)+index);
this.hrmstrainingfeedbacktraineessource.refresh();
break;
}
}

*/
hrmstrainingfeedbacktraineesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmstrainingfeedbacktrainee(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmstrainingfeedbacktrainee(event,event.data.traineefeedbackid,this.formid);
break;
case 'delete':
this.onDeletehrmstrainingfeedbacktrainee(event,event.data.traineefeedbackid,((this.hrmstrainingfeedbacktraineessource.getPaging().page-1) *this.hrmstrainingfeedbacktraineessource.getPaging().perPage)+event.index);
this.hrmstrainingfeedbacktraineessource.refresh();
break;
}
}
hrmstrainingfeedbacktraineesonDelete(obj) {
let traineefeedbackid=obj.data.traineefeedbackid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmstrainingmasterservice.deletehrmstrainingmaster(traineefeedbackid).then(res=>
this.hrmstrainingfeedbacktraineesLoadTable()
);
}
}
hrmstrainingfeedbacktraineesPaging(val)
{
debugger;
this.hrmstrainingfeedbacktraineessource.setPaging(1, val, true);
}

handlehrmstrainingfeedbacktraineesGridSelected(event:any) {
this.hrmstrainingfeedbacktraineesselectedindex=this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainees.findIndex(i => i.traineefeedbackid === event.data.traineefeedbackid);
}
IshrmstrainingfeedbacktraineesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingfeedbacktraineesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmstrainingfeedbacktrainees
//start of Grid Codes hrmstrainingfeedbacktrainers
hrmstrainingfeedbacktrainerssettings:any;
hrmstrainingfeedbacktrainerssource: any;

showhrmstrainingfeedbacktrainersCheckbox()
{
debugger;
if(this.tblhrmstrainingfeedbacktrainerssource.settings['selectMode']== 'multi')this.tblhrmstrainingfeedbacktrainerssource.settings['selectMode']= 'single';
else
this.tblhrmstrainingfeedbacktrainerssource.settings['selectMode']= 'multi';
this.tblhrmstrainingfeedbacktrainerssource.initGrid();
}
deletehrmstrainingfeedbacktrainersAll()
{
this.tblhrmstrainingfeedbacktrainerssource.settings['selectMode'] = 'single';
}
showhrmstrainingfeedbacktrainersFilter()
{
  setTimeout(() => {
  this.SethrmstrainingfeedbacktrainersTableddConfig();
  });
      if(this.tblhrmstrainingfeedbacktrainerssource.settings!=null)this.tblhrmstrainingfeedbacktrainerssource.settings['hideSubHeader'] =!this.tblhrmstrainingfeedbacktrainerssource.settings['hideSubHeader'];
this.tblhrmstrainingfeedbacktrainerssource.initGrid();
}
showhrmstrainingfeedbacktrainersInActive()
{
}
enablehrmstrainingfeedbacktrainersInActive()
{
}
async SethrmstrainingfeedbacktrainersTableddConfig()
{
if(!this.bfilterPopulatehrmstrainingfeedbacktrainers){

this.hrmstrainingservice.gethrmstrainingsList().then(res=>
{
var datatrainingid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmstrainingfeedbacktrainerstrainingid3.push(defaultobj);
for(let i=0; i<datatrainingid2.length; i++){
var obj= { value: datatrainingid2[i].trainingid, title:datatrainingid2[i].trainingtitle};
this.datahrmstrainingfeedbacktrainerstrainingid3.push(obj);
}
if((this.tblhrmstrainingfeedbacktrainerssource.settings as any).columns['trainingid'])
{
(this.tblhrmstrainingfeedbacktrainerssource.settings as any).columns['trainingid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmstrainingfeedbacktrainerstrainingid3));
this.tblhrmstrainingfeedbacktrainerssource.initGrid();
}
});
}
this.bfilterPopulatehrmstrainingfeedbacktrainers=true;
}
async hrmstrainingfeedbacktrainersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmstrainingfeedbacktrainersTableConfig()
{
this.hrmstrainingfeedbacktrainerssettings = {
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
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
trainerid: {
title: 'Trainer',
type: 'number',
filter:true,
},
qmid: {
title: 'Q M',
type: 'number',
filter:true,
},
answer: {
title: 'Answer',
type: '',
filter:true,
},
rating: {
title: 'Rating',
type: 'number',
filter:true,
},
},
};
}
hrmstrainingfeedbacktrainersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingfeedbacktrainersID)>=0)
{
this.hrmstrainingfeedbacktrainerssource=new LocalDataSource();
this.hrmstrainingfeedbacktrainerssource.load(this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers as  any as LocalDataSource);
this.hrmstrainingfeedbacktrainerssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmstrainingfeedbacktrainersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.length == 0)
{
    this.tblhrmstrainingfeedbacktrainerssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmstrainingfeedbacktrainer();
    this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.push(obj);
    this.hrmstrainingfeedbacktrainerssource.refresh();
    if ((this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.length / this.hrmstrainingfeedbacktrainerssource.getPaging().perPage).toFixed(0) + 1 != this.hrmstrainingfeedbacktrainerssource.getPaging().page)
    {
        this.hrmstrainingfeedbacktrainerssource.setPage((this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.length / this.hrmstrainingfeedbacktrainerssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmstrainingfeedbacktrainerssource.grid.edit(this.tblhrmstrainingfeedbacktrainerssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmstrainingfeedbacktrainerssource.data.indexOf(event.data);
this.onDeletehrmstrainingfeedbacktrainer(event,event.data.trainerfeedbackid,((this.hrmstrainingfeedbacktrainerssource.getPaging().page-1) *this.hrmstrainingfeedbacktrainerssource.getPaging().perPage)+index);
this.hrmstrainingfeedbacktrainerssource.refresh();
break;
}
}

*/
hrmstrainingfeedbacktrainersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmstrainingfeedbacktrainer(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmstrainingfeedbacktrainer(event,event.data.trainerfeedbackid,this.formid);
break;
case 'delete':
this.onDeletehrmstrainingfeedbacktrainer(event,event.data.trainerfeedbackid,((this.hrmstrainingfeedbacktrainerssource.getPaging().page-1) *this.hrmstrainingfeedbacktrainerssource.getPaging().perPage)+event.index);
this.hrmstrainingfeedbacktrainerssource.refresh();
break;
}
}
hrmstrainingfeedbacktrainersonDelete(obj) {
let trainerfeedbackid=obj.data.trainerfeedbackid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmstrainingmasterservice.deletehrmstrainingmaster(trainerfeedbackid).then(res=>
this.hrmstrainingfeedbacktrainersLoadTable()
);
}
}
hrmstrainingfeedbacktrainersPaging(val)
{
debugger;
this.hrmstrainingfeedbacktrainerssource.setPaging(1, val, true);
}

handlehrmstrainingfeedbacktrainersGridSelected(event:any) {
this.hrmstrainingfeedbacktrainersselectedindex=this.hrmstrainingmasterservice.hrmstrainingfeedbacktrainers.findIndex(i => i.trainerfeedbackid === event.data.trainerfeedbackid);
}
IshrmstrainingfeedbacktrainersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingfeedbacktrainersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmstrainingfeedbacktrainers
//start of Grid Codes hrmstrainingparticipants
hrmstrainingparticipantssettings:any;
hrmstrainingparticipantssource: any;

showhrmstrainingparticipantsCheckbox()
{
debugger;
if(this.tblhrmstrainingparticipantssource.settings['selectMode']== 'multi')this.tblhrmstrainingparticipantssource.settings['selectMode']= 'single';
else
this.tblhrmstrainingparticipantssource.settings['selectMode']= 'multi';
this.tblhrmstrainingparticipantssource.initGrid();
}
deletehrmstrainingparticipantsAll()
{
this.tblhrmstrainingparticipantssource.settings['selectMode'] = 'single';
}
showhrmstrainingparticipantsFilter()
{
  setTimeout(() => {
  this.SethrmstrainingparticipantsTableddConfig();
  });
      if(this.tblhrmstrainingparticipantssource.settings!=null)this.tblhrmstrainingparticipantssource.settings['hideSubHeader'] =!this.tblhrmstrainingparticipantssource.settings['hideSubHeader'];
this.tblhrmstrainingparticipantssource.initGrid();
}
showhrmstrainingparticipantsInActive()
{
}
enablehrmstrainingparticipantsInActive()
{
}
async SethrmstrainingparticipantsTableddConfig()
{
if(!this.bfilterPopulatehrmstrainingparticipants){

this.hrmstrainingservice.gethrmstrainingsList().then(res=>
{
var datatrainingid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmstrainingparticipantstrainingid3.push(defaultobj);
for(let i=0; i<datatrainingid2.length; i++){
var obj= { value: datatrainingid2[i].trainingid, title:datatrainingid2[i].trainingtitle};
this.datahrmstrainingparticipantstrainingid3.push(obj);
}
if((this.tblhrmstrainingparticipantssource.settings as any).columns['trainingid'])
{
(this.tblhrmstrainingparticipantssource.settings as any).columns['trainingid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmstrainingparticipantstrainingid3));
this.tblhrmstrainingparticipantssource.initGrid();
}
});
}
this.bfilterPopulatehrmstrainingparticipants=true;
}
async hrmstrainingparticipantsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmstrainingparticipantsTableConfig()
{
this.hrmstrainingparticipantssettings = {
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
feedbackabouttrainer: {
title: 'Feedback About Trainer',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
feedbackbytrainer: {
title: 'Feedback By Trainer',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
employeeid: {
title: 'Employee',
type: 'number',
filter:true,
},
},
};
}
hrmstrainingparticipantsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingparticipantsID)>=0)
{
this.hrmstrainingparticipantssource=new LocalDataSource();
this.hrmstrainingparticipantssource.load(this.hrmstrainingmasterservice.hrmstrainingparticipants as  any as LocalDataSource);
this.hrmstrainingparticipantssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmstrainingparticipantsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmstrainingmasterservice.hrmstrainingparticipants.length == 0)
{
    this.tblhrmstrainingparticipantssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmstrainingparticipant();
    this.hrmstrainingmasterservice.hrmstrainingparticipants.push(obj);
    this.hrmstrainingparticipantssource.refresh();
    if ((this.hrmstrainingmasterservice.hrmstrainingparticipants.length / this.hrmstrainingparticipantssource.getPaging().perPage).toFixed(0) + 1 != this.hrmstrainingparticipantssource.getPaging().page)
    {
        this.hrmstrainingparticipantssource.setPage((this.hrmstrainingmasterservice.hrmstrainingparticipants.length / this.hrmstrainingparticipantssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmstrainingparticipantssource.grid.edit(this.tblhrmstrainingparticipantssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmstrainingparticipantssource.data.indexOf(event.data);
this.onDeletehrmstrainingparticipant(event,event.data.participantid,((this.hrmstrainingparticipantssource.getPaging().page-1) *this.hrmstrainingparticipantssource.getPaging().perPage)+index);
this.hrmstrainingparticipantssource.refresh();
break;
}
}

*/
hrmstrainingparticipantsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmstrainingparticipant(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmstrainingparticipant(event,event.data.participantid,this.formid);
break;
case 'delete':
this.onDeletehrmstrainingparticipant(event,event.data.participantid,((this.hrmstrainingparticipantssource.getPaging().page-1) *this.hrmstrainingparticipantssource.getPaging().perPage)+event.index);
this.hrmstrainingparticipantssource.refresh();
break;
}
}
hrmstrainingparticipantsonDelete(obj) {
let participantid=obj.data.participantid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmstrainingmasterservice.deletehrmstrainingmaster(participantid).then(res=>
this.hrmstrainingparticipantsLoadTable()
);
}
}
hrmstrainingparticipantsPaging(val)
{
debugger;
this.hrmstrainingparticipantssource.setPaging(1, val, true);
}

handlehrmstrainingparticipantsGridSelected(event:any) {
this.hrmstrainingparticipantsselectedindex=this.hrmstrainingmasterservice.hrmstrainingparticipants.findIndex(i => i.participantid === event.data.participantid);
}
IshrmstrainingparticipantsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingparticipantsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmstrainingparticipants
//start of Grid Codes hrmstrainingschedules
hrmstrainingschedulessettings:any;
hrmstrainingschedulessource: any;

showhrmstrainingschedulesCheckbox()
{
debugger;
if(this.tblhrmstrainingschedulessource.settings['selectMode']== 'multi')this.tblhrmstrainingschedulessource.settings['selectMode']= 'single';
else
this.tblhrmstrainingschedulessource.settings['selectMode']= 'multi';
this.tblhrmstrainingschedulessource.initGrid();
}
deletehrmstrainingschedulesAll()
{
this.tblhrmstrainingschedulessource.settings['selectMode'] = 'single';
}
showhrmstrainingschedulesFilter()
{
  setTimeout(() => {
  this.SethrmstrainingschedulesTableddConfig();
  });
      if(this.tblhrmstrainingschedulessource.settings!=null)this.tblhrmstrainingschedulessource.settings['hideSubHeader'] =!this.tblhrmstrainingschedulessource.settings['hideSubHeader'];
this.tblhrmstrainingschedulessource.initGrid();
}
showhrmstrainingschedulesInActive()
{
}
enablehrmstrainingschedulesInActive()
{
}
async SethrmstrainingschedulesTableddConfig()
{
if(!this.bfilterPopulatehrmstrainingschedules){

this.hrmstrainingservice.gethrmstrainingsList().then(res=>
{
var datatrainingid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmstrainingschedulestrainingid3.push(defaultobj);
for(let i=0; i<datatrainingid2.length; i++){
var obj= { value: datatrainingid2[i].trainingid, title:datatrainingid2[i].trainingtitle};
this.datahrmstrainingschedulestrainingid3.push(obj);
}
if((this.tblhrmstrainingschedulessource.settings as any).columns['trainingid'])
{
(this.tblhrmstrainingschedulessource.settings as any).columns['trainingid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmstrainingschedulestrainingid3));
this.tblhrmstrainingschedulessource.initGrid();
}
});
}
this.bfilterPopulatehrmstrainingschedules=true;
}
async hrmstrainingschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmstrainingschedulesTableConfig()
{
this.hrmstrainingschedulessettings = {
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
scheduledate: {
title: 'Schedule Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
topic: {
title: 'Topic',
type: '',
filter:true,
},
fromtime: {
title: 'From Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
totime: {
title: 'To Time',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
trainer: {
title: 'Trainer',
type: '',
filter:true,
},
},
};
}
hrmstrainingschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingschedulesID)>=0)
{
this.hrmstrainingschedulessource=new LocalDataSource();
this.hrmstrainingschedulessource.load(this.hrmstrainingmasterservice.hrmstrainingschedules as  any as LocalDataSource);
this.hrmstrainingschedulessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmstrainingschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmstrainingmasterservice.hrmstrainingschedules.length == 0)
{
    this.tblhrmstrainingschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmstrainingschedule();
    this.hrmstrainingmasterservice.hrmstrainingschedules.push(obj);
    this.hrmstrainingschedulessource.refresh();
    if ((this.hrmstrainingmasterservice.hrmstrainingschedules.length / this.hrmstrainingschedulessource.getPaging().perPage).toFixed(0) + 1 != this.hrmstrainingschedulessource.getPaging().page)
    {
        this.hrmstrainingschedulessource.setPage((this.hrmstrainingmasterservice.hrmstrainingschedules.length / this.hrmstrainingschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmstrainingschedulessource.grid.edit(this.tblhrmstrainingschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmstrainingschedulessource.data.indexOf(event.data);
this.onDeletehrmstrainingschedule(event,event.data.scheduleid,((this.hrmstrainingschedulessource.getPaging().page-1) *this.hrmstrainingschedulessource.getPaging().perPage)+index);
this.hrmstrainingschedulessource.refresh();
break;
}
}

*/
hrmstrainingschedulesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmstrainingschedule(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmstrainingschedule(event,event.data.scheduleid,this.formid);
break;
case 'delete':
this.onDeletehrmstrainingschedule(event,event.data.scheduleid,((this.hrmstrainingschedulessource.getPaging().page-1) *this.hrmstrainingschedulessource.getPaging().perPage)+event.index);
this.hrmstrainingschedulessource.refresh();
break;
}
}
hrmstrainingschedulesonDelete(obj) {
let scheduleid=obj.data.scheduleid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmstrainingmasterservice.deletehrmstrainingmaster(scheduleid).then(res=>
this.hrmstrainingschedulesLoadTable()
);
}
}
hrmstrainingschedulesPaging(val)
{
debugger;
this.hrmstrainingschedulessource.setPaging(1, val, true);
}

handlehrmstrainingschedulesGridSelected(event:any) {
this.hrmstrainingschedulesselectedindex=this.hrmstrainingmasterservice.hrmstrainingschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
}
IshrmstrainingschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmstrainingschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmstrainingschedules

}



