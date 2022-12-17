import { bomeetingService } from './../../../service/bomeeting.service';
import { bomeeting } from './../../../model/bomeeting.model';
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
import { bomeetinginvite } from './../../../model/bomeetinginvite.model';
//FK services
import { bomeetinginviteComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomeetinginvite/bomeetinginvite.component';
import { bomeetingreminder } from './../../../model/bomeetingreminder.model';
//FK services
import { bomeetingreminderComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomeetingreminder/bomeetingreminder.component';
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
selector: 'app-bomeeting',
templateUrl: './bomeeting.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bomeetingComponent implements OnInit {
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
bfilterPopulatebomeetings:boolean=false;
databomeetingscategory3:any=[];
databomeetingsduration3:any=[];
bfilterPopulatebomeetinginvitees:boolean=false;
databomeetingremindersreminder3:any=[];
databomeetingremindersscreenid3:any=[];
bfilterPopulatebomeetingreminders:boolean=false;
@ViewChild('tblbomeetinginviteessource',{static:false}) tblbomeetinginviteessource: Ng2SmartTableComponent;
@ViewChild('tblbomeetingreminderssource',{static:false}) tblbomeetingreminderssource: Ng2SmartTableComponent;
 bomeetingForm: FormGroup;
categoryList: boconfigvalue[];
durationList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



bomeetinginviteesvisiblelist:any;
bomeetinginviteeshidelist:any;
bomeetingremindersvisiblelist:any;
bomeetingremindershidelist:any;

DeletedbomeetinginviteIDs: string="";
bomeetinginviteesID: string = "1";
bomeetinginviteesselectedindex:any;
DeletedbomeetingreminderIDs: string="";
bomeetingremindersID: string = "2";
bomeetingremindersselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bomeetingservice: bomeetingService,
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
this.bomeetingForm  = this.fb.group({pk:[null],meetingid: [null],
sourcefield: [null],
sourcereference: [null],
relatedid: [null],
subject: [null],
purpose: [null],
goal: [null],
category: [null],
categorydesc: [null],
startdate: [null],
starttime: [null],
enddate: [null],
endtime: [null],
duration: [null],
durationdesc: [null],
locationid: [null],
location: [null],
description: [null],
assignedto: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bomeetingForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bomeetingForm.dirty && this.bomeetingForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.meetingid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.meetingid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.meetingid && pkDetail) {
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
let bomeetingid = null;

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
this.formid=bomeetingid;
//this.sharedService.alert(bomeetingid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbomeetinginviteesTableConfig();
  setTimeout(() => {
  this.SetbomeetinginviteesTableddConfig();
  });

this.SetbomeetingremindersTableConfig();
  setTimeout(() => {
  this.SetbomeetingremindersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("callcategory").then(res => this.categoryList = res as boconfigvalue[]);
this.configservice.getList("duration").then(res => this.durationList = res as boconfigvalue[]);

//autocomplete
    this.bomeetingservice.getbomeetingsList().then(res => {
      this.pkList = res as bomeeting[];
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
this.bomeetingForm.markAsUntouched();
this.bomeetingForm.markAsPristine();
}



resetForm() {
if (this.bomeetingForm != null)
this.bomeetingForm.reset();
this.bomeetingForm.patchValue({
});
setTimeout(() => {
this.bomeetingservice.bomeetinginvitees=[];
this.bomeetinginviteesLoadTable();
this.bomeetingservice.bomeetingreminders=[];
this.bomeetingremindersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
    if(this.data!=null)
    {
            this.bomeetingForm.patchValue({
                sourcefield: this.data.sourcefield,                sourcereference: this.data.sourcereference            });    }
}

    onDelete() {
        let meetingid = this.bomeetingForm.get('meetingid').value;
        if(meetingid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bomeetingservice.deletebomeeting(meetingid).then(res =>
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
    this.bomeetingForm.patchValue({
        meetingid: null
    });
    if(this.bomeetingservice.formData.meetingid!=null)this.bomeetingservice.formData.meetingid=null;
for (let i=0;i<this.bomeetingservice.bomeetinginvitees.length;i++) {
this.bomeetingservice.bomeetinginvitees[i].inviteeid=null;
}
for (let i=0;i<this.bomeetingservice.bomeetingreminders.length;i++) {
this.bomeetingservice.bomeetingreminders[i].reminderid=null;
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
this.bomeetingForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="starttime")
this.bomeetingForm.patchValue({"starttime":new Time(mainscreendata[key]) });
        else if(key=="enddate")
this.bomeetingForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="endtime")
this.bomeetingForm.patchValue({"endtime":new Time(mainscreendata[key]) });
        else if(key=="assignedto")
this.bomeetingForm.patchValue({"assignedto":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.bomeetingForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bomeetingForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bomeetingForm.controls[key]!=undefined)this.bomeetingForm.controls[key].disable({onlySelf: true});
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
categoryonChange(evt:any){
let e=this.f.category.value as any;
this.bomeetingForm.patchValue({categorydesc:evt.options[evt.options.selectedIndex].text});
}
durationonChange(evt:any){
let e=this.f.duration.value as any;
this.bomeetingForm.patchValue({durationdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.bomeetingservice.getbomeetingsByEID(pkcol).then(res => {

this.bomeetingservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.bomeeting.meetingid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.bomeeting.meetingid;
var starttimeTime=new Time( res.bomeeting.starttime);
var endtimeTime=new Time( res.bomeeting.endtime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bomeetingForm.patchValue({
meetingid: res.bomeeting.meetingid,
sourcefield: res.bomeeting.sourcefield,
sourcereference: res.bomeeting.sourcereference,
relatedid: res.bomeeting.relatedid,
subject: res.bomeeting.subject,
purpose: res.bomeeting.purpose,
goal: res.bomeeting.goal,
category: res.bomeeting.category,
categorydesc: res.bomeeting.categorydesc,
startdate: this.ngbDateParserFormatter.parse(res.bomeeting.startdate),
starttime: starttimeTime,
enddate: this.ngbDateParserFormatter.parse(res.bomeeting.enddate),
endtime: endtimeTime,
duration: res.bomeeting.duration,
durationdesc: res.bomeeting.durationdesc,
locationid: res.bomeeting.locationid,
location: res.bomeeting.location,
description: res.bomeeting.description,
assignedto: JSON.parse(res.bomeeting.assignedto),
status: res.bomeeting.status,
statusdesc: res.bomeeting.statusdesc,
});
this.bomeetinginviteesvisiblelist=res.bomeetinginviteesvisiblelist;
this.bomeetingremindersvisiblelist=res.bomeetingremindersvisiblelist;
//Child Tables if any
this.bomeetingservice.bomeetinginvitees = res.bomeetinginvitees;
this.SetbomeetinginviteesTableConfig();
this.bomeetinginviteesLoadTable();
  setTimeout(() => {
  this.SetbomeetinginviteesTableddConfig();
  });
this.bomeetingservice.bomeetingreminders = res.bomeetingreminders;
this.SetbomeetingremindersTableConfig();
this.bomeetingremindersLoadTable();
  setTimeout(() => {
  this.SetbomeetingremindersTableddConfig();
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
  for (let key in this.bomeetingForm.controls) {
    if (this.bomeetingForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bomeetingForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.bomeetingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bomeetingForm.value;
obj.startdate=new Date(this.bomeetingForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.bomeetingForm.get('startdate').value)+'  UTC' :null);
obj.starttime=(this.bomeetingForm.get('starttime').value==null?0:this.bomeetingForm.get('starttime').value.hour)+':'+(this.bomeetingForm.get('starttime').value==null?0:this.bomeetingForm.get('starttime').value.minute+":00");
obj.enddate=new Date(this.bomeetingForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.bomeetingForm.get('enddate').value)+'  UTC' :null);
obj.endtime=(this.bomeetingForm.get('endtime').value==null?0:this.bomeetingForm.get('endtime').value.hour)+':'+(this.bomeetingForm.get('endtime').value==null?0:this.bomeetingForm.get('endtime').value.minute+":00");
obj.assignedto=JSON.stringify(this.bomeetingForm.get('assignedto').value);
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
Object.keys(this.bomeetingForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bomeetingForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bomeetingForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bomeetingservice.formData=this.bomeetingForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bomeetingForm.controls[key] != null)
    {
        this.bomeetingservice.formData[key] = this.bomeetingForm.controls[key].value;
    }
}
}
}
this.bomeetingservice.formData.startdate=new Date(this.bomeetingForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.bomeetingForm.get('startdate').value)+'  UTC' :null);
this.bomeetingservice.formData.starttime=(this.bomeetingForm.get('starttime').value==null?0:this.bomeetingForm.get('starttime').value.hour)+':'+(this.bomeetingForm.get('starttime').value==null?0:this.bomeetingForm.get('starttime').value.minute+":00");
this.bomeetingservice.formData.enddate=new Date(this.bomeetingForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.bomeetingForm.get('enddate').value)+'  UTC' :null);
this.bomeetingservice.formData.endtime=(this.bomeetingForm.get('endtime').value==null?0:this.bomeetingForm.get('endtime').value.hour)+':'+(this.bomeetingForm.get('endtime').value==null?0:this.bomeetingForm.get('endtime').value.minute+":00");
this.bomeetingservice.formData.assignedto=JSON.stringify(this.bomeetingForm.get('assignedto').value);
this.bomeetingservice.formData.DeletedbomeetinginviteIDs = this.DeletedbomeetinginviteIDs;
this.bomeetingservice.formData.DeletedbomeetingreminderIDs = this.DeletedbomeetingreminderIDs;
console.log(this.bomeetingservice.formData);
this.bomeetingservice.formData=this.bomeetingForm.value;
this.bomeetingservice.saveOrUpdatebomeetings().subscribe(
async res => {
if (this.bomeetinginviteessource.data)
{
    for (let i = 0; i < this.bomeetinginviteessource.data.length; i++)
    {
        if (this.bomeetinginviteessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bomeetinginviteessource.data[i].fileattachmentlist);
    }
}
if (this.bomeetingreminderssource.data)
{
    for (let i = 0; i < this.bomeetingreminderssource.data.length; i++)
    {
        if (this.bomeetingreminderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.bomeetingreminderssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.bomeeting);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.bomeetingservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.bomeeting);
}
else
{
this.FillData(res);
}
}
this.bomeetingForm.markAsUntouched();
this.bomeetingForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbomeetinginvite(event:any,inviteeid:any, meetingid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bomeetinginviteComponent, 
{
data:  {  showview:this.showview,save:false,event,inviteeid, meetingid,visiblelist:this.bomeetinginviteesvisiblelist,  hidelist:this.bomeetinginviteeshidelist,ScreenType:2  },
header: 'Invitees'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bomeetinginviteessource.add(res);
this.bomeetinginviteessource.refresh();
}
else
{
this.bomeetinginviteessource.update(event.data, res);
}
}
});
}

onDeletebomeetinginvite(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbomeetinginviteIDs += childID + ",";
this.bomeetingservice.bomeetinginvitees.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditbomeetingreminder(event:any,reminderid:any, meetingid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(bomeetingreminderComponent, 
{
data:  {  showview:this.showview,save:false,event,reminderid, meetingid,visiblelist:this.bomeetingremindersvisiblelist,  hidelist:this.bomeetingremindershidelist,ScreenType:2  },
header: 'Reminders'
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.bomeetingreminderssource.add(res);
this.bomeetingreminderssource.refresh();
}
else
{
this.bomeetingreminderssource.update(event.data, res);
}
}
});
}

onDeletebomeetingreminder(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbomeetingreminderIDs += childID + ",";
this.bomeetingservice.bomeetingreminders.splice(i, 1);
//this.updateGrandTotal();
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bomeetinginvitees
bomeetinginviteessettings:any;
bomeetinginviteessource: any;

showbomeetinginviteesCheckbox()
{
debugger;
if(this.tblbomeetinginviteessource.settings['selectMode']== 'multi')this.tblbomeetinginviteessource.settings['selectMode']= 'single';
else
this.tblbomeetinginviteessource.settings['selectMode']= 'multi';
this.tblbomeetinginviteessource.initGrid();
}
deletebomeetinginviteesAll()
{
this.tblbomeetinginviteessource.settings['selectMode'] = 'single';
}
showbomeetinginviteesFilter()
{
  setTimeout(() => {
  this.SetbomeetinginviteesTableddConfig();
  });
      if(this.tblbomeetinginviteessource.settings!=null)this.tblbomeetinginviteessource.settings['hideSubHeader'] =!this.tblbomeetinginviteessource.settings['hideSubHeader'];
this.tblbomeetinginviteessource.initGrid();
}
showbomeetinginviteesInActive()
{
}
enablebomeetinginviteesInActive()
{
}
async SetbomeetinginviteesTableddConfig()
{
if(!this.bfilterPopulatebomeetinginvitees){
}
this.bfilterPopulatebomeetinginvitees=true;
}
async bomeetinginviteesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbomeetinginviteesTableConfig()
{
this.bomeetinginviteessettings = {
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
bomeetinginviteesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomeetinginviteesID)>=0)
{
this.bomeetinginviteessource=new LocalDataSource();
this.bomeetinginviteessource.load(this.bomeetingservice.bomeetinginvitees as  any as LocalDataSource);
this.bomeetinginviteessource.setPaging(1, 20, true);
}
}

//external to inline
/*
bomeetinginviteesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bomeetingservice.bomeetinginvitees.length == 0)
{
    this.tblbomeetinginviteessource.grid.createFormShown = true;
}
else
{
    let obj = new bomeetinginvite();
    this.bomeetingservice.bomeetinginvitees.push(obj);
    this.bomeetinginviteessource.refresh();
    if ((this.bomeetingservice.bomeetinginvitees.length / this.bomeetinginviteessource.getPaging().perPage).toFixed(0) + 1 != this.bomeetinginviteessource.getPaging().page)
    {
        this.bomeetinginviteessource.setPage((this.bomeetingservice.bomeetinginvitees.length / this.bomeetinginviteessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbomeetinginviteessource.grid.edit(this.tblbomeetinginviteessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bomeetinginviteessource.data.indexOf(event.data);
this.onDeletebomeetinginvite(event,event.data.inviteeid,((this.bomeetinginviteessource.getPaging().page-1) *this.bomeetinginviteessource.getPaging().perPage)+index);
this.bomeetinginviteessource.refresh();
break;
}
}

*/
bomeetinginviteesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbomeetinginvite(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbomeetinginvite(event,event.data.inviteeid,this.formid);
break;
case 'delete':
this.onDeletebomeetinginvite(event,event.data.inviteeid,((this.bomeetinginviteessource.getPaging().page-1) *this.bomeetinginviteessource.getPaging().perPage)+event.index);
this.bomeetinginviteessource.refresh();
break;
}
}
bomeetinginviteesonDelete(obj) {
let inviteeid=obj.data.inviteeid;
if (confirm('Are you sure to delete this record ?')) {
this.bomeetingservice.deletebomeeting(inviteeid).then(res=>
this.bomeetinginviteesLoadTable()
);
}
}
bomeetinginviteesPaging(val)
{
debugger;
this.bomeetinginviteessource.setPaging(1, val, true);
}

handlebomeetinginviteesGridSelected(event:any) {
this.bomeetinginviteesselectedindex=this.bomeetingservice.bomeetinginvitees.findIndex(i => i.inviteeid === event.data.inviteeid);
}
IsbomeetinginviteesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomeetinginviteesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bomeetinginvitees
//start of Grid Codes bomeetingreminders
bomeetingreminderssettings:any;
bomeetingreminderssource: any;

showbomeetingremindersCheckbox()
{
debugger;
if(this.tblbomeetingreminderssource.settings['selectMode']== 'multi')this.tblbomeetingreminderssource.settings['selectMode']= 'single';
else
this.tblbomeetingreminderssource.settings['selectMode']= 'multi';
this.tblbomeetingreminderssource.initGrid();
}
deletebomeetingremindersAll()
{
this.tblbomeetingreminderssource.settings['selectMode'] = 'single';
}
showbomeetingremindersFilter()
{
  setTimeout(() => {
  this.SetbomeetingremindersTableddConfig();
  });
      if(this.tblbomeetingreminderssource.settings!=null)this.tblbomeetingreminderssource.settings['hideSubHeader'] =!this.tblbomeetingreminderssource.settings['hideSubHeader'];
this.tblbomeetingreminderssource.initGrid();
}
showbomeetingremindersInActive()
{
}
enablebomeetingremindersInActive()
{
}
async SetbomeetingremindersTableddConfig()
{
if(!this.bfilterPopulatebomeetingreminders){

this.configservice.getList("screenid").then(res=>
{
var datascreenid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databomeetingremindersscreenid3.push(defaultobj);
for(let i=0; i<datascreenid2.length; i++){
var obj= { value: datascreenid2[i].configkey, title: datascreenid2[i].configtext};
this.databomeetingremindersscreenid3.push(obj);
}
var clone = this.sharedService.clone(this.tblbomeetingreminderssource.settings);
if(clone.columns['screenid']!=undefined)clone.columns['screenid'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomeetingremindersscreenid3)), }, };
if(clone.columns['screenid']!=undefined)clone.columns['screenid'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomeetingremindersscreenid3)), }, };
this.tblbomeetingreminderssource.settings =  clone;
this.tblbomeetingreminderssource.initGrid();
});

this.configservice.getList("reminder").then(res=>
{
var datareminder2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databomeetingremindersreminder3.push(defaultobj);
for(let i=0; i<datareminder2.length; i++){
var obj= { value: datareminder2[i].configkey, title: datareminder2[i].configtext};
this.databomeetingremindersreminder3.push(obj);
}
var clone = this.sharedService.clone(this.tblbomeetingreminderssource.settings);
if(clone.columns['reminder']!=undefined)clone.columns['reminder'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomeetingremindersreminder3)), }, };
if(clone.columns['reminder']!=undefined)clone.columns['reminder'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databomeetingremindersreminder3)), }, };
this.tblbomeetingreminderssource.settings =  clone;
this.tblbomeetingreminderssource.initGrid();
});
}
this.bfilterPopulatebomeetingreminders=true;
}
async bomeetingremindersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbomeetingremindersTableConfig()
{
this.bomeetingreminderssettings = {
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
var element= this.databomeetingremindersscreenid3.find(c=>c.value==cell);
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
reminder: {
title: 'Reminder',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.databomeetingremindersreminder3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
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
bomeetingremindersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomeetingremindersID)>=0)
{
this.bomeetingreminderssource=new LocalDataSource();
this.bomeetingreminderssource.load(this.bomeetingservice.bomeetingreminders as  any as LocalDataSource);
this.bomeetingreminderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
bomeetingremindersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.bomeetingservice.bomeetingreminders.length == 0)
{
    this.tblbomeetingreminderssource.grid.createFormShown = true;
}
else
{
    let obj = new bomeetingreminder();
    this.bomeetingservice.bomeetingreminders.push(obj);
    this.bomeetingreminderssource.refresh();
    if ((this.bomeetingservice.bomeetingreminders.length / this.bomeetingreminderssource.getPaging().perPage).toFixed(0) + 1 != this.bomeetingreminderssource.getPaging().page)
    {
        this.bomeetingreminderssource.setPage((this.bomeetingservice.bomeetingreminders.length / this.bomeetingreminderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbomeetingreminderssource.grid.edit(this.tblbomeetingreminderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bomeetingreminderssource.data.indexOf(event.data);
this.onDeletebomeetingreminder(event,event.data.reminderid,((this.bomeetingreminderssource.getPaging().page-1) *this.bomeetingreminderssource.getPaging().perPage)+index);
this.bomeetingreminderssource.refresh();
break;
}
}

*/
bomeetingremindersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbomeetingreminder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbomeetingreminder(event,event.data.reminderid,this.formid);
break;
case 'delete':
this.onDeletebomeetingreminder(event,event.data.reminderid,((this.bomeetingreminderssource.getPaging().page-1) *this.bomeetingreminderssource.getPaging().perPage)+event.index);
this.bomeetingreminderssource.refresh();
break;
}
}
bomeetingremindersonDelete(obj) {
let reminderid=obj.data.reminderid;
if (confirm('Are you sure to delete this record ?')) {
this.bomeetingservice.deletebomeeting(reminderid).then(res=>
this.bomeetingremindersLoadTable()
);
}
}
bomeetingremindersPaging(val)
{
debugger;
this.bomeetingreminderssource.setPaging(1, val, true);
}

handlebomeetingremindersGridSelected(event:any) {
this.bomeetingremindersselectedindex=this.bomeetingservice.bomeetingreminders.findIndex(i => i.reminderid === event.data.reminderid);
}
IsbomeetingremindersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bomeetingremindersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bomeetingreminders

}



