import { itlicenseagreementService } from './../../../service/itlicenseagreement.service';
import { itlicenseagreement } from './../../../model/itlicenseagreement.model';
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
import { itlicense } from './../../../model/itlicense.model';
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
selector: 'app-itlicenseagreement',
templateUrl: './itlicenseagreement.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class itlicenseagreementComponent implements OnInit {
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
formdata: any;//current form data
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
ShowTableslist:string[]=null;
data:any;
data3:any=[];
bfilterPopulateitlicenseagreements:boolean=false;
dataitlicenseslicensetype3:any=[];
dataitlicenseslicenseoption3:any=[];
bfilterPopulateitlicenses:boolean=false;
@ViewChild('tblitlicensessource',{static:false}) tblitlicensessource: Ng2SmartTableComponent;
 itlicenseagreementForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
sessiondata:any;



itlicensesvisiblelist:any;
itlicenseshidelist:any;

DeleteditlicenseIDs: string="";
itlicensesID: string = "1";
itlicensesselectedindex:any;


constructor(
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
public ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private itlicenseagreementservice: itlicenseagreementService,
private fb: FormBuilder,
private sharedService: SharedService,
public sessionService: SessionService,
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
this.itlicenseagreementForm  = this.fb.group({pk:[null],licenseagreementid: [null],
manufacturer: [null],
activefrom: [null],
agreementnumber: [null],
expirydate: [null],
authorizationnumber: [null],
softwareid: [null],
supplier: [null],
description: [null],
terms: [null],
ponumber: [null],
invoicenumber: [null],
poname: [null],
invoicedate: [null],
purchasedate: [null],
totalcost: [null],
purchasedescription: [null],
notify: [null],
alarm: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.itlicenseagreementForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop:any)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.itlicenseagreementForm.dirty && this.itlicenseagreementForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.licenseagreementid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.licenseagreementid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.licenseagreementid && pkDetail) {
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
let itlicenseagreementid = null;

//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)this.data=this.data.data;
 if(this.data!=null && this.data.showview!=undefined  && this.data.showview!=null)this.showview=this.data.showview;
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
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
}
this.formid=itlicenseagreementid;
//this.sharedService.alert(itlicenseagreementid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetitlicensesTableConfig();
  setTimeout(() => {
  this.SetitlicensesTableddConfig();
  });

this.resetForm();
}
else {
await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.itlicenseagreementservice.getitlicenseagreementsList().then((res:any) => {
      this.pkList = res as itlicenseagreement[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    );
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.itlicenseagreementForm.markAsUntouched();
this.itlicenseagreementForm.markAsPristine();
}



resetForm() {
if (this.itlicenseagreementForm != null)
this.itlicenseagreementForm.reset();
this.itlicenseagreementForm.patchValue({
});
setTimeout(() => {
this.itlicenseagreementservice.itlicenses=[];
this.itlicensesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let licenseagreementid = this.itlicenseagreementForm.get('licenseagreementid')!.value;
        if(licenseagreementid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.itlicenseagreementservice.deleteitlicenseagreement(licenseagreementid).then((res:any) =>
                {
                this.resetForm();
                }
            );
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.itlicenseagreementForm.patchValue({
        licenseagreementid: null
    });
    if(this.itlicenseagreementservice.formData.licenseagreementid!=null)this.itlicenseagreementservice.formData.licenseagreementid=null;
for (let i=0;i<this.itlicenseagreementservice.itlicenses.length;i++) {
this.itlicenseagreementservice.itlicenses[i].licenseid=null;
}
    }
    PopulateFromMainScreen(mainscreendata,bdisable)
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
        else if(key=="activefrom")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="expirydate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="invoicedate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(key=="purchasedate")
        json='{"'+key+'": '+this.ngbDateParserFormatter.parse(mainscreendata[key]) +' }';  
        else if(ctrltype=="string")
{
        jsonstring='{"'+key+'": "'+mainscreendata[key] +'" }';
        json=JSON.parse(jsonstring);
}
        else
{
        jsonstring='{"'+key+'": '+mainscreendata[key] +' }';  
        json=JSON.parse(jsonstring);
}
{
        if(this.itlicenseagreementForm.controls[key]!=null)
{
this.itlicenseagreementForm.patchValue(json);
         if(bdisable)this.itlicenseagreementForm.controls[key].disable({onlySelf: true});
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
if(this.data.save==true)
{
    this.onSubmitData(false);
}
else if(this.data!=null  && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

async PopulateScreen(pkcol:any){this.itlicenseagreementservice.getitlicenseagreementsByEID(pkcol).then((res:any) => {

this.formdata=res;
let formproperty=res.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.pkcol;
this.formid=res.itlicenseagreement.licenseagreementid;
this.FillData(res);
});
}

FillData(res:any)
{
this.formid=res.itlicenseagreement.licenseagreementid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.itlicenseagreementForm.patchValue({
licenseagreementid: res.itlicenseagreement.licenseagreementid,
manufacturer: res.itlicenseagreement.manufacturer,
activefrom: this.ngbDateParserFormatter.parse(res.itlicenseagreement.activefrom),
agreementnumber: res.itlicenseagreement.agreementnumber,
expirydate: this.ngbDateParserFormatter.parse(res.itlicenseagreement.expirydate),
authorizationnumber: res.itlicenseagreement.authorizationnumber,
softwareid: res.itlicenseagreement.softwareid,
supplier: res.itlicenseagreement.supplier,
description: res.itlicenseagreement.description,
terms: res.itlicenseagreement.terms,
ponumber: res.itlicenseagreement.ponumber,
invoicenumber: res.itlicenseagreement.invoicenumber,
poname: res.itlicenseagreement.poname,
invoicedate: this.ngbDateParserFormatter.parse(res.itlicenseagreement.invoicedate),
purchasedate: this.ngbDateParserFormatter.parse(res.itlicenseagreement.purchasedate),
totalcost: res.itlicenseagreement.totalcost,
purchasedescription: res.itlicenseagreement.purchasedescription,
notify: res.itlicenseagreement.notify,
alarm: res.itlicenseagreement.alarm,
status: res.itlicenseagreement.status,
statusdesc: res.itlicenseagreement.statusdesc,
});
this.itlicensesvisiblelist=res.itlicensesvisiblelist;
//Child Tables if any
this.itlicenseagreementservice.itlicenses = res.itlicense;
this.SetitlicensesTableConfig();
this.itlicensesLoadTable();
  setTimeout(() => {
  this.SetitlicensesTableddConfig();
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
  for (let key in this.itlicenseagreementForm.controls) {
    if (this.itlicenseagreementForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.itlicenseagreementForm.controls[key]!.value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.itlicenseagreementForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.itlicenseagreementForm!.value;
obj.activefrom=this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('activefrom')!.value);
obj.expirydate=this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('expirydate')!.value);
obj.invoicedate=this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('invoicedate')!.value);
obj.purchasedate=this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('purchasedate')!.value);
console.log(obj);
this.dialogRef.close(obj);
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
Object.keys(this.itlicenseagreementForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.itlicenseagreementForm.get(key)!.errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.itlicenseagreementForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.itlicenseagreementservice.formData=this.itlicenseagreementForm!.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.itlicenseagreementForm.controls[key] != null)
    {
        this.itlicenseagreementservice.formData[key] = this.itlicenseagreementForm.controls[key]!.value;
    }
}
}
}
this.itlicenseagreementservice.formData.activefrom=new Date(this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('activefrom')!.value)+'  UTC');
this.itlicenseagreementservice.formData.expirydate=new Date(this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('expirydate')!.value)+'  UTC');
this.itlicenseagreementservice.formData.invoicedate=new Date(this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('invoicedate')!.value)+'  UTC');
this.itlicenseagreementservice.formData.purchasedate=new Date(this.ngbDateParserFormatter.format(this.itlicenseagreementForm.get('purchasedate')!.value)+'  UTC');
this.itlicenseagreementservice.formData.DeleteditlicenseIDs = this.DeleteditlicenseIDs;
console.log(this.itlicenseagreementservice.formData);
this.itlicenseagreementservice.saveOrUpdateitlicenseagreements().subscribe(
async (res:any) => {
if (this.itlicensessource.data)
{
    for (let i = 0; i < this.itlicensessource.data.length; i++)
    {
        if (this.itlicensessource.data[i].fileattachmentlist)await this.sharedService.upload(this.itlicensessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result!.value.itlicenseagreement);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.itlicenseagreementservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.data!=null && (this.data.ScreenType==1 || this.data.ScreenType==2))
{
this.dialogRef.close((res as any).result!.value.itlicenseagreement);
}
else
{
this.FillData((res as any).result!.value);
}
}
this.itlicenseagreementForm.markAsUntouched();
this.itlicenseagreementForm.markAsPristine();
},
(err:any) => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

onDeleteitlicense(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteditlicenseIDs += childID + ",";
this.itlicenseagreementservice.itlicenses.splice(i, 1);
}

PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes itlicenses
itlicensessettings:any;
itlicensessource: any;

showitlicensesCheckbox()
{
debugger;
if(this.tblitlicensessource.settings['selectMode']== 'multi')this.tblitlicensessource.settings['selectMode']= 'single';
else
this.tblitlicensessource.settings['selectMode']= 'multi';
this.tblitlicensessource.initGrid();
}
deleteitlicensesAll()
{
this.tblitlicensessource.settings['selectMode'] = 'single';
}
showitlicensesFilter()
{
  setTimeout(() => {
  this.SetitlicensesTableddConfig();
  });
      if(this.tblitlicensessource.settings!=null)this.tblitlicensessource.settings['hideSubHeader'] =!this.tblitlicensessource.settings['hideSubHeader'];
this.tblitlicensessource.initGrid();
}
showitlicensesInActive()
{
}
enableitlicensesInActive()
{
}
async SetitlicensesTableddConfig()
{
if(!this.bfilterPopulateitlicenses){

this.configservice.getList("licensetype").then(res=>
{
var datalicensetype2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitlicenseslicensetype3.push(defaultobj);
for(let i=0; i<datalicensetype2.length; i++){
var obj= { value: datalicensetype2[i].configkey, title: datalicensetype2[i].configtext};
this.dataitlicenseslicensetype3.push(obj);
}
var clone = this.sharedService.clone(this.tblitlicensessource.settings);
if(clone.columns['licensetype']!=undefined)clone.columns['licensetype'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitlicenseslicensetype3)), }, };
if(clone.columns['licensetype']!=undefined)clone.columns['licensetype'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitlicenseslicensetype3)), }, };
this.tblitlicensessource.settings =  clone;
this.tblitlicensessource.initGrid();
});

this.configservice.getList("licenseoption").then(res=>
{
var datalicenseoption2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.dataitlicenseslicenseoption3.push(defaultobj);
for(let i=0; i<datalicenseoption2.length; i++){
var obj= { value: datalicenseoption2[i].configkey, title: datalicenseoption2[i].configtext};
this.dataitlicenseslicenseoption3.push(obj);
}
var clone = this.sharedService.clone(this.tblitlicensessource.settings);
if(clone.columns['licenseoption']!=undefined)clone.columns['licenseoption'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitlicenseslicenseoption3)), }, };
if(clone.columns['licenseoption']!=undefined)clone.columns['licenseoption'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.dataitlicenseslicenseoption3)), }, };
this.tblitlicensessource.settings =  clone;
this.tblitlicensessource.initGrid();
});
}
this.bfilterPopulateitlicenses=true;
}
async itlicensesbeforesave(event){
event.confirm.resolve(event.newData);



}
SetitlicensesTableConfig()
{
this.itlicensessettings = {
hideSubHeader: true,
mode: 'inline',
selectMode: 'single',
actions: {
width:'300px',
columnTitle: 'Actions',
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
licensename: {
title: 'License Name',
type: '',
filter:true,
},
description: {
title: 'Description',
type: '',
filter:true,
},
acquisitiondate: {
title: 'Acquisition Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
expirydate: {
title: 'Expiry Date',
type: 'custom',
renderComponent: SmartTableDatepickerRenderComponent,
editor: {
type: 'custom',
component: SmartTableDatepickerComponent,
},
},
software: {
title: 'Software',
type: '',
filter:true,
},
licensetype: {
title: 'License Type',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitlicenseslicensetype3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
licenseoption: {
title: 'License Option',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.dataitlicenseslicenseoption3.find(c=>c!.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
installationsallowed: {
title: 'Installations Allowed',
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
supplierid: {
title: 'Supplier',
type: 'number',
filter:true,
},
licensekey: {
title: 'License Key',
type: '',
filter:true,
},
cost: {
title: 'Cost',
type: 'number',
filter:true,
},
assignto: {
title: 'Assign To',
type: '',
filter:true,
},
departmentid: {
title: 'Department',
type: 'number',
filter:true,
},
},
};
}
itlicensesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itlicensesID)>=0)
{
this.itlicensessource=new LocalDataSource();
this.itlicensessource.load(this.itlicenseagreementservice.itlicenses as  any as LocalDataSource);
this.itlicensessource.setPaging(1, 20, true);
}
}
itlicensesroute(event,action) {
switch ( action) {
case 'create':
if (this.itlicenseagreementservice.itlicenses.length == 0)
{
    this.tblitlicensessource.grid.createFormShown = true;
}
else
{
    let obj = new itlicense();
    this.itlicenseagreementservice.itlicenses.push(obj);
    this.itlicensessource.refresh();
    if ((this.itlicenseagreementservice.itlicenses.length / this.itlicensessource.getPaging().perPage).toFixed(0) + 1 != this.itlicensessource.getPaging().page)
    {
        this.itlicensessource.setPage((this.itlicenseagreementservice.itlicenses.length / this.itlicensessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblitlicensessource.grid.edit(this.tblitlicensessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.itlicensessource.data.indexOf(event.data);
this.onDeleteitlicense(event,event.data.licenseid,((this.itlicensessource.getPaging().page-1) *this.itlicensessource.getPaging().perPage)+index);
this.itlicensessource.refresh();
break;
}
}
itlicensesPaging(val)
{
debugger;
this.itlicensessource.setPaging(1, val, true);
}

handleitlicensesGridSelected(event) {
this.itlicensesselectedindex=this.itlicenseagreementservice.itlicenses.findIndex(i => i.licenseid === event.data.licenseid);
}
IsitlicensesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.indexOf(this.itlicensesID)>=0)
{
return "tbl";
}
else
{
return "hide";
}
}
//end of Grid Codes itlicenses

}



