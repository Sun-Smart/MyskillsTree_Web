import { ltymerchantproductService } from './../../../service/ltymerchantproduct.service';
import { ltymerchantproduct } from './../../../model/ltymerchantproduct.model';
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
import { ltymerchant} from './../../../model/ltymerchant.model';
import { ltymerchantService } from './../../../service/ltymerchant.service';
//popups
import { erpproduct} from '../../../../../../n-tire-procurement-app/src/app/model/erpproduct.model';
import { erpproductService } from '../../../../../../n-tire-procurement-app/src/app/service/erpproduct.service';
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
selector: 'app-ltymerchantproduct',
templateUrl: './ltymerchantproduct.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class ltymerchantproductComponent implements OnInit {
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
bfilterPopulateltymerchantproducts:boolean=false;
dataltymerchantproductsmerchantid3:any=[];
dataltymerchantproductsproductid3:any=[];
 ltymerchantproductForm: FormGroup;
merchantidList: ltymerchant[];
merchantidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
merchantid_ltymerchantsForm: FormGroup;//autocomplete
merchantid_ltymerchantsoptions:any;//autocomplete
merchantid_ltymerchantsformatter:any;//autocomplete
productidList: erpproduct[];
productidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
productid_erpproductsForm: FormGroup;//autocomplete
productid_erpproductsoptions:any;//autocomplete
productid_erpproductsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
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
private ltymerchantproductservice: ltymerchantproductService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private ltymerchantservice:ltymerchantService,
private erpproductservice:erpproductService,
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
this.ltymerchantproductForm  = this.fb.group({
pk:[null],
merchantproductid: [null],
merchantid: [null],
merchantiddesc: [null],
productid: [null],
productiddesc: [null],
setupfee: [null],
servicefee: [null],
pertransactionfee: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.ltymerchantproductForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.ltymerchantproductForm.dirty && this.ltymerchantproductForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.merchantproductid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.merchantproductid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.merchantproductid && pkDetail) {
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
let ltymerchantproductid = null;

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
this.formid=ltymerchantproductid;
//this.sharedService.alert(ltymerchantproductid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.ltymerchantservice.getltymerchantsList().then(res => 
{
this.merchantidList = res as ltymerchant[];
if(this.ltymerchantproductservice.formData && this.ltymerchantproductservice.formData.merchantid){
this.merchantidoptionsEvent.emit(this.merchantidList);
this.ltymerchantproductForm.patchValue({
    merchantid: this.ltymerchantproductservice.formData.merchantid,
    merchantiddesc: this.ltymerchantproductservice.formData.merchantiddesc,
});
}
{
let arrmerchantid = this.merchantidList.filter(v => v.merchantid == this.ltymerchantproductForm.get('merchantid').value);
let objmerchantid;
if (arrmerchantid.length > 0) objmerchantid = arrmerchantid[0];
if (objmerchantid)
{
}
}
}
).catch((err) => {console.log(err);});
this.merchantid_ltymerchantsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.merchantidList.filter(v => v.establishmentname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.merchantid_ltymerchantsformatter = (result: any) => result.establishmentname;
this.erpproductservice.geterpproductsList().then(res => 
{
this.productidList = res as erpproduct[];
if(this.ltymerchantproductservice.formData && this.ltymerchantproductservice.formData.productid){
this.productidoptionsEvent.emit(this.productidList);
this.ltymerchantproductForm.patchValue({
    productid: this.ltymerchantproductservice.formData.productid,
    productiddesc: this.ltymerchantproductservice.formData.productiddesc,
});
}
{
let arrproductid = this.productidList.filter(v => v.productid == this.ltymerchantproductForm.get('productid').value);
let objproductid;
if (arrproductid.length > 0) objproductid = arrproductid[0];
if (objproductid)
{
}
}
}
).catch((err) => {console.log(err);});
this.productid_erpproductsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.productidList.filter(v => v.productname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.productid_erpproductsformatter = (result: any) => result.productname;

//autocomplete
    this.ltymerchantproductservice.getltymerchantproductsList().then(res => {
      this.pkList = res as ltymerchantproduct[];
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
this.ltymerchantproductForm.markAsUntouched();
this.ltymerchantproductForm.markAsPristine();
}
onSelectedmerchantid(merchantidDetail: any) {
if (merchantidDetail.merchantid && merchantidDetail) {
this.ltymerchantproductForm.patchValue({
merchantid: merchantidDetail.merchantid,
merchantiddesc: merchantidDetail.establishmentname,

});

}
}

onSelectedproductid(productidDetail: any) {
if (productidDetail.productid && productidDetail) {
this.ltymerchantproductForm.patchValue({
productid: productidDetail.productid,
productiddesc: productidDetail.productname,

});

}
}




resetForm() {
if (this.ltymerchantproductForm != null)
this.ltymerchantproductForm.reset();
this.ltymerchantproductForm.patchValue({
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let merchantproductid = this.ltymerchantproductForm.get('merchantproductid').value;
        if(merchantproductid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.ltymerchantproductservice.deleteltymerchantproduct(merchantproductid).then(res =>
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
    this.ltymerchantproductForm.patchValue({
        merchantproductid: null
    });
    if(this.ltymerchantproductservice.formData.merchantproductid!=null)this.ltymerchantproductservice.formData.merchantproductid=null;
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
this.ltymerchantproductForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.ltymerchantproductForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.ltymerchantproductForm.controls[key]!=undefined)this.ltymerchantproductForm.controls[key].disable({onlySelf: true});
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
merchantproductidonChange(evt:any){
let e=evt.value;
}
merchantidonChange(evt:any){
let e=evt.value;
}
productidonChange(evt:any){
let e=evt.value;
}
setupfeeonChange(evt:any){
let e=evt.value;
}
servicefeeonChange(evt:any){
let e=evt.value;
}
pertransactionfeeonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

async PopulateScreen(pkcol:any){
this.ltymerchantproductservice.getltymerchantproductsByEID(pkcol).then(res => {

this.ltymerchantproductservice.formData=res.ltymerchantproduct;
let formproperty=res.ltymerchantproduct.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.ltymerchantproduct.pkcol;
this.formid=res.ltymerchantproduct.merchantproductid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.ltymerchantproduct.merchantproductid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.ltymerchantproductForm.patchValue({
merchantproductid: res.ltymerchantproduct.merchantproductid,
merchantid: res.ltymerchantproduct.merchantid,
merchantiddesc: res.ltymerchantproduct.merchantiddesc,
productid: res.ltymerchantproduct.productid,
productiddesc: res.ltymerchantproduct.productiddesc,
setupfee: res.ltymerchantproduct.setupfee,
servicefee: res.ltymerchantproduct.servicefee,
pertransactionfee: res.ltymerchantproduct.pertransactionfee,
status: res.ltymerchantproduct.status,
statusdesc: res.ltymerchantproduct.statusdesc,
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
  for (let key in this.ltymerchantproductForm.controls) {
    if (this.ltymerchantproductForm.controls[key] != null) {
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.ltymerchantproductForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.ltymerchantproductForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.ltymerchantproductForm.value;
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
Object.keys(this.ltymerchantproductForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.ltymerchantproductForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.ltymerchantproductForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.ltymerchantproductservice.formData=this.ltymerchantproductForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.ltymerchantproductForm.controls[key] != null)
    {
        this.ltymerchantproductservice.formData[key] = this.ltymerchantproductForm.controls[key].value;
    }
}
}
}
console.log(this.ltymerchantproductservice.formData);
this.ltymerchantproductservice.formData=this.ltymerchantproductForm.value;
this.ltymerchantproductservice.saveOrUpdateltymerchantproducts().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
document.getElementById("contentArea1").scrollTop = 0;
if(this.dynamicconfig.data!=undefined && this.dynamicconfig.data.save)
{
this.dialogRef.close((res as any).result.value.ltymerchantproduct);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.ltymerchantproductservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).result.value.ltymerchantproduct);
}
else
{
this.FillData(res);
}
}
this.ltymerchantproductForm.markAsUntouched();
this.ltymerchantproductForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditmerchantid( merchantid) {
/*let ScreenType='2';
this.dialog.open(ltymerchantComponent, 
{
data: {merchantid:this.ltymerchantproductForm.get('merchantid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditproductid( productid) {
/*let ScreenType='2';
this.dialog.open(erpproductComponent, 
{
data: {productid:this.ltymerchantproductForm.get('productid').value, ScreenType:2 }
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



