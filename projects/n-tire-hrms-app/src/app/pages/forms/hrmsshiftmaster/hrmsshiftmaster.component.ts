import { hrmsshiftmasterService } from './../../../service/hrmsshiftmaster.service';
import { hrmsshiftmaster } from './../../../model/hrmsshiftmaster.model';
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
//detail table services
import { hrmsemployeeshift } from './../../../model/hrmsemployeeshift.model';
import { hrmsemployeeshiftComponent } from './../../../pages/forms/hrmsemployeeshift/hrmsemployeeshift.component';
//FK services
import { hrmsemployee,IhrmsemployeeResponse } from './../../../model/hrmsemployee.model';
import { hrmsemployeeComponent } from './../../../pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { hrmsemployeeshiftpreference } from './../../../model/hrmsemployeeshiftpreference.model';
import { hrmsemployeeshiftpreferenceComponent } from './../../../pages/forms/hrmsemployeeshiftpreference/hrmsemployeeshiftpreference.component';
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
selector: 'app-hrmsshiftmaster',
templateUrl: './hrmsshiftmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsshiftmasterComponent implements OnInit {
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
bfilterPopulatehrmsshiftmasters:boolean=false;
datahrmsemployeeshiftsemployeeid3:any=[];
bfilterPopulatehrmsemployeeshifts:boolean=false;
datahrmsemployeeshiftpreferencesemployeeid3:any=[];
bfilterPopulatehrmsemployeeshiftpreferences:boolean=false;
@ViewChild('tblhrmsemployeeshiftssource',{static:false}) tblhrmsemployeeshiftssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeshiftpreferencessource',{static:false}) tblhrmsemployeeshiftpreferencessource: Ng2SmartTableComponent;
 hrmsshiftmasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsshiftmastershowOption:boolean;
hrmsemployeeshiftshowOption:boolean;
hrmsemployeeshiftpreferenceshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsemployeeshiftsvisiblelist:any;
hrmsemployeeshiftshidelist:any;
hrmsemployeeshiftpreferencesvisiblelist:any;
hrmsemployeeshiftpreferenceshidelist:any;

DeletedhrmsemployeeshiftIDs: string="";
hrmsemployeeshiftsID: string = "1";
hrmsemployeeshiftsselectedindex:any;
DeletedhrmsemployeeshiftpreferenceIDs: string="";
hrmsemployeeshiftpreferencesID: string = "2";
hrmsemployeeshiftpreferencesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsshiftmasterservice: hrmsshiftmasterService,
private hrmsemployeeservice: hrmsemployeeService,
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
this.hrmsshiftmasterForm  = this.fb.group({
pk:[null],
shiftid: [null],
shiftname: [null],
starttime: [null],
endtime: [null],
previousday: [null],
graceperiod: [null],
allowedgraceperiods: [null],
overtimeminutes: [null],
workinghours: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsshiftmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsshiftmasterForm.dirty && this.hrmsshiftmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.shiftid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.shiftid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.shiftid && pkDetail) {
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
let hrmsshiftmasterid = null;

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
this.formid=hrmsshiftmasterid;
//this.sharedService.alert(hrmsshiftmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsemployeeshiftsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeshiftsTableddConfig();
  });

this.SethrmsemployeeshiftpreferencesTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeshiftpreferencesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmsshiftmasterservice.gethrmsshiftmastersList().then(res => {
      this.pkList = res as hrmsshiftmaster[];
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
this.hrmsshiftmasterForm.markAsUntouched();
this.hrmsshiftmasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsshiftmasterForm != null)
this.hrmsshiftmasterForm.reset();
this.hrmsshiftmasterForm.patchValue({
});
setTimeout(() => {
this.hrmsshiftmasterservice.hrmsemployeeshifts=[];
this.hrmsemployeeshiftsLoadTable();
this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences=[];
this.hrmsemployeeshiftpreferencesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let shiftid = this.hrmsshiftmasterForm.get('shiftid').value;
        if(shiftid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsshiftmasterservice.deletehrmsshiftmaster(shiftid).then(res =>
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
    this.hrmsshiftmasterForm.patchValue({
        shiftid: null
    });
    if(this.hrmsshiftmasterservice.formData.shiftid!=null)this.hrmsshiftmasterservice.formData.shiftid=null;
for (let i=0;i<this.hrmsshiftmasterservice.hrmsemployeeshifts.length;i++) {
this.hrmsshiftmasterservice.hrmsemployeeshifts[i].txnid=null;
}
for (let i=0;i<this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.length;i++) {
this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences[i].prefid=null;
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
        else if(key=="starttime")
this.hrmsshiftmasterForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="endtime")
this.hrmsshiftmasterForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(key=="workinghours")
this.hrmsshiftmasterForm.patchValue({"workinghours":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsshiftmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsshiftmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsshiftmasterForm.controls[key]!=undefined)
{
this.hrmsshiftmasterForm.controls[key].disable({onlySelf: true});
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

edithrmsshiftmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsshiftmasterservice.gethrmsshiftmastersByEID(pkcol).then(res => {

this.hrmsshiftmasterservice.formData=res.hrmsshiftmaster;
let formproperty=res.hrmsshiftmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsshiftmaster.pkcol;
this.formid=res.hrmsshiftmaster.shiftid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsshiftmaster.shiftid;
var starttimeTime=new Time( res.hrmsshiftmaster.starttime);
var endtimeTime=new Time( res.hrmsshiftmaster.endtime);
var workinghoursTime=new Time( res.hrmsshiftmaster.workinghours);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsshiftmasterForm.patchValue({
shiftid: res.hrmsshiftmaster.shiftid,
shiftname: res.hrmsshiftmaster.shiftname,
starttime: starttimeTime,
endtime: endtimeTime,
previousday: res.hrmsshiftmaster.previousday,
graceperiod: res.hrmsshiftmaster.graceperiod,
allowedgraceperiods: res.hrmsshiftmaster.allowedgraceperiods,
overtimeminutes: res.hrmsshiftmaster.overtimeminutes,
workinghours: workinghoursTime,
status: res.hrmsshiftmaster.status,
statusdesc: res.hrmsshiftmaster.statusdesc,
});
this.hrmsemployeeshiftsvisiblelist=res.hrmsemployeeshiftsvisiblelist;
this.hrmsemployeeshiftpreferencesvisiblelist=res.hrmsemployeeshiftpreferencesvisiblelist;
//Child Tables if any
this.hrmsshiftmasterservice.hrmsemployeeshifts = res.hrmsemployeeshifts;
this.SethrmsemployeeshiftsTableConfig();
this.hrmsemployeeshiftsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeshiftsTableddConfig();
  });
this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences = res.hrmsemployeeshiftpreferences;
this.SethrmsemployeeshiftpreferencesTableConfig();
this.hrmsemployeeshiftpreferencesLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeshiftpreferencesTableddConfig();
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
  for (let key in this.hrmsshiftmasterForm.controls) {
    if (this.hrmsshiftmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsshiftmasterservice.formData!=null && this.hrmsshiftmasterservice.formData[key]!=null  && this.hrmsshiftmasterservice.formData[key]!='[]' && this.hrmsshiftmasterservice.formData[key]!=undefined && this.hrmsshiftmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsshiftmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsshiftmasterservice.formData!=null && this.hrmsshiftmasterservice.formData[key]!=null   && this.hrmsshiftmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsshiftmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsshiftmasterservice.formData!=null && this.hrmsshiftmasterservice.formData[key]!=null   && this.hrmsshiftmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsshiftmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsshiftmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsshiftmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsshiftmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsshiftmasterForm.value;
obj.starttime=(this.hrmsshiftmasterForm.get('starttime').value==null?0:this.hrmsshiftmasterForm.get('starttime').value.hour)+':'+(this.hrmsshiftmasterForm.get('starttime').value==null?0:this.hrmsshiftmasterForm.get('starttime').value.minute+":00");
obj.endtime=(this.hrmsshiftmasterForm.get('endtime').value==null?0:this.hrmsshiftmasterForm.get('endtime').value.hour)+':'+(this.hrmsshiftmasterForm.get('endtime').value==null?0:this.hrmsshiftmasterForm.get('endtime').value.minute+":00");
obj.workinghours=(this.hrmsshiftmasterForm.get('workinghours').value==null?0:this.hrmsshiftmasterForm.get('workinghours').value.hour)+':'+(this.hrmsshiftmasterForm.get('workinghours').value==null?0:this.hrmsshiftmasterForm.get('workinghours').value.minute+":00");
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

private hrmsshiftmastertoggleOption(){
this.hrmsshiftmastershowOption = this.hrmsshiftmastershowOption === true ? false : true;
}

private hrmsemployeeshifttoggleOption(){
this.hrmsemployeeshiftshowOption = this.hrmsemployeeshiftshowOption === true ? false : true;
}

private hrmsemployeeshiftpreferencetoggleOption(){
this.hrmsemployeeshiftpreferenceshowOption = this.hrmsemployeeshiftpreferenceshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsshiftmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsshiftmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsshiftmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsshiftmasterservice.formData=this.hrmsshiftmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsshiftmasterForm.controls[key] != null)
    {
        this.hrmsshiftmasterservice.formData[key] = this.hrmsshiftmasterForm.controls[key].value;
    }
}
}
}
this.hrmsshiftmasterservice.formData.starttime=(this.hrmsshiftmasterForm.get('starttime').value==null?0:this.hrmsshiftmasterForm.get('starttime').value.hour)+':'+(this.hrmsshiftmasterForm.get('starttime').value==null?0:this.hrmsshiftmasterForm.get('starttime').value.minute+":00");
this.hrmsshiftmasterservice.formData.endtime=(this.hrmsshiftmasterForm.get('endtime').value==null?0:this.hrmsshiftmasterForm.get('endtime').value.hour)+':'+(this.hrmsshiftmasterForm.get('endtime').value==null?0:this.hrmsshiftmasterForm.get('endtime').value.minute+":00");
this.hrmsshiftmasterservice.formData.workinghours=(this.hrmsshiftmasterForm.get('workinghours').value==null?0:this.hrmsshiftmasterForm.get('workinghours').value.hour)+':'+(this.hrmsshiftmasterForm.get('workinghours').value==null?0:this.hrmsshiftmasterForm.get('workinghours').value.minute+":00");
this.hrmsshiftmasterservice.formData.DeletedhrmsemployeeshiftIDs = this.DeletedhrmsemployeeshiftIDs;
this.hrmsshiftmasterservice.formData.DeletedhrmsemployeeshiftpreferenceIDs = this.DeletedhrmsemployeeshiftpreferenceIDs;
console.log(this.hrmsshiftmasterservice.formData);
this.hrmsshiftmasterservice.formData=this.hrmsshiftmasterForm.value;
this.hrmsshiftmasterservice.saveOrUpdatehrmsshiftmasters().subscribe(
async res => {
if (this.hrmsemployeeshiftssource.data)
{
    for (let i = 0; i < this.hrmsemployeeshiftssource.data.length; i++)
    {
        if (this.hrmsemployeeshiftssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeshiftssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeshiftpreferencessource.data)
{
    for (let i = 0; i < this.hrmsemployeeshiftpreferencessource.data.length; i++)
    {
        if (this.hrmsemployeeshiftpreferencessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeshiftpreferencessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsshiftmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsshiftmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsshiftmaster);
}
else
{
this.FillData(res);
}
}
this.hrmsshiftmasterForm.markAsUntouched();
this.hrmsshiftmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmsemployeeshift(event:any,txnid:any, shiftid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsemployeeshiftComponent, 
{
data:  {  showview:false,save:false,event,txnid, shiftid,visiblelist:this.hrmsemployeeshiftsvisiblelist,  hidelist:this.hrmsemployeeshiftshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsemployeeshiftssource.add(res);
this.hrmsemployeeshiftssource.refresh();
}
else
{
this.hrmsemployeeshiftssource.update(event.data, res);
}
}
});
}

onDeletehrmsemployeeshift(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeshiftIDs += childID + ",";
this.hrmsshiftmasterservice.hrmsemployeeshifts.splice(i, 1);
//this.updateGrandTotal();
}

onDeletehrmsemployeeshiftpreference(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeshiftpreferenceIDs += childID + ",";
this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.splice(i, 1);
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsemployeeshifts
hrmsemployeeshiftssettings:any;
hrmsemployeeshiftssource: any;

showhrmsemployeeshiftsCheckbox()
{
debugger;
if(this.tblhrmsemployeeshiftssource.settings['selectMode']== 'multi')this.tblhrmsemployeeshiftssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeshiftssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeshiftssource.initGrid();
}
deletehrmsemployeeshiftsAll()
{
this.tblhrmsemployeeshiftssource.settings['selectMode'] = 'single';
}
showhrmsemployeeshiftsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeshiftsTableddConfig();
  });
      if(this.tblhrmsemployeeshiftssource.settings!=null)this.tblhrmsemployeeshiftssource.settings['hideSubHeader'] =!this.tblhrmsemployeeshiftssource.settings['hideSubHeader'];
this.tblhrmsemployeeshiftssource.initGrid();
}
showhrmsemployeeshiftsInActive()
{
}
enablehrmsemployeeshiftsInActive()
{
}
async SethrmsemployeeshiftsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeshifts){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeshiftsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeeshiftsemployeeid3.push(obj);
}
if((this.tblhrmsemployeeshiftssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeeshiftssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeshiftsemployeeid3));
this.tblhrmsemployeeshiftssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeeshifts=true;
}
async hrmsemployeeshiftsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeshiftsTableConfig()
{
this.hrmsemployeeshiftssettings = {
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeshiftsemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
shiftdate: {
title: 'Shift Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
},
};
}
hrmsemployeeshiftsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeshiftsID)>=0)
{
this.hrmsemployeeshiftssource=new LocalDataSource();
this.hrmsemployeeshiftssource.load(this.hrmsshiftmasterservice.hrmsemployeeshifts as  any as LocalDataSource);
this.hrmsemployeeshiftssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsemployeeshiftsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsshiftmasterservice.hrmsemployeeshifts.length == 0)
{
    this.tblhrmsemployeeshiftssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeshift();
    this.hrmsshiftmasterservice.hrmsemployeeshifts.push(obj);
    this.hrmsemployeeshiftssource.refresh();
    if ((this.hrmsshiftmasterservice.hrmsemployeeshifts.length / this.hrmsemployeeshiftssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeshiftssource.getPaging().page)
    {
        this.hrmsemployeeshiftssource.setPage((this.hrmsshiftmasterservice.hrmsemployeeshifts.length / this.hrmsemployeeshiftssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeshiftssource.grid.edit(this.tblhrmsemployeeshiftssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeshiftssource.data.indexOf(event.data);
this.onDeletehrmsemployeeshift(event,event.data.txnid,((this.hrmsemployeeshiftssource.getPaging().page-1) *this.hrmsemployeeshiftssource.getPaging().perPage)+index);
this.hrmsemployeeshiftssource.refresh();
break;
}
}

*/
hrmsemployeeshiftsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsemployeeshift(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsemployeeshift(event,event.data.txnid,this.formid);
break;
case 'delete':
this.onDeletehrmsemployeeshift(event,event.data.txnid,((this.hrmsemployeeshiftssource.getPaging().page-1) *this.hrmsemployeeshiftssource.getPaging().perPage)+event.index);
this.hrmsemployeeshiftssource.refresh();
break;
}
}
hrmsemployeeshiftsonDelete(obj) {
let txnid=obj.data.txnid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsshiftmasterservice.deletehrmsshiftmaster(txnid).then(res=>
this.hrmsemployeeshiftsLoadTable()
);
}
}
hrmsemployeeshiftsPaging(val)
{
debugger;
this.hrmsemployeeshiftssource.setPaging(1, val, true);
}

handlehrmsemployeeshiftsGridSelected(event:any) {
this.hrmsemployeeshiftsselectedindex=this.hrmsshiftmasterservice.hrmsemployeeshifts.findIndex(i => i.txnid === event.data.txnid);
}
IshrmsemployeeshiftsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeshiftsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeshifts
//start of Grid Codes hrmsemployeeshiftpreferences
hrmsemployeeshiftpreferencessettings:any;
hrmsemployeeshiftpreferencessource: any;

showhrmsemployeeshiftpreferencesCheckbox()
{
debugger;
if(this.tblhrmsemployeeshiftpreferencessource.settings['selectMode']== 'multi')this.tblhrmsemployeeshiftpreferencessource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeshiftpreferencessource.settings['selectMode']= 'multi';
this.tblhrmsemployeeshiftpreferencessource.initGrid();
}
deletehrmsemployeeshiftpreferencesAll()
{
this.tblhrmsemployeeshiftpreferencessource.settings['selectMode'] = 'single';
}
showhrmsemployeeshiftpreferencesFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeshiftpreferencesTableddConfig();
  });
      if(this.tblhrmsemployeeshiftpreferencessource.settings!=null)this.tblhrmsemployeeshiftpreferencessource.settings['hideSubHeader'] =!this.tblhrmsemployeeshiftpreferencessource.settings['hideSubHeader'];
this.tblhrmsemployeeshiftpreferencessource.initGrid();
}
showhrmsemployeeshiftpreferencesInActive()
{
}
enablehrmsemployeeshiftpreferencesInActive()
{
}
async SethrmsemployeeshiftpreferencesTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeshiftpreferences){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeshiftpreferencesemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeeshiftpreferencesemployeeid3.push(obj);
}
if((this.tblhrmsemployeeshiftpreferencessource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeeshiftpreferencessource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeshiftpreferencesemployeeid3));
this.tblhrmsemployeeshiftpreferencessource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeeshiftpreferences=true;
}
async hrmsemployeeshiftpreferencesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeshiftpreferencesTableConfig()
{
this.hrmsemployeeshiftpreferencessettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: !this.showview, // true,
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
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeshiftpreferencesemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
fromdate: {
title: 'From Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
todate: {
title: 'To Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
reason: {
title: 'Reason',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
approvalstatus: {
title: 'Approval Status',
type: '',
filter:true,
},
},
};
}
hrmsemployeeshiftpreferencesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeshiftpreferencesID)>=0)
{
this.hrmsemployeeshiftpreferencessource=new LocalDataSource();
this.hrmsemployeeshiftpreferencessource.load(this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences as  any as LocalDataSource);
this.hrmsemployeeshiftpreferencessource.setPaging(1, 20, true);
}
}
hrmsemployeeshiftpreferencesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.length == 0)
{
    this.tblhrmsemployeeshiftpreferencessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeshiftpreference();
    this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.push(obj);
    this.hrmsemployeeshiftpreferencessource.refresh();
    if ((this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.length / this.hrmsemployeeshiftpreferencessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeshiftpreferencessource.getPaging().page)
    {
        this.hrmsemployeeshiftpreferencessource.setPage((this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.length / this.hrmsemployeeshiftpreferencessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeshiftpreferencessource.grid.edit(this.tblhrmsemployeeshiftpreferencessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeshiftpreferencessource.data.indexOf(event.data);
this.onDeletehrmsemployeeshiftpreference(event,event.data.prefid,((this.hrmsemployeeshiftpreferencessource.getPaging().page-1) *this.hrmsemployeeshiftpreferencessource.getPaging().perPage)+index);
this.hrmsemployeeshiftpreferencessource.refresh();
break;
}
}
hrmsemployeeshiftpreferencesPaging(val)
{
debugger;
this.hrmsemployeeshiftpreferencessource.setPaging(1, val, true);
}

handlehrmsemployeeshiftpreferencesGridSelected(event:any) {
this.hrmsemployeeshiftpreferencesselectedindex=this.hrmsshiftmasterservice.hrmsemployeeshiftpreferences.findIndex(i => i.prefid === event.data.prefid);
}
IshrmsemployeeshiftpreferencesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeshiftpreferencesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeshiftpreferences

}



