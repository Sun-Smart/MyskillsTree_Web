import { hrmseosmasterService } from './../../../service/hrmseosmaster.service';
import { hrmseosmaster } from './../../../model/hrmseosmaster.model';
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
import { hrmseosrole } from './../../../model/hrmseosrole.model';
import { hrmseosroleComponent } from './../../../pages/forms/hrmseosrole/hrmseosrole.component';
//FK services
import { bouserrolemaster,IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { hrmseosdetail } from './../../../model/hrmseosdetail.model';
import { hrmseosdetailComponent } from './../../../pages/forms/hrmseosdetail/hrmseosdetail.component';
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
selector: 'app-hrmseosmaster',
templateUrl: './hrmseosmaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmseosmasterComponent implements OnInit {
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
bfilterPopulatehrmseosmasters:boolean=false;
datahrmseosrolesroleid3:any=[];
bfilterPopulatehrmseosroles:boolean=false;
datahrmseosdetailstype3:any=[];
datahrmseosdetailsmode3:any=[];
datahrmseosdetailsbasedon3:any=[];
bfilterPopulatehrmseosdetails:boolean=false;
@ViewChild('tblhrmseosrolessource',{static:false}) tblhrmseosrolessource: Ng2SmartTableComponent;
@ViewChild('tblhrmseosdetailssource',{static:false}) tblhrmseosdetailssource: Ng2SmartTableComponent;
 hrmseosmasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmseosmastershowOption:boolean;
hrmseosroleshowOption:boolean;
hrmseosdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmseosrolesvisiblelist:any;
hrmseosroleshidelist:any;
hrmseosdetailsvisiblelist:any;
hrmseosdetailshidelist:any;

DeletedhrmseosroleIDs: string="";
hrmseosrolesID: string = "1";
hrmseosrolesselectedindex:any;
DeletedhrmseosdetailIDs: string="";
hrmseosdetailsID: string = "2";
hrmseosdetailsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmseosmasterservice: hrmseosmasterService,
private bouserrolemasterservice: bouserrolemasterService,
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
this.hrmseosmasterForm  = this.fb.group({
pk:[null],
eosd: [null],
eoscode: [null],
eosname: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmseosmasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmseosmasterForm.dirty && this.hrmseosmasterForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.eosd.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.eosd.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.eosd && pkDetail) {
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
let hrmseosmasterid = null;

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
this.formid=hrmseosmasterid;
//this.sharedService.alert(hrmseosmasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmseosrolesTableConfig();
  setTimeout(() => {
  this.SethrmseosrolesTableddConfig();
  });

this.SethrmseosdetailsTableConfig();
  setTimeout(() => {
  this.SethrmseosdetailsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmseosmasterservice.gethrmseosmastersList().then(res => {
      this.pkList = res as hrmseosmaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.eosname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.eosname;

//setting the flag that the screen is not touched 
this.hrmseosmasterForm.markAsUntouched();
this.hrmseosmasterForm.markAsPristine();
}



resetForm() {
if (this.hrmseosmasterForm != null)
this.hrmseosmasterForm.reset();
this.hrmseosmasterForm.patchValue({
});
setTimeout(() => {
this.hrmseosmasterservice.hrmseosroles=[];
this.hrmseosrolesLoadTable();
this.hrmseosmasterservice.hrmseosdetails=[];
this.hrmseosdetailsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let eosd = this.hrmseosmasterForm.get('eosd').value;
        if(eosd!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmseosmasterservice.deletehrmseosmaster(eosd).then(res =>
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
    this.hrmseosmasterForm.patchValue({
        eosd: null
    });
    if(this.hrmseosmasterservice.formData.eosd!=null)this.hrmseosmasterservice.formData.eosd=null;
for (let i=0;i<this.hrmseosmasterservice.hrmseosroles.length;i++) {
this.hrmseosmasterservice.hrmseosroles[i].eosroleid=null;
}
for (let i=0;i<this.hrmseosmasterservice.hrmseosdetails.length;i++) {
this.hrmseosmasterservice.hrmseosdetails[i].detailid=null;
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
this.hrmseosmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmseosmasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmseosmasterForm.controls[key]!=undefined)
{
this.hrmseosmasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.hrmseosmasterservice.formData.eosname!=null )
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

edithrmseosmasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmseosmasterservice.gethrmseosmastersByEID(pkcol).then(res => {

this.hrmseosmasterservice.formData=res.hrmseosmaster;
let formproperty=res.hrmseosmaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmseosmaster.pkcol;
this.formid=res.hrmseosmaster.eosd;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmseosmaster.eosd;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmseosmasterForm.patchValue({
eosd: res.hrmseosmaster.eosd,
eoscode: res.hrmseosmaster.eoscode,
eosname: res.hrmseosmaster.eosname,
status: res.hrmseosmaster.status,
statusdesc: res.hrmseosmaster.statusdesc,
});
this.hrmseosrolesvisiblelist=res.hrmseosrolesvisiblelist;
this.hrmseosdetailsvisiblelist=res.hrmseosdetailsvisiblelist;
//Child Tables if any
this.hrmseosmasterservice.hrmseosroles = res.hrmseosroles;
this.SethrmseosrolesTableConfig();
this.hrmseosrolesLoadTable();
  setTimeout(() => {
  this.SethrmseosrolesTableddConfig();
  });
this.hrmseosmasterservice.hrmseosdetails = res.hrmseosdetails;
this.SethrmseosdetailsTableConfig();
this.hrmseosdetailsLoadTable();
  setTimeout(() => {
  this.SethrmseosdetailsTableddConfig();
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
  for (let key in this.hrmseosmasterForm.controls) {
    if (this.hrmseosmasterForm.controls[key] != null) {
if(false)
{
if(this.hrmseosmasterservice.formData!=null && this.hrmseosmasterservice.formData[key]!=null  && this.hrmseosmasterservice.formData[key]!='[]' && this.hrmseosmasterservice.formData[key]!=undefined && this.hrmseosmasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmseosmasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmseosmasterservice.formData!=null && this.hrmseosmasterservice.formData[key]!=null   && this.hrmseosmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmseosmasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmseosmasterservice.formData!=null && this.hrmseosmasterservice.formData[key]!=null   && this.hrmseosmasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmseosmasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmseosmasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmseosmasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmseosmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmseosmasterForm.value;
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

private hrmseosmastertoggleOption(){
this.hrmseosmastershowOption = this.hrmseosmastershowOption === true ? false : true;
}

private hrmseosroletoggleOption(){
this.hrmseosroleshowOption = this.hrmseosroleshowOption === true ? false : true;
}

private hrmseosdetailtoggleOption(){
this.hrmseosdetailshowOption = this.hrmseosdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmseosmasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmseosmasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmseosmasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmseosmasterservice.formData=this.hrmseosmasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmseosmasterForm.controls[key] != null)
    {
        this.hrmseosmasterservice.formData[key] = this.hrmseosmasterForm.controls[key].value;
    }
}
}
}
this.hrmseosmasterservice.formData.DeletedhrmseosroleIDs = this.DeletedhrmseosroleIDs;
this.hrmseosmasterservice.formData.DeletedhrmseosdetailIDs = this.DeletedhrmseosdetailIDs;
console.log(this.hrmseosmasterservice.formData);
this.hrmseosmasterservice.formData=this.hrmseosmasterForm.value;
this.hrmseosmasterservice.saveOrUpdatehrmseosmasters().subscribe(
async res => {
if (this.hrmseosrolessource.data)
{
    for (let i = 0; i < this.hrmseosrolessource.data.length; i++)
    {
        if (this.hrmseosrolessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmseosrolessource.data[i].fileattachmentlist);
    }
}
if (this.hrmseosdetailssource.data)
{
    for (let i = 0; i < this.hrmseosdetailssource.data.length; i++)
    {
        if (this.hrmseosdetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmseosdetailssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmseosmaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmseosmasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmseosmaster);
}
else
{
this.FillData(res);
}
}
this.hrmseosmasterForm.markAsUntouched();
this.hrmseosmasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmseosrole(event:any,eosroleid:any, eosd:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmseosroleComponent, 
{
data:  {  showview:false,save:false,event,eosroleid, eosd,visiblelist:this.hrmseosrolesvisiblelist,  hidelist:this.hrmseosroleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmseosrolessource.add(res);
this.hrmseosrolessource.refresh();
}
else
{
this.hrmseosrolessource.update(event.data, res);
}
}
});
}

onDeletehrmseosrole(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmseosroleIDs += childID + ",";
this.hrmseosmasterservice.hrmseosroles.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmseosdetail(event:any,detailid:any, eosd:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmseosdetailComponent, 
{
data:  {  showview:false,save:false,event,detailid, eosd,visiblelist:this.hrmseosdetailsvisiblelist,  hidelist:this.hrmseosdetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmseosdetailssource.add(res);
this.hrmseosdetailssource.refresh();
}
else
{
this.hrmseosdetailssource.update(event.data, res);
}
}
});
}

onDeletehrmseosdetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmseosdetailIDs += childID + ",";
this.hrmseosmasterservice.hrmseosdetails.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmseosroles
hrmseosrolessettings:any;
hrmseosrolessource: any;

showhrmseosrolesCheckbox()
{
debugger;
if(this.tblhrmseosrolessource.settings['selectMode']== 'multi')this.tblhrmseosrolessource.settings['selectMode']= 'single';
else
this.tblhrmseosrolessource.settings['selectMode']= 'multi';
this.tblhrmseosrolessource.initGrid();
}
deletehrmseosrolesAll()
{
this.tblhrmseosrolessource.settings['selectMode'] = 'single';
}
showhrmseosrolesFilter()
{
  setTimeout(() => {
  this.SethrmseosrolesTableddConfig();
  });
      if(this.tblhrmseosrolessource.settings!=null)this.tblhrmseosrolessource.settings['hideSubHeader'] =!this.tblhrmseosrolessource.settings['hideSubHeader'];
this.tblhrmseosrolessource.initGrid();
}
showhrmseosrolesInActive()
{
}
enablehrmseosrolesInActive()
{
}
async SethrmseosrolesTableddConfig()
{
if(!this.bfilterPopulatehrmseosroles){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmseosrolesroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmseosrolesroleid3.push(obj);
}
if((this.tblhrmseosrolessource.settings as any).columns['roleid'])
{
(this.tblhrmseosrolessource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmseosrolesroleid3));
this.tblhrmseosrolessource.initGrid();
}
});
}
this.bfilterPopulatehrmseosroles=true;
}
async hrmseosrolesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmseosrolesTableConfig()
{
this.hrmseosrolessettings = {
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
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmseosrolesroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmseosrolesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmseosrolesID)>=0)
{
this.hrmseosrolessource=new LocalDataSource();
this.hrmseosrolessource.load(this.hrmseosmasterservice.hrmseosroles as  any as LocalDataSource);
this.hrmseosrolessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmseosrolesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmseosmasterservice.hrmseosroles.length == 0)
{
    this.tblhrmseosrolessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmseosrole();
    this.hrmseosmasterservice.hrmseosroles.push(obj);
    this.hrmseosrolessource.refresh();
    if ((this.hrmseosmasterservice.hrmseosroles.length / this.hrmseosrolessource.getPaging().perPage).toFixed(0) + 1 != this.hrmseosrolessource.getPaging().page)
    {
        this.hrmseosrolessource.setPage((this.hrmseosmasterservice.hrmseosroles.length / this.hrmseosrolessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmseosrolessource.grid.edit(this.tblhrmseosrolessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmseosrolessource.data.indexOf(event.data);
this.onDeletehrmseosrole(event,event.data.eosroleid,((this.hrmseosrolessource.getPaging().page-1) *this.hrmseosrolessource.getPaging().perPage)+index);
this.hrmseosrolessource.refresh();
break;
}
}

*/
hrmseosrolesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmseosrole(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmseosrole(event,event.data.eosroleid,this.formid);
break;
case 'delete':
this.onDeletehrmseosrole(event,event.data.eosroleid,((this.hrmseosrolessource.getPaging().page-1) *this.hrmseosrolessource.getPaging().perPage)+event.index);
this.hrmseosrolessource.refresh();
break;
}
}
hrmseosrolesonDelete(obj) {
let eosroleid=obj.data.eosroleid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmseosmasterservice.deletehrmseosmaster(eosroleid).then(res=>
this.hrmseosrolesLoadTable()
);
}
}
hrmseosrolesPaging(val)
{
debugger;
this.hrmseosrolessource.setPaging(1, val, true);
}

handlehrmseosrolesGridSelected(event:any) {
this.hrmseosrolesselectedindex=this.hrmseosmasterservice.hrmseosroles.findIndex(i => i.eosroleid === event.data.eosroleid);
}
IshrmseosrolesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmseosrolesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmseosroles
//start of Grid Codes hrmseosdetails
hrmseosdetailssettings:any;
hrmseosdetailssource: any;

showhrmseosdetailsCheckbox()
{
debugger;
if(this.tblhrmseosdetailssource.settings['selectMode']== 'multi')this.tblhrmseosdetailssource.settings['selectMode']= 'single';
else
this.tblhrmseosdetailssource.settings['selectMode']= 'multi';
this.tblhrmseosdetailssource.initGrid();
}
deletehrmseosdetailsAll()
{
this.tblhrmseosdetailssource.settings['selectMode'] = 'single';
}
showhrmseosdetailsFilter()
{
  setTimeout(() => {
  this.SethrmseosdetailsTableddConfig();
  });
      if(this.tblhrmseosdetailssource.settings!=null)this.tblhrmseosdetailssource.settings['hideSubHeader'] =!this.tblhrmseosdetailssource.settings['hideSubHeader'];
this.tblhrmseosdetailssource.initGrid();
}
showhrmseosdetailsInActive()
{
}
enablehrmseosdetailsInActive()
{
}
async SethrmseosdetailsTableddConfig()
{
if(!this.bfilterPopulatehrmseosdetails){

this.configservice.getList("statutorycriteria").then(res=>
{
var databasedon2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmseosdetailsbasedon3.push(defaultobj);
for(let i=0; i<databasedon2.length; i++){
var obj= { value: databasedon2[i].configkey, title: databasedon2[i].configtext};
this.datahrmseosdetailsbasedon3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmseosdetailssource.settings);
if(clone.columns['basedon']!=undefined)clone.columns['basedon'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmseosdetailsbasedon3)), }, };
if(clone.columns['basedon']!=undefined)clone.columns['basedon'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmseosdetailsbasedon3)), }, };
this.tblhrmseosdetailssource.settings =  clone;
this.tblhrmseosdetailssource.initGrid();
});

this.configservice.getList("eosmode").then(res=>
{
var datamode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmseosdetailsmode3.push(defaultobj);
for(let i=0; i<datamode2.length; i++){
var obj= { value: datamode2[i].configkey, title: datamode2[i].configtext};
this.datahrmseosdetailsmode3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmseosdetailssource.settings);
if(clone.columns['mode']!=undefined)clone.columns['mode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmseosdetailsmode3)), }, };
if(clone.columns['mode']!=undefined)clone.columns['mode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmseosdetailsmode3)), }, };
this.tblhrmseosdetailssource.settings =  clone;
this.tblhrmseosdetailssource.initGrid();
});

this.configservice.getList("amounttype").then(res=>
{
var datatype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmseosdetailstype3.push(defaultobj);
for(let i=0; i<datatype2.length; i++){
var obj= { value: datatype2[i].configkey, title: datatype2[i].configtext};
this.datahrmseosdetailstype3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmseosdetailssource.settings);
if(clone.columns['type']!=undefined)clone.columns['type'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmseosdetailstype3)), }, };
if(clone.columns['type']!=undefined)clone.columns['type'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmseosdetailstype3)), }, };
this.tblhrmseosdetailssource.settings =  clone;
this.tblhrmseosdetailssource.initGrid();
});
}
this.bfilterPopulatehrmseosdetails=true;
}
async hrmseosdetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmseosdetailsTableConfig()
{
this.hrmseosdetailssettings = {
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
basedon: {
title: 'Based On',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmseosdetailsbasedon3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
fromdays: {
title: 'From Days',
type: 'number',
filter:true,
},
todays: {
title: 'To Days',
type: 'number',
filter:true,
},
forevery: {
title: 'For Every',
type: 'number',
filter:true,
},
startfromjoin: {
title: 'Start From Join',
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
mode: {
title: 'Mode',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmseosdetailsmode3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
type: {
title: 'Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmseosdetailstype3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
typevalue: {
title: 'Type Value',
type: '',
filter:true,
},
},
};
}
hrmseosdetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmseosdetailsID)>=0)
{
this.hrmseosdetailssource=new LocalDataSource();
this.hrmseosdetailssource.load(this.hrmseosmasterservice.hrmseosdetails as  any as LocalDataSource);
this.hrmseosdetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmseosdetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmseosmasterservice.hrmseosdetails.length == 0)
{
    this.tblhrmseosdetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmseosdetail();
    this.hrmseosmasterservice.hrmseosdetails.push(obj);
    this.hrmseosdetailssource.refresh();
    if ((this.hrmseosmasterservice.hrmseosdetails.length / this.hrmseosdetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmseosdetailssource.getPaging().page)
    {
        this.hrmseosdetailssource.setPage((this.hrmseosmasterservice.hrmseosdetails.length / this.hrmseosdetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmseosdetailssource.grid.edit(this.tblhrmseosdetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmseosdetailssource.data.indexOf(event.data);
this.onDeletehrmseosdetail(event,event.data.detailid,((this.hrmseosdetailssource.getPaging().page-1) *this.hrmseosdetailssource.getPaging().perPage)+index);
this.hrmseosdetailssource.refresh();
break;
}
}

*/
hrmseosdetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmseosdetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmseosdetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeletehrmseosdetail(event,event.data.detailid,((this.hrmseosdetailssource.getPaging().page-1) *this.hrmseosdetailssource.getPaging().perPage)+event.index);
this.hrmseosdetailssource.refresh();
break;
}
}
hrmseosdetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmseosmasterservice.deletehrmseosmaster(detailid).then(res=>
this.hrmseosdetailsLoadTable()
);
}
}
hrmseosdetailsPaging(val)
{
debugger;
this.hrmseosdetailssource.setPaging(1, val, true);
}

handlehrmseosdetailsGridSelected(event:any) {
this.hrmseosdetailsselectedindex=this.hrmseosmasterservice.hrmseosdetails.findIndex(i => i.detailid === event.data.detailid);
}
IshrmseosdetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmseosdetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmseosdetails

}



