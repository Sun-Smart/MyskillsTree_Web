import { boreportcolumnService } from './../../../service/boreportcolumn.service';
import { boreportcolumn } from './../../../model/boreportcolumn.model';
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
selector: 'app-boreportcolumn',
templateUrl: './boreportcolumn.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boreportcolumnComponent implements OnInit {
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
bfilterPopulateboreportcolumns:boolean=false;
databoreportcolumnsdatatype3:any=[];
databoreportcolumnsfiltertype3:any=[];
 boreportcolumnForm: FormGroup;
datatypeList: boconfigvalue[];
filtertypeList: boconfigvalue[];
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
private boreportcolumnservice: boreportcolumnService,
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
this.boreportcolumnForm  = this.fb.group({pk:[null],reportcolumnid: [null],
reportid: [null],
tablealias: [null],
field: [null],
header: [null],
columnalias: [null],
hide: [null],
derived: [null],
datatype: [null],
datatypedesc: [null],
fkfilter: [null],
filtertype: [null],
filtertypedesc: [null],
width: [null],
nofilter: [null],
groupby: [null],
sum: [null],
count: [null],
colhtml: [null],
poptitle: [null],
link: [null],
linkurl: [null],
service: [null],
servicename: [null],
sp: [null],
spname: [null],
this.sharedService.alert: [null],
caps: [null],
bold: [null],
italic: [null],
strikethrough: [null],
bgcolor: [null],
forecolor: [null],
conditionstyle: [null],
performancestatusvalues: [null],
status: [null],
statusdesc: [null],
notsortable: [null],
sequence: [null],
sumcondition: [null],
countcondition: [null],
min: [null],
max: [null],
maxchars: [null],
helptext: [null],
});
}

get f() { return this.boreportcolumnForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boreportcolumnForm.dirty && this.boreportcolumnForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.reportcolumnid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.reportcolumnid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.reportcolumnid && pkDetail) {
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
let boreportcolumnid = null;

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
this.formid=boreportcolumnid;
//this.sharedService.alert(boreportcolumnid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("datatype").then(res => this.datatypeList = res as boconfigvalue[]);
this.configservice.getList("filtertype").then(res => this.filtertypeList = res as boconfigvalue[]);

//autocomplete
    this.boreportcolumnservice.getboreportcolumnsList().then(res => {
      this.pkList = res as boreportcolumn[];
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
this.boreportcolumnForm.markAsUntouched();
this.boreportcolumnForm.markAsPristine();
}



resetForm() {
if (this.boreportcolumnForm != null)
this.boreportcolumnForm.reset();
this.boreportcolumnForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let reportcolumnid = this.boreportcolumnForm.get('reportcolumnid').value;
        if(reportcolumnid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boreportcolumnservice.deleteboreportcolumn(reportcolumnid).then(res =>
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
    this.boreportcolumnForm.patchValue({
        reportcolumnid: null
    });
    if(this.boreportcolumnservice.formData.reportcolumnid!=null)this.boreportcolumnservice.formData.reportcolumnid=null;
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
this.boreportcolumnForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boreportcolumnForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boreportcolumnForm.controls[key]!=undefined)this.boreportcolumnForm.controls[key].disable({onlySelf: true});
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
datatypeonChange(evt:any){
let e=this.f.datatype.value as any;
this.boreportcolumnForm.patchValue({datatypedesc:evt.options[evt.options.selectedIndex].text});
}
filtertypeonChange(evt:any){
let e=this.f.filtertype.value as any;
this.boreportcolumnForm.patchValue({filtertypedesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.boreportcolumnservice.getboreportcolumnsByEID(pkcol).then(res => {

this.boreportcolumnservice.formData=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.boreportcolumn.reportcolumnid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.boreportcolumn.reportcolumnid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boreportcolumnForm.patchValue({
reportcolumnid: res.boreportcolumn.reportcolumnid,
reportid: res.boreportcolumn.reportid,
tablealias: res.boreportcolumn.tablealias,
field: res.boreportcolumn.field,
header: res.boreportcolumn.header,
columnalias: res.boreportcolumn.columnalias,
hide: res.boreportcolumn.hide,
derived: res.boreportcolumn.derived,
datatype: res.boreportcolumn.datatype,
datatypedesc: res.boreportcolumn.datatypedesc,
fkfilter: res.boreportcolumn.fkfilter,
filtertype: res.boreportcolumn.filtertype,
filtertypedesc: res.boreportcolumn.filtertypedesc,
width: res.boreportcolumn.width,
nofilter: res.boreportcolumn.nofilter,
groupby: res.boreportcolumn.groupby,
sum: res.boreportcolumn.sum,
count: res.boreportcolumn.count,
colhtml: res.boreportcolumn.colhtml,
poptitle: res.boreportcolumn.poptitle,
link: res.boreportcolumn.link,
linkurl: res.boreportcolumn.linkurl,
service: res.boreportcolumn.service,
servicename: res.boreportcolumn.servicename,
sp: res.boreportcolumn.sp,
spname: res.boreportcolumn.spname,
this.sharedService.alert: res.boreportcolumn.this.sharedService.alert,
caps: res.boreportcolumn.caps,
bold: res.boreportcolumn.bold,
italic: res.boreportcolumn.italic,
strikethrough: res.boreportcolumn.strikethrough,
bgcolor: res.boreportcolumn.bgcolor,
forecolor: res.boreportcolumn.forecolor,
conditionstyle: res.boreportcolumn.conditionstyle,
performancestatusvalues: res.boreportcolumn.performancestatusvalues,
status: res.boreportcolumn.status,
statusdesc: res.boreportcolumn.statusdesc,
notsortable: res.boreportcolumn.notsortable,
sequence: res.boreportcolumn.sequence,
sumcondition: res.boreportcolumn.sumcondition,
countcondition: res.boreportcolumn.countcondition,
min: res.boreportcolumn.min,
max: res.boreportcolumn.max,
maxchars: res.boreportcolumn.maxchars,
helptext: res.boreportcolumn.helptext,
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
  for (let key in this.boreportcolumnForm.controls) {
    if (this.boreportcolumnForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.boreportcolumnForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boreportcolumnForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boreportcolumnForm.value;
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
Object.keys(this.boreportcolumnForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boreportcolumnForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boreportcolumnForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boreportcolumnservice.formData=this.boreportcolumnForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boreportcolumnForm.controls[key] != null)
    {
        this.boreportcolumnservice.formData[key] = this.boreportcolumnForm.controls[key].value;
    }
}
}
}
console.log(this.boreportcolumnservice.formData);
this.boreportcolumnservice.formData=this.boreportcolumnForm.value;
this.boreportcolumnservice.saveOrUpdateboreportcolumns().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.boreportcolumn);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boreportcolumnservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.boreportcolumn);
}
else
{
this.FillData(res);
}
}
this.boreportcolumnForm.markAsUntouched();
this.boreportcolumnForm.markAsPristine();
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



