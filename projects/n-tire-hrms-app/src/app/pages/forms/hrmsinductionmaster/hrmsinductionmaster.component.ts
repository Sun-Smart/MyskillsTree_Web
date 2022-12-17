import { hrmsinductionmasterService } from './../../../service/hrmsinductionmaster.service';
import { hrmsinductionmaster } from './../../../model/hrmsinductionmaster.model';
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
import { hrmsinductionemployee } from './../../../model/hrmsinductionemployee.model';
import { hrmsinductionemployeeComponent } from './../../../pages/forms/hrmsinductionemployee/hrmsinductionemployee.component';
//FK services
import { hrmsemployee,IhrmsemployeeResponse } from './../../../model/hrmsemployee.model';
import { hrmsemployeeComponent } from './../../../pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { hrmsinductionschedule } from './../../../model/hrmsinductionschedule.model';
import { hrmsinductionscheduleComponent } from './../../../pages/forms/hrmsinductionschedule/hrmsinductionschedule.component';
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
selector: 'app-hrmsinductionmaster',
templateUrl: './hrmsinductionmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsinductionmasterComponent implements OnInit {
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
bfilterPopulatehrmsinductionmasters:boolean=false;
datahrmsinductionemployeesemployeeid3:any=[];
bfilterPopulatehrmsinductionemployees:boolean=false;
bfilterPopulatehrmsinductionschedules:boolean=false;
@ViewChild('tblhrmsinductionemployeessource',{static:false}) tblhrmsinductionemployeessource: Ng2SmartTableComponent;
@ViewChild('tblhrmsinductionschedulessource',{static:false}) tblhrmsinductionschedulessource: Ng2SmartTableComponent;
 hrmsinductionmasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsinductionmastershowOption:boolean;
hrmsinductionemployeeshowOption:boolean;
hrmsinductionscheduleshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsinductionemployeesvisiblelist:any;
hrmsinductionemployeeshidelist:any;
hrmsinductionschedulesvisiblelist:any;
hrmsinductionscheduleshidelist:any;

DeletedhrmsinductionemployeeIDs: string="";
hrmsinductionemployeesID: string = "1";
hrmsinductionemployeesselectedindex:any;
DeletedhrmsinductionscheduleIDs: string="";
hrmsinductionschedulesID: string = "2";
hrmsinductionschedulesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsinductionmasterservice: hrmsinductionmasterService,
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
this.hrmsinductionmasterForm  = this.fb.group({
pk:[null],
inductionmasterid: [null],
inductiontopic: [null],
copyfrom: [null],
startdate: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsinductionmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsinductionmasterForm.dirty && this.hrmsinductionmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.inductionmasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.inductionmasterid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.inductionmasterid && pkDetail) {
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
let hrmsinductionmasterid = null;

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
this.formid=hrmsinductionmasterid;
//this.sharedService.alert(hrmsinductionmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsinductionemployeesTableConfig();
  setTimeout(() => {
  this.SethrmsinductionemployeesTableddConfig();
  });

this.SethrmsinductionschedulesTableConfig();
  setTimeout(() => {
  this.SethrmsinductionschedulesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmsinductionmasterservice.gethrmsinductionmastersList().then(res => {
      this.pkList = res as hrmsinductionmaster[];
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
this.hrmsinductionmasterForm.markAsUntouched();
this.hrmsinductionmasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsinductionmasterForm != null)
this.hrmsinductionmasterForm.reset();
this.hrmsinductionmasterForm.patchValue({
});
setTimeout(() => {
this.hrmsinductionmasterservice.hrmsinductionemployees=[];
this.hrmsinductionemployeesLoadTable();
this.hrmsinductionmasterservice.hrmsinductionschedules=[];
this.hrmsinductionschedulesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let inductionmasterid = this.hrmsinductionmasterForm.get('inductionmasterid').value;
        if(inductionmasterid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsinductionmasterservice.deletehrmsinductionmaster(inductionmasterid).then(res =>
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
    this.hrmsinductionmasterForm.patchValue({
        inductionmasterid: null
    });
    if(this.hrmsinductionmasterservice.formData.inductionmasterid!=null)this.hrmsinductionmasterservice.formData.inductionmasterid=null;
for (let i=0;i<this.hrmsinductionmasterservice.hrmsinductionemployees.length;i++) {
this.hrmsinductionmasterservice.hrmsinductionemployees[i].employeeinductionid=null;
}
for (let i=0;i<this.hrmsinductionmasterservice.hrmsinductionschedules.length;i++) {
this.hrmsinductionmasterservice.hrmsinductionschedules[i].scheduleid=null;
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
this.hrmsinductionmasterForm.patchValue({"startdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsinductionmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsinductionmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsinductionmasterForm.controls[key]!=undefined)
{
this.hrmsinductionmasterForm.controls[key].disable({onlySelf: true});
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

edithrmsinductionmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsinductionmasterservice.gethrmsinductionmastersByEID(pkcol).then(res => {

this.hrmsinductionmasterservice.formData=res.hrmsinductionmaster;
let formproperty=res.hrmsinductionmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsinductionmaster.pkcol;
this.formid=res.hrmsinductionmaster.inductionmasterid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsinductionmaster.inductionmasterid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsinductionmasterForm.patchValue({
inductionmasterid: res.hrmsinductionmaster.inductionmasterid,
inductiontopic: res.hrmsinductionmaster.inductiontopic,
copyfrom: res.hrmsinductionmaster.copyfrom,
startdate: this.ngbDateParserFormatter.parse(res.hrmsinductionmaster.startdate),
status: res.hrmsinductionmaster.status,
statusdesc: res.hrmsinductionmaster.statusdesc,
});
this.hrmsinductionemployeesvisiblelist=res.hrmsinductionemployeesvisiblelist;
this.hrmsinductionschedulesvisiblelist=res.hrmsinductionschedulesvisiblelist;
//Child Tables if any
this.hrmsinductionmasterservice.hrmsinductionemployees = res.hrmsinductionemployees;
this.SethrmsinductionemployeesTableConfig();
this.hrmsinductionemployeesLoadTable();
  setTimeout(() => {
  this.SethrmsinductionemployeesTableddConfig();
  });
this.hrmsinductionmasterservice.hrmsinductionschedules = res.hrmsinductionschedules;
this.SethrmsinductionschedulesTableConfig();
this.hrmsinductionschedulesLoadTable();
  setTimeout(() => {
  this.SethrmsinductionschedulesTableddConfig();
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
  for (let key in this.hrmsinductionmasterForm.controls) {
    if (this.hrmsinductionmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsinductionmasterservice.formData!=null && this.hrmsinductionmasterservice.formData[key]!=null  && this.hrmsinductionmasterservice.formData[key]!='[]' && this.hrmsinductionmasterservice.formData[key]!=undefined && this.hrmsinductionmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsinductionmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsinductionmasterservice.formData!=null && this.hrmsinductionmasterservice.formData[key]!=null   && this.hrmsinductionmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsinductionmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsinductionmasterservice.formData!=null && this.hrmsinductionmasterservice.formData[key]!=null   && this.hrmsinductionmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsinductionmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsinductionmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsinductionmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsinductionmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsinductionmasterForm.value;
obj.startdate=new Date(this.hrmsinductionmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hrmsinductionmasterForm.get('startdate').value)+'  UTC' :null);
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

private hrmsinductionmastertoggleOption(){
this.hrmsinductionmastershowOption = this.hrmsinductionmastershowOption === true ? false : true;
}

private hrmsinductionemployeetoggleOption(){
this.hrmsinductionemployeeshowOption = this.hrmsinductionemployeeshowOption === true ? false : true;
}

private hrmsinductionscheduletoggleOption(){
this.hrmsinductionscheduleshowOption = this.hrmsinductionscheduleshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsinductionmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsinductionmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsinductionmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsinductionmasterservice.formData=this.hrmsinductionmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsinductionmasterForm.controls[key] != null)
    {
        this.hrmsinductionmasterservice.formData[key] = this.hrmsinductionmasterForm.controls[key].value;
    }
}
}
}
this.hrmsinductionmasterservice.formData.startdate=new Date(this.hrmsinductionmasterForm.get('startdate').value ? this.ngbDateParserFormatter.format(this.hrmsinductionmasterForm.get('startdate').value)+'  UTC' :null);
this.hrmsinductionmasterservice.formData.DeletedhrmsinductionemployeeIDs = this.DeletedhrmsinductionemployeeIDs;
this.hrmsinductionmasterservice.formData.DeletedhrmsinductionscheduleIDs = this.DeletedhrmsinductionscheduleIDs;
console.log(this.hrmsinductionmasterservice.formData);
this.hrmsinductionmasterservice.formData=this.hrmsinductionmasterForm.value;
this.hrmsinductionmasterservice.saveOrUpdatehrmsinductionmasters().subscribe(
async res => {
if (this.hrmsinductionemployeessource.data)
{
    for (let i = 0; i < this.hrmsinductionemployeessource.data.length; i++)
    {
        if (this.hrmsinductionemployeessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsinductionemployeessource.data[i].fileattachmentlist);
    }
}
if (this.hrmsinductionschedulessource.data)
{
    for (let i = 0; i < this.hrmsinductionschedulessource.data.length; i++)
    {
        if (this.hrmsinductionschedulessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsinductionschedulessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinductionmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsinductionmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsinductionmaster);
}
else
{
this.FillData(res);
}
}
this.hrmsinductionmasterForm.markAsUntouched();
this.hrmsinductionmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmsinductionemployee(event:any,employeeinductionid:any, inductionmasterid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsinductionemployeeComponent, 
{
data:  {  showview:false,save:false,event,employeeinductionid, inductionmasterid,visiblelist:this.hrmsinductionemployeesvisiblelist,  hidelist:this.hrmsinductionemployeeshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsinductionemployeessource.add(res);
this.hrmsinductionemployeessource.refresh();
}
else
{
this.hrmsinductionemployeessource.update(event.data, res);
}
}
});
}

onDeletehrmsinductionemployee(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsinductionemployeeIDs += childID + ",";
this.hrmsinductionmasterservice.hrmsinductionemployees.splice(i, 1);
//this.updateGrandTotal();
}

onDeletehrmsinductionschedule(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsinductionscheduleIDs += childID + ",";
this.hrmsinductionmasterservice.hrmsinductionschedules.splice(i, 1);
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsinductionemployees
hrmsinductionemployeessettings:any;
hrmsinductionemployeessource: any;

showhrmsinductionemployeesCheckbox()
{
debugger;
if(this.tblhrmsinductionemployeessource.settings['selectMode']== 'multi')this.tblhrmsinductionemployeessource.settings['selectMode']= 'single';
else
this.tblhrmsinductionemployeessource.settings['selectMode']= 'multi';
this.tblhrmsinductionemployeessource.initGrid();
}
deletehrmsinductionemployeesAll()
{
this.tblhrmsinductionemployeessource.settings['selectMode'] = 'single';
}
showhrmsinductionemployeesFilter()
{
  setTimeout(() => {
  this.SethrmsinductionemployeesTableddConfig();
  });
      if(this.tblhrmsinductionemployeessource.settings!=null)this.tblhrmsinductionemployeessource.settings['hideSubHeader'] =!this.tblhrmsinductionemployeessource.settings['hideSubHeader'];
this.tblhrmsinductionemployeessource.initGrid();
}
showhrmsinductionemployeesInActive()
{
}
enablehrmsinductionemployeesInActive()
{
}
async SethrmsinductionemployeesTableddConfig()
{
if(!this.bfilterPopulatehrmsinductionemployees){

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsinductionemployeesemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsinductionemployeesemployeeid3.push(obj);
}
if((this.tblhrmsinductionemployeessource.settings as any).columns['employeeid'])
{
(this.tblhrmsinductionemployeessource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsinductionemployeesemployeeid3));
this.tblhrmsinductionemployeessource.initGrid();
}
});
}
this.bfilterPopulatehrmsinductionemployees=true;
}
async hrmsinductionemployeesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsinductionemployeesTableConfig()
{
this.hrmsinductionemployeessettings = {
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
var element= this.datahrmsinductionemployeesemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsinductionemployeesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinductionemployeesID)>=0)
{
this.hrmsinductionemployeessource=new LocalDataSource();
this.hrmsinductionemployeessource.load(this.hrmsinductionmasterservice.hrmsinductionemployees as  any as LocalDataSource);
this.hrmsinductionemployeessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsinductionemployeesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsinductionmasterservice.hrmsinductionemployees.length == 0)
{
    this.tblhrmsinductionemployeessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsinductionemployee();
    this.hrmsinductionmasterservice.hrmsinductionemployees.push(obj);
    this.hrmsinductionemployeessource.refresh();
    if ((this.hrmsinductionmasterservice.hrmsinductionemployees.length / this.hrmsinductionemployeessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinductionemployeessource.getPaging().page)
    {
        this.hrmsinductionemployeessource.setPage((this.hrmsinductionmasterservice.hrmsinductionemployees.length / this.hrmsinductionemployeessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsinductionemployeessource.grid.edit(this.tblhrmsinductionemployeessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsinductionemployeessource.data.indexOf(event.data);
this.onDeletehrmsinductionemployee(event,event.data.employeeinductionid,((this.hrmsinductionemployeessource.getPaging().page-1) *this.hrmsinductionemployeessource.getPaging().perPage)+index);
this.hrmsinductionemployeessource.refresh();
break;
}
}

*/
hrmsinductionemployeesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsinductionemployee(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsinductionemployee(event,event.data.employeeinductionid,this.formid);
break;
case 'delete':
this.onDeletehrmsinductionemployee(event,event.data.employeeinductionid,((this.hrmsinductionemployeessource.getPaging().page-1) *this.hrmsinductionemployeessource.getPaging().perPage)+event.index);
this.hrmsinductionemployeessource.refresh();
break;
}
}
hrmsinductionemployeesonDelete(obj) {
let employeeinductionid=obj.data.employeeinductionid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsinductionmasterservice.deletehrmsinductionmaster(employeeinductionid).then(res=>
this.hrmsinductionemployeesLoadTable()
);
}
}
hrmsinductionemployeesPaging(val)
{
debugger;
this.hrmsinductionemployeessource.setPaging(1, val, true);
}

handlehrmsinductionemployeesGridSelected(event:any) {
this.hrmsinductionemployeesselectedindex=this.hrmsinductionmasterservice.hrmsinductionemployees.findIndex(i => i.employeeinductionid === event.data.employeeinductionid);
}
IshrmsinductionemployeesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinductionemployeesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsinductionemployees
//start of Grid Codes hrmsinductionschedules
hrmsinductionschedulessettings:any;
hrmsinductionschedulessource: any;

showhrmsinductionschedulesCheckbox()
{
debugger;
if(this.tblhrmsinductionschedulessource.settings['selectMode']== 'multi')this.tblhrmsinductionschedulessource.settings['selectMode']= 'single';
else
this.tblhrmsinductionschedulessource.settings['selectMode']= 'multi';
this.tblhrmsinductionschedulessource.initGrid();
}
deletehrmsinductionschedulesAll()
{
this.tblhrmsinductionschedulessource.settings['selectMode'] = 'single';
}
showhrmsinductionschedulesFilter()
{
  setTimeout(() => {
  this.SethrmsinductionschedulesTableddConfig();
  });
      if(this.tblhrmsinductionschedulessource.settings!=null)this.tblhrmsinductionschedulessource.settings['hideSubHeader'] =!this.tblhrmsinductionschedulessource.settings['hideSubHeader'];
this.tblhrmsinductionschedulessource.initGrid();
}
showhrmsinductionschedulesInActive()
{
}
enablehrmsinductionschedulesInActive()
{
}
async SethrmsinductionschedulesTableddConfig()
{
if(!this.bfilterPopulatehrmsinductionschedules){
}
this.bfilterPopulatehrmsinductionschedules=true;
}
async hrmsinductionschedulesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsinductionschedulesTableConfig()
{
this.hrmsinductionschedulessettings = {
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
hrmsinductionschedulesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinductionschedulesID)>=0)
{
this.hrmsinductionschedulessource=new LocalDataSource();
this.hrmsinductionschedulessource.load(this.hrmsinductionmasterservice.hrmsinductionschedules as  any as LocalDataSource);
this.hrmsinductionschedulessource.setPaging(1, 20, true);
}
}
hrmsinductionschedulesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsinductionmasterservice.hrmsinductionschedules.length == 0)
{
    this.tblhrmsinductionschedulessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsinductionschedule();
    this.hrmsinductionmasterservice.hrmsinductionschedules.push(obj);
    this.hrmsinductionschedulessource.refresh();
    if ((this.hrmsinductionmasterservice.hrmsinductionschedules.length / this.hrmsinductionschedulessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsinductionschedulessource.getPaging().page)
    {
        this.hrmsinductionschedulessource.setPage((this.hrmsinductionmasterservice.hrmsinductionschedules.length / this.hrmsinductionschedulessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsinductionschedulessource.grid.edit(this.tblhrmsinductionschedulessource.grid.getLastRow());
    });
}
break;
case 'delete':
if (confirm('Do you want to want to delete?')) {
let index = this.hrmsinductionschedulessource.data.indexOf(event.data);
this.onDeletehrmsinductionschedule(event,event.data.scheduleid,((this.hrmsinductionschedulessource.getPaging().page-1) *this.hrmsinductionschedulessource.getPaging().perPage)+index);
this.hrmsinductionschedulessource.refresh();
}
break;
}
}
hrmsinductionschedulesPaging(val)
{
debugger;
this.hrmsinductionschedulessource.setPaging(1, val, true);
}

handlehrmsinductionschedulesGridSelected(event:any) {
this.hrmsinductionschedulesselectedindex=this.hrmsinductionmasterservice.hrmsinductionschedules.findIndex(i => i.scheduleid === event.data.scheduleid);
}
IshrmsinductionschedulesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsinductionschedulesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsinductionschedules

}



