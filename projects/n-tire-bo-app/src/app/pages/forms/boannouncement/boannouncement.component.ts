import { boannouncementService } from './../../../service/boannouncement.service';
import { boannouncement } from './../../../model/boannouncement.model';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-boannouncement',
templateUrl: './boannouncement.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boannouncementComponent implements OnInit {
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
bfilterPopulateboannouncements:boolean=false;
databoannouncementsannouncementtype3:any=[];
databoannouncementspriority3:any=[];
databoannouncementsservices3:any=[];
databoannouncementsaccessibility3:any=[];
 boannouncementForm: FormGroup;
announcementtypeList: boconfigvalue[];
priorityList: boconfigvalue[];
servicesList: boconfigvalue[];
accessibilityList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;






constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boannouncementservice: boannouncementService,
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
this.boannouncementForm  = this.fb.group({pk:[null],announcementid: [null],
title: [null],
description: [null],
scheduledfromdate: [null],
scheduledfromtime: [null],
scheduledtodate: [null],
scheduledtotime: [null],
announcementtype: [null],
announcementtypedesc: [null],
priority: [null],
prioritydesc: [null],
services: [null],
servicesdesc: [null],
emailusers: [null],
accessibility: [null],
accessibilitydesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boannouncementForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boannouncementForm.dirty && this.boannouncementForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.announcementid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.announcementid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.announcementid && pkDetail) {
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
let boannouncementid = null;

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
this.formid=boannouncementid;
//this.sharedService.alert(boannouncementid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("announcementtype").then(res => this.announcementtypeList = res as boconfigvalue[]);
this.configservice.getList("priority").then(res => this.priorityList = res as boconfigvalue[]);
this.configservice.getList("services").then(res => this.servicesList = res as boconfigvalue[]);
this.configservice.getList("accessibility").then(res => this.accessibilityList = res as boconfigvalue[]);

//autocomplete
    this.boannouncementservice.getboannouncementsList().then(res => {
      this.pkList = res as boannouncement[];
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
this.boannouncementForm.markAsUntouched();
this.boannouncementForm.markAsPristine();
}



resetForm() {
if (this.boannouncementForm != null)
this.boannouncementForm.reset();
this.boannouncementForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let announcementid = this.boannouncementForm.get('announcementid').value;
        if(announcementid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boannouncementservice.deleteboannouncement(announcementid).then(res =>
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
    this.boannouncementForm.patchValue({
        announcementid: null
    });
    if(this.boannouncementservice.formData.announcementid!=null)this.boannouncementservice.formData.announcementid=null;
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
        else if(key=="scheduledfromdate")
this.boannouncementForm.patchValue({"scheduledfromdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="scheduledfromtime")
this.boannouncementForm.patchValue({"scheduledfromtime":new Time(mainscreendata[key]) });
        else if(key=="scheduledtodate")
this.boannouncementForm.patchValue({"scheduledtodate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="scheduledtotime")
this.boannouncementForm.patchValue({"scheduledtotime":new Time(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.boannouncementForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boannouncementForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boannouncementForm.controls[key]!=undefined)this.boannouncementForm.controls[key].disable({onlySelf: true});
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
announcementtypeonChange(evt:any){
let e=this.f.announcementtype.value as any;
this.boannouncementForm.patchValue({announcementtypedesc:evt.options[evt.options.selectedIndex].text});
}
priorityonChange(evt:any){
let e=this.f.priority.value as any;
this.boannouncementForm.patchValue({prioritydesc:evt.options[evt.options.selectedIndex].text});
}
servicesonChange(evt:any){
let e=this.f.services.value as any;
this.boannouncementForm.patchValue({servicesdesc:evt.options[evt.options.selectedIndex].text});
}
accessibilityonChange(evt:any){
let e=this.f.accessibility.value as any;
this.boannouncementForm.patchValue({accessibilitydesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.boannouncementservice.getboannouncementsByEID(pkcol).then(res => {

this.boannouncementservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boannouncement.announcementid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boannouncement.announcementid;
var scheduledfromtimeTime=new Time( res.boannouncement.scheduledfromtime);
var scheduledtotimeTime=new Time( res.boannouncement.scheduledtotime);
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boannouncementForm.patchValue({
announcementid: res.boannouncement.announcementid,
title: res.boannouncement.title,
description: res.boannouncement.description,
scheduledfromdate: this.ngbDateParserFormatter.parse(res.boannouncement.scheduledfromdate),
scheduledfromtime: scheduledfromtimeTime,
scheduledtodate: this.ngbDateParserFormatter.parse(res.boannouncement.scheduledtodate),
scheduledtotime: scheduledtotimeTime,
announcementtype: res.boannouncement.announcementtype,
announcementtypedesc: res.boannouncement.announcementtypedesc,
priority: res.boannouncement.priority,
prioritydesc: res.boannouncement.prioritydesc,
services: res.boannouncement.services,
servicesdesc: res.boannouncement.servicesdesc,
emailusers: res.boannouncement.emailusers,
accessibility: res.boannouncement.accessibility,
accessibilitydesc: res.boannouncement.accessibilitydesc,
status: res.boannouncement.status,
statusdesc: res.boannouncement.statusdesc,
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
  for (let key in this.boannouncementForm.controls) {
    if (this.boannouncementForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boannouncementForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boannouncementForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boannouncementForm.value;
obj.scheduledfromdate=new Date(this.boannouncementForm.get('scheduledfromdate').value ? this.ngbDateParserFormatter.format(this.boannouncementForm.get('scheduledfromdate').value)+'  UTC' :null);
obj.scheduledfromtime=(this.boannouncementForm.get('scheduledfromtime').value==null?0:this.boannouncementForm.get('scheduledfromtime').value.hour)+':'+(this.boannouncementForm.get('scheduledfromtime').value==null?0:this.boannouncementForm.get('scheduledfromtime').value.minute+":00");
obj.scheduledtodate=new Date(this.boannouncementForm.get('scheduledtodate').value ? this.ngbDateParserFormatter.format(this.boannouncementForm.get('scheduledtodate').value)+'  UTC' :null);
obj.scheduledtotime=(this.boannouncementForm.get('scheduledtotime').value==null?0:this.boannouncementForm.get('scheduledtotime').value.hour)+':'+(this.boannouncementForm.get('scheduledtotime').value==null?0:this.boannouncementForm.get('scheduledtotime').value.minute+":00");
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
Object.keys(this.boannouncementForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boannouncementForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boannouncementForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boannouncementservice.formData=this.boannouncementForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boannouncementForm.controls[key] != null)
    {
        this.boannouncementservice.formData[key] = this.boannouncementForm.controls[key].value;
    }
}
}
}
this.boannouncementservice.formData.scheduledfromdate=new Date(this.boannouncementForm.get('scheduledfromdate').value ? this.ngbDateParserFormatter.format(this.boannouncementForm.get('scheduledfromdate').value)+'  UTC' :null);
this.boannouncementservice.formData.scheduledfromtime=(this.boannouncementForm.get('scheduledfromtime').value==null?0:this.boannouncementForm.get('scheduledfromtime').value.hour)+':'+(this.boannouncementForm.get('scheduledfromtime').value==null?0:this.boannouncementForm.get('scheduledfromtime').value.minute+":00");
this.boannouncementservice.formData.scheduledtodate=new Date(this.boannouncementForm.get('scheduledtodate').value ? this.ngbDateParserFormatter.format(this.boannouncementForm.get('scheduledtodate').value)+'  UTC' :null);
this.boannouncementservice.formData.scheduledtotime=(this.boannouncementForm.get('scheduledtotime').value==null?0:this.boannouncementForm.get('scheduledtotime').value.hour)+':'+(this.boannouncementForm.get('scheduledtotime').value==null?0:this.boannouncementForm.get('scheduledtotime').value.minute+":00");
console.log(this.boannouncementservice.formData);
this.boannouncementservice.formData=this.boannouncementForm.value;
this.boannouncementservice.saveOrUpdateboannouncements().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boannouncement);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boannouncementservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boannouncement);
}
else
{
this.FillData(res);
}
}
this.boannouncementForm.markAsUntouched();
this.boannouncementForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



