import { bosubconfigvalueService } from './../../../service/bosubconfigvalue.service';
import { bosubconfigvalue } from './../../../model/bosubconfigvalue.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

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
selector: 'app-bosubconfigvalue',
templateUrl: './bosubconfigvalue.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class bosubconfigvalueComponent implements OnInit {
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
bfilterPopulatebosubconfigvalues:boolean=false;
databosubconfigvaluesconfigkey3:any=[];
databosubconfigvaluessubconfigcode3:any=[];
bosubconfigvaluemenuactions:any=[]
 bosubconfigvalueForm: FormGroup;
configkeyList: boconfigvalue[];
subconfigcodeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
bosubconfigvalueshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private themeService:ThemeService,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private bosubconfigvalueservice: bosubconfigvalueService,
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
this.bosubconfigvalueForm  = this.fb.group({
pk:[null],
subcategoryid: [null],
configkey: [null],
configkeydesc: [null],
subconfigcode: [null],
subconfigcodedesc: [null],
subcategoryname: [null],
orderno: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.bosubconfigvalueForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.bosubconfigvalueForm.dirty && this.bosubconfigvalueForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.subcategoryid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.subcategoryid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.subcategoryid && pkDetail) {
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
let bosubconfigvalueid = null;

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
this.formid=bosubconfigvalueid;
//alert(bosubconfigvalueid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.configservice.getList("configkey").then(res => this.configkeyList = res as boconfigvalue[]);
this.configservice.getList("subconfigcode").then(res => this.subconfigcodeList = res as boconfigvalue[]);

//autocomplete
    this.bosubconfigvalueservice.getbosubconfigvaluesList().then(res => {
      this.pkList = res as bosubconfigvalue[];
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
this.bosubconfigvalueForm.markAsUntouched();
this.bosubconfigvalueForm.markAsPristine();
}



resetForm() {
if (this.bosubconfigvalueForm != null)
this.bosubconfigvalueForm.reset();
this.bosubconfigvalueForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let subcategoryid = this.bosubconfigvalueForm.get('subcategoryid').value;
        if(subcategoryid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.bosubconfigvalueservice.deletebosubconfigvalue(subcategoryid).then(res =>
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
    this.bosubconfigvalueForm.patchValue({
        subcategoryid: null
    });
    if(this.bosubconfigvalueservice.formData.subcategoryid!=null)this.bosubconfigvalueservice.formData.subcategoryid=null;
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
this.bosubconfigvalueForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.bosubconfigvalueForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.bosubconfigvalueForm.controls[key]!=undefined)
{
this.bosubconfigvalueForm.controls[key].disable({onlySelf: true});
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
configkeyonChange(evt:any){
let e=this.f.configkey.value as any;
this.bosubconfigvalueForm.patchValue({configkeydesc:evt.options[evt.options.selectedIndex].text});
}
subconfigcodeonChange(evt:any){
let e=this.f.subconfigcode.value as any;
this.bosubconfigvalueForm.patchValue({subconfigcodedesc:evt.options[evt.options.selectedIndex].text});
}

editbosubconfigvalues() {
this.showview=false;
setTimeout(() => {
});
return false;
}



async PopulateScreen(pkcol:any){
this.bosubconfigvalueservice.getbosubconfigvaluesByEID(pkcol).then(res => {

this.bosubconfigvalueservice.formData=res.bosubconfigvalue;
let formproperty=res.bosubconfigvalue.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.bosubconfigvalue.pkcol;
this.formid=res.bosubconfigvalue.subcategoryid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.bosubconfigvalueservice.formData=res.bosubconfigvalue;
this.formid=res.bosubconfigvalue.subcategoryid;
this.pkcol=res.bosubconfigvalue.pkcol;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.bosubconfigvalueForm.patchValue({
subcategoryid: res.bosubconfigvalue.subcategoryid,
configkey: res.bosubconfigvalue.configkey,
configkeydesc: res.bosubconfigvalue.configkeydesc,
subconfigcode: res.bosubconfigvalue.subconfigcode,
subconfigcodedesc: res.bosubconfigvalue.subconfigcodedesc,
subcategoryname: res.bosubconfigvalue.subcategoryname,
orderno: res.bosubconfigvalue.orderno,
status: res.bosubconfigvalue.status,
statusdesc: res.bosubconfigvalue.statusdesc,
});
this.bosubconfigvaluemenuactions=res.bosubconfigvaluemenuactions;
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
  for (let key in this.bosubconfigvalueForm.controls) {
let val = this.bosubconfigvalueForm.controls[key].value;
if (val == 'null' || val == null || val == undefined) val = '';
    if (this.bosubconfigvalueForm.controls[key] != null) {
if(false)
{
if(this.bosubconfigvalueservice.formData!=null && this.bosubconfigvalueservice.formData[key]!=null  && this.bosubconfigvalueservice.formData[key]!='[]' && this.bosubconfigvalueservice.formData[key]!=undefined && this.bosubconfigvalueservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),AppConstants.AttachmentURL+ JSON.parse(this.bosubconfigvalueservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.bosubconfigvalueservice.formData!=null && this.bosubconfigvalueservice.formData[key]!=null   && this.bosubconfigvalueservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.bosubconfigvalueservice.formData[key]+"></div>");
}
else if(false)
{
if(this.bosubconfigvalueservice.formData!=null && this.bosubconfigvalueservice.formData[key]!=null   && this.bosubconfigvalueservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.bosubconfigvalueservice.formData[key]+"'><div class='progress__number'>"+this.bosubconfigvalueservice.formData[key]+"%</div></div>");
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
if(!this.bosubconfigvalueForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.bosubconfigvalueForm.value;
console.log(obj);
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

private bosubconfigvaluetoggleOption(){
this.bosubconfigvalueshowOption = this.bosubconfigvalueshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.bosubconfigvalueForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.bosubconfigvalueForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.bosubconfigvalueForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.bosubconfigvalueservice.formData=this.bosubconfigvalueForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.bosubconfigvalueForm.controls[key] != null)
    {
        this.bosubconfigvalueservice.formData[key] = this.bosubconfigvalueForm.controls[key].value;
    }
}
}
}
console.log(this.bosubconfigvalueservice.formData);
this.bosubconfigvalueservice.formData=this.bosubconfigvalueForm.value;
this.bosubconfigvalueservice.saveOrUpdatebosubconfigvalues().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.objvalues.push((res as any).bosubconfigvalue);
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
this.bosubconfigvalueservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.objvalues.push((res as any).bosubconfigvalue);
this.dialogRef.close(this.objvalues);
}
else
{
this.FillData(res);
}
}
this.bosubconfigvalueForm.markAsUntouched();
this.bosubconfigvalueForm.markAsPristine();
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



