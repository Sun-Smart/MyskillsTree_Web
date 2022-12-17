import { hrmsloanschememasterService } from './../../../service/hrmsloanschememaster.service';
import { hrmsloanschememaster } from './../../../model/hrmsloanschememaster.model';
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
import { hrmsloanschemedetail } from './../../../model/hrmsloanschemedetail.model';
import { hrmsloanschemedetailComponent } from './../../../pages/forms/hrmsloanschemedetail/hrmsloanschemedetail.component';
//FK services
import { hrmsemployeeloanrequest } from './../../../model/hrmsemployeeloanrequest.model';
import { hrmsemployeeloanrequestComponent } from './../../../pages/forms/hrmsemployeeloanrequest/hrmsemployeeloanrequest.component';
//FK services
import { bouserbranchaccess,IbouserbranchaccessResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
import { bomasterdata,IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hrmsemployee,IhrmsemployeeResponse } from './../../../model/hrmsemployee.model';
import { hrmsemployeeComponent } from './../../../pages/forms/hrmsemployee/hrmsemployee.component';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
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
selector: 'app-hrmsloanschememaster',
templateUrl: './hrmsloanschememaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsloanschememasterComponent implements OnInit {
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
bfilterPopulatehrmsloanschememasters:boolean=false;
datahrmsloanschemedetailsroleid3:any=[];
bfilterPopulatehrmsloanschemedetails:boolean=false;
datahrmsemployeeloanrequestsbranchid3:any=[];
datahrmsemployeeloanrequestsdepartmentid3:any=[];
datahrmsemployeeloanrequestsemployeeid3:any=[];
bfilterPopulatehrmsemployeeloanrequests:boolean=false;
@ViewChild('tblhrmsloanschemedetailssource',{static:false}) tblhrmsloanschemedetailssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsemployeeloanrequestssource',{static:false}) tblhrmsemployeeloanrequestssource: Ng2SmartTableComponent;
 hrmsloanschememasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsloanschememastershowOption:boolean;
hrmsloanschemedetailshowOption:boolean;
hrmsemployeeloanrequestshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsloanschemedetailsvisiblelist:any;
hrmsloanschemedetailshidelist:any;
hrmsemployeeloanrequestsvisiblelist:any;
hrmsemployeeloanrequestshidelist:any;

DeletedhrmsloanschemedetailIDs: string="";
hrmsloanschemedetailsID: string = "1";
hrmsloanschemedetailsselectedindex:any;
DeletedhrmsemployeeloanrequestIDs: string="";
hrmsemployeeloanrequestsID: string = "2";
hrmsemployeeloanrequestsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsloanschememasterservice: hrmsloanschememasterService,
private bouserbranchaccessservice: bouserbranchaccessService,
private bomasterdataservice: bomasterdataService,
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
this.hrmsloanschememasterForm  = this.fb.group({
pk:[null],
schemeid: [null],
schemename: [null],
validfrom: [null],
validto: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsloanschememasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsloanschememasterForm.dirty && this.hrmsloanschememasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.schemeid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.schemeid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.schemeid && pkDetail) {
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
let hrmsloanschememasterid = null;

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
this.formid=hrmsloanschememasterid;
//this.sharedService.alert(hrmsloanschememasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsloanschemedetailsTableConfig();
  setTimeout(() => {
  this.SethrmsloanschemedetailsTableddConfig();
  });

this.SethrmsemployeeloanrequestsTableConfig();
  setTimeout(() => {
  this.SethrmsemployeeloanrequestsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmsloanschememasterservice.gethrmsloanschememastersList().then(res => {
      this.pkList = res as hrmsloanschememaster[];
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
this.hrmsloanschememasterForm.markAsUntouched();
this.hrmsloanschememasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsloanschememasterForm != null)
this.hrmsloanschememasterForm.reset();
this.hrmsloanschememasterForm.patchValue({
});
setTimeout(() => {
this.hrmsloanschememasterservice.hrmsloanschemedetails=[];
this.hrmsloanschemedetailsLoadTable();
this.hrmsloanschememasterservice.hrmsemployeeloanrequests=[];
this.hrmsemployeeloanrequestsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let schemeid = this.hrmsloanschememasterForm.get('schemeid').value;
        if(schemeid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsloanschememasterservice.deletehrmsloanschememaster(schemeid).then(res =>
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
    this.hrmsloanschememasterForm.patchValue({
        schemeid: null
    });
    if(this.hrmsloanschememasterservice.formData.schemeid!=null)this.hrmsloanschememasterservice.formData.schemeid=null;
for (let i=0;i<this.hrmsloanschememasterservice.hrmsloanschemedetails.length;i++) {
this.hrmsloanschememasterservice.hrmsloanschemedetails[i].detailid=null;
}
for (let i=0;i<this.hrmsloanschememasterservice.hrmsemployeeloanrequests.length;i++) {
this.hrmsloanschememasterservice.hrmsemployeeloanrequests[i].loanid=null;
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
        else if(key=="validfrom")
this.hrmsloanschememasterForm.patchValue({"validfrom":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="validto")
this.hrmsloanschememasterForm.patchValue({"validto":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.hrmsloanschememasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsloanschememasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsloanschememasterForm.controls[key]!=undefined)
{
this.hrmsloanschememasterForm.controls[key].disable({onlySelf: true});
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

edithrmsloanschememasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsloanschememasterservice.gethrmsloanschememastersByEID(pkcol).then(res => {

this.hrmsloanschememasterservice.formData=res.hrmsloanschememaster;
let formproperty=res.hrmsloanschememaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsloanschememaster.pkcol;
this.formid=res.hrmsloanschememaster.schemeid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsloanschememaster.schemeid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsloanschememasterForm.patchValue({
schemeid: res.hrmsloanschememaster.schemeid,
schemename: res.hrmsloanschememaster.schemename,
validfrom: this.ngbDateParserFormatter.parse(res.hrmsloanschememaster.validfrom),
validto: this.ngbDateParserFormatter.parse(res.hrmsloanschememaster.validto),
status: res.hrmsloanschememaster.status,
statusdesc: res.hrmsloanschememaster.statusdesc,
});
this.hrmsloanschemedetailsvisiblelist=res.hrmsloanschemedetailsvisiblelist;
this.hrmsemployeeloanrequestsvisiblelist=res.hrmsemployeeloanrequestsvisiblelist;
//Child Tables if any
this.hrmsloanschememasterservice.hrmsloanschemedetails = res.hrmsloanschemedetails;
this.SethrmsloanschemedetailsTableConfig();
this.hrmsloanschemedetailsLoadTable();
  setTimeout(() => {
  this.SethrmsloanschemedetailsTableddConfig();
  });
this.hrmsloanschememasterservice.hrmsemployeeloanrequests = res.hrmsemployeeloanrequests;
this.SethrmsemployeeloanrequestsTableConfig();
this.hrmsemployeeloanrequestsLoadTable();
  setTimeout(() => {
  this.SethrmsemployeeloanrequestsTableddConfig();
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
  for (let key in this.hrmsloanschememasterForm.controls) {
    if (this.hrmsloanschememasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsloanschememasterservice.formData!=null && this.hrmsloanschememasterservice.formData[key]!=null  && this.hrmsloanschememasterservice.formData[key]!='[]' && this.hrmsloanschememasterservice.formData[key]!=undefined && this.hrmsloanschememasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsloanschememasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsloanschememasterservice.formData!=null && this.hrmsloanschememasterservice.formData[key]!=null   && this.hrmsloanschememasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsloanschememasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsloanschememasterservice.formData!=null && this.hrmsloanschememasterservice.formData[key]!=null   && this.hrmsloanschememasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsloanschememasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsloanschememasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsloanschememasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsloanschememasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsloanschememasterForm.value;
obj.validfrom=new Date(this.hrmsloanschememasterForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.hrmsloanschememasterForm.get('validfrom').value)+'  UTC' :null);
obj.validto=new Date(this.hrmsloanschememasterForm.get('validto').value ? this.ngbDateParserFormatter.format(this.hrmsloanschememasterForm.get('validto').value)+'  UTC' :null);
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

private hrmsloanschememastertoggleOption(){
this.hrmsloanschememastershowOption = this.hrmsloanschememastershowOption === true ? false : true;
}

private hrmsloanschemedetailtoggleOption(){
this.hrmsloanschemedetailshowOption = this.hrmsloanschemedetailshowOption === true ? false : true;
}

private hrmsemployeeloanrequesttoggleOption(){
this.hrmsemployeeloanrequestshowOption = this.hrmsemployeeloanrequestshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsloanschememasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsloanschememasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsloanschememasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsloanschememasterservice.formData=this.hrmsloanschememasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsloanschememasterForm.controls[key] != null)
    {
        this.hrmsloanschememasterservice.formData[key] = this.hrmsloanschememasterForm.controls[key].value;
    }
}
}
}
this.hrmsloanschememasterservice.formData.validfrom=new Date(this.hrmsloanschememasterForm.get('validfrom').value ? this.ngbDateParserFormatter.format(this.hrmsloanschememasterForm.get('validfrom').value)+'  UTC' :null);
this.hrmsloanschememasterservice.formData.validto=new Date(this.hrmsloanschememasterForm.get('validto').value ? this.ngbDateParserFormatter.format(this.hrmsloanschememasterForm.get('validto').value)+'  UTC' :null);
this.hrmsloanschememasterservice.formData.DeletedhrmsloanschemedetailIDs = this.DeletedhrmsloanschemedetailIDs;
this.hrmsloanschememasterservice.formData.DeletedhrmsemployeeloanrequestIDs = this.DeletedhrmsemployeeloanrequestIDs;
console.log(this.hrmsloanschememasterservice.formData);
this.hrmsloanschememasterservice.formData=this.hrmsloanschememasterForm.value;
this.hrmsloanschememasterservice.saveOrUpdatehrmsloanschememasters().subscribe(
async res => {
if (this.hrmsloanschemedetailssource.data)
{
    for (let i = 0; i < this.hrmsloanschemedetailssource.data.length; i++)
    {
        if (this.hrmsloanschemedetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsloanschemedetailssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsemployeeloanrequestssource.data)
{
    for (let i = 0; i < this.hrmsemployeeloanrequestssource.data.length; i++)
    {
        if (this.hrmsemployeeloanrequestssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsemployeeloanrequestssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsloanschememaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsloanschememasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsloanschememaster);
}
else
{
this.FillData(res);
}
}
this.hrmsloanschememasterForm.markAsUntouched();
this.hrmsloanschememasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmsloanschemedetail(event:any,detailid:any, schemeid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsloanschemedetailComponent, 
{
data:  {  showview:false,save:false,event,detailid, schemeid,visiblelist:this.hrmsloanschemedetailsvisiblelist,  hidelist:this.hrmsloanschemedetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsloanschemedetailssource.add(res);
this.hrmsloanschemedetailssource.refresh();
}
else
{
this.hrmsloanschemedetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsloanschemedetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsloanschemedetailIDs += childID + ",";
this.hrmsloanschememasterservice.hrmsloanschemedetails.splice(i, 1);
//this.updateGrandTotal();
}

onDeletehrmsemployeeloanrequest(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsemployeeloanrequestIDs += childID + ",";
this.hrmsloanschememasterservice.hrmsemployeeloanrequests.splice(i, 1);
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsloanschemedetails
hrmsloanschemedetailssettings:any;
hrmsloanschemedetailssource: any;

showhrmsloanschemedetailsCheckbox()
{
debugger;
if(this.tblhrmsloanschemedetailssource.settings['selectMode']== 'multi')this.tblhrmsloanschemedetailssource.settings['selectMode']= 'single';
else
this.tblhrmsloanschemedetailssource.settings['selectMode']= 'multi';
this.tblhrmsloanschemedetailssource.initGrid();
}
deletehrmsloanschemedetailsAll()
{
this.tblhrmsloanschemedetailssource.settings['selectMode'] = 'single';
}
showhrmsloanschemedetailsFilter()
{
  setTimeout(() => {
  this.SethrmsloanschemedetailsTableddConfig();
  });
      if(this.tblhrmsloanschemedetailssource.settings!=null)this.tblhrmsloanschemedetailssource.settings['hideSubHeader'] =!this.tblhrmsloanschemedetailssource.settings['hideSubHeader'];
this.tblhrmsloanschemedetailssource.initGrid();
}
showhrmsloanschemedetailsInActive()
{
}
enablehrmsloanschemedetailsInActive()
{
}
async SethrmsloanschemedetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsloanschemedetails){

this.configservice.getList("r").then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsloanschemedetailsroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].configkey, title: dataroleid2[i].configtext};
this.datahrmsloanschemedetailsroleid3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsloanschemedetailssource.settings);
if(clone.columns['roleid']!=undefined)clone.columns['roleid'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsloanschemedetailsroleid3)), }, };
if(clone.columns['roleid']!=undefined)clone.columns['roleid'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsloanschemedetailsroleid3)), }, };
this.tblhrmsloanschemedetailssource.settings =  clone;
this.tblhrmsloanschemedetailssource.initGrid();
});
}
this.bfilterPopulatehrmsloanschemedetails=true;
}
async hrmsloanschemedetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsloanschemedetailsTableConfig()
{
this.hrmsloanschemedetailssettings = {
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
roleid: {
title: 'Role',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsloanschemedetailsroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
maxeligibleamount: {
title: 'Max Eligible Amount',
type: 'number',
filter:true,
},
maximumtimes: {
title: 'Maximum Times',
type: 'number',
filter:true,
},
interestrate: {
title: 'Interest Rate',
type: 'number',
filter:true,
},
maximuminstallment: {
title: 'Maximum Installment',
type: 'number',
filter:true,
},
restrictotherloan: {
title: 'Restrict Other Loan',
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
noexistingloan: {
title: 'No Existing Loan',
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
allowdeferral: {
title: 'Allow Deferral',
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
hrmsloanschemedetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsloanschemedetailsID)>=0)
{
this.hrmsloanschemedetailssource=new LocalDataSource();
this.hrmsloanschemedetailssource.load(this.hrmsloanschememasterservice.hrmsloanschemedetails as  any as LocalDataSource);
this.hrmsloanschemedetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsloanschemedetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsloanschememasterservice.hrmsloanschemedetails.length == 0)
{
    this.tblhrmsloanschemedetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsloanschemedetail();
    this.hrmsloanschememasterservice.hrmsloanschemedetails.push(obj);
    this.hrmsloanschemedetailssource.refresh();
    if ((this.hrmsloanschememasterservice.hrmsloanschemedetails.length / this.hrmsloanschemedetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsloanschemedetailssource.getPaging().page)
    {
        this.hrmsloanschemedetailssource.setPage((this.hrmsloanschememasterservice.hrmsloanschemedetails.length / this.hrmsloanschemedetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsloanschemedetailssource.grid.edit(this.tblhrmsloanschemedetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsloanschemedetailssource.data.indexOf(event.data);
this.onDeletehrmsloanschemedetail(event,event.data.detailid,((this.hrmsloanschemedetailssource.getPaging().page-1) *this.hrmsloanschemedetailssource.getPaging().perPage)+index);
this.hrmsloanschemedetailssource.refresh();
break;
}
}

*/
hrmsloanschemedetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsloanschemedetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsloanschemedetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeletehrmsloanschemedetail(event,event.data.detailid,((this.hrmsloanschemedetailssource.getPaging().page-1) *this.hrmsloanschemedetailssource.getPaging().perPage)+event.index);
this.hrmsloanschemedetailssource.refresh();
break;
}
}
hrmsloanschemedetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsloanschememasterservice.deletehrmsloanschememaster(detailid).then(res=>
this.hrmsloanschemedetailsLoadTable()
);
}
}
hrmsloanschemedetailsPaging(val)
{
debugger;
this.hrmsloanschemedetailssource.setPaging(1, val, true);
}

handlehrmsloanschemedetailsGridSelected(event:any) {
this.hrmsloanschemedetailsselectedindex=this.hrmsloanschememasterservice.hrmsloanschemedetails.findIndex(i => i.detailid === event.data.detailid);
}
IshrmsloanschemedetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsloanschemedetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsloanschemedetails
//start of Grid Codes hrmsemployeeloanrequests
hrmsemployeeloanrequestssettings:any;
hrmsemployeeloanrequestssource: any;

showhrmsemployeeloanrequestsCheckbox()
{
debugger;
if(this.tblhrmsemployeeloanrequestssource.settings['selectMode']== 'multi')this.tblhrmsemployeeloanrequestssource.settings['selectMode']= 'single';
else
this.tblhrmsemployeeloanrequestssource.settings['selectMode']= 'multi';
this.tblhrmsemployeeloanrequestssource.initGrid();
}
deletehrmsemployeeloanrequestsAll()
{
this.tblhrmsemployeeloanrequestssource.settings['selectMode'] = 'single';
}
showhrmsemployeeloanrequestsFilter()
{
  setTimeout(() => {
  this.SethrmsemployeeloanrequestsTableddConfig();
  });
      if(this.tblhrmsemployeeloanrequestssource.settings!=null)this.tblhrmsemployeeloanrequestssource.settings['hideSubHeader'] =!this.tblhrmsemployeeloanrequestssource.settings['hideSubHeader'];
this.tblhrmsemployeeloanrequestssource.initGrid();
}
showhrmsemployeeloanrequestsInActive()
{
}
enablehrmsemployeeloanrequestsInActive()
{
}
async SethrmsemployeeloanrequestsTableddConfig()
{
if(!this.bfilterPopulatehrmsemployeeloanrequests){

this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res=>
{
var databranchid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeloanrequestsbranchid3.push(defaultobj);
for(let i=0; i<databranchid2.length; i++){
var obj= { value: databranchid2[i].branchid, title:databranchid2[i].branchname};
this.datahrmsemployeeloanrequestsbranchid3.push(obj);
}
if((this.tblhrmsemployeeloanrequestssource.settings as any).columns['branchid'])
{
(this.tblhrmsemployeeloanrequestssource.settings as any).columns['branchid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeloanrequestsbranchid3));
this.tblhrmsemployeeloanrequestssource.initGrid();
}
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeloanrequestsemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datahrmsemployeeloanrequestsemployeeid3.push(obj);
}
if((this.tblhrmsemployeeloanrequestssource.settings as any).columns['employeeid'])
{
(this.tblhrmsemployeeloanrequestssource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeloanrequestsemployeeid3));
this.tblhrmsemployeeloanrequestssource.initGrid();
}
});

this.bomasterdataservice.getList("qghhe").then(res=>
{
var datadepartmentid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsemployeeloanrequestsdepartmentid3.push(defaultobj);
for(let i=0; i<datadepartmentid2.length; i++){
var obj= { value: datadepartmentid2[i].masterdataid, title:datadepartmentid2[i].masterdatadescription};
this.datahrmsemployeeloanrequestsdepartmentid3.push(obj);
}
if((this.tblhrmsemployeeloanrequestssource.settings as any).columns['departmentid'])
{
(this.tblhrmsemployeeloanrequestssource.settings as any).columns['departmentid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsemployeeloanrequestsdepartmentid3));
this.tblhrmsemployeeloanrequestssource.initGrid();
}
});
}
this.bfilterPopulatehrmsemployeeloanrequests=true;
}
async hrmsemployeeloanrequestsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsemployeeloanrequestsTableConfig()
{
this.hrmsemployeeloanrequestssettings = {
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
branchid: {
title: 'Branch',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'oxubv',reportcode:'oxubv',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeloanrequestsbranchid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
employeeid: {
title: 'Employee',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid:'zcqka',reportcode:'zcqka',id:"value",desc:"title",list: [] }, },
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeloanrequestsemployeeid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
employeename: {
title: 'Employee Name',
type: '',
filter:true,
},
departmentid: {
title: 'Department',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsemployeeloanrequestsdepartmentid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
loanreference: {
title: 'Loan Reference',
type: '',
filter:true,
},
referencedate: {
title: 'Reference Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
requestamount: {
title: 'Request Amount',
type: 'number',
filter:true,
},
requiredfrom: {
title: 'Required From',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
numinstallments: {
title: 'Num Installments',
type: 'number',
filter:true,
},
emi: {
title: 'E M I',
type: 'number',
filter:true,
},
reason: {
title: 'Reason',
type: 'html',
filter:true,
editor: {
type: 'textarea',
},
},
},
};
}
hrmsemployeeloanrequestsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeloanrequestsID)>=0)
{
this.hrmsemployeeloanrequestssource=new LocalDataSource();
this.hrmsemployeeloanrequestssource.load(this.hrmsloanschememasterservice.hrmsemployeeloanrequests as  any as LocalDataSource);
this.hrmsemployeeloanrequestssource.setPaging(1, 20, true);
}
}
hrmsemployeeloanrequestsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsloanschememasterservice.hrmsemployeeloanrequests.length == 0)
{
    this.tblhrmsemployeeloanrequestssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsemployeeloanrequest();
    this.hrmsloanschememasterservice.hrmsemployeeloanrequests.push(obj);
    this.hrmsemployeeloanrequestssource.refresh();
    if ((this.hrmsloanschememasterservice.hrmsemployeeloanrequests.length / this.hrmsemployeeloanrequestssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsemployeeloanrequestssource.getPaging().page)
    {
        this.hrmsemployeeloanrequestssource.setPage((this.hrmsloanschememasterservice.hrmsemployeeloanrequests.length / this.hrmsemployeeloanrequestssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsemployeeloanrequestssource.grid.edit(this.tblhrmsemployeeloanrequestssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsemployeeloanrequestssource.data.indexOf(event.data);
this.onDeletehrmsemployeeloanrequest(event,event.data.loanid,((this.hrmsemployeeloanrequestssource.getPaging().page-1) *this.hrmsemployeeloanrequestssource.getPaging().perPage)+index);
this.hrmsemployeeloanrequestssource.refresh();
break;
}
}
hrmsemployeeloanrequestsPaging(val)
{
debugger;
this.hrmsemployeeloanrequestssource.setPaging(1, val, true);
}

handlehrmsemployeeloanrequestsGridSelected(event:any) {
this.hrmsemployeeloanrequestsselectedindex=this.hrmsloanschememasterservice.hrmsemployeeloanrequests.findIndex(i => i.loanid === event.data.loanid);
}
IshrmsemployeeloanrequestsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsemployeeloanrequestsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsemployeeloanrequests

}



