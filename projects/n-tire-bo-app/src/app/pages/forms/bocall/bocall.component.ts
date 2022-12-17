import { bocallService } from './../../../service/bocall.service';
import { bocall } from './../../../model/bocall.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
import { bousermaster} from './../../../model/bousermaster.model';
import { bousermasterService } from './../../../service/bousermaster.service';
//popups
//detail table services
import { bocallinvite } from './../../../model/bocallinvite.model';
//FK services
import { bocallinviteComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocallinvite/bocallinvite.component';
import { bocallreminder } from './../../../model/bocallreminder.model';
//FK services
import { bocallreminderComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bocallreminder/bocallreminder.component';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-bocall',
templateUrl: './bocall.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bocallComponent implements OnInit {
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
bfilterPopulatebocalls:boolean=false;
databocallsscreenid3:any=[];
databocallstype3:any=[];
databocallscategory3:any=[];
databocallsduration3:any=[];
bfilterPopulatebocallinvitees:boolean=false;
databocallremindersscreenid3:any=[];
bfilterPopulatebocallreminders:boolean=false;
@ViewChild('tblbocallinviteessource',{static:false}) tblbocallinviteessource: Ng2SmartTableComponent;
@ViewChild('tblbocallreminderssource',{static:false}) tblbocallreminderssource: Ng2SmartTableComponent;
 bocallForm: FormGroup;
screenidList: boconfigvalue[];
typeList: boconfigvalue[];
categoryList: boconfigvalue[];
durationList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bocallinviteesvisiblelist:any;
bocallinviteeshidelist:any;
bocallremindersvisiblelist:any;
bocallremindershidelist:any;

DeletedbocallinviteIDs: string="";
bocallinviteesID: string = "1";
bocallinviteesselectedindex:any;
DeletedbocallreminderIDs: string="";
bocallremindersID: string = "2";
bocallremindersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bocallservice: bocallService,
private bousermasterservice: bousermasterService,
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
this.bocallForm  = this.fb.group({pk:[null],callid: [null],
screenid: [null],
screeniddesc: [null],
relatedid: [null],
subject: [null],
type: [null],
typedesc: [null],
category: [null],
categorydesc: [null],
startdate: [null],
starttime: [null],
enddate: [null],
endtime: [null],
duration: [null],
durationdesc: [null],
description: [null],
assignedto: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bocallForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bocallForm.dirty && this.bocallForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.callid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.callid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.callid && pkDetail) {
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
let bocallid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
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
this.formid=bocallid;
//this.sharedService.alert(bocallid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbocallinviteesTableConfig();
  setTimeout(() => {
  this.SetbocallinviteesTableddConfig();
  });

this.SetbocallremindersTableConfig();
  setTimeout(() => {
  this.SetbocallremindersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("screenid").then(res => this.screenidList = res as boconfigvalue[]);
this.configservice.getList("type").then(res => this.typeList = res as boconfigvalue[]);
this.configservice.getList("callcategory").then(res => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("duration").then(res => this.durationList = res as boconfigvalue[]);

//autocomplete
    this.bocallservice.getbocallsList().then(res => {
      this.pkList = res as bocall[];
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
this.bocallForm.markAsUntouched();
this.bocallForm.markAsPristine();
}



resetForm() {
if (this.bocallForm != null)
this.bocallForm.reset();
this.bocallForm.patchValue({
});
setTimeout(() => {
this.bocallservice.bocallinvitees=[];
this.bocallinviteesLoadTable();
this.bocallservice.bocallreminders=[];
this.bocallremindersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let callid = this.bocallForm.get('callid').value;
        if(callid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bocallservice.deletebocall(callid).then(res =>
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
    this.bocallForm.patchValue({
        callid: null
    });
    if(this.bocallservice.formData.callid!=null)this.bocallservice.formData.callid=null;
for (let i=0;i<this.bocallservice.bocallinvitees.length;i++) {
this.bocallservice.bocallinvitees[i].inviteeid=null;
}
for (let i=0;i<this.bocallservice.bocallreminders.length;i++) {
this.bocallservice.bocallreminders[i].reminderid=null;
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
this.bocallForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="starttime")
this.bocallForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="enddate")
this.bocallForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="endtime")
this.bocallForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(key=="assignedto")
this.bocallForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.bocallForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bocallForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bocallForm.controls[key]!=undefined)this.bocallForm.controls[key].disable({onlySelf: true});
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
screenidonChange(evt:any){
let e=this.f.screenid.value as any;
this.bocallForm.patchValue({screeniddesc:evt.options[evt.options.selectedIndex].text});
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.bocallForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.bocallForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
durationonChange(evt:any){
let e=this.f.duration.value as any;
this.bocallForm.patchValue({durationdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.bocallservice.getbocallsByEID(pkcol).then(res => {

this.bocallservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bocall.callid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bocall.callid;
var starttimeTime=new Time( res.bocall.starttime);
var endtimeTime=new Time( res.bocall.endtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bocallForm.patchValue({
callid: res.bocall.callid,
screenid: res.bocall.screenid,
screeniddesc: res.bocall.screeniddesc,
relatedid: res.bocall.relatedid,
subject: res.bocall.subject,
type: res.bocall.type,
typedesc: res.bocall.typedesc,
category: res.bocall.category,
categorydesc: res.bocall.categorydesc,
startdate: this.ngbDateParserFormatter.parse(res.bocall.startdate),
starttime: starttimeTime,
enddate: this.ngbDateParserFormatter.parse(res.bocall.enddate),
endtime: endtimeTime,
duration: res.bocall.duration,
durationdesc: res.bocall.durationdesc,
description: res.bocall.description,
assignedto: JSON.parse(res.bocall.assignedto),
status: res.bocall.status,
statusdesc: res.bocall.statusdesc,
});
this.bocallinviteesvisiblelist=res.bocallinviteesvisiblelist;
this.bocallremindersvisiblelist=res.bocallremindersvisiblelist;
//Child Tables if any
this.bocallservice.bocallinvitees = res.bocallinvitees;
this.SetbocallinviteesTableConfig();
this.bocallinviteesLoadTable();
  setTimeout(() => {
  this.SetbocallinviteesTableddConfig();
  });
this.bocallservice.bocallreminders = res.bocallreminders;
this.SetbocallremindersTableConfig();
this.bocallremindersLoadTable();
  setTimeout(() => {
  this.SetbocallremindersTableddConfig();
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
  for (let key in this.bocallForm.controls) {
    if (this.bocallForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bocallForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bocallForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bocallForm.value;
obj.startdate=new Date(this.bocallForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocallForm.get('startdate').value)+'  UTC' :null);
obj.starttime=(this.bocallForm.get('starttime').value==null?0:this.bocallForm.get('starttime').value.hour)+':'+(this.bocallForm.get('starttime').value==null?0:this.bocallForm.get('starttime').value.minute+":00");
obj.enddate=new Date(this.bocallForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocallForm.get('enddate').value)+'  UTC' :null);
obj.endtime=(this.bocallForm.get('endtime').value==null?0:this.bocallForm.get('endtime').value.hour)+':'+(this.bocallForm.get('endtime').value==null?0:this.bocallForm.get('endtime').value.minute+":00");
obj.assignedto=JSON.stringify(this.bocallForm.get('assignedto').value);
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
Object.keys(this.bocallForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bocallForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bocallForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bocallservice.formData=this.bocallForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bocallForm.controls[key] != null)
    {
        this.bocallservice.formData[key] = this.bocallForm.controls[key].value;
    }
}
}
}
this.bocallservice.formData.startdate=new Date(this.bocallForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocallForm.get('startdate').value)+'  UTC' :null);
this.bocallservice.formData.starttime=(this.bocallForm.get('starttime').value==null?0:this.bocallForm.get('starttime').value.hour)+':'+(this.bocallForm.get('starttime').value==null?0:this.bocallForm.get('starttime').value.minute+":00");
this.bocallservice.formData.enddate=new Date(this.bocallForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocallForm.get('enddate').value)+'  UTC' :null);
this.bocallservice.formData.endtime=(this.bocallForm.get('endtime').value==null?0:this.bocallForm.get('endtime').value.hour)+':'+(this.bocallForm.get('endtime').value==null?0:this.bocallForm.get('endtime').value.minute+":00");
this.bocallservice.formData.assignedto=JSON.stringify(this.bocallForm.get('assignedto').value);
this.bocallservice.formData.DeletedbocallinviteIDs = this.DeletedbocallinviteIDs;
this.bocallservice.formData.DeletedbocallreminderIDs = this.DeletedbocallreminderIDs;
console.log(this.bocallservice.formData);
this.bocallservice.formData=this.bocallForm.value;
this.bocallservice.saveOrUpdatebocalls().subscribe(
async res => {
if (this.bocallinviteessource.data)
{
    for (let i = 0; i < this.bocallinviteessource.data.length; i++)
    {
        if (this.bocallinviteessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bocallinviteessource.data[i].fileattachmentlist);
    }
}
if (this.bocallreminderssource.data)
{
    for (let i = 0; i < this.bocallreminderssource.data.length; i++)
    {
        if (this.bocallreminderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bocallreminderssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bocall);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bocallservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bocall);
}
else
{
this.FillData(res);
}
}
this.bocallForm.markAsUntouched();
this.bocallForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbocallinvite(event:any,inviteeid:any, callid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bocallinviteComponent, 
{
data:  {  showview:this.showview,save:false,event,inviteeid, callid,visiblelist:this.bocallinviteesvisiblelist,  hidelist:this.bocallinviteeshidelist,ScreenType:2  },
header: 'Invitees'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bocallinviteessource.add(res);
this.bocallinviteessource.refresh();
}
else
{
this.bocallinviteessource.update(event.data, res);
}
}
});
}

onDeletebocallinvite(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbocallinviteIDs += childID + ",";
this.bocallservice.bocallinvitees.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditbocallreminder(event:any,reminderid:any, callid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bocallreminderComponent, 
{
data:  {  showview:this.showview,save:false,event,reminderid, callid,visiblelist:this.bocallremindersvisiblelist,  hidelist:this.bocallremindershidelist,ScreenType:2  },
header: 'Reminders'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bocallreminderssource.add(res);
this.bocallreminderssource.refresh();
}
else
{
this.bocallreminderssource.update(event.data, res);
}
}
});
}

onDeletebocallreminder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbocallreminderIDs += childID + ",";
this.bocallservice.bocallreminders.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bocallinvitees
bocallinviteessettings:any;
bocallinviteessource: any;

showbocallinviteesCheckbox()
{
debugger;
if(this.tblbocallinviteessource.settings['selectMode']== 'multi')this.tblbocallinviteessource.settings['selectMode']= 'single';
else
this.tblbocallinviteessource.settings['selectMode']= 'multi';
this.tblbocallinviteessource.initGrid();
}
deletebocallinviteesAll()
{
this.tblbocallinviteessource.settings['selectMode'] = 'single';
}
showbocallinviteesFilter()
{
  setTimeout(() => {
  this.SetbocallinviteesTableddConfig();
  });
      if(this.tblbocallinviteessource.settings!=null)this.tblbocallinviteessource.settings['hideSubHeader'] =!this.tblbocallinviteessource.settings['hideSubHeader'];
this.tblbocallinviteessource.initGrid();
}
showbocallinviteesInActive()
{
}
enablebocallinviteesInActive()
{
}
async SetbocallinviteesTableddConfig()
{
if(!this.bfilterPopulatebocallinvitees){
}
this.bfilterPopulatebocallinvitees=true;
}
async bocallinviteesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbocallinviteesTableConfig()
{
this.bocallinviteessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
firstname: {
title: 'First Name',
type: '',
filter:true,
},
lastname: {
title: 'Last Name',
type: '',
filter:true,
},
email: {
title: 'Email',
type: '',
filter:true,
},
mobile: {
title: 'Mobile',
type: '',
filter:true,
},
},
};
}
bocallinviteesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocallinviteesID)>=0)
{
this.bocallinviteessource=new LocalDataSource();
this.bocallinviteessource.load(this.bocallservice.bocallinvitees as  any as LocalDataSource);
this.bocallinviteessource.setPaging(1, 20, true);
}
}

//external to inline
/*
bocallinviteesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bocallservice.bocallinvitees.length == 0)
{
    this.tblbocallinviteessource.grid.createFormShown = true;
}
else
{
    let obj = new bocallinvite();
    this.bocallservice.bocallinvitees.push(obj);
    this.bocallinviteessource.refresh();
    if ((this.bocallservice.bocallinvitees.length / this.bocallinviteessource.getPaging().perPage).toFixed(0) + 1 != this.bocallinviteessource.getPaging().page)
    {
        this.bocallinviteessource.setPage((this.bocallservice.bocallinvitees.length / this.bocallinviteessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbocallinviteessource.grid.edit(this.tblbocallinviteessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bocallinviteessource.data.indexOf(event.data);
this.onDeletebocallinvite(event,event.data.inviteeid,((this.bocallinviteessource.getPaging().page-1) *this.bocallinviteessource.getPaging().perPage)+index);
this.bocallinviteessource.refresh();
break;
}
}

*/
bocallinviteesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbocallinvite(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbocallinvite(event,event.data.inviteeid,this.formid);
break;
case 'delete':
this.onDeletebocallinvite(event,event.data.inviteeid,((this.bocallinviteessource.getPaging().page-1) *this.bocallinviteessource.getPaging().perPage)+event.index);
this.bocallinviteessource.refresh();
break;
}
}
bocallinviteesonDelete(obj) {
let inviteeid=obj.data.inviteeid;
if (confirm('Are you sure to delete this record ?')) {
this.bocallservice.deletebocall(inviteeid).then(res=>
this.bocallinviteesLoadTable()
);
}
}
bocallinviteesPaging(val)
{
debugger;
this.bocallinviteessource.setPaging(1, val, true);
}

handlebocallinviteesGridSelected(event:any) {
this.bocallinviteesselectedindex=this.bocallservice.bocallinvitees.findIndex(i => i.inviteeid === event.data.inviteeid);
}
IsbocallinviteesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocallinviteesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bocallinvitees
//start of Grid Codes bocallreminders
bocallreminderssettings:any;
bocallreminderssource: any;

showbocallremindersCheckbox()
{
debugger;
if(this.tblbocallreminderssource.settings['selectMode']== 'multi')this.tblbocallreminderssource.settings['selectMode']= 'single';
else
this.tblbocallreminderssource.settings['selectMode']= 'multi';
this.tblbocallreminderssource.initGrid();
}
deletebocallremindersAll()
{
this.tblbocallreminderssource.settings['selectMode'] = 'single';
}
showbocallremindersFilter()
{
  setTimeout(() => {
  this.SetbocallremindersTableddConfig();
  });
      if(this.tblbocallreminderssource.settings!=null)this.tblbocallreminderssource.settings['hideSubHeader'] =!this.tblbocallreminderssource.settings['hideSubHeader'];
this.tblbocallreminderssource.initGrid();
}
showbocallremindersInActive()
{
}
enablebocallremindersInActive()
{
}
async SetbocallremindersTableddConfig()
{
if(!this.bfilterPopulatebocallreminders){

this.configservice.getList("screenid").then(res=>
{
var datascreenid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databocallremindersscreenid3.push(defaultobj);
for(let i=0; i<datascreenid2.length; i++){
var obj= { value: datascreenid2[i].configkey, title: datascreenid2[i].configtext};
this.databocallremindersscreenid3.push(obj);
}
var clone = this.sharedService.clone(this.tblbocallreminderssource.settings);
if(clone.columns['screenid']!=undefined)clone.columns['screenid'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databocallremindersscreenid3)), }, };
if(clone.columns['screenid']!=undefined)clone.columns['screenid'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databocallremindersscreenid3)), }, };
this.tblbocallreminderssource.settings =  clone;
this.tblbocallreminderssource.initGrid();
});
}
this.bfilterPopulatebocallreminders=true;
}
async bocallremindersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbocallremindersTableConfig()
{
this.bocallreminderssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
screenid: {
title: 'Screen',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databocallremindersscreenid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
relatedid: {
title: 'Related',
type: 'number',
filter:true,
},
remindertype: {
title: 'Reminder Type',
type: '',
filter:true,
},
emailinvitees: {
title: 'Email Invitees',
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
inviteesremindertime: {
title: 'Invitees Reminder Time',
type: '',
filter:true,
},
},
};
}
bocallremindersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocallremindersID)>=0)
{
this.bocallreminderssource=new LocalDataSource();
this.bocallreminderssource.load(this.bocallservice.bocallreminders as  any as LocalDataSource);
this.bocallreminderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bocallremindersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bocallservice.bocallreminders.length == 0)
{
    this.tblbocallreminderssource.grid.createFormShown = true;
}
else
{
    let obj = new bocallreminder();
    this.bocallservice.bocallreminders.push(obj);
    this.bocallreminderssource.refresh();
    if ((this.bocallservice.bocallreminders.length / this.bocallreminderssource.getPaging().perPage).toFixed(0) + 1 != this.bocallreminderssource.getPaging().page)
    {
        this.bocallreminderssource.setPage((this.bocallservice.bocallreminders.length / this.bocallreminderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbocallreminderssource.grid.edit(this.tblbocallreminderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bocallreminderssource.data.indexOf(event.data);
this.onDeletebocallreminder(event,event.data.reminderid,((this.bocallreminderssource.getPaging().page-1) *this.bocallreminderssource.getPaging().perPage)+index);
this.bocallreminderssource.refresh();
break;
}
}

*/
bocallremindersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbocallreminder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbocallreminder(event,event.data.reminderid,this.formid);
break;
case 'delete':
this.onDeletebocallreminder(event,event.data.reminderid,((this.bocallreminderssource.getPaging().page-1) *this.bocallreminderssource.getPaging().perPage)+event.index);
this.bocallreminderssource.refresh();
break;
}
}
bocallremindersonDelete(obj) {
let reminderid=obj.data.reminderid;
if (confirm('Are you sure to delete this record ?')) {
this.bocallservice.deletebocall(reminderid).then(res=>
this.bocallremindersLoadTable()
);
}
}
bocallremindersPaging(val)
{
debugger;
this.bocallreminderssource.setPaging(1, val, true);
}

handlebocallremindersGridSelected(event:any) {
this.bocallremindersselectedindex=this.bocallservice.bocallreminders.findIndex(i => i.reminderid === event.data.reminderid);
}
IsbocallremindersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bocallremindersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bocallreminders

}



