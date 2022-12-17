import { erpsupplierpaymenttermService } from './../../../service/erpsupplierpaymentterm.service';
import { erpsupplierpaymentterm } from './../../../model/erpsupplierpaymentterm.model';
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
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { erpsupplieritem} from './../../../model/erpsupplieritem.model';
import { erpsupplieritemComponent } from './../../../pages/forms/erpsupplieritem/erpsupplieritem.component';
import { erpsupplieritemService } from './../../../service/erpsupplieritem.service';
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
selector: 'app-erpsupplierpaymentterm',
templateUrl: './erpsupplierpaymentterm.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierpaymenttermComponent implements OnInit {
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
bfilterPopulateerpsupplierpaymentterms:boolean=false;
dataerpsupplierpaymenttermssupplierid3:any=[];
dataerpsupplierpaymenttermssupplieritemid3:any=[];
dataerpsupplierpaymenttermspaymenttermtype3:any=[];
 erpsupplierpaymenttermForm: FormGroup;
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
supplieritemidList: erpsupplieritem[];
supplieritemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplieritemid_erpsupplieritemsForm: FormGroup;//autocomplete
supplieritemid_erpsupplieritemsoptions:any;//autocomplete
supplieritemid_erpsupplieritemsformatter:any;//autocomplete
paymenttermtypeList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierpaymenttermshowOption:boolean;
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
private erpsupplierpaymenttermservice: erpsupplierpaymenttermService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpsuppliermasterservice:erpsuppliermasterService,
private erpsupplieritemservice:erpsupplieritemService,
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
this.erpsupplierpaymenttermForm  = this.fb.group({
pk:[null],
supplierid: [null],
supplieriddesc: [null],
supplieritemid: [null],
supplieritemiddesc: [null],
supplierpaytermid: [null],
paymenttermtype: [null],
paymenttermtypedesc: [null],
percentage: [null],
description: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierpaymenttermForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierpaymenttermForm.dirty && this.erpsupplierpaymenttermForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supplierpaytermid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supplierpaytermid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supplierpaytermid && pkDetail) {
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
let erpsupplierpaymenttermid = null;

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
this.formid=erpsupplierpaymenttermid;
//this.sharedService.alert(erpsupplierpaymenttermid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erpsupplierpaymenttermservice.formData && this.erpsupplierpaymenttermservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erpsupplierpaymenttermForm.patchValue({
    supplierid: this.erpsupplierpaymenttermservice.formData.supplierid,
    supplieriddesc: this.erpsupplierpaymenttermservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erpsupplierpaymenttermForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.erpsupplieritemservice.geterpsupplieritemsList().then(res => 
{
this.supplieritemidList = res as erpsupplieritem[];
if(this.erpsupplierpaymenttermservice.formData && this.erpsupplierpaymenttermservice.formData.supplieritemid){
this.supplieritemidoptionsEvent.emit(this.supplieritemidList);
this.erpsupplierpaymenttermForm.patchValue({
    supplieritemid: this.erpsupplierpaymenttermservice.formData.supplieritemid,
    supplieritemiddesc: this.erpsupplierpaymenttermservice.formData.supplieritemiddesc,
});
}
{
let arrsupplieritemid = this.supplieritemidList.filter(v => v.supplierid == this.erpsupplierpaymenttermForm.get('supplieritemid').value);
let objsupplieritemid;
if (arrsupplieritemid.length > 0) objsupplieritemid = arrsupplieritemid[0];
if (objsupplieritemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplieritemid_erpsupplieritemsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieritemidList.filter(v => v.supplieritemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplieritemid_erpsupplieritemsformatter = (result: any) => result.supplieritemcode;
this.configservice.getList("paymentterm").then(res => this.paymenttermtypeList = res as boconfigvalue[]);

//autocomplete
    this.erpsupplierpaymenttermservice.geterpsupplierpaymenttermsList().then(res => {
      this.pkList = res as erpsupplierpaymentterm[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.description;

//setting the flag that the screen is not touched 
this.erpsupplierpaymenttermForm.markAsUntouched();
this.erpsupplierpaymenttermForm.markAsPristine();
}
onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erpsupplierpaymenttermForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedsupplieritemid(supplieritemidDetail: any) {
if (supplieritemidDetail.supplierid && supplieritemidDetail) {
this.erpsupplierpaymenttermForm.patchValue({
supplieritemid: supplieritemidDetail.supplierid,
supplieritemiddesc: supplieritemidDetail.supplieritemcode,

});

}
}




resetForm() {
if (this.erpsupplierpaymenttermForm != null)
this.erpsupplierpaymenttermForm.reset();
this.erpsupplierpaymenttermForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supplierpaytermid = this.erpsupplierpaymenttermForm.get('supplierpaytermid').value;
        if(supplierpaytermid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierpaymenttermservice.deleteerpsupplierpaymentterm(supplierpaytermid).then(res =>
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
    this.erpsupplierpaymenttermForm.patchValue({
        supplierpaytermid: null
    });
    if(this.erpsupplierpaymenttermservice.formData.supplierpaytermid!=null)this.erpsupplierpaymenttermservice.formData.supplierpaytermid=null;
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
this.erpsupplierpaymenttermForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierpaymenttermForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierpaymenttermForm.controls[key]!=undefined)
{
this.erpsupplierpaymenttermForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.erpsupplierpaymenttermservice.formData.description!=null )
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
supplieridonChange(evt:any){
let e=evt.value;
}
supplieritemidonChange(evt:any){
let e=evt.value;
}
supplierpaytermidonChange(evt:any){
let e=evt.value;
}
paymenttermtypeonChange(evt:any){
let e=this.f.paymenttermtype.value as any;
this.erpsupplierpaymenttermForm.patchValue({paymenttermtypedesc:evt.options[evt.options.selectedIndex].text});
}
percentageonChange(evt:any){
let e=evt.value;
}
descriptiononChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplierpaymentterms() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierpaymenttermservice.geterpsupplierpaymenttermsByEID(pkcol).then(res => {

this.erpsupplierpaymenttermservice.formData=res.erpsupplierpaymentterm;
let formproperty=res.erpsupplierpaymentterm.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierpaymentterm.pkcol;
this.formid=res.erpsupplierpaymentterm.supplierpaytermid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierpaymentterm.supplierpaytermid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierpaymenttermForm.patchValue({
supplierid: res.erpsupplierpaymentterm.supplierid,
supplieriddesc: res.erpsupplierpaymentterm.supplieriddesc,
supplieritemid: res.erpsupplierpaymentterm.supplieritemid,
supplieritemiddesc: res.erpsupplierpaymentterm.supplieritemiddesc,
supplierpaytermid: res.erpsupplierpaymentterm.supplierpaytermid,
paymenttermtype: res.erpsupplierpaymentterm.paymenttermtype,
paymenttermtypedesc: res.erpsupplierpaymentterm.paymenttermtypedesc,
percentage: res.erpsupplierpaymentterm.percentage,
description: res.erpsupplierpaymentterm.description,
status: res.erpsupplierpaymentterm.status,
statusdesc: res.erpsupplierpaymentterm.statusdesc,
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
  for (let key in this.erpsupplierpaymenttermForm.controls) {
    if (this.erpsupplierpaymenttermForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierpaymenttermservice.formData!=null && this.erpsupplierpaymenttermservice.formData[key]!=null  && this.erpsupplierpaymenttermservice.formData[key]!='[]' && this.erpsupplierpaymenttermservice.formData[key]!=undefined && this.erpsupplierpaymenttermservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierpaymenttermservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierpaymenttermservice.formData!=null && this.erpsupplierpaymenttermservice.formData[key]!=null   && this.erpsupplierpaymenttermservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierpaymenttermservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierpaymenttermservice.formData!=null && this.erpsupplierpaymenttermservice.formData[key]!=null   && this.erpsupplierpaymenttermservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierpaymenttermservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierpaymenttermservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierpaymenttermForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierpaymenttermForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierpaymenttermForm.value;
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

private erpsupplierpaymenttermtoggleOption(){
this.erpsupplierpaymenttermshowOption = this.erpsupplierpaymenttermshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierpaymenttermForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierpaymenttermForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierpaymenttermForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierpaymenttermservice.formData=this.erpsupplierpaymenttermForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierpaymenttermForm.controls[key] != null)
    {
        this.erpsupplierpaymenttermservice.formData[key] = this.erpsupplierpaymenttermForm.controls[key].value;
    }
}
}
}
console.log(this.erpsupplierpaymenttermservice.formData);
this.erpsupplierpaymenttermservice.formData=this.erpsupplierpaymenttermForm.value;
this.erpsupplierpaymenttermservice.saveOrUpdateerpsupplierpaymentterms().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpaymentterm);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierpaymenttermservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpaymentterm);
}
else
{
this.FillData(res);
}
}
this.erpsupplierpaymenttermForm.markAsUntouched();
this.erpsupplierpaymenttermForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erpsupplierpaymenttermForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplieritemid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsupplieritemComponent, 
{
data: {supplierid:this.erpsupplierpaymenttermForm.get('supplieritemid').value, ScreenType:2 }
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



