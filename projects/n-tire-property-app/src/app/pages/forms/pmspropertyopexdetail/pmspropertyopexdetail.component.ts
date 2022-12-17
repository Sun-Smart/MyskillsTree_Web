import { pmspropertyopexdetailService } from './../../../service/pmspropertyopexdetail.service';
import { pmspropertyopexdetail } from './../../../model/pmspropertyopexdetail.model';
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
import { pmsproperty} from './../../../model/pmsproperty.model';
import { pmspropertyService } from './../../../service/pmsproperty.service';
//popups
import { pmspropertyunit} from './../../../model/pmspropertyunit.model';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
//popups
import { pmspropertyowner} from './../../../model/pmspropertyowner.model';
import { pmspropertyownerService } from './../../../service/pmspropertyowner.service';
//popups
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
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-pmspropertyopexdetail',
templateUrl: './pmspropertyopexdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class pmspropertyopexdetailComponent implements OnInit {
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
bfilterPopulatepmspropertyopexdetails:boolean=false;
datapmspropertyopexdetailspropertyid3:any=[];
datapmspropertyopexdetailsunitid3:any=[];
datapmspropertyopexdetailsownerid3:any=[];
datapmspropertyopexdetailscurrency3:any=[];
 pmspropertyopexdetailForm: FormGroup;
propertyidList: pmsproperty[];
propertyidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
propertyid_pmspropertiesForm: FormGroup;//autocomplete
propertyid_pmspropertiesoptions:any;//autocomplete
propertyid_pmspropertiesformatter:any;//autocomplete
unitidList: pmspropertyunit[];
owneridList: pmspropertyowner[];
currencyList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
pmspropertyopexdetailshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private pmspropertyopexdetailservice: pmspropertyopexdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private pmspropertyservice:pmspropertyService,
private pmspropertyunitservice:pmspropertyunitService,
private pmspropertyownerservice:pmspropertyownerService,
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
this.pmspropertyopexdetailForm  = this.fb.group({
pk:[null],
opexid: [null],
propertyid: [null],
propertyiddesc: [null],
unitid: [null],
unitiddesc: [null],
ownerid: [null],
owneriddesc: [null],
opexname: [null],
frequencydays: [null],
currency: [null],
currencydesc: [null],
amount: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertyopexdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.pmspropertyopexdetailForm.dirty && this.pmspropertyopexdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.opexid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.opexid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.opexid && pkDetail) {
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
let pmspropertyopexdetailid = null;

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
this.formid=pmspropertyopexdetailid;
//this.sharedService.alert(pmspropertyopexdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.pmspropertyservice.getpmspropertiesList().then(res => 
{
this.propertyidList = res as pmsproperty[];
if(this.pmspropertyopexdetailservice.formData && this.pmspropertyopexdetailservice.formData.propertyid){
this.propertyidoptionsEvent.emit(this.propertyidList);
this.pmspropertyopexdetailForm.patchValue({
    propertyid: this.pmspropertyopexdetailservice.formData.propertyid,
    propertyiddesc: this.pmspropertyopexdetailservice.formData.propertyiddesc,
});
}
{
let arrpropertyid = this.propertyidList.filter(v => v.propertyid == this.pmspropertyopexdetailForm.get('propertyid').value);
let objpropertyid;
if (arrpropertyid.length > 0) objpropertyid = arrpropertyid[0];
if (objpropertyid)
{
}
}
}
).catch((err) => {console.log(err);});
this.propertyid_pmspropertiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.propertyidList.filter(v => v.title.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.propertyid_pmspropertiesformatter = (result: any) => result.title;
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
if(this.pmspropertyopexdetailservice.formData && this.pmspropertyopexdetailservice.formData.unitid){this.pmspropertyopexdetailForm.patchValue({
    unitid: this.pmspropertyopexdetailservice.formData.unitid,
    unitiddesc: this.pmspropertyopexdetailservice.formData.unitiddesc,
});
}
}).catch((err) => {console.log(err);});
});
this.pmspropertyownerservice.getpmspropertyownersList().then(res => 
{
this.owneridList = res as pmspropertyowner[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("currency").then(res => this.currencyList = res as boconfigvalue[]);

//autocomplete
    this.pmspropertyopexdetailservice.getpmspropertyopexdetailsList().then(res => {
      this.pkList = res as pmspropertyopexdetail[];
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
this.pmspropertyopexdetailForm.markAsUntouched();
this.pmspropertyopexdetailForm.markAsPristine();
}
onSelectedpropertyid(propertyidDetail: any) {
if (propertyidDetail.propertyid && propertyidDetail) {
this.pmspropertyopexdetailForm.patchValue({
propertyid: propertyidDetail.propertyid,
propertyiddesc: propertyidDetail.title,

});
this.pmspropertyunitservice.getListBypropertyid(propertyidDetail.propertyid).then(res => {
 this.unitidList = res as pmspropertyunit[]
}).catch((err) => {console.log(err);});

}
}




resetForm() {
if (this.pmspropertyopexdetailForm != null)
this.pmspropertyopexdetailForm.reset();
this.pmspropertyopexdetailForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let opexid = this.pmspropertyopexdetailForm.get('opexid').value;
        if(opexid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.pmspropertyopexdetailservice.deletepmspropertyopexdetail(opexid).then(res =>
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
    this.pmspropertyopexdetailForm.patchValue({
        opexid: null
    });
    if(this.pmspropertyopexdetailservice.formData.opexid!=null)this.pmspropertyopexdetailservice.formData.opexid=null;
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
this.pmspropertyopexdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyopexdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyopexdetailForm.controls[key]!=undefined)
{
this.pmspropertyopexdetailForm.controls[key].disable({onlySelf: true});
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
opexidonChange(evt:any){
let e=evt.value;
}
propertyidonChange(evt:any){
let e=evt.value;
}
unitidonChange(evt:any){
let e=evt.value;
this.pmspropertyopexdetailForm.patchValue({unitiddesc:evt.options[evt.options.selectedIndex].text});
}
owneridonChange(evt:any){
let e=evt.value;
this.pmspropertyopexdetailForm.patchValue({owneriddesc:evt.options[evt.options.selectedIndex].text});
}
opexnameonChange(evt:any){
let e=evt.value;
}
frequencydaysonChange(evt:any){
let e=evt.value;
}
currencyonChange(evt:any){
let e=this.f.currency.value as any;
this.pmspropertyopexdetailForm.patchValue({currencydesc:evt.options[evt.options.selectedIndex].text});
}
amountonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editpmspropertyopexdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.pmspropertyopexdetailservice.getpmspropertyopexdetailsByEID(pkcol).then(res => {

this.pmspropertyopexdetailservice.formData=res.pmspropertyopexdetail;
let formproperty=res.pmspropertyopexdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pmspropertyopexdetail.pkcol;
this.formid=res.pmspropertyopexdetail.opexid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.pmspropertyopexdetail.opexid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.pmspropertyopexdetailForm.patchValue({
opexid: res.pmspropertyopexdetail.opexid,
propertyid: res.pmspropertyopexdetail.propertyid,
propertyiddesc: res.pmspropertyopexdetail.propertyiddesc,
unitid: res.pmspropertyopexdetail.unitid,
unitiddesc: res.pmspropertyopexdetail.unitiddesc,
ownerid: res.pmspropertyopexdetail.ownerid,
owneriddesc: res.pmspropertyopexdetail.owneriddesc,
opexname: res.pmspropertyopexdetail.opexname,
frequencydays: res.pmspropertyopexdetail.frequencydays,
currency: res.pmspropertyopexdetail.currency,
currencydesc: res.pmspropertyopexdetail.currencydesc,
amount: res.pmspropertyopexdetail.amount,
status: res.pmspropertyopexdetail.status,
statusdesc: res.pmspropertyopexdetail.statusdesc,
});
setTimeout(() => {
if(this.f.propertyid.value && this.f.propertyid.value!="" && this.f.propertyid.value!=null)this.pmspropertyunitservice.getListBypropertyid(this.f.propertyid.value).then(res =>{
this.unitidList = res as pmspropertyunit[];
}).catch((err) => {console.log(err);});
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
  for (let key in this.pmspropertyopexdetailForm.controls) {
    if (this.pmspropertyopexdetailForm.controls[key] != null) {
if(false)
{
if(this.pmspropertyopexdetailservice.formData!=null && this.pmspropertyopexdetailservice.formData[key]!=null  && this.pmspropertyopexdetailservice.formData[key]!='[]' && this.pmspropertyopexdetailservice.formData[key]!=undefined && this.pmspropertyopexdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertyopexdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.pmspropertyopexdetailservice.formData!=null && this.pmspropertyopexdetailservice.formData[key]!=null   && this.pmspropertyopexdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.pmspropertyopexdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.pmspropertyopexdetailservice.formData!=null && this.pmspropertyopexdetailservice.formData[key]!=null   && this.pmspropertyopexdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.pmspropertyopexdetailservice.formData[key]+"'><div class='progress__number'>"+this.pmspropertyopexdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyopexdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.pmspropertyopexdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmspropertyopexdetailForm.value;
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

private pmspropertyopexdetailtoggleOption(){
this.pmspropertyopexdetailshowOption = this.pmspropertyopexdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyopexdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyopexdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyopexdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.pmspropertyopexdetailservice.formData=this.pmspropertyopexdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyopexdetailForm.controls[key] != null)
    {
        this.pmspropertyopexdetailservice.formData[key] = this.pmspropertyopexdetailForm.controls[key].value;
    }
}
}
}
console.log(this.pmspropertyopexdetailservice.formData);
this.pmspropertyopexdetailservice.formData=this.pmspropertyopexdetailForm.value;
this.pmspropertyopexdetailservice.saveOrUpdatepmspropertyopexdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyopexdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.pmspropertyopexdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).pmspropertyopexdetail);
}
else
{
this.FillData(res);
}
}
this.pmspropertyopexdetailForm.markAsUntouched();
this.pmspropertyopexdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpropertyid( propertyid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyComponent, 
{
data: {propertyid:this.pmspropertyopexdetailForm.get('propertyid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditunitid( unitid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyunitComponent, 
{
data: {unitid:this.pmspropertyopexdetailForm.get('unitid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditownerid( ownerid) {
/*let ScreenType='2';
this.dialog.open(pmspropertyownerComponent, 
{
data: {ownerid:this.pmspropertyopexdetailForm.get('ownerid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



