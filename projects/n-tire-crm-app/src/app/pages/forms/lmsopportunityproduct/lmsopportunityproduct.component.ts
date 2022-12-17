import { lmsopportunityproductService } from './../../../service/lmsopportunityproduct.service';
import { lmsopportunityproduct } from './../../../model/lmsopportunityproduct.model';
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
import { lmsopportunity} from './../../../model/lmsopportunity.model';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
//popups
import { lmsproductmaster} from './../../../model/lmsproductmaster.model';
import { lmsproductmasterService } from './../../../service/lmsproductmaster.service';
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
selector: 'app-lmsopportunityproduct',
templateUrl: './lmsopportunityproduct.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class lmsopportunityproductComponent implements OnInit {
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
bfilterPopulatelmsopportunityproducts:boolean=false;
datalmsopportunityproductsopportunityid3:any=[];
datalmsopportunityproductsproductid3:any=[];
datalmsopportunityproductsuom3:any=[];
 lmsopportunityproductForm: FormGroup;
opportunityidList: lmsopportunity[];
opportunityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
opportunityid_lmsopportunitiesForm: FormGroup;//autocomplete
opportunityid_lmsopportunitiesoptions:any;//autocomplete
opportunityid_lmsopportunitiesformatter:any;//autocomplete
productidList: lmsproductmaster[];
uomList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
lmsopportunityproductshowOption:boolean;
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
private lmsopportunityproductservice: lmsopportunityproductService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private lmsopportunityservice:lmsopportunityService,
private lmsproductmasterservice:lmsproductmasterService,
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
this.lmsopportunityproductForm  = this.fb.group({
pk:[null],
branchid: [null],
leadid: [null],
campaignid: [null],
opportunityid: [null],
opportunityiddesc: [null],
opportunityproductid: [null],
productid: [null],
productiddesc: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
price: [null],
totalprice: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.lmsopportunityproductForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.lmsopportunityproductForm.dirty && this.lmsopportunityproductForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.opportunityproductid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.opportunityproductid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.opportunityproductid && pkDetail) {
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
let lmsopportunityproductid = null;

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
this.formid=lmsopportunityproductid;
//this.sharedService.alert(lmsopportunityproductid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.lmsopportunityservice.getlmsopportunitiesList().then(res => 
{
this.opportunityidList = res as lmsopportunity[];
if(this.lmsopportunityproductservice.formData && this.lmsopportunityproductservice.formData.opportunityid){
this.opportunityidoptionsEvent.emit(this.opportunityidList);
this.lmsopportunityproductForm.patchValue({
    opportunityid: this.lmsopportunityproductservice.formData.opportunityid,
    opportunityiddesc: this.lmsopportunityproductservice.formData.opportunityiddesc,
});
}
{
let arropportunityid = this.opportunityidList.filter(v => v.opportunityid == this.lmsopportunityproductForm.get('opportunityid').value);
let objopportunityid;
if (arropportunityid.length > 0) objopportunityid = arropportunityid[0];
if (objopportunityid)
{
}
}
}
).catch((err) => {console.log(err);});
this.opportunityid_lmsopportunitiesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.opportunityidList.filter(v => v.requirementdetails.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.opportunityid_lmsopportunitiesformatter = (result: any) => result.requirementdetails;
this.lmsproductmasterservice.getlmsproductmastersList().then(res => 
{
this.productidList = res as lmsproductmaster[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);

//autocomplete
    this.lmsopportunityproductservice.getlmsopportunityproductsList().then(res => {
      this.pkList = res as lmsopportunityproduct[];
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
this.lmsopportunityproductForm.markAsUntouched();
this.lmsopportunityproductForm.markAsPristine();
}
onSelectedopportunityid(opportunityidDetail: any) {
if (opportunityidDetail.opportunityid && opportunityidDetail) {
this.lmsopportunityproductForm.patchValue({
opportunityid: opportunityidDetail.opportunityid,
opportunityiddesc: opportunityidDetail.requirementdetails,

});

}
}




resetForm() {
if (this.lmsopportunityproductForm != null)
this.lmsopportunityproductForm.reset();
this.lmsopportunityproductForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let opportunityproductid = this.lmsopportunityproductForm.get('opportunityproductid').value;
        if(opportunityproductid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunityproductservice.deletelmsopportunityproduct(opportunityproductid).then(res =>
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
    this.lmsopportunityproductForm.patchValue({
        opportunityproductid: null
    });
    if(this.lmsopportunityproductservice.formData.opportunityproductid!=null)this.lmsopportunityproductservice.formData.opportunityproductid=null;
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
this.lmsopportunityproductForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.lmsopportunityproductForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.lmsopportunityproductForm.controls[key]!=undefined)
{
this.lmsopportunityproductForm.controls[key].disable({onlySelf: true});
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
branchidonChange(evt:any){
let e=evt.value;
}
leadidonChange(evt:any){
let e=evt.value;
}
campaignidonChange(evt:any){
let e=evt.value;
}
opportunityidonChange(evt:any){
let e=evt.value;
}
opportunityproductidonChange(evt:any){
let e=evt.value;
}
productidonChange(evt:any){
let e=evt.value;
this.lmsopportunityproductForm.patchValue({productiddesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.lmsopportunityproductForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
priceonChange(evt:any){
let e=evt.value;
}
totalpriceonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editlmsopportunityproducts() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.lmsopportunityproductservice.getlmsopportunityproductsByEID(pkcol).then(res => {

this.lmsopportunityproductservice.formData=res.lmsopportunityproduct;
let formproperty=res.lmsopportunityproduct.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.lmsopportunityproduct.pkcol;
this.formid=res.lmsopportunityproduct.opportunityproductid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.lmsopportunityproduct.opportunityproductid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.lmsopportunityproductForm.patchValue({
branchid: res.lmsopportunityproduct.branchid,
leadid: res.lmsopportunityproduct.leadid,
campaignid: res.lmsopportunityproduct.campaignid,
opportunityid: res.lmsopportunityproduct.opportunityid,
opportunityiddesc: res.lmsopportunityproduct.opportunityiddesc,
opportunityproductid: res.lmsopportunityproduct.opportunityproductid,
productid: res.lmsopportunityproduct.productid,
productiddesc: res.lmsopportunityproduct.productiddesc,
quantity: res.lmsopportunityproduct.quantity,
uom: res.lmsopportunityproduct.uom,
uomdesc: res.lmsopportunityproduct.uomdesc,
price: res.lmsopportunityproduct.price,
totalprice: res.lmsopportunityproduct.totalprice,
status: res.lmsopportunityproduct.status,
statusdesc: res.lmsopportunityproduct.statusdesc,
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
  for (let key in this.lmsopportunityproductForm.controls) {
    if (this.lmsopportunityproductForm.controls[key] != null) {
if(false)
{
if(this.lmsopportunityproductservice.formData!=null && this.lmsopportunityproductservice.formData[key]!=null  && this.lmsopportunityproductservice.formData[key]!='[]' && this.lmsopportunityproductservice.formData[key]!=undefined && this.lmsopportunityproductservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.lmsopportunityproductservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.lmsopportunityproductservice.formData!=null && this.lmsopportunityproductservice.formData[key]!=null   && this.lmsopportunityproductservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.lmsopportunityproductservice.formData[key]+"></div>");
}
else if(false)
{
if(this.lmsopportunityproductservice.formData!=null && this.lmsopportunityproductservice.formData[key]!=null   && this.lmsopportunityproductservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.lmsopportunityproductservice.formData[key]+"'><div class='progress__number'>"+this.lmsopportunityproductservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.lmsopportunityproductForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.lmsopportunityproductForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.lmsopportunityproductForm.value;
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

private lmsopportunityproducttoggleOption(){
this.lmsopportunityproductshowOption = this.lmsopportunityproductshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.lmsopportunityproductForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.lmsopportunityproductForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.lmsopportunityproductForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.lmsopportunityproductservice.formData=this.lmsopportunityproductForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.lmsopportunityproductForm.controls[key] != null)
    {
        this.lmsopportunityproductservice.formData[key] = this.lmsopportunityproductForm.controls[key].value;
    }
}
}
}
console.log(this.lmsopportunityproductservice.formData);
this.lmsopportunityproductservice.formData=this.lmsopportunityproductForm.value;
this.lmsopportunityproductservice.saveOrUpdatelmsopportunityproducts().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsopportunityproduct);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.lmsopportunityproductservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).lmsopportunityproduct);
}
else
{
this.FillData(res);
}
}
this.lmsopportunityproductForm.markAsUntouched();
this.lmsopportunityproductForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditopportunityid( opportunityid) {
/*let ScreenType='2';
this.dialog.open(lmsopportunityComponent, 
{
data: {opportunityid:this.lmsopportunityproductForm.get('opportunityid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(lmsproductmasterComponent, 
{
data: {productid:this.lmsopportunityproductForm.get('productid').value, ScreenType:2 }
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



