import { ltylevelService } from './../../../service/ltylevel.service';
import { ltylevel } from './../../../model/ltylevel.model';
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
import { ltycustomerlevel } from './../../../model/ltycustomerlevel.model';
import { ltycustomerlevelComponent } from './../../../pages/forms/ltycustomerlevel/ltycustomerlevel.component';
//FK services
import { crmcustomermaster,IcrmcustomermasterResponse } from '../../../../../../n-tire-crm-app/src/app/model/crmcustomermaster.model';
import { crmcustomermasterComponent } from '../../../../../../n-tire-crm-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component';
import { crmcustomermasterService } from '../../../../../../n-tire-crm-app/src/app/service/crmcustomermaster.service';
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
selector: 'app-ltylevel',
templateUrl: './ltylevel.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltylevelComponent implements OnInit {
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
bfilterPopulateltylevels:boolean=false;
dataltylevelsrecurringperiod3:any=[];
dataltylevelsassessmentday3:any=[];
dataltylevelsassessmentmonth3:any=[];
dataltycustomerlevelscustomerid3:any=[];
bfilterPopulateltycustomerlevels:boolean=false;
@ViewChild('tblltycustomerlevelssource',{static:false}) tblltycustomerlevelssource: Ng2SmartTableComponent;
 ltylevelForm: FormGroup;
recurringperiodList: boconfigvalue[];
assessmentdayList: boconfigvalue[];
assessmentmonthList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;
sourcekey:any;



ltycustomerlevelsvisiblelist:any;
ltycustomerlevelshidelist:any;

DeletedltycustomerlevelIDs: string="";
ltycustomerlevelsID: string = "1";
ltycustomerlevelsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private ltylevelservice: ltylevelService,
private crmcustomermasterservice: crmcustomermasterService,
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
this.ltylevelForm  = this.fb.group({
pk:[null],
levelid: [null],
name: [null],
description: [null],
qualifyingpoints: [null],
minimumtierlength: [null],
qualifyingperiodlength: [null],
tierenddate: [null],
recurringperiod: [null],
recurringperioddesc: [null],
assessmentday: [null],
assessmentdaydesc: [null],
assessmentmonth: [null],
assessmentmonthdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltylevelForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltylevelForm.dirty && this.ltylevelForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.levelid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.levelid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.levelid && pkDetail) {
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
let ltylevelid = null;

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
this.formid=ltylevelid;
//this.sharedService.alert(ltylevelid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetltycustomerlevelsTableConfig();
  setTimeout(() => {
  this.SetltycustomerlevelsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("frequency").then(res => this.recurringperiodList = res as boconfigvalue[]);
this.configservice.getList("days").then(res => this.assessmentdayList = res as boconfigvalue[]);
this.configservice.getList("month").then(res => this.assessmentmonthList = res as boconfigvalue[]);

//autocomplete
    this.ltylevelservice.getltylevelsList().then(res => {
      this.pkList = res as ltylevel[];
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
this.ltylevelForm.markAsUntouched();
this.ltylevelForm.markAsPristine();
}



resetForm() {
if (this.ltylevelForm != null)
this.ltylevelForm.reset();
this.ltylevelForm.patchValue({
});
setTimeout(() => {
this.ltylevelservice.ltycustomerlevels=[];
this.ltylevelservice.Insertltycustomerlevels=[];
this.ltycustomerlevelsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let levelid = this.ltylevelForm.get('levelid').value;
        if(levelid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltylevelservice.deleteltylevel(levelid).then(res =>
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
    this.ltylevelForm.patchValue({
        levelid: null
    });
    if(this.ltylevelservice.formData.levelid!=null)this.ltylevelservice.formData.levelid=null;
for (let i=0;i<this.ltylevelservice.ltycustomerlevels.length;i++) {
this.ltylevelservice.ltycustomerlevels[i].customerlevelid=null;
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
        else if(key=="tierenddate")
this.ltylevelForm.patchValue({"tierenddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.ltylevelForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltylevelForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltylevelForm.controls[key]!=undefined)this.ltylevelForm.controls[key].disable({onlySelf: true});
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
recurringperiodonChange(evt:any){
let e=this.f.recurringperiod.value as any;
this.ltylevelForm.patchValue({recurringperioddesc:evt.options[evt.options.selectedIndex].text});
}
assessmentdayonChange(evt:any){
let e=this.f.assessmentday.value as any;
this.ltylevelForm.patchValue({assessmentdaydesc:evt.options[evt.options.selectedIndex].text});
}
assessmentmonthonChange(evt:any){
let e=this.f.assessmentmonth.value as any;
this.ltylevelForm.patchValue({assessmentmonthdesc:evt.options[evt.options.selectedIndex].text});
}

async PopulateScreen(pkcol:any){
this.ltylevelservice.getltylevelsByEID(pkcol).then(res => {

this.ltylevelservice.formData=res.ltylevel;
let formproperty=res.ltylevel.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltylevel.pkcol;
this.formid=res.ltylevel.levelid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltylevel.levelid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltylevelForm.patchValue({
levelid: res.ltylevel.levelid,
name: res.ltylevel.name,
description: res.ltylevel.description,
qualifyingpoints: res.ltylevel.qualifyingpoints,
minimumtierlength: res.ltylevel.minimumtierlength,
qualifyingperiodlength: res.ltylevel.qualifyingperiodlength,
tierenddate: this.ngbDateParserFormatter.parse(res.ltylevel.tierenddate),
recurringperiod: res.ltylevel.recurringperiod,
recurringperioddesc: res.ltylevel.recurringperioddesc,
assessmentday: res.ltylevel.assessmentday,
assessmentdaydesc: res.ltylevel.assessmentdaydesc,
assessmentmonth: res.ltylevel.assessmentmonth,
assessmentmonthdesc: res.ltylevel.assessmentmonthdesc,
status: res.ltylevel.status,
statusdesc: res.ltylevel.statusdesc,
});
this.ltycustomerlevelsvisiblelist=res.ltycustomerlevelsvisiblelist;
//Child Tables if any
this.ltylevelservice.ltycustomerlevels = res.ltycustomerlevels;
this.SetltycustomerlevelsTableConfig();
this.ltycustomerlevelsLoadTable();
  setTimeout(() => {
  this.SetltycustomerlevelsTableddConfig();
  });
this.ltylevelservice.Insertltycustomerlevels=[];
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
  for (let key in this.ltylevelForm.controls) {
    if (this.ltylevelForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltylevelForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltylevelForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltylevelForm.value;
obj.tierenddate=new Date(this.ltylevelForm.get('tierenddate').value ? this.ngbDateParserFormatter.format(this.ltylevelForm.get('tierenddate').value)+'  UTC' :null);
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
Object.keys(this.ltylevelForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltylevelForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltylevelForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltylevelservice.formData=this.ltylevelForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltylevelForm.controls[key] != null)
    {
        this.ltylevelservice.formData[key] = this.ltylevelForm.controls[key].value;
    }
}
}
}
this.ltylevelservice.formData.tierenddate=new Date(this.ltylevelForm.get('tierenddate').value ? this.ngbDateParserFormatter.format(this.ltylevelForm.get('tierenddate').value)+'  UTC' :null);
this.ltylevelservice.formData.DeletedltycustomerlevelIDs = this.DeletedltycustomerlevelIDs;
console.log(this.ltylevelservice.formData);
this.ltylevelservice.formData=this.ltylevelForm.value;
this.ltylevelservice.saveOrUpdateltylevels().subscribe(
async res => {
if (this.ltycustomerlevelssource.data)
{
    for (let i = 0; i < this.ltycustomerlevelssource.data.length; i++)
    {
        if (this.ltycustomerlevelssource.data[i].fileattachmentlist)await this.sharedService.upload(this.ltycustomerlevelssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltylevel);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltylevelservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltylevel);
}
else
{
this.FillData(res);
}
}
this.ltylevelForm.markAsUntouched();
this.ltylevelForm.markAsPristine();
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
//start of Grid Codes ltycustomerlevels
onCustomltycustomerlevelsAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(crmcustomermasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
          header: 'crmcustomermaster details'
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
ltycustomerlevelssettings:any;
ltycustomerlevelssource: any;

showltycustomerlevelsCheckbox()
{
debugger;
if(this.tblltycustomerlevelssource.settings['selectMode']== 'multi')this.tblltycustomerlevelssource.settings['selectMode']= 'single';
else
this.tblltycustomerlevelssource.settings['selectMode']= 'multi';
this.tblltycustomerlevelssource.initGrid();
}
deleteltycustomerlevelsAll()
{
this.tblltycustomerlevelssource.settings['selectMode'] = 'single';
}
showltycustomerlevelsFilter()
{
  setTimeout(() => {
  this.SetltycustomerlevelsTableddConfig();
  });
      if(this.tblltycustomerlevelssource.settings!=null)this.tblltycustomerlevelssource.settings['hideSubHeader'] =!this.tblltycustomerlevelssource.settings['hideSubHeader'];
this.tblltycustomerlevelssource.initGrid();
}
showltycustomerlevelsInActive()
{
}
enableltycustomerlevelsInActive()
{
}
async SetltycustomerlevelsTableddConfig()
{
if(!this.bfilterPopulateltycustomerlevels){

this.crmcustomermasterservice.getcrmcustomermastersList().then(res=>
{
var datacustomerid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataltycustomerlevelscustomerid3.push(defaultobj);
for(let i=0; i<datacustomerid2.length; i++){
var obj= { value: datacustomerid2[i].customerid, title:datacustomerid2[i].lastname};
this.dataltycustomerlevelscustomerid3.push(obj);
}
if((this.tblltycustomerlevelssource.settings as any).columns['customerid'])
{
(this.tblltycustomerlevelssource.settings as any).columns['customerid'].editor.config.list=JSON.parse(JSON.stringify(this.dataltycustomerlevelscustomerid3));
this.tblltycustomerlevelssource.initGrid();
}
});
}
this.bfilterPopulateltycustomerlevels=true;
}
async ltycustomerlevelsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetltycustomerlevelsTableConfig()
{
this.ltycustomerlevelssettings = {
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
customerlevelid: {
title: 'Customer Level',
type: '',
},
companyname: {
title: 'Companyname',
type: '',
},
firstname: {
title: 'Firstname',
type: '',
},
lastname: {
title: 'Lastname',
type: '',
},
},
};
}
ltycustomerlevelsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerlevelsID)>=0)
{
this.ltycustomerlevelssource=new LocalDataSource();
this.ltycustomerlevelssource.load(this.ltylevelservice.ltycustomerlevels as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblltycustomerlevelssource!=null)
{this.tblltycustomerlevelssource.grid.getRows().forEach((row:any) => {
if(row.data.customerlevelid!=null && row.data.customerlevelid!="")
{
this.ltylevelservice.Insertltycustomerlevels.push(row.data);
this.tblltycustomerlevelssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
ltycustomerlevelsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.ltylevelservice.ltycustomerlevels.length == 0)
{
    this.tblltycustomerlevelssource.grid.createFormShown = true;
}
else
{
    let obj = new ltycustomerlevel();
    this.ltylevelservice.ltycustomerlevels.push(obj);
    this.ltycustomerlevelssource.refresh();
    if ((this.ltylevelservice.ltycustomerlevels.length / this.ltycustomerlevelssource.getPaging().perPage).toFixed(0) + 1 != this.ltycustomerlevelssource.getPaging().page)
    {
        this.ltycustomerlevelssource.setPage((this.ltylevelservice.ltycustomerlevels.length / this.ltycustomerlevelssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblltycustomerlevelssource.grid.edit(this.tblltycustomerlevelssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.ltycustomerlevelssource.data.indexOf(event.data);
this.onDeleteltycustomerlevel(event,event.data.customerlevelid,((this.ltycustomerlevelssource.getPaging().page-1) *this.ltycustomerlevelssource.getPaging().perPage)+index);
this.ltycustomerlevelssource.refresh();
break;
}
}

*/
ltycustomerlevelsPaging(val)
{
debugger;
this.ltycustomerlevelssource.setPaging(1, val, true);
}

handleltycustomerlevelsGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.customerlevelid==null || event.data.customerlevelid=="")
{
var obj={levelid:this.formid,customerid:event.data.customerid}
this.ltylevelservice.Insertltycustomerlevels.push(obj as any);
}
else
{
var deletedids=this.DeletedltycustomerlevelIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.customerlevelid)
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
if(event.data.customerlevelid!=null && event.data.customerlevelid!="")this.DeletedltycustomerlevelIDs += event.data.customerlevelid + ","; 
}
}
IsltycustomerlevelsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.ltycustomerlevelsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes ltycustomerlevels

}



