import { pmselectkpiService } from './../../../service/pmselectkpi.service';
import { pmselectkpi } from './../../../model/pmselectkpi.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
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
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmsemployee.service';
//popups
//detail table services
import { pmemployeekpi } from './../../../model/pmemployeekpi.model';
//FK services
import { hrmskpimaster,IhrmskpimasterResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmskpimaster.model';
import { hrmskpimasterService } from '../../../../../../n-tire-hrms-app/src/app/service/hrmskpimaster.service';
import { pmkpiComponent } from '../pmkpi/pmkpi.component';
import { pmkpiService } from './../../../service/pmkpi.service';
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
selector: 'app-pmselectkpi',
templateUrl: './pmselectkpi.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmselectkpiComponent implements OnInit {
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
bfilterPopulatepmselectkpis:boolean=false;
datapmselectkpisdepartmentid3:any=[];
datapmselectkpisdesignationid3:any=[];
datapmselectkpisemployeeid3:any=[];
datapmemployeekpisemployeeid3:any=[];
datapmemployeekpisemployeekpiid3:any=[];
datapmemployeekpisdesignationid3:any=[];
bfilterPopulatepmemployeekpis:boolean=false;
@ViewChild('tblpmemployeekpissource',{static:false}) tblpmemployeekpissource: Ng2SmartTableComponent;
 pmselectkpiForm: FormGroup;
departmentidList: bomasterdata[];
designationidList: boconfigvalue[];
employeeidList: hrmsemployee[];
employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
employeeid_hrmsemployeesForm: FormGroup;//autocomplete
employeeid_hrmsemployeesoptions:any;//autocomplete
employeeid_hrmsemployeesformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



pmemployeekpisvisiblelist:any;
pmemployeekpishidelist:any;

DeletedpmemployeekpiIDs: string="";
pmemployeekpisID: string = "1";
pmemployeekpisselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmselectkpiservice: pmselectkpiService,
private pmkpiservice: pmkpiService,
private hrmsemployeeservice: hrmsemployeeService,
private hrmskpimasterservice: hrmskpimasterService,
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
this.pmselectkpiForm  = this.fb.group({pk:[null],employeekpiid: [null,],
departmentid: [null],
departmentiddesc: [null],
designationid: [null],
designationiddesc: [null],
employeeid: [null],
employeeiddesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmselectkpiForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmselectkpiForm.dirty && this.pmselectkpiForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.employeekpiid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.employeekpiid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.employeekpiid && pkDetail) {
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
let pmselectkpiid = null;

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
this.formid=pmselectkpiid;
//this.sharedService.alert(pmselectkpiid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetpmemployeekpisTableConfig();
  setTimeout(() => {
  this.SetpmemployeekpisTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("designation").then(res => this.designationidList = res as boconfigvalue[]);
this.hrmsemployeeservice.gethrmsemployeesList().then(res => 
{
this.employeeidList = res as hrmsemployee[];
if(this.pmselectkpiservice.formData && this.pmselectkpiservice.formData.employeeid){
this.employeeidoptionsEvent.emit(this.employeeidList);
this.pmselectkpiForm.patchValue({
    employeeid: this.pmselectkpiservice.formData.employeeid,
    employeeiddesc: this.pmselectkpiservice.formData.employeeiddesc,
});
}
{
let arremployeeid = this.employeeidList.filter(v => v.employeeid == this.pmselectkpiForm.get('employeeid').value);
let objemployeeid;
if (arremployeeid.length > 0) objemployeeid = arremployeeid[0];
if (objemployeeid)
{
}
}
}
).catch((err) => {console.log(err);});
this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;

//autocomplete
    this.pmselectkpiservice.getpmselectkpisList().then(res => {
      this.pkList = res as pmselectkpi[];
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
this.pmselectkpiForm.markAsUntouched();
this.pmselectkpiForm.markAsPristine();
}
onSelectedemployeeid(employeeidDetail: any) {
if (employeeidDetail.employeeid && employeeidDetail) {
this.pmselectkpiForm.patchValue({
employeeid: employeeidDetail.employeeid,
employeeiddesc: employeeidDetail.employeename,

});

}
}




resetForm() {
if (this.pmselectkpiForm != null)
this.pmselectkpiForm.reset();
this.pmselectkpiForm.patchValue({
});
setTimeout(() => {
this.pmselectkpiservice.pmemployeekpis=[];
this.pmselectkpiservice.Insertpmemployeekpis=[];
this.pmemployeekpisLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let employeekpiid = this.pmselectkpiForm.get('employeekpiid').value;
        if(employeekpiid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmselectkpiservice.deletepmselectkpi(employeekpiid).then(res =>
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
    this.pmselectkpiForm.patchValue({
        employeekpiid: null
    });
    if(this.pmselectkpiservice.formData.employeekpiid!=null)this.pmselectkpiservice.formData.employeekpiid=null;
for (let i=0;i<this.pmselectkpiservice.pmemployeekpis.length;i++) {
this.pmselectkpiservice.pmemployeekpis[i].kpidetailid=null;
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
this.pmselectkpiForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmselectkpiForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmselectkpiForm.controls[key]!=undefined)this.pmselectkpiForm.controls[key].disable({onlySelf: true});
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
employeekpiidonChange(evt:any){
let e=evt.value;
}
departmentidonChange(evt:any){
let e=evt.value;
this.pmselectkpiForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
designationidonChange(evt:any){
let e=this.f.designationid.value as any;
this.pmselectkpiForm.patchValue({designationiddesc:evt.options[evt.options.selectedIndex].text});
}
employeeidonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.pmselectkpiservice.getpmselectkpisByEID(pkcol).then(res => {

this.pmselectkpiservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.pmselectkpi.employeekpiid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmselectkpi.employeekpiid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmselectkpiForm.patchValue({
employeekpiid: res.pmselectkpi.employeekpiid,
departmentid: res.pmselectkpi.departmentid,
departmentiddesc: res.pmselectkpi.departmentiddesc,
designationid: res.pmselectkpi.designationid,
designationiddesc: res.pmselectkpi.designationiddesc,
employeeid: res.pmselectkpi.employeeid,
employeeiddesc: res.pmselectkpi.employeeiddesc,
status: res.pmselectkpi.status,
statusdesc: res.pmselectkpi.statusdesc,
});
this.pmemployeekpisvisiblelist=res.pmemployeekpisvisiblelist;
//Child Tables if any
this.pmselectkpiservice.pmemployeekpis = res.pmemployeekpis;
this.SetpmemployeekpisTableConfig();
this.pmemployeekpisLoadTable();
  setTimeout(() => {
  this.SetpmemployeekpisTableddConfig();
  });
this.pmselectkpiservice.Insertpmemployeekpis=[];
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
  for (let key in this.pmselectkpiForm.controls) {
    if (this.pmselectkpiForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmselectkpiForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmselectkpiForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmselectkpiForm.value;
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
Object.keys(this.pmselectkpiForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmselectkpiForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmselectkpiForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmselectkpiservice.formData=this.pmselectkpiForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmselectkpiForm.controls[key] != null)
    {
        this.pmselectkpiservice.formData[key] = this.pmselectkpiForm.controls[key].value;
    }
}
}
}
this.pmselectkpiservice.formData.DeletedpmemployeekpiIDs = this.DeletedpmemployeekpiIDs;
console.log(this.pmselectkpiservice.formData);
this.pmselectkpiservice.formData=this.pmselectkpiForm.value;
this.pmselectkpiservice.saveOrUpdatepmselectkpis().subscribe(
async res => {
if (this.pmemployeekpissource.data)
{
    for (let i = 0; i < this.pmemployeekpissource.data.length; i++)
    {
        if (this.pmemployeekpissource.data[i].fileattachmentlist)await this.sharedService.upload(this.pmemployeekpissource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.pmselectkpi);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmselectkpiservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.pmselectkpi);
}
else
{
this.FillData(res);
}
}
this.pmselectkpiForm.markAsUntouched();
this.pmselectkpiForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.pmselectkpiForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditemployeeid( employeeid) {
/*let ScreenType='2';
this.dialog.open(hrmsemployeeComponent, 
{
data: {employeeid:this.pmselectkpiForm.get('employeeid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes pmemployeekpis
onCustompmemployeekpisAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(pmkpiComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'pmkpi details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
pmemployeekpissettings:any;
pmemployeekpissource: any;

showpmemployeekpisCheckbox()
{
debugger;
if(this.tblpmemployeekpissource.settings['selectMode']== 'multi')this.tblpmemployeekpissource.settings['selectMode']= 'single';
else
this.tblpmemployeekpissource.settings['selectMode']= 'multi';
this.tblpmemployeekpissource.initGrid();
}
deletepmemployeekpisAll()
{
this.tblpmemployeekpissource.settings['selectMode'] = 'single';
}
showpmemployeekpisFilter()
{
  setTimeout(() => {
  this.SetpmemployeekpisTableddConfig();
  });
      if(this.tblpmemployeekpissource.settings!=null)this.tblpmemployeekpissource.settings['hideSubHeader'] =!this.tblpmemployeekpissource.settings['hideSubHeader'];
this.tblpmemployeekpissource.initGrid();
}
showpmemployeekpisInActive()
{
}
enablepmemployeekpisInActive()
{
}
async SetpmemployeekpisTableddConfig()
{
if(!this.bfilterPopulatepmemployeekpis){

this.hrmskpimasterservice.gethrmskpimastersList().then(res=>
{
var dataemployeekpiid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmemployeekpisemployeekpiid3.push(defaultobj);
for(let i=0; i<dataemployeekpiid2.length; i++){
var obj= { value: dataemployeekpiid2[i].kpiid, title:dataemployeekpiid2[i].kpidescription};
this.datapmemployeekpisemployeekpiid3.push(obj);
}
if((this.tblpmemployeekpissource.settings as any).columns['employeekpiid'])
{
(this.tblpmemployeekpissource.settings as any).columns['employeekpiid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmemployeekpisemployeekpiid3));
this.tblpmemployeekpissource.initGrid();
}
});

this.configservice.getList("designation").then(res=>
{
var datadesignationid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmemployeekpisdesignationid3.push(defaultobj);
for(let i=0; i<datadesignationid2.length; i++){
var obj= { value: datadesignationid2[i].configkey, title: datadesignationid2[i].configtext};
this.datapmemployeekpisdesignationid3.push(obj);
}
var clone = this.sharedService.clone(this.tblpmemployeekpissource.settings);
if(clone.columns['designationid']!=undefined)clone.columns['designationid'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmemployeekpisdesignationid3)), }, };
if(clone.columns['designationid']!=undefined)clone.columns['designationid'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datapmemployeekpisdesignationid3)), }, };
this.tblpmemployeekpissource.settings =  clone;
this.tblpmemployeekpissource.initGrid();
});

this.hrmsemployeeservice.gethrmsemployeesList().then(res=>
{
var dataemployeeid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datapmemployeekpisemployeeid3.push(defaultobj);
for(let i=0; i<dataemployeeid2.length; i++){
var obj= { value: dataemployeeid2[i].employeeid, title:dataemployeeid2[i].employeename};
this.datapmemployeekpisemployeeid3.push(obj);
}
if((this.tblpmemployeekpissource.settings as any).columns['employeeid'])
{
(this.tblpmemployeekpissource.settings as any).columns['employeeid'].editor.config.list=JSON.parse(JSON.stringify(this.datapmemployeekpisemployeeid3));
this.tblpmemployeekpissource.initGrid();
}
});
}
this.bfilterPopulatepmemployeekpis=true;
}
async pmemployeekpisbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetpmemployeekpisTableConfig()
{
this.pmemployeekpissettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
kpidetailid: {
title: 'K P I Detail',
type: '',
},
kpiid: {
title: 'K P I',
type: '',
},
name: {
title: 'Name',
type: '',
},
},
};
}
pmemployeekpisLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmemployeekpisID)>=0)
{
this.pmemployeekpissource=new LocalDataSource();
this.pmemployeekpissource.load(this.pmselectkpiservice.pmemployeekpis as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblpmemployeekpissource!=null)
{this.tblpmemployeekpissource.grid.getRows().forEach((row:any) => {
if(row.data.kpidetailid!=null && row.data.kpidetailid!="")
{
this.pmselectkpiservice.Insertpmemployeekpis.push(row.data);
this.tblpmemployeekpissource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
pmemployeekpisroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.pmselectkpiservice.pmemployeekpis.length == 0)
{
    this.tblpmemployeekpissource.grid.createFormShown = true;
}
else
{
    let obj = new pmemployeekpi();
    this.pmselectkpiservice.pmemployeekpis.push(obj);
    this.pmemployeekpissource.refresh();
    if ((this.pmselectkpiservice.pmemployeekpis.length / this.pmemployeekpissource.getPaging().perPage).toFixed(0) + 1 != this.pmemployeekpissource.getPaging().page)
    {
        this.pmemployeekpissource.setPage((this.pmselectkpiservice.pmemployeekpis.length / this.pmemployeekpissource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblpmemployeekpissource.grid.edit(this.tblpmemployeekpissource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.pmemployeekpissource.data.indexOf(event.data);
this.onDeletepmemployeekpi(event,event.data.kpidetailid,((this.pmemployeekpissource.getPaging().page-1) *this.pmemployeekpissource.getPaging().perPage)+index);
this.pmemployeekpissource.refresh();
break;
}
}

*/
pmemployeekpisPaging(val)
{
debugger;
this.pmemployeekpissource.setPaging(1, val, true);
}

handlepmemployeekpisGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.kpidetailid==null || event.data.kpidetailid=="")
{
var obj={employeekpiid:this.formid,kpiid:event.data.kpiid}
this.pmselectkpiservice.Insertpmemployeekpis.push(obj as any);
}
else
{
var deletedids=this.DeletedpmemployeekpiIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.kpidetailid)
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
if(event.data.kpidetailid!=null && event.data.kpidetailid!="")this.DeletedpmemployeekpiIDs += event.data.kpidetailid + ","; 
}
}
IspmemployeekpisVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.pmemployeekpisID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes pmemployeekpis

}



