import { boconfigvalueService } from './../../../service/boconfigvalue.service';
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../shared/general.validator';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';

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
import { bosubconfigvalue } from '../../../../../../n-tire-biz-app/src/app/model/bosubconfigvalue.model';
import { bosubconfigvalueComponent } from '../../../../../../n-tire-biz-app/src/app/pages/forms/bosubconfigvalue/bosubconfigvalue.component';
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
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import {AppConstants} from '../../../shared/helper';

@Component({
selector: 'app-boconfigvalue',
templateUrl: './boconfigvalue.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class boconfigvalueComponent implements OnInit {
hidelist:any=[];
objvalues:any=[];
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
bfilterPopulateboconfigvalues:boolean=false;
databosubconfigvaluesconfigkey3:any=[];
databosubconfigvaluessubconfigcode3:any=[];
bfilterPopulatebosubconfigvalues:boolean=false;
boconfigvaluemenuactions:any=[]
bosubconfigvaluemenuactions:any=[]
@ViewChild('tblbosubconfigvaluessource',{static:false}) tblbosubconfigvaluessource: Ng2SmartTableComponent;
 boconfigvalueForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
boconfigvalueshowOption:boolean;
bosubconfigvalueshowOption:boolean;
sessiondata:any;
sourcekey:any;



bosubconfigvaluesvisiblelist:any;
bosubconfigvalueshidelist:any;

DeletedbosubconfigvalueIDs: string="";
bosubconfigvaluesID: string = "1";
bosubconfigvaluesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private themeService:ThemeService,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private boconfigvalueservice: boconfigvalueService,
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
this.boconfigvalueForm  = this.fb.group({
pk:[null],
configid: [null],
param: [null],
configkey: [null],
configtext: [null],
orderno: [null],
htmlcode: [null],
param1: [null],
param2: [null],
helptext: [null],
flag: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.boconfigvalueForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.boconfigvalueForm.dirty && this.boconfigvalueForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.configid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.configid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.configid && pkDetail) {
        this.PopulateScreen(pkDetail.pkcol);
    }
  }

// initialize
async ngOnInit() {
//session & theme
this.themeService.theme.subscribe((val: string) => {
    this.theme = val;
});

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
if(this.maindata!=null && this.maindata.ScreenType!=undefined  && this.maindata.ScreenType!=null)
{
this.viewhtml ='';
}
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
let boconfigvalueid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=boconfigvalueid;
//alert(boconfigvalueid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetbosubconfigvaluesTableConfig();
  setTimeout(() => {
  this.SetbosubconfigvaluesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.boconfigvalueservice.getboconfigvaluesList().then(res => {
      this.pkList = res as boconfigvalue[];
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
this.boconfigvalueForm.markAsUntouched();
this.boconfigvalueForm.markAsPristine();
}



resetForm() {
if (this.boconfigvalueForm != null)
this.boconfigvalueForm.reset();
this.boconfigvalueForm.patchValue({
});
setTimeout(() => {
this.boconfigvalueservice.bosubconfigvalues=[];
this.bosubconfigvaluesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let configid = this.boconfigvalueForm.get('configid').value;
        if(configid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.boconfigvalueservice.deleteboconfigvalue(configid).then(res =>
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
    this.boconfigvalueForm.patchValue({
        configid: null
    });
    if(this.boconfigvalueservice.formData.configid!=null)this.boconfigvalueservice.formData.configid=null;
for (let i=0;i<this.boconfigvalueservice.bosubconfigvalues.length;i++) {
this.boconfigvalueservice.bosubconfigvalues[i].subcategoryid=null;
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
this.boconfigvalueForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.boconfigvalueForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.boconfigvalueForm.controls[key]!=undefined)
{
this.boconfigvalueForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
onClose() {
this.dialogRef.close(this.objvalues);
}

onSubmitAndWait() {
if(this.maindata==undefined || (this.maindata.maindatapkcol!='' && this.maindata.maindatapkcol!=null && this.maindata.maindatapkcol!=undefined)  || this.maindata.save==true  )
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
if(this.maindata==undefined || (this.maindata.maindatapkcol!='' && this.maindata.maindatapkcol!=null && this.maindata.maindatapkcol!=undefined)  || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

editboconfigvalues() {
this.showview=false;
setTimeout(() => {
});
return false;
}



async PopulateScreen(pkcol:any){
this.boconfigvalueservice.getboconfigvaluesByEID(pkcol).then(res => {

this.boconfigvalueservice.formData=res.boconfigvalue;
let formproperty=res.boconfigvalue.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.boconfigvalue.pkcol;
this.formid=res.boconfigvalue.configid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.boconfigvalueservice.formData=res.boconfigvalue;
this.formid=res.boconfigvalue.configid;
this.pkcol=res.boconfigvalue.pkcol;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.boconfigvalueForm.patchValue({
configid: res.boconfigvalue.configid,
param: res.boconfigvalue.param,
configkey: res.boconfigvalue.configkey,
configtext: res.boconfigvalue.configtext,
orderno: res.boconfigvalue.orderno,
htmlcode: res.boconfigvalue.htmlcode,
param1: res.boconfigvalue.param1,
param2: res.boconfigvalue.param2,
helptext: res.boconfigvalue.helptext,
flag: res.boconfigvalue.flag,
status: res.boconfigvalue.status,
statusdesc: res.boconfigvalue.statusdesc,
});
this.boconfigvaluemenuactions=res.boconfigvaluemenuactions;
this.bosubconfigvaluemenuactions=res.bosubconfigvaluemenuactions;
this.bosubconfigvaluesvisiblelist=res.bosubconfigvaluesvisiblelist;
//Child Tables if any
this.boconfigvalueservice.bosubconfigvalues = res.bosubconfigvalues;
this.SetbosubconfigvaluesTableConfig();
this.bosubconfigvaluesLoadTable();
  setTimeout(() => {
  this.SetbosubconfigvaluesTableddConfig();
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
  for (let key in this.boconfigvalueForm.controls) {
let val = this.boconfigvalueForm.controls[key].value;
if (val == 'null' || val == null || val == undefined) val = '';
    if (this.boconfigvalueForm.controls[key] != null) {
if(false)
{
if(this.boconfigvalueservice.formData!=null && this.boconfigvalueservice.formData[key]!=null  && this.boconfigvalueservice.formData[key]!='[]' && this.boconfigvalueservice.formData[key]!=undefined && this.boconfigvalueservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),AppConstants.AttachmentURL+ JSON.parse(this.boconfigvalueservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.boconfigvalueservice.formData!=null && this.boconfigvalueservice.formData[key]!=null   && this.boconfigvalueservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.boconfigvalueservice.formData[key]+"></div>");
}
else if(false)
{
if(this.boconfigvalueservice.formData!=null && this.boconfigvalueservice.formData[key]!=null   && this.boconfigvalueservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.boconfigvalueservice.formData[key]+"'><div class='progress__number'>"+this.boconfigvalueservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
    }
  }
var re = /##(\w+)##/g;
ret = ret.replace(re, '');
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.boconfigvalueForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.boconfigvalueForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
this.objvalues.push(obj);
this.dialogRef.close(this.objvalues);
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

private boconfigvaluetoggleOption(){
this.boconfigvalueshowOption = this.boconfigvalueshowOption === true ? false : true;
}

private bosubconfigvaluetoggleOption(){
this.bosubconfigvalueshowOption = this.bosubconfigvalueshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.boconfigvalueForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.boconfigvalueForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.boconfigvalueForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.boconfigvalueservice.formData=this.boconfigvalueForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.boconfigvalueForm.controls[key] != null)
    {
        this.boconfigvalueservice.formData[key] = this.boconfigvalueForm.controls[key].value;
    }
}
}
}
this.boconfigvalueservice.formData.DeletedbosubconfigvalueIDs = this.DeletedbosubconfigvalueIDs;
console.log(this.boconfigvalueservice.formData);
this.boconfigvalueservice.formData=this.boconfigvalueForm.value;
this.boconfigvalueservice.saveOrUpdateboconfigvalues().subscribe(
async res => {
if (this.bosubconfigvaluessource.data)
{
    for (let i = 0; i < this.bosubconfigvaluessource.data.length; i++)
    {
        if (this.bosubconfigvaluessource.data[i].fileattachmentlist)await this.sharedService.upload(this.bosubconfigvaluessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.objvalues.push((res as any).boconfigvalue);
if(!bclear)this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(!bclear && this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close(this.objvalues);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.boconfigvalueservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.objvalues.push((res as any).boconfigvalue);
this.dialogRef.close(this.objvalues);
}
else
{
this.FillData(res);
}
}
this.boconfigvalueForm.markAsUntouched();
this.boconfigvalueForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditbosubconfigvalue(event:any,subcategoryid:any, configid:any) {
let add=false;
if(event==null)add=true;
let childsave=false;
if(this.pkcol!=undefined && this.pkcol!=null)childsave=true;
this.dialog.open(bosubconfigvalueComponent, 
{
data:  {  showview:false,save: childsave,maindatapkcol:this.pkcol,event,subcategoryid, configid,visiblelist:this.bosubconfigvaluesvisiblelist,  hidelist:this.bosubconfigvalueshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
for(let i=0;i<res.length;i++)
{
this.bosubconfigvaluessource.add(res[i]);
}
this.bosubconfigvaluessource.refresh();
}
else
{
this.bosubconfigvaluessource.update(event.data, res[0]);
}
}
});
}

onDeletebosubconfigvalue(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedbosubconfigvalueIDs += childID + ",";
this.boconfigvalueservice.bosubconfigvalues.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes bosubconfigvalues
bosubconfigvaluessettings:any;
bosubconfigvaluessource: any;

showbosubconfigvaluesCheckbox()
{
debugger;
if(this.tblbosubconfigvaluessource.settings['selectMode']== 'multi')this.tblbosubconfigvaluessource.settings['selectMode']= 'single';
else
this.tblbosubconfigvaluessource.settings['selectMode']= 'multi';
this.tblbosubconfigvaluessource.initGrid();
}
deletebosubconfigvaluesAll()
{
this.tblbosubconfigvaluessource.settings['selectMode'] = 'single';
}
showbosubconfigvaluesFilter()
{
  setTimeout(() => {
  this.SetbosubconfigvaluesTableddConfig();
  });
      if(this.tblbosubconfigvaluessource.settings!=null)this.tblbosubconfigvaluessource.settings['hideSubHeader'] =!this.tblbosubconfigvaluessource.settings['hideSubHeader'];
this.tblbosubconfigvaluessource.initGrid();
}
showbosubconfigvaluesInActive()
{
}
enablebosubconfigvaluesInActive()
{
}
async SetbosubconfigvaluesTableddConfig()
{
if(!this.bfilterPopulatebosubconfigvalues){

this.configservice.getList("configkey").then(res=>
{
var dataconfigkey2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databosubconfigvaluesconfigkey3.push(defaultobj);
for(let i=0; i<dataconfigkey2.length; i++){
var obj= { value: dataconfigkey2[i].configkey, title: dataconfigkey2[i].configtext};
this.databosubconfigvaluesconfigkey3.push(obj);
}
var clone = this.sharedService.clone(this.tblbosubconfigvaluessource.settings);
if(clone.columns['configkey']!=undefined)clone.columns['configkey'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databosubconfigvaluesconfigkey3)), }, };
if(clone.columns['configkey']!=undefined)clone.columns['configkey'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databosubconfigvaluesconfigkey3)), }, };
this.tblbosubconfigvaluessource.settings =  clone;
this.tblbosubconfigvaluessource.initGrid();
});

this.configservice.getList("subconfigcode").then(res=>
{
var datasubconfigcode2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.databosubconfigvaluessubconfigcode3.push(defaultobj);
for(let i=0; i<datasubconfigcode2.length; i++){
var obj= { value: datasubconfigcode2[i].configkey, title: datasubconfigcode2[i].configtext};
this.databosubconfigvaluessubconfigcode3.push(obj);
}
var clone = this.sharedService.clone(this.tblbosubconfigvaluessource.settings);
if(clone.columns['subconfigcode']!=undefined)clone.columns['subconfigcode'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databosubconfigvaluessubconfigcode3)), }, };
if(clone.columns['subconfigcode']!=undefined)clone.columns['subconfigcode'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.databosubconfigvaluessubconfigcode3)), }, };
this.tblbosubconfigvaluessource.settings =  clone;
this.tblbosubconfigvaluessource.initGrid();
});
}
this.bfilterPopulatebosubconfigvalues=true;
}
async bosubconfigvaluesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetbosubconfigvaluesTableConfig()
{
this.bosubconfigvaluessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom:this.bosubconfigvaluemenuactions
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
subconfigcodedesc: {
title: 'Sub Config Code',
type: 'html',
filter:true,
},
subcategoryname: {
title: 'Sub Category Name',
type: '',
filter:true,
},
orderno: {
title: 'Order No',
type: 'number',
filter:true,
},
},
};
}
bosubconfigvaluesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bosubconfigvaluesID)>=0)
{
this.bosubconfigvaluessource=new LocalDataSource();
this.bosubconfigvaluessource.load(this.boconfigvalueservice.bosubconfigvalues as  any as LocalDataSource);
this.bosubconfigvaluessource.setPaging(1, 20, true);
}
}

//external to inline
/*
bosubconfigvaluesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.boconfigvalueservice.bosubconfigvalues.length == 0)
{
    this.tblbosubconfigvaluessource.grid.createFormShown = true;
}
else
{
    let obj = new bosubconfigvalue();
    this.boconfigvalueservice.bosubconfigvalues.push(obj);
    this.bosubconfigvaluessource.refresh();
    if ((this.boconfigvalueservice.bosubconfigvalues.length / this.bosubconfigvaluessource.getPaging().perPage).toFixed(0) + 1 != this.bosubconfigvaluessource.getPaging().page)
    {
        this.bosubconfigvaluessource.setPage((this.boconfigvalueservice.bosubconfigvalues.length / this.bosubconfigvaluessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblbosubconfigvaluessource.grid.edit(this.tblbosubconfigvaluessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.bosubconfigvaluessource.data.indexOf(event.data);
this.onDeletebosubconfigvalue(event,event.data.subcategoryid,((this.bosubconfigvaluessource.getPaging().page-1) *this.bosubconfigvaluessource.getPaging().perPage)+index);
this.bosubconfigvaluessource.refresh();
break;
}
}

*/
bosubconfigvaluesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditbosubconfigvalue(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditbosubconfigvalue(event,event.data.subcategoryid,this.formid);
break;
case 'delete':
this.onDeletebosubconfigvalue(event,event.data.subcategoryid,((this.bosubconfigvaluessource.getPaging().page-1) *this.bosubconfigvaluessource.getPaging().perPage)+event.index);
this.bosubconfigvaluessource.refresh();
break;
}
}
bosubconfigvaluesonDelete(obj) {
let subcategoryid=obj.data.subcategoryid;
if (confirm('Are you sure to delete this record ?')) {
this.boconfigvalueservice.deleteboconfigvalue(subcategoryid).then(res=>
this.bosubconfigvaluesLoadTable()
);
}
}
async onCustombosubconfigvaluesAction(event:any)
{
    let objbomenuaction=await this.sharedService.onCustomAction(event,"bosubconfigvalues");
    let formname = (objbomenuaction as any).actionname;




}
bosubconfigvaluesPaging(val)
{
debugger;
this.bosubconfigvaluessource.setPaging(1, val, true);
}

handlebosubconfigvaluesGridSelected(event:any) {
this.bosubconfigvaluesselectedindex=this.boconfigvalueservice.bosubconfigvalues.findIndex(i => i.subcategoryid === event.data.subcategoryid);
}
IsbosubconfigvaluesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.bosubconfigvaluesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes bosubconfigvalues

}



